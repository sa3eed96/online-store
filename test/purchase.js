const axios =require('axios');
const  {assert, expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const seed = require('../seeders/seed');
const Purchase = require('../models/index').Purchase; 
const PurchaseDetail = require('../models/index').PurchaseDetail; 
const Shipment = require('../models/index').Shipment; 
const Product = require('../models/index').Product; 
const { hmSetAsync, hmGetAllAsync, delAsync } = require('../redis');

describe('purchase', ()=> {

    before(async()=> { 
        boot();
        const user = await User.findOne({where:{id: 1}});
        app.set('sessionMiddleware', (req, res, next) => {
            req.session = {
                user: user.toJSON(),
            };
            next()
        });
    });

    beforeEach(async function(){
        this.timeout(0);
        seed();
    });

    describe('getting list of purchases', ()=>{
        before(async()=>{
            await Purchase.sync({force: true});
            await Purchase.create({ 
                UserId: '1',
                total: '150',
                isPaid: false,
                paymentType: 'ondoor',
                PurchaseDetails:[{ProductId: 1, quantity: 1, color: 'red'}],
                Shipment: {AddressId: 1} ,
            },{include: [PurchaseDetail, Shipment],});
        });
        it('should get list of all purchases made by user',(done)=>{
            axios.get('http://localhost:3000/api/purchase?page=1').then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('purchases');
                expect(response.data).to.have.property('count');
                expect(response.data.purchases.length).to.equal(response.data.count);
                expect(response.data.count).to.equal(1);
                done();
            });
        });
        after(async()=>{
            await Purchase.destroy({where:{UserId: 1}});
        });
    });

    describe('purchasing item',()=>{
        before(async function(){
            this.timeout(0);
            await delAsync(`cart-1`);
            await hmSetAsync(`cart-1`, `5-Double Dumbbells Vinyl, 2 KG-blue`, `1-220`);
        });
        it('should purchase item and deduce quanitiy from stock', (done)=>{
            axios.post('http://localhost:3000/api/purchase',{addressId: 1, paymentType: 'ondoor', isPaid: false}).then(async(response)=>{
                expect(response.status).to.equal(201);    
                expect(response.data).to.have.property('purchase');
                const cartObject = await hmGetAllAsync(`cart-1`);
                expect(cartObject).to.equal(null);
                const product = await Product.findOne({where:{name: 'Double Dumbbells Vinyl, 2 KG'}, include: {all:true}});
                expect(product.Colors[0].stockCount).to.equal(29);
                done();
            });
        });
    });

    describe('canceling order',()=>{
        beforeEach(async function(){
            this.timeout(0);
            await Purchase.sync({force: true});
            await Purchase.create({
                id: '20',
                UserId: '1',
                total: '220',
                isPaid: false,
                paymentType: 'ondoor',
                PurchaseDetails:[{ProductId: 5, quantity: 1, color: 'blue'}],
                Shipment: {AddressId: 1} ,
            },{include: [PurchaseDetail, Shipment],});
            await Purchase.create({
                id: '21',
                UserId: '1',
                total: '4',
                isPaid: true,
                paymentType: 'ondoor',
                PurchaseDetails:[{ProductId: 1, quantity: 1, color: 'red'}],
                Shipment: {AddressId: 1, delivered: true} ,
            },{include: [PurchaseDetail, Shipment],});
        });

        it('should cancel the order if not delivered',(done)=>{
                axios.delete('http://localhost:3000/api/purchase/20').then(async (response)=>{
                    expect(response.status).to.equal(200);
                    const purchase = await Purchase.findByPk(20);
                    expect(purchase).to.equal(null);
                    const product = await Product.findByPk(5,{include: {all: true}});
                    expect(product.Colors[0].stockCount).to.equal(31);
                    done();
                });
        });

        it('should not delete a non exisiting purchase',(done)=>{
            axios.delete('http://localhost:3000/api/purchase/26').then(async (response)=>{})
                .catch((err)=>{
                    expect(err.response.status).to.equal(404);
                    done();
                });
        });

        it('should not cancel the order if delivered', (done)=>{
            axios.delete('http://localhost:3000/api/purchase/21').then(async (response)=>{})
            .catch((err)=>{
                expect(err.response.status).to.equal(400);
                done();
            });
        });
    });

    after(()=> shutdown());
});
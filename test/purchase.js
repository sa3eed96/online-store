const axios =require('axios');
const  {expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const seed = require('../seeders/seed');
const Purchase = require('../models/index').Purchase; 
const Product = require('../models/index').Product; 
const { hmSetAsync, hmGetAllAsync, delAsync } = require('../redis');

describe('purchase', ()=> {

    before(async function(){ 
        this.timeout(0);
        boot();
        await seed();

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
        await seed();
    });

    describe('getting list of purchases', ()=>{
        it('should get list of all purchases made by user',(done)=>{
            axios.get('http://localhost:3000/api/purchase?page=1').then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('purchases');
                expect(response.data).to.have.property('count');
                expect(response.data.purchases.length).to.equal(2);
                expect(response.data.count).to.equal(2);
                done();
            });
        });
    });

    describe('purchasing item',()=>{
        
        before(async function(){
            this.timeout(0);
            await delAsync(`cart-1`);
            await hmSetAsync(`cart-1`, `6-Neoprene Weight Lifting Belts Gym Belt Fitness-black`, `1-120`);
        });

        it('should purchase item and deduce quanitiy from stock', (done)=>{
            axios.post('http://localhost:3000/api/purchase',{addressId: 1, paymentType: 'ondoor', isPaid: false}).then(async(response)=>{
                expect(response.status).to.equal(201);    
                expect(response.data).to.have.property('purchase');
                const cartObject = await hmGetAllAsync(`cart-1`);
                expect(cartObject).to.equal(null);
                const product = await Product.findByPk(6,{include: {all:true}});
                expect(product.Colors[0].stockCount).to.equal(34);
                done();
            });
        });
    });

    describe('canceling order',()=>{

        it('should cancel the order if not delivered',(done)=>{
                axios.delete('http://localhost:3000/api/purchase/22').then(async (response)=>{
                    expect(response.status).to.equal(200);
                    const purchase = await Purchase.findByPk(22);
                    expect(purchase).to.equal(null);
                    const product = await Product.findByPk(2,{ include: {all: true} });
                    expect(product.Colors[0].stockCount).to.equal(50);
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
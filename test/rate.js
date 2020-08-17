const axios =require('axios');
const {expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const UserRate = require('../models/index').UserRate;
const productSeeder =require('../seeders/20200813003652-product');
const RateSeeder =require('../seeders/20200813004822-rate');
const ColorSeeder =require('../seeders/20200813005034-color');
const SpecificationSeeder =require('../seeders/20200813004412-specification');
const ImageSeeder =require('../seeders/20200813005359-image');
const SubcategorySeeder =require('../seeders/20200812171956-subcategory');
const CategorySeeder =require('../seeders/20200812171946-category');
const UserSeeder = require('../seeders/20200812003038-User');
const AddressSeeder = require('../seeders/20200812170734-address');
const Purchase = require('../models/index').Purchase; 
const PurchaseDetail = require('../models/index').PurchaseDetail; 
const Shipment = require('../models/index').Shipment; 

describe('product rate',()=>{

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
        
        await AddressSeeder.down();
        await UserSeeder.down();
        await ImageSeeder.down();
        await ColorSeeder.down();
        await SpecificationSeeder.down();
        await RateSeeder.down();
        await productSeeder.down();
        await SubcategorySeeder.down();
        await CategorySeeder.down();

        await UserSeeder.up();
        await AddressSeeder.up();
        await CategorySeeder.up();
        await SubcategorySeeder.up();
        await productSeeder.up();
        await RateSeeder.up();
        await SpecificationSeeder.up();
        await ColorSeeder.up();
        await ImageSeeder.up();
        await UserRate.sync({force: true});
        await PurchaseDetail.sync({force: true});
        await Purchase.sync({force: true});
        await Purchase.create({
            id: '20',
            UserId: '1',
            total: '220',
            isPaid: true,
            paymentType: 'ondoor',
            PurchaseDetails:[{ProductId: 5, quantity: 1, color: 'blue'}],
            Shipment: {AddressId: 1, delivered: true} ,
        },{include: [PurchaseDetail, Shipment],});
        await Purchase.create({
            id: '21',
            UserId: '1',
            total: '4',
            isPaid: false,
            paymentType: 'ondoor',
            PurchaseDetails:[{ProductId: 1, quantity: 1, color: 'red'}],
            Shipment: {AddressId: 1} ,
        },{include: [PurchaseDetail, Shipment],});
    });

    describe.only('rate update', ()=> {
        it('should not rate a not purchased product', (done)=>{
            axios.put(`http://localhost:3000/api/product/4/rate/4`,{
                rateArray: [0, 0, 0, 0, 0], 
                rate: 3, 
                comment: 'great product',
            }).then((response)=>{})
            .catch((err)=>{
                expect(err.response.status).to.equal(400);
                done();
            });

        });
        it('should rate a purchased product', (done)=>{
            axios.put(`http://localhost:3000/api/product/5/rate/5`,{
                rateArray: [0, 0, 0, 0, 0], 
                rate: 3, 
                comment: 'great product',
            }).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('rate');
                expect(response.data).to.have.property('userRate');
                expect(response.data.userRate.rate).to.equal(3);
                expect(response.data.rate.rate[3]).to.equal(1);
                done();
            });
        });

        it('should not rate a not delivered product', (done)=>{
            axios.put(`http://localhost:3000/api/product/1/rate/1`,{
                rateArray: [0, 0, 0, 0, 0], 
                rate: 4, 
                comment: 'great product',
            }).then((response)=>{})
            .catch((err)=>{
                expect(err.response.status).to.equal(400);
                done();
            });
        });
    });

    after(()=> shutdown());
});
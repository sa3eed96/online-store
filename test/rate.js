const axios =require('axios');
const {expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const UserRate = require('../models/index').UserRate;
const seed = require('../seeders/seed');
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
        seed();

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

    describe('rate update', ()=> {
        it('should not rate a not purchased product', (done)=>{
            axios.post(`http://localhost:3000/api/product/4/userrate`,{
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
            axios.post(`http://localhost:3000/api/product/5/userrate`,{
                rateArray: [0, 0, 0, 0, 0], 
                rate: 3, 
                comment: 'great product',
            }).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('rate');
                expect(response.data).to.have.property('userRate');
                expect(response.data.userRate.rate).to.equal(3);
                expect(response.data.rate[3]).to.equal(1);
                done();
            }).catch(err=> console.log(err));
        });

        it('should not rate a not delivered product', (done)=>{
            axios.post(`http://localhost:3000/api/product/1/userrate`,{
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
const axios =require('axios');
const {expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const seed = require('../seeders/seed');

describe('product rate',()=>{

    before(async()=> {
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

    describe('rating product', ()=> {
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
            axios.post(`http://localhost:3000/api/product/1/userrate`,{
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
            });
        });
    });

    describe('updating rated product', ()=> {
        it('should not update a not rated product', (done)=>{
            axios.put(`http://localhost:3000/api/product/1/userrate/21`,{
                rateArray: [0, 0, 0, 0, 0], 
                rate: 3, 
                comment: 'great product',
            }).then((response)=>{})
            .catch((err)=>{
                expect(err.response.status).to.equal(404);
                done();
            });

        });

        it('should update a rated product', (done)=>{
            axios.put(`http://localhost:3000/api/product/5/userrate/20`,{
                rateArray: [0, 0, 0, 0, 1], 
                rate: 3,
                comment: 'lowered rate',
            }).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('rate');
                expect(response.data).to.have.property('userRate');
                expect(response.data.userRate.rate).to.equal(3);
                expect(response.data.rate[3]).to.equal(1);
                done();
            });
        });
    });

    describe('return product rates', ()=> {
        it('should return product rates', (done)=>{
            axios.get('http://localhost:3000/api/product/5/userrate?page=1')
            .then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('count');
                expect(response.data).to.have.property('rates');
                expect(response.data.count).to.equal(1);
                expect(response.data.rates.length).to.equal(1);
                done();
            });
        });
    });

    describe('return user product rate', ()=> {
        it('should return current user rate', (done)=>{
            axios.get('http://localhost:3000/api/product/5/userrate/myrate')
            .then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('myRate');
                done();
            });
        });

        it('should not return rate for not rated product', (done)=>{
            axios.get('http://localhost:3000/api/product/1/userrate/myrate')
            .then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data.myRate).to.equal(null);
                done();
            });
        });
    });

    after(()=> shutdown());
});
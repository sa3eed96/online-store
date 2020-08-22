const axios =require('axios');
const  {assert, expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const Address = require('../models/index').Address;
const AddressSeeder = require('../seeders/20200812170734-address');
const UserSeeder = require('../seeders/20200812003038-User');

describe('address',()=>{
    before(async function(){
        boot();
        this.timeout(0);
        await AddressSeeder.down();
        await UserSeeder.down();

        await UserSeeder.up();
        await AddressSeeder.up();
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
        await AddressSeeder.up();
    });

    describe('getting addresses',()=>{
        it('should get list of added addresses',(done)=>{
            axios.get('http://localhost:3000/api/address').then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.data).to.have.property('addresses');
                done();
            });
        });
    });

    describe('add new address',()=>{
        it('should create new address with valid fields',(done)=>{
            axios.post('http://localhost:3000/api/address',{country: "Egypt", city: "Cairo", address: '10 heliopolis street', zipCode: '11757',}).then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.data).to.have.property('address');
                done();
            });
        });
        it('should not create new address with invalid fields',(done)=>{
            axios.post('http://localhost:3000/api/address',{country: "Egypt", city: "Cairo", address: "", zipCode: ""}).then((res)=>{
            }).catch((err)=>{
                expect(err.response.status).to.equal(500);
                done();
            });
        });
    });

    describe('editing an added address',()=>{
        it('should edit address with valid fields',(done)=>{
            axios.put('http://localhost:3000/api/address/1',{address:"345 heliopolis"}).then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.data).to.have.property('address');
                assert(res.data.address.address == "345 heliopolis")
                done();
            });
        });
        it('should not edit address with no fields',(done)=>{
            axios.put('http://localhost:3000/api/address/1',{}).then((res)=>{
            }).catch((err)=>{
                expect(err.response.status).to.equal(400);
                done();
            });
        });
        it('should not edit address with invalid fields',(done)=>{
            axios.put('http://localhost:3000/api/address/1',{address: "", zipCode: ""}).then((res)=>{
            }).catch((err)=>{
                expect(err.response.status).to.equal(500);
                done();
            });
        });
    });

    describe('deleting added address',()=>{
        it('should delete added address with specified id',(done)=>{
            axios.delete('http://localhost:3000/api/address/1').then(async(res)=>{
                expect(res.status).to.equal(200);
                const address = await Address.findOne({where:{id: 1}});
                assert(address == null);
                done();
            });
        });
    });

    after(()=> shutdown());
});
const axios =require('axios');
const  {expect} = require('chai');
const User = require('../models/index').User;
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const seed = require('../seeders/seed');

describe('authentication',()=> {

    before(()=> boot());
    
    describe('login',()=>{

        before(async function() {
            this.timeout(0);
            await seed();
        });

        it('should login with correct credentials',(done)=>{
            axios.post('http://localhost:3000/api/login',{email: 'john@site.com', password: 'password1234'}).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('user');
                expect(response.data.user.id).to.equal(1);
                done();
            });
        });
        it('should not login with wrong password',(done)=>{
            axios.post('http://localhost:3000/api/login',{email: 'john@site.com', password: 'password2345'}).then((response)=>{        
            }).catch((err)=>{
                expect(err.response.status).to.equal(400);
                done();
            });
        });
        it('should not login with non-registered email',(done)=>{
            axios.post('http://localhost:3000/api/login',{email: 'jane@site.com', password: 'password1234'}).then((response)=>{
            }).catch((err)=>{
                expect(err.response.status).to.equal(400);
                done();
            });
        });
    });

    describe('registeration', ()=>{
        
        beforeEach(async function() {
            this.timeout(0);
            await seed();
        });

        it('should register user with valid fields',(done)=>{
            const body = {firstName: 'jane', lastName: 'doe', email: 'jane@site.com', password: 'password1234', phone: '01112223334'};
            axios.post('http://localhost:3000/api/register', body).then(async (response)=> {
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('user');
                const user = await User.findOne({where:{email: 'jane@site.com'}});
                expect(user).to.not.equal(null);
                done();
            });
        });
        it('should not register existing user', (done)=>{
            const body = {firstName: 'jane', lastName: 'doe', email: 'john@site.com', password: 'password1234', phone: '01112223334'};
            axios.post('http://localhost:3000/api/register', body).then((response)=> {}).catch(err=>{
                expect(err.response.status).to.equal(400);
                done();
            });
        });
        it('should not register with invalid fields',(done)=>{
            const body = {firstName: null, lastName: 'doe', email: 'jane@site.com', password: 'password1234', phone: '01112223334'};
            axios.post('http://localhost:3000/api/register', body).then((response)=> {}).catch(async (err)=>{
                expect(err.response.status).to.equal(500);
                const user = await User.findOne({where:{email: 'jane@site.com'}});
                expect(user).to.equal(null);
                done();
            });
        });
    });

    after(()=> shutdown());

});


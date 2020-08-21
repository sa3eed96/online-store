const axios =require('axios');
const  {assert, expect} = require('chai');
const User = require('../models/index').User;
const EmailLink = require('../models/index').EmailLink; 
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const UserSeeder = require('../seeders/20200812003038-User');
const app = require('../app');

describe.only('authentication',()=> {

    before(()=> boot());
    
    describe('login',()=>{

        before(async function() {
            this.timeout(0);
            await UserSeeder.down();
            await UserSeeder.up();
        });

        it('should login with correct credentials',(done)=>{
            axios.post('http://localhost:3000/api/login',{email: 'john@site.com', password: 'password1234'}).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('user');
                assert(response.data.user.id == 1);
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
            await UserSeeder.down();
            await UserSeeder.up();
        });

        it('should register user with valid fields',(done)=>{
            const body = {firstName: 'jane', lastName: 'doe', email: 'jane@site.com', password: 'password1234', phone: '01112223334'};
            axios.post('http://localhost:3000/api/register', body).then(async (response)=> {
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('user');
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
            axios.post('http://localhost:3000/api/register', body).then((response)=> {}).catch(err=>{
                expect(err.response.status).to.equal(500);
                done();
            });
        });
    });
    describe('changePassword',()=>{
        
        before(async()=>{
            
        
            const user = await User.findOne({where:{id: 1}});
            app.set('sessionMiddleware', (req, res, next) => {
                req.session = {
                    user: user.toJSON(),
                };
                next()
            });
        });

        beforeEach(async function() {
            this.timeout(0);
            await UserSeeder.down();
            await UserSeeder.up();
        });
    
        it('should change password',(done)=>{
            axios.put('http://localhost:3000/api/changepassword',{newPassword:'password2345', oldPassword: 'password1234'}).then((res)=>{
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('should not change password with wrong password',(done)=>{
            axios.put('http://localhost:3000/api/changepassword',{newPassword:'password2345', oldPassword: 'password12345'}).then((res)=>{
            }).catch((err)=>{
                expect(err.response.status).to.equal(400);
                done();
            });
        });
    });
    
    describe('forgot password',()=>{
        before(async function(){
            this.timeout(0);
            await UserSeeder.down();
            await UserSeeder.up();
            const user = await User.findOne({where:{id: 1}});
            app.set('sessionMiddleware', (req, res, next) => {
                req.session = {
                    user: user.toJSON(),
                };
                next()
            });
            await EmailLink.create({link:'123', type: 'password', UserId: 1});
        });
        
        it('should reset password and set new one',(done)=>{
            axios.post('http://localhost:3000/api/reset', {id:'123', password: 'password3456'}).then((res)=>{
                expect(res.status).to.equal(200);
                done();
            });
        });

        it('should not reset password with invalid link',(done)=>{
            axios.post('http://localhost:3000/api/reset', {id:'1234', password: 'password3456'}).then((res)=>{
            }).catch((err)=>{
                expect(err.response.status).to.equal(404);
                done();
            });
        });
    });

    after(()=> shutdown());

});


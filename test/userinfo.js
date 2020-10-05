const axios =require('axios');
const  {expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const seed = require('../seeders/seed');
const bcrypt = require('bcrypt');

describe('user info',async ()=>{
    
    before(async function() {
        this.timeout(0);
        boot();
        await seed();

        const user = await User.findOne({where:{id: 1}});
        app.set('sessionMiddleware', (req, res, next) => {
            req.session = {
                user: user.toJSON(),
            };
            req.session.destroy = (cb)=>{
                cb(null);
            };
            next()
        });
    });

    beforeEach(async function(){
        this.timeout(0);
        await seed();
    });
    
    describe('update user info',()=>{
        
        it('should update user info given valid fields', (done)=>{
            axios.put('http://localhost:3000/api/user', { lastName: 'dooo'}).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('user');
                expect(response.data.user.lastName).to.equal('dooo');
                done();
            });
        });

        it('should not update user info given invalid fields', (done)=>{
            axios.put('http://localhost:3000/api/user', { lastName: ''}).then((response)=>{
            }).catch(async (err)=>{
                expect(err.response.status).to.equal(500);
                const user = await User.findOne({where: {id: 1}});
                expect(user.lastName).to.not.equal('');
                done();
            });
        });
    });
    
    describe('deleting user',()=>{

        it('should delete user accountprovided with valid password',(done)=> {
            axios.delete('http://localhost:3000/api/user',{data: {password: 'password1234'}}).then(async (response)=>{
                expect(response.status).to.equal(200);
                const user = await User.findOne({where: {id: 1}});
                expect(user).to.equal(null);
                done();
            });
        });

        it('should not delete user account provided with invalid password',(done)=> {
            axios.delete('http://localhost:3000/api/user',{data: {password: 'password234'}}).then(()=>{})
            .catch(async (err)=>{
                expect(err.response.status).to.equal(400);
                const user = await User.findOne({where: {id: 1}});
                expect(user).to.not.equal(null);
                done()
            });
        });
    });

    describe('changePassword',()=>{
    
        it('should change password',(done)=>{
            axios.put('http://localhost:3000/api/user/changepassword',{newPassword:'password2345', password: 'password1234'})
            .then(async (res)=>{
                expect(res.status).to.equal(200);
                const user = await User.findOne({where: {id: 1}});
                const check = await bcrypt.compare('password2345', user.password);
                expect(check).to.equal(true);
                done();
            });
        });

        it('should not change password with wrong password',(done)=>{
            axios.put('http://localhost:3000/api/user/changepassword',{newPassword:'password2345', password: 'password12345'}).then((res)=>{
            }).catch(async (err)=>{
                expect(err.response.status).to.equal(400);
                const user = await User.findOne({where: {id: 1}});
                const check = await bcrypt.compare('password2345', user.password);
                expect(check).to.equal(false);
                done();
            });
        });
    });

    after(()=> shutdown());
});
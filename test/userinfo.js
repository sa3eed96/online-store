const axios =require('axios');
const  {assert, expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const UserSeeder = require('../seeders/20200812003038-User');

describe('user info',()=>{
    before(async()=> {
        boot();
        await UserSeeder.down();
        await UserSeeder.up();
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
        await UserSeeder.down();
        await UserSeeder.up();
    });
    
    describe('update user info',()=>{
        it('should update user info given valid fields', (done)=>{
            axios.put('http://localhost:3000/api/user', { lastName: 'dooo'}).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('user');
                expect(response.data.user.lastName).to.equal('dooo');
                done();
            }).catch(err=> {console.log(err); done()});
        });
        it('should not update user info given invalid fields', (done)=>{
            axios.put('http://localhost:3000/api/user', { lastName: ''}).then((response)=>{
            }).catch((err)=>{
                expect(err.response.status).to.equal(500);
                done();
            });
        });
    });
    
    describe('deleting user',()=>{
        it('should delete user account',(done)=> {
            axios.delete('http://localhost:3000/api/user',{data: {password: 'password1234'}}).then(async (response)=>{
                expect(response.status).to.equal(200);
                const user = await User.findOne({where: {id: 1}});
                expect(user).to.equal(null);
                done();
            });
        });
    });

    after(()=> shutdown());
});
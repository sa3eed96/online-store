const axios =require('axios');
const  {expect} = require('chai');
const User = require('../models/index').User;
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const seed = require('../seeders/seed');

describe.only('forgot password',()=>{

    before(()=> boot());

    before(async function(){
        this.timeout(0);
        await seed();
        const user = await User.findOne({where:{id: 1}});
        app.set('sessionMiddleware', (req, res, next) => {
            req.session = {
                user: user.toJSON(),
            };
            next()
        });
    
});

    it('should return a valid link', (done)=>{
        axios.get('http://localhost:3000/api/passwordreset/123').then((response)=>{
            expect(response.status).to.equal(200);
            expect(response.data).to.have.property('link');
            done();
        });
    });

    it('should not return an invalid link', (done)=>{
        axios.get('http://localhost:3000/api/passwordreset/1234').then((response)=>{})
        .catch(err=>{   
            expect(err.response.status).to.equal(404);
            done();
        });
    });

    
    it('should reset password and set new one',(done)=>{
        axios.delete('http://localhost:3000/api/passwordreset/123', {data: { password: 'password3456'}}).then((res)=>{
            expect(res.status).to.equal(200);
            done();
        });
    });

    it('should not reset password with invalid link',(done)=>{
        axios.delete('http://localhost:3000/api/passwordreset/1234', {data: { password: 'password3456'}}).then((res)=>{
        }).catch((err)=>{
            expect(err.response.status).to.equal(404);
            done();
        });
    });

    it('should create a reset password link',(done)=>{
        axios.post('http://localhost:3000/api/passwordreset', {email: 'john@site.com'}).then((response)=>{
            expect(response.status).to.equal(201);
            done();
        });
    });

    it('should not create a reset password link for unregistered email',(done)=>{
        axios.post('http://localhost:3000/api/passwordreset', {email: 'jane@site.com'}).then((res)=>{})
        .catch((err)=>{
            expect(err.response.status).to.equal(400);
            done();
        });
    });

    after(()=> shutdown());
});
const axios =require('axios');
const  {expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const seed = require('../seeders/seed');

describe('category', ()=>{

    before(async function(){
        this.timeout(0)
        boot();
        await seed();
    });

    describe('category list', ()=>{
        it('should get all categories', (done)=>{
            axios.get('http://localhost:3000/api/category').then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('categories');
                expect(response.data.categories).to.not.equal(null);
                expect(response.data.categories.length).to.equal(2);
                done();
            });
        });
    });

    after(()=> shutdown());

});
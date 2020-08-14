const axios =require('axios');
const  {assert, expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const categorySeeder = require('../seeders/20200812171946-category');
const SubcategorySeeder = require('../seeders/20200812171956-subcategory');


describe('category', ()=>{

    before(async()=> {
        boot();

        await SubcategorySeeder.down();
        await categorySeeder.down();

        await categorySeeder.up();
        await SubcategorySeeder.up();

    });

    describe('category list', ()=>{
        it('should get all categories', (done)=>{
            axios.get('http://localhost:3000/api/category').then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('categories');
                expect(response.data.categories).to.not.equal(null);
                done();
            });
        });
    });

    after(()=> shutdown());

});
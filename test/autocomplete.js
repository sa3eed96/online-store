const axios =require('axios');
const  { expect } = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const productSeeder = require('../seeders/20200813003652-product');
const CategorySeeder = require('../seeders/20200812171946-category');
const SubcategorySeeder = require('../seeders/20200812171956-subcategory');

describe('autocomplete for search', ()=>{
    before(async function (){
        boot();
        this.timeout(0);
        await productSeeder.down();
        await SubcategorySeeder.down();
        await CategorySeeder.down();
       
        await CategorySeeder.up();
        await SubcategorySeeder.up();
        await productSeeder.up();
    });

    describe('getting results', ()=>{
        it('should get results containing the words in query',(done)=>{
            axios.get(`http://localhost:3000/api/autocomplete?q=bottle`).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('results');
                expect(response.data.results.length).to.equal(1);
                done();
            }).catch(err=> console.log(err));
        });
    });

    after(()=> shutdown());
});
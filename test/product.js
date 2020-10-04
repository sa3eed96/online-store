const axios =require('axios');
const  {assert, expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const seed = require('../seeders/seed');

describe('product', ()=> {

    before(()=> { boot()});

    beforeEach(async function(){
        this.timeout(0);
        seed();
    });


    describe('get product list', ()=>{
        it('should return products',(done)=> {
            axios.get(`http://localhost:3000/api/product?page=1`).then((response)=>{
                expect(response.status).to.equal(200);
                assert(response.data.products.length > 0);
                assert(response.data.count ==  response.data.products.length);
                expect(response.data.products[0]).to.have.property('Colors');
                done();
            });
        });

        it('should return productswith specified category',(done)=> {
            axios.get(`http://localhost:3000/api/product?page=1&c=Kitchen`).then((response)=>{
                expect(response.status).to.equal(200);
                assert(response.data.products.length == 1);
                assert(response.data.count ==  response.data.products.length);
                assert(response.data.products[0].SubcategoryName == 'Kitchen');
                expect(response.data.products[0]).to.have.property('Colors');
                done();

            });
        });

        it('should return products with specified name',(done)=> {
            axios.get(`http://localhost:3000/api/product?page=1&q=bottle`).then((response)=>{
                expect(response.status).to.equal(200);
                assert(response.data.products.length == 1);
                assert(response.data.count ==  response.data.products.length);
                assert(response.data.products[0].name.includes('Bottle'));
                expect(response.data.products[0]).to.have.property('Colors');
                done();
            });
        });

        it('should return products with specified sort',(done)=> {
            axios.get(`http://localhost:3000/api/product?page=1&sort=price&by=DESC`).then((response)=>{
                expect(response.status).to.equal(200);
                assert(response.data.products.length > 0);
                assert(response.data.count ==  response.data.products.length);
                assert(response.data.products[0].price > response.data.products[1].price);
                done();
            });
        });

    });

    describe('get product by id',()=>{
        
        it('should get specific product by id',(done)=>{
            axios.get(`http://localhost:3000/api/product/1`).then((response)=>{
                expect(response.status).to.equal(200);
                assert(response.data.product.id == 1);
                expect(response.data.product).to.have.property('Colors');
                done();
            });
        });

        it('should get specific product by id and color',(done)=>{
            axios.get(`http://localhost:3000/api/product/1?color=red`).then((response)=>{
                expect(response.status).to.equal(200);
                assert(response.data.product.id == 1);
                expect(response.data.product).to.have.property('Colors').with.lengthOf(1);
                assert(response.data.product.Colors[0].Color == 'red');
                done();
            });
        });

    });
    after(()=> shutdown());
});
const axios =require('axios');
const  {expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const seed = require('../seeders/seed');

describe('product', ()=> {

    before(()=> { boot()});

    beforeEach(async function(){
        this.timeout(0);
        await seed();
    });


    describe('get product list', ()=>{
        it('should return products',(done)=> {
            axios.get(`http://localhost:3000/api/product?page=1`).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data.products.length).to.equal(6);
                expect(response.data.count).to.equal(6);
                expect(response.data.products[0]).to.have.property('Colors');
                done();
            });
        });

        it('should return productswith specified category',(done)=> {
            axios.get(`http://localhost:3000/api/product?page=1&c=Kitchen`).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data.products.length).to.equal(1);
                expect(response.data.count).to.equal(1);
                expect(response.data.products[0].SubcategoryName).to.equal('Kitchen');
                expect(response.data.products[0]).to.have.property('Colors');
                done();
            });
        });

        it('should return products with specified name',(done)=> {
            axios.get(`http://localhost:3000/api/product?page=1&q=bottle`).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data.products.length).to.equal(1);
                expect(response.data.count).to.equal(1);
                expect(response.data.products[0]).to.have.property('Colors');
                done();
            });
        });

        it('should return products with specified sort',(done)=> {
            axios.get(`http://localhost:3000/api/product?page=1&sort=price&by=DESC`).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data.products).to.have.lengthOf.above(0);
                expect(response.data.count).to.equal(response.data.products.length);
                expect(response.data.products[0].price).to.be.above(response.data.products[1].price);
                done();
            });
        });

    });

    describe('get product by id',()=>{
        
        it('should get specific product by id',(done)=>{
            axios.get(`http://localhost:3000/api/product/1`).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data.product.id).to.equal(1);
                expect(response.data.product).to.have.property('Colors');
                done();
            });
        });

        it('should get specific product by id and color',(done)=>{
            axios.get(`http://localhost:3000/api/product/1?color=red`).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data.product.id).to.equal(1);
                expect(response.data.product).to.have.property('Colors').with.lengthOf(1);
                expect(response.data.product.Colors[0].Color).to.equal('red');
                done();
            });
        });

    });
    after(()=> shutdown());
});
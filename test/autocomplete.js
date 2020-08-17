const axios =require('axios');
const  { expect } = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');

describe('autocomplete for search', ()=>{
    before(()=> boot());

    describe('getting results', ()=>{
        it('should get results containing the words in query',(done)=>{
            axios.get(`http://localhost:3000/api/autocomplete?q=bottle`).then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('results');
                expect(response.data.results.length).to.equal(1);
                done();
            });
        });
    });

    after(()=> shutdown());
});
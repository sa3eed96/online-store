const axios =require('axios');
const  {assert, expect} = require('chai');
const boot = require('../bin/www').boot;
const shutdown = require('../bin/www').shutdown;
const app = require('../app');
const User = require('../models/index').User;
const { hmSetAsync, hmGetAllAsync, hDelAsync, delAsync } = require('../redis');

describe.only('cart', ()=>{
    before(async ()=>{
        boot();
        const user = await User.findOne({where:{id: 1}});
        app.set('sessionMiddleware', (req, res, next) => {
            req.session = {
                user: user.toJSON(),
            };
            next()
        });
    });

    beforeEach(async()=>{
        await delAsync(`cart-1`);
        await hmSetAsync(`cart-1`, `1-RCR Glass Water Bottle,  Clear-red`, `3-4`);
    });

    describe('get added cart items',()=>{
        it('should get user cart',(done)=>{
            axios.get('http://localhost:3000/api/cart').then((response)=>{
                expect(response.status).to.equal(200);
                expect(response.data).to.have.property('cart');
                assert(response.data.cart.length == 1);
                done();
            });
        });
    });

    describe('update cart',()=>{
        it('should add item to the cart',(done)=> {
            axios.put('http://localhost:3000/api/cart',{
                productId: 2, 
                productName: 'Indes Fuggerhaus Polyester Grey 140 x 245 cm Denton Single Panel Curtain', 
                color: 'Grey', 
                quantity: '1', 
                op: '1', 
                price: '150'})
                .then(async (response)=>{
                    expect(response.status).to.equal(200);
                    const cartObject = await hmGetAllAsync(`cart-1`);
                    expect(cartObject).to.have.property('2-Indes Fuggerhaus Polyester Grey 140 x 245 cm Denton Single Panel Curtain-Grey');
                    done();
                }
            );
        });
        it('should delete item from the cart',(done)=>{
            axios.put('http://localhost:3000/api/cart',{
                productId: 1, 
                productName: 'RCR Glass Water Bottle,  Clear', 
                color: 'red',
                op: 0 })
                .then(async (response)=>{
                    expect(response.status).to.equal(200);
                    const cartObject = await hmGetAllAsync(`cart-1`);
                    assert(cartObject == null);
                    done();
                }
            );
        });
    });

    describe('empty cart from all items',()=>{
        it('should delete all items from cart', (done)=>{
            axios.delete('http://localhost:3000/api/cart').then(async (response)=>{
                expect(response.status).to.equal(200);
                const cartObject = await hmGetAllAsync(`cart-1`);
                assert( cartObject == null);
                done();
            });
        });
    });

    after(()=> shutdown());
});
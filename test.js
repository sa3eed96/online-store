const index = require('./models/index');

const seed = ()=>{
    index.sequelize.transaction(async transaction=>{
        const user = await index.User.create({firstName:'john', lastName:'doe',email:'john@site.com',password: 'password1234',phone:'0111222333'},{transaction});
        const address = await index.Address.create({country:'egypt', state:'cairo', city:'cairo', zipCode:'117755',address:'app 10 street 20', UserId: user.id},{transaction});
        const product = await index.Product.create({name: 'glass bottle', description:'for water and juice',price: '3', stockCount:'25'},{transaction});
    });
   
};

const getAddress = async()=>{
    const user = await index.User.findOne({where:{id: 1}});
    const address = await index.Address.findOne({where:{UserId: 1}});
    const purchaseDetails = [{
        ProductId: 1,
        quantity: 2,
    }];
    
    const total = 6;
    
    const shipment = { AddressId: address.id, delivery: new Date(), delivered:false };
    
    const {Purchase, PurchaseDetail, Shipment} = index;
    
    const pur = await Purchase.create({UserId: user.id, total, PurchaseDetails:purchaseDetails, Shipment: shipment},{include: [PurchaseDetail, Shipment]});
    console.log(pur);    
}
getAddress();
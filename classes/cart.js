/**
 * @module classes/cart
 */

class Cart {
    total = 0;
    items = [];
    constructor(items) {
        for (const key in items) {
            const [productId, productName, color] = key.split('-');
            const [quantity, price] = items[key].split('-');
            this.total += quantity * price;
            this.items.push({ productId, productName, color, quantity, price })
        }
    }

    get items() {
        return this.items;
    }
    
    set items(productId, productName, color, quantity, price){
        this.items.push({productId, productName, color, quantity, price});
    }

    get purchaseDetails() {
        const purchaseDetails = this.items.map(item => {
            return {
                productId: item.productId,
                quantity: item.quantity,
                color: item.color
            };
        });
        return {
            purchaseDetails,
            total: this.total,
        };
    }
};

module.exports = Cart;
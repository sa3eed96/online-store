/**
 * @module classes/cart
 */


/**
 * class representing a cart
 */
class Cart {
    total = 0;
    items = [];

    /**
     * create a cart.
     * @param {Array} items - cart items
     */
    constructor(items) {
        for (const key in items) {
            const [productId, productName, color] = key.split('-');
            const [quantity, price] = items[key].split('-');
            this.total += quantity * price;
            this.items.push({ productId, productName, color, quantity, price })
        }
    }

    /**
     * Get cart items.
     * @returns {Array} - the cart items.
     */
    get items() {
        return this.items;
    }

    /**
     * Get cart purchase details.
     * @returns {object} - total:integer representing cart total and purchaseDetails:object[] representing each product deatils.
     */
    get purchaseDetails() {
        const purchaseDetails = this.items.map(item => {
            return {
                ProductId: item.productId,
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
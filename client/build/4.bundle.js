(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{109:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(28);var r=a(34);function c(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},141:function(e,t,a){"use strict";a.r(t);var n=a(109),r=a(21),c=a(3),o=a.n(c),l=a(5),i=a(2),u=a(0),s=a.n(u),m=a(6),p=a(8),d=a(4),b=a.n(d);t.default=function(e){var t=Object(u.useState)([]),a=Object(i.a)(t,2),c=a[0],d=a[1],h=Object(u.useState)(0),f=Object(i.a)(h,2),E=f[0],v=f[1],y=Object(u.useState)(!0),w=Object(i.a)(y,2),g=w[0],N=w[1];Object(u.useEffect)((function(){(function(){var t=Object(l.a)(o.a.mark((function t(){var a,n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.get("/api/cart");case 3:a=t.sent,n=a.data,d(n.cart),r=0,n.cart.forEach((function(e){r+=e.quantity*e.price})),v(r),N(!1),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),e.showNotification(t.t0,"bg-danger","Error");case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}})()()}),[]);var j=function(){var t=Object(l.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.delete("/api/cart");case 3:d([]),v(0),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),e.showNotification(t.t0,"bg-danger","Error");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),O=function(){var t=Object(l.a)(o.a.mark((function t(a,l,i){var u,s;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a.op="0",t.next=4,b.a.put("/api/cart",Object(r.a)({},a));case 4:(u=Object(n.a)(c)).splice(l,1),d(u),s=0,u.forEach((function(e){s+=e.quantity*e.price})),v(s),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),e.showNotification(t.t0,"bg-danger","Error");case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e,a,n){return t.apply(this,arguments)}}();return s.a.createElement("div",null,s.a.createElement(p.a,{loading:g},s.a.createElement("div",{style:{minHeight:window.screen.height/3},className:"row mt-4"},s.a.createElement("div",{className:"col-md-9 mx-auto bg-white pt-2"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col"},s.a.createElement("h5",null,"Shopping Cart (",c.length,")")),s.a.createElement("div",{className:"col"},s.a.createElement("h5",{className:"text-right"},"total: ",E,s.a.createElement("small",null," EGP")))),c.length>0&&s.a.createElement("div",{className:"row"},s.a.createElement(m.b,{className:"btn btn-sm btn-success ml-3",to:{pathname:"/purchase",state:E}},"checkout"),s.a.createElement("button",{className:"btn btn-sm btn-danger ml-3",onClick:j},"Empty Cart")),s.a.createElement("hr",null),s.a.createElement("div",{className:"row"},0===c.length&&s.a.createElement("div",{className:"alert-warning col mx-2"},s.a.createElement("p",null,"Cart is currently empty",s.a.createElement("br",null),"Add items to your cart and view them here before checkout")),c.map((function(e,t){return s.a.createElement("div",{className:"col-6 border-right",key:e.productId},s.a.createElement("h6",null,s.a.createElement(m.b,{to:{pathname:"/product/".concat(e.productId)}},e.productName)),s.a.createElement("h6",null,"quantity: ",e.quantity),s.a.createElement("h6",null,"total: ",e.price*e.quantity,s.a.createElement("small",null," EGP")),s.a.createElement("h6",null,"color: ",e.color),s.a.createElement("button",{className:"btn btn-secondary mr-2",onClick:function(a){return O(e,t,a)}},"Delete"),s.a.createElement(m.b,{className:"btn btn-primary mr-2",to:{pathname:"/addtocart",state:{product:{id:e.productId,name:e.productName,quantity:e.quantity,price:e.price},color:e.color}}},"Edit"))})))))))}}}]);
//# sourceMappingURL=4.bundle.js.map
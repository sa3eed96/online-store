(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{133:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();t.startLoadingScripts=b;var c=a(0),o=u(c),s=u(a(20)),l=u(a(134)),i=a(135);function u(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function m(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function f(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}var h=[],v={},y=[];function b(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.noop,a=function(e){if(h.indexOf(e)<0)return function(t){var a=v[e]||[];if(a.push(t),v[e]=a,1===a.length)return(0,i.newScript)(e)((function(t){v[e].forEach((function(a){return a(t,e)})),delete v[e]}))}},n=e.map((function(e){return Array.isArray(e)?e.map(a):a(e)}));i.series.apply(void 0,f(n))((function(e,t){e?y.push(t):Array.isArray(t)?t.forEach(E):E(t)}))((function(e){g(),t(e)}))}var E=function(e){h.indexOf(e)<0&&h.push(e)},g=function(){y.length>0&&(y.forEach((function(e){var t=document.querySelector("script[src='"+e+"']");null!=t&&t.parentNode.removeChild(t)})),y=[])};t.default=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){var a=function(a){function c(e,t){d(this,c);var a=p(this,(c.__proto__||Object.getPrototypeOf(c)).call(this,e,t));return a.state={isScriptLoaded:!1,isScriptLoadSucceed:!1},a._isMounted=!1,a}return m(c,a),r(c,[{key:"componentDidMount",value:function(){var e=this;this._isMounted=!0,b(t,(function(t){e._isMounted&&e.setState({isScriptLoaded:!0,isScriptLoadSucceed:!t},(function(){t||e.props.onScriptLoaded()}))}))}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var t=n({},this.props,this.state);return o.default.createElement(e,t)}}]),c}(c.Component);return a.propTypes={onScriptLoaded:s.default.func},a.defaultProps={onScriptLoaded:i.noop},(0,l.default)(a,e)}}},134:function(e,t,a){"use strict";var n={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,mixins:!0,propTypes:!0,type:!0},r={name:!0,length:!0,prototype:!0,caller:!0,arguments:!0,arity:!0},c="function"==typeof Object.getOwnPropertySymbols;e.exports=function(e,t,a){if("string"!=typeof t){var o=Object.getOwnPropertyNames(t);c&&(o=o.concat(Object.getOwnPropertySymbols(t)));for(var s=0;s<o.length;++s)if(!(n[o[s]]||r[o[s]]||a&&a[o[s]]))try{e[o[s]]=t[o[s]]}catch(e){}}return e}},135:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.isDefined=function(e){return null!=e};var n=t.isFunction=function(e){return"function"==typeof e},r=(t.noop=function(e){},t.newScript=function(e){return function(t){var a=document.createElement("script");return a.src=e,a.addEventListener("load",(function(){return t(null,e)})),a.addEventListener("error",(function(){return t(!0,e)})),document.body.appendChild(a),a}},function(e){var t=Object.keys(e),a=-1;return{next:function(){return++a>=t.length?null:t[a]}}}),c=t.parallel=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){return function(a){var r=!1,c=0,o=[];(t=t.filter(n)).length<=0?a(null):t.forEach((function(s,l){s((function(s){for(var i=arguments.length,u=Array(i>1?i-1:0),d=1;d<i;d++)u[d-1]=arguments[d];s?r=!0:(u.length<=1&&(u=u[0]),o[l]=u,c++),n(e)&&e.call(null,s,u,l),r?a(!0):t.length===c&&a(null,o)}))}))}}};t.series=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){return function(a){t=t.filter((function(e){return null!=e}));var o=r(t),s=function(){var a=o.next(),n=t[a];return Array.isArray(n)&&(n=c.apply(null,n).call(null,e)),[+a,n]},l=void 0,i=void 0,u=s();if(l=u[0],null==(i=u[1]))return a(null);var d=[];!function t(){i((function(r){for(var c=arguments.length,o=Array(c>1?c-1:0),p=1;p<c;p++)o[p-1]=arguments[p];if(o.length<=1&&(o=o[0]),n(e)&&e.call(null,r,o,l),r)a(r);else{if(d.push(o),u=s(),l=u[0],null==(i=u[1]))return a(null,d);t()}}))}()}}}},151:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(0),c=a.n(r),o=a(3),s=a.n(o),l=a(5),i=a(6),u=a(4),d=a.n(u),p=a(8),m=function(e){var t=Object(r.useState)([]),a=Object(n.a)(t,2),o=a[0],u=a[1],m=Object(r.useState)(""),f=Object(n.a)(m,2),h=f[0],v=f[1],y=Object(r.useState)(""),b=Object(n.a)(y,2),E=b[0],g=b[1],w=Object(r.useState)(!0),O=Object(n.a)(w,2),N=O[0],S=O[1];Object(r.useEffect)((function(){(function(){var e=Object(l.a)(s.a.mark((function e(){var t,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("/api/address");case 3:t=e.sent,a=t.data,u(a.addresses),a.addresses.length>0&&v(a.addresses[0].id),S(!1),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),S(!1),g("could not fetch your addresses");case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var j=function(e){v(e.target.value)};return c.a.createElement("div",null,c.a.createElement(p.a,{loading:N},c.a.createElement("div",null,c.a.createElement("div",{className:"row mt-1"},c.a.createElement("h5",{className:"col-auto"},"Choose Delivery Address"),c.a.createElement("div",{className:"col-auto"},c.a.createElement(i.b,{className:"btn btn-sm btn-success",to:{pathname:"/settings/addresses/add"}},"add an address"))),c.a.createElement("hr",null),c.a.createElement("div",{className:"row mb-1"},0===o.length&&c.a.createElement("div",{className:"alert-warning col mx-2"},c.a.createElement("p",null,"You Have no Addresses",c.a.createElement("br",null),"Add an address to deliver orders to")),o.length>0&&c.a.createElement("div",{className:"col-12"},c.a.createElement("form",{onSubmit:function(t){t.preventDefault(),""===h?g("please choose an address"):(g(""),e.setSelectedAddress(h))}},o.map((function(e){return c.a.createElement("div",{className:"form-check my-4",key:e.id},c.a.createElement("input",{type:"radio",name:"address",value:e.id,checked:h==e.id,onChange:j,className:"form-check-input"}),c.a.createElement("label",{className:"form-check-label"},e.country," | ",e.address),c.a.createElement("br",null))})),c.a.createElement("p",{className:"text-danger"},c.a.createElement("small",null,E)),c.a.createElement("button",{className:"btn btn-primary"},"next")))))))},f=function(e){var t=e.total,a=e.addressId,o=Object(r.useState)(""),i=Object(n.a)(o,2),u=i[0],p=i[1],m=function(){var t=Object(l.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,p(""),t.next=4,d.a.post("/api/purchase",{addressId:a,paymentType:"ondoor",isPaid:!1});case 4:e.history.replace("/purchases"),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),p("could not process purchase, please try again later");case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}();return c.a.createElement("div",{className:"col-md-6 col-sm-12"},c.a.createElement("div",{className:"row"},c.a.createElement("p",{className:"col-auto"},"pay when items are delivered at your door."),c.a.createElement("p",{className:"col-auto"},"total: ",c.a.createElement("b",null,t," EGP"))),c.a.createElement("div",{className:"row"},c.a.createElement("p",{className:"text-danger"},c.a.createElement("small",null,u))),c.a.createElement("div",{className:"row ml-1"},c.a.createElement("button",{className:"btn w-50 btn-success",onClick:m},"Submit Order")))},h=a(24),v=a(25),y=a(27),b=a(26),E=a(39),g=a.n(E),w=a(133),O=a.n(w),N=null,S=function(e){Object(y.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).createOrder=function(){var e=Object(l.a)(s.a.mark((function e(t,a){var r,c,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n.setState({error:""}),e.next=4,d.a.get("/api/currency");case 4:return r=e.sent,c=r.data,o=(n.state.total/c.egp).toFixed(2),e.abrupt("return",a.order.create({purchase_units:[{description:"online store Purchase",amount:{currency_code:"EUR",value:o}}]}));case 10:e.prev=10,e.t0=e.catch(0),n.setState({error:"could not process purchase, try again later"});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,a){return e.apply(this,arguments)}}(),n.onApprove=function(e,t){t.order.capture().then(function(){var t=Object(l.a)(s.a.mark((function t(a){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return{payerID:e.payerID,orderID:e.orderID},t.next=3,d.a.post("/api/purchase",{addressId:n.state.addressId,paymentType:"paypal",isPaid:!0});case 3:n.state.history.replace("/purchases");case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},n.state={showButtons:!1,loading:!0,paid:!1,total:e.total,addressId:e.addressId,history:e.history,error:""},window.React=c.a,window.ReactDOM=g.a,n}return Object(v.a)(a,[{key:"componentDidMount",value:function(){var e=this.props,t=e.isScriptLoaded,a=e.isScriptLoadSucceed;t&&a&&(N=window.paypal.Buttons.driver("react",{React:c.a,ReactDOM:g.a}),this.setState({loading:!1,showButtons:!0}))}},{key:"componentWillReceiveProps",value:function(e){var t=e.isScriptLoaded,a=e.isScriptLoadSucceed;!this.state.showButtons&&!this.props.isScriptLoaded&&t&&a&&(N=window.paypal.Buttons.driver("react",{React:c.a,ReactDOM:g.a}),this.setState({loading:!1,showButtons:!0}))}},{key:"render",value:function(){var e=this,t=this.state,a=t.showButtons;t.loading,t.paid;return c.a.createElement("div",{className:"col-md-6 col-sm-12"},c.a.createElement("div",{className:"row"},c.a.createElement("p",{className:"col-auto"},"pay online."),c.a.createElement("h6",{className:"col-auto"},c.a.createElement("b",null,"total: ",this.state.total," EGP"))),c.a.createElement(p.a,{loading:this.state.loading}),c.a.createElement("div",{className:"row"},c.a.createElement("p",{className:"text-danger"},c.a.createElement("small",null,this.state.error))),a&&c.a.createElement("div",{className:"row ml-1"},c.a.createElement(N,{createOrder:function(t,a){return e.createOrder(t,a)},onApprove:function(t,a){return e.onApprove(t,a)}})))}}]),a}(r.Component),j=O()("https://www.paypal.com/sdk/js?client-id=ASgi4H9ZLYf37FDnMQQIu8YN2_miiVDUBEES4AirKyAt2gGzgf3HNEmos9lCCA6KT3v9JMmiQOSBKLBf&disable-funding=credit,card&currency=EUR")(S),k=a(15);t.default=function(e){var t=e.location.state,a=Object(r.useState)(null),o=Object(n.a)(a,2),s=o[0],l=o[1],i=Object(r.useState)("ondoor"),u=Object(n.a)(i,2),d=u[0],p=u[1],h=function(e){p(e.target.value)};return c.a.createElement("div",{style:{minHeight:screen.height/3},className:"row mt-4"},c.a.createElement("div",{className:"col-md-8 mx-auto bg-white"},!s&&c.a.createElement(k.a,null,c.a.createElement(m,Object.assign({},e,{setSelectedAddress:function(e){l(e)}}))),s&&c.a.createElement("div",null,c.a.createElement("div",{className:"row mt-1"},c.a.createElement("h5",{className:"col-12"},"Choose Payment Method")),c.a.createElement("hr",null),c.a.createElement("div",{className:"row mb-1"},c.a.createElement("form",{className:"col-md-6 col-sm-11 border-right"},c.a.createElement("div",{className:"form-check"},c.a.createElement("input",{type:"radio",name:"payment",value:"ondoor",onChange:h,checked:"ondoor"===d,className:"form-check-input"}),c.a.createElement("label",{className:"form-check-label"},"on door")),c.a.createElement("div",{className:"form-check"},c.a.createElement("input",{type:"radio",name:"payment",value:"paypal",onChange:h,checked:"paypal"===d,className:"form-check-input"}),c.a.createElement("label",{className:"form-check-label"},"paypal"))),s&&"ondoor"===d&&c.a.createElement(k.a,null,c.a.createElement(f,Object.assign({},e,{total:t,addressId:s}))),s&&"paypal"===d&&c.a.createElement(k.a,null,c.a.createElement(j,Object.assign({},e,{total:t,addressId:s})))))))}}}]);
//# sourceMappingURL=2.bundle.js.map
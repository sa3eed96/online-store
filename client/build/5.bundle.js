(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{107:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(27);var r=a(33);function c(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},136:function(e,t,a){"use strict";a.r(t);var n=a(107),r=a(3),c=a.n(r),s=a(5),l=a(2),o=a(0),i=a.n(o),d=a(14),u=a(4),m=a(11),b=a(6),p=a.n(b);t.default=function(e){var t=Object(o.useState)([]),a=Object(l.a)(t,2),r=a[0],b=a[1],f=Object(d.h)().url,v=Object(o.useState)(!0),h=Object(l.a)(v,2),E=h[0],w=h[1];Object(o.useEffect)((function(){(function(){var t=Object(s.a)(c.a.mark((function t(){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p.a.get("/api/address");case 3:a=t.sent,b(a.data.addresses),w(!1),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),e.showNotification("failed to fetch Addresses","bg-danger","Error");case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}})()()}),[]);var y=function(){var t=Object(s.a)(c.a.mark((function t(a,s,l){var o;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,l.preventDefault(),t.next=4,p.a.delete("/api/address/".concat(a));case 4:(o=Object(n.a)(r)).splice(s,1),b(o),e.showNotification("Address Deleted","bg-success","Success"),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),e.showNotification("failed to delete Address","bg-danger","Error");case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e,a,n){return t.apply(this,arguments)}}();return i.a.createElement("div",null,i.a.createElement(m.a,{loading:E},i.a.createElement("div",{style:{minHeight:window.screen.height/3},className:"row mt-2"},i.a.createElement("div",{className:"col-md-9 mx-auto bg-white pt-2"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-12"},i.a.createElement("h5",{className:"ml-2"},"Your Addresses")),i.a.createElement("div",{className:"col-12"},i.a.createElement(u.b,{className:"btn btn-sm btn-success m-2",to:{pathname:"".concat(f,"/add")}},"add address"))),i.a.createElement("hr",null),0===r.length&&i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"alert-warning col mx-2"},i.a.createElement("p",null,"You Have no Addresses",i.a.createElement("br",null),"Add an address to deliver orders to"))),r.length>0&&i.a.createElement("div",{className:"row border bg-light mx-4 mb-4"},r.map((function(e,t){return i.a.createElement("div",{className:"col-10",key:e.id},i.a.createElement("p",null,e.city,", ",e.country),i.a.createElement("p",null,"Address: ",e.address),i.a.createElement("p",null,"Zip Code: ",e.zipCode),i.a.createElement(u.b,{className:"btn btn-primary mr-2",to:{pathname:"".concat(f,"/").concat(e.id),state:e}},"Edit"),i.a.createElement("button",{className:"btn btn-secondary mr-2",onClick:function(a){return y(e.id,t,a)}},"Delete"),i.a.createElement("hr",null))})))))))}}}]);
//# sourceMappingURL=5.bundle.js.map
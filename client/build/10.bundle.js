(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{141:function(e,a,t){"use strict";t.r(a);var n=t(3),c=t.n(n),l=t(5),r=t(2),s=t(0),m=t.n(s),i=t(12),o=t(4),u=t(6),p=t.n(u),d=t(127),E=t(28);a.default=function(e){var a=Object(s.useState)([]),t=Object(r.a)(a,2),n=t[0],u=t[1],v=Object(s.useState)(1),N=Object(r.a)(v,2),b=N[0],h=N[1],w=Object(s.useState)(0),g=Object(r.a)(w,2),f=g[0],O=g[1],j=Object(i.h)().url,x=Object(s.useState)(!0),y=Object(r.a)(x,2),Y=y[0],P=y[1];Object(s.useEffect)((function(){(function(){var e=Object(l.a)(c.a.mark((function e(){var a,t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.a.get("/api/purchase?page=".concat(b));case 3:a=e.sent,t=a.data,u(t.purchases),O(t.count),P(!1),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()}),[b]);return m.a.createElement("div",{style:{minHeight:window.screen.height/3},className:"row mt-4"},Y&&m.a.createElement("div",{className:"spinner-border text-primary mx-auto",role:"status"},m.a.createElement("span",{className:"sr-only"},"Loading...")),!Y&&m.a.createElement("div",{className:"col-8 mx-auto bg-white"},m.a.createElement("div",{className:"row"},m.a.createElement("h5",{className:"col"},"My Purchases")),m.a.createElement("hr",null),m.a.createElement("div",{className:"row"},0===n.length&&m.a.createElement("div",{className:"alert-warning col mx-2"},m.a.createElement("p",null,"You Have No Purchases",m.a.createElement("br",null),"Order items to view them here")),n.length>0&&m.a.createElement("div",{className:"col list-group list-group-flush"},n.map((function(e){return m.a.createElement(o.b,{to:"".concat(j,"/").concat(e.id),className:"list-group-item list-group-item-action",key:e.id},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,"status: ",e.isPaid?m.a.createElement("span",{className:"text-success"},"Paid"):m.a.createElement("span",{className:"text-danger"},"Not Paid")," ",function(e){return e?m.a.createElement("span",{className:"text-success"},"Delivered"):m.a.createElement("span",{className:"text-warning"},"Not Delivered")}(e.Shipment.delivered)))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"ordered on:")," ",Object(d.a)(e.createdAt).format("DD-MM-YYYY HH:mm"))),m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"delivered on:")," ",Object(d.a)(e.Shipment.delivery).format("DD-MM-YYYY")))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"payment type:")," ",e.paymentType)),m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"total:")," ",e.total,m.a.createElement("small",null," EGP")))))})),m.a.createElement("hr",null))),f>0&&m.a.createElement(E.a,{page:b,count:f,updatePage:function(e){P(!0),h(e)},perPage:12})))}}}]);
//# sourceMappingURL=10.bundle.js.map
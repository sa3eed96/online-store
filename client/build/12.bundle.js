(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{144:function(e,a,t){"use strict";t.r(a);var c=t(3),l=t.n(c),n=t(4),r=t(2),s=t(0),m=t.n(s),i=t(14),u=t(6),o=t(5),p=t.n(o),d=t(129),E=t(34),v=t(8);a.default=function(e){var a=Object(s.useState)([]),t=Object(r.a)(a,2),c=t[0],o=t[1],b=Object(s.useState)(1),h=Object(r.a)(b,2),N=h[0],w=h[1],g=Object(s.useState)(0),f=Object(r.a)(g,2),O=f[0],j=f[1],x=Object(i.h)().url,y=Object(s.useState)(!0),Y=Object(r.a)(y,2),P=Y[0],D=Y[1];Object(s.useEffect)((function(){(function(){var e=Object(n.a)(l.a.mark((function e(){var a,t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.a.get("/api/purchase?page=".concat(N));case 3:a=e.sent,t=a.data,o(t.purchases),j(t.count),D(!1),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()}),[N]);return m.a.createElement("div",{style:{minHeight:window.screen.height/3},className:"row mt-4"},m.a.createElement("div",{className:"col-8 mx-auto bg-white"},m.a.createElement(v.a,{loading:P},m.a.createElement("div",{className:"row"},m.a.createElement("h5",{className:"col"},"My Purchases")),m.a.createElement("hr",null),m.a.createElement("div",{className:"row"},0===c.length&&m.a.createElement("div",{className:"alert-warning col mx-2"},m.a.createElement("p",null,"You Have No Purchases",m.a.createElement("br",null),"Order items to view them here")),c.length>0&&m.a.createElement("div",{className:"col list-group list-group-flush"},c.map((function(e){return m.a.createElement(u.b,{to:"".concat(x,"/").concat(e.id),className:"list-group-item list-group-item-action",key:e.id},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,"status: ",e.isPaid?m.a.createElement("span",{className:"text-success"},"Paid"):m.a.createElement("span",{className:"text-danger"},"Not Paid")," ",function(e){return e?m.a.createElement("span",{className:"text-success"},"Delivered"):m.a.createElement("span",{className:"text-warning"},"Not Delivered")}(e.Shipment.delivered)))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"ordered on:")," ",Object(d.a)(e.createdAt).format("DD-MM-YYYY HH:mm"))),m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"delivered on:")," ",Object(d.a)(e.Shipment.delivery).format("DD-MM-YYYY")))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"payment type:")," ",e.paymentType)),m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"total:")," ",e.total,m.a.createElement("small",null," EGP")))))})),m.a.createElement("hr",null))),O>0&&m.a.createElement(E.a,{page:N,count:O,updatePage:function(e){D(!0),w(e)},perPage:12}))))}}}]);
//# sourceMappingURL=12.bundle.js.map
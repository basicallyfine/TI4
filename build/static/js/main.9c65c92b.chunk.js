(this["webpackJsonpti4-reference"]=this["webpackJsonpti4-reference"]||[]).push([[0],{238:function(t,e,n){t.exports=n(379)},375:function(t,e,n){},376:function(t,e,n){},379:function(t,e,n){"use strict";n.r(e);var a=n(1),r=n.n(a),c=n(182),i=n.n(c),u=n(60),l=n.n(u),o=n(88),s=n(197),m=n(14),h=(n(199),n(198)),f=n(196),p=(n(183),n(36),n(18)),d=n(13),v=function(){function t(){Object(p.a)(this,t);for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];this.dice=n.map((function(t){var e=parseFloat(t,10);return 0===e&&(e=10),e}))}return Object(d.a)(t,[{key:"format",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.textOutput=t,this}},{key:"calculate",value:function(){var t=this;this._results={},this._cumulative={};this.dice.map((function(t){return(11-t)/10}));for(var e=function(e){var n=e.toString(2).padStart(t.dice.length,"0"),a=n.replace(/0/g,"").length,r=t.dice.reduce((function(t,e,a){return t*("1"===n[a]?(11-e)/10:1-(11-e)/10)}),1);t._results[a.toString(10)]||(t._results[a.toString(10)]=0),t._results[a.toString(10)]+=r},n=0;n<Math.pow(2,this.dice.length);n+=1)e(n);for(var a=this.dice.length;a>=0;a-=1)this._cumulative[a.toString(10)]=this._results[a.toString(10)],this._cumulative[(a+1).toString(10)]?this._cumulative[a.toString(10)]+=this._cumulative[(a+1).toString(10)]:this._cumulative[a.toString(10)]=this._results[a.toString(10)];return this}},{key:"results",get:function(){if(this._results||this.calculate(),this.textOutput){var t=[];for(var e in this._results)t.push("".concat(e,": ").concat(Math.round(100*this._results[e]),"%"));return t.join("\n")}return this._results}},{key:"cumulative",get:function(){if(this._cumulative||this.calculate(),this.textOutput){var t=[];for(var e in this._cumulative)t.push(">= ".concat(e,": ").concat(Math.round(100*this._cumulative[e]),"%"));return t.join("\n")}return this._cumulative}}]),t}(),g=(n(375),"AT_LEAST"),b="EXACT",E={};function y(t,e,n){var a=t.map((function(t,a){return t+(e[a]-t)*n}));return"rgba(".concat(a.join(","),")")}var _=function(){var t=Object(a.useState)(g),e=Object(m.a)(t,2),n=e[0],c=e[1],i=Object(a.useState)([]),u=Object(m.a)(i,2),o=u[0],s=u[1],p=n===b?"exactly":"at least",d=l.a.chain(o).map((function(t){return t.dice.length})).max().value(),_={min:1/0,max:-1/0},S=[],x=o.map((function(t,e){for(var a=t.key,r=t.dice,c=function(t){return E[t]||(E[t]=Object(h.a)(v,Object(f.a)(t.split(""))).calculate()),E[t]}(r)[n===b?"results":"cumulative"],i=[],u=n===b?0:1;u<=d;u+=1){var l=c[u.toString(10)];l>_.max&&(_.max=l),l<_.min&&(_.min=l),i.push(l),0===e&&S.push(u)}return{key:a,dice:r,cols:i}}));return o.filter((function(t){return t.dice})).length>0?x.push({dice:"",cols:S.map((function(){}))}):(S.push(1),x.push({dice:"",cols:[void 0]})),r.a.createElement("div",{className:"container dice-table my-2"},r.a.createElement("h1",null,"Enter hit values* into the table to see some probabilities"),r.a.createElement("p",null,r.a.createElement("strong",null,"Probability of producing ",r.a.createElement("a",{href:"#",onClick:function(t){t.preventDefault(),c(n===g?b:g)}},p)," X hits")),r.a.createElement("div",{className:"table-responsive"},r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e=t.target.querySelector("input:focus");e&&e.blur(),s(o.filter((function(t){return t.dice})))}},r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"col"}),S.map((function(t){return r.a.createElement("th",{scope:"col",className:"text-center",key:t},t)})))),r.a.createElement("tbody",null,x.map((function(t,e){var n=t.dice,a=t.cols;return r.a.createElement("tr",{key:e},r.a.createElement("th",{scope:"row",className:"dice-input-th",style:{minWidth:"".concat(.81*n.length+2.2,"em")}},r.a.createElement("input",{value:n,className:"dice-input form-control",type:"tel",placeholder:"...",onChange:function(t){var n=l.a.clone(o);n[e]||(n[e]={}),n[e].dice=t.target.value.replace(/[^\d]/g,""),l.a.last(n).dice||n.pop(),s(n)},onBlur:function(t){var e=t.target.parentNode.parentNode.parentNode;setTimeout((function(){e&&!e.querySelector("input:focus")&&s(o.filter((function(t){return t.dice})))}),100)}})),a.map((function(t,e){return r.a.createElement("td",{key:e,className:"text-center",style:{backgroundColor:"number"===typeof t?y([20,20,50],[255,40,220],(t-_.min)/(_.max-_.min)):"transparent"}},function(t){if(void 0===t)return"-";var e=Math.round(100*t);return 100===e&&(t<1&&(e=">99"),t>1&&(e="100")),"".concat(e,"%")}(t))})))})))),r.a.createElement("input",{type:"submit",style:{position:"fixed",left:"100%",top:"-100%"}})),r.a.createElement("p",{className:"mt-2 text-muted"},"*Enter ",r.a.createElement("strong",null,"0")," for 10")))},S=(n(376),Object(s.a)()),x=function(){return r.a.createElement(o.b,{history:S},r.a.createElement(o.c,null,r.a.createElement(o.a,{path:"/",component:_})))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(x,null)),document.getElementById("root"))}},[[238,1,2]]]);
//# sourceMappingURL=main.9c65c92b.chunk.js.map
/**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(){/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var t="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ba(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}var z=ba(this);function A(a,b){if(b)a:{var c=z;a=a.split(".");for(var d=0;d<a.length-1;d++){var f=a[d];if(!(f in c))break a;c=c[f]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&t(c,a,{configurable:!0,writable:!0,value:b})}}
A("Symbol",function(a){function b(f){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c("jscomp_symbol_"+(f||"")+"_"+d++,f)}function c(f,g){this.g=f;t(this,"description",{configurable:!0,writable:!0,value:g})}if(a)return a;c.prototype.toString=function(){return this.g};var d=0;return b});
A("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=z[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&t(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ca(aa(this))}})}return a});function ca(a){a={next:a};a[Symbol.iterator]=function(){return this};return a}var E;
if("function"==typeof Object.setPrototypeOf)E=Object.setPrototypeOf;else{var H;a:{var ia={a:!0},I={};try{I.__proto__=ia;H=I.a;break a}catch(a){}H=!1}E=H?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var J=E;function K(){this.o=!1;this.h=null;this.A=void 0;this.g=1;this.v=0;this.m=null}function L(a){if(a.o)throw new TypeError("Generator is already running");a.o=!0}K.prototype.s=function(a){this.A=a};
function M(a,b){a.m={B:b,C:!0};a.g=a.v}K.prototype.return=function(a){this.m={return:a};this.g=this.v};function N(a,b){a.g=3;return{value:b}}function ja(a){this.g=new K;this.h=a}function ka(a,b){L(a.g);var c=a.g.h;if(c)return O(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.g.return);a.g.return(b);return P(a)}
function O(a,b,c,d){try{var f=b.call(a.g.h,c);if(!(f instanceof Object))throw new TypeError("Iterator result "+f+" is not an object");if(!f.done)return a.g.o=!1,f;var g=f.value}catch(h){return a.g.h=null,M(a.g,h),P(a)}a.g.h=null;d.call(a.g,g);return P(a)}function P(a){for(;a.g.g;)try{var b=a.h(a.g);if(b)return a.g.o=!1,{value:b.value,done:!1}}catch(c){a.g.A=void 0,M(a.g,c)}a.g.o=!1;if(a.g.m){b=a.g.m;a.g.m=null;if(b.C)throw b.B;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function la(a){this.next=function(b){L(a.g);a.g.h?b=O(a,a.g.h.next,b,a.g.s):(a.g.s(b),b=P(a));return b};this.throw=function(b){L(a.g);a.g.h?b=O(a,a.g.h["throw"],b,a.g.s):(M(a.g,b),b=P(a));return b};this.return=function(b){return ka(a,b)};this[Symbol.iterator]=function(){return this}}function Q(a,b){b=new la(new ja(b));J&&a.prototype&&J(b,a.prototype);return b}Array.from||(Array.from=function(a){return[].slice.call(a)});
Object.assign||(Object.assign=function(a){for(var b=[].slice.call(arguments,1),c=0,d;c<b.length;c++)if(d=b[c])for(var f=a,g=Object.keys(d),h=0;h<g.length;h++){var r=g[h];f[r]=d[r]}return a});var ma=setTimeout;function na(){}function oa(a,b){return function(){a.apply(b,arguments)}}function R(a){if(!(this instanceof R))throw new TypeError("Promises must be constructed via new");if("function"!==typeof a)throw new TypeError("not a function");this.i=0;this.u=!1;this.j=void 0;this.l=[];pa(a,this)}
function qa(a,b){for(;3===a.i;)a=a.j;0===a.i?a.l.push(b):(a.u=!0,S(function(){var c=1===a.i?b.D:b.F;if(null===c)(1===a.i?T:W)(b.promise,a.j);else{try{var d=c(a.j)}catch(f){W(b.promise,f);return}T(b.promise,d)}}))}function T(a,b){try{if(b===a)throw new TypeError("A promise cannot be resolved with itself.");if(b&&("object"===typeof b||"function"===typeof b)){var c=b.then;if(b instanceof R){a.i=3;a.j=b;X(a);return}if("function"===typeof c){pa(oa(c,b),a);return}}a.i=1;a.j=b;X(a)}catch(d){W(a,d)}}
function W(a,b){a.i=2;a.j=b;X(a)}function X(a){2===a.i&&0===a.l.length&&S(function(){a.u||"undefined"!==typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",a.j)});for(var b=0,c=a.l.length;b<c;b++)qa(a,a.l[b]);a.l=null}function ra(a,b,c){this.D="function"===typeof a?a:null;this.F="function"===typeof b?b:null;this.promise=c}function pa(a,b){var c=!1;try{a(function(d){c||(c=!0,T(b,d))},function(d){c||(c=!0,W(b,d))})}catch(d){c||(c=!0,W(b,d))}}
R.prototype["catch"]=function(a){return this.then(null,a)};R.prototype.then=function(a,b){var c=new this.constructor(na);qa(this,new ra(a,b,c));return c};R.prototype["finally"]=function(a){var b=this.constructor;return this.then(function(c){return b.resolve(a()).then(function(){return c})},function(c){return b.resolve(a()).then(function(){return b.reject(c)})})};
function sa(a){return new R(function(b,c){function d(r,q){try{if(q&&("object"===typeof q||"function"===typeof q)){var v=q.then;if("function"===typeof v){v.call(q,function(x){d(r,x)},c);return}}f[r]=q;0===--g&&b(f)}catch(x){c(x)}}if(!a||"undefined"===typeof a.length)return c(new TypeError("Promise.all accepts an array"));var f=Array.prototype.slice.call(a);if(0===f.length)return b([]);for(var g=f.length,h=0;h<f.length;h++)d(h,f[h])})}
function ta(a){return a&&"object"===typeof a&&a.constructor===R?a:new R(function(b){b(a)})}function ua(a){return new R(function(b,c){c(a)})}function va(a){return new R(function(b,c){if(!a||"undefined"===typeof a.length)return c(new TypeError("Promise.race accepts an array"));for(var d=0,f=a.length;d<f;d++)ta(a[d]).then(b,c)})}var S="function"===typeof setImmediate&&function(a){setImmediate(a)}||function(a){ma(a,0)};/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
if(!window.Promise){window.Promise=R;R.prototype.then=R.prototype.then;R.all=sa;R.race=va;R.resolve=ta;R.reject=ua;var Y=document.createTextNode(""),Z=[];(new MutationObserver(function(){for(var a=Z.length,b=0;b<a;b++)Z[b]();Z.splice(0,a)})).observe(Y,{characterData:!0});S=function(a){Z.push(a);Y.textContent=0<Y.textContent.length?"":"a"}};/*
 Copyright (C) 2015 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function(a,b){if(!(b in a)){var c=typeof global===typeof c?window:global,d=0,f=String(Math.random()),g="__\u0001symbol@@"+f,h=a.getOwnPropertyNames,r=a.getOwnPropertyDescriptor,q=a.create,v=a.keys,x=a.freeze||a,p=a.defineProperty,wa=a.defineProperties,l=r(a,"getOwnPropertyNames"),u=a.prototype,B=u.hasOwnProperty,xa=u.propertyIsEnumerable,ya=u.toString,da=function(m,e,k){B.call(m,g)||p(m,g,{enumerable:!1,configurable:!1,writable:!1,value:{}});m[g]["@@"+e]=k},za=function(m,e){var k=q(m);h(e).forEach(function(n){F.call(e,
n)&&U(k,n,e[n])});return k},Aa=function(){},ea=function(m){return m!=g&&!B.call(y,m)},C=function(m){return m!=g&&B.call(y,m)},F=function(m){var e=String(m);return C(e)?B.call(this,e)&&!!this[g]&&this[g]["@@"+e]:xa.call(this,m)},fa=function(m){p(u,m,{enumerable:!1,configurable:!0,get:Aa,set:function(e){V(this,m,{enumerable:!1,configurable:!0,writable:!0,value:e});da(this,m,!0)}});y[m]=p(a(m),"constructor",Ba);return x(y[m])},G=function k(e){if(this instanceof k)throw new TypeError("Symbol is not a constructor");
return fa("__\u0001symbol:".concat(e||"",f,++d))},y=q(null),Ba={value:G},Ca=function(e){return y[e]},U=function(e,k,n){var w=String(k);if(C(w)){k=V;if(n.enumerable){var D=q(n);D.enumerable=!1}else D=n;k(e,w,D);da(e,w,!!n.enumerable)}else p(e,k,n);return e},ha=function(e){return h(e).filter(C).map(Ca)};l.value=U;p(a,"defineProperty",l);l.value=ha;p(a,b,l);l.value=function(e){return h(e).filter(ea)};p(a,"getOwnPropertyNames",l);l.value=function(e,k){var n=ha(k);n.length?v(k).concat(n).forEach(function(w){F.call(k,
w)&&U(e,w,k[w])}):wa(e,k);return e};p(a,"defineProperties",l);l.value=F;p(u,"propertyIsEnumerable",l);l.value=G;p(c,"Symbol",l);l.value=function(e){e="__\u0001symbol:".concat("__\u0001symbol:",e,f);return e in u?y[e]:fa(e)};p(G,"for",l);l.value=function(e){if(ea(e))throw new TypeError(e+" is not a symbol");if(B.call(y,e)&&(e=e.slice(10),"__\u0001symbol:"===e.slice(0,10)&&(e=e.slice(10),e!==f)))return e=e.slice(0,e.length-f.length),0<e.length?e:void 0};p(G,"keyFor",l);l.value=function(e,k){var n=r(e,
k);n&&C(k)&&(n.enumerable=F.call(e,k));return n};p(a,"getOwnPropertyDescriptor",l);l.value=function(e,k){return 1===arguments.length||"undefined"===typeof k?q(e):za(e,k)};p(a,"create",l);l.value=function(){var e=ya.call(this);return"[object String]"===e&&C(this)?"[object Symbol]":e};p(u,"toString",l);try{if(!0===q(p({},"__\u0001symbol:",{get:function(){return p(this,"__\u0001symbol:",{value:!0})["__\u0001symbol:"]}}))["__\u0001symbol:"])var V=p;else throw"IE11";}catch(e){V=function(k,n,w){var D=r(u,
n);delete u[n];p(k,n,w);p(u,n,D)}}}})(Object,"getOwnPropertySymbols");
(function(a,b){var c=a.defineProperty,d=a.prototype,f=d.toString,g;"iterator match replace search split hasInstance isConcatSpreadable unscopables species toPrimitive toStringTag".split(" ").forEach(function(h){h in b||(c(b,h,{value:b(h)}),"toStringTag"===h&&(g=a.getOwnPropertyDescriptor(d,"toString"),g.value=function(){var r=f.call(this),q=null==this?this:this[b.toStringTag];return null==q?r:"[object "+q+"]"},c(d,"toString",g)))})})(Object,Symbol);
(function(a,b,c){function d(){return this}b[a]||(b[a]=function(){var f=0,g=this,h={next:function(){var r=g.length<=f;return r?{done:r}:{done:r,value:g[f++]}}};h[a]=d;return h});c[a]||(c[a]=function(){var f=String.fromCodePoint,g=this,h=0,r=g.length,q={next:function(){var v=r<=h,x=v?"":f(g.codePointAt(h));h+=x.length;return v?{done:v}:{done:v,value:x}}};q[a]=d;return q})})(Symbol.iterator,Array.prototype,String.prototype);/*

Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var Da=Object.prototype.toString;Object.prototype.toString=function(){return void 0===this?"[object Undefined]":null===this?"[object Null]":Da.call(this)};Object.keys=function(a){return Object.getOwnPropertyNames(a).filter(function(b){return(b=Object.getOwnPropertyDescriptor(a,b))&&b.enumerable})};
String.prototype[Symbol.iterator]&&String.prototype.codePointAt||(String.prototype[Symbol.iterator]=function Ea(){var b,c=this;return Q(Ea,function(d){1==d.g&&(b=0);if(3!=d.g)return b<c.length?d=N(d,c[b]):(d.g=0,d=void 0),d;b++;d.g=2})});Set.prototype[Symbol.iterator]||(Set.prototype[Symbol.iterator]=function Fa(){var b,c=this,d;return Q(Fa,function(f){1==f.g&&(b=[],c.forEach(function(g){b.push(g)}),d=0);if(3!=f.g)return d<b.length?f=N(f,b[d]):(f.g=0,f=void 0),f;d++;f.g=2})});
Map.prototype[Symbol.iterator]||(Map.prototype[Symbol.iterator]=function Ga(){var b,c=this,d;return Q(Ga,function(f){1==f.g&&(b=[],c.forEach(function(g,h){b.push([h,g])}),d=0);if(3!=f.g)return d<b.length?f=N(f,b[d]):(f.g=0,f=void 0),f;d++;f.g=2})});/*

Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
}).call(this);

//# sourceMappingURL=webcomponents-pf_js.js.map

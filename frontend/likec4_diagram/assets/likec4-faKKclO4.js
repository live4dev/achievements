import{r as vt,p as gt,d as Wn,j as nr}from"./vendors-CwlMtw8m.js";const sc="modulepreload",cc=function(e){return"/"+e},cl={},Ft=function(t,n,i){let r=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),a=l?.nonce||l?.getAttribute("nonce");r=s(n.map(c=>{if(c=cc(c),c in cl)return;cl[c]=!0;const d=c.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${h}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":sc,d||(m.as="script"),m.crossOrigin="",m.href=c,a&&m.setAttribute("nonce",a),document.head.appendChild(m),d)return new Promise((u,f)=>{m.addEventListener("load",u),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(l){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=l,window.dispatchEvent(a),!a.defaultPrevented)throw l}return r.then(l=>{for(const a of l||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})};let Re=[],rt=0,Mn=0;const Lr=e=>{let t=[],n={get(){return n.lc||n.listen(()=>{})(),n.value},lc:0,listen(i){return n.lc=t.push(i),()=>{for(let o=rt+4;o<Re.length;)Re[o]===i?Re.splice(o,4):o+=4;let r=t.indexOf(i);~r&&(t.splice(r,1),--n.lc||n.off())}},notify(i,r){Mn++;let o=!Re.length;for(let l of t)Re.push(l,n.value,i,r);if(o){for(rt=0;rt<Re.length;rt+=4)Re[rt](Re[rt+1],Re[rt+2],Re[rt+3]);Re.length=0}},off(){},set(i){let r=n.value;r!==i&&(n.value=i,n.notify(r))},subscribe(i){let r=n.listen(i);return i(n.value),r},value:e};return n};let dc=(e,t,n,i)=>(e.events=e.events||{},e.events[n+10]||(e.events[n+10]=i(r=>{e.events[n].reduceRight((o,l)=>(l(o),o),{shared:{},...r})})),e.events[n]=e.events[n]||[],e.events[n].push(t),()=>{let r=e.events[n],o=r.indexOf(t);r.splice(o,1),r.length||(delete e.events[n],e.events[n+10](),delete e.events[n+10])}),hc=(e,t)=>dc(e,i=>{let r=t(i);r&&e.events[6].push(r)},5,i=>{let r=e.listen;e.listen=(...l)=>(!e.lc&&!e.active&&(e.active=!0,i()),r(...l));let o=e.off;return e.events[6]=[],e.off=()=>{o(),setTimeout(()=>{if(e.active&&!e.lc){e.active=!1;for(let l of e.events[6])l();e.events[6]=[]}},1e3)},()=>{e.listen=r,e.off=o}}),mc=(e,t,n)=>{Array.isArray(e)||(e=[e]);let i,r,o=()=>{if(r===Mn)return;r=Mn;let c=e.map(d=>d.get());if(!i||c.some((d,h)=>d!==i[h])){i=c;let d=t(...c);d&&d.then&&d.t?d.then(h=>{i===c&&l.set(h)}):(l.set(d),r=Mn)}},l=Lr(void 0),a=l.get;l.get=()=>(o(),a());let s=o;return hc(l,()=>{let c=e.map(d=>d.listen(s));return o(),()=>{for(let d of c)d()}}),l};const dl=(e,t)=>mc(e,t);function uc(e,t,n){let i=new Set(t).add(void 0);return e.listen((r,o,l)=>{i.has(l)&&n(r,o,l)})}let Ai=(e,t)=>n=>{e.current!==n&&(e.current=n,t())};function ir(e,{keys:t,deps:n=[e,t]}={}){let i=vt.useRef();i.current=e.get();let r=vt.useCallback(l=>(Ai(i,l)(e.value),t?.length>0?uc(e,t,Ai(i,l)):e.listen(Ai(i,l))),n),o=()=>i.current;return vt.useSyncExternalStore(r,o,o)}Math.random.bind(Math);function fc(e,t,n){let i=r=>e(r,...t);return n===void 0?i:Object.assign(i,{lazy:n,lazyArgs:t})}function Io(e,t,n){let i=e.length-t.length;if(i===0)return e(...t);if(i===1)return fc(e,t,n);throw Error("Wrong number of arguments")}function hl(...e){return Io(An,e)}function An(e,t){if(e===t||Object.is(e,t))return!0;if(typeof e!="object"||typeof t!="object"||e===null||t===null||Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!1;if(Array.isArray(e))return pc(e,t);if(e instanceof Map)return gc(e,t);if(e instanceof Set)return yc(e,t);if(e instanceof Date)return e.getTime()===t.getTime();if(e instanceof RegExp)return e.toString()===t.toString();if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let[n,i]of Object.entries(e))if(!(n in t)||!An(i,t[n]))return!1;return!0}function pc(e,t){if(e.length!==t.length)return!1;for(let[n,i]of e.entries())if(!An(i,t[n]))return!1;return!0}function gc(e,t){if(e.size!==t.size)return!1;for(let[n,i]of e.entries())if(!t.has(n)||!An(i,t.get(n)))return!1;return!0}function yc(e,t){if(e.size!==t.size)return!1;let n=[...t];for(let i of e){let r=!1;for(let[o,l]of n.entries())if(An(i,l)){r=!0,n.splice(o,1);break}if(!r)return!1}return!0}function vc(...e){return Io(bc,e)}function bc(e,t){let n={};for(let[i,r]of Object.entries(e))n[i]=t(r,i,e);return n}[...`	.
.\v.\f.\r. .. . . . . . . . . . . . . .\u2028.\u2029. . .　.\uFEFF`.split(".")];function xi(e){if(typeof e!="object"||!e)return!1;let t=Object.getPrototypeOf(e);return t!==null&&t!==Object.prototype&&Object.getPrototypeOf(t)!==null||Symbol.iterator in e?!1:Symbol.toStringTag in e?Object.prototype.toString.call(e)==="[object Module]":!0}function rr(e,t,n=".",i){if(!xi(t))return rr(e,{},n);let r=Object.assign({},t);for(let o in e){if(o==="__proto__"||o==="constructor")continue;let l=e[o];l!=null&&(Array.isArray(l)&&Array.isArray(r[o])?r[o]=[...l,...r[o]]:xi(l)&&xi(r[o])?r[o]=rr(l,r[o],(n?`${n}.`:"")+o.toString()):r[o]=l)}return r}function Ac(e){return(...t)=>t.reduce((n,i)=>rr(n,i,""),{})}const Po=Ac();function xc(e,t,n){let i=r=>e(r,...t);return n===void 0?i:Object.assign(i,{lazy:n,lazyArgs:t})}function se(e,t,n){let i=e.length-t.length;if(i===0)return e(...t);if(i===1)return xc(e,t,n);throw Error("Wrong number of arguments")}function Tc(...e){return se(Fc,e)}const Fc=(e,t)=>t.every(n=>n(e));function Bc(...e){return se(kc,e)}const kc=(e,t)=>t.some(n=>n(e)),oi={done:!1,hasNext:!1},wc=e=>({hasNext:!0,next:e,done:!1});function ze(e,...t){let n=e,i=t.map(o=>"lazy"in o?Ec(o):void 0),r=0;for(;r<t.length;){if(i[r]===void 0||!Dc(n)){let s=t[r];n=s(n),r+=1;continue}let o=[];for(let s=r;s<t.length;s++){let c=i[s];if(c===void 0||(o.push(c),c.isSingle))break}let l=[];for(let s of n)if(zo(s,l,o))break;let{isSingle:a}=o.at(-1);n=a?l[0]:l,r+=o.length}return n}function zo(e,t,n){if(n.length===0)return t.push(e),!1;let i=e,r=oi,o=!1;for(let[l,a]of n.entries()){let{index:s,items:c}=a;if(c.push(i),r=a(i,s,c),a.index+=1,r.hasNext){if(r.hasMany??!1){for(let d of r.next)if(zo(d,t,n.slice(l+1)))return!0;return o}i=r.next}if(!r.hasNext)break;r.done&&(o=!0)}return r.hasNext&&t.push(i),o}function Ec(e){let{lazy:t,lazyArgs:n}=e,i=t(...n);return Object.assign(i,{isSingle:t.single??!1,index:0,items:[]})}function Dc(e){return typeof e=="string"||typeof e=="object"&&!!e&&Symbol.iterator in e}function Cc(e,t){let n=t.length-e.length;if(n===1){let[i,...r]=t;return ze(i,{lazy:e,lazyArgs:r})}if(n===0){let i={lazy:e,lazyArgs:t};return Object.assign(r=>ze(r,i),i)}throw Error("Wrong number of arguments")}function Rc(...e){return se(Oc,e,Lc)}const Oc=(e,t)=>t<0?[...e]:e.slice(t);function Lc(e){if(e<=0)return wc;let t=e;return n=>t>0?(--t,oi):{done:!1,hasNext:!0,next:n}}function je(...e){return se(Sc,e)}const Sc=(e,t)=>e.length>=t,_o={asc:(e,t)=>e>t,desc:(e,t)=>e<t};function Nc(e,t){let[n,...i]=t;if(!Ic(n))return e(n,lr(...i));let r=lr(n,...i);return o=>e(o,r)}function lr(e,t,...n){let i=typeof e=="function"?e:e[0],r=typeof e=="function"?"asc":e[1],{[r]:o}=_o,l=t===void 0?void 0:lr(t,...n);return(a,s)=>{let c=i(a),d=i(s);return o(c,d)?1:o(d,c)?-1:l?.(a,s)??0}}function Ic(e){if(ml(e))return!0;if(typeof e!="object"||!Array.isArray(e))return!1;let[t,n,...i]=e;return ml(t)&&typeof n=="string"&&n in _o&&i.length===0}const ml=e=>typeof e=="function"&&e.length===1;function cn(...e){return se(Object.entries,e)}function Go(...e){return se(Pc,e,zc)}const Pc=(e,t)=>e.filter(t),zc=e=>(t,n,i)=>e(t,n,i)?{done:!1,hasNext:!0,next:t}:oi;function ul(...e){return se(_c,e,Gc)}const _c=(e,t)=>e.flatMap(t),Gc=e=>(t,n,i)=>{let r=e(t,n,i);return Array.isArray(r)?{done:!1,hasNext:!0,hasMany:!0,next:r}:{done:!1,hasNext:!0,next:r}};function Ti(...e){return se(Mc,e)}const Mc=(e,t)=>{let n=Object.create(null);for(let i=0;i<e.length;i++){let r=e[i],o=t(r,i,e);if(o!==void 0){let l=n[o];l===void 0?n[o]=[r]:l.push(r)}}return Object.setPrototypeOf(n,Object.prototype),n};function Pt(...e){return se(xn,e)}function xn(e,t){if(e===t||Object.is(e,t))return!0;if(typeof e!="object"||typeof t!="object"||e===null||t===null||Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!1;if(Array.isArray(e))return jc(e,t);if(e instanceof Map)return qc(e,t);if(e instanceof Set)return Hc(e,t);if(e instanceof Date)return e.getTime()===t.getTime();if(e instanceof RegExp)return e.toString()===t.toString();if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let[n,i]of Object.entries(e))if(!(n in t)||!xn(i,t[n]))return!1;return!0}function jc(e,t){if(e.length!==t.length)return!1;for(let[n,i]of e.entries())if(!xn(i,t[n]))return!1;return!0}function qc(e,t){if(e.size!==t.size)return!1;for(let[n,i]of e.entries())if(!t.has(n)||!xn(i,t.get(n)))return!1;return!0}function Hc(e,t){if(e.size!==t.size)return!1;let n=[...t];for(let i of e){let r=!1;for(let[o,l]of n.entries())if(xn(i,l)){r=!0,n.splice(o,1);break}if(!r)return!1}return!0}function Tn(e){return e===""||e===void 0?!0:Array.isArray(e)?e.length===0:Object.keys(e).length===0}function Mt(e){if(e==null||e==="")return!0;if(typeof e!="object")return!1;if("length"in e&&typeof e.length=="number")return e.length===0;if("size"in e&&typeof e.size=="number")return e.size===0;for(let t in e)return!1;return Object.getOwnPropertySymbols(e).length===0}const ai=e=>typeof e=="function";function $c(e){return e!=null}function Mo(e){return t=>!e(t)}function ne(e){return e==null}function Uc(e){return typeof e=="number"&&!Number.isNaN(e)}function Sr(...e){return se(Zc,e)}function Zc(e,t){if(e===t||Object.is(e,t))return!0;if(typeof e!="object"||!e||typeof t!="object"||!t)return!1;if(e instanceof Map&&t instanceof Map)return Vc(e,t);if(e instanceof Set&&t instanceof Set)return Qc(e,t);let n=Object.keys(e);if(n.length!==Object.keys(t).length)return!1;for(let i of n){if(!Object.hasOwn(t,i))return!1;let{[i]:r}=e,{[i]:o}=t;if(r!==o||!Object.is(r,o))return!1}return!0}function Vc(e,t){if(e.size!==t.size)return!1;for(let[n,i]of e){let r=t.get(n);if(i!==r||!Object.is(i,r))return!1}return!0}function Qc(e,t){if(e.size!==t.size)return!1;for(let n of e)if(!t.has(n))return!1;return!0}function We(e){return typeof e=="string"}function Ne(e){return!!e}function Kc(...e){return se(Wc,e)}const Wc=e=>e.at(-1);function fn(...e){return se(Xc,e,Yc)}const Xc=(e,t)=>e.map(t),Yc=e=>(t,n,i)=>({done:!1,hasNext:!0,next:e(t,n,i)});function Fi(...e){return se(Jc,e)}function Jc(e,t){let n={};for(let[i,r]of Object.entries(e))n[i]=t(r,i,e);return n}function ed(...e){return se(td,e)}function td(e,t){let n={...e};for(let[i,r]of Object.entries(n))t(r,i,e)&&delete n[i];return n}function nd(e){let t=!1,n;return()=>(t||=(n=e(),!0),n)}function fl(...e){return se(id,e)}function id(e,t){let n={};for(let i of t)i in e&&(n[i]=e[i]);return n}function Bi(...e){return t=>ze(t,...e)}function ft(e,...t){return typeof e=="string"||typeof e=="number"||typeof e=="symbol"?n=>pl(n,e,...t):pl(e,...t)}function pl(e,...t){let n=e;for(let i of t){if(n==null)return;n=n[i]}return n}function rd(e,t){let n=Math.ceil(e),i=Math.floor(t);if(i<n)throw RangeError(`randomInteger: The range [${e.toString()},${t.toString()}] contains no integer`);return Math.floor(Math.random()*(i-n+1)+n)}function ld(...e){return se(od,e)}const od=(e,t,n)=>e.reduce(t,n);function ki(...e){return se(ad,e)}function ad(e,t){let n=[...e];return n.sort(t),n}function jo(...e){return Nc(sd,e)}const sd=(e,t)=>[...e].sort(t);function gl(e,t,n){return typeof t=="number"||t===void 0?i=>i.split(e,t):e.split(t,n)}[...`	.
.\v.\f.\r. .. . . . . . . . . . . . . .\u2028.\u2029. . .　.\uFEFF`.split(".")];function si(...e){return Cc(cd,e)}function cd(){let e=new Set;return t=>e.has(t)?oi:(e.add(t),{done:!1,hasNext:!0,next:t})}function Xn(...e){return se(Object.values,e)}function dd(...e){return se(hd,e,md)}const hd=(e,t)=>e.length<t.length?e.map((n,i)=>[n,t[i]]):t.map((n,i)=>[e[i],n]),md=e=>(t,n)=>({hasNext:!0,next:[t,e[n]],done:n>=e.length-1});var ud=Object.create,Yn=Object.defineProperty,fd=Object.getOwnPropertyDescriptor,pd=Object.getOwnPropertyNames,gd=Object.getPrototypeOf,yd=Object.prototype.hasOwnProperty,ie=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Fn=(e,t)=>{let n={};for(var i in e)Yn(n,i,{get:e[i],enumerable:!0});return Yn(n,Symbol.toStringTag,{value:"Module"}),n},vd=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(var r=pd(t),o=0,l=r.length,a;o<l;o++)a=r[o],!yd.call(e,a)&&a!==n&&Yn(e,a,{get:(s=>t[s]).bind(null,a),enumerable:!(i=fd(t,a))||i.enumerable});return e},qe=(e,t,n)=>(n=e==null?{}:ud(gd(e)),vd(Yn(n,"default",{value:e,enumerable:!0}),e)),bd=ie((e=>{e.ARRAY_BUFFER_SUPPORT=typeof ArrayBuffer<"u",e.SYMBOL_SUPPORT=typeof Symbol<"u"})),Je=ie(((e,t)=>{var n=bd(),i=n.ARRAY_BUFFER_SUPPORT,r=n.SYMBOL_SUPPORT;t.exports=function(l,a){var s,c,d,h,m;if(!l)throw Error("obliterator/forEach: invalid iterable.");if(typeof a!="function")throw Error("obliterator/forEach: expecting a callback.");if(Array.isArray(l)||i&&ArrayBuffer.isView(l)||typeof l=="string"||l.toString()==="[object Arguments]"){for(d=0,h=l.length;d<h;d++)a(l[d],d);return}if(typeof l.forEach=="function"){l.forEach(a);return}if(r&&Symbol.iterator in l&&typeof l.next!="function"&&(l=l[Symbol.iterator]()),typeof l.next=="function"){for(s=l,d=0;m=s.next(),m.done!==!0;)a(m.value,d),d++;return}for(c in l)l.hasOwnProperty(c)&&a(l[c],c)}})),Zt=ie(((e,t)=>{function n(i){if(typeof i!="function")throw Error("obliterator/iterator: expecting a function!");this.next=i}typeof Symbol<"u"&&(n.prototype[Symbol.iterator]=function(){return this}),n.of=function(){var i=arguments,r=i.length,o=0;return new n(function(){return o>=r?{done:!0}:{done:!1,value:i[o++]}})},n.empty=function(){return new n(function(){return{done:!0}})},n.fromSequence=function(i){var r=0,o=i.length;return new n(function(){return r>=o?{done:!0}:{done:!1,value:i[r++]}})},n.is=function(i){return i instanceof n?!0:typeof i=="object"&&!!i&&typeof i.next=="function"},t.exports=n})),ci=ie((e=>{var t=255,n=2**16-1,i=2**32-1,r=2**7-1,o=2**15-1,l=2**31-1;e.getPointerArray=function(s){var c=s-1;if(c<=t)return Uint8Array;if(c<=n)return Uint16Array;if(c<=i)return Uint32Array;throw Error("mnemonist: Pointer Array of size > 4294967295 is not supported.")},e.getSignedPointerArray=function(s){var c=s-1;return c<=r?Int8Array:c<=o?Int16Array:c<=l?Int32Array:Float64Array},e.getNumberType=function(s){return s===(s|0)?Math.sign(s)===-1?s<=127&&s>=-128?Int8Array:s<=32767&&s>=-32768?Int16Array:Int32Array:s<=255?Uint8Array:s<=65535?Uint16Array:Uint32Array:Float64Array};var a={Uint8Array:1,Int8Array:2,Uint16Array:3,Int16Array:4,Uint32Array:5,Int32Array:6,Float32Array:7,Float64Array:8};e.getMinimalRepresentation=function(s,c){var d=null,h=0,m,u,f,A,b;for(A=0,b=s.length;A<b;A++)f=c?c(s[A]):s[A],u=e.getNumberType(f),m=a[u.name],m>h&&(h=m,d=u);return d},e.isTypedArray=function(s){return typeof ArrayBuffer<"u"&&ArrayBuffer.isView(s)},e.concat=function(){var s=0,c,d,h;for(c=0,h=arguments.length;c<h;c++)s+=arguments[c].length;var m=new arguments[0].constructor(s);for(c=0,d=0;c<h;c++)m.set(arguments[c],d),d+=arguments[c].length;return m},e.indices=function(s){for(var c=new(e.getPointerArray(s))(s),d=0;d<s;d++)c[d]=d;return c}})),di=ie((e=>{var t=Je(),n=ci();function i(a){return Array.isArray(a)||n.isTypedArray(a)}function r(a){if(typeof a.length=="number")return a.length;if(typeof a.size=="number")return a.size}function o(a){var s=r(a),c=typeof s=="number"?Array(s):[],d=0;return t(a,function(h){c[d++]=h}),c}function l(a){var s=r(a),c=typeof s=="number"?n.getPointerArray(s):Array,d=typeof s=="number"?Array(s):[],h=typeof s=="number"?new c(s):[],m=0;return t(a,function(u){d[m]=u,h[m]=m++}),[d,h]}e.isArrayLike=i,e.guessLength=r,e.toArray=o,e.toArrayWithIndices=l})),qo=ie(((e,t)=>{t.exports=function(i){return typeof i=="object"&&!!i&&typeof i.addUndirectedEdgeWithKey=="function"&&typeof i.dropNode=="function"&&typeof i.multi=="boolean"}})),Ad=ie(((e,t)=>{var n=di(),i=Zt();function r(o,l){if(arguments.length<2)throw Error("mnemonist/fixed-deque: expecting an Array class and a capacity.");if(typeof l!="number"||l<=0)throw Error("mnemonist/fixed-deque: `capacity` should be a positive number.");this.ArrayClass=o,this.capacity=l,this.items=new o(this.capacity),this.clear()}r.prototype.clear=function(){this.start=0,this.size=0},r.prototype.push=function(o){if(this.size===this.capacity)throw Error("mnemonist/fixed-deque.push: deque capacity ("+this.capacity+") exceeded!");var l=this.start+this.size;return l>=this.capacity&&(l-=this.capacity),this.items[l]=o,++this.size},r.prototype.unshift=function(o){if(this.size===this.capacity)throw Error("mnemonist/fixed-deque.unshift: deque capacity ("+this.capacity+") exceeded!");var l=this.start-1;return this.start===0&&(l=this.capacity-1),this.items[l]=o,this.start=l,++this.size},r.prototype.pop=function(){if(this.size!==0){this.size--;var o=this.start+this.size;return o>=this.capacity&&(o-=this.capacity),this.items[o]}},r.prototype.shift=function(){if(this.size!==0){var o=this.start;return this.size--,this.start++,this.start===this.capacity&&(this.start=0),this.items[o]}},r.prototype.peekFirst=function(){if(this.size!==0)return this.items[this.start]},r.prototype.peekLast=function(){if(this.size!==0){var o=this.start+this.size-1;return o>=this.capacity&&(o-=this.capacity),this.items[o]}},r.prototype.get=function(o){if(!(this.size===0||o>=this.capacity))return o=this.start+o,o>=this.capacity&&(o-=this.capacity),this.items[o]},r.prototype.forEach=function(o,l){l=arguments.length>1?l:this;for(var a=this.capacity,s=this.size,c=this.start,d=0;d<s;)o.call(l,this.items[c],d,this),c++,d++,c===a&&(c=0)},r.prototype.toArray=function(){var o=this.start+this.size;if(o<this.capacity)return this.items.slice(this.start,o);for(var l=new this.ArrayClass(this.size),a=this.capacity,s=this.size,c=this.start,d=0;d<s;)l[d]=this.items[c],c++,d++,c===a&&(c=0);return l},r.prototype.values=function(){var o=this.items,l=this.capacity,a=this.size,s=this.start,c=0;return new i(function(){if(c>=a)return{done:!0};var d=o[s];return s++,c++,s===l&&(s=0),{value:d,done:!1}})},r.prototype.entries=function(){var o=this.items,l=this.capacity,a=this.size,s=this.start,c=0;return new i(function(){if(c>=a)return{done:!0};var d=o[s];return s++,s===l&&(s=0),{value:[c++,d],done:!1}})},typeof Symbol<"u"&&(r.prototype[Symbol.iterator]=r.prototype.values),r.prototype.inspect=function(){var o=this.toArray();return o.type=this.ArrayClass.name,o.capacity=this.capacity,Object.defineProperty(o,"constructor",{value:r,enumerable:!1}),o},typeof Symbol<"u"&&(r.prototype[Symbol.for("nodejs.util.inspect.custom")]=r.prototype.inspect),r.from=function(o,l,a){if(arguments.length<3&&(a=n.guessLength(o),typeof a!="number"))throw Error("mnemonist/fixed-deque.from: could not guess iterable length. Please provide desired capacity as last argument.");var s=new r(l,a);if(n.isArrayLike(o)){var c,d;for(c=0,d=o.length;c<d;c++)s.items[c]=o[c];return s.size=d,s}return n.forEach(o,function(h){s.push(h)}),s},t.exports=r})),xd=ie((e=>{let t=qo(),n=Ad();function i(l,a){let s=0;return l.forEachInNeighbor(a,()=>{s++}),s}function r(l,a){if(!t(l))throw Error("graphology-dag/topological-sort: the given graph is not a valid graphology instance.");if(l.type==="undirected"||l.undirectedSize!==0)throw Error("graphology-dag/topological-sort: cannot work if graph is not directed.");if(l.order===0)return;let s=new n(Array,l.order),c={},d=0;l.forEachNode((u,f)=>{let A=l.multi?i(l,u):l.inDegree(u);A===0?s.push([u,f,0]):(c[u]=A,d+=A)});let h=0;function m(u,f){let A=--c[u];d--,A===0&&s.push([u,f,h+1]),c[u]=A}for(;s.size!==0;){let[u,f,A]=s.shift();h=A,a(u,f,A),l.forEachOutNeighbor(u,m)}if(d!==0)throw Error("graphology-dag/topological-sort: given graph is not acyclic.")}function o(l){if(!t(l))throw Error("graphology-dag/topological-sort: the given graph is not a valid graphology instance.");let a=Array(l.order),s=0;return r(l,c=>{a[s++]=c}),a}e.topologicalSort=o})),Td=ie(((e,t)=>{let n=qo();t.exports=function(r,o,l){if(!n(r))throw Error("graphology-dag/will-create-cycle: the given graph is not a valid graphology instance.");if(o=""+o,l=""+l,o===l)return!0;if(!r.hasNode(o)||!r.hasNode(l)||r.hasDirectedEdge(o,l))return!1;if(r.hasDirectedEdge(l,o))return!0;let a=r.outNeighbors(l);function s(c){a.push(c)}for(;a.length!==0;){let c=a.pop();if(c===o)return!0;r.forEachOutNeighbor(c,s)}return!1}})),Fd=ie(((e,t)=>{var n=Je();function i(s){this.size=0,this.items=new Map,this.inverse=s}function r(){this.size=0,this.items=new Map,this.inverse=new i(this)}function o(){this.size=0,this.items.clear(),this.inverse.items.clear()}r.prototype.clear=o,i.prototype.clear=o;function l(s,c){if(this.items.has(s)){var d=this.items.get(s);if(d===c)return this;this.inverse.items.delete(d)}if(this.inverse.items.has(c)){var h=this.inverse.items.get(c);if(h===s)return this;this.items.delete(h)}return this.items.set(s,c),this.inverse.items.set(c,s),this.size=this.items.size,this.inverse.size=this.inverse.items.size,this}r.prototype.set=l,i.prototype.set=l;function a(s){if(this.items.has(s)){var c=this.items.get(s);return this.items.delete(s),this.inverse.items.delete(c),this.size=this.items.size,this.inverse.size=this.inverse.items.size,!0}return!1}r.prototype.delete=a,i.prototype.delete=a,["has","get","forEach","keys","values","entries"].forEach(function(s){r.prototype[s]=i.prototype[s]=function(){return Map.prototype[s].apply(this.items,arguments)}}),typeof Symbol<"u"&&(r.prototype[Symbol.iterator]=r.prototype.entries,i.prototype[Symbol.iterator]=i.prototype.entries),r.prototype.inspect=function(){var s={left:this.items,right:this.inverse.items};return Object.defineProperty(s,"constructor",{value:r,enumerable:!1}),s},typeof Symbol<"u"&&(r.prototype[Symbol.for("nodejs.util.inspect.custom")]=r.prototype.inspect),i.prototype.inspect=function(){var s={left:this.inverse.items,right:this.items};return Object.defineProperty(s,"constructor",{value:i,enumerable:!1}),s},typeof Symbol<"u"&&(i.prototype[Symbol.for("nodejs.util.inspect.custom")]=i.prototype.inspect),r.from=function(s){var c=new r;return n(s,function(d,h){c.set(h,d)}),c},t.exports=r})),Bd=ie(((e,t)=>{function n(i){if(typeof i!="function")throw Error("mnemonist/DefaultMap.constructor: expecting a function.");this.items=new Map,this.factory=i,this.size=0}n.prototype.clear=function(){this.items.clear(),this.size=0},n.prototype.get=function(i){var r=this.items.get(i);return r===void 0&&(r=this.factory(i,this.size),this.items.set(i,r),this.size++),r},n.prototype.peek=function(i){return this.items.get(i)},n.prototype.set=function(i,r){return this.items.set(i,r),this.size=this.items.size,this},n.prototype.has=function(i){return this.items.has(i)},n.prototype.delete=function(i){var r=this.items.delete(i);return this.size=this.items.size,r},n.prototype.forEach=function(i,r){r=arguments.length>1?r:this,this.items.forEach(i,r)},n.prototype.entries=function(){return this.items.entries()},n.prototype.keys=function(){return this.items.keys()},n.prototype.values=function(){return this.items.values()},typeof Symbol<"u"&&(n.prototype[Symbol.iterator]=n.prototype.entries),n.prototype.inspect=function(){return this.items},typeof Symbol<"u"&&(n.prototype[Symbol.for("nodejs.util.inspect.custom")]=n.prototype.inspect),n.autoIncrement=function(){var i=0;return function(){return i++}},t.exports=n})),kd=ie(((e,t)=>{function n(i){if(typeof i!="function")throw Error("mnemonist/DefaultWeakMap.constructor: expecting a function.");this.items=new WeakMap,this.factory=i}n.prototype.clear=function(){this.items=new WeakMap},n.prototype.get=function(i){var r=this.items.get(i);return r===void 0&&(r=this.factory(i),this.items.set(i,r)),r},n.prototype.peek=function(i){return this.items.get(i)},n.prototype.set=function(i,r){return this.items.set(i,r),this},n.prototype.has=function(i){return this.items.has(i)},n.prototype.delete=function(i){return this.items.delete(i)},n.prototype.inspect=function(){return this.items},typeof Symbol<"u"&&(n.prototype[Symbol.for("nodejs.util.inspect.custom")]=n.prototype.inspect),t.exports=n})),wd=ie(((e,t)=>{var n=Zt(),i=Je();function r(){this.clear()}r.prototype.clear=function(){this.head=null,this.tail=null,this.size=0},r.prototype.first=function(){return this.head?this.head.item:void 0},r.prototype.peek=r.prototype.first,r.prototype.last=function(){return this.tail?this.tail.item:void 0},r.prototype.push=function(o){var l={item:o,next:null};return this.head?(this.tail.next=l,this.tail=l):(this.head=l,this.tail=l),this.size++,this.size},r.prototype.unshift=function(o){var l={item:o,next:null};return this.head?(this.head.next||(this.tail=this.head),l.next=this.head,this.head=l):(this.head=l,this.tail=l),this.size++,this.size},r.prototype.shift=function(){if(this.size){var o=this.head;return this.head=o.next,this.size--,o.item}},r.prototype.forEach=function(o,l){if(this.size){l=arguments.length>1?l:this;for(var a=this.head,s=0;a;)o.call(l,a.item,s,this),a=a.next,s++}},r.prototype.toArray=function(){if(!this.size)return[];for(var o=Array(this.size),l=0,a=this.size,s=this.head;l<a;l++)o[l]=s.item,s=s.next;return o},r.prototype.values=function(){var o=this.head;return new n(function(){if(!o)return{done:!0};var l=o.item;return o=o.next,{value:l,done:!1}})},r.prototype.entries=function(){var o=this.head,l=0;return new n(function(){if(!o)return{done:!0};var a=o.item;return o=o.next,l++,{value:[l-1,a],done:!1}})},typeof Symbol<"u"&&(r.prototype[Symbol.iterator]=r.prototype.values),r.prototype.toString=function(){return this.toArray().join(",")},r.prototype.toJSON=function(){return this.toArray()},r.prototype.inspect=function(){var o=this.toArray();return Object.defineProperty(o,"constructor",{value:r,enumerable:!1}),o},typeof Symbol<"u"&&(r.prototype[Symbol.for("nodejs.util.inspect.custom")]=r.prototype.inspect),r.from=function(o){var l=new r;return i(o,function(a){l.push(a)}),l},t.exports=r})),Ed=ie(((e,t)=>{var n=Zt(),i=Je();function r(o){this.Container=o||Array,this.items=new Map,this.clear(),Object.defineProperty(this.items,"constructor",{value:r,enumerable:!1})}r.prototype.clear=function(){this.size=0,this.dimension=0,this.items.clear()},r.prototype.set=function(o,l){var a=this.items.get(o),s;return a||(this.dimension++,a=new this.Container,this.items.set(o,a)),this.Container===Set?(s=a.size,a.add(l),s<a.size&&this.size++):(a.push(l),this.size++),this},r.prototype.delete=function(o){var l=this.items.get(o);return l?(this.size-=this.Container===Set?l.size:l.length,this.dimension--,this.items.delete(o),!0):!1},r.prototype.remove=function(o,l){var a=this.items.get(o),s,c;return a?this.Container===Set?(s=a.delete(l),s&&this.size--,a.size===0&&(this.items.delete(o),this.dimension--),s):(c=a.indexOf(l),c===-1?!1:(this.size--,a.length===1?(this.items.delete(o),this.dimension--,!0):(a.splice(c,1),!0))):!1},r.prototype.has=function(o){return this.items.has(o)},r.prototype.get=function(o){return this.items.get(o)},r.prototype.multiplicity=function(o){var l=this.items.get(o);return l===void 0?0:this.Container===Set?l.size:l.length},r.prototype.count=r.prototype.multiplicity,r.prototype.forEach=function(o,l){l=arguments.length>1?l:this;var a;function s(c){o.call(l,c,a)}this.items.forEach(function(c,d){a=d,c.forEach(s)})},r.prototype.forEachAssociation=function(o,l){l=arguments.length>1?l:this,this.items.forEach(o,l)},r.prototype.keys=function(){return this.items.keys()},r.prototype.values=function(){var o=this.items.values(),l=!1,a,s,c,d;return this.Container===Set?new n(function h(){if(!l){if(s=o.next(),s.done)return{done:!0};l=!0,a=s.value.values()}return s=a.next(),s.done?(l=!1,h()):{done:!1,value:s.value}}):new n(function h(){if(!l){if(s=o.next(),s.done)return{done:!0};l=!0,a=s.value,c=0,d=a.length}return c>=d?(l=!1,h()):{done:!1,value:a[c++]}})},r.prototype.entries=function(){var o=this.items.entries(),l=!1,a,s,c,d,h;return this.Container===Set?new n(function m(){if(!l){if(s=o.next(),s.done)return{done:!0};l=!0,c=s.value[0],a=s.value[1].values()}return s=a.next(),s.done?(l=!1,m()):{done:!1,value:[c,s.value]}}):new n(function m(){if(!l){if(s=o.next(),s.done)return{done:!0};l=!0,c=s.value[0],a=s.value[1],d=0,h=a.length}return d>=h?(l=!1,m()):{done:!1,value:[c,a[d++]]}})},r.prototype.containers=function(){return this.items.values()},r.prototype.associations=function(){return this.items.entries()},typeof Symbol<"u"&&(r.prototype[Symbol.iterator]=r.prototype.entries),r.prototype.inspect=function(){return this.items},typeof Symbol<"u"&&(r.prototype[Symbol.for("nodejs.util.inspect.custom")]=r.prototype.inspect),r.prototype.toJSON=function(){return this.items},r.from=function(o,l){var a=new r(l);return i(o,function(s,c){a.set(c,s)}),a},t.exports=r})),Dd=ie(((e,t)=>{var n=Zt(),i=Je();function r(){this.clear()}r.prototype.clear=function(){this.items=[],this.offset=0,this.size=0},r.prototype.enqueue=function(o){return this.items.push(o),++this.size},r.prototype.dequeue=function(){if(this.size){var o=this.items[this.offset];return++this.offset*2>=this.items.length&&(this.items=this.items.slice(this.offset),this.offset=0),this.size--,o}},r.prototype.peek=function(){if(this.size)return this.items[this.offset]},r.prototype.forEach=function(o,l){l=arguments.length>1?l:this;for(var a=this.offset,s=0,c=this.items.length;a<c;a++,s++)o.call(l,this.items[a],s,this)},r.prototype.toArray=function(){return this.items.slice(this.offset)},r.prototype.values=function(){var o=this.items,l=this.offset;return new n(function(){if(l>=o.length)return{done:!0};var a=o[l];return l++,{value:a,done:!1}})},r.prototype.entries=function(){var o=this.items,l=this.offset,a=0;return new n(function(){if(l>=o.length)return{done:!0};var s=o[l];return l++,{value:[a++,s],done:!1}})},typeof Symbol<"u"&&(r.prototype[Symbol.iterator]=r.prototype.values),r.prototype.toString=function(){return this.toArray().join(",")},r.prototype.toJSON=function(){return this.toArray()},r.prototype.inspect=function(){var o=this.toArray();return Object.defineProperty(o,"constructor",{value:r,enumerable:!1}),o},typeof Symbol<"u"&&(r.prototype[Symbol.for("nodejs.util.inspect.custom")]=r.prototype.inspect),r.from=function(o){var l=new r;return i(o,function(a){l.enqueue(a)}),l},r.of=function(){return r.from(arguments)},t.exports=r})),Cd=ie(((e,t)=>{var n=Zt(),i=Je(),r=ci(),o=di();function l(a,s,c){if(arguments.length<2&&(c=a,a=null,s=null),this.capacity=c,typeof this.capacity!="number"||this.capacity<=0)throw Error("mnemonist/lru-cache: capacity should be positive number.");if(!isFinite(this.capacity)||Math.floor(this.capacity)!==this.capacity)throw Error("mnemonist/lru-cache: capacity should be a finite positive integer.");var d=r.getPointerArray(c);this.forward=new d(c),this.backward=new d(c),this.K=typeof a=="function"?new a(c):Array(c),this.V=typeof s=="function"?new s(c):Array(c),this.size=0,this.head=0,this.tail=0,this.items={}}l.prototype.clear=function(){this.size=0,this.head=0,this.tail=0,this.items={}},l.prototype.splayOnTop=function(a){var s=this.head;if(this.head===a)return this;var c=this.backward[a],d=this.forward[a];return this.tail===a?this.tail=c:this.backward[d]=c,this.forward[c]=d,this.backward[s]=a,this.head=a,this.forward[a]=s,this},l.prototype.set=function(a,s){var c=this.items[a];if(c!==void 0){this.splayOnTop(c),this.V[c]=s;return}this.size<this.capacity?c=this.size++:(c=this.tail,this.tail=this.backward[c],delete this.items[this.K[c]]),this.items[a]=c,this.K[c]=a,this.V[c]=s,this.forward[c]=this.head,this.backward[this.head]=c,this.head=c},l.prototype.setpop=function(a,s){var c=null,d=null,h=this.items[a];return h===void 0?(this.size<this.capacity?h=this.size++:(h=this.tail,this.tail=this.backward[h],c=this.V[h],d=this.K[h],delete this.items[d]),this.items[a]=h,this.K[h]=a,this.V[h]=s,this.forward[h]=this.head,this.backward[this.head]=h,this.head=h,d?{evicted:!0,key:d,value:c}:null):(this.splayOnTop(h),c=this.V[h],this.V[h]=s,{evicted:!1,key:a,value:c})},l.prototype.has=function(a){return a in this.items},l.prototype.get=function(a){var s=this.items[a];if(s!==void 0)return this.splayOnTop(s),this.V[s]},l.prototype.peek=function(a){var s=this.items[a];if(s!==void 0)return this.V[s]},l.prototype.forEach=function(a,s){s=arguments.length>1?s:this;for(var c=0,d=this.size,h=this.head,m=this.K,u=this.V,f=this.forward;c<d;)a.call(s,u[h],m[h],this),h=f[h],c++},l.prototype.keys=function(){var a=0,s=this.size,c=this.head,d=this.K,h=this.forward;return new n(function(){if(a>=s)return{done:!0};var m=d[c];return a++,a<s&&(c=h[c]),{done:!1,value:m}})},l.prototype.values=function(){var a=0,s=this.size,c=this.head,d=this.V,h=this.forward;return new n(function(){if(a>=s)return{done:!0};var m=d[c];return a++,a<s&&(c=h[c]),{done:!1,value:m}})},l.prototype.entries=function(){var a=0,s=this.size,c=this.head,d=this.K,h=this.V,m=this.forward;return new n(function(){if(a>=s)return{done:!0};var u=d[c],f=h[c];return a++,a<s&&(c=m[c]),{done:!1,value:[u,f]}})},typeof Symbol<"u"&&(l.prototype[Symbol.iterator]=l.prototype.entries),l.prototype.inspect=function(){for(var a=new Map,s=this.entries(),c;c=s.next(),!c.done;)a.set(c.value[0],c.value[1]);return Object.defineProperty(a,"constructor",{value:l,enumerable:!1}),a},typeof Symbol<"u"&&(l.prototype[Symbol.for("nodejs.util.inspect.custom")]=l.prototype.inspect),l.from=function(a,s,c,d){if(arguments.length<2){if(d=o.guessLength(a),typeof d!="number")throw Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.")}else arguments.length===2&&(d=s,s=null,c=null);var h=new l(s,c,d);return i(a,function(m,u){h.set(u,m)}),h},t.exports=l})),Ho=ie(((e,t)=>{var n=Cd(),i=Je(),r=ci(),o=di();function l(a,s,c){if(arguments.length<2&&(c=a,a=null,s=null),this.capacity=c,typeof this.capacity!="number"||this.capacity<=0)throw Error("mnemonist/lru-map: capacity should be positive number.");if(!isFinite(this.capacity)||Math.floor(this.capacity)!==this.capacity)throw Error("mnemonist/lru-map: capacity should be a finite positive integer.");var d=r.getPointerArray(c);this.forward=new d(c),this.backward=new d(c),this.K=typeof a=="function"?new a(c):Array(c),this.V=typeof s=="function"?new s(c):Array(c),this.size=0,this.head=0,this.tail=0,this.items=new Map}l.prototype.clear=function(){this.size=0,this.head=0,this.tail=0,this.items.clear()},l.prototype.set=function(a,s){var c=this.items.get(a);if(c!==void 0){this.splayOnTop(c),this.V[c]=s;return}this.size<this.capacity?c=this.size++:(c=this.tail,this.tail=this.backward[c],this.items.delete(this.K[c])),this.items.set(a,c),this.K[c]=a,this.V[c]=s,this.forward[c]=this.head,this.backward[this.head]=c,this.head=c},l.prototype.setpop=function(a,s){var c=null,d=null,h=this.items.get(a);return h===void 0?(this.size<this.capacity?h=this.size++:(h=this.tail,this.tail=this.backward[h],c=this.V[h],d=this.K[h],this.items.delete(d)),this.items.set(a,h),this.K[h]=a,this.V[h]=s,this.forward[h]=this.head,this.backward[this.head]=h,this.head=h,d?{evicted:!0,key:d,value:c}:null):(this.splayOnTop(h),c=this.V[h],this.V[h]=s,{evicted:!1,key:a,value:c})},l.prototype.has=function(a){return this.items.has(a)},l.prototype.get=function(a){var s=this.items.get(a);if(s!==void 0)return this.splayOnTop(s),this.V[s]},l.prototype.peek=function(a){var s=this.items.get(a);if(s!==void 0)return this.V[s]},l.prototype.splayOnTop=n.prototype.splayOnTop,l.prototype.forEach=n.prototype.forEach,l.prototype.keys=n.prototype.keys,l.prototype.values=n.prototype.values,l.prototype.entries=n.prototype.entries,typeof Symbol<"u"&&(l.prototype[Symbol.iterator]=l.prototype.entries),l.prototype.inspect=n.prototype.inspect,l.from=function(a,s,c,d){if(arguments.length<2){if(d=o.guessLength(a),typeof d!="number")throw Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.")}else arguments.length===2&&(d=s,s=null,c=null);var h=new l(s,c,d);return i(a,function(m,u){h.set(u,m)}),h},t.exports=l})),Rd=ie(((e,t)=>{var n=Ho(),i=Je(),r=ci(),o=di();function l(s,c,d){arguments.length<2?n.call(this,s):n.call(this,s,c,d),this.deleted=new(r.getPointerArray(this.capacity))(this.capacity),this.deletedSize=0}for(var a in n.prototype)l.prototype[a]=n.prototype[a];typeof Symbol<"u"&&(l.prototype[Symbol.iterator]=n.prototype[Symbol.iterator]),l.prototype.clear=function(){n.prototype.clear.call(this),this.deletedSize=0},l.prototype.set=function(s,c){var d=this.items.get(s);if(d!==void 0){this.splayOnTop(d),this.V[d]=c;return}this.size<this.capacity?(d=this.deletedSize>0?this.deleted[--this.deletedSize]:this.size,this.size++):(d=this.tail,this.tail=this.backward[d],this.items.delete(this.K[d])),this.items.set(s,d),this.K[d]=s,this.V[d]=c,this.forward[d]=this.head,this.backward[this.head]=d,this.head=d},l.prototype.setpop=function(s,c){var d=null,h=null,m=this.items.get(s);return m===void 0?(this.size<this.capacity?(m=this.deletedSize>0?this.deleted[--this.deletedSize]:this.size,this.size++):(m=this.tail,this.tail=this.backward[m],d=this.V[m],h=this.K[m],this.items.delete(h)),this.items.set(s,m),this.K[m]=s,this.V[m]=c,this.forward[m]=this.head,this.backward[this.head]=m,this.head=m,h?{evicted:!0,key:h,value:d}:null):(this.splayOnTop(m),d=this.V[m],this.V[m]=c,{evicted:!1,key:s,value:d})},l.prototype.delete=function(s){var c=this.items.get(s);if(c===void 0)return!1;if(this.items.delete(s),this.size===1)return this.size=0,this.head=0,this.tail=0,this.deletedSize=0,!0;var d=this.backward[c],h=this.forward[c];return this.head===c&&(this.head=h),this.tail===c&&(this.tail=d),this.forward[d]=h,this.backward[h]=d,this.size--,this.deleted[this.deletedSize++]=c,!0},l.prototype.remove=function(s,c=void 0){var d=this.items.get(s);if(d===void 0)return c;var h=this.V[d];if(this.items.delete(s),this.size===1)return this.size=0,this.head=0,this.tail=0,this.deletedSize=0,h;var m=this.backward[d],u=this.forward[d];return this.head===d&&(this.head=u),this.tail===d&&(this.tail=m),this.forward[m]=u,this.backward[u]=m,this.size--,this.deleted[this.deletedSize++]=d,h},l.from=function(s,c,d,h){if(arguments.length<2){if(h=o.guessLength(s),typeof h!="number")throw Error("mnemonist/lru-map.from: could not guess iterable length. Please provide desired capacity as last argument.")}else arguments.length===2&&(h=c,c=null,d=null);var m=new l(c,d,h);return i(s,function(u,f){m.set(f,u)}),m},t.exports=l})),Od=ie((e=>{e.intersection=function(){if(arguments.length<2)throw Error("mnemonist/Set.intersection: needs at least two arguments.");var t=new Set,n=1/0,i=null,r,o,l=arguments.length;for(o=0;o<l;o++){if(r=arguments[o],r.size===0)return t;r.size<n&&(n=r.size,i=r)}for(var a=i.values(),s,c,d,h;s=a.next(),!s.done;){for(c=s.value,d=!0,o=0;o<l;o++)if(h=arguments[o],h!==i&&!h.has(c)){d=!1;break}d&&t.add(c)}return t},e.union=function(){if(arguments.length<2)throw Error("mnemonist/Set.union: needs at least two arguments.");var t=new Set,n,i=arguments.length,r,o;for(n=0;n<i;n++)for(r=arguments[n].values();o=r.next(),!o.done;)t.add(o.value);return t},e.difference=function(t,n){if(!t.size)return new Set;if(!n.size)return new Set(t);for(var i=new Set,r=t.values(),o;o=r.next(),!o.done;)n.has(o.value)||i.add(o.value);return i},e.symmetricDifference=function(t,n){for(var i=new Set,r=t.values(),o;o=r.next(),!o.done;)n.has(o.value)||i.add(o.value);for(r=n.values();o=r.next(),!o.done;)t.has(o.value)||i.add(o.value);return i},e.isSubset=function(t,n){var i=t.values(),r;if(t===n)return!0;if(t.size>n.size)return!1;for(;r=i.next(),!r.done;)if(!n.has(r.value))return!1;return!0},e.isSuperset=function(t,n){return e.isSubset(n,t)},e.add=function(t,n){for(var i=n.values(),r;r=i.next(),!r.done;)t.add(r.value)},e.subtract=function(t,n){for(var i=n.values(),r;r=i.next(),!r.done;)t.delete(r.value)},e.intersect=function(t,n){for(var i=t.values(),r;r=i.next(),!r.done;)n.has(r.value)||t.delete(r.value)},e.disjunct=function(t,n){for(var i=t.values(),r,o=[];r=i.next(),!r.done;)n.has(r.value)&&o.push(r.value);for(i=n.values();r=i.next(),!r.done;)t.has(r.value)||t.add(r.value);for(var l=0,a=o.length;l<a;l++)t.delete(o[l])},e.intersectionSize=function(t,n){var i;if(t.size>n.size&&(i=t,t=n,n=i),t.size===0)return 0;if(t===n)return t.size;for(var r=t.values(),o,l=0;o=r.next(),!o.done;)n.has(o.value)&&l++;return l},e.unionSize=function(t,n){var i=e.intersectionSize(t,n);return t.size+n.size-i},e.jaccard=function(t,n){var i=e.intersectionSize(t,n);return i===0?0:i/(t.size+n.size-i)},e.overlap=function(t,n){var i=e.intersectionSize(t,n);return i===0?0:i/Math.min(t.size,n.size)}})),Ld=ie(((e,t)=>{var n=Zt(),i=Je();function r(){this.clear()}r.prototype.clear=function(){this.items=[],this.size=0},r.prototype.push=function(o){return this.items.push(o),++this.size},r.prototype.pop=function(){if(this.size!==0)return this.size--,this.items.pop()},r.prototype.peek=function(){return this.items[this.size-1]},r.prototype.forEach=function(o,l){l=arguments.length>1?l:this;for(var a=0,s=this.items.length;a<s;a++)o.call(l,this.items[s-a-1],a,this)},r.prototype.toArray=function(){for(var o=Array(this.size),l=this.size-1,a=this.size;a--;)o[a]=this.items[l-a];return o},r.prototype.values=function(){var o=this.items,l=o.length,a=0;return new n(function(){if(a>=l)return{done:!0};var s=o[l-a-1];return a++,{value:s,done:!1}})},r.prototype.entries=function(){var o=this.items,l=o.length,a=0;return new n(function(){if(a>=l)return{done:!0};var s=o[l-a-1];return{value:[a++,s],done:!1}})},typeof Symbol<"u"&&(r.prototype[Symbol.iterator]=r.prototype.values),r.prototype.toString=function(){return this.toArray().join(",")},r.prototype.toJSON=function(){return this.toArray()},r.prototype.inspect=function(){var o=this.toArray();return Object.defineProperty(o,"constructor",{value:r,enumerable:!1}),o},typeof Symbol<"u"&&(r.prototype[Symbol.for("nodejs.util.inspect.custom")]=r.prototype.inspect),r.from=function(o){var l=new r;return i(o,function(a){l.push(a)}),l},r.of=function(){return r.from(arguments)},t.exports=r}));Fd();var de=qe(Bd()),Nr=qe(kd()),$o=qe(wd()),Uo=qe(Ed()),Zo=qe(Dd()),yl=qe(Ho());Rd();var Vo=Od(),Sd=qe(Ld()),Nd=ie(((e,t)=>{var n=function(i,r){var o,l,a=1,s=0,c=0,d=String.alphabet;function h(m,u,f){if(f){for(o=u;f=h(m,o),f<76&&f>65;)++o;return+m.slice(u-1,o)}return f=d&&d.indexOf(m.charAt(u)),f>-1?f+76:(f=m.charCodeAt(u)||0,f<45||f>127?f:f<46?65:f<48?f-1:f<58?f+18:f<65?f-11:f<91?f+11:f<97?f-37:f<123?f+5:f-63)}if((i+="")!=(r+="")){for(;a;)if(l=h(i,s++),a=h(r,c++),l<76&&a<76&&l>66&&a>66&&(l=h(i,s,s),a=h(r,c,s=o),c=o),l!=a)return l<a?-1:1}return 0};try{t.exports=n}catch{String.naturalCompare=n}}));function Id(e){return typeof e=="string"?`'${e}'`:new Pd().serialize(e)}const Pd=(function(){class e{#e=new Map;compare(n,i){let r=typeof n,o=typeof i;return r==="string"&&o==="string"?n.localeCompare(i):r==="number"&&o==="number"?n-i:String.prototype.localeCompare.call(this.serialize(n,!0),this.serialize(i,!0))}serialize(n,i){if(n===null)return"null";switch(typeof n){case"string":return i?n:`'${n}'`;case"bigint":return`${n}n`;case"object":return this.$object(n);case"function":return this.$function(n)}return String(n)}serializeObject(n){let i=Object.prototype.toString.call(n);if(i!=="[object Object]")return this.serializeBuiltInType(i.length<10?`unknown:${i}`:i.slice(8,-1),n);let r=n.constructor,o=r===Object||r===void 0?"":r.name;if(o!==""&&globalThis[o]===r)return this.serializeBuiltInType(o,n);if(typeof n.toJSON=="function"){let l=n.toJSON();return o+(typeof l=="object"&&l?this.$object(l):`(${this.serialize(l)})`)}return this.serializeObjectEntries(o,Object.entries(n))}serializeBuiltInType(n,i){let r=this["$"+n];if(r)return r.call(this,i);if(typeof i?.entries=="function")return this.serializeObjectEntries(n,i.entries());throw Error(`Cannot serialize ${n}`)}serializeObjectEntries(n,i){let r=Array.from(i).sort((l,a)=>this.compare(l[0],a[0])),o=`${n}{`;for(let l=0;l<r.length;l++){let[a,s]=r[l];o+=`${this.serialize(a,!0)}:${this.serialize(s)}`,l<r.length-1&&(o+=",")}return o+"}"}$object(n){let i=this.#e.get(n);return i===void 0&&(this.#e.set(n,`#${this.#e.size}`),i=this.serializeObject(n),this.#e.set(n,i)),i}$function(n){let i=Function.prototype.toString.call(n);return i.slice(-15)==="[native code] }"?`${n.name||""}()[native]`:`${n.name}(${n.length})${i.replace(/\s*\n\s*/g,"")}`}$Array(n){let i="[";for(let r=0;r<n.length;r++)i+=this.serialize(n[r]),r<n.length-1&&(i+=",");return i+"]"}$Date(n){try{return`Date(${n.toISOString()})`}catch{return"Date(null)"}}$ArrayBuffer(n){return`ArrayBuffer[${new Uint8Array(n).join(",")}]`}$Set(n){return`Set${this.$Array(Array.from(n).sort((i,r)=>this.compare(i,r)))}`}$Map(n){return this.serializeObjectEntries("Map",n.entries())}}for(let t of["Error","RegExp","URL"])e.prototype["$"+t]=function(n){return`${t}(${n})`};for(let t of["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])e.prototype["$"+t]=function(n){return`${t}[${n.join(",")}]`};for(let t of["BigInt64Array","BigUint64Array"])e.prototype["$"+t]=function(n){return`${t}[${n.join("n,")}${n.length>0?"n":""}]`};return e})(),zd=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],_d=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],ht=[];var Gd=class{_data=new Dn;_hash=new Dn([...zd]);_nDataBytes=0;_minBufferSize=0;finalize(t){t&&this._append(t);let n=this._nDataBytes*8,i=this._data.sigBytes*8;return this._data.words[i>>>5]|=128<<24-i%32,this._data.words[(i+64>>>9<<4)+14]=Math.floor(n/4294967296),this._data.words[(i+64>>>9<<4)+15]=n,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}_doProcessBlock(t,n){let i=this._hash.words,r=i[0],o=i[1],l=i[2],a=i[3],s=i[4],c=i[5],d=i[6],h=i[7];for(let m=0;m<64;m++){if(m<16)ht[m]=t[n+m]|0;else{let B=ht[m-15],L=(B<<25|B>>>7)^(B<<14|B>>>18)^B>>>3,I=ht[m-2],F=(I<<15|I>>>17)^(I<<13|I>>>19)^I>>>10;ht[m]=L+ht[m-7]+F+ht[m-16]}let u=s&c^~s&d,f=r&o^r&l^o&l,A=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),b=(s<<26|s>>>6)^(s<<21|s>>>11)^(s<<7|s>>>25),y=h+b+u+_d[m]+ht[m],D=A+f;h=d,d=c,c=s,s=a+y|0,a=l,l=o,o=r,r=y+D|0}i[0]=i[0]+r|0,i[1]=i[1]+o|0,i[2]=i[2]+l|0,i[3]=i[3]+a|0,i[4]=i[4]+s|0,i[5]=i[5]+c|0,i[6]=i[6]+d|0,i[7]=i[7]+h|0}_append(t){typeof t=="string"&&(t=Dn.fromUtf8(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes}_process(t){let n,i=this._data.sigBytes/64;i=t?Math.ceil(i):Math.max((i|0)-this._minBufferSize,0);let r=i*16,o=Math.min(r*4,this._data.sigBytes);if(r){for(let l=0;l<r;l+=16)this._doProcessBlock(this._data.words,l);n=this._data.words.splice(0,r),this._data.sigBytes-=o}return new Dn(n,o)}},Dn=class Qo{words;sigBytes;constructor(t,n){t=this.words=t||[],this.sigBytes=n===void 0?t.length*4:n}static fromUtf8(t){let n=unescape(encodeURIComponent(t)),i=n.length,r=[];for(let o=0;o<i;o++)r[o>>>2]|=(n.charCodeAt(o)&255)<<24-o%4*8;return new Qo(r,i)}toBase64(){let t=[];for(let n=0;n<this.sigBytes;n+=3){let i=this.words[n>>>2]>>>24-n%4*8&255,r=this.words[n+1>>>2]>>>24-(n+1)%4*8&255,o=this.words[n+2>>>2]>>>24-(n+2)%4*8&255,l=i<<16|r<<8|o;for(let a=0;a<4&&n*8+a*6<this.sigBytes*8;a++)t.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(l>>>6*(3-a)&63))}return t.join("")}concat(t){if(this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4),this.sigBytes%4)for(let n=0;n<t.sigBytes;n++){let i=t.words[n>>>2]>>>24-n%4*8&255;this.words[this.sigBytes+n>>>2]|=i<<24-(this.sigBytes+n)%4*8}else for(let n=0;n<t.sigBytes;n+=4)this.words[this.sigBytes+n>>>2]=t.words[n>>>2];this.sigBytes+=t.sigBytes}};function Md(e){return new Gd().finalize(e).toBase64()}function jd(e){return Md(Id(e))}const vl=typeof self=="object"?self:globalThis,qd=(e,t)=>{let n=(r,o)=>(e.set(o,r),r),i=r=>{if(e.has(r))return e.get(r);let[o,l]=t[r];switch(o){case 0:case-1:return n(l,r);case 1:{let a=n([],r);for(let s of l)a.push(i(s));return a}case 2:{let a=n({},r);for(let[s,c]of l)a[i(s)]=i(c);return a}case 3:return n(new Date(l),r);case 4:{let{source:a,flags:s}=l;return n(new RegExp(a,s),r)}case 5:{let a=n(new Map,r);for(let[s,c]of l)a.set(i(s),i(c));return a}case 6:{let a=n(new Set,r);for(let s of l)a.add(i(s));return a}case 7:{let{name:a,message:s}=l;return n(new vl[a](s),r)}case 8:return n(BigInt(l),r);case"BigInt":return n(Object(BigInt(l)),r);case"ArrayBuffer":return n(new Uint8Array(l).buffer,l);case"DataView":{let{buffer:a}=new Uint8Array(l);return n(new DataView(a),l)}}return n(new vl[o](l),r)};return i},bl=e=>qd(new Map,e)(0),{toString:Hd}={},{keys:$d}=Object,tn=e=>{let t=typeof e;if(t!=="object"||!e)return[0,t];let n=Hd.call(e).slice(8,-1);switch(n){case"Array":return[1,""];case"Object":return[2,""];case"Date":return[3,""];case"RegExp":return[4,""];case"Map":return[5,""];case"Set":return[6,""];case"DataView":return[1,n]}return n.includes("Array")?[1,n]:n.includes("Error")?[7,n]:[2,n]},Cn=([e,t])=>e===0&&(t==="function"||t==="symbol"),Ud=(e,t,n,i)=>{let r=(l,a)=>{let s=i.push(l)-1;return n.set(a,s),s},o=l=>{if(n.has(l))return n.get(l);let[a,s]=tn(l);switch(a){case 0:{let d=l;switch(s){case"bigint":a=8,d=l.toString();break;case"function":case"symbol":if(e)throw TypeError("unable to serialize "+s);d=null;break;case"undefined":return r([-1],l)}return r([a,d],l)}case 1:{if(s){let m=l;return s==="DataView"?m=new Uint8Array(l.buffer):s==="ArrayBuffer"&&(m=new Uint8Array(l)),r([s,[...m]],l)}let d=[],h=r([a,d],l);for(let m of l)d.push(o(m));return h}case 2:{if(s)switch(s){case"BigInt":return r([s,l.toString()],l);case"Boolean":case"Number":case"String":return r([s,l.valueOf()],l)}if(t&&"toJSON"in l)return o(l.toJSON());let d=[],h=r([a,d],l);for(let m of $d(l))(e||!Cn(tn(l[m])))&&d.push([o(m),o(l[m])]);return h}case 3:return r([a,l.toISOString()],l);case 4:{let{source:d,flags:h}=l;return r([a,{source:d,flags:h}],l)}case 5:{let d=[],h=r([a,d],l);for(let[m,u]of l)(e||!(Cn(tn(m))||Cn(tn(u))))&&d.push([o(m),o(u)]);return h}case 6:{let d=[],h=r([a,d],l);for(let m of l)(e||!Cn(tn(m)))&&d.push(o(m));return h}}let{message:c}=l;return r([a,{name:s,message:c}],l)};return o},Al=(e,{json:t,lossy:n}={})=>{let i=[];return Ud(!(t||n),!!t,new Map,i)(e),i};var pn=typeof structuredClone=="function"?(e,t)=>t&&("json"in t||"lossy"in t)?bl(Al(e,t)):structuredClone(e):(e,t)=>bl(Al(e,t));const Ko=Xo("end"),Wo=Xo("start");function Xo(e){return t;function t(n){let i=n&&n.position&&n.position[e]||{};if(typeof i.line=="number"&&i.line>0&&typeof i.column=="number"&&i.column>0)return{line:i.line,column:i.column,offset:typeof i.offset=="number"&&i.offset>-1?i.offset:void 0}}}function Yo(e){let t=Wo(e),n=Ko(e);if(t&&n)return{start:t,end:n}}const mt=["ariaDescribedBy","ariaLabel","ariaLabelledBy"],or={ancestors:{tbody:["table"],td:["table"],th:["table"],thead:["table"],tfoot:["table"],tr:["table"]},attributes:{a:[...mt,"dataFootnoteBackref","dataFootnoteRef",["className","data-footnote-backref"],"href"],blockquote:["cite"],code:[["className",/^language-./]],del:["cite"],div:["itemScope","itemType"],dl:[...mt],h2:[["className","sr-only"]],img:[...mt,"longDesc","src"],input:[["disabled",!0],["type","checkbox"]],ins:["cite"],li:[["className","task-list-item"]],ol:[...mt,["className","contains-task-list"]],q:["cite"],section:["dataFootnotes",["className","footnotes"]],source:["srcSet"],summary:[...mt],table:[...mt],ul:[...mt,["className","contains-task-list"]],"*":"abbr.accept.acceptCharset.accessKey.action.align.alt.axis.border.cellPadding.cellSpacing.char.charOff.charSet.checked.clear.colSpan.color.cols.compact.coords.dateTime.dir.encType.frame.hSpace.headers.height.hrefLang.htmlFor.id.isMap.itemProp.label.lang.maxLength.media.method.multiple.name.noHref.noShade.noWrap.open.prompt.readOnly.rev.rowSpan.rows.rules.scope.selected.shape.size.span.start.summary.tabIndex.title.useMap.vAlign.value.width".split(".")},clobber:["ariaDescribedBy","ariaLabelledBy","id","name"],clobberPrefix:"user-content-",protocols:{cite:["http","https"],href:["http","https","irc","ircs","mailto","xmpp"],longDesc:["http","https"],src:["http","https"]},required:{input:{disabled:!0,type:"checkbox"}},strip:["script"],tagNames:"a.b.blockquote.br.code.dd.del.details.div.dl.dt.em.h1.h2.h3.h4.h5.h6.hr.i.img.input.ins.kbd.li.ol.p.picture.pre.q.rp.rt.ruby.s.samp.section.source.span.strike.strong.sub.summary.sup.table.tbody.td.tfoot.th.thead.tr.tt.ul.var".split(".")},st={}.hasOwnProperty;function Zd(e,t){let n={type:"root",children:[]},i=Jo({schema:t?{...or,...t}:or,stack:[]},e);return i&&(Array.isArray(i)?i.length===1?n=i[0]:n.children=i:n=i),n}function Jo(e,t){if(t&&typeof t=="object"){let n=t;switch(typeof n.type=="string"?n.type:""){case"comment":return Vd(e,n);case"doctype":return Qd(e,n);case"element":return Kd(e,n);case"root":return Wd(e,n);case"text":return Xd(e,n)}}}function Vd(e,t){if(e.schema.allowComments){let n=typeof t.value=="string"?t.value:"",i=n.indexOf("-->"),r={type:"comment",value:i<0?n:n.slice(0,i)};return Bn(r,t),r}}function Qd(e,t){if(e.schema.allowDoctypes){let n={type:"doctype"};return Bn(n,t),n}}function Kd(e,t){let n=typeof t.tagName=="string"?t.tagName:"";e.stack.push(n);let i=ea(e,t.children),r=Yd(e,t.properties);e.stack.pop();let o=!1;if(n&&n!=="*"&&(!e.schema.tagNames||e.schema.tagNames.includes(n))&&(o=!0,e.schema.ancestors&&st.call(e.schema.ancestors,n))){let a=e.schema.ancestors[n],s=-1;for(o=!1;++s<a.length;)e.stack.includes(a[s])&&(o=!0)}if(!o)return e.schema.strip&&!e.schema.strip.includes(n)?i:void 0;let l={type:"element",tagName:n,properties:r,children:i};return Bn(l,t),l}function Wd(e,t){let n={type:"root",children:ea(e,t.children)};return Bn(n,t),n}function Xd(e,t){let n={type:"text",value:typeof t.value=="string"?t.value:""};return Bn(n,t),n}function ea(e,t){let n=[];if(Array.isArray(t)){let i=t,r=-1;for(;++r<i.length;){let o=Jo(e,i[r]);o&&(Array.isArray(o)?n.push(...o):n.push(o))}}return n}function Yd(e,t){let n=e.stack[e.stack.length-1],i=e.schema.attributes,r=e.schema.required,o=i&&st.call(i,n)?i[n]:void 0,l=i&&st.call(i,"*")?i["*"]:void 0,a=t&&typeof t=="object"?t:{},s={},c;for(c in a)if(st.call(a,c)){let d=a[c],h=xl(e,Tl(o,c),c,d);h??=xl(e,Tl(l,c),c,d),h!=null&&(s[c]=h)}if(r&&st.call(r,n)){let d=r[n];for(c in d)st.call(d,c)&&!st.call(s,c)&&(s[c]=d[c])}return s}function xl(e,t,n,i){return t?Array.isArray(i)?Jd(e,t,n,i):ta(e,t,n,i):void 0}function Jd(e,t,n,i){let r=-1,o=[];for(;++r<i.length;){let l=ta(e,t,n,i[r]);(typeof l=="number"||typeof l=="string")&&o.push(l)}return o}function ta(e,t,n,i){if(!(typeof i!="boolean"&&typeof i!="number"&&typeof i!="string")&&eh(e,n,i)){if(typeof t=="object"&&t.length>1){let r=!1,o=0;for(;++o<t.length;){let l=t[o];if(l&&typeof l=="object"&&"flags"in l){if(l.test(String(i))){r=!0;break}}else if(l===i){r=!0;break}}if(!r)return}return e.schema.clobber&&e.schema.clobberPrefix&&e.schema.clobber.includes(n)?e.schema.clobberPrefix+i:i}}function eh(e,t,n){let i=e.schema.protocols&&st.call(e.schema.protocols,t)?e.schema.protocols[t]:void 0;if(!i||i.length===0)return!0;let r=String(n),o=r.indexOf(":"),l=r.indexOf("?"),a=r.indexOf("#"),s=r.indexOf("/");if(o<0||s>-1&&o>s||l>-1&&o>l||a>-1&&o>a)return!0;let c=-1;for(;++c<i.length;){let d=i[c];if(o===d.length&&r.slice(0,d.length)===d)return!0}return!1}function Bn(e,t){let n=Yo(t);t.data&&(e.data=pn(t.data)),n&&(e.position=n)}function Tl(e,t){let n,i=-1;if(e)for(;++i<e.length;){let r=e[i],o=typeof r=="string"?r:r[0];if(o===t)return r;o==="data*"&&(n=r)}if(t.length>4&&t.slice(0,4).toLowerCase()==="data")return n}function th(e){return function(t){return Zd(t,e)}}const nh="AElig.AMP.Aacute.Acirc.Agrave.Aring.Atilde.Auml.COPY.Ccedil.ETH.Eacute.Ecirc.Egrave.Euml.GT.Iacute.Icirc.Igrave.Iuml.LT.Ntilde.Oacute.Ocirc.Ograve.Oslash.Otilde.Ouml.QUOT.REG.THORN.Uacute.Ucirc.Ugrave.Uuml.Yacute.aacute.acirc.acute.aelig.agrave.amp.aring.atilde.auml.brvbar.ccedil.cedil.cent.copy.curren.deg.divide.eacute.ecirc.egrave.eth.euml.frac12.frac14.frac34.gt.iacute.icirc.iexcl.igrave.iquest.iuml.laquo.lt.macr.micro.middot.nbsp.not.ntilde.oacute.ocirc.ograve.ordf.ordm.oslash.otilde.ouml.para.plusmn.pound.quot.raquo.reg.sect.shy.sup1.sup2.sup3.szlig.thorn.times.uacute.ucirc.ugrave.uml.uuml.yacute.yen.yuml".split("."),wi={nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",times:"×",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",divide:"÷",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",fnof:"ƒ",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",bull:"•",hellip:"…",prime:"′",Prime:"″",oline:"‾",frasl:"⁄",weierp:"℘",image:"ℑ",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪",int:"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",lang:"〈",rang:"〉",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦",quot:'"',amp:"&",lt:"<",gt:">",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",circ:"ˆ",tilde:"˜",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",permil:"‰",lsaquo:"‹",rsaquo:"›",euro:"€"};function Jn(e,t){let n=String(e);if(typeof t!="string")throw TypeError("Expected character");let i=0,r=n.indexOf(t);for(;r!==-1;)i++,r=n.indexOf(t,r+t.length);return i}function ih(e,t){let n=t||{};return(e[e.length-1]===""?[...e,""]:e).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const rh=["area","base","basefont","bgsound","br","col","command","embed","frame","hr","image","img","input","keygen","link","meta","param","source","track","wbr"];var dn=class{constructor(t,n,i){this.normal=n,this.property=t,i&&(this.space=i)}};dn.prototype.normal={},dn.prototype.property={},dn.prototype.space=void 0;function na(e,t){let n={},i={};for(let r of e)Object.assign(n,r.property),Object.assign(i,r.normal);return new dn(n,i,t)}function ar(e){return e.toLowerCase()}var Ae=class{constructor(t,n){this.attribute=n,this.property=t}};Ae.prototype.attribute="",Ae.prototype.booleanish=!1,Ae.prototype.boolean=!1,Ae.prototype.commaOrSpaceSeparated=!1,Ae.prototype.commaSeparated=!1,Ae.prototype.defined=!1,Ae.prototype.mustUseProperty=!1,Ae.prototype.number=!1,Ae.prototype.overloadedBoolean=!1,Ae.prototype.property="",Ae.prototype.spaceSeparated=!1,Ae.prototype.space=void 0;var sr=Fn({boolean:()=>G,booleanish:()=>oe,commaOrSpaceSeparated:()=>Be,commaSeparated:()=>zt,number:()=>E,overloadedBoolean:()=>ia,spaceSeparated:()=>X});let lh=0;const G=Bt(),oe=Bt(),ia=Bt(),E=Bt(),X=Bt(),zt=Bt(),Be=Bt();function Bt(){return 2**++lh}const Ei=Object.keys(sr);var Ir=class extends Ae{constructor(t,n,i,r){let o=-1;if(super(t,n),Fl(this,"space",r),typeof i=="number")for(;++o<Ei.length;){let l=Ei[o];Fl(this,Ei[o],(i&sr[l])===sr[l])}}};Ir.prototype.defined=!0;function Fl(e,t,n){n&&(e[t]=n)}function Vt(e){let t={},n={};for(let[i,r]of Object.entries(e.properties)){let o=new Ir(i,e.transform(e.attributes||{},i),r,e.space);e.mustUseProperty&&e.mustUseProperty.includes(i)&&(o.mustUseProperty=!0),t[i]=o,n[ar(i)]=i,n[ar(o.attribute)]=i}return new dn(t,n,e.space)}const ra=Vt({properties:{ariaActiveDescendant:null,ariaAtomic:oe,ariaAutoComplete:null,ariaBusy:oe,ariaChecked:oe,ariaColCount:E,ariaColIndex:E,ariaColSpan:E,ariaControls:X,ariaCurrent:null,ariaDescribedBy:X,ariaDetails:null,ariaDisabled:oe,ariaDropEffect:X,ariaErrorMessage:null,ariaExpanded:oe,ariaFlowTo:X,ariaGrabbed:oe,ariaHasPopup:null,ariaHidden:oe,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:X,ariaLevel:E,ariaLive:null,ariaModal:oe,ariaMultiLine:oe,ariaMultiSelectable:oe,ariaOrientation:null,ariaOwns:X,ariaPlaceholder:null,ariaPosInSet:E,ariaPressed:oe,ariaReadOnly:oe,ariaRelevant:null,ariaRequired:oe,ariaRoleDescription:X,ariaRowCount:E,ariaRowIndex:E,ariaRowSpan:E,ariaSelected:oe,ariaSetSize:E,ariaSort:null,ariaValueMax:E,ariaValueMin:E,ariaValueNow:E,ariaValueText:null,role:null},transform(e,t){return t==="role"?t:"aria-"+t.slice(4).toLowerCase()}});function la(e,t){return t in e?e[t]:t}function oa(e,t){return la(e,t.toLowerCase())}const oh=Vt({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:zt,acceptCharset:X,accessKey:X,action:null,allow:null,allowFullScreen:G,allowPaymentRequest:G,allowUserMedia:G,alt:null,as:null,async:G,autoCapitalize:null,autoComplete:X,autoFocus:G,autoPlay:G,blocking:X,capture:null,charSet:null,checked:G,cite:null,className:X,cols:E,colSpan:null,content:null,contentEditable:oe,controls:G,controlsList:X,coords:E|zt,crossOrigin:null,data:null,dateTime:null,decoding:null,default:G,defer:G,dir:null,dirName:null,disabled:G,download:ia,draggable:oe,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:G,formTarget:null,headers:X,height:E,hidden:G,high:E,href:null,hrefLang:null,htmlFor:X,httpEquiv:X,id:null,imageSizes:null,imageSrcSet:null,inert:G,inputMode:null,integrity:null,is:null,isMap:G,itemId:null,itemProp:X,itemRef:X,itemScope:G,itemType:X,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:G,low:E,manifest:null,max:null,maxLength:E,media:null,method:null,min:null,minLength:E,multiple:G,muted:G,name:null,nonce:null,noModule:G,noValidate:G,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:G,optimum:E,pattern:null,ping:X,placeholder:null,playsInline:G,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:G,referrerPolicy:null,rel:X,required:G,reversed:G,rows:E,rowSpan:E,sandbox:X,scope:null,scoped:G,seamless:G,selected:G,shadowRootClonable:G,shadowRootDelegatesFocus:G,shadowRootMode:null,shape:null,size:E,sizes:null,slot:null,span:E,spellCheck:oe,src:null,srcDoc:null,srcLang:null,srcSet:null,start:E,step:null,style:null,tabIndex:E,target:null,title:null,translate:null,type:null,typeMustMatch:G,useMap:null,value:oe,width:E,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:X,axis:null,background:null,bgColor:null,border:E,borderColor:null,bottomMargin:E,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:G,declare:G,event:null,face:null,frame:null,frameBorder:null,hSpace:E,leftMargin:E,link:null,longDesc:null,lowSrc:null,marginHeight:E,marginWidth:E,noResize:G,noHref:G,noShade:G,noWrap:G,object:null,profile:null,prompt:null,rev:null,rightMargin:E,rules:null,scheme:null,scrolling:oe,standby:null,summary:null,text:null,topMargin:E,valueType:null,version:null,vAlign:null,vLink:null,vSpace:E,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:G,disableRemotePlayback:G,prefix:null,property:null,results:E,security:null,unselectable:null},space:"html",transform:oa}),ah=Vt({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:Be,accentHeight:E,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:E,amplitude:E,arabicForm:null,ascent:E,attributeName:null,attributeType:null,azimuth:E,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:E,by:null,calcMode:null,capHeight:E,className:X,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:E,diffuseConstant:E,direction:null,display:null,dur:null,divisor:E,dominantBaseline:null,download:G,dx:null,dy:null,edgeMode:null,editable:null,elevation:E,enableBackground:null,end:null,event:null,exponent:E,externalResourcesRequired:null,fill:null,fillOpacity:E,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:zt,g2:zt,glyphName:zt,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:E,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:E,horizOriginX:E,horizOriginY:E,id:null,ideographic:E,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:E,k:E,k1:E,k2:E,k3:E,k4:E,kernelMatrix:Be,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:E,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:E,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:E,overlineThickness:E,paintOrder:null,panose1:null,path:null,pathLength:E,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:X,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:E,pointsAtY:E,pointsAtZ:E,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Be,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Be,rev:Be,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Be,requiredFeatures:Be,requiredFonts:Be,requiredFormats:Be,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:E,specularExponent:E,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:E,strikethroughThickness:E,string:null,stroke:null,strokeDashArray:Be,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:E,strokeOpacity:E,strokeWidth:null,style:null,surfaceScale:E,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Be,tabIndex:E,tableValues:null,target:null,targetX:E,targetY:E,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Be,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:E,underlineThickness:E,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:E,values:null,vAlphabetic:E,vMathematical:E,vectorEffect:null,vHanging:E,vIdeographic:E,version:null,vertAdvY:E,vertOriginX:E,vertOriginY:E,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:E,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:la}),aa=Vt({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,t){return"xlink:"+t.slice(5).toLowerCase()}}),sa=Vt({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:oa}),ca=Vt({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,t){return"xml:"+t.slice(3).toLowerCase()}}),sh=/[A-Z]/g,Bl=/-[a-z]/g,ch=/^data[-\w.:]+$/i;function dh(e,t){let n=ar(t),i=t,r=Ae;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&ch.test(t)){if(t.charAt(4)==="-"){let o=t.slice(5).replace(Bl,mh);i="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{let o=t.slice(4);if(!Bl.test(o)){let l=o.replace(sh,hh);l.charAt(0)!=="-"&&(l="-"+l),t="data"+l}}r=Ir}return new r(i,t)}function hh(e){return"-"+e.toLowerCase()}function mh(e){return e.charAt(1).toUpperCase()}const uh=na([ra,oh,aa,sa,ca],"html"),da=na([ra,ah,aa,sa,ca],"svg"),kl={}.hasOwnProperty;function fh(e,t){let n=t||{};function i(r,...o){let l=i.invalid,a=i.handlers;if(r&&kl.call(r,e)){let s=String(r[e]);l=kl.call(a,s)?a[s]:i.unknown}if(l)return l.call(this,r,...o)}return i.handlers=n.handlers||{},i.invalid=n.invalid,i.unknown=n.unknown,i}const ph=/["&'<>`]/g,gh=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,yh=/[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,vh=/[|\\{}()[\]^$+*?.]/g,wl=new WeakMap;function bh(e,t){if(e=e.replace(t.subset?Ah(t.subset):ph,i),t.subset||t.escapeOnly)return e;return e.replace(gh,n).replace(yh,i);function n(r,o,l){return t.format((r.charCodeAt(0)-55296)*1024+r.charCodeAt(1)-56320+65536,l.charCodeAt(o+2),t)}function i(r,o,l){return t.format(r.charCodeAt(0),l.charCodeAt(o+1),t)}}function Ah(e){let t=wl.get(e);return t||(t=xh(e),wl.set(e,t)),t}function xh(e){let t=[],n=-1;for(;++n<e.length;)t.push(e[n].replace(vh,"\\$&"));return RegExp("(?:"+t.join("|")+")","g")}const Th=/[\dA-Fa-f]/;function Fh(e,t,n){let i="&#x"+e.toString(16).toUpperCase();return n&&t&&!Th.test(String.fromCharCode(t))?i:i+";"}const Bh=/\d/;function kh(e,t,n){let i="&#"+String(e);return n&&t&&!Bh.test(String.fromCharCode(t))?i:i+";"}const wh=["cent","copy","divide","gt","lt","not","para","times"],ha={}.hasOwnProperty,cr={};let Rn;for(Rn in wi)ha.call(wi,Rn)&&(cr[wi[Rn]]=Rn);const Eh=/[^\dA-Za-z]/;function Dh(e,t,n,i){let r=String.fromCharCode(e);if(ha.call(cr,r)){let o=cr[r],l="&"+o;return n&&nh.includes(o)&&!wh.includes(o)&&(!i||t&&t!==61&&Eh.test(String.fromCharCode(t)))?l:l+";"}return""}function Ch(e,t,n){let i=Fh(e,t,n.omitOptionalSemicolons),r;if((n.useNamedReferences||n.useShortestReferences)&&(r=Dh(e,t,n.omitOptionalSemicolons,n.attribute)),(n.useShortestReferences||!r)&&n.useShortestReferences){let o=kh(e,t,n.omitOptionalSemicolons);o.length<i.length&&(i=o)}return r&&(!n.useShortestReferences||r.length<i.length)?r:i}function _t(e,t){return bh(e,Object.assign({format:Ch},t))}const Rh=/^>|^->|<!--|-->|--!>|<!-$/g,Oh=[">"],Lh=["<",">"];function Sh(e,t,n,i){return i.settings.bogusComments?"<?"+_t(e.value,Object.assign({},i.settings.characterReferences,{subset:Oh}))+">":"<!--"+e.value.replace(Rh,r)+"-->";function r(o){return _t(o,Object.assign({},i.settings.characterReferences,{subset:Lh}))}}function Nh(e,t,n,i){return"<!"+(i.settings.upperDoctype?"DOCTYPE":"doctype")+(i.settings.tightDoctype?"":" ")+"html>"}function Ih(e){return e.join(" ").trim()}const Ph=/[ \t\n\f\r]/g;function Pr(e){return typeof e=="object"?e.type==="text"?El(e.value):!1:El(e)}function El(e){return e.replace(Ph,"")===""}const ce=ua(1),ma=ua(-1),zh=[];function ua(e){return t;function t(n,i,r){let o=n?n.children:zh,l=(i||0)+e,a=o[l];if(!r)for(;a&&Pr(a);)l+=e,a=o[l];return a}}const _h={}.hasOwnProperty;function fa(e){return t;function t(n,i,r){return _h.call(e,n.tagName)&&e[n.tagName](n,i,r)}}const zr=fa({body:Mh,caption:Di,colgroup:Di,dd:$h,dt:Hh,head:Di,html:Gh,li:qh,optgroup:Uh,option:Zh,p:jh,rp:Dl,rt:Dl,tbody:Qh,td:Cl,tfoot:Kh,th:Cl,thead:Vh,tr:Wh});function Di(e,t,n){let i=ce(n,t,!0);return!i||i.type!=="comment"&&!(i.type==="text"&&Pr(i.value.charAt(0)))}function Gh(e,t,n){let i=ce(n,t);return!i||i.type!=="comment"}function Mh(e,t,n){let i=ce(n,t);return!i||i.type!=="comment"}function jh(e,t,n){let i=ce(n,t);return i?i.type==="element"&&(i.tagName==="address"||i.tagName==="article"||i.tagName==="aside"||i.tagName==="blockquote"||i.tagName==="details"||i.tagName==="div"||i.tagName==="dl"||i.tagName==="fieldset"||i.tagName==="figcaption"||i.tagName==="figure"||i.tagName==="footer"||i.tagName==="form"||i.tagName==="h1"||i.tagName==="h2"||i.tagName==="h3"||i.tagName==="h4"||i.tagName==="h5"||i.tagName==="h6"||i.tagName==="header"||i.tagName==="hgroup"||i.tagName==="hr"||i.tagName==="main"||i.tagName==="menu"||i.tagName==="nav"||i.tagName==="ol"||i.tagName==="p"||i.tagName==="pre"||i.tagName==="section"||i.tagName==="table"||i.tagName==="ul"):!n||!(n.type==="element"&&(n.tagName==="a"||n.tagName==="audio"||n.tagName==="del"||n.tagName==="ins"||n.tagName==="map"||n.tagName==="noscript"||n.tagName==="video"))}function qh(e,t,n){let i=ce(n,t);return!i||i.type==="element"&&i.tagName==="li"}function Hh(e,t,n){let i=ce(n,t);return!!(i&&i.type==="element"&&(i.tagName==="dt"||i.tagName==="dd"))}function $h(e,t,n){let i=ce(n,t);return!i||i.type==="element"&&(i.tagName==="dt"||i.tagName==="dd")}function Dl(e,t,n){let i=ce(n,t);return!i||i.type==="element"&&(i.tagName==="rp"||i.tagName==="rt")}function Uh(e,t,n){let i=ce(n,t);return!i||i.type==="element"&&i.tagName==="optgroup"}function Zh(e,t,n){let i=ce(n,t);return!i||i.type==="element"&&(i.tagName==="option"||i.tagName==="optgroup")}function Vh(e,t,n){let i=ce(n,t);return!!(i&&i.type==="element"&&(i.tagName==="tbody"||i.tagName==="tfoot"))}function Qh(e,t,n){let i=ce(n,t);return!i||i.type==="element"&&(i.tagName==="tbody"||i.tagName==="tfoot")}function Kh(e,t,n){return!ce(n,t)}function Wh(e,t,n){let i=ce(n,t);return!i||i.type==="element"&&i.tagName==="tr"}function Cl(e,t,n){let i=ce(n,t);return!i||i.type==="element"&&(i.tagName==="td"||i.tagName==="th")}const Xh=fa({body:em,colgroup:tm,head:Jh,html:Yh,tbody:nm});function Yh(e){let t=ce(e,-1);return!t||t.type!=="comment"}function Jh(e){let t=new Set;for(let i of e.children)if(i.type==="element"&&(i.tagName==="base"||i.tagName==="title")){if(t.has(i.tagName))return!1;t.add(i.tagName)}let n=e.children[0];return!n||n.type==="element"}function em(e){let t=ce(e,-1,!0);return!t||t.type!=="comment"&&!(t.type==="text"&&Pr(t.value.charAt(0)))&&!(t.type==="element"&&(t.tagName==="meta"||t.tagName==="link"||t.tagName==="script"||t.tagName==="style"||t.tagName==="template"))}function tm(e,t,n){let i=ma(n,t),r=ce(e,-1,!0);return n&&i&&i.type==="element"&&i.tagName==="colgroup"&&zr(i,n.children.indexOf(i),n)?!1:!!(r&&r.type==="element"&&r.tagName==="col")}function nm(e,t,n){let i=ma(n,t),r=ce(e,-1);return n&&i&&i.type==="element"&&(i.tagName==="thead"||i.tagName==="tbody")&&zr(i,n.children.indexOf(i),n)?!1:!!(r&&r.type==="element"&&r.tagName==="tr")}const On={name:[[`	
\f\r &/=>`.split(""),`	
\f\r "&'/=>\``.split("")],[`\0	
\f\r "&'/<=>`.split(""),`\0	
\f\r "&'/<=>\``.split("")]],unquoted:[[`	
\f\r &>`.split(""),`\0	
\f\r "&'<=>\``.split("")],[`\0	
\f\r "&'<=>\``.split(""),`\0	
\f\r "&'<=>\``.split("")]],single:[["&'".split(""),"\"&'`".split("")],["\0&'".split(""),"\0\"&'`".split("")]],double:[['"&'.split(""),"\"&'`".split("")],['\0"&'.split(""),"\0\"&'`".split("")]]};function im(e,t,n,i){let r=i.schema,o=r.space==="svg"?!1:i.settings.omitOptionalTags,l=r.space==="svg"?i.settings.closeEmptyElements:i.settings.voids.includes(e.tagName.toLowerCase()),a=[],s;r.space==="html"&&e.tagName==="svg"&&(i.schema=da);let c=rm(i,e.properties),d=i.all(r.space==="html"&&e.tagName==="template"?e.content:e);return i.schema=r,d&&(l=!1),(c||!o||!Xh(e,t,n))&&(a.push("<",e.tagName,c?" "+c:""),l&&(r.space==="svg"||i.settings.closeSelfClosing)&&(s=c.charAt(c.length-1),(!i.settings.tightSelfClosing||s==="/"||s&&s!=='"'&&s!=="'")&&a.push(" "),a.push("/")),a.push(">")),a.push(d),!l&&(!o||!zr(e,t,n))&&a.push("</"+e.tagName+">"),a.join("")}function rm(e,t){let n=[],i=-1,r;if(t){for(r in t)if(t[r]!==null&&t[r]!==void 0){let o=lm(e,r,t[r]);o&&n.push(o)}}for(;++i<n.length;){let o=e.settings.tightAttributes?n[i].charAt(n[i].length-1):void 0;i!==n.length-1&&o!=='"'&&o!=="'"&&(n[i]+=" ")}return n.join("")}function lm(e,t,n){let i=dh(e.schema,t),r=e.settings.allowParseErrors&&e.schema.space==="html"?0:1,o=e.settings.allowDangerousCharacters?0:1,l=e.quote,a;if(i.overloadedBoolean&&(n===i.attribute||n==="")?n=!0:(i.boolean||i.overloadedBoolean)&&(typeof n!="string"||n===i.attribute||n==="")&&(n=!!n),n==null||n===!1||typeof n=="number"&&Number.isNaN(n))return"";let s=_t(i.attribute,Object.assign({},e.settings.characterReferences,{subset:On.name[r][o]}));return n===!0||(n=Array.isArray(n)?(i.commaSeparated?ih:Ih)(n,{padLeft:!e.settings.tightCommaSeparatedLists}):String(n),e.settings.collapseEmptyAttributes&&!n)?s:(e.settings.preferUnquoted&&(a=_t(n,Object.assign({},e.settings.characterReferences,{attribute:!0,subset:On.unquoted[r][o]}))),a!==n&&(e.settings.quoteSmart&&Jn(n,l)>Jn(n,e.alternative)&&(l=e.alternative),a=l+_t(n,Object.assign({},e.settings.characterReferences,{subset:(l==="'"?On.single:On.double)[r][o],attribute:!0}))+l),s+(a&&"="+a))}const om=["<","&"];function pa(e,t,n,i){return n&&n.type==="element"&&(n.tagName==="script"||n.tagName==="style")?e.value:_t(e.value,Object.assign({},i.settings.characterReferences,{subset:om}))}function am(e,t,n,i){return i.settings.allowDangerousHtml?e.value:pa(e,t,n,i)}function sm(e,t,n,i){return i.all(e)}const cm=fh("type",{invalid:dm,unknown:hm,handlers:{comment:Sh,doctype:Nh,element:im,raw:am,root:sm,text:pa}});function dm(e){throw Error("Expected node, not `"+e+"`")}function hm(e){throw Error("Cannot compile unknown node `"+e.type+"`")}const mm={},um={},fm=[];function pm(e,t){let n=t||mm,i=n.quote||'"',r=i==='"'?"'":'"';if(i!=='"'&&i!=="'")throw Error("Invalid quote `"+i+"`, expected `'` or `\"`");return{one:gm,all:ym,settings:{omitOptionalTags:n.omitOptionalTags||!1,allowParseErrors:n.allowParseErrors||!1,allowDangerousCharacters:n.allowDangerousCharacters||!1,quoteSmart:n.quoteSmart||!1,preferUnquoted:n.preferUnquoted||!1,tightAttributes:n.tightAttributes||!1,upperDoctype:n.upperDoctype||!1,tightDoctype:n.tightDoctype||!1,bogusComments:n.bogusComments||!1,tightCommaSeparatedLists:n.tightCommaSeparatedLists||!1,tightSelfClosing:n.tightSelfClosing||!1,collapseEmptyAttributes:n.collapseEmptyAttributes||!1,allowDangerousHtml:n.allowDangerousHtml||!1,voids:n.voids||rh,characterReferences:n.characterReferences||um,closeSelfClosing:n.closeSelfClosing||!1,closeEmptyElements:n.closeEmptyElements||!1},schema:n.space==="svg"?da:uh,quote:i,alternative:r}.one(Array.isArray(e)?{type:"root",children:e}:e,void 0,void 0)}function gm(e,t,n){return cm(e,t,n,this)}function ym(e){let t=[],n=e&&e.children||fm,i=-1;for(;++i<n.length;)t[i]=this.one(n[i],i,e);return t.join("")}function vm(e){let t=this,n={...t.data("settings"),...e};t.compiler=i;function i(r){return pm(r,n)}}const Rl={AElig:"Æ",AMP:"&",Aacute:"Á",Abreve:"Ă",Acirc:"Â",Acy:"А",Afr:"𝔄",Agrave:"À",Alpha:"Α",Amacr:"Ā",And:"⩓",Aogon:"Ą",Aopf:"𝔸",ApplyFunction:"⁡",Aring:"Å",Ascr:"𝒜",Assign:"≔",Atilde:"Ã",Auml:"Ä",Backslash:"∖",Barv:"⫧",Barwed:"⌆",Bcy:"Б",Because:"∵",Bernoullis:"ℬ",Beta:"Β",Bfr:"𝔅",Bopf:"𝔹",Breve:"˘",Bscr:"ℬ",Bumpeq:"≎",CHcy:"Ч",COPY:"©",Cacute:"Ć",Cap:"⋒",CapitalDifferentialD:"ⅅ",Cayleys:"ℭ",Ccaron:"Č",Ccedil:"Ç",Ccirc:"Ĉ",Cconint:"∰",Cdot:"Ċ",Cedilla:"¸",CenterDot:"·",Cfr:"ℭ",Chi:"Χ",CircleDot:"⊙",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",Colon:"∷",Colone:"⩴",Congruent:"≡",Conint:"∯",ContourIntegral:"∮",Copf:"ℂ",Coproduct:"∐",CounterClockwiseContourIntegral:"∳",Cross:"⨯",Cscr:"𝒞",Cup:"⋓",CupCap:"≍",DD:"ⅅ",DDotrahd:"⤑",DJcy:"Ђ",DScy:"Ѕ",DZcy:"Џ",Dagger:"‡",Darr:"↡",Dashv:"⫤",Dcaron:"Ď",Dcy:"Д",Del:"∇",Delta:"Δ",Dfr:"𝔇",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",Diamond:"⋄",DifferentialD:"ⅆ",Dopf:"𝔻",Dot:"¨",DotDot:"⃜",DotEqual:"≐",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",DownArrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",Downarrow:"⇓",Dscr:"𝒟",Dstrok:"Đ",ENG:"Ŋ",ETH:"Ð",Eacute:"É",Ecaron:"Ě",Ecirc:"Ê",Ecy:"Э",Edot:"Ė",Efr:"𝔈",Egrave:"È",Element:"∈",Emacr:"Ē",EmptySmallSquare:"◻",EmptyVerySmallSquare:"▫",Eogon:"Ę",Eopf:"𝔼",Epsilon:"Ε",Equal:"⩵",EqualTilde:"≂",Equilibrium:"⇌",Escr:"ℰ",Esim:"⩳",Eta:"Η",Euml:"Ë",Exists:"∃",ExponentialE:"ⅇ",Fcy:"Ф",Ffr:"𝔉",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",Fopf:"𝔽",ForAll:"∀",Fouriertrf:"ℱ",Fscr:"ℱ",GJcy:"Ѓ",GT:">",Gamma:"Γ",Gammad:"Ϝ",Gbreve:"Ğ",Gcedil:"Ģ",Gcirc:"Ĝ",Gcy:"Г",Gdot:"Ġ",Gfr:"𝔊",Gg:"⋙",Gopf:"𝔾",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",Gscr:"𝒢",Gt:"≫",HARDcy:"Ъ",Hacek:"ˇ",Hat:"^",Hcirc:"Ĥ",Hfr:"ℌ",HilbertSpace:"ℋ",Hopf:"ℍ",HorizontalLine:"─",Hscr:"ℋ",Hstrok:"Ħ",HumpDownHump:"≎",HumpEqual:"≏",IEcy:"Е",IJlig:"Ĳ",IOcy:"Ё",Iacute:"Í",Icirc:"Î",Icy:"И",Idot:"İ",Ifr:"ℑ",Igrave:"Ì",Im:"ℑ",Imacr:"Ī",ImaginaryI:"ⅈ",Implies:"⇒",Int:"∬",Integral:"∫",Intersection:"⋂",InvisibleComma:"⁣",InvisibleTimes:"⁢",Iogon:"Į",Iopf:"𝕀",Iota:"Ι",Iscr:"ℐ",Itilde:"Ĩ",Iukcy:"І",Iuml:"Ï",Jcirc:"Ĵ",Jcy:"Й",Jfr:"𝔍",Jopf:"𝕁",Jscr:"𝒥",Jsercy:"Ј",Jukcy:"Є",KHcy:"Х",KJcy:"Ќ",Kappa:"Κ",Kcedil:"Ķ",Kcy:"К",Kfr:"𝔎",Kopf:"𝕂",Kscr:"𝒦",LJcy:"Љ",LT:"<",Lacute:"Ĺ",Lambda:"Λ",Lang:"⟪",Laplacetrf:"ℒ",Larr:"↞",Lcaron:"Ľ",Lcedil:"Ļ",Lcy:"Л",LeftAngleBracket:"⟨",LeftArrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",LeftRightArrow:"↔",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",Leftarrow:"⇐",Leftrightarrow:"⇔",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",LessLess:"⪡",LessSlantEqual:"⩽",LessTilde:"≲",Lfr:"𝔏",Ll:"⋘",Lleftarrow:"⇚",Lmidot:"Ŀ",LongLeftArrow:"⟵",LongLeftRightArrow:"⟷",LongRightArrow:"⟶",Longleftarrow:"⟸",Longleftrightarrow:"⟺",Longrightarrow:"⟹",Lopf:"𝕃",LowerLeftArrow:"↙",LowerRightArrow:"↘",Lscr:"ℒ",Lsh:"↰",Lstrok:"Ł",Lt:"≪",Map:"⤅",Mcy:"М",MediumSpace:" ",Mellintrf:"ℳ",Mfr:"𝔐",MinusPlus:"∓",Mopf:"𝕄",Mscr:"ℳ",Mu:"Μ",NJcy:"Њ",Nacute:"Ń",Ncaron:"Ň",Ncedil:"Ņ",Ncy:"Н",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:`
`,Nfr:"𝔑",NoBreak:"⁠",NonBreakingSpace:" ",Nopf:"ℕ",Not:"⫬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",Nscr:"𝒩",Ntilde:"Ñ",Nu:"Ν",OElig:"Œ",Oacute:"Ó",Ocirc:"Ô",Ocy:"О",Odblac:"Ő",Ofr:"𝔒",Ograve:"Ò",Omacr:"Ō",Omega:"Ω",Omicron:"Ο",Oopf:"𝕆",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",Or:"⩔",Oscr:"𝒪",Oslash:"Ø",Otilde:"Õ",Otimes:"⨷",Ouml:"Ö",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",PartialD:"∂",Pcy:"П",Pfr:"𝔓",Phi:"Φ",Pi:"Π",PlusMinus:"±",Poincareplane:"ℌ",Popf:"ℙ",Pr:"⪻",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",Prime:"″",Product:"∏",Proportion:"∷",Proportional:"∝",Pscr:"𝒫",Psi:"Ψ",QUOT:'"',Qfr:"𝔔",Qopf:"ℚ",Qscr:"𝒬",RBarr:"⤐",REG:"®",Racute:"Ŕ",Rang:"⟫",Rarr:"↠",Rarrtl:"⤖",Rcaron:"Ř",Rcedil:"Ŗ",Rcy:"Р",Re:"ℜ",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",Rfr:"ℜ",Rho:"Ρ",RightAngleBracket:"⟩",RightArrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",Rightarrow:"⇒",Ropf:"ℝ",RoundImplies:"⥰",Rrightarrow:"⇛",Rscr:"ℛ",Rsh:"↱",RuleDelayed:"⧴",SHCHcy:"Щ",SHcy:"Ш",SOFTcy:"Ь",Sacute:"Ś",Sc:"⪼",Scaron:"Š",Scedil:"Ş",Scirc:"Ŝ",Scy:"С",Sfr:"𝔖",ShortDownArrow:"↓",ShortLeftArrow:"←",ShortRightArrow:"→",ShortUpArrow:"↑",Sigma:"Σ",SmallCircle:"∘",Sopf:"𝕊",Sqrt:"√",Square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",Sscr:"𝒮",Star:"⋆",Sub:"⋐",Subset:"⋐",SubsetEqual:"⊆",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",SuchThat:"∋",Sum:"∑",Sup:"⋑",Superset:"⊃",SupersetEqual:"⊇",Supset:"⋑",THORN:"Þ",TRADE:"™",TSHcy:"Ћ",TScy:"Ц",Tab:"	",Tau:"Τ",Tcaron:"Ť",Tcedil:"Ţ",Tcy:"Т",Tfr:"𝔗",Therefore:"∴",Theta:"Θ",ThickSpace:"  ",ThinSpace:" ",Tilde:"∼",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",Topf:"𝕋",TripleDot:"⃛",Tscr:"𝒯",Tstrok:"Ŧ",Uacute:"Ú",Uarr:"↟",Uarrocir:"⥉",Ubrcy:"Ў",Ubreve:"Ŭ",Ucirc:"Û",Ucy:"У",Udblac:"Ű",Ufr:"𝔘",Ugrave:"Ù",Umacr:"Ū",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",Uogon:"Ų",Uopf:"𝕌",UpArrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",UpDownArrow:"↕",UpEquilibrium:"⥮",UpTee:"⊥",UpTeeArrow:"↥",Uparrow:"⇑",Updownarrow:"⇕",UpperLeftArrow:"↖",UpperRightArrow:"↗",Upsi:"ϒ",Upsilon:"Υ",Uring:"Ů",Uscr:"𝒰",Utilde:"Ũ",Uuml:"Ü",VDash:"⊫",Vbar:"⫫",Vcy:"В",Vdash:"⊩",Vdashl:"⫦",Vee:"⋁",Verbar:"‖",Vert:"‖",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",Vfr:"𝔙",Vopf:"𝕍",Vscr:"𝒱",Vvdash:"⊪",Wcirc:"Ŵ",Wedge:"⋀",Wfr:"𝔚",Wopf:"𝕎",Wscr:"𝒲",Xfr:"𝔛",Xi:"Ξ",Xopf:"𝕏",Xscr:"𝒳",YAcy:"Я",YIcy:"Ї",YUcy:"Ю",Yacute:"Ý",Ycirc:"Ŷ",Ycy:"Ы",Yfr:"𝔜",Yopf:"𝕐",Yscr:"𝒴",Yuml:"Ÿ",ZHcy:"Ж",Zacute:"Ź",Zcaron:"Ž",Zcy:"З",Zdot:"Ż",ZeroWidthSpace:"​",Zeta:"Ζ",Zfr:"ℨ",Zopf:"ℤ",Zscr:"𝒵",aacute:"á",abreve:"ă",ac:"∾",acE:"∾̳",acd:"∿",acirc:"â",acute:"´",acy:"а",aelig:"æ",af:"⁡",afr:"𝔞",agrave:"à",alefsym:"ℵ",aleph:"ℵ",alpha:"α",amacr:"ā",amalg:"⨿",amp:"&",and:"∧",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",aogon:"ą",aopf:"𝕒",ap:"≈",apE:"⩰",apacir:"⩯",ape:"≊",apid:"≋",apos:"'",approx:"≈",approxeq:"≊",aring:"å",ascr:"𝒶",ast:"*",asymp:"≈",asympeq:"≍",atilde:"ã",auml:"ä",awconint:"∳",awint:"⨑",bNot:"⫭",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",barvee:"⊽",barwed:"⌅",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",bcy:"б",bdquo:"„",becaus:"∵",because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",beta:"β",beth:"ℶ",between:"≬",bfr:"𝔟",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bnot:"⌐",bopf:"𝕓",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxDL:"╗",boxDR:"╔",boxDl:"╖",boxDr:"╓",boxH:"═",boxHD:"╦",boxHU:"╩",boxHd:"╤",boxHu:"╧",boxUL:"╝",boxUR:"╚",boxUl:"╜",boxUr:"╙",boxV:"║",boxVH:"╬",boxVL:"╣",boxVR:"╠",boxVh:"╫",boxVl:"╢",boxVr:"╟",boxbox:"⧉",boxdL:"╕",boxdR:"╒",boxdl:"┐",boxdr:"┌",boxh:"─",boxhD:"╥",boxhU:"╨",boxhd:"┬",boxhu:"┴",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxuL:"╛",boxuR:"╘",boxul:"┘",boxur:"└",boxv:"│",boxvH:"╪",boxvL:"╡",boxvR:"╞",boxvh:"┼",boxvl:"┤",boxvr:"├",bprime:"‵",breve:"˘",brvbar:"¦",bscr:"𝒷",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpE:"⪮",bumpe:"≏",bumpeq:"≏",cacute:"ć",cap:"∩",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",caps:"∩︀",caret:"⁁",caron:"ˇ",ccaps:"⩍",ccaron:"č",ccedil:"ç",ccirc:"ĉ",ccups:"⩌",ccupssm:"⩐",cdot:"ċ",cedil:"¸",cemptyv:"⦲",cent:"¢",centerdot:"·",cfr:"𝔠",chcy:"ч",check:"✓",checkmark:"✓",chi:"χ",cir:"○",cirE:"⧃",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledR:"®",circledS:"Ⓢ",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",cire:"≗",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",clubs:"♣",clubsuit:"♣",colon:":",colone:"≔",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",conint:"∮",copf:"𝕔",coprod:"∐",copy:"©",copysr:"℗",crarr:"↵",cross:"✗",cscr:"𝒸",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",cup:"∪",cupbrcap:"⩈",cupcap:"⩆",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",dArr:"⇓",dHar:"⥥",dagger:"†",daleth:"ℸ",darr:"↓",dash:"‐",dashv:"⊣",dbkarow:"⤏",dblac:"˝",dcaron:"ď",dcy:"д",dd:"ⅆ",ddagger:"‡",ddarr:"⇊",ddotseq:"⩷",deg:"°",delta:"δ",demptyv:"⦱",dfisht:"⥿",dfr:"𝔡",dharl:"⇃",dharr:"⇂",diam:"⋄",diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",djcy:"ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",dopf:"𝕕",dot:"˙",doteq:"≐",doteqdot:"≑",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",downarrow:"↓",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",dscr:"𝒹",dscy:"ѕ",dsol:"⧶",dstrok:"đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",dzcy:"џ",dzigrarr:"⟿",eDDot:"⩷",eDot:"≑",eacute:"é",easter:"⩮",ecaron:"ě",ecir:"≖",ecirc:"ê",ecolon:"≕",ecy:"э",edot:"ė",ee:"ⅇ",efDot:"≒",efr:"𝔢",eg:"⪚",egrave:"è",egs:"⪖",egsdot:"⪘",el:"⪙",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",emacr:"ē",empty:"∅",emptyset:"∅",emptyv:"∅",emsp13:" ",emsp14:" ",emsp:" ",eng:"ŋ",ensp:" ",eogon:"ę",eopf:"𝕖",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",epsilon:"ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",equals:"=",equest:"≟",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erDot:"≓",erarr:"⥱",escr:"ℯ",esdot:"≐",esim:"≂",eta:"η",eth:"ð",euml:"ë",euro:"€",excl:"!",exist:"∃",expectation:"ℰ",exponentiale:"ⅇ",fallingdotseq:"≒",fcy:"ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",ffr:"𝔣",filig:"ﬁ",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",fopf:"𝕗",forall:"∀",fork:"⋔",forkv:"⫙",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",fscr:"𝒻",gE:"≧",gEl:"⪌",gacute:"ǵ",gamma:"γ",gammad:"ϝ",gap:"⪆",gbreve:"ğ",gcirc:"ĝ",gcy:"г",gdot:"ġ",ge:"≥",gel:"⋛",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",gfr:"𝔤",gg:"≫",ggg:"⋙",gimel:"ℷ",gjcy:"ѓ",gl:"≷",glE:"⪒",gla:"⪥",glj:"⪤",gnE:"≩",gnap:"⪊",gnapprox:"⪊",gne:"⪈",gneq:"⪈",gneqq:"≩",gnsim:"⋧",gopf:"𝕘",grave:"`",gscr:"ℊ",gsim:"≳",gsime:"⪎",gsiml:"⪐",gt:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",hArr:"⇔",hairsp:" ",half:"½",hamilt:"ℋ",hardcy:"ъ",harr:"↔",harrcir:"⥈",harrw:"↭",hbar:"ℏ",hcirc:"ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",hfr:"𝔥",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",hopf:"𝕙",horbar:"―",hscr:"𝒽",hslash:"ℏ",hstrok:"ħ",hybull:"⁃",hyphen:"‐",iacute:"í",ic:"⁣",icirc:"î",icy:"и",iecy:"е",iexcl:"¡",iff:"⇔",ifr:"𝔦",igrave:"ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",ijlig:"ĳ",imacr:"ī",image:"ℑ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",in:"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",int:"∫",intcal:"⊺",integers:"ℤ",intercal:"⊺",intlarhk:"⨗",intprod:"⨼",iocy:"ё",iogon:"į",iopf:"𝕚",iota:"ι",iprod:"⨼",iquest:"¿",iscr:"𝒾",isin:"∈",isinE:"⋹",isindot:"⋵",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",itilde:"ĩ",iukcy:"і",iuml:"ï",jcirc:"ĵ",jcy:"й",jfr:"𝔧",jmath:"ȷ",jopf:"𝕛",jscr:"𝒿",jsercy:"ј",jukcy:"є",kappa:"κ",kappav:"ϰ",kcedil:"ķ",kcy:"к",kfr:"𝔨",kgreen:"ĸ",khcy:"х",kjcy:"ќ",kopf:"𝕜",kscr:"𝓀",lAarr:"⇚",lArr:"⇐",lAtail:"⤛",lBarr:"⤎",lE:"≦",lEg:"⪋",lHar:"⥢",lacute:"ĺ",laemptyv:"⦴",lagran:"ℒ",lambda:"λ",lang:"⟨",langd:"⦑",langle:"⟨",lap:"⪅",laquo:"«",larr:"←",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",latail:"⤙",late:"⪭",lates:"⪭︀",lbarr:"⤌",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",lcaron:"ľ",lcedil:"ļ",lceil:"⌈",lcub:"{",lcy:"л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",le:"≤",leftarrow:"←",leftarrowtail:"↢",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",leftrightarrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",leftthreetimes:"⋋",leg:"⋚",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",lessgtr:"≶",lesssim:"≲",lfisht:"⥼",lfloor:"⌊",lfr:"𝔩",lg:"≶",lgE:"⪑",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",ljcy:"љ",ll:"≪",llarr:"⇇",llcorner:"⌞",llhard:"⥫",lltri:"◺",lmidot:"ŀ",lmoust:"⎰",lmoustache:"⎰",lnE:"≨",lnap:"⪉",lnapprox:"⪉",lne:"⪇",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",longleftarrow:"⟵",longleftrightarrow:"⟷",longmapsto:"⟼",longrightarrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",lopf:"𝕝",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",lscr:"𝓁",lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",lstrok:"ł",lt:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltrPar:"⦖",ltri:"◃",ltrie:"⊴",ltrif:"◂",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",mDDot:"∺",macr:"¯",male:"♂",malt:"✠",maltese:"✠",map:"↦",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",mcy:"м",mdash:"—",measuredangle:"∡",mfr:"𝔪",mho:"℧",micro:"µ",mid:"∣",midast:"*",midcir:"⫰",middot:"·",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",mopf:"𝕞",mp:"∓",mscr:"𝓂",mstpos:"∾",mu:"μ",multimap:"⊸",mumap:"⊸",nGg:"⋙̸",nGt:"≫⃒",nGtv:"≫̸",nLeftarrow:"⇍",nLeftrightarrow:"⇎",nLl:"⋘̸",nLt:"≪⃒",nLtv:"≪̸",nRightarrow:"⇏",nVDash:"⊯",nVdash:"⊮",nabla:"∇",nacute:"ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",ncaron:"ň",ncedil:"ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",ncy:"н",ndash:"–",ne:"≠",neArr:"⇗",nearhk:"⤤",nearr:"↗",nearrow:"↗",nedot:"≐̸",nequiv:"≢",nesear:"⤨",nesim:"≂̸",nexist:"∄",nexists:"∄",nfr:"𝔫",ngE:"≧̸",nge:"≱",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",ngsim:"≵",ngt:"≯",ngtr:"≯",nhArr:"⇎",nharr:"↮",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",njcy:"њ",nlArr:"⇍",nlE:"≦̸",nlarr:"↚",nldr:"‥",nle:"≰",nleftarrow:"↚",nleftrightarrow:"↮",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nlsim:"≴",nlt:"≮",nltri:"⋪",nltrie:"⋬",nmid:"∤",nopf:"𝕟",not:"¬",notin:"∉",notinE:"⋹̸",notindot:"⋵̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrArr:"⇏",nrarr:"↛",nrarrc:"⤳̸",nrarrw:"↝̸",nrightarrow:"↛",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",nscr:"𝓃",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsubE:"⫅̸",nsube:"⊈",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupE:"⫆̸",nsupe:"⊉",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",ntilde:"ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",nu:"ν",num:"#",numero:"№",numsp:" ",nvDash:"⊭",nvHarr:"⤄",nvap:"≍⃒",nvdash:"⊬",nvge:"≥⃒",nvgt:">⃒",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwArr:"⇖",nwarhk:"⤣",nwarr:"↖",nwarrow:"↖",nwnear:"⤧",oS:"Ⓢ",oacute:"ó",oast:"⊛",ocir:"⊚",ocirc:"ô",ocy:"о",odash:"⊝",odblac:"ő",odiv:"⨸",odot:"⊙",odsold:"⦼",oelig:"œ",ofcir:"⦿",ofr:"𝔬",ogon:"˛",ograve:"ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",omacr:"ō",omega:"ω",omicron:"ο",omid:"⦶",ominus:"⊖",oopf:"𝕠",opar:"⦷",operp:"⦹",oplus:"⊕",or:"∨",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oscr:"ℴ",oslash:"ø",osol:"⊘",otilde:"õ",otimes:"⊗",otimesas:"⨶",ouml:"ö",ovbar:"⌽",par:"∥",para:"¶",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",pcy:"п",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",pfr:"𝔭",phi:"φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",pi:"π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",pointint:"⨕",popf:"𝕡",pound:"£",pr:"≺",prE:"⪳",prap:"⪷",prcue:"≼",pre:"⪯",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",prime:"′",primes:"ℙ",prnE:"⪵",prnap:"⪹",prnsim:"⋨",prod:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",propto:"∝",prsim:"≾",prurel:"⊰",pscr:"𝓅",psi:"ψ",puncsp:" ",qfr:"𝔮",qint:"⨌",qopf:"𝕢",qprime:"⁗",qscr:"𝓆",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",quot:'"',rAarr:"⇛",rArr:"⇒",rAtail:"⤜",rBarr:"⤏",rHar:"⥤",race:"∽̱",racute:"ŕ",radic:"√",raemptyv:"⦳",rang:"⟩",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",rarr:"→",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",rarrtl:"↣",rarrw:"↝",ratail:"⤚",ratio:"∶",rationals:"ℚ",rbarr:"⤍",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",rcaron:"ř",rcedil:"ŗ",rceil:"⌉",rcub:"}",rcy:"р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",reg:"®",rfisht:"⥽",rfloor:"⌋",rfr:"𝔯",rhard:"⇁",rharu:"⇀",rharul:"⥬",rho:"ρ",rhov:"ϱ",rightarrow:"→",rightarrowtail:"↣",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",rightthreetimes:"⋌",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",ropf:"𝕣",roplus:"⨮",rotimes:"⨵",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",rsaquo:"›",rscr:"𝓇",rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",ruluhar:"⥨",rx:"℞",sacute:"ś",sbquo:"‚",sc:"≻",scE:"⪴",scap:"⪸",scaron:"š",sccue:"≽",sce:"⪰",scedil:"ş",scirc:"ŝ",scnE:"⪶",scnap:"⪺",scnsim:"⋩",scpolint:"⨓",scsim:"≿",scy:"с",sdot:"⋅",sdotb:"⊡",sdote:"⩦",seArr:"⇘",searhk:"⤥",searr:"↘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",sfr:"𝔰",sfrown:"⌢",sharp:"♯",shchcy:"щ",shcy:"ш",shortmid:"∣",shortparallel:"∥",shy:"­",sigma:"σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",softcy:"ь",sol:"/",solb:"⧄",solbar:"⌿",sopf:"𝕤",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",square:"□",squarf:"▪",squf:"▪",srarr:"→",sscr:"𝓈",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",star:"☆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",sub:"⊂",subE:"⫅",subdot:"⪽",sube:"⊆",subedot:"⫃",submult:"⫁",subnE:"⫋",subne:"⊊",subplus:"⪿",subrarr:"⥹",subset:"⊂",subseteq:"⊆",subseteqq:"⫅",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",sum:"∑",sung:"♪",sup1:"¹",sup2:"²",sup3:"³",sup:"⊃",supE:"⫆",supdot:"⪾",supdsub:"⫘",supe:"⊇",supedot:"⫄",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supnE:"⫌",supne:"⊋",supplus:"⫀",supset:"⊃",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swArr:"⇙",swarhk:"⤦",swarr:"↙",swarrow:"↙",swnwar:"⤪",szlig:"ß",target:"⌖",tau:"τ",tbrk:"⎴",tcaron:"ť",tcedil:"ţ",tcy:"т",tdot:"⃛",telrec:"⌕",tfr:"𝔱",there4:"∴",therefore:"∴",theta:"θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",thinsp:" ",thkap:"≈",thksim:"∼",thorn:"þ",tilde:"˜",times:"×",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",topf:"𝕥",topfork:"⫚",tosa:"⤩",tprime:"‴",trade:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",tscr:"𝓉",tscy:"ц",tshcy:"ћ",tstrok:"ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",uArr:"⇑",uHar:"⥣",uacute:"ú",uarr:"↑",ubrcy:"ў",ubreve:"ŭ",ucirc:"û",ucy:"у",udarr:"⇅",udblac:"ű",udhar:"⥮",ufisht:"⥾",ufr:"𝔲",ugrave:"ù",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",umacr:"ū",uml:"¨",uogon:"ų",uopf:"𝕦",uparrow:"↑",updownarrow:"↕",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",upsi:"υ",upsih:"ϒ",upsilon:"υ",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",uring:"ů",urtri:"◹",uscr:"𝓊",utdot:"⋰",utilde:"ũ",utri:"▵",utrif:"▴",uuarr:"⇈",uuml:"ü",uwangle:"⦧",vArr:"⇕",vBar:"⫨",vBarv:"⫩",vDash:"⊨",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",varr:"↕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",vcy:"в",vdash:"⊢",vee:"∨",veebar:"⊻",veeeq:"≚",vellip:"⋮",verbar:"|",vert:"|",vfr:"𝔳",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",vopf:"𝕧",vprop:"∝",vrtri:"⊳",vscr:"𝓋",vsubnE:"⫋︀",vsubne:"⊊︀",vsupnE:"⫌︀",vsupne:"⊋︀",vzigzag:"⦚",wcirc:"ŵ",wedbar:"⩟",wedge:"∧",wedgeq:"≙",weierp:"℘",wfr:"𝔴",wopf:"𝕨",wp:"℘",wr:"≀",wreath:"≀",wscr:"𝓌",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",xfr:"𝔵",xhArr:"⟺",xharr:"⟷",xi:"ξ",xlArr:"⟸",xlarr:"⟵",xmap:"⟼",xnis:"⋻",xodot:"⨀",xopf:"𝕩",xoplus:"⨁",xotime:"⨂",xrArr:"⟹",xrarr:"⟶",xscr:"𝓍",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",yacute:"ý",yacy:"я",ycirc:"ŷ",ycy:"ы",yen:"¥",yfr:"𝔶",yicy:"ї",yopf:"𝕪",yscr:"𝓎",yucy:"ю",yuml:"ÿ",zacute:"ź",zcaron:"ž",zcy:"з",zdot:"ż",zeetrf:"ℨ",zeta:"ζ",zfr:"𝔷",zhcy:"ж",zigrarr:"⇝",zopf:"𝕫",zscr:"𝓏",zwj:"‍",zwnj:"‌"},bm={}.hasOwnProperty;function _r(e){return bm.call(Rl,e)?Rl[e]:!1}const ye=ct(/[A-Za-z]/),ue=ct(/[\dA-Za-z]/),Am=ct(/[#-'*+\--9=?A-Z^-~]/);function ei(e){return e!==null&&(e<32||e===127)}const dr=ct(/\d/),xm=ct(/[\dA-Fa-f]/),Tm=ct(/[!-/:-@[-`{-~]/);function P(e){return e!==null&&e<-2}function W(e){return e!==null&&(e<0||e===32)}function U(e){return e===-2||e===-1||e===32}const hi=ct(new RegExp("\\p{P}|\\p{S}","u")),xt=ct(/\s/);function ct(e){return t;function t(n){return n!==null&&n>-1&&e.test(String.fromCharCode(n))}}function Ie(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}function jt(e){if(e===null||W(e)||xt(e))return 1;if(hi(e))return 2}const Fm={};function mi(e,t){let n=t||Fm;return ga(e,typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,typeof n.includeHtml=="boolean"?n.includeHtml:!0)}function ga(e,t,n){if(Bm(e)){if("value"in e)return e.type==="html"&&!n?"":e.value;if(t&&"alt"in e&&e.alt)return e.alt;if("children"in e)return Ol(e.children,t,n)}return Array.isArray(e)?Ol(e,t,n):""}function Ol(e,t,n){let i=[],r=-1;for(;++r<e.length;)i[r]=ga(e[r],t,n);return i.join("")}function Bm(e){return!!(e&&typeof e=="object")}function ya(e,t){let n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)==65535||(n&65535)==65534||n>1114111?"�":String.fromCodePoint(n)}const km=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function wm(e){return e.replace(km,Em)}function Em(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){let i=n.charCodeAt(1),r=i===120||i===88;return ya(n.slice(r?2:1),r?16:10)}return _r(n)||e}function we(e,t,n,i){let r=e.length,o=0,l;if(t=t<0?-t>r?0:r+t:t>r?r:t,n=n>0?n:0,i.length<1e4)l=Array.from(i),l.unshift(t,n),e.splice(...l);else for(n&&e.splice(t,n);o<i.length;)l=i.slice(o,o+1e4),l.unshift(t,0),e.splice(...l),o+=1e4,t+=1e4}function Ee(e,t){return e.length>0?(we(e,e.length,0,t),e):t}const Ll={}.hasOwnProperty;function va(e){let t={},n=-1;for(;++n<e.length;)Dm(t,e[n]);return t}function Dm(e,t){let n;for(n in t){let i=(Ll.call(e,n)?e[n]:void 0)||(e[n]={}),r=t[n],o;if(r)for(o in r){Ll.call(i,o)||(i[o]=[]);let l=r[o];Cm(i[o],Array.isArray(l)?l:l?[l]:[])}}}function Cm(e,t){let n=-1,i=[];for(;++n<t.length;)(t[n].add==="after"?e:i).push(t[n]);we(e,0,0,i)}function Qt(e){let t=[],n=-1,i=0,r=0;for(;++n<e.length;){let o=e.charCodeAt(n),l="";if(o===37&&ue(e.charCodeAt(n+1))&&ue(e.charCodeAt(n+2)))r=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(l=String.fromCharCode(o));else if(o>55295&&o<57344){let a=e.charCodeAt(n+1);o<56320&&a>56319&&a<57344?(l=String.fromCharCode(o,a),r=1):l="�"}else l=String.fromCharCode(o);l&&=(t.push(e.slice(i,n),encodeURIComponent(l)),i=n+r+1,""),r&&=(n+=r,0)}return t.join("")+e.slice(i)}function ui(e,t,n){let i=[],r=-1;for(;++r<e.length;){let o=e[r].resolveAll;o&&!i.includes(o)&&(t=o(t,n),i.push(o))}return t}const hr={name:"attention",resolveAll:Rm,tokenize:Om};function Rm(e,t){let n=-1,i,r,o,l,a,s,c,d;for(;++n<e.length;)if(e[n][0]==="enter"&&e[n][1].type==="attentionSequence"&&e[n][1]._close){for(i=n;i--;)if(e[i][0]==="exit"&&e[i][1].type==="attentionSequence"&&e[i][1]._open&&t.sliceSerialize(e[i][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[i][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[i][1].end.offset-e[i][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;s=e[i][1].end.offset-e[i][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;let h={...e[i][1].end},m={...e[n][1].start};Sl(h,-s),Sl(m,s),l={type:s>1?"strongSequence":"emphasisSequence",start:h,end:{...e[i][1].end}},a={type:s>1?"strongSequence":"emphasisSequence",start:{...e[n][1].start},end:m},o={type:s>1?"strongText":"emphasisText",start:{...e[i][1].end},end:{...e[n][1].start}},r={type:s>1?"strong":"emphasis",start:{...l.start},end:{...a.end}},e[i][1].end={...l.start},e[n][1].start={...a.end},c=[],e[i][1].end.offset-e[i][1].start.offset&&(c=Ee(c,[["enter",e[i][1],t],["exit",e[i][1],t]])),c=Ee(c,[["enter",r,t],["enter",l,t],["exit",l,t],["enter",o,t]]),c=Ee(c,ui(t.parser.constructs.insideSpan.null,e.slice(i+1,n),t)),c=Ee(c,[["exit",o,t],["enter",a,t],["exit",a,t],["exit",r,t]]),e[n][1].end.offset-e[n][1].start.offset?(d=2,c=Ee(c,[["enter",e[n][1],t],["exit",e[n][1],t]])):d=0,we(e,i-1,n-i+3,c),n=i+c.length-d-2;break}}for(n=-1;++n<e.length;)e[n][1].type==="attentionSequence"&&(e[n][1].type="data");return e}function Om(e,t){let n=this.parser.constructs.attentionMarkers.null,i=this.previous,r=jt(i),o;return l;function l(s){return o=s,e.enter("attentionSequence"),a(s)}function a(s){if(s===o)return e.consume(s),a;let c=e.exit("attentionSequence"),d=jt(s),h=!d||d===2&&r||n.includes(s),m=!r||r===2&&d||n.includes(i);return c._open=!!(o===42?h:h&&(r||!m)),c._close=!!(o===42?m:m&&(d||!h)),t(s)}}function Sl(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}const Lm={name:"autolink",tokenize:Sm};function Sm(e,t,n){let i=0;return r;function r(u){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(u),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),o}function o(u){return ye(u)?(e.consume(u),l):u===64?n(u):c(u)}function l(u){return u===43||u===45||u===46||ue(u)?(i=1,a(u)):c(u)}function a(u){return u===58?(e.consume(u),i=0,s):(u===43||u===45||u===46||ue(u))&&i++<32?(e.consume(u),a):(i=0,c(u))}function s(u){return u===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(u),e.exit("autolinkMarker"),e.exit("autolink"),t):u===null||u===32||u===60||ei(u)?n(u):(e.consume(u),s)}function c(u){return u===64?(e.consume(u),d):Am(u)?(e.consume(u),c):n(u)}function d(u){return ue(u)?h(u):n(u)}function h(u){return u===46?(e.consume(u),i=0,d):u===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(u),e.exit("autolinkMarker"),e.exit("autolink"),t):m(u)}function m(u){if((u===45||ue(u))&&i++<63){let f=u===45?m:h;return e.consume(u),f}return n(u)}}function V(e,t,n,i){let r=i?i-1:1/0,o=0;return l;function l(s){return U(s)?(e.enter(n),a(s)):t(s)}function a(s){return U(s)&&o++<r?(e.consume(s),a):(e.exit(n),t(s))}}const kn={partial:!0,tokenize:Nm};function Nm(e,t,n){return i;function i(o){return U(o)?V(e,r,"linePrefix")(o):r(o)}function r(o){return o===null||P(o)?t(o):n(o)}}const ba={continuation:{tokenize:Pm},exit:zm,name:"blockQuote",tokenize:Im};function Im(e,t,n){let i=this;return r;function r(l){if(l===62){let a=i.containerState;return a.open||=(e.enter("blockQuote",{_container:!0}),!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(l),e.exit("blockQuoteMarker"),o}return n(l)}function o(l){return U(l)?(e.enter("blockQuotePrefixWhitespace"),e.consume(l),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),t):(e.exit("blockQuotePrefix"),t(l))}}function Pm(e,t,n){let i=this;return r;function r(l){return U(l)?V(e,o,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l):o(l)}function o(l){return e.attempt(ba,t,n)(l)}}function zm(e){e.exit("blockQuote")}const Aa={name:"characterEscape",tokenize:_m};function _m(e,t,n){return i;function i(o){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(o),e.exit("escapeMarker"),r}function r(o){return Tm(o)?(e.enter("characterEscapeValue"),e.consume(o),e.exit("characterEscapeValue"),e.exit("characterEscape"),t):n(o)}}const xa={name:"characterReference",tokenize:Gm};function Gm(e,t,n){let i=this,r=0,o,l;return a;function a(h){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(h),e.exit("characterReferenceMarker"),s}function s(h){return h===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(h),e.exit("characterReferenceMarkerNumeric"),c):(e.enter("characterReferenceValue"),o=31,l=ue,d(h))}function c(h){return h===88||h===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(h),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),o=6,l=xm,d):(e.enter("characterReferenceValue"),o=7,l=dr,d(h))}function d(h){if(h===59&&r){let m=e.exit("characterReferenceValue");return l===ue&&!_r(i.sliceSerialize(m))?n(h):(e.enter("characterReferenceMarker"),e.consume(h),e.exit("characterReferenceMarker"),e.exit("characterReference"),t)}return l(h)&&r++<o?(e.consume(h),d):n(h)}}const Nl={partial:!0,tokenize:jm},Il={concrete:!0,name:"codeFenced",tokenize:Mm};function Mm(e,t,n){let i=this,r={partial:!0,tokenize:I},o=0,l=0,a;return s;function s(F){return c(F)}function c(F){let S=i.events[i.events.length-1];return o=S&&S[1].type==="linePrefix"?S[2].sliceSerialize(S[1],!0).length:0,a=F,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),d(F)}function d(F){return F===a?(l++,e.consume(F),d):l<3?n(F):(e.exit("codeFencedFenceSequence"),U(F)?V(e,h,"whitespace")(F):h(F))}function h(F){return F===null||P(F)?(e.exit("codeFencedFence"),i.interrupt?t(F):e.check(Nl,A,L)(F)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),m(F))}function m(F){return F===null||P(F)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),h(F)):U(F)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),V(e,u,"whitespace")(F)):F===96&&F===a?n(F):(e.consume(F),m)}function u(F){return F===null||P(F)?h(F):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),f(F))}function f(F){return F===null||P(F)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),h(F)):F===96&&F===a?n(F):(e.consume(F),f)}function A(F){return e.attempt(r,L,b)(F)}function b(F){return e.enter("lineEnding"),e.consume(F),e.exit("lineEnding"),y}function y(F){return o>0&&U(F)?V(e,D,"linePrefix",o+1)(F):D(F)}function D(F){return F===null||P(F)?e.check(Nl,A,L)(F):(e.enter("codeFlowValue"),B(F))}function B(F){return F===null||P(F)?(e.exit("codeFlowValue"),D(F)):(e.consume(F),B)}function L(F){return e.exit("codeFenced"),t(F)}function I(F,S,x){let O=0;return v;function v(q){return F.enter("lineEnding"),F.consume(q),F.exit("lineEnding"),k}function k(q){return F.enter("codeFencedFence"),U(q)?V(F,C,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(q):C(q)}function C(q){return q===a?(F.enter("codeFencedFenceSequence"),N(q)):x(q)}function N(q){return q===a?(O++,F.consume(q),N):O>=l?(F.exit("codeFencedFenceSequence"),U(q)?V(F,H,"whitespace")(q):H(q)):x(q)}function H(q){return q===null||P(q)?(F.exit("codeFencedFence"),S(q)):x(q)}}}function jm(e,t,n){let i=this;return r;function r(l){return l===null?n(l):(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),o)}function o(l){return i.parser.lazy[i.now().line]?n(l):t(l)}}const Ci={name:"codeIndented",tokenize:Hm},qm={partial:!0,tokenize:$m};function Hm(e,t,n){let i=this;return r;function r(c){return e.enter("codeIndented"),V(e,o,"linePrefix",5)(c)}function o(c){let d=i.events[i.events.length-1];return d&&d[1].type==="linePrefix"&&d[2].sliceSerialize(d[1],!0).length>=4?l(c):n(c)}function l(c){return c===null?s(c):P(c)?e.attempt(qm,l,s)(c):(e.enter("codeFlowValue"),a(c))}function a(c){return c===null||P(c)?(e.exit("codeFlowValue"),l(c)):(e.consume(c),a)}function s(c){return e.exit("codeIndented"),t(c)}}function $m(e,t,n){let i=this;return r;function r(l){return i.parser.lazy[i.now().line]?n(l):P(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),r):V(e,o,"linePrefix",5)(l)}function o(l){let a=i.events[i.events.length-1];return a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):P(l)?r(l):n(l)}}const Um={name:"codeText",previous:Vm,resolve:Zm,tokenize:Qm};function Zm(e){let t=e.length-4,n=3,i,r;if((e[n][1].type==="lineEnding"||e[n][1].type==="space")&&(e[t][1].type==="lineEnding"||e[t][1].type==="space")){for(i=n;++i<t;)if(e[i][1].type==="codeTextData"){e[n][1].type="codeTextPadding",e[t][1].type="codeTextPadding",n+=2,t-=2;break}}for(i=n-1,t++;++i<=t;)r===void 0?i!==t&&e[i][1].type!=="lineEnding"&&(r=i):(i===t||e[i][1].type==="lineEnding")&&(e[r][1].type="codeTextData",i!==r+2&&(e[r][1].end=e[i-1][1].end,e.splice(r+2,i-r-2),t-=i-r-2,i=r+2),r=void 0);return e}function Vm(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Qm(e,t,n){let i=0,r,o;return l;function l(h){return e.enter("codeText"),e.enter("codeTextSequence"),a(h)}function a(h){return h===96?(e.consume(h),i++,a):(e.exit("codeTextSequence"),s(h))}function s(h){return h===null?n(h):h===32?(e.enter("space"),e.consume(h),e.exit("space"),s):h===96?(o=e.enter("codeTextSequence"),r=0,d(h)):P(h)?(e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),s):(e.enter("codeTextData"),c(h))}function c(h){return h===null||h===32||h===96||P(h)?(e.exit("codeTextData"),s(h)):(e.consume(h),c)}function d(h){return h===96?(e.consume(h),r++,d):r===i?(e.exit("codeTextSequence"),e.exit("codeText"),t(h)):(o.type="codeTextData",c(h))}}var Km=class{constructor(t){this.left=t?[...t]:[],this.right=[]}get(t){if(t<0||t>=this.left.length+this.right.length)throw RangeError("Cannot access index `"+t+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return t<this.left.length?this.left[t]:this.right[this.right.length-t+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(t,n){let i=n??1/0;return i<this.left.length?this.left.slice(t,i):t>this.left.length?this.right.slice(this.right.length-i+this.left.length,this.right.length-t+this.left.length).reverse():this.left.slice(t).concat(this.right.slice(this.right.length-i+this.left.length).reverse())}splice(t,n,i){let r=n||0;this.setCursor(Math.trunc(t));let o=this.right.splice(this.right.length-r,1/0);return i&&nn(this.left,i),o.reverse()}pop(){return this.setCursor(1/0),this.left.pop()}push(t){this.setCursor(1/0),this.left.push(t)}pushMany(t){this.setCursor(1/0),nn(this.left,t)}unshift(t){this.setCursor(0),this.right.push(t)}unshiftMany(t){this.setCursor(0),nn(this.right,t.reverse())}setCursor(t){if(!(t===this.left.length||t>this.left.length&&this.right.length===0||t<0&&this.left.length===0))if(t<this.left.length){let n=this.left.splice(t,1/0);nn(this.right,n.reverse())}else{let n=this.right.splice(this.left.length+this.right.length-t,1/0);nn(this.left,n.reverse())}}};function nn(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function Ta(e){let t={},n=-1,i,r,o,l,a,s,c,d=new Km(e);for(;++n<d.length;){for(;n in t;)n=t[n];if(i=d.get(n),n&&i[1].type==="chunkFlow"&&d.get(n-1)[1].type==="listItemPrefix"&&(s=i[1]._tokenizer.events,o=0,o<s.length&&s[o][1].type==="lineEndingBlank"&&(o+=2),o<s.length&&s[o][1].type==="content"))for(;++o<s.length&&s[o][1].type!=="content";)s[o][1].type==="chunkText"&&(s[o][1]._isInFirstContentOfListItem=!0,o++);if(i[0]==="enter")i[1].contentType&&(Object.assign(t,Wm(d,n)),n=t[n],c=!0);else if(i[1]._container){for(o=n,r=void 0;o--;)if(l=d.get(o),l[1].type==="lineEnding"||l[1].type==="lineEndingBlank")l[0]==="enter"&&(r&&(d.get(r)[1].type="lineEndingBlank"),l[1].type="lineEnding",r=o);else if(!(l[1].type==="linePrefix"||l[1].type==="listItemIndent"))break;r&&(i[1].end={...d.get(r)[1].start},a=d.slice(r,n),a.unshift(i),d.splice(r,n-r+1,a))}}return we(e,0,1/0,d.slice(0)),!c}function Wm(e,t){let n=e.get(t)[1],i=e.get(t)[2],r=t-1,o=[],l=n._tokenizer;l||(l=i.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(l._contentTypeTextTrailing=!0));let a=l.events,s=[],c={},d,h,m=-1,u=n,f=0,A=0,b=[A];for(;u;){for(;e.get(++r)[1]!==u;);o.push(r),u._tokenizer||(d=i.sliceStream(u),u.next||d.push(null),h&&l.defineSkip(u.start),u._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=!0),l.write(d),u._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=void 0)),h=u,u=u.next}for(u=n;++m<a.length;)a[m][0]==="exit"&&a[m-1][0]==="enter"&&a[m][1].type===a[m-1][1].type&&a[m][1].start.line!==a[m][1].end.line&&(A=m+1,b.push(A),u._tokenizer=void 0,u.previous=void 0,u=u.next);for(l.events=[],u?(u._tokenizer=void 0,u.previous=void 0):b.pop(),m=b.length;m--;){let y=a.slice(b[m],b[m+1]),D=o.pop();s.push([D,D+y.length-1]),e.splice(D,2,y)}for(s.reverse(),m=-1;++m<s.length;)c[f+s[m][0]]=f+s[m][1],f+=s[m][1]-s[m][0]-1;return c}const Xm={resolve:Jm,tokenize:eu},Ym={partial:!0,tokenize:tu};function Jm(e){return Ta(e),e}function eu(e,t){let n;return i;function i(a){return e.enter("content"),n=e.enter("chunkContent",{contentType:"content"}),r(a)}function r(a){return a===null?o(a):P(a)?e.check(Ym,l,o)(a):(e.consume(a),r)}function o(a){return e.exit("chunkContent"),e.exit("content"),t(a)}function l(a){return e.consume(a),e.exit("chunkContent"),n.next=e.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,r}}function tu(e,t,n){let i=this;return r;function r(l){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),V(e,o,"linePrefix")}function o(l){if(l===null||P(l))return n(l);let a=i.events[i.events.length-1];return!i.parser.constructs.disable.null.includes("codeIndented")&&a&&a[1].type==="linePrefix"&&a[2].sliceSerialize(a[1],!0).length>=4?t(l):e.interrupt(i.parser.constructs.flow,n,t)(l)}}function Fa(e,t,n,i,r,o,l,a,s){let c=s||1/0,d=0;return h;function h(y){return y===60?(e.enter(i),e.enter(r),e.enter(o),e.consume(y),e.exit(o),m):y===null||y===32||y===41||ei(y)?n(y):(e.enter(i),e.enter(l),e.enter(a),e.enter("chunkString",{contentType:"string"}),A(y))}function m(y){return y===62?(e.enter(o),e.consume(y),e.exit(o),e.exit(r),e.exit(i),t):(e.enter(a),e.enter("chunkString",{contentType:"string"}),u(y))}function u(y){return y===62?(e.exit("chunkString"),e.exit(a),m(y)):y===null||y===60||P(y)?n(y):(e.consume(y),y===92?f:u)}function f(y){return y===60||y===62||y===92?(e.consume(y),u):u(y)}function A(y){return!d&&(y===null||y===41||W(y))?(e.exit("chunkString"),e.exit(a),e.exit(l),e.exit(i),t(y)):d<c&&y===40?(e.consume(y),d++,A):y===41?(e.consume(y),d--,A):y===null||y===32||y===40||ei(y)?n(y):(e.consume(y),y===92?b:A)}function b(y){return y===40||y===41||y===92?(e.consume(y),A):A(y)}}function Ba(e,t,n,i,r,o){let l=this,a=0,s;return c;function c(u){return e.enter(i),e.enter(r),e.consume(u),e.exit(r),e.enter(o),d}function d(u){return a>999||u===null||u===91||u===93&&!s||u===94&&!a&&"_hiddenFootnoteSupport"in l.parser.constructs?n(u):u===93?(e.exit(o),e.enter(r),e.consume(u),e.exit(r),e.exit(i),t):P(u)?(e.enter("lineEnding"),e.consume(u),e.exit("lineEnding"),d):(e.enter("chunkString",{contentType:"string"}),h(u))}function h(u){return u===null||u===91||u===93||P(u)||a++>999?(e.exit("chunkString"),d(u)):(e.consume(u),s||=!U(u),u===92?m:h)}function m(u){return u===91||u===92||u===93?(e.consume(u),a++,h):h(u)}}function ka(e,t,n,i,r,o){let l;return a;function a(m){return m===34||m===39||m===40?(e.enter(i),e.enter(r),e.consume(m),e.exit(r),l=m===40?41:m,s):n(m)}function s(m){return m===l?(e.enter(r),e.consume(m),e.exit(r),e.exit(i),t):(e.enter(o),c(m))}function c(m){return m===l?(e.exit(o),s(l)):m===null?n(m):P(m)?(e.enter("lineEnding"),e.consume(m),e.exit("lineEnding"),V(e,c,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),d(m))}function d(m){return m===l||m===null||P(m)?(e.exit("chunkString"),c(m)):(e.consume(m),m===92?h:d)}function h(m){return m===l||m===92?(e.consume(m),d):d(m)}}function hn(e,t){let n;return i;function i(r){return P(r)?(e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),n=!0,i):U(r)?V(e,i,n?"linePrefix":"lineSuffix")(r):t(r)}}const nu={name:"definition",tokenize:ru},iu={partial:!0,tokenize:lu};function ru(e,t,n){let i=this,r;return o;function o(u){return e.enter("definition"),l(u)}function l(u){return Ba.call(i,e,a,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(u)}function a(u){return r=Ie(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),u===58?(e.enter("definitionMarker"),e.consume(u),e.exit("definitionMarker"),s):n(u)}function s(u){return W(u)?hn(e,c)(u):c(u)}function c(u){return Fa(e,d,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(u)}function d(u){return e.attempt(iu,h,h)(u)}function h(u){return U(u)?V(e,m,"whitespace")(u):m(u)}function m(u){return u===null||P(u)?(e.exit("definition"),i.parser.defined.push(r),t(u)):n(u)}}function lu(e,t,n){return i;function i(a){return W(a)?hn(e,r)(a):n(a)}function r(a){return ka(e,o,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(a)}function o(a){return U(a)?V(e,l,"whitespace")(a):l(a)}function l(a){return a===null||P(a)?t(a):n(a)}}const ou={name:"hardBreakEscape",tokenize:au};function au(e,t,n){return i;function i(o){return e.enter("hardBreakEscape"),e.consume(o),r}function r(o){return P(o)?(e.exit("hardBreakEscape"),t(o)):n(o)}}const su={name:"headingAtx",resolve:cu,tokenize:du};function cu(e,t){let n=e.length-2,i=3,r,o;return e[i][1].type==="whitespace"&&(i+=2),n-2>i&&e[n][1].type==="whitespace"&&(n-=2),e[n][1].type==="atxHeadingSequence"&&(i===n-1||n-4>i&&e[n-2][1].type==="whitespace")&&(n-=i+1===n?2:4),n>i&&(r={type:"atxHeadingText",start:e[i][1].start,end:e[n][1].end},o={type:"chunkText",start:e[i][1].start,end:e[n][1].end,contentType:"text"},we(e,i,n-i+1,[["enter",r,t],["enter",o,t],["exit",o,t],["exit",r,t]])),e}function du(e,t,n){let i=0;return r;function r(d){return e.enter("atxHeading"),o(d)}function o(d){return e.enter("atxHeadingSequence"),l(d)}function l(d){return d===35&&i++<6?(e.consume(d),l):d===null||W(d)?(e.exit("atxHeadingSequence"),a(d)):n(d)}function a(d){return d===35?(e.enter("atxHeadingSequence"),s(d)):d===null||P(d)?(e.exit("atxHeading"),t(d)):U(d)?V(e,a,"whitespace")(d):(e.enter("atxHeadingText"),c(d))}function s(d){return d===35?(e.consume(d),s):(e.exit("atxHeadingSequence"),a(d))}function c(d){return d===null||d===35||W(d)?(e.exit("atxHeadingText"),a(d)):(e.consume(d),c)}}const hu="address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."),Pl=["pre","script","style","textarea"],mu={concrete:!0,name:"htmlFlow",resolveTo:pu,tokenize:gu},uu={partial:!0,tokenize:vu},fu={partial:!0,tokenize:yu};function pu(e){let t=e.length;for(;t--&&!(e[t][0]==="enter"&&e[t][1].type==="htmlFlow"););return t>1&&e[t-2][1].type==="linePrefix"&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function gu(e,t,n){let i=this,r,o,l,a,s;return c;function c(g){return d(g)}function d(g){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(g),h}function h(g){return g===33?(e.consume(g),m):g===47?(e.consume(g),o=!0,A):g===63?(e.consume(g),r=3,i.interrupt?t:p):ye(g)?(e.consume(g),l=String.fromCharCode(g),b):n(g)}function m(g){return g===45?(e.consume(g),r=2,u):g===91?(e.consume(g),r=5,a=0,f):ye(g)?(e.consume(g),r=4,i.interrupt?t:p):n(g)}function u(g){return g===45?(e.consume(g),i.interrupt?t:p):n(g)}function f(g){return g==="CDATA[".charCodeAt(a++)?(e.consume(g),a===6?i.interrupt?t:C:f):n(g)}function A(g){return ye(g)?(e.consume(g),l=String.fromCharCode(g),b):n(g)}function b(g){if(g===null||g===47||g===62||W(g)){let tt=g===47,dt=l.toLowerCase();return!tt&&!o&&Pl.includes(dt)?(r=1,i.interrupt?t(g):C(g)):hu.includes(l.toLowerCase())?(r=6,tt?(e.consume(g),y):i.interrupt?t(g):C(g)):(r=7,i.interrupt&&!i.parser.lazy[i.now().line]?n(g):o?D(g):B(g))}return g===45||ue(g)?(e.consume(g),l+=String.fromCharCode(g),b):n(g)}function y(g){return g===62?(e.consume(g),i.interrupt?t:C):n(g)}function D(g){return U(g)?(e.consume(g),D):v(g)}function B(g){return g===47?(e.consume(g),v):g===58||g===95||ye(g)?(e.consume(g),L):U(g)?(e.consume(g),B):v(g)}function L(g){return g===45||g===46||g===58||g===95||ue(g)?(e.consume(g),L):I(g)}function I(g){return g===61?(e.consume(g),F):U(g)?(e.consume(g),I):B(g)}function F(g){return g===null||g===60||g===61||g===62||g===96?n(g):g===34||g===39?(e.consume(g),s=g,S):U(g)?(e.consume(g),F):x(g)}function S(g){return g===s?(e.consume(g),s=null,O):g===null||P(g)?n(g):(e.consume(g),S)}function x(g){return g===null||g===34||g===39||g===47||g===60||g===61||g===62||g===96||W(g)?I(g):(e.consume(g),x)}function O(g){return g===47||g===62||U(g)?B(g):n(g)}function v(g){return g===62?(e.consume(g),k):n(g)}function k(g){return g===null||P(g)?C(g):U(g)?(e.consume(g),k):n(g)}function C(g){return g===45&&r===2?(e.consume(g),ee):g===60&&r===1?(e.consume(g),te):g===62&&r===4?(e.consume(g),et):g===63&&r===3?(e.consume(g),p):g===93&&r===5?(e.consume(g),Te):P(g)&&(r===6||r===7)?(e.exit("htmlFlowData"),e.check(uu,He,N)(g)):g===null||P(g)?(e.exit("htmlFlowData"),N(g)):(e.consume(g),C)}function N(g){return e.check(fu,H,He)(g)}function H(g){return e.enter("lineEnding"),e.consume(g),e.exit("lineEnding"),q}function q(g){return g===null||P(g)?N(g):(e.enter("htmlFlowData"),C(g))}function ee(g){return g===45?(e.consume(g),p):C(g)}function te(g){return g===47?(e.consume(g),l="",pe):C(g)}function pe(g){if(g===62){let tt=l.toLowerCase();return Pl.includes(tt)?(e.consume(g),et):C(g)}return ye(g)&&l.length<8?(e.consume(g),l+=String.fromCharCode(g),pe):C(g)}function Te(g){return g===93?(e.consume(g),p):C(g)}function p(g){return g===62?(e.consume(g),et):g===45&&r===2?(e.consume(g),p):C(g)}function et(g){return g===null||P(g)?(e.exit("htmlFlowData"),He(g)):(e.consume(g),et)}function He(g){return e.exit("htmlFlow"),t(g)}}function yu(e,t,n){let i=this;return r;function r(l){return P(l)?(e.enter("lineEnding"),e.consume(l),e.exit("lineEnding"),o):n(l)}function o(l){return i.parser.lazy[i.now().line]?n(l):t(l)}}function vu(e,t,n){return i;function i(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),e.attempt(kn,t,n)}}const bu={name:"htmlText",tokenize:Au};function Au(e,t,n){let i=this,r,o,l;return a;function a(p){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(p),s}function s(p){return p===33?(e.consume(p),c):p===47?(e.consume(p),I):p===63?(e.consume(p),B):ye(p)?(e.consume(p),x):n(p)}function c(p){return p===45?(e.consume(p),d):p===91?(e.consume(p),o=0,f):ye(p)?(e.consume(p),D):n(p)}function d(p){return p===45?(e.consume(p),u):n(p)}function h(p){return p===null?n(p):p===45?(e.consume(p),m):P(p)?(l=h,te(p)):(e.consume(p),h)}function m(p){return p===45?(e.consume(p),u):h(p)}function u(p){return p===62?ee(p):p===45?m(p):h(p)}function f(p){return p==="CDATA[".charCodeAt(o++)?(e.consume(p),o===6?A:f):n(p)}function A(p){return p===null?n(p):p===93?(e.consume(p),b):P(p)?(l=A,te(p)):(e.consume(p),A)}function b(p){return p===93?(e.consume(p),y):A(p)}function y(p){return p===62?ee(p):p===93?(e.consume(p),y):A(p)}function D(p){return p===null||p===62?ee(p):P(p)?(l=D,te(p)):(e.consume(p),D)}function B(p){return p===null?n(p):p===63?(e.consume(p),L):P(p)?(l=B,te(p)):(e.consume(p),B)}function L(p){return p===62?ee(p):B(p)}function I(p){return ye(p)?(e.consume(p),F):n(p)}function F(p){return p===45||ue(p)?(e.consume(p),F):S(p)}function S(p){return P(p)?(l=S,te(p)):U(p)?(e.consume(p),S):ee(p)}function x(p){return p===45||ue(p)?(e.consume(p),x):p===47||p===62||W(p)?O(p):n(p)}function O(p){return p===47?(e.consume(p),ee):p===58||p===95||ye(p)?(e.consume(p),v):P(p)?(l=O,te(p)):U(p)?(e.consume(p),O):ee(p)}function v(p){return p===45||p===46||p===58||p===95||ue(p)?(e.consume(p),v):k(p)}function k(p){return p===61?(e.consume(p),C):P(p)?(l=k,te(p)):U(p)?(e.consume(p),k):O(p)}function C(p){return p===null||p===60||p===61||p===62||p===96?n(p):p===34||p===39?(e.consume(p),r=p,N):P(p)?(l=C,te(p)):U(p)?(e.consume(p),C):(e.consume(p),H)}function N(p){return p===r?(e.consume(p),r=void 0,q):p===null?n(p):P(p)?(l=N,te(p)):(e.consume(p),N)}function H(p){return p===null||p===34||p===39||p===60||p===61||p===96?n(p):p===47||p===62||W(p)?O(p):(e.consume(p),H)}function q(p){return p===47||p===62||W(p)?O(p):n(p)}function ee(p){return p===62?(e.consume(p),e.exit("htmlTextData"),e.exit("htmlText"),t):n(p)}function te(p){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),pe}function pe(p){return U(p)?V(e,Te,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(p):Te(p)}function Te(p){return e.enter("htmlTextData"),l(p)}}const Gr={name:"labelEnd",resolveAll:Bu,resolveTo:ku,tokenize:wu},xu={tokenize:Eu},Tu={tokenize:Du},Fu={tokenize:Cu};function Bu(e){let t=-1,n=[];for(;++t<e.length;){let i=e[t][1];if(n.push(e[t]),i.type==="labelImage"||i.type==="labelLink"||i.type==="labelEnd"){let r=i.type==="labelImage"?4:2;i.type="data",t+=r}}return e.length!==n.length&&we(e,0,e.length,n),e}function ku(e,t){let n=e.length,i=0,r,o,l,a;for(;n--;)if(r=e[n][1],o){if(r.type==="link"||r.type==="labelLink"&&r._inactive)break;e[n][0]==="enter"&&r.type==="labelLink"&&(r._inactive=!0)}else if(l){if(e[n][0]==="enter"&&(r.type==="labelImage"||r.type==="labelLink")&&!r._balanced&&(o=n,r.type!=="labelLink")){i=2;break}}else r.type==="labelEnd"&&(l=n);let s={type:e[o][1].type==="labelLink"?"link":"image",start:{...e[o][1].start},end:{...e[e.length-1][1].end}},c={type:"label",start:{...e[o][1].start},end:{...e[l][1].end}},d={type:"labelText",start:{...e[o+i+2][1].end},end:{...e[l-2][1].start}};return a=[["enter",s,t],["enter",c,t]],a=Ee(a,e.slice(o+1,o+i+3)),a=Ee(a,[["enter",d,t]]),a=Ee(a,ui(t.parser.constructs.insideSpan.null,e.slice(o+i+4,l-3),t)),a=Ee(a,[["exit",d,t],e[l-2],e[l-1],["exit",c,t]]),a=Ee(a,e.slice(l+1)),a=Ee(a,[["exit",s,t]]),we(e,o,e.length,a),e}function wu(e,t,n){let i=this,r=i.events.length,o,l;for(;r--;)if((i.events[r][1].type==="labelImage"||i.events[r][1].type==="labelLink")&&!i.events[r][1]._balanced){o=i.events[r][1];break}return a;function a(m){return o?o._inactive?h(m):(l=i.parser.defined.includes(Ie(i.sliceSerialize({start:o.end,end:i.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(m),e.exit("labelMarker"),e.exit("labelEnd"),s):n(m)}function s(m){return m===40?e.attempt(xu,d,l?d:h)(m):m===91?e.attempt(Tu,d,l?c:h)(m):l?d(m):h(m)}function c(m){return e.attempt(Fu,d,h)(m)}function d(m){return t(m)}function h(m){return o._balanced=!0,n(m)}}function Eu(e,t,n){return i;function i(h){return e.enter("resource"),e.enter("resourceMarker"),e.consume(h),e.exit("resourceMarker"),r}function r(h){return W(h)?hn(e,o)(h):o(h)}function o(h){return h===41?d(h):Fa(e,l,a,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(h)}function l(h){return W(h)?hn(e,s)(h):d(h)}function a(h){return n(h)}function s(h){return h===34||h===39||h===40?ka(e,c,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(h):d(h)}function c(h){return W(h)?hn(e,d)(h):d(h)}function d(h){return h===41?(e.enter("resourceMarker"),e.consume(h),e.exit("resourceMarker"),e.exit("resource"),t):n(h)}}function Du(e,t,n){let i=this;return r;function r(a){return Ba.call(i,e,o,l,"reference","referenceMarker","referenceString")(a)}function o(a){return i.parser.defined.includes(Ie(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)))?t(a):n(a)}function l(a){return n(a)}}function Cu(e,t,n){return i;function i(o){return e.enter("reference"),e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),r}function r(o){return o===93?(e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),e.exit("reference"),t):n(o)}}const Ru={name:"labelStartImage",resolveAll:Gr.resolveAll,tokenize:Ou};function Ou(e,t,n){let i=this;return r;function r(a){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(a),e.exit("labelImageMarker"),o}function o(a){return a===91?(e.enter("labelMarker"),e.consume(a),e.exit("labelMarker"),e.exit("labelImage"),l):n(a)}function l(a){return a===94&&"_hiddenFootnoteSupport"in i.parser.constructs?n(a):t(a)}}const Lu={name:"labelStartLink",resolveAll:Gr.resolveAll,tokenize:Su};function Su(e,t,n){let i=this;return r;function r(l){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(l),e.exit("labelMarker"),e.exit("labelLink"),o}function o(l){return l===94&&"_hiddenFootnoteSupport"in i.parser.constructs?n(l):t(l)}}const Ri={name:"lineEnding",tokenize:Nu};function Nu(e,t){return n;function n(i){return e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),V(e,t,"linePrefix")}}const jn={name:"thematicBreak",tokenize:Iu};function Iu(e,t,n){let i=0,r;return o;function o(c){return e.enter("thematicBreak"),l(c)}function l(c){return r=c,a(c)}function a(c){return c===r?(e.enter("thematicBreakSequence"),s(c)):i>=3&&(c===null||P(c))?(e.exit("thematicBreak"),t(c)):n(c)}function s(c){return c===r?(e.consume(c),i++,s):(e.exit("thematicBreakSequence"),U(c)?V(e,a,"whitespace")(c):a(c))}}const ve={continuation:{tokenize:Gu},exit:ju,name:"list",tokenize:_u},Pu={partial:!0,tokenize:qu},zu={partial:!0,tokenize:Mu};function _u(e,t,n){let i=this,r=i.events[i.events.length-1],o=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,l=0;return a;function a(u){let f=i.containerState.type||(u===42||u===43||u===45?"listUnordered":"listOrdered");if(f==="listUnordered"?!i.containerState.marker||u===i.containerState.marker:dr(u)){if(i.containerState.type||(i.containerState.type=f,e.enter(f,{_container:!0})),f==="listUnordered")return e.enter("listItemPrefix"),u===42||u===45?e.check(jn,n,c)(u):c(u);if(!i.interrupt||u===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),s(u)}return n(u)}function s(u){return dr(u)&&++l<10?(e.consume(u),s):(!i.interrupt||l<2)&&(i.containerState.marker?u===i.containerState.marker:u===41||u===46)?(e.exit("listItemValue"),c(u)):n(u)}function c(u){return e.enter("listItemMarker"),e.consume(u),e.exit("listItemMarker"),i.containerState.marker=i.containerState.marker||u,e.check(kn,i.interrupt?n:d,e.attempt(Pu,m,h))}function d(u){return i.containerState.initialBlankLine=!0,o++,m(u)}function h(u){return U(u)?(e.enter("listItemPrefixWhitespace"),e.consume(u),e.exit("listItemPrefixWhitespace"),m):n(u)}function m(u){return i.containerState.size=o+i.sliceSerialize(e.exit("listItemPrefix"),!0).length,t(u)}}function Gu(e,t,n){let i=this;return i.containerState._closeFlow=void 0,e.check(kn,r,o);function r(a){return i.containerState.furtherBlankLines=i.containerState.furtherBlankLines||i.containerState.initialBlankLine,V(e,t,"listItemIndent",i.containerState.size+1)(a)}function o(a){return i.containerState.furtherBlankLines||!U(a)?(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,l(a)):(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,e.attempt(zu,t,l)(a))}function l(a){return i.containerState._closeFlow=!0,i.interrupt=void 0,V(e,e.attempt(ve,t,n),"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(a)}}function Mu(e,t,n){let i=this;return V(e,r,"listItemIndent",i.containerState.size+1);function r(o){let l=i.events[i.events.length-1];return l&&l[1].type==="listItemIndent"&&l[2].sliceSerialize(l[1],!0).length===i.containerState.size?t(o):n(o)}}function ju(e){e.exit(this.containerState.type)}function qu(e,t,n){let i=this;return V(e,r,"listItemPrefixWhitespace",i.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(o){let l=i.events[i.events.length-1];return!U(o)&&l&&l[1].type==="listItemPrefixWhitespace"?t(o):n(o)}}const zl={name:"setextUnderline",resolveTo:Hu,tokenize:$u};function Hu(e,t){let n=e.length,i,r,o;for(;n--;)if(e[n][0]==="enter"){if(e[n][1].type==="content"){i=n;break}e[n][1].type==="paragraph"&&(r=n)}else e[n][1].type==="content"&&e.splice(n,1),!o&&e[n][1].type==="definition"&&(o=n);let l={type:"setextHeading",start:{...e[i][1].start},end:{...e[e.length-1][1].end}};return e[r][1].type="setextHeadingText",o?(e.splice(r,0,["enter",l,t]),e.splice(o+1,0,["exit",e[i][1],t]),e[i][1].end={...e[o][1].end}):e[i][1]=l,e.push(["exit",l,t]),e}function $u(e,t,n){let i=this,r;return o;function o(c){let d=i.events.length,h;for(;d--;)if(i.events[d][1].type!=="lineEnding"&&i.events[d][1].type!=="linePrefix"&&i.events[d][1].type!=="content"){h=i.events[d][1].type==="paragraph";break}return!i.parser.lazy[i.now().line]&&(i.interrupt||h)?(e.enter("setextHeadingLine"),r=c,l(c)):n(c)}function l(c){return e.enter("setextHeadingLineSequence"),a(c)}function a(c){return c===r?(e.consume(c),a):(e.exit("setextHeadingLineSequence"),U(c)?V(e,s,"lineSuffix")(c):s(c))}function s(c){return c===null||P(c)?(e.exit("setextHeadingLine"),t(c)):n(c)}}const Uu={tokenize:Zu};function Zu(e){let t=e.attempt(this.parser.constructs.contentInitial,i,r),n;return t;function i(a){if(a===null){e.consume(a);return}return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),V(e,t,"linePrefix")}function r(a){return e.enter("paragraph"),o(a)}function o(a){let s=e.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=s),n=s,l(a)}function l(a){if(a===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(a);return}return P(a)?(e.consume(a),e.exit("chunkText"),o):(e.consume(a),l)}}const Vu={tokenize:Qu},_l={tokenize:Ku};function Qu(e){let t=this,n=[],i=0,r,o,l;return a;function a(B){if(i<n.length){let L=n[i];return t.containerState=L[1],e.attempt(L[0].continuation,s,c)(B)}return c(B)}function s(B){if(i++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,r&&D();let L=t.events.length,I=L,F;for(;I--;)if(t.events[I][0]==="exit"&&t.events[I][1].type==="chunkFlow"){F=t.events[I][1].end;break}y(i);let S=L;for(;S<t.events.length;)t.events[S][1].end={...F},S++;return we(t.events,I+1,0,t.events.slice(L)),t.events.length=S,c(B)}return a(B)}function c(B){if(i===n.length){if(!r)return m(B);if(r.currentConstruct&&r.currentConstruct.concrete)return f(B);t.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(_l,d,h)(B)}function d(B){return r&&D(),y(i),m(B)}function h(B){return t.parser.lazy[t.now().line]=i!==n.length,l=t.now().offset,f(B)}function m(B){return t.containerState={},e.attempt(_l,u,f)(B)}function u(B){return i++,n.push([t.currentConstruct,t.containerState]),m(B)}function f(B){if(B===null){r&&D(),y(0),e.consume(B);return}return r||=t.parser.flow(t.now()),e.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:o}),A(B)}function A(B){if(B===null){b(e.exit("chunkFlow"),!0),y(0),e.consume(B);return}return P(B)?(e.consume(B),b(e.exit("chunkFlow")),i=0,t.interrupt=void 0,a):(e.consume(B),A)}function b(B,L){let I=t.sliceStream(B);if(L&&I.push(null),B.previous=o,o&&(o.next=B),o=B,r.defineSkip(B.start),r.write(I),t.parser.lazy[B.start.line]){let F=r.events.length;for(;F--;)if(r.events[F][1].start.offset<l&&(!r.events[F][1].end||r.events[F][1].end.offset>l))return;let S=t.events.length,x=S,O,v;for(;x--;)if(t.events[x][0]==="exit"&&t.events[x][1].type==="chunkFlow"){if(O){v=t.events[x][1].end;break}O=!0}for(y(i),F=S;F<t.events.length;)t.events[F][1].end={...v},F++;we(t.events,x+1,0,t.events.slice(S)),t.events.length=F}}function y(B){let L=n.length;for(;L-- >B;){let I=n[L];t.containerState=I[1],I[0].exit.call(t,e)}n.length=B}function D(){r.write([null]),o=void 0,r=void 0,t.containerState._closeFlow=void 0}}function Ku(e,t,n){return V(e,e.attempt(this.parser.constructs.document,t,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}const Wu={tokenize:Xu};function Xu(e){let t=this,n=e.attempt(kn,i,e.attempt(this.parser.constructs.flowInitial,r,V(e,e.attempt(this.parser.constructs.flow,r,e.attempt(Xm,r)),"linePrefix")));return n;function i(o){if(o===null){e.consume(o);return}return e.enter("lineEndingBlank"),e.consume(o),e.exit("lineEndingBlank"),t.currentConstruct=void 0,n}function r(o){if(o===null){e.consume(o);return}return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),t.currentConstruct=void 0,n}}const Yu={resolveAll:Ea()},Ju=wa("string"),ef=wa("text");function wa(e){return{resolveAll:Ea(e==="text"?tf:void 0),tokenize:t};function t(n){let i=this,r=this.parser.constructs[e],o=n.attempt(r,l,a);return l;function l(d){return c(d)?o(d):a(d)}function a(d){if(d===null){n.consume(d);return}return n.enter("data"),n.consume(d),s}function s(d){return c(d)?(n.exit("data"),o(d)):(n.consume(d),s)}function c(d){if(d===null)return!0;let h=r[d],m=-1;if(h)for(;++m<h.length;){let u=h[m];if(!u.previous||u.previous.call(i,i.previous))return!0}return!1}}}function Ea(e){return t;function t(n,i){let r=-1,o;for(;++r<=n.length;)o===void 0?n[r]&&n[r][1].type==="data"&&(o=r,r++):(!n[r]||n[r][1].type!=="data")&&(r!==o+2&&(n[o][1].end=n[r-1][1].end,n.splice(o+2,r-o-2),r=o+2),o=void 0);return e?e(n,i):n}}function tf(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type==="lineEnding")&&e[n-1][1].type==="data"){let i=e[n-1][1],r=t.sliceStream(i),o=r.length,l=-1,a=0,s;for(;o--;){let c=r[o];if(typeof c=="string"){for(l=c.length;c.charCodeAt(l-1)===32;)a++,l--;if(l)break;l=-1}else if(c===-2)s=!0,a++;else if(c!==-1){o++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(a=0),a){let c={type:n===e.length||s||a<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:o?l:i.start._bufferIndex+l,_index:i.start._index+o,line:i.end.line,column:i.end.column-a,offset:i.end.offset-a},end:{...i.end}};i.end={...c.start},i.start.offset===i.end.offset?Object.assign(i,c):(e.splice(n,0,["enter",c,t],["exit",c,t]),n+=2)}n++}return e}var nf=Fn({attentionMarkers:()=>hf,contentInitial:()=>lf,disable:()=>mf,document:()=>rf,flow:()=>af,flowInitial:()=>of,insideSpan:()=>df,string:()=>sf,text:()=>cf});const rf={42:ve,43:ve,45:ve,48:ve,49:ve,50:ve,51:ve,52:ve,53:ve,54:ve,55:ve,56:ve,57:ve,62:ba},lf={91:nu},of={[-2]:Ci,[-1]:Ci,32:Ci},af={35:su,42:jn,45:[zl,jn],60:mu,61:zl,95:jn,96:Il,126:Il},sf={38:xa,92:Aa},cf={[-5]:Ri,[-4]:Ri,[-3]:Ri,33:Ru,38:xa,42:hr,60:[Lm,bu],91:Lu,92:[ou,Aa],93:Gr,95:hr,96:Um},df={null:[hr,Yu]},hf={null:[42,95]},mf={null:[]};function uf(e,t,n){let i={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0},r={},o=[],l=[],a=[],s={attempt:S(I),check:S(F),consume:D,enter:B,exit:L,interrupt:S(F,{interrupt:!0})},c={code:null,containerState:{},defineSkip:A,events:[],now:f,parser:e,previous:null,sliceSerialize:m,sliceStream:u,write:h},d=t.tokenize.call(c,s);return t.resolveAll&&o.push(t),c;function h(k){return l=Ee(l,k),b(),l[l.length-1]===null?(x(t,0),c.events=ui(o,c.events,c),c.events):[]}function m(k,C){return pf(u(k),C)}function u(k){return ff(l,k)}function f(){let{_bufferIndex:k,_index:C,line:N,column:H,offset:q}=i;return{_bufferIndex:k,_index:C,line:N,column:H,offset:q}}function A(k){r[k.line]=k.column,v()}function b(){let k;for(;i._index<l.length;){let C=l[i._index];if(typeof C=="string")for(k=i._index,i._bufferIndex<0&&(i._bufferIndex=0);i._index===k&&i._bufferIndex<C.length;)y(C.charCodeAt(i._bufferIndex));else y(C)}}function y(k){d=d(k)}function D(k){P(k)?(i.line++,i.column=1,i.offset+=k===-3?2:1,v()):k!==-1&&(i.column++,i.offset++),i._bufferIndex<0?i._index++:(i._bufferIndex++,i._bufferIndex===l[i._index].length&&(i._bufferIndex=-1,i._index++)),c.previous=k}function B(k,C){let N=C||{};return N.type=k,N.start=f(),c.events.push(["enter",N,c]),a.push(N),N}function L(k){let C=a.pop();return C.end=f(),c.events.push(["exit",C,c]),C}function I(k,C){x(k,C.from)}function F(k,C){C.restore()}function S(k,C){return N;function N(H,q,ee){let te,pe,Te,p;return Array.isArray(H)?He(H):"tokenize"in H?He([H]):et(H);function et(he){return Yt;function Yt(nt){let kt=nt!==null&&he[nt],wt=nt!==null&&he.null;return He([...Array.isArray(kt)?kt:kt?[kt]:[],...Array.isArray(wt)?wt:wt?[wt]:[]])(nt)}}function He(he){return te=he,pe=0,he.length===0?ee:g(he[pe])}function g(he){return Yt;function Yt(nt){return p=O(),Te=he,he.partial||(c.currentConstruct=he),he.name&&c.parser.constructs.disable.null.includes(he.name)?dt():he.tokenize.call(C?Object.assign(Object.create(c),C):c,s,tt,dt)(nt)}}function tt(he){return k(Te,p),q}function dt(he){return p.restore(),++pe<te.length?g(te[pe]):ee}}}function x(k,C){k.resolveAll&&!o.includes(k)&&o.push(k),k.resolve&&we(c.events,C,c.events.length-C,k.resolve(c.events.slice(C),c)),k.resolveTo&&(c.events=k.resolveTo(c.events,c))}function O(){let k=f(),C=c.previous,N=c.currentConstruct,H=c.events.length,q=Array.from(a);return{from:H,restore:ee};function ee(){i=k,c.previous=C,c.currentConstruct=N,c.events.length=H,a=q,v()}}function v(){i.line in r&&i.column<2&&(i.column=r[i.line],i.offset+=r[i.line]-1)}}function ff(e,t){let n=t.start._index,i=t.start._bufferIndex,r=t.end._index,o=t.end._bufferIndex,l;if(n===r)l=[e[n].slice(i,o)];else{if(l=e.slice(n,r),i>-1){let a=l[0];typeof a=="string"?l[0]=a.slice(i):l.shift()}o>0&&l.push(e[r].slice(0,o))}return l}function pf(e,t){let n=-1,i=[],r;for(;++n<e.length;){let o=e[n],l;if(typeof o=="string")l=o;else switch(o){case-5:l="\r";break;case-4:l=`
`;break;case-3:l=`\r
`;break;case-2:l=t?" ":"	";break;case-1:if(!t&&r)continue;l=" ";break;default:l=String.fromCharCode(o)}r=o===-2,i.push(l)}return i.join("")}function gf(e){let t={constructs:va([nf,...(e||{}).extensions||[]]),content:n(Uu),defined:[],document:n(Vu),flow:n(Wu),lazy:{},string:n(Ju),text:n(ef)};return t;function n(i){return r;function r(o){return uf(t,i,o)}}}function yf(e){for(;!Ta(e););return e}const Gl=/[\0\t\n\r]/g;function vf(){let e=1,t="",n=!0,i;return r;function r(o,l,a){let s=[],c,d,h,m,u;for(o=t+(typeof o=="string"?o.toString():new TextDecoder(l||void 0).decode(o)),h=0,t="",n&&=(o.charCodeAt(0)===65279&&h++,void 0);h<o.length;){if(Gl.lastIndex=h,c=Gl.exec(o),m=c&&c.index!==void 0?c.index:o.length,u=o.charCodeAt(m),!c){t=o.slice(h);break}if(u===10&&h===m&&i)s.push(-3),i=void 0;else switch(i&&=(s.push(-5),void 0),h<m&&(s.push(o.slice(h,m)),e+=m-h),u){case 0:s.push(65533),e++;break;case 9:for(d=Math.ceil(e/4)*4,s.push(-2);e++<d;)s.push(-1);break;case 10:s.push(-4),e=1;break;default:i=!0,e=1}h=m+1}return a&&(i&&s.push(-5),t&&s.push(t),s.push(null)),s}}function mn(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Ml(e.position):"start"in e||"end"in e?Ml(e):"line"in e||"column"in e?mr(e):""}function mr(e){return jl(e&&e.line)+":"+jl(e&&e.column)}function Ml(e){return mr(e&&e.start)+"-"+mr(e&&e.end)}function jl(e){return e&&typeof e=="number"?e:1}const Da={}.hasOwnProperty;function Ca(e,t,n){return typeof t!="string"&&(n=t,t=void 0),bf(n)(yf(gf(n).document().write(vf()(e,t,!0))))}function bf(e){let t={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:o(al),autolinkProtocol:O,autolinkEmail:O,atxHeading:o(rl),blockQuote:o(wt),characterEscape:O,characterReference:O,codeFenced:o(il),codeFencedFenceInfo:l,codeFencedFenceMeta:l,codeIndented:o(il,l),codeText:o(Js,l),codeTextData:O,data:O,codeFlowValue:O,definition:o(ec),definitionDestinationString:l,definitionLabelString:l,definitionTitleString:l,emphasis:o(tc),hardBreakEscape:o(ll),hardBreakTrailing:o(ll),htmlFlow:o(ol,l),htmlFlowData:O,htmlText:o(ol,l),htmlTextData:O,image:o(nc),label:l,link:o(al),listItem:o(ic),listItemValue:m,listOrdered:o(sl,h),listUnordered:o(sl),paragraph:o(rc),reference:g,referenceString:l,resourceDestinationString:l,resourceTitleString:l,setextHeading:o(rl),strong:o(lc),thematicBreak:o(ac)},exit:{atxHeading:s(),atxHeadingSequence:I,autolink:s(),autolinkEmail:kt,autolinkProtocol:nt,blockQuote:s(),characterEscapeValue:v,characterReferenceMarkerHexadecimal:dt,characterReferenceMarkerNumeric:dt,characterReferenceValue:he,characterReference:Yt,codeFenced:s(b),codeFencedFence:A,codeFencedFenceInfo:u,codeFencedFenceMeta:f,codeFlowValue:v,codeIndented:s(y),codeText:s(q),codeTextData:v,data:v,definition:s(),definitionDestinationString:L,definitionLabelString:D,definitionTitleString:B,emphasis:s(),hardBreakEscape:s(C),hardBreakTrailing:s(C),htmlFlow:s(N),htmlFlowData:v,htmlText:s(H),htmlTextData:v,image:s(te),label:Te,labelText:pe,lineEnding:k,link:s(ee),listItem:s(),listOrdered:s(),listUnordered:s(),paragraph:s(),referenceString:tt,resourceDestinationString:p,resourceTitleString:et,resource:He,setextHeading:s(x),setextHeadingLineSequence:S,setextHeadingText:F,strong:s(),thematicBreak:s()}};Ra(t,(e||{}).mdastExtensions||[]);let n={};return i;function i(T){let R={type:"root",children:[]},z={stack:[R],tokenStack:[],config:t,enter:a,exit:c,buffer:l,resume:d,data:n},Y=[],J=-1;for(;++J<T.length;)(T[J][1].type==="listOrdered"||T[J][1].type==="listUnordered")&&(T[J][0]==="enter"?Y.push(J):J=r(T,Y.pop(),J));for(J=-1;++J<T.length;){let it=t[T[J][0]];Da.call(it,T[J][1].type)&&it[T[J][1].type].call(Object.assign({sliceSerialize:T[J][2].sliceSerialize},z),T[J][1])}if(z.tokenStack.length>0){let it=z.tokenStack[z.tokenStack.length-1];(it[1]||ql).call(z,void 0,it[0])}for(R.position={start:lt(T.length>0?T[0][1].start:{line:1,column:1,offset:0}),end:lt(T.length>0?T[T.length-2][1].end:{line:1,column:1,offset:0})},J=-1;++J<t.transforms.length;)R=t.transforms[J](R)||R;return R}function r(T,R,z){let Y=R-1,J=-1,it=!1,Et,$e,Jt,en;for(;++Y<=z;){let Fe=T[Y];switch(Fe[1].type){case"listUnordered":case"listOrdered":case"blockQuote":Fe[0]==="enter"?J++:J--,en=void 0;break;case"lineEndingBlank":Fe[0]==="enter"&&(Et&&!en&&!J&&!Jt&&(Jt=Y),en=void 0);break;case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:en=void 0}if(!J&&Fe[0]==="enter"&&Fe[1].type==="listItemPrefix"||J===-1&&Fe[0]==="exit"&&(Fe[1].type==="listUnordered"||Fe[1].type==="listOrdered")){if(Et){let Dt=Y;for($e=void 0;Dt--;){let Ue=T[Dt];if(Ue[1].type==="lineEnding"||Ue[1].type==="lineEndingBlank"){if(Ue[0]==="exit")continue;$e&&(T[$e][1].type="lineEndingBlank",it=!0),Ue[1].type="lineEnding",$e=Dt}else if(!(Ue[1].type==="linePrefix"||Ue[1].type==="blockQuotePrefix"||Ue[1].type==="blockQuotePrefixWhitespace"||Ue[1].type==="blockQuoteMarker"||Ue[1].type==="listItemIndent"))break}Jt&&(!$e||Jt<$e)&&(Et._spread=!0),Et.end=Object.assign({},$e?T[$e][1].start:Fe[1].end),T.splice($e||Y,0,["exit",Et,Fe[2]]),Y++,z++}if(Fe[1].type==="listItemPrefix"){let Dt={type:"listItem",_spread:!1,start:Object.assign({},Fe[1].start),end:void 0};Et=Dt,T.splice(Y,0,["enter",Dt,Fe[2]]),Y++,z++,Jt=void 0,en=!0}}}return T[R][1]._spread=it,z}function o(T,R){return z;function z(Y){a.call(this,T(Y),Y),R&&R.call(this,Y)}}function l(){this.stack.push({type:"fragment",children:[]})}function a(T,R,z){this.stack[this.stack.length-1].children.push(T),this.stack.push(T),this.tokenStack.push([R,z||void 0]),T.position={start:lt(R.start),end:void 0}}function s(T){return R;function R(z){T&&T.call(this,z),c.call(this,z)}}function c(T,R){let z=this.stack.pop(),Y=this.tokenStack.pop();if(Y)Y[0].type!==T.type&&(R?R.call(this,T,Y[0]):(Y[1]||ql).call(this,T,Y[0]));else throw Error("Cannot close `"+T.type+"` ("+mn({start:T.start,end:T.end})+"): it’s not open");z.position.end=lt(T.end)}function d(){return mi(this.stack.pop())}function h(){this.data.expectingFirstListItemValue=!0}function m(T){if(this.data.expectingFirstListItemValue){let R=this.stack[this.stack.length-2];R.start=Number.parseInt(this.sliceSerialize(T),10),this.data.expectingFirstListItemValue=void 0}}function u(){let T=this.resume(),R=this.stack[this.stack.length-1];R.lang=T}function f(){let T=this.resume(),R=this.stack[this.stack.length-1];R.meta=T}function A(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function b(){let T=this.resume(),R=this.stack[this.stack.length-1];R.value=T.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function y(){let T=this.resume(),R=this.stack[this.stack.length-1];R.value=T.replace(/(\r?\n|\r)$/g,"")}function D(T){let R=this.resume(),z=this.stack[this.stack.length-1];z.label=R,z.identifier=Ie(this.sliceSerialize(T)).toLowerCase()}function B(){let T=this.resume(),R=this.stack[this.stack.length-1];R.title=T}function L(){let T=this.resume(),R=this.stack[this.stack.length-1];R.url=T}function I(T){let R=this.stack[this.stack.length-1];R.depth||=this.sliceSerialize(T).length}function F(){this.data.setextHeadingSlurpLineEnding=!0}function S(T){let R=this.stack[this.stack.length-1];R.depth=this.sliceSerialize(T).codePointAt(0)===61?1:2}function x(){this.data.setextHeadingSlurpLineEnding=void 0}function O(T){let R=this.stack[this.stack.length-1].children,z=R[R.length-1];(!z||z.type!=="text")&&(z=oc(),z.position={start:lt(T.start),end:void 0},R.push(z)),this.stack.push(z)}function v(T){let R=this.stack.pop();R.value+=this.sliceSerialize(T),R.position.end=lt(T.end)}function k(T){let R=this.stack[this.stack.length-1];if(this.data.atHardBreak){let z=R.children[R.children.length-1];z.position.end=lt(T.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(R.type)&&(O.call(this,T),v.call(this,T))}function C(){this.data.atHardBreak=!0}function N(){let T=this.resume(),R=this.stack[this.stack.length-1];R.value=T}function H(){let T=this.resume(),R=this.stack[this.stack.length-1];R.value=T}function q(){let T=this.resume(),R=this.stack[this.stack.length-1];R.value=T}function ee(){let T=this.stack[this.stack.length-1];if(this.data.inReference){let R=this.data.referenceType||"shortcut";T.type+="Reference",T.referenceType=R,delete T.url,delete T.title}else delete T.identifier,delete T.label;this.data.referenceType=void 0}function te(){let T=this.stack[this.stack.length-1];if(this.data.inReference){let R=this.data.referenceType||"shortcut";T.type+="Reference",T.referenceType=R,delete T.url,delete T.title}else delete T.identifier,delete T.label;this.data.referenceType=void 0}function pe(T){let R=this.sliceSerialize(T),z=this.stack[this.stack.length-2];z.label=wm(R),z.identifier=Ie(R).toLowerCase()}function Te(){let T=this.stack[this.stack.length-1],R=this.resume(),z=this.stack[this.stack.length-1];this.data.inReference=!0,z.type==="link"?z.children=T.children:z.alt=R}function p(){let T=this.resume(),R=this.stack[this.stack.length-1];R.url=T}function et(){let T=this.resume(),R=this.stack[this.stack.length-1];R.title=T}function He(){this.data.inReference=void 0}function g(){this.data.referenceType="collapsed"}function tt(T){let R=this.resume(),z=this.stack[this.stack.length-1];z.label=R,z.identifier=Ie(this.sliceSerialize(T)).toLowerCase(),this.data.referenceType="full"}function dt(T){this.data.characterReferenceType=T.type}function he(T){let R=this.sliceSerialize(T),z=this.data.characterReferenceType,Y;z?(Y=ya(R,z==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):Y=_r(R);let J=this.stack[this.stack.length-1];J.value+=Y}function Yt(T){let R=this.stack.pop();R.position.end=lt(T.end)}function nt(T){v.call(this,T);let R=this.stack[this.stack.length-1];R.url=this.sliceSerialize(T)}function kt(T){v.call(this,T);let R=this.stack[this.stack.length-1];R.url="mailto:"+this.sliceSerialize(T)}function wt(){return{type:"blockquote",children:[]}}function il(){return{type:"code",lang:null,meta:null,value:""}}function Js(){return{type:"inlineCode",value:""}}function ec(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function tc(){return{type:"emphasis",children:[]}}function rl(){return{type:"heading",depth:0,children:[]}}function ll(){return{type:"break"}}function ol(){return{type:"html",value:""}}function nc(){return{type:"image",title:null,url:"",alt:null}}function al(){return{type:"link",title:null,url:"",children:[]}}function sl(T){return{type:"list",ordered:T.type==="listOrdered",start:null,spread:T._spread,children:[]}}function ic(T){return{type:"listItem",spread:T._spread,checked:null,children:[]}}function rc(){return{type:"paragraph",children:[]}}function lc(){return{type:"strong",children:[]}}function oc(){return{type:"text",value:""}}function ac(){return{type:"thematicBreak"}}}function lt(e){return{line:e.line,column:e.column,offset:e.offset}}function Ra(e,t){let n=-1;for(;++n<t.length;){let i=t[n];Array.isArray(i)?Ra(e,i):Af(e,i)}}function Af(e,t){let n;for(n in t)if(Da.call(t,n))switch(n){case"canContainEols":{let i=t[n];i&&e[n].push(...i);break}case"transforms":{let i=t[n];i&&e[n].push(...i);break}case"enter":case"exit":{let i=t[n];i&&Object.assign(e[n],i);break}}}function ql(e,t){throw Error(e?"Cannot close `"+e.type+"` ("+mn({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+mn({start:t.start,end:t.end})+") is open":"Cannot close document, a token (`"+t.type+"`, "+mn({start:t.start,end:t.end})+") is still open")}function xf(e){if(typeof e!="string")throw TypeError("Expected a string");return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")}const fi=(function(e){if(e==null)return kf;if(typeof e=="function")return pi(e);if(typeof e=="object")return Array.isArray(e)?Tf(e):Ff(e);if(typeof e=="string")return Bf(e);throw Error("Expected function, string, or object as test")});function Tf(e){let t=[],n=-1;for(;++n<e.length;)t[n]=fi(e[n]);return pi(i);function i(...r){let o=-1;for(;++o<t.length;)if(t[o].apply(this,r))return!0;return!1}}function Ff(e){let t=e;return pi(n);function n(i){let r=i,o;for(o in e)if(r[o]!==t[o])return!1;return!0}}function Bf(e){return pi(t);function t(n){return n&&n.type===e}}function pi(e){return t;function t(n,i,r){return!!(wf(n)&&e.call(this,n,typeof i=="number"?i:void 0,r||void 0))}}function kf(){return!0}function wf(e){return typeof e=="object"&&!!e&&"type"in e}const Oa=[],Ef=!1;function La(e,t,n,i){let r;typeof t=="function"&&typeof n!="function"?(i=n,n=t):r=t;let o=fi(r),l=i?-1:1;a(e,void 0,[])();function a(s,c,d){let h=s&&typeof s=="object"?s:{};if(typeof h.type=="string"){let u=typeof h.tagName=="string"?h.tagName:typeof h.name=="string"?h.name:void 0;Object.defineProperty(m,"name",{value:"node ("+(s.type+(u?"<"+u+">":""))+")"})}return m;function m(){let u=Oa,f,A,b;if((!t||o(s,c,d[d.length-1]||void 0))&&(u=Df(n(s,d)),u[0]===!1))return u;if("children"in s&&s.children){let y=s;if(y.children&&u[0]!=="skip")for(A=(i?y.children.length:-1)+l,b=d.concat(y);A>-1&&A<y.children.length;){let D=y.children[A];if(f=a(D,A,b)(),f[0]===!1)return f;A=typeof f[1]=="number"?f[1]:A+l}}return u}}}function Df(e){return Array.isArray(e)?e:typeof e=="number"?[!0,e]:e==null?Oa:[e]}function Cf(e,t,n){let i=fi((n||{}).ignore||[]),r=Rf(t),o=-1;for(;++o<r.length;)La(e,"text",l);function l(s,c){let d=-1,h;for(;++d<c.length;){let m=c[d],u=h?h.children:void 0;if(i(m,u?u.indexOf(m):void 0,h))return;h=m}if(h)return a(s,c)}function a(s,c){let d=c[c.length-1],h=r[o][0],m=r[o][1],u=0,f=d.children.indexOf(s),A=!1,b=[];h.lastIndex=0;let y=h.exec(s.value);for(;y;){let D=y.index,B={index:y.index,input:y.input,stack:[...c,s]},L=m(...y,B);if(typeof L=="string"&&(L=L.length>0?{type:"text",value:L}:void 0),L===!1?h.lastIndex=D+1:(u!==D&&b.push({type:"text",value:s.value.slice(u,D)}),Array.isArray(L)?b.push(...L):L&&b.push(L),u=D+y[0].length,A=!0),!h.global)break;y=h.exec(s.value)}return A?(u<s.value.length&&b.push({type:"text",value:s.value.slice(u)}),d.children.splice(f,1,...b)):b=[s],f+b.length}}function Rf(e){let t=[];if(!Array.isArray(e))throw TypeError("Expected find and replace tuple or list of tuples");let n=!e[0]||Array.isArray(e[0])?e:[e],i=-1;for(;++i<n.length;){let r=n[i];t.push([Of(r[0]),Lf(r[1])])}return t}function Of(e){return typeof e=="string"?new RegExp(xf(e),"g"):e}function Lf(e){return typeof e=="function"?e:function(){return e}}function Sf(e){return e.length}function Nf(e,t){let n=t||{},i=(n.align||[]).concat(),r=n.stringLength||Sf,o=[],l=[],a=[],s=[],c=0,d=-1;for(;++d<e.length;){let A=[],b=[],y=-1;for(e[d].length>c&&(c=e[d].length);++y<e[d].length;){let D=If(e[d][y]);if(n.alignDelimiters!==!1){let B=r(D);b[y]=B,(s[y]===void 0||B>s[y])&&(s[y]=B)}A.push(D)}l[d]=A,a[d]=b}let h=-1;if(typeof i=="object"&&"length"in i)for(;++h<c;)o[h]=Hl(i[h]);else{let A=Hl(i);for(;++h<c;)o[h]=A}h=-1;let m=[],u=[];for(;++h<c;){let A=o[h],b="",y="";A===99?(b=":",y=":"):A===108?b=":":A===114&&(y=":");let D=n.alignDelimiters===!1?1:Math.max(1,s[h]-b.length-y.length),B=b+"-".repeat(D)+y;n.alignDelimiters!==!1&&(D=b.length+D+y.length,D>s[h]&&(s[h]=D),u[h]=D),m[h]=B}l.splice(1,0,m),a.splice(1,0,u),d=-1;let f=[];for(;++d<l.length;){let A=l[d],b=a[d];h=-1;let y=[];for(;++h<c;){let D=A[h]||"",B="",L="";if(n.alignDelimiters!==!1){let I=s[h]-(b[h]||0),F=o[h];F===114?B=" ".repeat(I):F===99?I%2?(B=" ".repeat(I/2+.5),L=" ".repeat(I/2-.5)):(B=" ".repeat(I/2),L=B):L=" ".repeat(I)}n.delimiterStart!==!1&&!h&&y.push("|"),n.padding!==!1&&!(n.alignDelimiters===!1&&D==="")&&(n.delimiterStart!==!1||h)&&y.push(" "),n.alignDelimiters!==!1&&y.push(B),y.push(D),n.alignDelimiters!==!1&&y.push(L),n.padding!==!1&&y.push(" "),(n.delimiterEnd!==!1||h!==c-1)&&y.push("|")}f.push(n.delimiterEnd===!1?y.join("").replace(/ +$/,""):y.join(""))}return f.join(`
`)}function If(e){return e==null?"":String(e)}function Hl(e){let t=typeof e=="string"?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function Pf(e,t){let n=String(e),i=n.indexOf(t),r=i,o=0,l=0;if(typeof t!="string")throw TypeError("Expected substring");for(;i!==-1;)i===r?++o>l&&(l=o):o=1,r=i+t.length,i=n.indexOf(t,r);return l}const Oi="phrasing",Li=["autolink","link","image","label"];function zf(){return{transforms:[$f],enter:{literalAutolink:Gf,literalAutolinkEmail:Si,literalAutolinkHttp:Si,literalAutolinkWww:Si},exit:{literalAutolink:Hf,literalAutolinkEmail:qf,literalAutolinkHttp:Mf,literalAutolinkWww:jf}}}function _f(){return{unsafe:[{character:"@",before:"[+\\-.\\w]",after:"[\\-.\\w]",inConstruct:Oi,notInConstruct:Li},{character:".",before:"[Ww]",after:"[\\-.\\w]",inConstruct:Oi,notInConstruct:Li},{character:":",before:"[ps]",after:"\\/",inConstruct:Oi,notInConstruct:Li}]}}function Gf(e){this.enter({type:"link",title:null,url:"",children:[]},e)}function Si(e){this.config.enter.autolinkProtocol.call(this,e)}function Mf(e){this.config.exit.autolinkProtocol.call(this,e)}function jf(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.type,t.url="http://"+this.sliceSerialize(e)}function qf(e){this.config.exit.autolinkEmail.call(this,e)}function Hf(e){this.exit(e)}function $f(e){Cf(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,Uf],[new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)","gu"),Zf]],{ignore:["link","linkReference"]})}function Uf(e,t,n,i,r){let o="";if(!Sa(r)||(/^w/i.test(t)&&(n=t+n,t="",o="http://"),!Vf(n)))return!1;let l=Qf(n+i);if(!l[0])return!1;let a={type:"link",title:null,url:o+t+l[0],children:[{type:"text",value:t+l[0]}]};return l[1]?[a,{type:"text",value:l[1]}]:a}function Zf(e,t,n,i){return!Sa(i,!0)||/[-\d_]$/.test(n)?!1:{type:"link",title:null,url:"mailto:"+t+"@"+n,children:[{type:"text",value:t+"@"+n}]}}function Vf(e){let t=e.split(".");return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function Qf(e){let t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],i=n.indexOf(")"),r=Jn(e,"("),o=Jn(e,")");for(;i!==-1&&r>o;)e+=n.slice(0,i+1),n=n.slice(i+1),i=n.indexOf(")"),o++;return[e,n]}function Sa(e,t){let n=e.input.charCodeAt(e.index-1);return(e.index===0||xt(n)||hi(n))&&(!t||n!==47)}Na.peek=ip;function Kf(){this.buffer()}function Wf(e){this.enter({type:"footnoteReference",identifier:"",label:""},e)}function Xf(){this.buffer()}function Yf(e){this.enter({type:"footnoteDefinition",identifier:"",label:"",children:[]},e)}function Jf(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=Ie(this.sliceSerialize(e)).toLowerCase(),n.label=t}function ep(e){this.exit(e)}function tp(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=Ie(this.sliceSerialize(e)).toLowerCase(),n.label=t}function np(e){this.exit(e)}function ip(){return"["}function Na(e,t,n,i){let r=n.createTracker(i),o=r.move("[^"),l=n.enter("footnoteReference"),a=n.enter("reference");return o+=r.move(n.safe(n.associationId(e),{after:"]",before:o})),a(),l(),o+=r.move("]"),o}function rp(){return{enter:{gfmFootnoteCallString:Kf,gfmFootnoteCall:Wf,gfmFootnoteDefinitionLabelString:Xf,gfmFootnoteDefinition:Yf},exit:{gfmFootnoteCallString:Jf,gfmFootnoteCall:ep,gfmFootnoteDefinitionLabelString:tp,gfmFootnoteDefinition:np}}}function lp(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:Na},unsafe:[{character:"[",inConstruct:["label","phrasing","reference"]}]};function n(i,r,o,l){let a=o.createTracker(l),s=a.move("[^"),c=o.enter("footnoteDefinition"),d=o.enter("label");return s+=a.move(o.safe(o.associationId(i),{before:s,after:"]"})),d(),s+=a.move("]:"),i.children&&i.children.length>0&&(a.shift(4),s+=a.move((t?`
`:" ")+o.indentLines(o.containerFlow(i,a.current()),t?Ia:op))),c(),s}}function op(e,t,n){return t===0?e:Ia(e,t,n)}function Ia(e,t,n){return(n?"":"    ")+e}const ap=["autolink","destinationLiteral","destinationRaw","reference","titleQuote","titleApostrophe"];Pa.peek=mp;function sp(){return{canContainEols:["delete"],enter:{strikethrough:dp},exit:{strikethrough:hp}}}function cp(){return{unsafe:[{character:"~",inConstruct:"phrasing",notInConstruct:ap}],handlers:{delete:Pa}}}function dp(e){this.enter({type:"delete",children:[]},e)}function hp(e){this.exit(e)}function Pa(e,t,n,i){let r=n.createTracker(i),o=n.enter("strikethrough"),l=r.move("~~");return l+=n.containerPhrasing(e,{...r.current(),before:l,after:"~"}),l+=r.move("~~"),o(),l}function mp(){return"~"}function up(e,t,n,i){let r=n.enter("blockquote"),o=n.createTracker(i);o.move("> "),o.shift(2);let l=n.indentLines(n.containerFlow(e,o.current()),fp);return r(),l}function fp(e,t,n){return">"+(n?"":" ")+e}function pp(e,t){return $l(e,t.inConstruct,!0)&&!$l(e,t.notInConstruct,!1)}function $l(e,t,n){if(typeof t=="string"&&(t=[t]),!t||t.length===0)return n;let i=-1;for(;++i<t.length;)if(e.includes(t[i]))return!0;return!1}function Ul(e,t,n,i){let r=-1;for(;++r<n.unsafe.length;)if(n.unsafe[r].character===`
`&&pp(n.stack,n.unsafe[r]))return/[ \t]/.test(i.before)?"":" ";return`\\
`}function gp(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function yp(e){let t=e.options.fence||"`";if(t!=="`"&&t!=="~")throw Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function vp(e,t,n,i){let r=yp(n),o=e.value||"",l=r==="`"?"GraveAccent":"Tilde";if(gp(e,n)){let h=n.enter("codeIndented"),m=n.indentLines(o,bp);return h(),m}let a=n.createTracker(i),s=r.repeat(Math.max(Pf(o,r)+1,3)),c=n.enter("codeFenced"),d=a.move(s);if(e.lang){let h=n.enter(`codeFencedLang${l}`);d+=a.move(n.safe(e.lang,{before:d,after:" ",encode:["`"],...a.current()})),h()}if(e.lang&&e.meta){let h=n.enter(`codeFencedMeta${l}`);d+=a.move(" "),d+=a.move(n.safe(e.meta,{before:d,after:`
`,encode:["`"],...a.current()})),h()}return d+=a.move(`
`),o&&(d+=a.move(o+`
`)),d+=a.move(s),c(),d}function bp(e,t,n){return(n?"":"    ")+e}function Mr(e){let t=e.options.quote||'"';if(t!=='"'&&t!=="'")throw Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function Ap(e,t,n,i){let r=Mr(n),o=r==='"'?"Quote":"Apostrophe",l=n.enter("definition"),a=n.enter("label"),s=n.createTracker(i),c=s.move("[");return c+=s.move(n.safe(n.associationId(e),{before:c,after:"]",...s.current()})),c+=s.move("]: "),a(),!e.url||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),c+=s.move("<"),c+=s.move(n.safe(e.url,{before:c,after:">",...s.current()})),c+=s.move(">")):(a=n.enter("destinationRaw"),c+=s.move(n.safe(e.url,{before:c,after:e.title?" ":`
`,...s.current()}))),a(),e.title&&(a=n.enter(`title${o}`),c+=s.move(" "+r),c+=s.move(n.safe(e.title,{before:c,after:r,...s.current()})),c+=s.move(r),a()),l(),c}function xp(e){let t=e.options.emphasis||"*";if(t!=="*"&&t!=="_")throw Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function gn(e){return"&#x"+e.toString(16).toUpperCase()+";"}function ti(e,t,n){let i=jt(e),r=jt(t);return i===void 0?r===void 0?n==="_"?{inside:!0,outside:!0}:{inside:!1,outside:!1}:r===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:i===1?r===void 0?{inside:!1,outside:!1}:r===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:r===void 0?{inside:!1,outside:!1}:r===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}za.peek=Tp;function za(e,t,n,i){let r=xp(n),o=n.enter("emphasis"),l=n.createTracker(i),a=l.move(r),s=l.move(n.containerPhrasing(e,{after:r,before:a,...l.current()})),c=s.charCodeAt(0),d=ti(i.before.charCodeAt(i.before.length-1),c,r);d.inside&&(s=gn(c)+s.slice(1));let h=s.charCodeAt(s.length-1),m=ti(i.after.charCodeAt(0),h,r);m.inside&&(s=s.slice(0,-1)+gn(h));let u=l.move(r);return o(),n.attentionEncodeSurroundingInfo={after:m.outside,before:d.outside},a+s+u}function Tp(e,t,n){return n.options.emphasis||"*"}function jr(e,t,n,i){let r,o,l;typeof t=="function"&&typeof n!="function"?(o=void 0,l=t,r=n):(o=t,l=n,r=i),La(e,o,a,r);function a(s,c){let d=c[c.length-1],h=d?d.children.indexOf(s):void 0;return l(s,h,d)}}function Fp(e,t){let n=!1;return jr(e,function(i){if("value"in i&&/\r?\n|\r/.test(i.value)||i.type==="break")return n=!0,Ef}),!!((!e.depth||e.depth<3)&&mi(e)&&(t.options.setext||n))}function Bp(e,t,n,i){let r=Math.max(Math.min(6,e.depth||1),1),o=n.createTracker(i);if(Fp(e,n)){let d=n.enter("headingSetext"),h=n.enter("phrasing"),m=n.containerPhrasing(e,{...o.current(),before:`
`,after:`
`});return h(),d(),m+`
`+(r===1?"=":"-").repeat(m.length-(Math.max(m.lastIndexOf("\r"),m.lastIndexOf(`
`))+1))}let l="#".repeat(r),a=n.enter("headingAtx"),s=n.enter("phrasing");o.move(l+" ");let c=n.containerPhrasing(e,{before:"# ",after:`
`,...o.current()});return/^[\t ]/.test(c)&&(c=gn(c.charCodeAt(0))+c.slice(1)),c=c?l+" "+c:l,n.options.closeAtx&&(c+=" "+l),s(),a(),c}_a.peek=kp;function _a(e){return e.value||""}function kp(){return"<"}Ga.peek=wp;function Ga(e,t,n,i){let r=Mr(n),o=r==='"'?"Quote":"Apostrophe",l=n.enter("image"),a=n.enter("label"),s=n.createTracker(i),c=s.move("![");return c+=s.move(n.safe(e.alt,{before:c,after:"]",...s.current()})),c+=s.move("]("),a(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(a=n.enter("destinationLiteral"),c+=s.move("<"),c+=s.move(n.safe(e.url,{before:c,after:">",...s.current()})),c+=s.move(">")):(a=n.enter("destinationRaw"),c+=s.move(n.safe(e.url,{before:c,after:e.title?" ":")",...s.current()}))),a(),e.title&&(a=n.enter(`title${o}`),c+=s.move(" "+r),c+=s.move(n.safe(e.title,{before:c,after:r,...s.current()})),c+=s.move(r),a()),c+=s.move(")"),l(),c}function wp(){return"!"}Ma.peek=Ep;function Ma(e,t,n,i){let r=e.referenceType,o=n.enter("imageReference"),l=n.enter("label"),a=n.createTracker(i),s=a.move("!["),c=n.safe(e.alt,{before:s,after:"]",...a.current()});s+=a.move(c+"]["),l();let d=n.stack;n.stack=[],l=n.enter("reference");let h=n.safe(n.associationId(e),{before:s,after:"]",...a.current()});return l(),n.stack=d,o(),r==="full"||!c||c!==h?s+=a.move(h+"]"):r==="shortcut"?s=s.slice(0,-1):s+=a.move("]"),s}function Ep(){return"!"}ja.peek=Dp;function ja(e,t,n){let i=e.value||"",r="`",o=-1;for(;RegExp("(^|[^`])"+r+"([^`]|$)").test(i);)r+="`";for(/[^ \r\n]/.test(i)&&(/^[ \r\n]/.test(i)&&/[ \r\n]$/.test(i)||/^`|`$/.test(i))&&(i=" "+i+" ");++o<n.unsafe.length;){let l=n.unsafe[o],a=n.compilePattern(l),s;if(l.atBreak)for(;s=a.exec(i);){let c=s.index;i.charCodeAt(c)===10&&i.charCodeAt(c-1)===13&&c--,i=i.slice(0,c)+" "+i.slice(s.index+1)}}return r+i+r}function Dp(){return"`"}function qa(e,t){let n=mi(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type==="text"&&(n===e.url||"mailto:"+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}Ha.peek=Cp;function Ha(e,t,n,i){let r=Mr(n),o=r==='"'?"Quote":"Apostrophe",l=n.createTracker(i),a,s;if(qa(e,n)){let d=n.stack;n.stack=[],a=n.enter("autolink");let h=l.move("<");return h+=l.move(n.containerPhrasing(e,{before:h,after:">",...l.current()})),h+=l.move(">"),a(),n.stack=d,h}a=n.enter("link"),s=n.enter("label");let c=l.move("[");return c+=l.move(n.containerPhrasing(e,{before:c,after:"](",...l.current()})),c+=l.move("]("),s(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(s=n.enter("destinationLiteral"),c+=l.move("<"),c+=l.move(n.safe(e.url,{before:c,after:">",...l.current()})),c+=l.move(">")):(s=n.enter("destinationRaw"),c+=l.move(n.safe(e.url,{before:c,after:e.title?" ":")",...l.current()}))),s(),e.title&&(s=n.enter(`title${o}`),c+=l.move(" "+r),c+=l.move(n.safe(e.title,{before:c,after:r,...l.current()})),c+=l.move(r),s()),c+=l.move(")"),a(),c}function Cp(e,t,n){return qa(e,n)?"<":"["}$a.peek=Rp;function $a(e,t,n,i){let r=e.referenceType,o=n.enter("linkReference"),l=n.enter("label"),a=n.createTracker(i),s=a.move("["),c=n.containerPhrasing(e,{before:s,after:"]",...a.current()});s+=a.move(c+"]["),l();let d=n.stack;n.stack=[],l=n.enter("reference");let h=n.safe(n.associationId(e),{before:s,after:"]",...a.current()});return l(),n.stack=d,o(),r==="full"||!c||c!==h?s+=a.move(h+"]"):r==="shortcut"?s=s.slice(0,-1):s+=a.move("]"),s}function Rp(){return"["}function qr(e){let t=e.options.bullet||"*";if(t!=="*"&&t!=="+"&&t!=="-")throw Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function Op(e){let t=qr(e),n=e.options.bulletOther;if(!n)return t==="*"?"-":"*";if(n!=="*"&&n!=="+"&&n!=="-")throw Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function Lp(e){let t=e.options.bulletOrdered||".";if(t!=="."&&t!==")")throw Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function Ua(e){let t=e.options.rule||"*";if(t!=="*"&&t!=="-"&&t!=="_")throw Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function Sp(e,t,n,i){let r=n.enter("list"),o=n.bulletCurrent,l=e.ordered?Lp(n):qr(n),a=e.ordered?l==="."?")":".":Op(n),s=t&&n.bulletLastUsed?l===n.bulletLastUsed:!1;if(!e.ordered){let d=e.children?e.children[0]:void 0;if((l==="*"||l==="-")&&d&&(!d.children||!d.children[0])&&n.stack[n.stack.length-1]==="list"&&n.stack[n.stack.length-2]==="listItem"&&n.stack[n.stack.length-3]==="list"&&n.stack[n.stack.length-4]==="listItem"&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(s=!0),Ua(n)===l&&d){let h=-1;for(;++h<e.children.length;){let m=e.children[h];if(m&&m.type==="listItem"&&m.children&&m.children[0]&&m.children[0].type==="thematicBreak"){s=!0;break}}}}s&&(l=a),n.bulletCurrent=l;let c=n.containerFlow(e,i);return n.bulletLastUsed=l,n.bulletCurrent=o,r(),c}function Np(e){let t=e.options.listItemIndent||"one";if(t!=="tab"&&t!=="one"&&t!=="mixed")throw Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function Ip(e,t,n,i){let r=Np(n),o=n.bulletCurrent||qr(n);t&&t.type==="list"&&t.ordered&&(o=(typeof t.start=="number"&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+o);let l=o.length+1;(r==="tab"||r==="mixed"&&(t&&t.type==="list"&&t.spread||e.spread))&&(l=Math.ceil(l/4)*4);let a=n.createTracker(i);a.move(o+" ".repeat(l-o.length)),a.shift(l);let s=n.enter("listItem"),c=n.indentLines(n.containerFlow(e,a.current()),d);return s(),c;function d(h,m,u){return m?(u?"":" ".repeat(l))+h:(u?o:o+" ".repeat(l-o.length))+h}}function Pp(e,t,n,i){let r=n.enter("paragraph"),o=n.enter("phrasing"),l=n.containerPhrasing(e,i);return o(),r(),l}const zp=fi(["break","delete","emphasis","footnote","footnoteReference","image","imageReference","inlineCode","inlineMath","link","linkReference","mdxJsxTextElement","mdxTextExpression","strong","text","textDirective"]);function _p(e,t,n,i){return(e.children.some(function(r){return zp(r)})?n.containerPhrasing:n.containerFlow).call(n,e,i)}function Gp(e){let t=e.options.strong||"*";if(t!=="*"&&t!=="_")throw Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}Za.peek=Mp;function Za(e,t,n,i){let r=Gp(n),o=n.enter("strong"),l=n.createTracker(i),a=l.move(r+r),s=l.move(n.containerPhrasing(e,{after:r,before:a,...l.current()})),c=s.charCodeAt(0),d=ti(i.before.charCodeAt(i.before.length-1),c,r);d.inside&&(s=gn(c)+s.slice(1));let h=s.charCodeAt(s.length-1),m=ti(i.after.charCodeAt(0),h,r);m.inside&&(s=s.slice(0,-1)+gn(h));let u=l.move(r+r);return o(),n.attentionEncodeSurroundingInfo={after:m.outside,before:d.outside},a+s+u}function Mp(e,t,n){return n.options.strong||"*"}function jp(e,t,n,i){return n.safe(e.value,i)}function qp(e){let t=e.options.ruleRepetition||3;if(t<3)throw Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function Hp(e,t,n){let i=(Ua(n)+(n.options.ruleSpaces?" ":"")).repeat(qp(n));return n.options.ruleSpaces?i.slice(0,-1):i}const Va={blockquote:up,break:Ul,code:vp,definition:Ap,emphasis:za,hardBreak:Ul,heading:Bp,html:_a,image:Ga,imageReference:Ma,inlineCode:ja,link:Ha,linkReference:$a,list:Sp,listItem:Ip,paragraph:Pp,root:_p,strong:Za,text:jp,thematicBreak:Hp};function $p(){return{enter:{table:Up,tableData:Zl,tableHeader:Zl,tableRow:Vp},exit:{codeText:Qp,table:Zp,tableData:Ni,tableHeader:Ni,tableRow:Ni}}}function Up(e){let t=e._align;this.enter({type:"table",align:t.map(function(n){return n==="none"?null:n}),children:[]},e),this.data.inTable=!0}function Zp(e){this.exit(e),this.data.inTable=void 0}function Vp(e){this.enter({type:"tableRow",children:[]},e)}function Ni(e){this.exit(e)}function Zl(e){this.enter({type:"tableCell",children:[]},e)}function Qp(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,Kp));let n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function Kp(e,t){return t==="|"?t:e}function Wp(e){let t=e||{},n=t.tableCellPadding,i=t.tablePipeAlign,r=t.stringLength,o=n?" ":"|";return{unsafe:[{character:"\r",inConstruct:"tableCell"},{character:`
`,inConstruct:"tableCell"},{atBreak:!0,character:"|",after:"[	 :-]"},{character:"|",inConstruct:"tableCell"},{atBreak:!0,character:":",after:"-"},{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{inlineCode:m,table:l,tableCell:s,tableRow:a}};function l(u,f,A,b){return c(d(u,A,b),u.align)}function a(u,f,A,b){let y=c([h(u,A,b)]);return y.slice(0,y.indexOf(`
`))}function s(u,f,A,b){let y=A.enter("tableCell"),D=A.enter("phrasing"),B=A.containerPhrasing(u,{...b,before:o,after:o});return D(),y(),B}function c(u,f){return Nf(u,{align:f,alignDelimiters:i,padding:n,stringLength:r})}function d(u,f,A){let b=u.children,y=-1,D=[],B=f.enter("table");for(;++y<b.length;)D[y]=h(b[y],f,A);return B(),D}function h(u,f,A){let b=u.children,y=-1,D=[],B=f.enter("tableRow");for(;++y<b.length;)D[y]=s(b[y],u,f,A);return B(),D}function m(u,f,A){let b=Va.inlineCode(u,f,A);return A.stack.includes("tableCell")&&(b=b.replace(/\|/g,"\\$&")),b}}function Xp(){return{exit:{taskListCheckValueChecked:Vl,taskListCheckValueUnchecked:Vl,paragraph:Jp}}}function Yp(){return{unsafe:[{atBreak:!0,character:"-",after:"[:|-]"}],handlers:{listItem:e2}}}function Vl(e){let t=this.stack[this.stack.length-2];t.type,t.checked=e.type==="taskListCheckValueChecked"}function Jp(e){let t=this.stack[this.stack.length-2];if(t&&t.type==="listItem"&&typeof t.checked=="boolean"){let n=this.stack[this.stack.length-1];n.type;let i=n.children[0];if(i&&i.type==="text"){let r=t.children,o=-1,l;for(;++o<r.length;){let a=r[o];if(a.type==="paragraph"){l=a;break}}l===n&&(i.value=i.value.slice(1),i.value.length===0?n.children.shift():n.position&&i.position&&typeof i.position.start.offset=="number"&&(i.position.start.column++,i.position.start.offset++,n.position.start=Object.assign({},i.position.start)))}}this.exit(e)}function e2(e,t,n,i){let r=e.children[0],o=typeof e.checked=="boolean"&&r&&r.type==="paragraph",l="["+(e.checked?"x":" ")+"] ",a=n.createTracker(i);o&&a.move(l);let s=Va.listItem(e,t,n,{...i,...a.current()});return o&&(s=s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,c)),s;function c(d){return d+l}}function t2(){return[zf(),rp(),sp(),$p(),Xp()]}function n2(e){return{extensions:[_f(),lp(e),cp(),Wp(e),Yp()]}}const i2={tokenize:c2,partial:!0},Qa={tokenize:d2,partial:!0},Ka={tokenize:h2,partial:!0},Wa={tokenize:m2,partial:!0},r2={tokenize:u2,partial:!0},Ql={name:"wwwAutolink",tokenize:a2,previous:Xa},Kl={name:"protocolAutolink",tokenize:s2,previous:Ya},Ve={name:"emailAutolink",tokenize:o2,previous:Ja},_e={};function l2(){return{text:_e}}let ut=48;for(;ut<123;)_e[ut]=Ve,ut++,ut===58?ut=65:ut===91&&(ut=97);_e[43]=Ve,_e[45]=Ve,_e[46]=Ve,_e[95]=Ve,_e[72]=[Ve,Kl],_e[104]=[Ve,Kl],_e[87]=[Ve,Ql],_e[119]=[Ve,Ql];function o2(e,t,n){let i=this,r,o;return l;function l(h){return!ur(h)||!Ja.call(i,i.previous)||Hr(i.events)?n(h):(e.enter("literalAutolink"),e.enter("literalAutolinkEmail"),a(h))}function a(h){return ur(h)?(e.consume(h),a):h===64?(e.consume(h),s):n(h)}function s(h){return h===46?e.check(r2,d,c)(h):h===45||h===95||ue(h)?(o=!0,e.consume(h),s):d(h)}function c(h){return e.consume(h),r=!0,s}function d(h){return o&&r&&ye(i.previous)?(e.exit("literalAutolinkEmail"),e.exit("literalAutolink"),t(h)):n(h)}}function a2(e,t,n){let i=this;return r;function r(l){return l!==87&&l!==119||!Xa.call(i,i.previous)||Hr(i.events)?n(l):(e.enter("literalAutolink"),e.enter("literalAutolinkWww"),e.check(i2,e.attempt(Qa,e.attempt(Ka,o),n),n)(l))}function o(l){return e.exit("literalAutolinkWww"),e.exit("literalAutolink"),t(l)}}function s2(e,t,n){let i=this,r="",o=!1;return l;function l(h){return(h===72||h===104)&&Ya.call(i,i.previous)&&!Hr(i.events)?(e.enter("literalAutolink"),e.enter("literalAutolinkHttp"),r+=String.fromCodePoint(h),e.consume(h),a):n(h)}function a(h){if(ye(h)&&r.length<5)return r+=String.fromCodePoint(h),e.consume(h),a;if(h===58){let m=r.toLowerCase();if(m==="http"||m==="https")return e.consume(h),s}return n(h)}function s(h){return h===47?(e.consume(h),o?c:(o=!0,s)):n(h)}function c(h){return h===null||ei(h)||W(h)||xt(h)||hi(h)?n(h):e.attempt(Qa,e.attempt(Ka,d),n)(h)}function d(h){return e.exit("literalAutolinkHttp"),e.exit("literalAutolink"),t(h)}}function c2(e,t,n){let i=0;return r;function r(l){return(l===87||l===119)&&i<3?(i++,e.consume(l),r):l===46&&i===3?(e.consume(l),o):n(l)}function o(l){return l===null?n(l):t(l)}}function d2(e,t,n){let i,r,o;return l;function l(c){return c===46||c===95?e.check(Wa,s,a)(c):c===null||W(c)||xt(c)||c!==45&&hi(c)?s(c):(o=!0,e.consume(c),l)}function a(c){return c===95?i=!0:(r=i,i=void 0),e.consume(c),l}function s(c){return r||i||!o?n(c):t(c)}}function h2(e,t){let n=0,i=0;return r;function r(l){return l===40?(n++,e.consume(l),r):l===41&&i<n?o(l):l===33||l===34||l===38||l===39||l===41||l===42||l===44||l===46||l===58||l===59||l===60||l===63||l===93||l===95||l===126?e.check(Wa,t,o)(l):l===null||W(l)||xt(l)?t(l):(e.consume(l),r)}function o(l){return l===41&&i++,e.consume(l),r}}function m2(e,t,n){return i;function i(a){return a===33||a===34||a===39||a===41||a===42||a===44||a===46||a===58||a===59||a===63||a===95||a===126?(e.consume(a),i):a===38?(e.consume(a),o):a===93?(e.consume(a),r):a===60||a===null||W(a)||xt(a)?t(a):n(a)}function r(a){return a===null||a===40||a===91||W(a)||xt(a)?t(a):i(a)}function o(a){return ye(a)?l(a):n(a)}function l(a){return a===59?(e.consume(a),i):ye(a)?(e.consume(a),l):n(a)}}function u2(e,t,n){return i;function i(o){return e.consume(o),r}function r(o){return ue(o)?n(o):t(o)}}function Xa(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||W(e)}function Ya(e){return!ye(e)}function Ja(e){return!(e===47||ur(e))}function ur(e){return e===43||e===45||e===46||e===95||ue(e)}function Hr(e){let t=e.length,n=!1;for(;t--;){let i=e[t][1];if((i.type==="labelLink"||i.type==="labelImage")&&!i._balanced){n=!0;break}if(i._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}const f2={tokenize:T2,partial:!0};function p2(){return{document:{91:{name:"gfmFootnoteDefinition",tokenize:b2,continuation:{tokenize:A2},exit:x2}},text:{91:{name:"gfmFootnoteCall",tokenize:v2},93:{name:"gfmPotentialFootnoteCall",add:"after",tokenize:g2,resolveTo:y2}}}}function g2(e,t,n){let i=this,r=i.events.length,o=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]),l;for(;r--;){let s=i.events[r][1];if(s.type==="labelImage"){l=s;break}if(s.type==="gfmFootnoteCall"||s.type==="labelLink"||s.type==="label"||s.type==="image"||s.type==="link")break}return a;function a(s){if(!l||!l._balanced)return n(s);let c=Ie(i.sliceSerialize({start:l.end,end:i.now()}));return c.codePointAt(0)!==94||!o.includes(c.slice(1))?n(s):(e.enter("gfmFootnoteCallLabelMarker"),e.consume(s),e.exit("gfmFootnoteCallLabelMarker"),t(s))}}function y2(e,t){let n=e.length;for(;n--;)if(e[n][1].type==="labelImage"&&e[n][0]==="enter"){e[n][1];break}e[n+1][1].type="data",e[n+3][1].type="gfmFootnoteCallLabelMarker";let i={type:"gfmFootnoteCall",start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},r={type:"gfmFootnoteCallMarker",start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};r.end.column++,r.end.offset++,r.end._bufferIndex++;let o={type:"gfmFootnoteCallString",start:Object.assign({},r.end),end:Object.assign({},e[e.length-1][1].start)},l={type:"chunkString",contentType:"string",start:Object.assign({},o.start),end:Object.assign({},o.end)},a=[e[n+1],e[n+2],["enter",i,t],e[n+3],e[n+4],["enter",r,t],["exit",r,t],["enter",o,t],["enter",l,t],["exit",l,t],["exit",o,t],e[e.length-2],e[e.length-1],["exit",i,t]];return e.splice(n,e.length-n+1,...a),e}function v2(e,t,n){let i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]),o=0,l;return a;function a(h){return e.enter("gfmFootnoteCall"),e.enter("gfmFootnoteCallLabelMarker"),e.consume(h),e.exit("gfmFootnoteCallLabelMarker"),s}function s(h){return h===94?(e.enter("gfmFootnoteCallMarker"),e.consume(h),e.exit("gfmFootnoteCallMarker"),e.enter("gfmFootnoteCallString"),e.enter("chunkString").contentType="string",c):n(h)}function c(h){if(o>999||h===93&&!l||h===null||h===91||W(h))return n(h);if(h===93){e.exit("chunkString");let m=e.exit("gfmFootnoteCallString");return r.includes(Ie(i.sliceSerialize(m)))?(e.enter("gfmFootnoteCallLabelMarker"),e.consume(h),e.exit("gfmFootnoteCallLabelMarker"),e.exit("gfmFootnoteCall"),t):n(h)}return W(h)||(l=!0),o++,e.consume(h),h===92?d:c}function d(h){return h===91||h===92||h===93?(e.consume(h),o++,c):c(h)}}function b2(e,t,n){let i=this,r=i.parser.gfmFootnotes||(i.parser.gfmFootnotes=[]),o,l=0,a;return s;function s(f){return e.enter("gfmFootnoteDefinition")._container=!0,e.enter("gfmFootnoteDefinitionLabel"),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(f),e.exit("gfmFootnoteDefinitionLabelMarker"),c}function c(f){return f===94?(e.enter("gfmFootnoteDefinitionMarker"),e.consume(f),e.exit("gfmFootnoteDefinitionMarker"),e.enter("gfmFootnoteDefinitionLabelString"),e.enter("chunkString").contentType="string",d):n(f)}function d(f){if(l>999||f===93&&!a||f===null||f===91||W(f))return n(f);if(f===93){e.exit("chunkString");let A=e.exit("gfmFootnoteDefinitionLabelString");return o=Ie(i.sliceSerialize(A)),e.enter("gfmFootnoteDefinitionLabelMarker"),e.consume(f),e.exit("gfmFootnoteDefinitionLabelMarker"),e.exit("gfmFootnoteDefinitionLabel"),m}return W(f)||(a=!0),l++,e.consume(f),f===92?h:d}function h(f){return f===91||f===92||f===93?(e.consume(f),l++,d):d(f)}function m(f){return f===58?(e.enter("definitionMarker"),e.consume(f),e.exit("definitionMarker"),r.includes(o)||r.push(o),V(e,u,"gfmFootnoteDefinitionWhitespace")):n(f)}function u(f){return t(f)}}function A2(e,t,n){return e.check(kn,t,e.attempt(f2,t,n))}function x2(e){e.exit("gfmFootnoteDefinition")}function T2(e,t,n){let i=this;return V(e,r,"gfmFootnoteDefinitionIndent",5);function r(o){let l=i.events[i.events.length-1];return l&&l[1].type==="gfmFootnoteDefinitionIndent"&&l[2].sliceSerialize(l[1],!0).length===4?t(o):n(o)}}function F2(e){let t=(e||{}).singleTilde,n={name:"strikethrough",tokenize:r,resolveAll:i};return t??=!0,{text:{126:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function i(o,l){let a=-1;for(;++a<o.length;)if(o[a][0]==="enter"&&o[a][1].type==="strikethroughSequenceTemporary"&&o[a][1]._close){let s=a;for(;s--;)if(o[s][0]==="exit"&&o[s][1].type==="strikethroughSequenceTemporary"&&o[s][1]._open&&o[a][1].end.offset-o[a][1].start.offset===o[s][1].end.offset-o[s][1].start.offset){o[a][1].type="strikethroughSequence",o[s][1].type="strikethroughSequence";let c={type:"strikethrough",start:Object.assign({},o[s][1].start),end:Object.assign({},o[a][1].end)},d={type:"strikethroughText",start:Object.assign({},o[s][1].end),end:Object.assign({},o[a][1].start)},h=[["enter",c,l],["enter",o[s][1],l],["exit",o[s][1],l],["enter",d,l]],m=l.parser.constructs.insideSpan.null;m&&we(h,h.length,0,ui(m,o.slice(s+1,a),l)),we(h,h.length,0,[["exit",d,l],["enter",o[a][1],l],["exit",o[a][1],l],["exit",c,l]]),we(o,s-1,a-s+3,h),a=s+h.length-2;break}}for(a=-1;++a<o.length;)o[a][1].type==="strikethroughSequenceTemporary"&&(o[a][1].type="data");return o}function r(o,l,a){let s=this.previous,c=this.events,d=0;return h;function h(u){return s===126&&c[c.length-1][1].type!=="characterEscape"?a(u):(o.enter("strikethroughSequenceTemporary"),m(u))}function m(u){let f=jt(s);if(u===126)return d>1?a(u):(o.consume(u),d++,m);if(d<2&&!t)return a(u);let A=o.exit("strikethroughSequenceTemporary"),b=jt(u);return A._open=!b||b===2&&!!f,A._close=!f||f===2&&!!b,l(u)}}}var B2=class{constructor(){this.map=[]}add(t,n,i){k2(this,t,n,i)}consume(t){if(this.map.sort(function(o,l){return o[0]-l[0]}),this.map.length===0)return;let n=this.map.length,i=[];for(;n>0;)--n,i.push(t.slice(this.map[n][0]+this.map[n][1]),this.map[n][2]),t.length=this.map[n][0];i.push(t.slice()),t.length=0;let r=i.pop();for(;r;){for(let o of r)t.push(o);r=i.pop()}this.map.length=0}};function k2(e,t,n,i){let r=0;if(!(n===0&&i.length===0)){for(;r<e.map.length;){if(e.map[r][0]===t){e.map[r][1]+=n,e.map[r][2].push(...i);return}r+=1}e.map.push([t,n,i])}}function w2(e,t){let n=!1,i=[];for(;t<e.length;){let r=e[t];if(n){if(r[0]==="enter")r[1].type==="tableContent"&&i.push(e[t+1][1].type==="tableDelimiterMarker"?"left":"none");else if(r[1].type==="tableContent"){if(e[t-1][1].type==="tableDelimiterMarker"){let o=i.length-1;i[o]=i[o]==="left"?"center":"right"}}else if(r[1].type==="tableDelimiterRow")break}else r[0]==="enter"&&r[1].type==="tableDelimiterRow"&&(n=!0);t+=1}return i}function E2(){return{flow:{null:{name:"table",tokenize:D2,resolveAll:C2}}}}function D2(e,t,n){let i=this,r=0,o=0,l;return a;function a(v){let k=i.events.length-1;for(;k>-1;){let H=i.events[k][1].type;if(H==="lineEnding"||H==="linePrefix")k--;else break}let C=k>-1?i.events[k][1].type:null,N=C==="tableHead"||C==="tableRow"?F:s;return N===F&&i.parser.lazy[i.now().line]?n(v):N(v)}function s(v){return e.enter("tableHead"),e.enter("tableRow"),c(v)}function c(v){return v===124||(l=!0,o+=1),d(v)}function d(v){return v===null?n(v):P(v)?o>1?(o=0,i.interrupt=!0,e.exit("tableRow"),e.enter("lineEnding"),e.consume(v),e.exit("lineEnding"),u):n(v):U(v)?V(e,d,"whitespace")(v):(o+=1,l&&(l=!1,r+=1),v===124?(e.enter("tableCellDivider"),e.consume(v),e.exit("tableCellDivider"),l=!0,d):(e.enter("data"),h(v)))}function h(v){return v===null||v===124||W(v)?(e.exit("data"),d(v)):(e.consume(v),v===92?m:h)}function m(v){return v===92||v===124?(e.consume(v),h):h(v)}function u(v){return i.interrupt=!1,i.parser.lazy[i.now().line]?n(v):(e.enter("tableDelimiterRow"),l=!1,U(v)?V(e,f,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(v):f(v))}function f(v){return v===45||v===58?b(v):v===124?(l=!0,e.enter("tableCellDivider"),e.consume(v),e.exit("tableCellDivider"),A):I(v)}function A(v){return U(v)?V(e,b,"whitespace")(v):b(v)}function b(v){return v===58?(o+=1,l=!0,e.enter("tableDelimiterMarker"),e.consume(v),e.exit("tableDelimiterMarker"),y):v===45?(o+=1,y(v)):v===null||P(v)?L(v):I(v)}function y(v){return v===45?(e.enter("tableDelimiterFiller"),D(v)):I(v)}function D(v){return v===45?(e.consume(v),D):v===58?(l=!0,e.exit("tableDelimiterFiller"),e.enter("tableDelimiterMarker"),e.consume(v),e.exit("tableDelimiterMarker"),B):(e.exit("tableDelimiterFiller"),B(v))}function B(v){return U(v)?V(e,L,"whitespace")(v):L(v)}function L(v){return v===124?f(v):v===null||P(v)?!l||r!==o?I(v):(e.exit("tableDelimiterRow"),e.exit("tableHead"),t(v)):I(v)}function I(v){return n(v)}function F(v){return e.enter("tableRow"),S(v)}function S(v){return v===124?(e.enter("tableCellDivider"),e.consume(v),e.exit("tableCellDivider"),S):v===null||P(v)?(e.exit("tableRow"),t(v)):U(v)?V(e,S,"whitespace")(v):(e.enter("data"),x(v))}function x(v){return v===null||v===124||W(v)?(e.exit("data"),S(v)):(e.consume(v),v===92?O:x)}function O(v){return v===92||v===124?(e.consume(v),x):x(v)}}function C2(e,t){let n=-1,i=!0,r=0,o=[0,0,0,0],l=[0,0,0,0],a=!1,s=0,c,d,h,m=new B2;for(;++n<e.length;){let u=e[n],f=u[1];u[0]==="enter"?f.type==="tableHead"?(a=!1,s!==0&&(Wl(m,t,s,c,d),d=void 0,s=0),c={type:"table",start:Object.assign({},f.start),end:Object.assign({},f.end)},m.add(n,0,[["enter",c,t]])):f.type==="tableRow"||f.type==="tableDelimiterRow"?(i=!0,h=void 0,o=[0,0,0,0],l=[0,n+1,0,0],a&&(a=!1,d={type:"tableBody",start:Object.assign({},f.start),end:Object.assign({},f.end)},m.add(n,0,[["enter",d,t]])),r=f.type==="tableDelimiterRow"?2:d?3:1):r&&(f.type==="data"||f.type==="tableDelimiterMarker"||f.type==="tableDelimiterFiller")?(i=!1,l[2]===0&&(o[1]!==0&&(l[0]=l[1],h=Ln(m,t,o,r,void 0,h),o=[0,0,0,0]),l[2]=n)):f.type==="tableCellDivider"&&(i?i=!1:(o[1]!==0&&(l[0]=l[1],h=Ln(m,t,o,r,void 0,h)),o=l,l=[o[1],n,0,0])):f.type==="tableHead"?(a=!0,s=n):f.type==="tableRow"||f.type==="tableDelimiterRow"?(s=n,o[1]===0?l[1]!==0&&(h=Ln(m,t,l,r,n,h)):(l[0]=l[1],h=Ln(m,t,o,r,n,h)),r=0):r&&(f.type==="data"||f.type==="tableDelimiterMarker"||f.type==="tableDelimiterFiller")&&(l[3]=n)}for(s!==0&&Wl(m,t,s,c,d),m.consume(t.events),n=-1;++n<t.events.length;){let u=t.events[n];u[0]==="enter"&&u[1].type==="table"&&(u[1]._align=w2(t.events,n))}return e}function Ln(e,t,n,i,r,o){let l=i===1?"tableHeader":i===2?"tableDelimiter":"tableData";n[0]!==0&&(o.end=Object.assign({},Lt(t.events,n[0])),e.add(n[0],0,[["exit",o,t]]));let a=Lt(t.events,n[1]);if(o={type:l,start:Object.assign({},a),end:Object.assign({},a)},e.add(n[1],0,[["enter",o,t]]),n[2]!==0){let s=Lt(t.events,n[2]),c=Lt(t.events,n[3]),d={type:"tableContent",start:Object.assign({},s),end:Object.assign({},c)};if(e.add(n[2],0,[["enter",d,t]]),i!==2){let h=t.events[n[2]],m=t.events[n[3]];if(h[1].end=Object.assign({},m[1].end),h[1].type="chunkText",h[1].contentType="text",n[3]>n[2]+1){let u=n[2]+1,f=n[3]-n[2]-1;e.add(u,f,[])}}e.add(n[3]+1,0,[["exit",d,t]])}return r!==void 0&&(o.end=Object.assign({},Lt(t.events,r)),e.add(r,0,[["exit",o,t]]),o=void 0),o}function Wl(e,t,n,i,r){let o=[],l=Lt(t.events,n);r&&(r.end=Object.assign({},l),o.push(["exit",r,t])),i.end=Object.assign({},l),o.push(["exit",i,t]),e.add(n+1,0,o)}function Lt(e,t){let n=e[t],i=n[0]==="enter"?"start":"end";return n[1][i]}const R2={name:"tasklistCheck",tokenize:L2};function O2(){return{text:{91:R2}}}function L2(e,t,n){let i=this;return r;function r(s){return i.previous!==null||!i._gfmTasklistFirstContentOfListItem?n(s):(e.enter("taskListCheck"),e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),o)}function o(s){return W(s)?(e.enter("taskListCheckValueUnchecked"),e.consume(s),e.exit("taskListCheckValueUnchecked"),l):s===88||s===120?(e.enter("taskListCheckValueChecked"),e.consume(s),e.exit("taskListCheckValueChecked"),l):n(s)}function l(s){return s===93?(e.enter("taskListCheckMarker"),e.consume(s),e.exit("taskListCheckMarker"),e.exit("taskListCheck"),a):n(s)}function a(s){return P(s)?t(s):U(s)?e.check({tokenize:S2},t,n)(s):n(s)}}function S2(e,t,n){return V(e,i,"whitespace");function i(r){return r===null?n(r):t(r)}}function N2(e){return va([l2(),p2(),F2(e),E2(),O2()])}const I2={};function P2(e){let t=this,n=e||I2,i=t.data(),r=i.micromarkExtensions||=[],o=i.fromMarkdownExtensions||=[],l=i.toMarkdownExtensions||=[];r.push(N2(n)),o.push(t2()),l.push(n2(n))}const z2=/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i,_2=/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)(\/.*)?\]/i,G2=({legacyTitle:e=!1,tagName:t="div"}={})=>n=>{jr(n,"blockquote",(i,r,o)=>{let l="",a="",s=!0,c=i.children.map(d=>{if(s&&d.type==="paragraph"){let h=d.children[0],m=h.type==="text"?h.value:"",u=e?_2:z2,f=m.match(u);if(f&&(s=!1,l=f[1].toLocaleLowerCase(),a=e&&f[2]||l.toLocaleUpperCase(),m.includes(`
`)&&(d.children[0]={type:"text",value:m.replace(u,"").replace(/^\n+/,"")}),!m.includes(`
`))){let A=[];d.children.forEach((b,y)=>{y!=0&&(y==1&&b.type==="break"||A.push(b))}),d.children=[...A]}}return d});l&&(i.data={hName:t,hProperties:{className:["markdown-alert",`markdown-alert-${l}`],dir:"auto"}},c.unshift({type:"paragraph",children:[M2(l),{type:"text",value:a.replace(/^\//,"")}],data:{hProperties:{className:"markdown-alert-title",dir:"auto"}}})),i.children=[...c]})};function M2(e){return{type:"emphasis",data:{hName:"svg",hProperties:{className:["octicon"],viewBox:"0 0 16 16",width:"16",height:"16",ariaHidden:"true"}},children:[{type:"emphasis",data:{hName:"path",hProperties:{d:j2[e]??""}},children:[]}]}}const j2={note:"M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",tip:"M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z",important:"M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",warning:"M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",caution:"M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"};function q2(e){let t=this;t.parser=n;function n(i){return Ca(i,{...t.data("settings"),...e,extensions:t.data("micromarkExtensions")||[],mdastExtensions:t.data("fromMarkdownExtensions")||[]})}}function H2(e,t){let n={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function $2(e,t){let n={type:"element",tagName:"br",properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:"text",value:`
`}]}function U2(e,t){let n=t.value?t.value+`
`:"",i={},r=t.lang?t.lang.split(/\s+/):[];r.length>0&&(i.className=["language-"+r[0]]);let o={type:"element",tagName:"code",properties:i,children:[{type:"text",value:n}]};return t.meta&&(o.data={meta:t.meta}),e.patch(t,o),o=e.applyData(t,o),o={type:"element",tagName:"pre",properties:{},children:[o]},e.patch(t,o),o}function Z2(e,t){let n={type:"element",tagName:"del",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function V2(e,t){let n={type:"element",tagName:"em",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Q2(e,t){let n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",i=String(t.identifier).toUpperCase(),r=Qt(i.toLowerCase()),o=e.footnoteOrder.indexOf(i),l,a=e.footnoteCounts.get(i);a===void 0?(a=0,e.footnoteOrder.push(i),l=e.footnoteOrder.length):l=o+1,a+=1,e.footnoteCounts.set(i,a);let s={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+r,id:n+"fnref-"+r+(a>1?"-"+a:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};e.patch(t,s);let c={type:"element",tagName:"sup",properties:{},children:[s]};return e.patch(t,c),e.applyData(t,c)}function K2(e,t){let n={type:"element",tagName:"h"+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function W2(e,t){if(e.options.allowDangerousHtml){let n={type:"raw",value:t.value};return e.patch(t,n),e.applyData(t,n)}}function es(e,t){let n=t.referenceType,i="]";if(n==="collapsed"?i+="[]":n==="full"&&(i+="["+(t.label||t.identifier)+"]"),t.type==="imageReference")return[{type:"text",value:"!["+t.alt+i}];let r=e.all(t),o=r[0];o&&o.type==="text"?o.value="["+o.value:r.unshift({type:"text",value:"["});let l=r[r.length-1];return l&&l.type==="text"?l.value+=i:r.push({type:"text",value:i}),r}function X2(e,t){let n=String(t.identifier).toUpperCase(),i=e.definitionById.get(n);if(!i)return es(e,t);let r={src:Qt(i.url||""),alt:t.alt};i.title!==null&&i.title!==void 0&&(r.title=i.title);let o={type:"element",tagName:"img",properties:r,children:[]};return e.patch(t,o),e.applyData(t,o)}function Y2(e,t){let n={src:Qt(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);let i={type:"element",tagName:"img",properties:n,children:[]};return e.patch(t,i),e.applyData(t,i)}function J2(e,t){let n={type:"text",value:t.value.replace(/\r?\n|\r/g," ")};e.patch(t,n);let i={type:"element",tagName:"code",properties:{},children:[n]};return e.patch(t,i),e.applyData(t,i)}function e1(e,t){let n=String(t.identifier).toUpperCase(),i=e.definitionById.get(n);if(!i)return es(e,t);let r={href:Qt(i.url||"")};i.title!==null&&i.title!==void 0&&(r.title=i.title);let o={type:"element",tagName:"a",properties:r,children:e.all(t)};return e.patch(t,o),e.applyData(t,o)}function t1(e,t){let n={href:Qt(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);let i={type:"element",tagName:"a",properties:n,children:e.all(t)};return e.patch(t,i),e.applyData(t,i)}function n1(e,t,n){let i=e.all(t),r=n?i1(n):ts(t),o={},l=[];if(typeof t.checked=="boolean"){let d=i[0],h;d&&d.type==="element"&&d.tagName==="p"?h=d:(h={type:"element",tagName:"p",properties:{},children:[]},i.unshift(h)),h.children.length>0&&h.children.unshift({type:"text",value:" "}),h.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:t.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let a=-1;for(;++a<i.length;){let d=i[a];(r||a!==0||d.type!=="element"||d.tagName!=="p")&&l.push({type:"text",value:`
`}),d.type==="element"&&d.tagName==="p"&&!r?l.push(...d.children):l.push(d)}let s=i[i.length-1];s&&(r||s.type!=="element"||s.tagName!=="p")&&l.push({type:"text",value:`
`});let c={type:"element",tagName:"li",properties:o,children:l};return e.patch(t,c),e.applyData(t,c)}function i1(e){let t=!1;if(e.type==="list"){t=e.spread||!1;let n=e.children,i=-1;for(;!t&&++i<n.length;)t=ts(n[i])}return t}function ts(e){return e.spread??e.children.length>1}function r1(e,t){let n={},i=e.all(t),r=-1;for(typeof t.start=="number"&&t.start!==1&&(n.start=t.start);++r<i.length;){let l=i[r];if(l.type==="element"&&l.tagName==="li"&&l.properties&&Array.isArray(l.properties.className)&&l.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}let o={type:"element",tagName:t.ordered?"ol":"ul",properties:n,children:e.wrap(i,!0)};return e.patch(t,o),e.applyData(t,o)}function l1(e,t){let n={type:"element",tagName:"p",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function o1(e,t){let n={type:"root",children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function a1(e,t){let n={type:"element",tagName:"strong",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function s1(e,t){let n=e.all(t),i=n.shift(),r=[];if(i){let l={type:"element",tagName:"thead",properties:{},children:e.wrap([i],!0)};e.patch(t.children[0],l),r.push(l)}if(n.length>0){let l={type:"element",tagName:"tbody",properties:{},children:e.wrap(n,!0)},a=Wo(t.children[1]),s=Ko(t.children[t.children.length-1]);a&&s&&(l.position={start:a,end:s}),r.push(l)}let o={type:"element",tagName:"table",properties:{},children:e.wrap(r,!0)};return e.patch(t,o),e.applyData(t,o)}function c1(e,t,n){let i=n?n.children:void 0,r=(i?i.indexOf(t):1)===0?"th":"td",o=n&&n.type==="table"?n.align:void 0,l=o?o.length:t.children.length,a=-1,s=[];for(;++a<l;){let d=t.children[a],h={},m=o?o[a]:void 0;m&&(h.align=m);let u={type:"element",tagName:r,properties:h,children:[]};d&&(u.children=e.all(d),e.patch(d,u),u=e.applyData(d,u)),s.push(u)}let c={type:"element",tagName:"tr",properties:{},children:e.wrap(s,!0)};return e.patch(t,c),e.applyData(t,c)}function d1(e,t){let n={type:"element",tagName:"td",properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function h1(e){let t=String(e),n=/\r?\n|\r/g,i=n.exec(t),r=0,o=[];for(;i;)o.push(Xl(t.slice(r,i.index),r>0,!0),i[0]),r=i.index+i[0].length,i=n.exec(t);return o.push(Xl(t.slice(r),r>0,!1)),o.join("")}function Xl(e,t,n){let i=0,r=e.length;if(t){let o=e.codePointAt(i);for(;o===9||o===32;)i++,o=e.codePointAt(i)}if(n){let o=e.codePointAt(r-1);for(;o===9||o===32;)r--,o=e.codePointAt(r-1)}return r>i?e.slice(i,r):""}function m1(e,t){let n={type:"text",value:h1(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function u1(e,t){let n={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}const f1={blockquote:H2,break:$2,code:U2,delete:Z2,emphasis:V2,footnoteReference:Q2,heading:K2,html:W2,imageReference:X2,image:Y2,inlineCode:J2,linkReference:e1,link:t1,listItem:n1,list:r1,paragraph:l1,root:o1,strong:a1,table:s1,tableCell:d1,tableRow:c1,text:m1,thematicBreak:u1,toml:Sn,yaml:Sn,definition:Sn,footnoteDefinition:Sn};function Sn(){}function p1(e,t){let n=[{type:"text",value:"↩"}];return t>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(t)}]}),n}function g1(e,t){return"Back to reference "+(e+1)+(t>1?"-"+t:"")}function y1(e){let t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",n=e.options.footnoteBackContent||p1,i=e.options.footnoteBackLabel||g1,r=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",l=e.options.footnoteLabelProperties||{className:["sr-only"]},a=[],s=-1;for(;++s<e.footnoteOrder.length;){let c=e.footnoteById.get(e.footnoteOrder[s]);if(!c)continue;let d=e.all(c),h=String(c.identifier).toUpperCase(),m=Qt(h.toLowerCase()),u=0,f=[],A=e.footnoteCounts.get(h);for(;A!==void 0&&++u<=A;){f.length>0&&f.push({type:"text",value:" "});let D=typeof n=="string"?n:n(s,u);typeof D=="string"&&(D={type:"text",value:D}),f.push({type:"element",tagName:"a",properties:{href:"#"+t+"fnref-"+m+(u>1?"-"+u:""),dataFootnoteBackref:"",ariaLabel:typeof i=="string"?i:i(s,u),className:["data-footnote-backref"]},children:Array.isArray(D)?D:[D]})}let b=d[d.length-1];if(b&&b.type==="element"&&b.tagName==="p"){let D=b.children[b.children.length-1];D&&D.type==="text"?D.value+=" ":b.children.push({type:"text",value:" "}),b.children.push(...f)}else d.push(...f);let y={type:"element",tagName:"li",properties:{id:t+"fn-"+m},children:e.wrap(d,!0)};e.patch(c,y),a.push(y)}if(a.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...pn(l),id:"footnote-label"},children:[{type:"text",value:r}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(a,!0)},{type:"text",value:`
`}]}}const fr={}.hasOwnProperty,v1={};function b1(e,t){let n=t||v1,i=new Map,r=new Map,o={all:a,applyData:x1,definitionById:i,footnoteById:r,footnoteCounts:new Map,footnoteOrder:[],handlers:{...f1,...n.handlers},one:l,options:n,patch:A1,wrap:F1};return jr(e,function(s){if(s.type==="definition"||s.type==="footnoteDefinition"){let c=s.type==="definition"?i:r,d=String(s.identifier).toUpperCase();c.has(d)||c.set(d,s)}}),o;function l(s,c){let d=s.type,h=o.handlers[d];if(fr.call(o.handlers,d)&&h)return h(o,s,c);if(o.options.passThrough&&o.options.passThrough.includes(d)){if("children"in s){let{children:m,...u}=s,f=pn(u);return f.children=o.all(s),f}return pn(s)}return(o.options.unknownHandler||T1)(o,s,c)}function a(s){let c=[];if("children"in s){let d=s.children,h=-1;for(;++h<d.length;){let m=o.one(d[h],s);if(m){if(h&&d[h-1].type==="break"&&(!Array.isArray(m)&&m.type==="text"&&(m.value=Yl(m.value)),!Array.isArray(m)&&m.type==="element")){let u=m.children[0];u&&u.type==="text"&&(u.value=Yl(u.value))}Array.isArray(m)?c.push(...m):c.push(m)}}}return c}}function A1(e,t){e.position&&(t.position=Yo(e))}function x1(e,t){let n=t;if(e&&e.data){let i=e.data.hName,r=e.data.hChildren,o=e.data.hProperties;typeof i=="string"&&(n.type==="element"?n.tagName=i:n={type:"element",tagName:i,properties:{},children:"children"in n?n.children:[n]}),n.type==="element"&&o&&Object.assign(n.properties,pn(o)),"children"in n&&n.children&&r!=null&&(n.children=r)}return n}function T1(e,t){let n=t.data||{},i="value"in t&&!(fr.call(n,"hProperties")||fr.call(n,"hChildren"))?{type:"text",value:t.value}:{type:"element",tagName:"div",properties:{},children:e.all(t)};return e.patch(t,i),e.applyData(t,i)}function F1(e,t){let n=[],i=-1;for(t&&n.push({type:"text",value:`
`});++i<e.length;)i&&n.push({type:"text",value:`
`}),n.push(e[i]);return t&&e.length>0&&n.push({type:"text",value:`
`}),n}function Yl(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function Jl(e,t){let n=b1(e,t),i=n.one(e,void 0),r=y1(n),o=Array.isArray(i)?{type:"root",children:i}:i||{type:"root",children:[]};return r&&o.children.push({type:"text",value:`
`},r),o}function B1(e,t){return e&&"run"in e?async function(n,i){let r=Jl(n,{file:i,...t});await e.run(r,i)}:function(n,i){return Jl(n,{file:i,...e||t})}}function eo(e){if(e)throw e}var k1=ie(((e,t)=>{var n=Object.prototype.hasOwnProperty,i=Object.prototype.toString,r=Object.defineProperty,o=Object.getOwnPropertyDescriptor,l=function(h){return typeof Array.isArray=="function"?Array.isArray(h):i.call(h)==="[object Array]"},a=function(h){if(!h||i.call(h)!=="[object Object]")return!1;var m=n.call(h,"constructor"),u=h.constructor&&h.constructor.prototype&&n.call(h.constructor.prototype,"isPrototypeOf");if(h.constructor&&!m&&!u)return!1;for(var f in h);return f===void 0||n.call(h,f)},s=function(h,m){r&&m.name==="__proto__"?r(h,m.name,{enumerable:!0,configurable:!0,value:m.newValue,writable:!0}):h[m.name]=m.newValue},c=function(h,m){if(m==="__proto__"){if(!n.call(h,m))return;if(o)return o(h,m).value}return h[m]};t.exports=function d(){var h,m,u,f,A,b,y=arguments[0],D=1,B=arguments.length,L=!1;for(typeof y=="boolean"&&(L=y,y=arguments[1]||{},D=2),(y==null||typeof y!="object"&&typeof y!="function")&&(y={});D<B;++D)if(h=arguments[D],h!=null)for(m in h)u=c(y,m),f=c(h,m),y!==f&&(L&&f&&(a(f)||(A=l(f)))?(A?(A=!1,b=u&&l(u)?u:[]):b=u&&a(u)?u:{},s(y,{name:m,newValue:d(L,b,f)})):f!==void 0&&s(y,{name:m,newValue:f}));return y}}));function pr(e){if(typeof e!="object"||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function w1(){let e=[],t={run:n,use:i};return t;function n(...r){let o=-1,l=r.pop();if(typeof l!="function")throw TypeError("Expected function as last argument, not "+l);a(null,...r);function a(s,...c){let d=e[++o],h=-1;if(s){l(s);return}for(;++h<r.length;)(c[h]===null||c[h]===void 0)&&(c[h]=r[h]);r=c,d?E1(d,a)(...c):l(null,...c)}}function i(r){if(typeof r!="function")throw TypeError("Expected `middelware` to be a function, not "+r);return e.push(r),t}}function E1(e,t){let n;return i;function i(...l){let a=e.length>l.length,s;a&&l.push(r);try{s=e.apply(this,l)}catch(c){let d=c;if(a&&n)throw d;return r(d)}a||(s&&s.then&&typeof s.then=="function"?s.then(o,r):s instanceof Error?r(s):o(s))}function r(l,...a){n||(n=!0,t(l,...a))}function o(l){r(null,l)}}var be=class extends Error{constructor(t,n,i){super(),typeof n=="string"&&(i=n,n=void 0);let r="",o={},l=!1;if(n&&(o="line"in n&&"column"in n||"start"in n&&"end"in n?{place:n}:"type"in n?{ancestors:[n],place:n.position}:{...n}),typeof t=="string"?r=t:!o.cause&&t&&(l=!0,r=t.message,o.cause=t),!o.ruleId&&!o.source&&typeof i=="string"){let s=i.indexOf(":");s===-1?o.ruleId=i:(o.source=i.slice(0,s),o.ruleId=i.slice(s+1))}if(!o.place&&o.ancestors&&o.ancestors){let s=o.ancestors[o.ancestors.length-1];s&&(o.place=s.position)}let a=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=a?a.column:void 0,this.fatal=void 0,this.file,this.message=r,this.line=a?a.line:void 0,this.name=mn(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=l&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual,this.expected,this.note,this.url}};be.prototype.file="",be.prototype.name="",be.prototype.reason="",be.prototype.message="",be.prototype.stack="",be.prototype.column=void 0,be.prototype.line=void 0,be.prototype.ancestors=void 0,be.prototype.cause=void 0,be.prototype.fatal=void 0,be.prototype.place=void 0,be.prototype.ruleId=void 0,be.prototype.source=void 0;const Ge={basename:D1,dirname:C1,extname:R1,join:O1,sep:"/"};function D1(e,t){if(t!==void 0&&typeof t!="string")throw TypeError('"ext" argument must be a string');wn(e);let n=0,i=-1,r=e.length,o;if(t===void 0||t.length===0||t.length>e.length){for(;r--;)if(e.codePointAt(r)===47){if(o){n=r+1;break}}else i<0&&(o=!0,i=r+1);return i<0?"":e.slice(n,i)}if(t===e)return"";let l=-1,a=t.length-1;for(;r--;)if(e.codePointAt(r)===47){if(o){n=r+1;break}}else l<0&&(o=!0,l=r+1),a>-1&&(e.codePointAt(r)===t.codePointAt(a--)?a<0&&(i=r):(a=-1,i=l));return n===i?i=l:i<0&&(i=e.length),e.slice(n,i)}function C1(e){if(wn(e),e.length===0)return".";let t=-1,n=e.length,i;for(;--n;)if(e.codePointAt(n)===47){if(i){t=n;break}}else i||=!0;return t<0?e.codePointAt(0)===47?"/":".":t===1&&e.codePointAt(0)===47?"//":e.slice(0,t)}function R1(e){wn(e);let t=e.length,n=-1,i=0,r=-1,o=0,l;for(;t--;){let a=e.codePointAt(t);if(a===47){if(l){i=t+1;break}continue}n<0&&(l=!0,n=t+1),a===46?r<0?r=t:o!==1&&(o=1):r>-1&&(o=-1)}return r<0||n<0||o===0||o===1&&r===n-1&&r===i+1?"":e.slice(r,n)}function O1(...e){let t=-1,n;for(;++t<e.length;)wn(e[t]),e[t]&&(n=n===void 0?e[t]:n+"/"+e[t]);return n===void 0?".":L1(n)}function L1(e){wn(e);let t=e.codePointAt(0)===47,n=S1(e,!t);return n.length===0&&!t&&(n="."),n.length>0&&e.codePointAt(e.length-1)===47&&(n+="/"),t?"/"+n:n}function S1(e,t){let n="",i=0,r=-1,o=0,l=-1,a,s;for(;++l<=e.length;){if(l<e.length)a=e.codePointAt(l);else{if(a===47)break;a=47}if(a===47){if(!(r===l-1||o===1))if(r!==l-1&&o===2){if(n.length<2||i!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(s=n.lastIndexOf("/"),s!==n.length-1){s<0?(n="",i=0):(n=n.slice(0,s),i=n.length-1-n.lastIndexOf("/")),r=l,o=0;continue}}else if(n.length>0){n="",i=0,r=l,o=0;continue}}t&&(n=n.length>0?n+"/..":"..",i=2)}else n.length>0?n+="/"+e.slice(r+1,l):n=e.slice(r+1,l),i=l-r-1;r=l,o=0}else a===46&&o>-1?o++:o=-1}return n}function wn(e){if(typeof e!="string")throw TypeError("Path must be a string. Received "+JSON.stringify(e))}const N1={cwd:I1};function I1(){return"/"}function gr(e){return!!(typeof e=="object"&&e&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function P1(e){if(typeof e=="string")e=new URL(e);else if(!gr(e)){let t=TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code="ERR_INVALID_ARG_TYPE",t}if(e.protocol!=="file:"){let t=TypeError("The URL must be of scheme file");throw t.code="ERR_INVALID_URL_SCHEME",t}return z1(e)}function z1(e){if(e.hostname!==""){let i=TypeError('File URL host must be "localhost" or empty on darwin');throw i.code="ERR_INVALID_FILE_URL_HOST",i}let t=e.pathname,n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){let i=t.codePointAt(n+2);if(i===70||i===102){let r=TypeError("File URL path must not include encoded / characters");throw r.code="ERR_INVALID_FILE_URL_PATH",r}}return decodeURIComponent(t)}const Ii=["history","path","basename","stem","extname","dirname"];var _1=class{constructor(t){let n;n=t?gr(t)?{path:t}:typeof t=="string"||G1(t)?{value:t}:t:{},this.cwd="cwd"in n?"":N1.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let i=-1;for(;++i<Ii.length;){let o=Ii[i];o in n&&n[o]!==void 0&&n[o]!==null&&(this[o]=o==="history"?[...n[o]]:n[o])}let r;for(r in n)Ii.includes(r)||(this[r]=n[r])}get basename(){return typeof this.path=="string"?Ge.basename(this.path):void 0}set basename(t){zi(t,"basename"),Pi(t,"basename"),this.path=Ge.join(this.dirname||"",t)}get dirname(){return typeof this.path=="string"?Ge.dirname(this.path):void 0}set dirname(t){to(this.basename,"dirname"),this.path=Ge.join(t||"",this.basename)}get extname(){return typeof this.path=="string"?Ge.extname(this.path):void 0}set extname(t){if(Pi(t,"extname"),to(this.dirname,"extname"),t){if(t.codePointAt(0)!==46)throw Error("`extname` must start with `.`");if(t.includes(".",1))throw Error("`extname` cannot contain multiple dots")}this.path=Ge.join(this.dirname,this.stem+(t||""))}get path(){return this.history[this.history.length-1]}set path(t){gr(t)&&(t=P1(t)),zi(t,"path"),this.path!==t&&this.history.push(t)}get stem(){return typeof this.path=="string"?Ge.basename(this.path,this.extname):void 0}set stem(t){zi(t,"stem"),Pi(t,"stem"),this.path=Ge.join(this.dirname||"",t+(this.extname||""))}fail(t,n,i){let r=this.message(t,n,i);throw r.fatal=!0,r}info(t,n,i){let r=this.message(t,n,i);return r.fatal=void 0,r}message(t,n,i){let r=new be(t,n,i);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(t){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(t||void 0).decode(this.value)}};function Pi(e,t){if(e&&e.includes(Ge.sep))throw Error("`"+t+"` cannot be a path: did not expect `"+Ge.sep+"`")}function zi(e,t){if(!e)throw Error("`"+t+"` cannot be empty")}function to(e,t){if(!e)throw Error("Setting `"+t+"` requires `path` to be set too")}function G1(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const M1=(function(e){let t=this.constructor.prototype,n=t[e],i=function(){return n.apply(i,arguments)};return Object.setPrototypeOf(i,t),i});var _i=qe(k1());const j1={}.hasOwnProperty,q1=new class ns extends M1{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=w1()}copy(){let t=new ns,n=-1;for(;++n<this.attachers.length;){let i=this.attachers[n];t.use(...i)}return t.data((0,_i.default)(!0,{},this.namespace)),t}data(t,n){return typeof t=="string"?arguments.length===2?(ji("data",this.frozen),this.namespace[t]=n,this):j1.call(this.namespace,t)&&this.namespace[t]||void 0:t?(ji("data",this.frozen),this.namespace=t,this):this.namespace}freeze(){if(this.frozen)return this;let t=this;for(;++this.freezeIndex<this.attachers.length;){let[n,...i]=this.attachers[this.freezeIndex];if(i[0]===!1)continue;i[0]===!0&&(i[0]=void 0);let r=n.call(t,...i);typeof r=="function"&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=1/0,this}parse(t){this.freeze();let n=Nn(t),i=this.parser||this.Parser;return Gi("parse",i),i(String(n),n)}process(t,n){let i=this;return this.freeze(),Gi("process",this.parser||this.Parser),Mi("process",this.compiler||this.Compiler),n?r(void 0,n):new Promise(r);function r(o,l){let a=Nn(t),s=i.parse(a);i.run(s,a,function(d,h,m){if(d||!h||!m)return c(d);let u=h,f=i.stringify(u,m);$1(f)?m.value=f:m.result=f,c(d,m)});function c(d,h){d||!h?l(d):o?o(h):n(void 0,h)}}}processSync(t){let n=!1,i;return this.freeze(),Gi("processSync",this.parser||this.Parser),Mi("processSync",this.compiler||this.Compiler),this.process(t,r),io("processSync","process",n),i;function r(o,l){n=!0,eo(o),i=l}}run(t,n,i){no(t),this.freeze();let r=this.transformers;return!i&&typeof n=="function"&&(i=n,n=void 0),i?o(void 0,i):new Promise(o);function o(l,a){let s=Nn(n);r.run(t,s,c);function c(d,h,m){let u=h||t;d?a(d):l?l(u):i(void 0,u,m)}}}runSync(t,n){let i=!1,r;return this.run(t,n,o),io("runSync","run",i),r;function o(l,a){eo(l),r=a,i=!0}}stringify(t,n){this.freeze();let i=Nn(n),r=this.compiler||this.Compiler;return Mi("stringify",r),no(t),r(t,i)}use(t,...n){let i=this.attachers,r=this.namespace;if(ji("use",this.frozen),t!=null)if(typeof t=="function")s(t,n);else if(typeof t=="object")Array.isArray(t)?a(t):l(t);else throw TypeError("Expected usable value, not `"+t+"`");return this;function o(c){if(typeof c=="function")s(c,[]);else if(typeof c=="object")if(Array.isArray(c)){let[d,...h]=c;s(d,h)}else l(c);else throw TypeError("Expected usable value, not `"+c+"`")}function l(c){if(!("plugins"in c)&&!("settings"in c))throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");a(c.plugins),c.settings&&(r.settings=(0,_i.default)(!0,r.settings,c.settings))}function a(c){let d=-1;if(c!=null)if(Array.isArray(c))for(;++d<c.length;){let h=c[d];o(h)}else throw TypeError("Expected a list of plugins, not `"+c+"`")}function s(c,d){let h=-1,m=-1;for(;++h<i.length;)if(i[h][0]===c){m=h;break}if(m===-1)i.push([c,...d]);else if(d.length>0){let[u,...f]=d,A=i[m][1];pr(A)&&pr(u)&&(u=(0,_i.default)(!0,A,u)),i[m]=[c,u,...f]}}}}().freeze();function Gi(e,t){if(typeof t!="function")throw TypeError("Cannot `"+e+"` without `parser`")}function Mi(e,t){if(typeof t!="function")throw TypeError("Cannot `"+e+"` without `compiler`")}function ji(e,t){if(t)throw Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function no(e){if(!pr(e)||typeof e.type!="string")throw TypeError("Expected node, got `"+e+"`")}function io(e,t,n){if(!n)throw Error("`"+e+"` finished async. Use `"+t+"` instead")}function Nn(e){return H1(e)?e:new _1(e)}function H1(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function $1(e){return typeof e=="string"||U1(e)}function U1(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}function Se(e,t){if(e===void 0||e==null){let n=typeof t=="function"?t():t;throw Error(n??`Expected defined value, but received ${e}`)}return e}function _(e,t){if(!e)throw Error(t??"Invariant failed")}function is(e){throw Error(`NonExhaustive value: ${e}`)}var rs=qe(Nd());function yr(e,t){return e===t?0:We(e)?We(t)?(0,rs.default)(e,t):1:We(t)?-1:0}function Z1(e=".",t=!1){return(n,i)=>{if(n===i)return 0;if(!n)return-1;if(!i)return 1;let r=n.split(e),o=i.split(e),l=Math.min(r.length,o.length);for(let s=0;s<l;s++){let c=r[s],d=o[s],h=(0,rs.default)(c,d);if(h!==0)return h}let a=r.length-o.length;return t?-1*a:a}}function $r(e){return e!=null&&typeof e=="string"}function hv(e){return!!e&&Array.isArray(e)&&e.length>0}function mv(e,t){return e[t]!=null}function qn(e){let t=e.lastIndexOf(".");return t>0?e.slice(0,t):null}function ls(e){let t=e.lastIndexOf(".");return t>0?e.slice(t+1):e}const un=e=>$r(e)?e:e.id;function ke(e,t){let n=un(e);return t?un(t).startsWith(n+"."):i=>{let r=un(i);return n.startsWith(r+".")}}function Ur(e,t){if(!t)return r=>Ur(e,r);let n=un(e),i=un(t);return n===i||i.startsWith(n+".")||n.startsWith(i+".")}function os(e,t){return n=>ke(e,n)}function ni(e){return($r(e)?e:e.id).split(".").length}function En(e,t){let n=e.split(".");if(n.length<2)return null;let i=t.split(".");if(i.length<2)return null;let r=[];for(let o=0;o<Math.min(n.length,i.length)-1&&n[o]===i[o];o++)r.push(n[o]);return r.length===0?null:r.join(".")}function Gt(e){let t=e.split(".");if(t.pop(),!je(t,2))return t;for(let n=1;n<t.length;n++)t[n]=t[n-1]+"."+t[n];return t.reverse()}function V1(e,t){let n=t;for(let i of e)i!==n&&ke(i,n)&&(n=i);return n===t?null:n}function yn(e){let t=[],n=[...e],i;for(;i=n.shift();){let r;for(;r=V1(n,i);)t.push(...n.splice(n.indexOf(r),1));t.push(i)}return t}function as(e,t){if(!e||$r(e)){let i=e??"asc";return r=>as(r,i)}let n=t==="desc"?-1:1;return e.map(i=>({item:i,fqn:i.id.split(".")})).sort((i,r)=>{if(i.fqn.length!==r.fqn.length)return(i.fqn.length-r.fqn.length)*n;for(let o=0;o<i.fqn.length;o++){let l=yr(i.fqn[o],r.fqn[o]);if(l!==0)return l}return 0}).map(({item:i})=>i)}function Q1(e,t,n){let i=e.get(t);return i||(i=n(t),e.set(t,i)),i}function bt(e,t){let n=t??e;_(ai(n));function*i(r){for(let o of r)n(o)&&(yield o)}return t?i(e):i}function K1(e,t){let n=t??e;_(ai(n));function i(r){for(let o of r)if(n(o))return o}return t?i(e):i}function uv(e,t){let n=e;_(n>=0,"Count must be a non-negative number");function*i(r){let o=0;for(let l of r){if(o>=n)break;yield l,o++}}return t===void 0?r=>i(r):i(e)}function vn(e){return e?ro(e):ro}function ro(e){let{value:t}=e[Symbol.iterator]().next();return t}function W1(e,t){let n=e;_(ai(n));function*i(r){for(let o of r)yield n(o)}return t?i(e):i}function X1(e,t){let n=t??e;_(ai(n));function i(r){for(let o of r)if(n(o))return!0;return!1}return t?i(e):i}function lo(e){return e?Array.from(e):t=>Array.from(t)}function Y1(e){return e?new Set(e):t=>new Set(t)}function Q(e,t,n){let i=typeof t=="symbol"?t:Symbol.for(t);return e.hasOwnProperty(i)||Object.defineProperty(e,i,{enumerable:!1,writable:!1,value:n()}),e[i]}function fv(...e){let t=100;return e.length===2?t=rd(e[0],e[1]):e.length===1&&(t=e[0]),new Promise(n=>{setTimeout(()=>{n("LIKEC4_DELAY")},t??100)})}function vr(...e){let t=new Set;for(let n of e)for(let i of n)t.add(i);return t}function qt(e,...t){let n=new Set;if(e.size===0)return n;let i=je(t,2)?(0,Vo.intersection)(...t):t[0];if(i.size===0)return n;for(let r of e)i.has(r)&&n.add(r);return n}function br(e,t){if(e.size===0)return new Set;if(t.size===0)return new Set(e);let n=new Set;for(let i of e)t.has(i)||n.add(i);return n}function Ar(e,t){return e.size===t.size&&[...e].every(n=>t.has(n))}function J1(e,t){return(0,Vo.symmetricDifference)(e,t)}function pv(e){return _(typeof e=="object"&&$c(e),"objectHash: value must be an object"),jd(e)}function ss(e){let t=5381,n=e.length;_(n>0,"stringHash: empty string");for(let i=0;i<n;i++)t=t*33^e.charCodeAt(i);return(t>>>0).toString(36)}function eg(){return q1().use(q2).use(P2).use(G2).use(B1,{allowDangerousHtml:!0}).use(th,Po({attributes:{"*":["className"],svg:["width","height","viewBox","fill","ariaHidden"],path:["d","fill","stroke","strokeWidth","strokeLinecap","strokeLinejoin"]},tagNames:["svg","g","path","div"]},or)).use(vm,{allowDangerousHtml:!0})}function tg(e){return(""+eg().processSync(e)).trim()}function ng(e){return mi(Ca(e),{includeHtml:!1,includeImageAlt:!1})}const ig={tomato9:"#e54d2e"},rg={red9:"#e5484d"},lg={ruby9:"#e54666"},og={crimson9:"#e93d82"},ag={pink9:"#d6409f"},sg={purple9:"#8e4ec6"},cg={violet9:"#6e56cf"},dg={indigo9:"#3e63dd"},hg={blue9:"#0090ff"},mg={teal9:"#12a594"},ug={grass9:"#46a758"},fg={lime9:"#bdee63"},pg={yellow9:"#ffe629"},gg={amber9:"#ffc53d"},yg={orange9:"#f76b15"},{min:vg,max:bg}=Math;var At=(e,t=0,n=1)=>vg(bg(t,e),n),Zr=e=>{e._clipped=!1,e._unclipped=e.slice(0);for(let t=0;t<=3;t++)t<3?((e[t]<0||e[t]>255)&&(e._clipped=!0),e[t]=At(e[t],0,255)):t===3&&(e[t]=At(e[t],0,1));return e};const cs={};for(let e of["Boolean","Number","String","Function","Array","Date","RegExp","Undefined","Null"])cs[`[object ${e}]`]=e.toLowerCase();function $(e){return cs[Object.prototype.toString.call(e)]||"object"}var j=(e,t=null)=>e.length>=3?Array.prototype.slice.call(e):$(e[0])=="object"&&t?t.split("").filter(n=>e[0][n]!==void 0).map(n=>e[0][n]):e[0].slice(0),Kt=e=>{if(e.length<2)return null;let t=e.length-1;return $(e[t])=="string"?e[t].toLowerCase():null};const{PI:gi,min:ds,max:hs}=Math,Ce=e=>Math.round(e*100)/100,xr=e=>Math.round(e*100)/100,Ke=gi*2,qi=gi/3,Ag=gi/180,xg=180/gi;function ms(e){return[...e.slice(0,3).reverse(),...e.slice(3)]}var M={format:{},autodetect:[]},w=class{constructor(...t){let n=this;if($(t[0])==="object"&&t[0].constructor&&t[0].constructor===this.constructor)return t[0];let i=Kt(t),r=!1;if(!i){r=!0,M.sorted||=(M.autodetect=M.autodetect.sort((o,l)=>l.p-o.p),!0);for(let o of M.autodetect)if(i=o.test(...t),i)break}if(M.format[i])n._rgb=Zr(M.format[i].apply(null,r?t:t.slice(0,-1)));else throw Error("unknown format: "+t);n._rgb.length===3&&n._rgb.push(1)}toString(){return $(this.hex)=="function"?this.hex():`[${this._rgb.join(",")}]`}};const Z=(...e)=>new w(...e);Z.version="3.2.0";const St={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",laserlemon:"#ffff54",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrod:"#fafad2",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",maroon2:"#7f0000",maroon3:"#b03060",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",purple2:"#7f007f",purple3:"#a020f0",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},Tg=/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,Fg=/^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/,us=e=>{if(e.match(Tg)){(e.length===4||e.length===7)&&(e=e.substr(1)),e.length===3&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);let t=parseInt(e,16);return[t>>16,t>>8&255,t&255,1]}if(e.match(Fg)){(e.length===5||e.length===9)&&(e=e.substr(1)),e.length===4&&(e=e.split(""),e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);let t=parseInt(e,16);return[t>>24&255,t>>16&255,t>>8&255,Math.round((t&255)/255*100)/100]}throw Error(`unknown hex color: ${e}`)},{round:In}=Math,fs=(...e)=>{let[t,n,i,r]=j(e,"rgba"),o=Kt(e)||"auto";r===void 0&&(r=1),o==="auto"&&(o=r<1?"rgba":"rgb"),t=In(t),n=In(n),i=In(i);let l="000000"+(t<<16|n<<8|i).toString(16);l=l.substr(l.length-6);let a="0"+In(r*255).toString(16);switch(a=a.substr(a.length-2),o.toLowerCase()){case"rgba":return`#${l}${a}`;case"argb":return`#${a}${l}`;default:return`#${l}`}};w.prototype.name=function(){let e=fs(this._rgb,"rgb");for(let t of Object.keys(St))if(St[t]===e)return t.toLowerCase();return e},M.format.named=e=>{if(e=e.toLowerCase(),St[e])return us(St[e]);throw Error("unknown color name: "+e)},M.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&$(e)==="string"&&St[e.toLowerCase()])return"named"}}),w.prototype.alpha=function(e,t=!1){return e!==void 0&&$(e)==="number"?t?(this._rgb[3]=e,this):new w([this._rgb[0],this._rgb[1],this._rgb[2],e],"rgb"):this._rgb[3]},w.prototype.clipped=function(){return this._rgb._clipped||!1};const Me={Kn:18,labWhitePoint:"d65",Xn:.95047,Yn:1,Zn:1.08883,kE:216/24389,kKE:8,kK:24389/27,RefWhiteRGB:{X:.95047,Y:1,Z:1.08883},MtxRGB2XYZ:{m00:.4124564390896922,m01:.21267285140562253,m02:.0193338955823293,m10:.357576077643909,m11:.715152155287818,m12:.11919202588130297,m20:.18043748326639894,m21:.07217499330655958,m22:.9503040785363679},MtxXYZ2RGB:{m00:3.2404541621141045,m01:-.9692660305051868,m02:.055643430959114726,m10:-1.5371385127977166,m11:1.8760108454466942,m12:-.2040259135167538,m20:-.498531409556016,m21:.041556017530349834,m22:1.0572251882231791},As:.9414285350000001,Bs:1.040417467,Cs:1.089532651,MtxAdaptMa:{m00:.8951,m01:-.7502,m02:.0389,m10:.2664,m11:1.7135,m12:-.0685,m20:-.1614,m21:.0367,m22:1.0296},MtxAdaptMaI:{m00:.9869929054667123,m01:.43230526972339456,m02:-.008528664575177328,m10:-.14705425642099013,m11:.5183602715367776,m12:.04004282165408487,m20:.15996265166373125,m21:.0492912282128556,m22:.9684866957875502}},Bg=new Map([["a",[1.0985,.35585]],["b",[1.0985,.35585]],["c",[.98074,1.18232]],["d50",[.96422,.82521]],["d55",[.95682,.92149]],["d65",[.95047,1.08883]],["e",[1,1,1]],["f2",[.99186,.67393]],["f7",[.95041,1.08747]],["f11",[1.00962,.6435]],["icc",[.96422,.82521]]]);function Xe(e){let t=Bg.get(String(e).toLowerCase());if(!t)throw Error("unknown Lab illuminant "+e);Me.labWhitePoint=e,Me.Xn=t[0],Me.Zn=t[1]}function bn(){return Me.labWhitePoint}const Vr=(...e)=>{e=j(e,"lab");let[t,n,i]=e,[r,o,l]=kg(t,n,i),[a,s,c]=ps(r,o,l);return[a,s,c,e.length>3?e[3]:1]},kg=(e,t,n)=>{let{kE:i,kK:r,kKE:o,Xn:l,Yn:a,Zn:s}=Me,c=(e+16)/116,d=.002*t+c,h=c-.005*n,m=d*d*d,u=h*h*h,f=m>i?m:(116*d-16)/r,A=e>o?((e+16)/116)**3:e/r,b=u>i?u:(116*h-16)/r;return[f*l,A*a,b*s]},Hi=e=>{let t=Math.sign(e);return e=Math.abs(e),(e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055)*t},ps=(e,t,n)=>{let{MtxAdaptMa:i,MtxAdaptMaI:r,MtxXYZ2RGB:o,RefWhiteRGB:l,Xn:a,Yn:s,Zn:c}=Me,d=a*i.m00+s*i.m10+c*i.m20,h=a*i.m01+s*i.m11+c*i.m21,m=a*i.m02+s*i.m12+c*i.m22,u=l.X*i.m00+l.Y*i.m10+l.Z*i.m20,f=l.X*i.m01+l.Y*i.m11+l.Z*i.m21,A=l.X*i.m02+l.Y*i.m12+l.Z*i.m22,b=(e*i.m00+t*i.m10+n*i.m20)*(u/d),y=(e*i.m01+t*i.m11+n*i.m21)*(f/h),D=(e*i.m02+t*i.m12+n*i.m22)*(A/m),B=b*r.m00+y*r.m10+D*r.m20,L=b*r.m01+y*r.m11+D*r.m21,I=b*r.m02+y*r.m12+D*r.m22,F=Hi(B*o.m00+L*o.m10+I*o.m20),S=Hi(B*o.m01+L*o.m11+I*o.m21),x=Hi(B*o.m02+L*o.m12+I*o.m22);return[F*255,S*255,x*255]},Qr=(...e)=>{let[t,n,i,...r]=j(e,"rgb"),[o,l,a]=gs(t,n,i),[s,c,d]=wg(o,l,a);return[s,c,d,...r.length>0&&r[0]<1?[r[0]]:[]]};function wg(e,t,n){let{Xn:i,Yn:r,Zn:o,kE:l,kK:a}=Me,s=e/i,c=t/r,d=n/o,h=s>l?s**(1/3):(a*s+16)/116,m=c>l?c**(1/3):(a*c+16)/116,u=d>l?d**(1/3):(a*d+16)/116;return[116*m-16,500*(h-m),200*(m-u)]}function $i(e){let t=Math.sign(e);return e=Math.abs(e),(e<=.04045?e/12.92:((e+.055)/1.055)**2.4)*t}const gs=(e,t,n)=>{e=$i(e/255),t=$i(t/255),n=$i(n/255);let{MtxRGB2XYZ:i,MtxAdaptMa:r,MtxAdaptMaI:o,Xn:l,Yn:a,Zn:s,As:c,Bs:d,Cs:h}=Me,m=e*i.m00+t*i.m10+n*i.m20,u=e*i.m01+t*i.m11+n*i.m21,f=e*i.m02+t*i.m12+n*i.m22,A=l*r.m00+a*r.m10+s*r.m20,b=l*r.m01+a*r.m11+s*r.m21,y=l*r.m02+a*r.m12+s*r.m22,D=m*r.m00+u*r.m10+f*r.m20,B=m*r.m01+u*r.m11+f*r.m21,L=m*r.m02+u*r.m12+f*r.m22;return D*=A/c,B*=b/d,L*=y/h,m=D*o.m00+B*o.m10+L*o.m20,u=D*o.m01+B*o.m11+L*o.m21,f=D*o.m02+B*o.m12+L*o.m22,[m,u,f]};w.prototype.lab=function(){return Qr(this._rgb)};const Eg=(...e)=>new w(...e,"lab");Object.assign(Z,{lab:Eg,getLabWhitePoint:bn,setLabWhitePoint:Xe}),M.format.lab=Vr,M.autodetect.push({p:2,test:(...e)=>{if(e=j(e,"lab"),$(e)==="array"&&e.length===3)return"lab"}}),w.prototype.darken=function(e=1){let t=this,n=t.lab();return n[0]-=Me.Kn*e,new w(n,"lab").alpha(t.alpha(),!0)},w.prototype.brighten=function(e=1){return this.darken(-e)},w.prototype.darker=w.prototype.darken,w.prototype.brighter=w.prototype.brighten,w.prototype.get=function(e){let[t,n]=e.split("."),i=this[t]();if(n){let r=t.indexOf(n)-(t.substr(0,2)==="ok"?2:0);if(r>-1)return i[r];throw Error(`unknown channel ${n} in mode ${t}`)}else return i};const{pow:Dg}=Math;w.prototype.luminance=function(e,t="rgb"){if(e!==void 0&&$(e)==="number"){if(e===0)return new w([0,0,0,this._rgb[3]],"rgb");if(e===1)return new w([255,255,255,this._rgb[3]],"rgb");let n=this.luminance(),i=20,r=(o,l)=>{let a=o.interpolate(l,.5,t),s=a.luminance();return Math.abs(e-s)<1e-7||!i--?a:s>e?r(o,a):r(a,l)};return new w([...(n>e?r(new w([0,0,0]),this):r(this,new w([255,255,255]))).rgb(),this._rgb[3]])}return Cg(...this._rgb.slice(0,3))};const Cg=(e,t,n)=>(e=Ui(e),t=Ui(t),n=Ui(n),.2126*e+.7152*t+.0722*n),Ui=e=>(e/=255,e<=.03928?e/12.92:Dg((e+.055)/1.055,2.4));var fe={},Ht=(e,t,n=.5,...i)=>{let r=i[0]||"lrgb";if(!fe[r]&&!i.length&&(r=Object.keys(fe)[0]),!fe[r])throw Error(`interpolation mode ${r} is not defined`);return $(e)!=="object"&&(e=new w(e)),$(t)!=="object"&&(t=new w(t)),fe[r](e,t,n).alpha(e.alpha()+n*(t.alpha()-e.alpha()))};w.prototype.mix=w.prototype.interpolate=function(e,t=.5,...n){return Ht(this,e,t,...n)},w.prototype.premultiply=function(e=!1){let t=this._rgb,n=t[3];return e?(this._rgb=[t[0]*n,t[1]*n,t[2]*n,n],this):new w([t[0]*n,t[1]*n,t[2]*n,n],"rgb")};const{sin:Rg,cos:Og}=Math,ys=(...e)=>{let[t,n,i]=j(e,"lch");return isNaN(i)&&(i=0),i*=Ag,[t,Og(i)*n,Rg(i)*n]},Kr=(...e)=>{e=j(e,"lch");let[t,n,i]=e,[r,o,l]=ys(t,n,i),[a,s,c]=Vr(r,o,l);return[a,s,c,e.length>3?e[3]:1]},Lg=(...e)=>Kr(...ms(j(e,"hcl"))),{sqrt:Sg,atan2:Ng,round:Ig}=Math,vs=(...e)=>{let[t,n,i]=j(e,"lab"),r=Sg(n*n+i*i),o=(Ng(i,n)*xg+360)%360;return Ig(r*1e4)===0&&(o=NaN),[t,r,o]},Tr=(...e)=>{let[t,n,i,...r]=j(e,"rgb"),[o,l,a]=Qr(t,n,i),[s,c,d]=vs(o,l,a);return[s,c,d,...r.length>0&&r[0]<1?[r[0]]:[]]};w.prototype.lch=function(){return Tr(this._rgb)},w.prototype.hcl=function(){return ms(Tr(this._rgb))};const Pg=(...e)=>new w(...e,"lch"),zg=(...e)=>new w(...e,"hcl");Object.assign(Z,{lch:Pg,hcl:zg}),M.format.lch=Kr,M.format.hcl=Lg,["lch","hcl"].forEach(e=>M.autodetect.push({p:2,test:(...t)=>{if(t=j(t,e),$(t)==="array"&&t.length===3)return e}})),w.prototype.saturate=function(e=1){let t=this,n=t.lch();return n[1]+=Me.Kn*e,n[1]<0&&(n[1]=0),new w(n,"lch").alpha(t.alpha(),!0)},w.prototype.desaturate=function(e=1){return this.saturate(-e)},w.prototype.set=function(e,t,n=!1){let[i,r]=e.split("."),o=this[i]();if(r){let l=i.indexOf(r)-(i.substr(0,2)==="ok"?2:0);if(l>-1){if($(t)=="string")switch(t.charAt(0)){case"+":o[l]+=+t;break;case"-":o[l]+=+t;break;case"*":o[l]*=+t.substr(1);break;case"/":o[l]/=+t.substr(1);break;default:o[l]=+t}else if($(t)==="number")o[l]=t;else throw Error("unsupported value for Color.set");let a=new w(o,i);return n?(this._rgb=a._rgb,this):a}throw Error(`unknown channel ${r} in mode ${i}`)}else return o},w.prototype.tint=function(e=.5,...t){return Ht(this,"white",e,...t)},w.prototype.shade=function(e=.5,...t){return Ht(this,"black",e,...t)};const _g=(e,t,n)=>{let i=e._rgb,r=t._rgb;return new w(i[0]+n*(r[0]-i[0]),i[1]+n*(r[1]-i[1]),i[2]+n*(r[2]-i[2]),"rgb")};fe.rgb=_g;const{sqrt:Zi,pow:Ct}=Math,Gg=(e,t,n)=>{let[i,r,o]=e._rgb,[l,a,s]=t._rgb;return new w(Zi(Ct(i,2)*(1-n)+Ct(l,2)*n),Zi(Ct(r,2)*(1-n)+Ct(a,2)*n),Zi(Ct(o,2)*(1-n)+Ct(s,2)*n),"rgb")};fe.lrgb=Gg;const Mg=(e,t,n)=>{let i=e.lab(),r=t.lab();return new w(i[0]+n*(r[0]-i[0]),i[1]+n*(r[1]-i[1]),i[2]+n*(r[2]-i[2]),"lab")};fe.lab=Mg;var Wt=(e,t,n,i)=>{let r,o;i==="hsl"?(r=e.hsl(),o=t.hsl()):i==="hsv"?(r=e.hsv(),o=t.hsv()):i==="hcg"?(r=e.hcg(),o=t.hcg()):i==="hsi"?(r=e.hsi(),o=t.hsi()):i==="lch"||i==="hcl"?(i="hcl",r=e.hcl(),o=t.hcl()):i==="oklch"&&(r=e.oklch().reverse(),o=t.oklch().reverse());let l,a,s,c,d,h;(i.substr(0,1)==="h"||i==="oklch")&&([l,s,d]=r,[a,c,h]=o);let m,u,f,A;return!isNaN(l)&&!isNaN(a)?(A=a>l&&a-l>180?a-(l+360):a<l&&l-a>180?a+360-l:a-l,u=l+n*A):isNaN(l)?isNaN(a)?u=NaN:(u=a,(d==1||d==0)&&i!="hsv"&&(m=c)):(u=l,(h==1||h==0)&&i!="hsv"&&(m=s)),m===void 0&&(m=s+n*(c-s)),f=d+n*(h-d),i==="oklch"?new w([f,m,u],i):new w([u,m,f],i)};const oo=(e,t,n)=>Wt(e,t,n,"lch");fe.lch=oo,fe.hcl=oo;const jg=e=>{if($(e)=="number"&&e>=0&&e<=16777215)return[e>>16,e>>8&255,e&255,1];throw Error("unknown num color: "+e)},qg=(...e)=>{let[t,n,i]=j(e,"rgb");return(t<<16)+(n<<8)+i};w.prototype.num=function(){return qg(this._rgb)};const Hg=(...e)=>new w(...e,"num");Object.assign(Z,{num:Hg}),M.format.num=jg,M.autodetect.push({p:5,test:(...e)=>{if(e.length===1&&$(e[0])==="number"&&e[0]>=0&&e[0]<=16777215)return"num"}});const $g=(e,t,n)=>{let i=e.num();return new w(i+n*(t.num()-i),"num")};fe.num=$g;const{floor:Ug}=Math,Zg=(...e)=>{e=j(e,"hcg");let[t,n,i]=e,r,o,l;i*=255;let a=n*255;if(n===0)r=o=l=i;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;let s=Ug(t),c=t-s,d=i*(1-n),h=d+a*(1-c),m=d+a*c,u=d+a;switch(s){case 0:[r,o,l]=[u,m,d];break;case 1:[r,o,l]=[h,u,d];break;case 2:[r,o,l]=[d,u,m];break;case 3:[r,o,l]=[d,h,u];break;case 4:[r,o,l]=[m,d,u];break;case 5:[r,o,l]=[u,d,h];break}}return[r,o,l,e.length>3?e[3]:1]},Vg=(...e)=>{let[t,n,i]=j(e,"rgb"),r=ds(t,n,i),o=hs(t,n,i),l=o-r,a=l*100/255,s=r/(255-l)*100,c;return l===0?c=NaN:(t===o&&(c=(n-i)/l),n===o&&(c=2+(i-t)/l),i===o&&(c=4+(t-n)/l),c*=60,c<0&&(c+=360)),[c,a,s]};w.prototype.hcg=function(){return Vg(this._rgb)};const Qg=(...e)=>new w(...e,"hcg");Z.hcg=Qg,M.format.hcg=Zg,M.autodetect.push({p:1,test:(...e)=>{if(e=j(e,"hcg"),$(e)==="array"&&e.length===3)return"hcg"}});const Kg=(e,t,n)=>Wt(e,t,n,"hcg");fe.hcg=Kg;const{cos:Rt}=Math,Wg=(...e)=>{e=j(e,"hsi");let[t,n,i]=e,r,o,l;return isNaN(t)&&(t=0),isNaN(n)&&(n=0),t>360&&(t-=360),t<0&&(t+=360),t/=360,t<1/3?(l=(1-n)/3,r=(1+n*Rt(Ke*t)/Rt(qi-Ke*t))/3,o=1-(l+r)):t<2/3?(t-=1/3,r=(1-n)/3,o=(1+n*Rt(Ke*t)/Rt(qi-Ke*t))/3,l=1-(r+o)):(t-=2/3,o=(1-n)/3,l=(1+n*Rt(Ke*t)/Rt(qi-Ke*t))/3,r=1-(o+l)),r=At(i*r*3),o=At(i*o*3),l=At(i*l*3),[r*255,o*255,l*255,e.length>3?e[3]:1]},{min:Xg,sqrt:Yg,acos:Jg}=Math,e0=(...e)=>{let[t,n,i]=j(e,"rgb");t/=255,n/=255,i/=255;let r,o=Xg(t,n,i),l=(t+n+i)/3,a=l>0?1-o/l:0;return a===0?r=NaN:(r=(t-n+(t-i))/2,r/=Yg((t-n)*(t-n)+(t-i)*(n-i)),r=Jg(r),i>n&&(r=Ke-r),r/=Ke),[r*360,a,l]};w.prototype.hsi=function(){return e0(this._rgb)};const t0=(...e)=>new w(...e,"hsi");Z.hsi=t0,M.format.hsi=Wg,M.autodetect.push({p:2,test:(...e)=>{if(e=j(e,"hsi"),$(e)==="array"&&e.length===3)return"hsi"}});const n0=(e,t,n)=>Wt(e,t,n,"hsi");fe.hsi=n0;const Fr=(...e)=>{e=j(e,"hsl");let[t,n,i]=e,r,o,l;if(n===0)r=o=l=i*255;else{let a=[0,0,0],s=[0,0,0],c=i<.5?i*(1+n):i+n-i*n,d=2*i-c,h=t/360;a[0]=h+1/3,a[1]=h,a[2]=h-1/3;for(let m=0;m<3;m++)a[m]<0&&(a[m]+=1),a[m]>1&&--a[m],6*a[m]<1?s[m]=d+(c-d)*6*a[m]:2*a[m]<1?s[m]=c:3*a[m]<2?s[m]=d+(c-d)*(2/3-a[m])*6:s[m]=d;[r,o,l]=[s[0]*255,s[1]*255,s[2]*255]}return e.length>3?[r,o,l,e[3]]:[r,o,l,1]},bs=(...e)=>{e=j(e,"rgba");let[t,n,i]=e;t/=255,n/=255,i/=255;let r=ds(t,n,i),o=hs(t,n,i),l=(o+r)/2,a,s;return o===r?(a=0,s=NaN):a=l<.5?(o-r)/(o+r):(o-r)/(2-o-r),t==o?s=(n-i)/(o-r):n==o?s=2+(i-t)/(o-r):i==o&&(s=4+(t-n)/(o-r)),s*=60,s<0&&(s+=360),e.length>3&&e[3]!==void 0?[s,a,l,e[3]]:[s,a,l]};w.prototype.hsl=function(){return bs(this._rgb)};const i0=(...e)=>new w(...e,"hsl");Z.hsl=i0,M.format.hsl=Fr,M.autodetect.push({p:2,test:(...e)=>{if(e=j(e,"hsl"),$(e)==="array"&&e.length===3)return"hsl"}});const r0=(e,t,n)=>Wt(e,t,n,"hsl");fe.hsl=r0;const{floor:l0}=Math,o0=(...e)=>{e=j(e,"hsv");let[t,n,i]=e,r,o,l;if(i*=255,n===0)r=o=l=i;else{t===360&&(t=0),t>360&&(t-=360),t<0&&(t+=360),t/=60;let a=l0(t),s=t-a,c=i*(1-n),d=i*(1-n*s),h=i*(1-n*(1-s));switch(a){case 0:[r,o,l]=[i,h,c];break;case 1:[r,o,l]=[d,i,c];break;case 2:[r,o,l]=[c,i,h];break;case 3:[r,o,l]=[c,d,i];break;case 4:[r,o,l]=[h,c,i];break;case 5:[r,o,l]=[i,c,d];break}}return[r,o,l,e.length>3?e[3]:1]},{min:a0,max:s0}=Math,c0=(...e)=>{e=j(e,"rgb");let[t,n,i]=e,r=a0(t,n,i),o=s0(t,n,i),l=o-r,a,s,c;return c=o/255,o===0?(a=NaN,s=0):(s=l/o,t===o&&(a=(n-i)/l),n===o&&(a=2+(i-t)/l),i===o&&(a=4+(t-n)/l),a*=60,a<0&&(a+=360)),[a,s,c]};w.prototype.hsv=function(){return c0(this._rgb)};const d0=(...e)=>new w(...e,"hsv");Z.hsv=d0,M.format.hsv=o0,M.autodetect.push({p:2,test:(...e)=>{if(e=j(e,"hsv"),$(e)==="array"&&e.length===3)return"hsv"}});const h0=(e,t,n)=>Wt(e,t,n,"hsv");fe.hsv=h0;function ii(e,t){let n=e.length;Array.isArray(e[0])||(e=[e]),Array.isArray(t[0])||(t=t.map(l=>[l]));let i=t[0].length,r=t[0].map((l,a)=>t.map(s=>s[a])),o=e.map(l=>r.map(a=>Array.isArray(l)?l.reduce((s,c,d)=>s+c*(a[d]||0),0):a.reduce((s,c)=>s+c*l,0)));return n===1&&(o=o[0]),i===1?o.map(l=>l[0]):o}const Wr=(...e)=>{e=j(e,"lab");let[t,n,i,...r]=e,[o,l,a]=m0([t,n,i]),[s,c,d]=ps(o,l,a);return[s,c,d,...r.length>0&&r[0]<1?[r[0]]:[]]};function m0(e){return ii([[1.2268798758459243,-.5578149944602171,.2813910456659647],[-.0405757452148008,1.112286803280317,-.0717110580655164],[-.0763729366746601,-.4214933324022432,1.5869240198367816]],ii([[1,.3963377773761749,.2158037573099136],[1,-.1055613458156586,-.0638541728258133],[1,-.0894841775298119,-1.2914855480194092]],e).map(t=>t**3))}const Xr=(...e)=>{let[t,n,i,...r]=j(e,"rgb");return[...u0(gs(t,n,i)),...r.length>0&&r[0]<1?[r[0]]:[]]};function u0(e){return ii([[.210454268309314,.7936177747023054,-.0040720430116193],[1.9779985324311684,-2.42859224204858,.450593709617411],[.0259040424655478,.7827717124575296,-.8086757549230774]],ii([[.819022437996703,.3619062600528904,-.1288737815209879],[.0329836539323885,.9292868615863434,.0361446663506424],[.0481771893596242,.2642395317527308,.6335478284694309]],e).map(t=>Math.cbrt(t)))}w.prototype.oklab=function(){return Xr(this._rgb)};const f0=(...e)=>new w(...e,"oklab");Object.assign(Z,{oklab:f0}),M.format.oklab=Wr,M.autodetect.push({p:2,test:(...e)=>{if(e=j(e,"oklab"),$(e)==="array"&&e.length===3)return"oklab"}});const p0=(e,t,n)=>{let i=e.oklab(),r=t.oklab();return new w(i[0]+n*(r[0]-i[0]),i[1]+n*(r[1]-i[1]),i[2]+n*(r[2]-i[2]),"oklab")};fe.oklab=p0;const g0=(e,t,n)=>Wt(e,t,n,"oklch");fe.oklch=g0;const{pow:Vi,sqrt:Qi,PI:Ki,cos:ao,sin:so,atan2:y0}=Math;var v0=(e,t="lrgb",n=null)=>{let i=e.length;n||=Array.from(Array(i)).map(()=>1);let r=i/n.reduce(function(h,m){return h+m});if(n.forEach((h,m)=>{n[m]*=r}),e=e.map(h=>new w(h)),t==="lrgb")return b0(e,n);let o=e.shift(),l=o.get(t),a=[],s=0,c=0;for(let h=0;h<l.length;h++)if(l[h]=(l[h]||0)*n[0],a.push(isNaN(l[h])?0:n[0]),t.charAt(h)==="h"&&!isNaN(l[h])){let m=l[h]/180*Ki;s+=ao(m)*n[0],c+=so(m)*n[0]}let d=o.alpha()*n[0];e.forEach((h,m)=>{let u=h.get(t);d+=h.alpha()*n[m+1];for(let f=0;f<l.length;f++)if(!isNaN(u[f]))if(a[f]+=n[m+1],t.charAt(f)==="h"){let A=u[f]/180*Ki;s+=ao(A)*n[m+1],c+=so(A)*n[m+1]}else l[f]+=u[f]*n[m+1]});for(let h=0;h<l.length;h++)if(t.charAt(h)==="h"){let m=y0(c/a[h],s/a[h])/Ki*180;for(;m<0;)m+=360;for(;m>=360;)m-=360;l[h]=m}else l[h]=l[h]/a[h];return d/=i,new w(l,t).alpha(d>.99999?1:d,!0)};const b0=(e,t)=>{let n=e.length,i=[0,0,0,0];for(let r=0;r<e.length;r++){let o=e[r],l=t[r]/n,a=o._rgb;i[0]+=Vi(a[0],2)*l,i[1]+=Vi(a[1],2)*l,i[2]+=Vi(a[2],2)*l,i[3]+=a[3]*l}return i[0]=Qi(i[0]),i[1]=Qi(i[1]),i[2]=Qi(i[2]),i[3]>.9999999&&(i[3]=1),new w(Zr(i))},{pow:A0}=Math;function ri(e){let t="rgb",n=Z("#ccc"),i=0,r=[0,1],o=[0,1],l=[],a=[0,0],s=!1,c=[],d=!1,h=0,m=1,u=!1,f={},A=!0,b=1,y=function(x){if(x||=["#fff","#000"],x&&$(x)==="string"&&Z.brewer&&Z.brewer[x.toLowerCase()]&&(x=Z.brewer[x.toLowerCase()]),$(x)==="array"){x.length===1&&(x=[x[0],x[0]]),x=x.slice(0);for(let O=0;O<x.length;O++)x[O]=Z(x[O]);l.length=0;for(let O=0;O<x.length;O++)l.push(O/(x.length-1))}return F(),c=x},D=function(x){if(s!=null){let O=s.length-1,v=0;for(;v<O&&x>=s[v];)v++;return v-1}return 0},B=x=>x,L=x=>x,I=function(x,O){let v,k;if(O??=!1,isNaN(x)||x===null)return n;k=O?x:s&&s.length>2?D(x)/(s.length-2):m===h?1:(x-h)/(m-h),k=L(k),O||(k=B(k)),b!==1&&(k=A0(k,b)),k=a[0]+k*(1-a[0]-a[1]),k=At(k,0,1);let C=Math.floor(k*1e4);if(A&&f[C])v=f[C];else{if($(c)==="array")for(let N=0;N<l.length;N++){let H=l[N];if(k<=H){v=c[N];break}if(k>=H&&N===l.length-1){v=c[N];break}if(k>H&&k<l[N+1]){k=(k-H)/(l[N+1]-H),v=Z.interpolate(c[N],c[N+1],k,t);break}}else $(c)==="function"&&(v=c(k));A&&(f[C]=v)}return v};var F=()=>f={};y(e);let S=function(x){let O=Z(I(x));return d&&O[d]?O[d]():O};return S.classes=function(x){if(x!=null){if($(x)==="array")s=x,r=[x[0],x[x.length-1]];else{let O=Z.analyze(r);s=x===0?[O.min,O.max]:Z.limits(O,"e",x)}return S}return s},S.domain=function(x){if(!arguments.length)return o;o=x.slice(0),h=x[0],m=x[x.length-1],l=[];let O=c.length;if(x.length===O&&h!==m)for(let v of Array.from(x))l.push((v-h)/(m-h));else{for(let v=0;v<O;v++)l.push(v/(O-1));if(x.length>2){let v=x.map((C,N)=>N/(x.length-1)),k=x.map(C=>(C-h)/(m-h));k.every((C,N)=>v[N]===C)||(L=C=>{if(C<=0||C>=1)return C;let N=0;for(;C>=k[N+1];)N++;let H=(C-k[N])/(k[N+1]-k[N]);return v[N]+H*(v[N+1]-v[N])})}}return r=[h,m],S},S.mode=function(x){return arguments.length?(t=x,F(),S):t},S.range=function(x,O){return y(x),S},S.out=function(x){return d=x,S},S.spread=function(x){return arguments.length?(i=x,S):i},S.correctLightness=function(x){return x??=!0,u=x,F(),B=u?function(O){let v=I(0,!0).lab()[0],k=I(1,!0).lab()[0],C=v>k,N=I(O,!0).lab()[0],H=v+(k-v)*O,q=N-H,ee=0,te=1,pe=20;for(;Math.abs(q)>.01&&pe-- >0;)(function(){return C&&(q*=-1),q<0?(ee=O,O+=(te-O)*.5):(te=O,O+=(ee-O)*.5),N=I(O,!0).lab()[0],q=N-H})();return O}:O=>O,S},S.padding=function(x){return x==null?a:($(x)==="number"&&(x=[x,x]),a=x,S)},S.colors=function(x,O){arguments.length<2&&(O="hex");let v=[];if(arguments.length===0)v=c.slice(0);else if(x===1)v=[S(.5)];else if(x>1){let k=r[0],C=r[1]-k;v=x0(0,x).map(N=>S(k+N/(x-1)*C))}else{e=[];let k=[];if(s&&s.length>2)for(let C=1,N=s.length,H=1<=N;H?C<N:C>N;H?C++:C--)k.push((s[C-1]+s[C])*.5);else k=r;v=k.map(C=>S(C))}return Z[O]&&(v=v.map(k=>k[O]())),v},S.cache=function(x){return x==null?A:(A=x,S)},S.gamma=function(x){return x==null?b:(b=x,S)},S.nodata=function(x){return x==null?n:(n=Z(x),S)},S}function x0(e,t,n){let i=[],r=e<t,o=t;for(let l=e;r?l<o:l>o;r?l++:l--)i.push(l);return i}const T0=function(e){let t=[1,1];for(let n=1;n<e;n++){let i=[1];for(let r=1;r<=t.length;r++)i[r]=(t[r]||0)+t[r-1];t=i}return t},F0=function(e){let t,n,i,r;if(e=e.map(o=>new w(o)),e.length===2)[n,i]=e.map(o=>o.lab()),t=function(o){return new w([0,1,2].map(l=>n[l]+o*(i[l]-n[l])),"lab")};else if(e.length===3)[n,i,r]=e.map(o=>o.lab()),t=function(o){return new w([0,1,2].map(l=>(1-o)*(1-o)*n[l]+2*(1-o)*o*i[l]+o*o*r[l]),"lab")};else if(e.length===4){let o;[n,i,r,o]=e.map(l=>l.lab()),t=function(l){return new w([0,1,2].map(a=>(1-l)*(1-l)*(1-l)*n[a]+3*(1-l)*(1-l)*l*i[a]+3*(1-l)*l*l*r[a]+l*l*l*o[a]),"lab")}}else if(e.length>=5){let o,l,a;o=e.map(s=>s.lab()),a=e.length-1,l=T0(a),t=function(s){let c=1-s;return new w([0,1,2].map(d=>o.reduce((h,m,u)=>h+l[u]*c**(a-u)*s**u*m[d],0)),"lab")}}else throw RangeError("No point in running bezier with only one color.");return t};var B0=e=>{let t=F0(e);return t.scale=()=>ri(t),t};const{round:co}=Math;w.prototype.rgb=function(e=!0){return e===!1?this._rgb.slice(0,3):this._rgb.slice(0,3).map(co)},w.prototype.rgba=function(e=!0){return this._rgb.slice(0,4).map((t,n)=>n<3?e===!1?t:co(t):t)};const k0=(...e)=>new w(...e,"rgb");Object.assign(Z,{rgb:k0}),M.format.rgb=(...e)=>{let t=j(e,"rgba");return t[3]===void 0&&(t[3]=1),t},M.autodetect.push({p:3,test:(...e)=>{if(e=j(e,"rgba"),$(e)==="array"&&(e.length===3||e.length===4&&$(e[3])=="number"&&e[3]>=0&&e[3]<=1))return"rgb"}});const Le=(e,t,n)=>{if(!Le[n])throw Error("unknown blend mode "+n);return Le[n](e,t)},ot=e=>(t,n)=>{let i=Z(n).rgb(),r=Z(t).rgb();return Z.rgb(e(i,r))},at=e=>(t,n)=>{let i=[];return i[0]=e(t[0],n[0]),i[1]=e(t[1],n[1]),i[2]=e(t[2],n[2]),i},w0=e=>e,E0=(e,t)=>e*t/255,D0=(e,t)=>e>t?t:e,C0=(e,t)=>e>t?e:t,R0=(e,t)=>255*(1-(1-e/255)*(1-t/255)),O0=(e,t)=>t<128?2*e*t/255:255*(1-2*(1-e/255)*(1-t/255)),L0=(e,t)=>255*(1-(1-t/255)/(e/255)),S0=(e,t)=>e===255?255:(e=t/255*255/(1-e/255),e>255?255:e);Le.normal=ot(at(w0)),Le.multiply=ot(at(E0)),Le.screen=ot(at(R0)),Le.overlay=ot(at(O0)),Le.darken=ot(at(D0)),Le.lighten=ot(at(C0)),Le.dodge=ot(at(S0)),Le.burn=ot(at(L0));const{pow:N0,sin:I0,cos:P0}=Math;function z0(e=300,t=-1.5,n=1,i=1,r=[0,1]){let o=0,l;$(r)==="array"?l=r[1]-r[0]:(l=0,r=[r,r]);let a=function(s){let c=Ke*((e+120)/360+t*s),d=N0(r[0]+l*s,i),h=(o===0?n:n[0]+s*o)*d*(1-d)/2,m=P0(c),u=I0(c),f=d+h*(-.14861*m+1.78277*u),A=d+h*(-.29227*m-.90649*u),b=d+1.97294*m*h;return Z(Zr([f*255,A*255,b*255,1]))};return a.start=function(s){return s==null?e:(e=s,a)},a.rotations=function(s){return s==null?t:(t=s,a)},a.gamma=function(s){return s==null?i:(i=s,a)},a.hue=function(s){return s==null?n:(n=s,$(n)==="array"?(o=n[1]-n[0],o===0&&(n=n[1])):o=0,a)},a.lightness=function(s){return s==null?r:($(s)==="array"?(r=s,l=s[1]-s[0]):(r=[s,s],l=0),a)},a.scale=()=>Z.scale(a),a.hue(n),a}const{floor:_0,random:G0}=Math;var M0=(e=G0)=>{let t="#";for(let n=0;n<6;n++)t+="0123456789abcdef".charAt(_0(e()*16));return new w(t,"hex")};const{log:ho,pow:j0,floor:q0,abs:H0}=Math;function As(e,t=null){let n={min:Number.MAX_VALUE,max:Number.MAX_VALUE*-1,sum:0,values:[],count:0};return $(e)==="object"&&(e=Object.values(e)),e.forEach(i=>{t&&$(i)==="object"&&(i=i[t]),i!=null&&!isNaN(i)&&(n.values.push(i),n.sum+=i,i<n.min&&(n.min=i),i>n.max&&(n.max=i),n.count+=1)}),n.domain=[n.min,n.max],n.limits=(i,r)=>xs(n,i,r),n}function xs(e,t="equal",n=7){$(e)=="array"&&(e=As(e));let{min:i,max:r}=e,o=e.values.sort((a,s)=>a-s);if(n===1)return[i,r];let l=[];if(t.substr(0,1)==="c"&&(l.push(i),l.push(r)),t.substr(0,1)==="e"){l.push(i);for(let a=1;a<n;a++)l.push(i+a/n*(r-i));l.push(r)}else if(t.substr(0,1)==="l"){if(i<=0)throw Error("Logarithmic scales are only possible for values > 0");let a=Math.LOG10E*ho(i),s=Math.LOG10E*ho(r);l.push(i);for(let c=1;c<n;c++)l.push(j0(10,a+c/n*(s-a)));l.push(r)}else if(t.substr(0,1)==="q"){l.push(i);for(let a=1;a<n;a++){let s=(o.length-1)*a/n,c=q0(s);if(c===s)l.push(o[c]);else{let d=s-c;l.push(o[c]*(1-d)+o[c+1]*d)}}l.push(r)}else if(t.substr(0,1)==="k"){let a,s=o.length,c=Array(s),d=Array(n),h=!0,m=0,u=null;u=[],u.push(i);for(let b=1;b<n;b++)u.push(i+b/n*(r-i));for(u.push(r);h;){for(let y=0;y<n;y++)d[y]=0;for(let y=0;y<s;y++){let D=o[y],B=Number.MAX_VALUE,L;for(let I=0;I<n;I++){let F=H0(u[I]-D);F<B&&(B=F,L=I),d[L]++,c[y]=L}}let b=Array(n);for(let y=0;y<n;y++)b[y]=null;for(let y=0;y<s;y++)a=c[y],b[a]===null?b[a]=o[y]:b[a]+=o[y];for(let y=0;y<n;y++)b[y]*=1/d[y];h=!1;for(let y=0;y<n;y++)if(b[y]!==u[y]){h=!0;break}u=b,m++,m>200&&(h=!1)}let f={};for(let b=0;b<n;b++)f[b]=[];for(let b=0;b<s;b++)a=c[b],f[a].push(o[b]);let A=[];for(let b=0;b<n;b++)A.push(f[b][0]),A.push(f[b][f[b].length-1]);A=A.sort((b,y)=>b-y),l.push(A[0]);for(let b=1;b<A.length;b+=2){let y=A[b];!isNaN(y)&&l.indexOf(y)===-1&&l.push(y)}}return l}var $0=(e,t)=>{e=new w(e),t=new w(t);let n=e.luminance(),i=t.luminance();return n>i?(n+.05)/(i+.05):(i+.05)/(n+.05)};const mo=.027,uo=1.14,Pn=.022;var U0=(e,t)=>{e=new w(e),t=new w(t),e.alpha()<1&&(e=Ht(t,e,e.alpha(),"rgb"));let n=fo(...e.rgb()),i=fo(...t.rgb()),r=n>=Pn?n:n+(Pn-n)**1.414,o=i>=Pn?i:i+(Pn-i)**1.414,l=o**.56-r**.57,a=o**.65-r**.62,s=Math.abs(o-r)<5e-4?0:r<o?l*uo:a*uo;return(Math.abs(s)<.1?0:s>0?s-mo:s+mo)*100};function fo(e,t,n){return .2126729*(e/255)**2.4+.7151522*(t/255)**2.4+.072175*(n/255)**2.4}const{sqrt:Ze,pow:re,min:Z0,max:V0,atan2:po,abs:go,cos:zn,sin:yo,exp:Q0,PI:vo}=Math;function K0(e,t,n=1,i=1,r=1){var o=function(Te){return 360*Te/(2*vo)},l=function(Te){return 2*vo*Te/360};e=new w(e),t=new w(t);let[a,s,c]=Array.from(e.lab()),[d,h,m]=Array.from(t.lab()),u=(a+d)/2,f=(Ze(re(s,2)+re(c,2))+Ze(re(h,2)+re(m,2)))/2,A=.5*(1-Ze(re(f,7)/(re(f,7)+re(25,7)))),b=s*(1+A),y=h*(1+A),D=Ze(re(b,2)+re(c,2)),B=Ze(re(y,2)+re(m,2)),L=(D+B)/2,I=o(po(c,b)),F=o(po(m,y)),S=I>=0?I:I+360,x=F>=0?F:F+360,O=go(S-x)>180?(S+x+360)/2:(S+x)/2,v=1-.17*zn(l(O-30))+.24*zn(l(2*O))+.32*zn(l(3*O+6))-.2*zn(l(4*O-63)),k=x-S;k=go(k)<=180?k:x<=S?k+360:k-360,k=2*Ze(D*B)*yo(l(k)/2);let C=d-a,N=B-D,H=1+.015*re(u-50,2)/Ze(20+re(u-50,2)),q=1+.045*L,ee=1+.015*L*v,te=30*Q0(-re((O-275)/25,2)),pe=-(2*Ze(re(L,7)/(re(L,7)+re(25,7))))*yo(2*l(te));return V0(0,Z0(100,Ze(re(C/(n*H),2)+re(N/(i*q),2)+re(k/(r*ee),2)+pe*(N/(i*q))*(k/(r*ee)))))}function W0(e,t,n="lab"){e=new w(e),t=new w(t);let i=e.get(n),r=t.get(n),o=0;for(let l in i){let a=(i[l]||0)-(r[l]||0);o+=a*a}return Math.sqrt(o)}var X0=(...e)=>{try{return new w(...e),!0}catch{return!1}},Y0={cool(){return ri([Z.hsl(180,1,.9),Z.hsl(250,.7,.4)])},hot(){return ri(["#000","#f00","#ff0","#fff"]).mode("rgb")}};const Br={OrRd:["#fff7ec","#fee8c8","#fdd49e","#fdbb84","#fc8d59","#ef6548","#d7301f","#b30000","#7f0000"],PuBu:["#fff7fb","#ece7f2","#d0d1e6","#a6bddb","#74a9cf","#3690c0","#0570b0","#045a8d","#023858"],BuPu:["#f7fcfd","#e0ecf4","#bfd3e6","#9ebcda","#8c96c6","#8c6bb1","#88419d","#810f7c","#4d004b"],Oranges:["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#a63603","#7f2704"],BuGn:["#f7fcfd","#e5f5f9","#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#006d2c","#00441b"],YlOrBr:["#ffffe5","#fff7bc","#fee391","#fec44f","#fe9929","#ec7014","#cc4c02","#993404","#662506"],YlGn:["#ffffe5","#f7fcb9","#d9f0a3","#addd8e","#78c679","#41ab5d","#238443","#006837","#004529"],Reds:["#fff5f0","#fee0d2","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#a50f15","#67000d"],RdPu:["#fff7f3","#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"],Greens:["#f7fcf5","#e5f5e0","#c7e9c0","#a1d99b","#74c476","#41ab5d","#238b45","#006d2c","#00441b"],YlGnBu:["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"],Purples:["#fcfbfd","#efedf5","#dadaeb","#bcbddc","#9e9ac8","#807dba","#6a51a3","#54278f","#3f007d"],GnBu:["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],Greys:["#ffffff","#f0f0f0","#d9d9d9","#bdbdbd","#969696","#737373","#525252","#252525","#000000"],YlOrRd:["#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#e31a1c","#bd0026","#800026"],PuRd:["#f7f4f9","#e7e1ef","#d4b9da","#c994c7","#df65b0","#e7298a","#ce1256","#980043","#67001f"],Blues:["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"],PuBuGn:["#fff7fb","#ece2f0","#d0d1e6","#a6bddb","#67a9cf","#3690c0","#02818a","#016c59","#014636"],Viridis:["#440154","#482777","#3f4a8a","#31678e","#26838f","#1f9d8a","#6cce5a","#b6de2b","#fee825"],Spectral:["#9e0142","#d53e4f","#f46d43","#fdae61","#fee08b","#ffffbf","#e6f598","#abdda4","#66c2a5","#3288bd","#5e4fa2"],RdYlGn:["#a50026","#d73027","#f46d43","#fdae61","#fee08b","#ffffbf","#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"],RdBu:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"],PiYG:["#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#f7f7f7","#e6f5d0","#b8e186","#7fbc41","#4d9221","#276419"],PRGn:["#40004b","#762a83","#9970ab","#c2a5cf","#e7d4e8","#f7f7f7","#d9f0d3","#a6dba0","#5aae61","#1b7837","#00441b"],RdYlBu:["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"],BrBG:["#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1","#35978f","#01665e","#003c30"],RdGy:["#67001f","#b2182b","#d6604d","#f4a582","#fddbc7","#ffffff","#e0e0e0","#bababa","#878787","#4d4d4d","#1a1a1a"],PuOr:["#7f3b08","#b35806","#e08214","#fdb863","#fee0b6","#f7f7f7","#d8daeb","#b2abd2","#8073ac","#542788","#2d004b"],Set2:["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"],Accent:["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],Set1:["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"],Set3:["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"],Dark2:["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"],Paired:["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"],Pastel2:["#b3e2cd","#fdcdac","#cbd5e8","#f4cae4","#e6f5c9","#fff2ae","#f1e2cc","#cccccc"],Pastel1:["#fbb4ae","#b3cde3","#ccebc5","#decbe4","#fed9a6","#ffffcc","#e5d8bd","#fddaec","#f2f2f2"]},Ts=Object.keys(Br),bo=new Map(Ts.map(e=>[e.toLowerCase(),e])),J0=typeof Proxy=="function"?new Proxy(Br,{get(e,t){let n=t.toLowerCase();if(bo.has(n))return e[bo.get(n)]},getOwnPropertyNames(){return Object.getOwnPropertyNames(Ts)}}):Br,ey=(...e)=>{e=j(e,"cmyk");let[t,n,i,r]=e,o=e.length>4?e[4]:1;return r===1?[0,0,0,o]:[t>=1?0:255*(1-t)*(1-r),n>=1?0:255*(1-n)*(1-r),i>=1?0:255*(1-i)*(1-r),o]},{max:Ao}=Math,ty=(...e)=>{let[t,n,i]=j(e,"rgb");t/=255,n/=255,i/=255;let r=1-Ao(t,Ao(n,i)),o=r<1?1/(1-r):0;return[(1-t-r)*o,(1-n-r)*o,(1-i-r)*o,r]};w.prototype.cmyk=function(){return ty(this._rgb)};const ny=(...e)=>new w(...e,"cmyk");Object.assign(Z,{cmyk:ny}),M.format.cmyk=ey,M.autodetect.push({p:2,test:(...e)=>{if(e=j(e,"cmyk"),$(e)==="array"&&e.length===4)return"cmyk"}});const iy=(...e)=>{let t=j(e,"hsla"),n=Kt(e)||"lsa";return t[0]=Ce(t[0]||0)+"deg",t[1]=Ce(t[1]*100)+"%",t[2]=Ce(t[2]*100)+"%",n==="hsla"||t.length>3&&t[3]<1?(t[3]="/ "+(t.length>3?t[3]:1),n="hsla"):t.length=3,`${n.substr(0,3)}(${t.join(" ")})`},ry=(...e)=>{let t=j(e,"lab"),n=Kt(e)||"lab";return t[0]=Ce(t[0])+"%",t[1]=Ce(t[1]),t[2]=Ce(t[2]),n==="laba"||t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`lab(${t.join(" ")})`},ly=(...e)=>{let t=j(e,"lch"),n=Kt(e)||"lab";return t[0]=Ce(t[0])+"%",t[1]=Ce(t[1]),t[2]=isNaN(t[2])?"none":Ce(t[2])+"deg",n==="lcha"||t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`lch(${t.join(" ")})`},oy=(...e)=>{let t=j(e,"lab");return t[0]=Ce(t[0]*100)+"%",t[1]=xr(t[1]),t[2]=xr(t[2]),t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`oklab(${t.join(" ")})`},Fs=(...e)=>{let[t,n,i,...r]=j(e,"rgb"),[o,l,a]=Xr(t,n,i),[s,c,d]=vs(o,l,a);return[s,c,d,...r.length>0&&r[0]<1?[r[0]]:[]]},ay=(...e)=>{let t=j(e,"lch");return t[0]=Ce(t[0]*100)+"%",t[1]=xr(t[1]),t[2]=isNaN(t[2])?"none":Ce(t[2])+"deg",t.length>3&&t[3]<1?t[3]="/ "+(t.length>3?t[3]:1):t.length=3,`oklch(${t.join(" ")})`},{round:Wi}=Math,sy=(...e)=>{let t=j(e,"rgba"),n=Kt(e)||"rgb";if(n.substr(0,3)==="hsl")return iy(bs(t),n);if(n.substr(0,3)==="lab"){let i=bn();Xe("d50");let r=ry(Qr(t),n);return Xe(i),r}if(n.substr(0,3)==="lch"){let i=bn();Xe("d50");let r=ly(Tr(t),n);return Xe(i),r}return n.substr(0,5)==="oklab"?oy(Xr(t)):n.substr(0,5)==="oklch"?ay(Fs(t)):(t[0]=Wi(t[0]),t[1]=Wi(t[1]),t[2]=Wi(t[2]),(n==="rgba"||t.length>3&&t[3]<1)&&(t[3]="/ "+(t.length>3?t[3]:1),n="rgba"),`${n.substr(0,3)}(${t.slice(0,n==="rgb"?3:4).join(" ")})`)},Bs=(...e)=>{e=j(e,"lch");let[t,n,i,...r]=e,[o,l,a]=ys(t,n,i),[s,c,d]=Wr(o,l,a);return[s,c,d,...r.length>0&&r[0]<1?[r[0]]:[]]},Ye="((?:-?\\d+)|(?:-?\\d+(?:\\.\\d+)?)%|none)",Pe="((?:-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)%?)|none)",li="((?:-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)%)|none)",Yr="\\s*,\\s*",yi="((?:-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:deg)?)|none)",Xt="\\s*(?:\\/\\s*((?:[01]|[01]?\\.\\d+)|\\d+(?:\\.\\d+)?%))?",ks=RegExp("^rgba?\\(\\s*"+[Ye,Ye,Ye].join("\\s+")+Xt+"\\)$"),ws=RegExp("^rgb\\(\\s*"+[Ye,Ye,Ye].join(Yr)+"\\s*\\)$"),Es=RegExp("^rgba\\(\\s*"+[Ye,Ye,Ye,Pe].join(Yr)+"\\s*\\)$"),Ds=RegExp("^hsla?\\(\\s*"+[yi,li,li].join("\\s+")+Xt+"\\)$"),Cs=RegExp("^hsl?\\(\\s*"+[yi,li,li].join(Yr)+"\\s*\\)$"),Rs=/^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/,Os=RegExp("^lab\\(\\s*"+[Pe,Pe,Pe].join("\\s+")+Xt+"\\)$"),Ls=RegExp("^lch\\(\\s*"+[Pe,Pe,yi].join("\\s+")+Xt+"\\)$"),Ss=RegExp("^oklab\\(\\s*"+[Pe,Pe,Pe].join("\\s+")+Xt+"\\)$"),Ns=RegExp("^oklch\\(\\s*"+[Pe,Pe,yi].join("\\s+")+Xt+"\\)$"),{round:Is}=Math,Ot=e=>e.map((t,n)=>n<=2?At(Is(t),0,255):t),le=(e,t=0,n=100,i=!1)=>(typeof e=="string"&&e.endsWith("%")&&(e=parseFloat(e.substring(0,e.length-1))/100,e=i?t+(e+1)*.5*(n-t):t+e*(n-t)),+e),ge=(e,t)=>e==="none"?t:e,kr=e=>{if(e=e.toLowerCase().trim(),e==="transparent")return[0,0,0,0];let t;if(M.format.named)try{return M.format.named(e)}catch{}if((t=e.match(ks))||(t=e.match(ws))){let n=t.slice(1,4);for(let r=0;r<3;r++)n[r]=+le(ge(n[r],0),0,255);n=Ot(n);let i=t[4]===void 0?1:+le(t[4],0,1);return n[3]=i,n}if(t=e.match(Es)){let n=t.slice(1,5);for(let i=0;i<4;i++)n[i]=+le(n[i],0,255);return n}if((t=e.match(Ds))||(t=e.match(Cs))){let n=t.slice(1,4);n[0]=+ge(n[0].replace("deg",""),0),n[1]=le(ge(n[1],0),0,100)*.01,n[2]=le(ge(n[2],0),0,100)*.01;let i=Ot(Fr(n));return i[3]=t[4]===void 0?1:+le(t[4],0,1),i}if(t=e.match(Rs)){let n=t.slice(1,4);n[1]*=.01,n[2]*=.01;let i=Fr(n);for(let r=0;r<3;r++)i[r]=Is(i[r]);return i[3]=+t[4],i}if(t=e.match(Os)){let n=t.slice(1,4);n[0]=le(ge(n[0],0),0,100),n[1]=le(ge(n[1],0),-125,125,!0),n[2]=le(ge(n[2],0),-125,125,!0);let i=bn();Xe("d50");let r=Ot(Vr(n));return Xe(i),r[3]=t[4]===void 0?1:+le(t[4],0,1),r}if(t=e.match(Ls)){let n=t.slice(1,4);n[0]=le(n[0],0,100),n[1]=le(ge(n[1],0),0,150,!1),n[2]=+ge(n[2].replace("deg",""),0);let i=bn();Xe("d50");let r=Ot(Kr(n));return Xe(i),r[3]=t[4]===void 0?1:+le(t[4],0,1),r}if(t=e.match(Ss)){let n=t.slice(1,4);n[0]=le(ge(n[0],0),0,1),n[1]=le(ge(n[1],0),-.4,.4,!0),n[2]=le(ge(n[2],0),-.4,.4,!0);let i=Ot(Wr(n));return i[3]=t[4]===void 0?1:+le(t[4],0,1),i}if(t=e.match(Ns)){let n=t.slice(1,4);n[0]=le(ge(n[0],0),0,1),n[1]=le(ge(n[1],0),0,.4,!1),n[2]=+ge(n[2].replace("deg",""),0);let i=Ot(Bs(n));return i[3]=t[4]===void 0?1:+le(t[4],0,1),i}};kr.test=e=>ks.test(e)||Ds.test(e)||Os.test(e)||Ls.test(e)||Ss.test(e)||Ns.test(e)||ws.test(e)||Es.test(e)||Cs.test(e)||Rs.test(e)||e==="transparent",w.prototype.css=function(e){return sy(this._rgb,e)};const cy=(...e)=>new w(...e,"css");Z.css=cy,M.format.css=kr,M.autodetect.push({p:5,test:(e,...t)=>{if(!t.length&&$(e)==="string"&&kr.test(e))return"css"}}),M.format.gl=(...e)=>{let t=j(e,"rgba");return t[0]*=255,t[1]*=255,t[2]*=255,t};const dy=(...e)=>new w(...e,"gl");Z.gl=dy,w.prototype.gl=function(){let e=this._rgb;return[e[0]/255,e[1]/255,e[2]/255,e[3]]},w.prototype.hex=function(e){return fs(this._rgb,e)};const hy=(...e)=>new w(...e,"hex");Z.hex=hy,M.format.hex=us,M.autodetect.push({p:4,test:(e,...t)=>{if(!t.length&&$(e)==="string"&&[3,4,5,6,7,8,9].indexOf(e.length)>=0)return"hex"}});const{log:_n}=Math,Ps=e=>{let t=e/100,n,i,r;return t<66?(n=255,i=t<6?0:-155.25485562709179-.44596950469579133*(i=t-2)+104.49216199393888*_n(i),r=t<20?0:-254.76935184120902+.8274096064007395*(r=t-10)+115.67994401066147*_n(r)):(n=351.97690566805693+.114206453784165*(n=t-55)-40.25366309332127*_n(n),i=325.4494125711974+.07943456536662342*(i=t-50)-28.0852963507957*_n(i),r=255),[n,i,r,1]},{round:my}=Math,uy=(...e)=>{let t=j(e,"rgb"),n=t[0],i=t[2],r=1e3,o=4e4,l;for(;o-r>.4;){l=(o+r)*.5;let a=Ps(l);a[2]/a[0]>=i/n?o=l:r=l}return my(l)};w.prototype.temp=w.prototype.kelvin=w.prototype.temperature=function(){return uy(this._rgb)};const Xi=(...e)=>new w(...e,"temp");Object.assign(Z,{temp:Xi,kelvin:Xi,temperature:Xi}),M.format.temp=M.format.kelvin=M.format.temperature=Ps,w.prototype.oklch=function(){return Fs(this._rgb)};const fy=(...e)=>new w(...e,"oklch");Object.assign(Z,{oklch:fy}),M.format.oklch=Bs,M.autodetect.push({p:2,test:(...e)=>{if(e=j(e,"oklch"),$(e)==="array"&&e.length===3)return"oklch"}}),Object.assign(Z,{analyze:As,average:v0,bezier:B0,blend:Le,brewer:J0,Color:w,colors:St,contrast:$0,contrastAPCA:U0,cubehelix:z0,deltaE:K0,distance:W0,input:M,interpolate:Ht,limits:xs,mix:Ht,random:M0,scale:ri,scales:Y0,valid:X0});var De=Z;const wr=[.96,.907,.805,.697,.605,.547,.518,.445,.395,.34],xo=[.32,.16,.08,.04,0,0,.04,.08,.16,.32];function py(e){let t=e.get("hsl.l");return wr.reduce((n,i)=>Math.abs(i-t)<Math.abs(n-t)?i:n)}function gy(e){let t=De(e),n=py(t),i=wr.findIndex(o=>o===n),r=wr.map(o=>t.set("hsl.l",o)).map(o=>De(o)).map((o,l)=>{let a=xo[l]-xo[i];return a>=0?o.saturate(a):o.desaturate(a*-1)});return r[i]=De(e),{baseColorIndex:i,colors:r}}function yy(e){return gy(e).colors.map(t=>t.hex())}function Jr(e){return ed(e,t=>t===void 0)}function $t(e){return e.summary??e.description}function Ut(e){return e.description??e.summary}function To(e,t){return e[yt]===t}const yt="_stage",rn="_type",Er="_layout";Fn({DeploymentFqn:()=>Fy,EdgeId:()=>Ey,Fqn:()=>Ty,GlobalFqn:()=>el,GroupElementKind:()=>zs,MarkdownOrString:()=>by,NodeId:()=>wy,NoneIcon:()=>xy,ProjectId:()=>vy,RelationId:()=>ky,StepEdgeKind:()=>Cy,ViewId:()=>By,extractStep:()=>js,flattenMarkdownOrString:()=>Ay,isGlobalFqn:()=>Gs,isGroupElementKind:()=>_s,isStepEdgeId:()=>vi,splitGlobalFqn:()=>Ms,stepEdgeId:()=>Dy});function vy(e){return e}function by(e){return typeof e=="string"?{txt:e}:e}function Ay(e){if(Mt(e))return null;let t=We(e)?e:e.txt??e.md;return Ne(t?.trim())?t:null}const xy="none";function Ty(e,t){return t?t+"."+e:e}const zs="@group";function _s(e){return e.kind===zs}function Fy(e,t){return t?t+"."+e:e}function By(e){return e}function ky(e){return e}function el(e,t){return _(typeof e=="string"&&e!=""),"@"+e+"."+t}function Gs(e){return e.startsWith("@")}function Ms(e){if(!e.startsWith("@"))return[null,e];let t=e.indexOf(".");if(t<2)throw Error("Invalid global FQN");return[e.slice(1,t),e.slice(t+1)]}function wy(e){return e}function Ey(e){return e}function Dy(e,t){let n=`step-${String(e).padStart(2,"0")}`;return t?`${n}.${t}`:n}const Cy="@step";function vi(e){return e.startsWith("step-")}function js(e){if(!vi(e))throw Error(`Invalid step edge id: ${e}`);return parseFloat(e.slice(5))}let Tt;(function(e){function t(s){return"model"in s&&!("project"in s)}e.isElementRef=t;function n(s){return"project"in s&&"model"in s}e.isImportRef=n;function i(s){if(We(s))throw Error(`Expected FqnRef, got: "${s}"`);if(n(s))return el(s.project,s.model);if(t(s))return s.model;throw Error("Expected FqnRef.ModelRef or FqnRef.ImportRef")}e.flatten=i;function r(s){return t(s)||n(s)}e.isModelRef=r;function o(s){return"deployment"in s&&"element"in s}e.isInsideInstanceRef=o;function l(s){return"deployment"in s&&!("element"in s)}e.isDeploymentElementRef=l;function a(s){return l(s)||o(s)}e.isDeploymentRef=a})(Tt||={});let ln;(function(e){function t(d){return"wildcard"in d&&d.wildcard===!0}e.isWildcard=t;function n(d){return"ref"in d&&Tt.isModelRef(d.ref)}e.isModelRef=n;function i(d){return"ref"in d&&Tt.isDeploymentRef(d.ref)}e.isDeploymentRef=i;function r(d){return"elementKind"in d&&"isEqual"in d}e.isElementKindExpr=r;function o(d){return"elementTag"in d&&"isEqual"in d}e.isElementTagExpr=o;function l(d){return"where"in d&&s(d.where.expr)}e.isWhere=l;function a(d){return"custom"in d&&(s(d.custom.expr)||l(d.custom.expr))}e.isCustom=a;function s(d){return t(d)||n(d)||i(d)||r(d)||o(d)}e.is=s;function c(d){return a(d)&&(d=d.custom.expr),l(d)&&(d=d.where.expr),d}e.unwrap=c})(ln||={});let on;(function(e){function t(c){return"source"in c&&"target"in c}e.isDirect=t;function n(c){return"incoming"in c}e.isIncoming=n;function i(c){return"outgoing"in c}e.isOutgoing=i;function r(c){return"inout"in c}e.isInOut=r;function o(c){return"where"in c&&(t(c.where.expr)||n(c.where.expr)||i(c.where.expr)||r(c.where.expr))}e.isWhere=o;function l(c){return"customRelation"in c}e.isCustom=l;function a(c){return t(c)||n(c)||i(c)||r(c)}e.is=a;function s(c){return l(c)&&(c=c.customRelation.expr),o(c)&&(c=c.where.expr),c}e.unwrap=s})(on||={});let Ry;(function(e){function t(l){return"where"in l}e.isWhere=t;function n(l){return on.isWhere(l)}e.isRelationWhere=n;function i(l){return ln.isWhere(l)}e.isFqnExprWhere=i;function r(l){return ln.is(l)||ln.isWhere(l)||ln.isCustom(l)}e.isFqnExpr=r;function o(l){return on.is(l)||on.isWhere(l)||on.isCustom(l)}e.isRelation=o})(Ry||={});let an;(function(e){function t(c){return"wildcard"in c&&c.wildcard===!0}e.isWildcard=t;function n(c){return"ref"in c&&Tt.isModelRef(c.ref)}e.isModelRef=n;function i(c){return"elementKind"in c&&"isEqual"in c}e.isElementKindExpr=i;function r(c){return"elementTag"in c&&"isEqual"in c}e.isElementTagExpr=r;function o(c){return"where"in c&&a(c.where.expr)}e.isWhere=o;function l(c){return"custom"in c&&(a(c.custom.expr)||o(c.custom.expr))}e.isCustom=l;function a(c){return t(c)||n(c)||i(c)||r(c)}e.is=a;function s(c){return l(c)&&(c=c.custom.expr),o(c)&&(c=c.where.expr),c}e.unwrap=s})(an||={});let sn;(function(e){function t(c){return"source"in c&&"target"in c}e.isDirect=t;function n(c){return"incoming"in c}e.isIncoming=n;function i(c){return"outgoing"in c}e.isOutgoing=i;function r(c){return"inout"in c}e.isInOut=r;function o(c){return"where"in c&&(t(c.where.expr)||n(c.where.expr)||i(c.where.expr)||r(c.where.expr))}e.isWhere=o;function l(c){return"customRelation"in c}e.isCustom=l;function a(c){return t(c)||n(c)||i(c)||r(c)}e.is=a;function s(c){return l(c)&&(c=c.customRelation.expr),o(c)&&(c=c.where.expr),c}e.unwrap=s})(sn||={});let Oy;(function(e){function t(l){return"where"in l}e.isWhere=t;function n(l){return sn.isWhere(l)}e.isRelationWhere=n;function i(l){return an.isWhere(l)}e.isFqnExprWhere=i;function r(l){return an.is(l)||an.isWhere(l)||an.isCustom(l)}e.isFqnExpr=r;function o(l){return sn.is(l)||sn.isWhere(l)||sn.isCustom(l)}e.isRelationExpr=o})(Oy||={});function Ly(e){return Ne(e.kind)&&!Ne(e.element)}const Fo={fill:"#3b82f6",stroke:"#2563eb",hiContrast:"#eff6ff",loContrast:"#bfdbfe"},Bo={fill:"#0284c7",stroke:"#0369a1",hiContrast:"#f0f9ff",loContrast:"#B6ECF7"},ko={fill:"#64748b",stroke:"#475569",hiContrast:"#f8fafc",loContrast:"#cbd5e1"},Sy={primary:Fo,blue:Fo,secondary:Bo,sky:Bo,muted:ko,slate:ko,gray:{fill:"#737373",stroke:"#525252",hiContrast:"#fafafa",loContrast:"#d4d4d4"},red:{fill:"#AC4D39",stroke:"#853A2D",hiContrast:"#FBD3CB",loContrast:"#f5b2a3"},green:{fill:"#428a4f",stroke:"#2d5d39",hiContrast:"#f8fafc",loContrast:"#c2f0c2"},amber:{fill:"#A35829",stroke:"#7E451D",hiContrast:"#FFE0C2",loContrast:"#f9b27c"},indigo:{fill:"#6366f1",stroke:"#4f46e5",hiContrast:"#eef2ff",loContrast:"#c7d2fe"}},Ny={line:"#8D8D8D",labelBg:"#18191B",label:"#C9C9C9"},wo={line:"#64748b",labelBg:"#0f172a",label:"#cbd5e1"},Eo={line:"#3b82f6",labelBg:"#172554",label:"#60a5fa"},Do={line:"#0ea5e9",labelBg:"#082f49",label:"#38bdf8"},Iy={amber:{line:"#b45309",labelBg:"#78350f",label:"#FFE0C2"},blue:Eo,gray:Ny,green:{line:"#15803d",labelBg:"#052e16",label:"#22c55e"},indigo:{line:"#6366f1",labelBg:"#1e1b4b",label:"#818cf8"},muted:wo,primary:Eo,red:{line:"#AC4D39",labelBg:"#b91c1c",label:"#f5b2a3"},secondary:Do,sky:Do,slate:wo},Py={sizes:{xs:{width:180,height:100},sm:{width:240,height:135},md:{width:320,height:180},lg:{width:420,height:234},xl:{width:520,height:290}},spacing:{xs:8,sm:10,md:16,lg:24,xl:32},textSizes:{xs:13.33,sm:16,md:19.2,lg:23.04,xl:27.65},iconSizes:{xs:24,sm:36,md:60,lg:82,xl:90}},yv=["rectangle","person","browser","mobile","cylinder","storage","queue","bucket","document","component"],zy=["amber","blue","gray","slate","green","indigo","muted","primary","red","secondary","sky"],vv=["tomato","grass","blue","ruby","orange","indigo","pink","teal","purple","amber","crimson","red","lime","yellow","violet"],qs={tomato:ig.tomato9,grass:ug.grass9,blue:hg.blue9,ruby:lg.ruby9,orange:yg.orange9,indigo:dg.indigo9,pink:ag.pink9,teal:mg.teal9,purple:sg.purple9,amber:gg.amber9,crimson:og.crimson9,red:rg.red9,lime:fg.lime9,yellow:pg.yellow9,violet:cg.violet9};function _y(e){return e in qs}const Gy={colors:zy.reduce((e,t)=>(e[t]={elements:Sy[t],relationships:Iy[t]},e),{}),...Py};function My(e){_(De.valid(e),`Invalid color: ${e}`);let t=yy(e),n=t[6],i=jy(n);return{elements:{fill:n,stroke:t[7],...i},relationships:{line:t[4],label:t[3],labelBg:t[9]}}}function jy(e){let t=De(e),n=t.brighten(2),i=t.darken(2),r,o,l,a;do r=n,o=i,n=n.brighten(1),i=i.darken(1),l=De.contrastAPCA(t,n),a=De.contrastAPCA(t,i);while(Math.abs(l)<60&&Math.abs(a)<60&&(!Pt(n,r)||!Pt(i,o)));return Math.abs(l)>Math.abs(a)?{hiContrast:n.brighten(.4).hex(),loContrast:n.hex()}:{hiContrast:i.darken(.4).hex(),loContrast:i.hex()}}function qy(e,t){let n=t??6,i=De(e.fill),r=De(e.stroke),o=i.luminance()>.8,l=ze(dd(De.scale(o?[i.darken(.02).desaturate(.05),i.darken(.1).desaturate(.1)]:[i.shade(.12,"lch").desaturate(.05),i.shade(.35,"lch").desaturate(.4)]).mode("oklch").correctLightness().colors(n,null),De.scale(o?[r.darken(.04).desaturate(.05),r.darken(.12).desaturate(.1)]:[r.shade(.15,"lch").desaturate(.08),r.shade(.4,"lch").desaturate(.4)]).mode("oklch").correctLightness().colors(n,null)),fn(([a,s])=>({...e,fill:a.hex(),stroke:s.hex()})));return _(l.length===n,`Expected ${n} colors, got ${l.length}`),l}const Hy={color:"primary",size:"md",opacity:15,shape:"rectangle",group:{opacity:15,border:"dashed"},relationship:{color:"gray",line:"dashed",arrow:"normal"}},$y=Gy,Hn={theme:$y,defaults:Hy};var Uy=class Dr{theme;defaults;static DEFAULT=new Dr(Hn);static from(t,n){if(!t&&!n)return this.DEFAULT;let{customCss:i,theme:r,defaults:o}={...t},l=Po({theme:r},{defaults:{...o}},{theme:{colors:{...n}}},Hn);return Mt(i?.content)&&Pt(l,Hn)?this.DEFAULT:new Dr(l,i)}constructor(t,n){this.config=t,this.customCss=n,this.theme=t.theme,this.defaults=t.defaults}get elementColors(){return this.theme.colors[this.defaults.color].elements}get relationshipColors(){return this.theme.colors[this.defaults.relationship.color].relationships}get groupColors(){let t=this.defaults.group?.color;if(!t)return this.elementColors;if(!this.isThemeColor(t))throw Error(`Default group color not found in theme: ${t}`);return Q(this,"defaultGroup",()=>({...this.elementColors,...this.theme.colors[t].elements}))}isDefaultColor(t){return t===this.defaults.color}colors(t){return this.computeFrom(t??=this.defaults.color)}compoundColorsCache=new Nr.default(t=>new de.default(n=>qy(t,n)));colorsForCompounds(t,n){return this.compoundColorsCache.get(t).get(n??6)}fontSize(t){return t??=this.defaults.text??this.defaults.size,this.theme.textSizes[t]}padding(t){return t??=this.defaults.padding??this.defaults.size,this.theme.spacing[t]}iconSize(t){return t??=this.defaults.size,this.theme.iconSizes[t]}isThemeColor(t){return t in this.theme.colors}nodeSizes(t){let n=Zy(t,this.defaults.size);return{sizes:n,values:{sizes:this.theme.sizes[n.size],padding:this.padding(n.padding),textSize:this.fontSize(n.textSize),iconSize:this.iconSize(n.iconSize)}}}computeFrom(t){if(this.isThemeColor(t))return this.theme.colors[t];if(!De.valid(t))throw Error(`Invalid color value: "${t}" (not a theme color and not a valid CSS color)`);return My(t)}equals(t){return t===this?!0:this.constructor===t.constructor?Pt(this.config,t.config)&&Pt(this.customCss??null,t.customCss??null):!1}tagColor(t){return this.isThemeColor(t)?this.theme.colors[t].elements:_y(t)?this.computeFrom(qs[t]).elements:this.computeFrom(t).elements}};function Zy({size:e,padding:t,textSize:n,iconSize:i,...r},o=Hn.defaults.size){return e??=o,n??=e,t??=e,i??=e,{...r,size:e,padding:t,textSize:n,iconSize:i}}function bv(e){let t=typeof e=="string"?e:e.color;return t.startsWith("#")||t.startsWith("rgb")}function Vy(e){return"tag"in e}function Qy(e){return"kind"in e}function Ky(e){return"participant"in e}function Wy(e){return"not"in e}function Xy(e){return"and"in e}function Yy(e){return"or"in e}function It(e){switch(!0){case Ky(e):{let t=e.participant;return Jy(t,It(e.operator))}case Vy(e):{if(We(e.tag)||"eq"in e.tag){let n=We(e.tag)?e.tag:e.tag.eq;return i=>Array.isArray(i.tags)&&i.tags.includes(n)}let t=e.tag.neq;return n=>!Array.isArray(n.tags)||!n.tags.includes(t)}case Qy(e):{if(We(e.kind)||"eq"in e.kind){let n=We(e.kind)?e.kind:e.kind.eq;return i=>i.kind===n}let t=e.kind.neq;return n=>ne(n.kind)||n.kind!==t}case Wy(e):return Mo(It(e.not));case Xy(e):return Tc(e.and.map(It));case Yy(e):return Bc(e.or.map(It));default:is(e)}}function Jy(e,t){return n=>{if(!n.source||!n.target)return!1;switch(e){case"source":return t(n.source);case"target":return t(n.target)}}}function e5(e){return e._type==="element"}function t5(e){return e._type==="dynamic"}function Av(e){return vi(e)&&e.includes(".")?e.slice(0,e.indexOf(".")+1):null}const n5=Symbol.for("text"),i5=Symbol.for("html");var xe=class me{static mdcache=new yl.default(500);static txtcache=new yl.default(500);static getOrCreateFromText(t){if(t=t.trimEnd(),t==="")return me.EMPTY;let n=me.txtcache.get(t);return n||(n=new me({txt:t}),me.txtcache.set(t,n),n)}static getOrCreateFromMarkdown(t){if(t=t.trimEnd(),t==="")return me.EMPTY;let n=me.mdcache.get(t);return n||(n=new me({md:t}),me.mdcache.set(t,n),n)}static memoize(t,n,i){return Q(t,n,()=>me.from(i))}static from(t){return t==null||t===me.EMPTY?me.EMPTY:t instanceof me?t:typeof t=="string"?this.getOrCreateFromText(t):"isEmpty"in t&&t.isEmpty?me.EMPTY:"md"in t?this.getOrCreateFromMarkdown(t.md):this.getOrCreateFromText(t.txt)}static EMPTY=new class extends me{isEmpty=!0;nonEmpty=!1;isMarkdown=!1;$source=null;constructor(){super({txt:""})}get text(){return null}get md(){return null}get html(){return null}};$source;isEmpty;nonEmpty;isMarkdown;constructor(t){this.isMarkdown=!1,typeof t=="string"?(this.$source={txt:t},this.isEmpty=t.trim()===""):(this.$source=t,this.isEmpty=!0,"md"in t?(this.isEmpty=t.md==="",this.isMarkdown=!0):this.isEmpty=t.txt===""),this.nonEmpty=!this.isEmpty}get text(){if(this.isEmpty||this.$source===null)return"";let t=this.$source;return"txt"in t?t.txt:Q(this,n5,()=>ng(t.md))}get md(){if(this.isEmpty||this.$source===null)return"";let t=this.$source;if("md"in t)return t.md;if("txt"in t)return t.txt;is(t)}get html(){if(this.isEmpty||this.$source===null)return"";let t=this.$source;return"txt"in t?t.txt:Q(this,i5,()=>tg(t.md))}equals(t){return this===t?!0:t instanceof me?this.isEmpty&&t.isEmpty?!0:this.isEmpty!==t.isEmpty||this.isMarkdown!==t.isMarkdown?!1:this.isMarkdown?this.$source?.md===t.$source?.md:this.$source?.txt===t.$source?.txt:!1}};function r5(e){return Array.isArray(e)&&e.length===2&&typeof e[0]=="number"&&typeof e[1]=="number"}function xv(e){return r5(e)?{x:e[0],y:e[1]}:[e.x,e.y]}const Tv={center({x:e,y:t,width:n,height:i}){return{x:e+n/2,y:t+i/2}},toPoints({x:e,y:t,width:n,height:i}){return[{x:e,y:t},{x:e+n,y:t},{x:e+n,y:t+i},{x:e,y:t+i}]},fromPoints(e){let{x1:t,y1:n,x2:i,y2:r}=l5.fromPoints(e);return{x:t,y:n,width:i-t,height:r-n}},merge(...e){if(_(je(e,1),"No boxes provided"),e.length===1)return e[0];let t=e[0].x,n=e[0].y,i=e[0].x+e[0].width,r=e[0].y+e[0].height;for(let o=1;o<e.length;o++){let l=e[o];t=Math.min(t,l.x),n=Math.min(n,l.y),i=Math.max(i,l.x+l.width),r=Math.max(r,l.y+l.height)}return{x:Math.floor(t),y:Math.floor(n),width:Math.round(i-t),height:Math.round(r-n)}},fromRectBox(e){return{x:Math.min(e.x1,e.x2),y:Math.min(e.y1,e.y2),width:Math.abs(e.x2-e.x1),height:Math.abs(e.y2-e.y1)}},toRectBox(e){return{x1:e.x,y1:e.y,x2:e.x+e.width,y2:e.y+e.height}},expand(e,t){return t===0?e:{x:e.x-t,y:e.y-t,width:e.width+t*2,height:e.height+t*2}},shrink(e,t){return t===0?e:{x:e.x+t,y:e.y+t,width:e.width-t*2,height:e.height-t*2}},includes(e,t){return e===t?!0:e.x<=t.x&&e.y<=t.y&&e.x+e.width>=t.x+t.width&&e.y+e.height>=t.y+t.height}},l5={center({x1:e,y1:t,x2:n,y2:i}){return{x:(e+n)/2,y:(t+i)/2}},fromPoints(e){_(e.length>0,"At least one point is required");let t=1/0,n=1/0,i=-1/0,r=-1/0;for(let[o,l]of e)t=Math.min(t,o),n=Math.min(n,l),i=Math.max(i,o),r=Math.max(r,l);return{x1:t,y1:n,x2:i,y2:r}},merge(...e){_(e.length>0,"No boxes provided");let t=1/0,n=1/0,i=-1/0,r=-1/0;for(let o of e)t=Math.min(t,o.x1),n=Math.min(n,o.y1),i=Math.max(i,o.x2),r=Math.max(r,o.y2);return{x1:t,y1:n,x2:i,y2:r}},toBBox(e){return{x:e.x1,y:e.y1,width:e.x2-e.x1,height:e.y2-e.y1}},includes(e,t){return e===t?!0:e.x1<=t.x1&&e.y1<=t.y1&&e.x2>=t.x2&&e.y2>=t.y2}};var Yi=class Oe{constructor(t,n){this.x=t,this.y=n,_(typeof t=="number"&&!isNaN(t)&&isFinite(t)&&typeof n=="number"&&!isNaN(n)&&isFinite(n),`Invalid arguments for Vector: (${t}, ${n})`)}static create(...t){return t.length===2?new Oe(t[0],t[1]):new Oe(t[0].x,t[0].y)}static add(t,n){return{x:t.x+n.x,y:t.y+n.y}}static subtract(t,n){return{x:t.x-n.x,y:t.y-n.y}}static multiply(t,n){return{x:t.x*n,y:t.y*n}}static divide(t,n){return{x:t.x/n,y:t.y/n}}static dot(t,n){return t.x*n.x+t.y*n.y}add(t){return new Oe(this.x+t.x,this.y+t.y)}subtract(t){return new Oe(this.x-t.x,this.y-t.y)}multiply(t){return new Oe(this.x*t,this.y*t)}divide(t){return new Oe(this.x/t,this.y/t)}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}length(){return this.x===0&&this.y===0?0:Math.sqrt(this.x**2+this.y**2)}normalize(){let t=this.length();return t===0?new Oe(0,0):new Oe(this.x/t,this.y/t)}round(){return new Oe(Math.round(this.x),Math.round(this.y))}trunc(){return new Oe(Math.trunc(this.x),Math.trunc(this.y))}toObject(){return{x:this.x,y:this.y}}};function Fv(...e){return e.length===1&&e[0]instanceof Yi?e[0]:e.length===2?new Yi(e[0],e[1]):new Yi(e[0].x,e[0].y)}function o5(e){return ze(e,Go(t=>!!t.notation),Ti(ft("notation")),Fi(Bi(Ti(ft("shape")),Fi(Bi(Ti(ft("color")),Fi(Bi(fn(ft("kind")),si())),cn(),fn(([t,n])=>({kinds:n,color:t})))),cn(),ul(([t,n])=>n.map(({color:i,kinds:r})=>({shape:t,color:i,kinds:r}))))),cn(),ul(([t,n])=>n.map(({shape:i,color:r,kinds:o})=>({title:t,shape:i,color:r,kinds:o}))),jo(ft("shape"),ft("title"),[t=>t.kinds.length,"desc"]))}const ae=(e,t)=>e===t||ne(e)&&ne(t)?!1:!Pt(e,t);function a5(e,t){e.color=t.color,e.kind=t.kind,e.navigateTo=t.navigateTo??null,e.links=t.links?[...t.links]:null,e.tags=[...t.tags],ne(t.style.border)?delete e.style.border:e.style.border=t.style.border,Uc(t.style.opacity)?e.style.opacity=t.style.opacity:delete e.style.opacity,ne(t.style.multiple)?delete e.style.multiple:e.style.multiple=t.style.multiple}function s5(e,t,n){if(ae(t.icon??"none",e.icon??"none")){let i=Ne(e.icon)&&e.icon!=="none";switch(!0){case(i&&Ne(t.icon)&&t.icon!=="none"):return e.icon=t.icon,!0;case(i&&(ne(t.icon)||t.icon==="none")):return e.icon="none",!0;case(!i&&Ne(t.icon)&&t.icon!=="none"):return n?(e.icon=t.icon,!0):!1}}return!0}function c5(e,t,n){let i=!0;return ae(e.style.iconColor,t.style.iconColor)&&(ne(t.style.iconColor)?delete e.style.iconColor:e.style.iconColor=t.style.iconColor),ae(e.style.iconSize,t.style.iconSize)&&(n?ne(t.style.iconSize)?delete e.style.iconSize:e.style.iconSize=t.style.iconSize:i=!1),ae(e.style.iconPosition,t.style.iconPosition)&&(n?ne(t.style.iconPosition)?delete e.style.iconPosition:e.style.iconPosition=t.style.iconPosition:i=!1),i}function bi(e,t){return e?"md"in t?(e.md=t.md,delete e.txt,e):("txt"in t&&(e.txt=t.txt,delete e.md),e):t}function d5(e,t,n){let i=!0;return ae(e.title,t.title)&&(n?e.title=t.title:i=!1),ae(e.description,t.description)&&(ne(t.description)?delete e.description:n?e.description=bi(e.description,t.description):i=!1),ae(e.technology,t.technology)&&(ne(t.technology)?delete e.technology:n?e.technology=t.technology:i=!1),i}function h5(e,t,n){return e.title=t.title,ne(t.description)?delete e.description:e.description=bi(e.description,t.description),ne(t.technology)?delete e.technology:e.technology=t.technology,!0}function Hs(e,t){_(e.id===t.id,"applyManualLayout: view ids do not match"),_(e._stage==="layouted","applyManualLayout: expected layouted view"),_(t._stage==="layouted","applyManualLayout: expected layouted snapshot"),_(e._layout!=="manual","applyManualLayout: expected auto-layouted view");let n=new Set;e._type!==t._type&&n.add("type-changed");let i=m5(t.nodes,e.nodes,n),r=u5(t.edges,e.edges,n),o=o5(i);return gt(t,l=>{l.title=e.title??t.title,l.description=e.description??t.description,l.tags=e.tags?[...e.tags]:null,l.links=e.links?[...e.links]:null,l.sourcePath=e.sourcePath,l[Er]="manual",o&&o.length>0?l.notation={nodes:o}:delete l.notation,l.nodes=Wn(i),l.edges=Wn(r),t5(e)&&l._type==="dynamic"&&(l.variant=e.variant),e5(e)&&l._type==="element"&&(e.viewOf?l.viewOf=e.viewOf:delete l.viewOf,e.extends?l.extends=e.extends:delete l.extends);let a=[...n];je(a,1)?l.drifts=a:(l.hash=e.hash,delete l.drifts)})}function m5(e,t,n){let i=new Map(t.map(o=>[o.id,o])),r=e.map(o=>{let l=i.get(o.id);return l?(i.delete(l.id),gt(o,a=>{a5(a,l);let s=new Set,c=o.children.length>0,d=l.children.length>0;(ae(a.modelRef,l.modelRef)||ae(a.deploymentRef,l.deploymentRef))&&s.add("modelRef-changed"),d&&!c&&s.add("became-compound"),!d&&c&&s.add("became-leaf"),ae(a.parent,l.parent)&&s.add("parent-changed");let h=a.width+5>=l.width&&a.height+5>=l.height;ae(a.shape,l.shape)&&(h?a.shape=l.shape:s.add("shape-changed")),c5(a,l,h)||s.add("label-changed"),s5(a,l,h&&d===c)||s.add("label-changed"),(c?h5:d5)(a,l,h)||s.add("label-changed"),ae(a.notes,l.notes)&&(ne(l.notes)?delete a.notes:a.notes=bi(a.notes,l.notes)),ae(o.notation,l.notation)&&(a.notation=l.notation??null),c&&d&&J1(new Set(o.children),new Set(l.children)).size>0&&s.add("children-changed");let m=[...s];je(m,1)?(n.add("nodes-drift"),a.drifts=m):delete a.drifts})):(n.add("nodes-removed"),{...o,drifts:["removed"]})});return i.size>0&&n.add("nodes-added"),r}function u5(e,t,n){let i=new Map(t.map(o=>[o.id,o])),r=e.map(o=>{let l=i.get(o.id)??ze(i.values(),bt(a=>a.source===o.source&&a.target===o.target),vn());return l&&i.delete(l.id),gt(o,a=>{if(!l){a.drifts=["removed"],n.add("edges-removed");return}let s=new Set,c=o.id===l.id;switch(!0){case(c&&o.source==l.source&&o.target==l.target):ae(a.dir??"forward",l.dir??"forward")&&s.add("direction-changed");break;case(c&&o.source==l.target&&o.target==l.source):o.source!==o.target&&s.add("direction-changed");break;case c:o.source!=l.source&&s.add("source-changed"),o.target!=l.target&&s.add("target-changed");break;default:_(o.id!=l.id,"Unexpected case in edge drift detection, ids should not match"),_(o.source==l.source,"Unexpected case in edge drift detection, sources should match"),_(o.target==l.target,"Unexpected case in edge drift detection, targets should match"),ae(a.dir??"forward",l.dir??"forward")&&s.add("direction-changed");break}if(a.color=l.color,a.line=l.line,a.navigateTo=l.navigateTo??null,a.tags=l.tags?[...l.tags]:null,ae(o.notes,l.notes)&&(ne(o.notes)!==ne(l.notes)&&s.add("notes-changed"),a.notes=l.notes??o.notes),l.astPath?a.astPath=l.astPath:delete a.astPath,ae(fl(o,["label","description","technology","labelBBox"]),fl(l,["label","description","technology","labelBBox"])))switch(!0){case(l.labelBBox&&!o.labelBBox):s.add("label-added");break;case(o.labelBBox&&!l.labelBBox):s.add("label-removed");break;case(!!o.labelBBox&&!!l.labelBBox):l.labelBBox.width*l.labelBBox.height>(o.labelBBox.width+5)*(o.labelBBox.height+5)&&(a.labelBBox.width=Math.round(l.labelBBox.width),a.labelBBox.height=Math.round(l.labelBBox.height)),ae(o.label,l.label)&&(ne(l.label)!==ne(o.label)&&s.add("label-changed"),a.label=l.label??o.label),ae(o.description,l.description)&&(ne(l.description)!==ne(o.description)&&s.add("label-changed"),l.description&&(a.description=bi(o.description,l.description))),ae(o.technology,l.technology)&&(ne(l.technology)!==ne(o.technology)&&s.add("label-changed"),a.technology=l.technology??o.technology??null);break;default:_(!o.labelBBox,"Unexpected case in edge labelBBox drift detection"),_(!l.labelBBox,"Unexpected case in next labelBBox drift detection");break}let d=[...s];je(d,1)?(n.add("edges-drift"),a.drifts=d):delete a.drifts})});return i.size>0&&n.add("edges-added"),r}function f5(e,t){let{drifts:n,...i}=Hs(e,t);if(!n||n.length===0)return gt(e,d=>{delete d.drifts,d[Er]="auto"});let r=new Set;n.includes("type-changed")&&r.add("type-changed");let o=new Map(i.nodes.map(d=>[d.id,d])),l=new Map(i.edges.map(d=>[d.id,d])),a=e.nodes.map(d=>{let h=o.get(d.id);return h&&o.delete(h.id),gt(d,m=>{if(!h){r.add("nodes-added"),m.drifts=["added"];return}h.drifts?(r.add("nodes-drift"),m.drifts=[...h.drifts]):delete m.drifts})});o.size>0&&r.add("nodes-removed");let s=e.edges.map(d=>{let h=l.get(d.id)??ze(l.values(),bt(m=>m.source===d.source&&m.target===d.target),vn());return h&&l.delete(h.id),gt(d,m=>{if(!h){r.add("edges-added"),m.drifts=["added"];return}h.drifts?(r.add("edges-drift"),m.drifts=[...h.drifts]):delete m.drifts})});l.size>0&&r.add("edges-removed");let c=[...r];return gt(e,d=>{je(c,1)?d.drifts=c:delete d.drifts,d.nodes=Wn(a),d.edges=Wn(s),d[Er]="auto"})}var Gn=class{Aux;id;_literalId;hierarchyLevel;imported;constructor(e,t){this.$model=e,this.$element=t,this.id=this.$element.id,this._literalId=this.$element.id;let[n,i]=Ms(this.id);n?(this.imported={from:n,fqn:i},this.hierarchyLevel=ni(i)):(this.imported=null,this.hierarchyLevel=ni(this.id))}get name(){return ls(this.id)}get parent(){return this.$model.parent(this)}get kind(){return this.$element.kind}get shape(){return this.style.shape}get color(){return this.style.color}get icon(){return this.style.icon??null}get tags(){return Q(this,Symbol.for("tags"),()=>si([...this.$element.tags??[],...this.$model.specification.elements[this.$element.kind]?.tags??[]]))}get title(){return this.$element.title}get hasSummary(){return!!this.$element.summary&&!!this.$element.description&&!Sr(this.$element.summary,this.$element.description)}get summary(){return xe.memoize(this,"summary",$t(this.$element))}get description(){return xe.memoize(this,"description",Ut(this.$element))}get technology(){return this.$element.technology??null}get links(){return this.$element.links??[]}get defaultView(){return Q(this,Symbol.for("defaultView"),()=>vn(this.scopedViews())??null)}get isRoot(){return this.parent===null}get style(){return Q(this,"style",()=>Jr({shape:this.$model.$styles.defaults.shape,color:this.$model.$styles.defaults.color,border:this.$model.$styles.defaults.border,opacity:this.$model.$styles.defaults.opacity,size:this.$model.$styles.defaults.size,padding:this.$model.$styles.defaults.padding,textSize:this.$model.$styles.defaults.text,iconPosition:this.$model.$styles.defaults.iconPosition,...this.$element.style}))}get projectId(){return this.imported?.from??this.$model.projectId}isAncestorOf(e){return ke(this,e)}isDescendantOf(e){return ke(e,this)}ancestors(){return this.$model.ancestors(this)}commonAncestor(e){let t=En(this.id,e.id);return t?this.$model.element(t):null}children(){return this.$model.children(this)}descendants(e){return e?as([...this.$model.descendants(this)],e)[Symbol.iterator]():this.$model.descendants(this)}siblings(){return this.$model.siblings(this)}*ascendingSiblings(){yield*this.siblings();for(let e of this.ancestors())yield*e.siblings()}*descendingSiblings(){for(let e of[...this.ancestors()].reverse())yield*e.siblings();yield*this.siblings()}incoming(e="all"){return this.$model.incoming(this,e)}*incomers(e="all"){let t=new Set;for(let n of this.incoming(e))t.has(n.source.id)||(t.add(n.source.id),yield n.source)}outgoing(e="all"){return this.$model.outgoing(this,e)}*outgoers(e="all"){let t=new Set;for(let n of this.outgoing(e))t.has(n.target.id)||(t.add(n.target.id),yield n.target)}get allOutgoing(){return Q(this,Symbol.for("allOutgoing"),()=>new Set(this.outgoing()))}get allIncoming(){return Q(this,Symbol.for("allIncoming"),()=>new Set(this.incoming()))}views(){return Q(this,Symbol.for("views"),()=>{let e=new Set;for(let t of this.$model.views())t.includesElement(this.id)&&e.add(t);return e})}scopedViews(){return Q(this,Symbol.for("scopedViews"),()=>{let e=new Set;for(let t of this.$model.views())t.isScopedElementView()&&t.viewOf.id===this.id&&e.add(t);return e})}isDeployed(){return Ne(vn(this.deployments()))}deployments(){return this.$model.deployment.instancesOf(this)}hasMetadata(){return!!this.$element.metadata&&!Tn(this.$element.metadata)}getMetadata(e){return e?this.$element.metadata?.[e]:this.$element.metadata??{}}isTagged(e){return this.tags.includes(e)}},$s=class{Aux;get style(){return Q(this,"style",()=>Jr({shape:this.$model.$styles.defaults.shape,color:this.$model.$styles.defaults.color,border:this.$model.$styles.defaults.border,opacity:this.$model.$styles.defaults.opacity,size:this.$model.$styles.defaults.size,padding:this.$model.$styles.defaults.padding,textSize:this.$model.$styles.defaults.text,iconPosition:this.$model.$styles.defaults.iconPosition,...this.$node.style}))}get name(){return ls(this.id)}get shape(){return this.style.shape}get color(){return this.style.color}get icon(){return this.style.icon??null}get summary(){return xe.memoize(this,"summary",$t(this.$node))}get description(){return xe.memoize(this,"description",Ut(this.$node))}get technology(){return this.$node.technology??null}get links(){return this.$node.links??[]}ancestors(){return this.$model.ancestors(this)}commonAncestor(e){let t=En(this.id,e.id);return t?this.$model.node(t):null}siblings(){return this.$model.siblings(this)}isSibling(e){return this.parent===e.parent}*ascendingSiblings(){yield*this.siblings();for(let e of this.ancestors())yield*e.siblings()}*descendingSiblings(){for(let e of[...this.ancestors()].reverse())yield*e.siblings();yield*this.siblings()}incoming(e="all"){return this.$model.incoming(this,e)}outgoing(e="all"){return this.$model.outgoing(this,e)}*incomers(e="all"){let t=new Set;for(let n of this.incoming(e))t.has(n.source.id)||(t.add(n.source.id),yield n.source)}*outgoers(e="all"){let t=new Set;for(let n of this.outgoing(e))t.has(n.target.id)||(t.add(n.target.id),yield n.target)}*views(){for(let e of this.$model.views())e._type==="deployment"&&e.includesDeployment(this.id)&&(yield e)}isDeploymentNode(){return!1}isInstance(){return!1}get allOutgoing(){return Q(this,Symbol.for("allOutgoing"),()=>Cr.from(new Set(this.outgoingModelRelationships()),new Set(this.outgoing())))}get allIncoming(){return Q(this,Symbol.for("allIncoming"),()=>Cr.from(new Set(this.incomingModelRelationships()),new Set(this.incoming())))}hasMetadata(){return!!this.$node.metadata&&!Tn(this.$node.metadata)}getMetadata(e){return e?this.$node.metadata?.[e]:this.$node.metadata??{}}isTagged(e){return this.tags.includes(e)}},Co=class extends $s{id;_literalId;title;hierarchyLevel;constructor(e,t){super(),this.$model=e,this.$node=t,this.id=t.id,this._literalId=t.id,this.title=t.title,this.hierarchyLevel=ni(t.id)}get parent(){return this.$model.parent(this)}get kind(){return this.$node.kind}get tags(){return Q(this,Symbol.for("tags"),()=>si([...this.$node.tags??[],...this.$model.$model.specification.deployments[this.kind]?.tags??[]]))}children(){return this.$model.children(this)}descendants(e="desc"){return this.$model.descendants(this,e)}isDeploymentNode(){return!0}*instances(){for(let e of this.descendants("desc"))e.isInstance()&&(yield e)}onlyOneInstance(){let e=this.children();if(e.size!==1)return null;let t=vn(e);return t?t.isInstance()?t:t.onlyOneInstance():null}_relationshipsFromInstances=null;relationshipsFromInstances(){if(this._relationshipsFromInstances)return this._relationshipsFromInstances;let{outgoing:e,incoming:t}=this._relationshipsFromInstances={outgoing:new Set,incoming:new Set};for(let n of this.instances()){for(let i of n.element.outgoing())e.add(i);for(let i of n.element.incoming())t.add(i)}return this._relationshipsFromInstances}outgoingModelRelationships(){return this.relationshipsFromInstances().outgoing.values()}incomingModelRelationships(){return this.relationshipsFromInstances().incoming.values()}internalModelRelationships(){let{outgoing:e,incoming:t}=this.relationshipsFromInstances();return qt(t,e)}},Ro=class extends $s{id;_literalId;title;hierarchyLevel;constructor(e,t,n){super(),this.$model=e,this.$instance=t,this.element=n,this.id=t.id,this._literalId=t.id,this.title=t.title??n.title,this.hierarchyLevel=ni(t.id)}get $node(){return this.$instance}get parent(){return Se(this.$model.parent(this),`Parent of ${this.id} not found`)}get style(){return Q(this,"style",()=>Jr({shape:this.$model.$styles.defaults.shape,color:this.$model.$styles.defaults.color,border:this.$model.$styles.defaults.border,opacity:this.$model.$styles.defaults.opacity,size:this.$model.$styles.defaults.size,padding:this.$model.$styles.defaults.padding,textSize:this.$model.$styles.defaults.text,iconPosition:this.$model.$styles.defaults.iconPosition,...this.element.$element.style,...this.$instance.style}))}get tags(){return Q(this,Symbol.for("tags"),()=>si([...this.$instance.tags??[],...this.element.tags]))}get kind(){return this.element.kind}get summary(){return xe.memoize(this,"summary",$t(this.$instance)??$t(this.element.$element))}get description(){return xe.memoize(this,"description",Ut(this.$instance)??Ut(this.element.$element))}get technology(){return this.$instance.technology??this.element.technology??null}get links(){return this.$instance.links??this.element.links}isInstance(){return!0}outgoingModelRelationships(){return this.element.outgoing()}incomingModelRelationships(){return this.element.incoming()}*views(){for(let e of this.$model.views())if(e._type==="deployment"){if(e.includesDeployment(this.id)){yield e;continue}e.includesDeployment(this.parent.id)&&this.parent.onlyOneInstance()&&(yield e)}}},p5=class{constructor(e,t){this.instance=e,this.element=t}get id(){return this.instance.id}get _literalId(){return this.instance.id}get style(){return Q(this,"style ",()=>({shape:this.element.shape,color:this.element.color,...this.element.$element.style}))}get shape(){return this.element.shape}get color(){return this.element.color}get title(){return this.element.title}get summary(){return this.element.summary}get description(){return this.element.description}get technology(){return this.element.technology}isDeploymentNode(){return!1}isInstance(){return!1}},g5=class{boundary;source;target;constructor(e,t){this.$model=e,this.$relationship=t,this.source=e.deploymentRef(t.source),this.target=e.deploymentRef(t.target);let n=En(this.source.id,this.target.id);this.boundary=n?this.$model.node(n):null}get id(){return this.$relationship.id}get expression(){return`${this.source.id} -> ${this.target.id}`}get title(){return Ne(this.$relationship.title)?this.$relationship.title:null}get technology(){return Mt(this.$relationship.technology)?(this.kind&&this.$model.specification.relationships[this.kind])?.technology??null:this.$relationship.technology}get hasSummary(){return!!this.$relationship.summary&&!!this.$relationship.description&&!Sr(this.$relationship.summary,this.$relationship.description)}get summary(){return xe.memoize(this,"summary",$t(this.$relationship))}get description(){return xe.memoize(this,"description",Ut(this.$relationship))}get tags(){return this.$relationship.tags??[]}get kind(){return this.$relationship.kind??null}get navigateTo(){return this.$relationship.navigateTo?this.$model.$model.view(this.$relationship.navigateTo):null}get links(){return this.$relationship.links??[]}get color(){return this.$relationship.color??this.$model.$styles.defaults.relationship.color}get line(){return this.$relationship.line??this.$model.$styles.defaults.relationship.line}get head(){return this.$relationship.head??this.$model.$styles.defaults.relationship.arrow}get tail(){return this.$relationship.tail}*views(){for(let e of this.$model.views())e.includesRelation(this.id)&&(yield e)}isDeploymentRelation(){return!0}isModelRelation(){return!1}hasMetadata(){return!!this.$relationship.metadata&&!Tn(this.$relationship.metadata)}getMetadata(e){return e?this.$relationship.metadata?.[e]:this.$relationship.metadata??{}}isTagged(e){return this.tags.includes(e)}},Cr=class Nt{static empty(){return new Nt}static from(t,n){return new Nt(new Set(t),new Set(n))}constructor(t=new Set,n=new Set){this.model=t,this.deployment=n}get isEmpty(){return this.model.size===0&&this.deployment.size===0}get nonEmpty(){return this.model.size>0||this.deployment.size>0}get size(){return this.model.size+this.deployment.size}intersect(t){return Nt.from(qt(this.model,t.model),qt(this.deployment,t.deployment))}difference(t){return Nt.from(br(this.model,t.model),br(this.deployment,t.deployment))}union(t){return Nt.from(vr(this.model,t.model),vr(this.deployment,t.deployment))}};const K=e=>typeof e=="string"?e:e.id,Bv="/",tl=e=>{if(_(!e.includes(`
`),"View title cannot contain newlines"),e.includes("/")){let t=e.split("/").map(n=>n.trim()).filter(n=>n.length>0);return je(t,1)?t:[""]}return[e.trim()]},Us=e=>tl(e).join("/"),y5=e=>{let t=tl(e);return je(t,2)?t.slice(0,-1).join("/"):null},v5=e=>e.includes("/")?tl(e).pop()??e:e.trim();var b5=class{#e=new Map;#o=new Map;#t=new de.default(()=>new Set);#n=new de.default(()=>new Set);#a=new Set;#i=new Map;#s=new de.default(()=>new Set);#l=new de.default(()=>new Set);#r=new de.default(()=>new Set);#c=new de.default(()=>new Set);#d=new Map;$deployments;constructor(e){this.$model=e;let t=this.$deployments=e.$data.deployments,n=Xn(t.elements);for(let i of yn(n)){let r=this.addElement(i);for(let o of r.tags)this.#c.get(o).add(r);r.isInstance()&&this.#n.get(r.element.id).add(r)}for(let i of Xn(t.relations)){let r=this.addRelation(i);for(let o of r.tags)this.#c.get(o).add(r)}}get $styles(){return this.$model.$styles}get projectId(){return this.$model.projectId}get project(){return this.$model.project}get specification(){return this.$model.specification}element(e){if(e instanceof Co||e instanceof Ro)return e;let t=K(e);return Se(this.#e.get(t),`Element ${t} not found`)}findElement(e){return this.#e.get(e)??null}node(e){let t=this.element(e);return _(t.isDeploymentNode(),`Element ${t.id} is not a deployment node`),t}findNode(e){let t=this.findElement(e);return t?(_(t.isDeploymentNode(),`Element ${t?.id} is not a deployment node`),t):null}instance(e){let t=this.element(e);return _(t.isInstance(),`Element ${t.id} is not a deployed instance`),t}findInstance(e){let t=this.findElement(e);return t?(_(t.isInstance(),`Element ${t?.id} is not a deployed instance`),t):null}roots(){return this.#a.values()}elements(){return this.#e.values()}*nodes(){for(let e of this.#e.values())e.isDeploymentNode()&&(yield e)}*nodesOfKind(e){for(let t of this.#e.values())t.isDeploymentNode()&&t.kind===e&&(yield t)}*instances(){for(let e of this.#e.values())e.isInstance()&&(yield e)}*instancesOf(e){let t=K(e),n=this.#n.get(t);n&&(yield*n)}deploymentRef(e){if(Tt.isInsideInstanceRef(e)){let{deployment:t,element:n}=e;return Q1(this.#d,`${t}@${n}`,()=>new p5(this.instance(t),this.$model.element(n)))}return this.element(e.deployment)}relationships(){return this.#i.values()}relationship(e){let t=K(e);return Se(this.#i.get(t),`DeploymentRelationModel ${t} not found`)}findRelationship(e){return this.#i.get(e)??null}*views(){for(let e of this.$model.views())e.isDeploymentView()&&(yield e)}parent(e){let t=K(e);return this.#o.get(t)||null}children(e){let t=K(e);return this.#t.get(t)}*siblings(e){let t=K(e),n=this.parent(e)?.children()??this.roots();for(let i of n)i.id!==t&&(yield i)}*ancestors(e){let t=K(e),n;for(;n=this.#o.get(t);)yield n,t=n.id}*descendants(e,t="desc"){for(let n of this.children(e))t==="asc"?(yield n,yield*this.descendants(n.id)):(yield*this.descendants(n.id),yield n)}*incoming(e,t="all"){let n=K(e);for(let i of this.#s.get(n))switch(!0){case t==="all":case(t==="direct"&&i.target.id===n):case(t==="to-descendants"&&i.target.id!==n):yield i;break}}*outgoing(e,t="all"){let n=K(e);for(let i of this.#l.get(n))switch(!0){case t==="all":case(t==="direct"&&i.source.id===n):case(t==="from-descendants"&&i.source.id!==n):yield i;break}}addElement(e){if(this.#e.has(e.id))throw Error(`Element ${e.id} already exists`);let t=Ly(e)?new Co(this,Object.freeze(e)):new Ro(this,Object.freeze(e),this.$model.element(e.element));this.#e.set(t.id,t);let n=qn(t.id);return n?(_(this.#e.has(n),`Parent ${n} of ${t.id} not found`),this.#o.set(t.id,this.node(n)),this.#t.get(n).add(t)):(_(t.isDeploymentNode(),`Root element ${t.id} is not a deployment node`),this.#a.add(t)),t}addRelation(e){if(this.#i.has(e.id))throw Error(`Relation ${e.id} already exists`);let t=new g5(this,Object.freeze(e));this.#i.set(t.id,t),this.#s.get(t.target.id).add(t),this.#l.get(t.source.id).add(t);let n=t.boundary?.id??null;if(n)for(let i of[n,...Gt(n)])this.#r.get(i).add(t);for(let i of Gt(t.source.id)){if(i===n)break;this.#l.get(i).add(t)}for(let i of Gt(t.target.id)){if(i===n)break;this.#s.get(i).add(t)}return t}},Oo=class{source;target;boundary;constructor(e,t){this.model=e,this.$relationship=t,this.source=e.element(Tt.flatten(t.source)),this.target=e.element(Tt.flatten(t.target));let n=En(this.source.id,this.target.id);this.boundary=n?this.model.element(n):null}get id(){return this.$relationship.id}get expression(){return`${this.source.id} -> ${this.target.id}`}get title(){return Mt(this.$relationship.title)?null:this.$relationship.title}get technology(){return Mt(this.$relationship.technology)?(this.kind&&this.model.specification.relationships[this.kind])?.technology??null:this.$relationship.technology}get hasSummary(){return!!this.$relationship.summary&&!!this.$relationship.description&&!Sr(this.$relationship.summary,this.$relationship.description)}get summary(){return xe.memoize(this,"summary",$t(this.$relationship))}get description(){return xe.memoize(this,"description",Ut(this.$relationship))}get navigateTo(){return this.$relationship.navigateTo?this.model.view(this.$relationship.navigateTo):null}get tags(){return this.$relationship.tags??[]}get kind(){return this.$relationship.kind??null}get links(){return this.$relationship.links??[]}get color(){return this.$relationship.color??this.model.$styles.defaults.relationship.color}get line(){return this.$relationship.line??this.model.$styles.defaults.relationship.line}get head(){return this.$relationship.head??this.model.$styles.defaults.relationship.arrow}get tail(){return this.$relationship.tail}*views(){for(let e of this.model.views())e.includesRelation(this.id)&&(yield e)}isDeploymentRelation(){return!1}isModelRelation(){return!0}hasMetadata(){return!!this.$relationship.metadata&&!Tn(this.$relationship.metadata)}getMetadata(e){return e?this.$relationship.metadata?.[e]:this.$relationship.metadata??{}}isTagged(e){return this.tags.includes(e)}},A5=class{Aux;$viewModel;$view;$edge;constructor(e,t,n,i){this.source=n,this.target=i,this.$viewModel=e,this.$view=e.$view,this.$edge=t}get id(){return this.$edge.id}get parent(){return this.$edge.parent?this.$viewModel.node(this.$edge.parent):null}get label(){return this.$edge.label??null}get description(){return xe.memoize(this,"description",this.$edge.description)}get technology(){return this.$edge.technology??null}hasParent(){return this.$edge.parent!==null}get tags(){return this.$edge.tags??[]}get stepNumber(){return this.isStep()?js(this.id):null}get navigateTo(){return this.$edge.navigateTo?this.$viewModel.$model.view(this.$edge.navigateTo):null}get color(){return this.$edge.color}get line(){return this.$edge.line??this.$viewModel.$styles.defaults.relationship.line}get head(){return this.$edge.head??this.$viewModel.$styles.defaults.relationship.arrow}get tail(){return this.$edge.tail}isStep(){return vi(this.id)}*relationships(e){for(let t of this.$edge.relations)if(e){let n=this.$viewModel.$model.findRelationship(t,e);n&&(yield n)}else yield this.$viewModel.$model.relationship(t)}includesRelation(e){let t=typeof e=="string"?e:e.id;return this.$edge.relations.includes(t)}isTagged(e){return this.tags.includes(e)}},x5=class{Aux;$viewModel;$view;$node;constructor(e,t){this.$viewModel=e,this.$view=e.$view,this.$node=t}get id(){return this.$node.id}get title(){return this.$node.title}get kind(){return this.$node.kind}get description(){return xe.memoize(this,"description",this.$node.description)}get technology(){return this.$node.technology??null}get notes(){return xe.memoize(this,"notes",this.$node.notes)}get parent(){return this.$node.parent?this.$viewModel.node(this.$node.parent):null}get element(){let e=this.$node.modelRef;return e?this.$viewModel.$model.element(e):null}get deployment(){let e=this.$node.deploymentRef;return e?this.$viewModel.$model.deployment.element(e):null}get shape(){return this.$node.shape}get color(){return this.$node.color}get icon(){return this.$node.icon??null}get tags(){return this.$node.tags}get links(){return this.$node.links??[]}get navigateTo(){return this.$node.navigateTo?this.$viewModel.$model.view(this.$node.navigateTo):null}get style(){return this.$node.style}get x(){return"x"in this.$node?this.$node.x:void 0}get y(){return"y"in this.$node?this.$node.y:void 0}get width(){return"width"in this.$node?this.$node.width:void 0}get height(){return"height"in this.$node?this.$node.height:void 0}children(){return Q(this,"children",()=>new Set(this.$node.children.map(e=>this.$viewModel.node(e))))}*ancestors(){let e=this.parent;for(;e;)yield e,e=e.parent}*siblings(){let e=this.parent?.children()??this.$viewModel.roots();for(let t of e)t.id!==this.id&&(yield t)}*incoming(e="all"){for(let t of this.$node.inEdges){let n=this.$viewModel.edge(t);switch(!0){case e==="all":case(e==="direct"&&n.target.id===this.id):case(e==="to-descendants"&&n.target.id!==this.id):yield n;break}}}*incomers(e="all"){let t=new Set;for(let n of this.incoming(e))t.has(n.source.id)||(t.add(n.source.id),yield n.source)}*outgoing(e="all"){for(let t of this.$node.outEdges){let n=this.$viewModel.edge(t);switch(!0){case e==="all":case(e==="direct"&&n.source.id===this.id):case(e==="from-descendants"&&n.source.id!==this.id):yield n;break}}}*outgoers(e="all"){let t=new Set;for(let n of this.outgoing(e))t.has(n.target.id)||(t.add(n.target.id),yield n.target)}isLayouted(){return"width"in this.$node&&"height"in this.$node}hasChildren(){return this.$node.children.length>0}hasParent(){return this.$node.parent!==null}hasElement(){return Ne(this.$node.modelRef)}hasDeployment(){return Ne(this.$node.deploymentRef)}hasDeployedInstance(){return this.hasElement()&&this.hasDeployment()}isGroup(){return _s(this.$node)}isTagged(e){return this.tags.includes(e)}},Rr=class{Aux;#e;#o=new Set;#t=new Map;#n=new Map;#a=new Set;#i=new Set;#s=new Set;#l=new de.default(e=>new Set);#r;id;$model;title;folder;viewPath;constructor(e,t,n,i){this.$model=e,this.#e=n,this.id=n.id,this.folder=t,this.#r=i;for(let r of this.#e.nodes){let o=new x5(this,Object.freeze(r));this.#t.set(r.id,o),r.parent||this.#o.add(o),r.deploymentRef&&this.#i.add(r.deploymentRef),r.modelRef&&this.#a.add(r.modelRef);for(let l of o.tags)this.#l.get(l).add(o)}for(let r of this.#e.edges){let o=new A5(this,Object.freeze(r),this.node(r.source),this.node(r.target));for(let l of o.tags)this.#l.get(l).add(o);for(let l of r.relations)this.#s.add(l);this.#n.set(r.id,o)}this.title=n.title?v5(n.title):null,this.viewPath=n.title?Us(n.title):n.id}get $styles(){return this.$model.$styles}get _type(){return this.#e[rn]}get stage(){return this.#e[yt]}get bounds(){if("bounds"in this.#e)return this.#e.bounds;if(this.#r)return this.#r.bounds;throw Error("View is not layouted")}get titleOrId(){return this.title??this.viewOf?.title??this.id}get titleOrUntitled(){return this.title??"Untitled"}get breadcrumbs(){return Q(this,"breadcrumbs",()=>this.folder.isRoot?[this]:[...this.folder.breadcrumbs,this])}get description(){return xe.memoize(this,"description",this.#e.description)}get tags(){return this.#e.tags??[]}get links(){return this.#e.links??[]}get viewOf(){if(this.isElementView()){let e=this.#e.viewOf;return e?this.$model.element(e):null}return null}get mode(){return this.isDynamicView()?this.#e.variant??"diagram":null}get includedTags(){return[...this.#l.keys()]}get $view(){if(!this.isLayouted()||"drifts"in this.#e)return this.#e;let e=this.#r;return e?Q(this,"withDriftReasons",()=>f5(this.#e,e)):this.#e}get $layouted(){if(!this.isLayouted())throw Error("View is not layouted");return this.$manual??this.#e}get hasManualLayout(){return this.#r!==void 0}get hasLayoutDrifts(){if(!this.isLayouted())return!1;let e=this.$manual;return!!e?.drifts&&e.drifts.length>0}get $manual(){if(!this.isLayouted())return null;let e=this.#r;return e?Q(this,"snapshotWithManualLayout",()=>Hs(this.#e,e)):null}get projectId(){return this.$model.projectId}roots(){return this.#o.values()}*compounds(){for(let e of this.#t.values())e.hasChildren()&&(yield e)}node(e){let t=K(e);return Se(this.#t.get(t),`Node ${t} not found in view ${this.#e.id}`)}findNode(e){return this.#t.get(K(e))??null}findNodeWithElement(e){let t=K(e);return this.#a.has(t)?K1(this.#t.values(),n=>n.hasElement()&&n.element.id===t)??null:null}nodes(){return this.#t.values()}edge(e){let t=K(e);return Se(this.#n.get(t),`Edge ${t} not found in view ${this.#e.id}`)}findEdge(e){return this.#n.get(K(e))??null}edges(){return this.#n.values()}*edgesWithRelation(e){for(let t of this.#n.values())t.includesRelation(e)&&(yield t)}*elements(){for(let e of this.#t.values())e.hasElement()&&(yield e)}isTagged(e){return this.tags.includes(e)}includesElement(e){return this.#a.has(K(e))}includesDeployment(e){return this.#i.has(K(e))}includesRelation(e){return this.#s.has(K(e))}isComputed(){return this.#e[yt]==="computed"}isLayouted(){return this.#e[yt]==="layouted"}isDiagram(){return this.#e[yt]==="layouted"}isElementView(){return this.#e[rn]==="element"}isScopedElementView(){return this.#e[rn]==="element"&&Ne(this.#e.viewOf)}isDeploymentView(){return this.#e[rn]==="deployment"}isDynamicView(){return this.#e[rn]==="dynamic"}},Lo=class Zs{$model;path;title;isRoot;parentPath;defaultViewId;constructor(t,n,i){this.$model=t,this.path=n.join("/"),this.isRoot=this.path==="",this.title=Kc(n),this.isRoot?this.parentPath=void 0:this.parentPath=n.slice(0,-1).join("/"),this.defaultViewId=i}get defaultView(){return this.defaultViewId?this.$model.view(this.defaultViewId):null}get breadcrumbs(){return _(!this.isRoot,"Root view folder has no breadcrumbs"),Q(this,"breadcrumbs",()=>{let t=this.parent;return t?t.isRoot?[t,this]:[...t.breadcrumbs,this]:[this]})}get parent(){return _(!this.isRoot,"Root view folder has no parent"),Mt(this.parentPath)?null:this.$model.viewFolder(this.parentPath)}get children(){return this.$model.viewFolderItems(this.path)}get folders(){return Q(this,"folders",()=>{let t=[];for(let n of this.children)n instanceof Zs&&t.push(n);return t})}get views(){return Q(this,"views",()=>{let t=[];for(let n of this.children)n instanceof Rr&&t.push(n);return t})}},Or=class $n{Aux;_elements=new Map;_parents=new Map;_children=new de.default(()=>new Set);_rootElements=new Set;_relations=new Map;_incoming=new de.default(()=>new Set);_outgoing=new de.default(()=>new Set);_internal=new de.default(()=>new Set);_views=new Map;_rootViewFolder;_viewFolders=new Map;_viewFolderItems=new de.default(()=>new Set);_allTags=new de.default(()=>new Set);static fromParsed(t){return new $n(t)}static create(t){return new $n(t)}static fromDump(t){let{_stage:n="layouted",projectId:i="unknown",project:r,globals:o,imports:l,deployments:a,views:s,relations:c,elements:d,specification:h}=t;return new $n({[yt]:n,projectId:i,project:r,globals:{predicates:o?.predicates??{},dynamicPredicates:o?.dynamicPredicates??{},styles:o?.styles??{}},imports:l??{},deployments:{elements:a?.elements??{},relations:a?.relations??{}},views:s??{},relations:c??{},elements:d??{},specification:h})}deployment;$data;constructor(t){this.$data=t;for(let[,n]of cn(t.elements)){let i=this.addElement(n);for(let r of i.tags)this._allTags.get(r).add(i)}for(let[n,i]of cn(t.imports??{}))for(let r of yn(i)){let o=this.addImportedElement(n,r);for(let l of o.tags)this._allTags.get(l).add(o)}for(let n of Xn(t.relations)){let i=this.addRelation(n);for(let r of i.tags)this._allTags.get(r).add(i)}if(this.deployment=new b5(this),To(t,"computed")||To(t,"layouted")){let n=Z1("/"),i=ze(Xn(t.views),fn(o=>({view:o,path:Us(o.title??o.id),folderPath:o.title&&y5(o.title)||""})),ki((o,l)=>n(o.folderPath,l.folderPath))),r=o=>{let l=this._viewFolders.get(o);if(!l){let a=gl(o,"/");_(je(a,1),`View group path "${o}" must have at least one element`);let s;s=o===""?i.find(c=>c.view.id==="index"):i.find(c=>c.path===o),l=new Lo(this,a,s?.view.id),this._viewFolders.set(o,l)}return l};this._rootViewFolder=r("");for(let{folderPath:o}of i)this._viewFolders.has(o)||gl(o,"/").reduce((l,a)=>{let s=l.join("/"),c=r(Tn(s)?a:s+"/"+a);return this._viewFolderItems.get(s).add(c),l.push(a),l},[]);for(let{view:o,folderPath:l}of i){let a=new Rr(this,r(l),o,t.manualLayouts?.[o.id]);this._viewFolderItems.get(l).add(a),this._views.set(o.id,a);for(let s of a.tags)this._allTags.get(s).add(a)}}else this._rootViewFolder=new Lo(this,[""],void 0),this._viewFolders.set(this._rootViewFolder.path,this._rootViewFolder)}get asParsed(){return this}get asComputed(){return this}get asLayouted(){return this}get $styles(){return Q(this,"styles",()=>Uy.from(this.project.styles,this.specification.customColors))}isParsed(){return this.stage==="parsed"}isLayouted(){return this.stage==="layouted"}isComputed(){return this.stage==="computed"}get $model(){return this.$data}get stage(){return this.$data[yt]}get projectId(){return this.$data.projectId??"default"}get project(){return this.$data.project??Q(this,Symbol.for("project"),()=>({id:this.projectId,styles:{},manualLayouts:{}}))}get specification(){return this.$data.specification}get globals(){return Q(this,Symbol.for("globals"),()=>({predicates:{...this.$data.globals?.predicates},dynamicPredicates:{...this.$data.globals?.dynamicPredicates},styles:{...this.$data.globals?.styles}}))}element(t){if(t instanceof Gn)return t;let n=K(t);return Se(this._elements.get(n),`Element ${n} not found`)}findElement(t){return this._elements.get(K(t))??null}roots(){return this._rootElements.values()}elements(){return this._elements.values()}relationships(){return this._relations.values()}relationship(t,n){if(n==="deployment")return this.deployment.relationship(t);let i=K(t),r=this._relations.get(i)??null;return r||n==="model"?Se(r,`Model relation ${i} not found`):Se(this.deployment.findRelationship(i),`No model/deployment relation ${i} not found`)}findRelationship(t,n){if(n==="deployment")return this.deployment.findRelationship(t);let i=this._relations.get(K(t))??null;return i||n==="model"?i:this.deployment.findRelationship(t)}views(){return this._views.values()}view(t){let n=K(t);return Se(this._views.get(n),`View ${n} not found`)}findView(t){return this._views.get(t)??null}findManualLayout(t){return"manualLayouts"in this.$data?this.$data.manualLayouts?.[t]??null:null}viewFolder(t){return Se(this._viewFolders.get(t),`View folder ${t} not found`)}get rootViewFolder(){return this._rootViewFolder}get hasViewFolders(){return this._viewFolders.size>1}viewFolderItems(t){return _(this._viewFolders.has(t),`View folder ${t} not found`),this._viewFolderItems.get(t)}parent(t){let n=K(t);return this._parents.get(n)||null}children(t){let n=K(t);return this._children.get(n)}*siblings(t){let n=K(t),i=this._parents.get(n),r=i?this._children.get(i.id).values():this.roots();for(let o of r)o.id!==n&&(yield o)}*ancestors(t){let n=K(t),i;for(;i=this._parents.get(n);)yield i,n=i.id}*descendants(t){for(let n of this.children(t))yield n,yield*this.descendants(n.id)}*incoming(t,n="all"){let i=K(t);for(let r of this._incoming.get(i))switch(!0){case n==="all":case(n==="direct"&&r.target.id===i):case(n==="to-descendants"&&r.target.id!==i):yield r;break}}*outgoing(t,n="all"){let i=K(t);for(let r of this._outgoing.get(i))switch(!0){case n==="all":case(n==="direct"&&r.source.id===i):case(n==="from-descendants"&&r.source.id!==i):yield r;break}}get tags(){return Q(this,"tags",()=>ki([...this._allTags.keys()],yr))}get tagsSortedByUsage(){return Q(this,"tagsSortedByUsage",()=>ze([...this._allTags.entries()],fn(([t,n])=>({tag:t,count:n.size,tagged:n})),ki((t,n)=>yr(t.tag,n.tag)),jo([ft("count"),"desc"])))}findByTag(t,n){return bt(this._allTags.get(t),i=>n==="elements"?i instanceof Gn:n==="views"?i instanceof Rr:n==="relationships"?i instanceof Oo:!0)}*elementsOfKind(t){for(let n of this._elements.values())n.kind===t&&(yield n)}*elementsWhere(t){let n=It(t);for(let i of this._elements.values())n(i)&&(yield i)}*relationshipsWhere(t){let n=It(t);for(let i of this._relations.values())n(i)&&(yield i)}addElement(t){if(this._elements.has(t.id))throw Error(`Element ${t.id} already exists`);let n=new Gn(this,Object.freeze(t));this._elements.set(n.id,n);let i=qn(n.id);return i?(_(this._elements.has(i),`Parent ${i} of ${n.id} not found`),this._parents.set(n.id,this.element(i)),this._children.get(i).add(n)):this._rootElements.add(n),n}addImportedElement(t,n){_(!Gs(n.id),"Imported element already has global FQN");let i=el(t,n.id);if(this._elements.has(i))throw Error(`Element ${i} already exists`);let r=new Gn(this,Object.freeze({...n,id:i}));this._elements.set(r.id,r);let o=qn(r.id);for(;o;){if(o.includes(".")&&this._elements.has(o))return this._parents.set(r.id,this.element(o)),this._children.get(o).add(r),r;o=qn(o)}return this._rootElements.add(r),r}addRelation(t){if(this._relations.has(t.id))throw Error(`Relation ${t.id} already exists`);let n=new Oo(this,Object.freeze(t)),{source:i,target:r}=n;this._relations.set(n.id,n),this._incoming.get(r.id).add(n),this._outgoing.get(i.id).add(n);let o=En(i.id,r.id);if(o)for(let l of[o,...Gt(o)])this._internal.get(l).add(n);for(let l of Gt(i.id)){if(l===o)break;this._outgoing.get(l).add(n)}for(let l of Gt(r.id)){if(l===o)break;this._incoming.get(l).add(n)}return n}};(function(e){e.EMPTY=Or.create({_stage:"computed",projectId:"default",project:{id:"default"},specification:{elements:{},relationships:{},deployments:{},tags:{}},globals:{predicates:{},dynamicPredicates:{},styles:{}},deployments:{elements:{},relations:{}},elements:{},relations:{},views:{},imports:{}})})(Or||={});let T5;(function(e){e.isInside=r=>o=>ke(r,o.source.id)&&ke(r,o.target.id);let t=e.isDirectedBetween=(r,o)=>l=>(l.source.id===r||ke(r,l.source.id))&&(l.target.id===o||ke(o,l.target.id));e.isAnyBetween=(r,o)=>{let l=t(r,o),a=t(o,r);return s=>l(s)||a(s)};let n=e.isIncoming=r=>o=>(o.target.id===r||ke(r,o.target.id))&&!ke(r,o.source.id),i=e.isOutgoing=r=>o=>(o.source.id===r||ke(r,o.source.id))&&!ke(r,o.target.id);e.isAnyInOut=r=>{let o=n(r),l=i(r);return a=>o(a)||l(a)}})(T5||={});const Vs=Symbol.for("nodejs.util.inspect.custom");var F5=class pt{id;constructor(t,n,i){this.source=t,this.target=n,this.relations=i,this.id=ss(`deployment:${t.id}:${n.id}`)}get expression(){return`${this.source.id} -> ${this.target.id}`}_boundary;get boundary(){return this._boundary??=this.source.commonAncestor(this.target),this._boundary}nonEmpty(){return this.relations.nonEmpty}[Vs](t,n,i){let r=this.toString();return Object.defineProperty(r,"constructor",{value:pt,enumerable:!1}),r}toString(){let t=[...this.relations.model].map(i=>"    "+i.expression);t.length?t.unshift("  model:"):t.unshift("  model: []");let n=[...this.relations.deployment].map(i=>"    "+i.expression);return n.length?n.unshift("  deployment:"):n.unshift("  deployment: []"),[this.expression,...t,...n].join(`
`)}hasDirectDeploymentRelation(){for(let t of this.relations.deployment)if(t.source.id===this.source.id||t.target.id===this.target.id)return!0;return!1}*values(){yield*this.relations.model,yield*this.relations.deployment}mergeWith(t){return Array.isArray(t)?t.reduce((n,i)=>n.mergeWith(i),this):(_(this.source.id===t.source.id,"Cannot merge connections with different sources"),_(this.target.id===t.target.id,"Cannot merge connections with different targets"),new pt(this.source,this.target,this.relations.union(t.relations)))}difference(t){return new pt(this.source,this.target,this.relations.difference(t.relations))}intersect(t){return new pt(this.source,this.target,this.relations.intersect(t.relations))}equals(t){return _(t instanceof pt,"Other should ne DeploymentConnectionModel"),this.id===t.id&&this.source.id===t.source.id&&this.target.id===t.target.id&&Ar(this.relations.model,t.relations.model)&&Ar(this.relations.deployment,t.relations.deployment)}update(t){return t&&={model:this.relations.model,deployment:this.relations.deployment,...t},new pt(this.source,this.target,t?new Cr(t.model??new Set,t.deployment??new Set):this.relations)}};function So(e,t){return t?e.source===t.source&&e.target===t.target:n=>e.source===n.source&&e.target===n.target}var No=class Qe{id;constructor(t,n,i=new Set){this.source=t,this.target=n,this.relations=i,this.id=ss(`model:${t.id}:${n.id}`)}_boundary;get boundary(){return this._boundary??=this.source.commonAncestor(this.target)}get expression(){return`${this.source.id} -> ${this.target.id}`}get isDirect(){return this.nonEmpty()&&!this.isImplicit}get isImplicit(){return this.nonEmpty()&&X1(this.relations,Mo(So(this)))}get directRelations(){return new Set(bt(this.relations,So(this)))}nonEmpty(){return this.relations.size>0}mergeWith(t){return _(this.source.id===t.source.id,"Cannot merge connections with different sources"),_(this.target.id===t.target.id,"Cannot merge connections with different targets"),new Qe(this.source,this.target,vr(this.relations,t.relations))}difference(t){return new Qe(this.source,this.target,br(this.relations,t.relations))}intersect(t){return _(t instanceof Qe,"Cannot intersect connection with different type"),new Qe(this.source,this.target,qt(this.relations,t.relations))}equals(t){_(t instanceof Qe,"Cannot merge connection with different type");let n=t;return this.id===n.id&&this.source.id===n.source.id&&this.target.id===n.target.id&&Ar(this.relations,n.relations)}update(t){return new Qe(this.source,this.target,t)}[Vs](t,n,i){let r=this.toString();return Object.defineProperty(r,"constructor",{value:Qe,enumerable:!1}),r}toString(){return[this.expression,this.relations.size?"  relations:":"  relations: [ ]",...[...this.relations].map(t=>"    "+t.expression)].join(`
`)}reversed(){return new Qe(this.target,this.source)}};Fn({findConnection:()=>nl,findConnectionsBetween:()=>Qs,findConnectionsWithin:()=>B5});function nl(e,t,n="directed"){if(e===t||Ur(e,t))return[];let i=e.allOutgoing.intersect(t.allIncoming),r=i.nonEmpty?[new F5(e,t,i)]:[];return n==="directed"?r:[...r,...nl(t,e,"directed")]}function Qs(e,t,n="both"){if(e.allIncoming.isEmpty&&e.allOutgoing.isEmpty)return[];let i=[],r=[];for(let o of t)if(e!==o)for(let l of nl(e,o,n))l.source===e?i.push(l):r.push(l);return[...i,...r]}function B5(e){return[...e].reduce((t,n,i,r)=>(i===r.length-1||t.push(...Qs(n,r.slice(i+1),"both")),t),[])}var kv=Fn({findConnection:()=>Ks,findConnectionsBetween:()=>Ws,findConnectionsWithin:()=>k5});function Ks(e,t,n="directed"){if(e===t||Ur(e,t))return[];let i=qt(e.allOutgoing,t.allIncoming),r=i.size>0?new No(e,t,i):null;if(n==="directed")return r?[r]:[];let o=qt(e.allIncoming,t.allOutgoing),l=o.size>0?new No(t,e,o):null;return r&&l?[r,l]:r?[r]:l?[l]:[]}function Ws(e,t,n="both"){if(e.allIncoming.size===0&&e.allOutgoing.size===0)return[];let i=[],r=[];for(let o of t)if(e!==o)for(let l of Ks(e,o,n))l.source===e?i.push(l):r.push(l);return[...i,...r]}function k5(e){return[...e].reduce((t,n,i,r)=>(i===r.length-1||t.push(...Ws(n,r.slice(i+1),"both")),t),[])}const w5=e=>{let t=dl(e,a=>Or.create(a));function n(a){let s=e.get();if(hl(s,a))return;let c={...a,views:vc(a.views,d=>{let h=s.views[d.id];return hl(h,d)?h:d})};e.set(c)}let i=dl(e,a=>Object.values(a.views));function r(){return ir(t)}function o(){return ir(i)}function l(a){let[s,c]=vt.useState(e.value?.views[a]??null);return vt.useEffect(()=>e.subscribe(d=>{c(d.views[a]??null)}),[a]),s}return{updateModel:n,$likec4model:t,useLikeC4Model:r,useLikeC4Views:o,useLikeC4View:l}},E5=[{id:"default",title:"default"}],D5=Lr([...E5]);function wv(){return ir(D5)}let Ji={default:()=>Ft(()=>Promise.resolve().then(()=>P5),void 0)};async function Ev(e){let t=Ji[e];if(!t){const n=Object.keys(Ji);if(console.error("Unknown projectId: "+e+" (available: "+n+")"),n.length===0)throw new Error("No projects found, invalid state");e=n[0],console.warn("Falling back to project: "+e),t=Ji[e]}return await t()}var Dv=de.default;Nr.default;$o.default;Uo.default;var Cv=Zo.default,Rv=de.default;Nr.default;$o.default;Uo.default;Zo.default;Sd.default;xd();qe(Td());function C5(e){let t=yn([...e]),n=new Set(t),i=new Map,r=new de.default(()=>null),o=t.reduce((l,a,s,c)=>(i.set(a.id,a),l.set(a.id,ze(c,Rc(s+1),Go(os(a)),ld((d,h)=>(n.delete(h),d.some(ke(h))||(d.push(h),r.set(h.id,a)),d),[]))),l),new de.default(()=>[]));return{sorted:t,byId:l=>Se(i.get(l),`Element not found by id: ${l}`),root:n,parent:l=>r.get(typeof l=="string"?l:l.id),children:l=>o.get(typeof l=="string"?l:l.id),flatten:nd(()=>new Set([...n,...t.reduce((l,a)=>{let s=o.get(a.id);return s.length===0?(l.push(a),l):(s.length>1&&l.push(...s),l)},[])]))}}const er=(e,t)=>e.size>2&&t.size!==e.size?new Set(yn([...C5(e).flatten(),...t])):e.size>1?new Set(yn([...e])):e;function Xs(e,t,n){let i=s=>t.has(s),r=new Set([e]),o={incomers:new Set,subjects:new Set([e]),outgoers:new Set},l=new Set(n.incoming.flatMap(s=>{if(o.subjects.add(s.target),o.incomers.add(s.source),r.add(s.target),s.target!==e){let h=s.target.parent;for(;h&&h!==e;)r.add(h),h=h.parent}let c=s.source,d=[];for(;d.push(c),!(i(c)||!c.parent);)c=c.parent;return d})),a=new Set(n.outgoing.flatMap(s=>{if(o.subjects.add(s.source),o.outgoers.add(s.target),r.add(s.source),s.source!==e){let h=s.source.parent;for(;h&&h!==e;)r.add(h),h=h.parent}let c=s.target,d=[];for(;d.push(c),!(i(c)||!c.parent);)c=c.parent;return d}));return{incomers:er(l,o.incomers),incoming:new Set(n.incoming),subjects:er(r,o.subjects),outgoing:new Set(n.outgoing),outgoers:er(a,o.outgoers)}}function Ov(e,t,n,i="global"){let r=n?t.findView(n):null;if(i==="view")return _(r,'Scope view id is required when scope is "view"'),R5(e,r,t);let o=t.element(e);return Xs(o,Y1(o.ascendingSiblings()),{incoming:[...o.incoming()],outgoing:[...o.outgoing()]})}function R5(e,t,n){let i=n.element(e),r={incoming:lo(bt(i.incoming(),l=>t.includesRelation(l.id))),outgoing:lo(bt(i.outgoing(),l=>t.includesRelation(l.id)))},o=os(i);return Xs(i,new Set([...i.ascendingSiblings(),...ze(t.elements(),W1(l=>l.element),bt(l=>l!==i&&o(l)))]),r)}let tr={default:vt.lazy(()=>Ft(()=>Promise.resolve().then(()=>G5),void 0).then(e=>({default:e.IconRenderer})))};function Lv(e){let t=tr[e];if(!t){const n=Object.keys(tr);if(console.error("Unknown projectId: "+e+" (available: "+n+")"),n.length===0)throw new Error("No projects found, invalid state");e=n[0],console.warn("Falling back to project: "+e),t=tr[e]}return n=>nr.jsx(vt.Suspense,{children:nr.jsx(t,n)})}const Sv={updateView:()=>{throw new Error("likec4rpc.updateView is not available in production")},calcAdhocView:()=>{throw new Error("likec4rpc.calcAdhocView is not available in production")}},Ys=Lr({_stage:"layouted",projectId:"default",project:{id:"default",title:"default"},specification:{tags:{},elements:{person:{style:{shape:"person"}},system:{style:{color:"blue"}},externalSystem:{style:{color:"secondary",opacity:70}},container:{style:{color:"sky"}},database:{style:{shape:"storage",color:"slate"}},component:{style:{color:"amber"}}},relationships:{},deployments:{},customColors:{}},elements:{member:{style:{shape:"person"},description:{txt:"Член семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере."},title:"Участник",kind:"person",id:"member"},admin:{style:{shape:"person"},description:{txt:"Член семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками."},title:"Администратор",kind:"person",id:"admin"},telegramCloud:{style:{color:"secondary",opacity:70},technology:"Telegram Bot API",description:{txt:"Telegram Bot API. Доставляет updates (long-polling)."},title:"Telegram",kind:"externalSystem",id:"telegramCloud"},familyAchievements:{style:{color:"blue"},description:{txt:"Telegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений."},title:"Family Achievements",kind:"system",id:"familyAchievements"},"familyAchievements.bot":{style:{color:"sky"},technology:"Python 3.12, python-telegram-bot v21",description:{txt:"Обрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)."},title:"Telegram Bot",kind:"container",id:"familyAchievements.bot"},"familyAchievements.api":{style:{color:"sky"},technology:"Python 3.12, FastAPI, Uvicorn",description:{txt:"FastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда."},title:"REST API & Frontend",kind:"container",id:"familyAchievements.api"},"familyAchievements.db":{style:{shape:"storage",color:"slate"},technology:"SQLite (dev) / PostgreSQL 15 (prod), Alembic",description:{txt:"users, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events"},title:"Database",kind:"database",id:"familyAchievements.db"},"familyAchievements.bot.groupHandlers":{style:{color:"amber"},technology:"CommandHandler",description:{txt:"/register /join /members /achievements /progress /web"},title:"Group Handlers",kind:"component",id:"familyAchievements.bot.groupHandlers"},"familyAchievements.bot.privateHandlers":{style:{color:"amber"},technology:"ConversationHandler",description:{txt:"Просмотр ачивок, подача заявок, рецензирование (states 0-3)"},title:"Private Handlers",kind:"component",id:"familyAchievements.bot.privateHandlers"},"familyAchievements.bot.adminPanel":{style:{color:"amber"},technology:"ConversationHandler",description:{txt:"CRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)"},title:"Admin Panel",kind:"component",id:"familyAchievements.bot.adminPanel"},"familyAchievements.bot.keyboards":{style:{color:"amber"},technology:"PTB InlineKeyboardMarkup",description:{txt:"Построители всех InlineKeyboardMarkup"},title:"Keyboards",kind:"component",id:"familyAchievements.bot.keyboards"},"familyAchievements.api.restEndpoints":{style:{color:"amber"},technology:"FastAPI Router",description:{txt:"GET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories"},title:"REST Endpoints",kind:"component",id:"familyAchievements.api.restEndpoints"},"familyAchievements.api.achievementService":{style:{color:"amber"},technology:"SQLAlchemy async",description:{txt:"get_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач."},title:"Achievement Service",kind:"component",id:"familyAchievements.api.achievementService"},"familyAchievements.api.claimService":{style:{color:"amber"},technology:"SQLAlchemy async",description:{txt:"submit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота."},title:"Claim Service",kind:"component",id:"familyAchievements.api.claimService"},"familyAchievements.api.adminService":{style:{color:"amber"},technology:"SQLAlchemy async",description:{txt:"Безопасные CRUD-обёртки для категорий и ачивок, toggle prerequisite с cycle detection."},title:"Admin Service",kind:"component",id:"familyAchievements.api.adminService"},"familyAchievements.api.repos":{style:{color:"amber"},technology:"SQLAlchemy 2.0 async, selectinload",description:{txt:"user_repo, group_repo, achievement_repo, claim_repo, admin_repo"},title:"Repositories",kind:"component",id:"familyAchievements.api.repos"},"familyAchievements.api.frontend":{style:{color:"amber"},technology:"Vanilla JS, Cytoscape.js, cytoscape-dagre",description:{txt:"SPA: каталог групп, дерево ачивок, фильтры, детальная панель."},title:"Web Frontend",kind:"component",id:"familyAchievements.api.frontend"}},relations:{"1m6qjbk":{title:"команды в чате, личные сообщения",source:{model:"member"},target:{model:"telegramCloud"},id:"1m6qjbk"},"9hla3y":{title:"управление через бота",source:{model:"admin"},target:{model:"telegramCloud"},id:"9hla3y"},"1m8xnva":{title:"просматривает прогресс",source:{model:"member"},target:{model:"familyAchievements.api.frontend"},id:"1m8xnva"},"16zugdk":{title:"агрегированное дерево группы",source:{model:"admin"},target:{model:"familyAchievements.api.frontend"},id:"16zugdk"},fogont:{title:"updates (long-polling)",source:{model:"telegramCloud"},target:{model:"familyAchievements.bot"},id:"fogont"},"1ejsqbc":{title:"sendMessage / editMessage",source:{model:"familyAchievements.bot"},target:{model:"telegramCloud"},id:"1ejsqbc"},xr971v:{title:"строит клавиатуры",source:{model:"familyAchievements.bot.groupHandlers"},target:{model:"familyAchievements.bot.keyboards"},id:"xr971v"},lrnjk6:{title:"строит клавиатуры",source:{model:"familyAchievements.bot.privateHandlers"},target:{model:"familyAchievements.bot.keyboards"},id:"lrnjk6"},"1mpom1k":{title:"строит клавиатуры",source:{model:"familyAchievements.bot.adminPanel"},target:{model:"familyAchievements.bot.keyboards"},id:"1mpom1k"},acl7w:{title:"submit / approve / reject",source:{model:"familyAchievements.bot.privateHandlers"},target:{model:"familyAchievements.api.claimService"},id:"acl7w"},"1f42txz":{title:"CRUD ачивок и категорий",source:{model:"familyAchievements.bot.adminPanel"},target:{model:"familyAchievements.api.adminService"},id:"1f42txz"},b2zlcs:{title:"читает участников и ачивки",source:{model:"familyAchievements.bot.groupHandlers"},target:{model:"familyAchievements.api.repos"},id:"b2zlcs"},"160lqni":{title:"get_user_achievements_by_status",source:{model:"familyAchievements.bot.privateHandlers"},target:{model:"familyAchievements.api.achievementService"},id:"160lqni"},"1dor4sx":{title:"tree / aggregate",source:{model:"familyAchievements.api.restEndpoints"},target:{model:"familyAchievements.api.achievementService"},id:"1dor4sx"},h1rl0x:{title:"groups, members, categories",source:{model:"familyAchievements.api.restEndpoints"},target:{model:"familyAchievements.api.repos"},id:"h1rl0x"},"1rdelig":{title:"compute_achievement_status",source:{model:"familyAchievements.api.achievementService"},target:{model:"familyAchievements.api.repos"},id:"1rdelig"},"15mtfus":{title:"claim CRUD",source:{model:"familyAchievements.api.claimService"},target:{model:"familyAchievements.api.repos"},id:"15mtfus"},"10siobq":{title:"achievement / category CRUD",source:{model:"familyAchievements.api.adminService"},target:{model:"familyAchievements.api.repos"},id:"10siobq"},j1vhnp:{title:"SQL",source:{model:"familyAchievements.api.repos"},target:{model:"familyAchievements.db"},id:"j1vhnp"},pn0ulu:{title:"SQL (shared SQLAlchemy engine)",source:{model:"familyAchievements.bot"},target:{model:"familyAchievements.db"},id:"pn0ulu"}},globals:{predicates:{},dynamicPredicates:{},styles:{}},views:{index:{_type:"element",tags:null,links:null,_stage:"layouted",sourcePath:"architecture.likec4",description:null,title:"System Context",id:"index",autoLayout:{direction:"TB"},hash:"_THeLm-VxqLG74op-VsJwkm-r903mjYXo6iSnxJrIF0",bounds:{x:0,y:0,width:995,height:826},nodes:[{id:"member",parent:null,level:0,children:[],inEdges:[],outEdges:["1c7wxyi","1c8f41k"],title:"Участник",modelRef:"member",shape:"person",color:"green",style:{opacity:15,size:"md"},description:{txt:"Член семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере."},tags:[],kind:"person",navigateTo:"__member",x:0,y:0,width:356,height:180,labelBBox:{x:18,y:54,width:321,height:66}},{id:"admin",parent:null,level:0,children:[],inEdges:[],outEdges:["1g67cnp","17an1j"],title:"Администратор",modelRef:"admin",shape:"person",color:"red",style:{opacity:15,size:"md"},description:{txt:"Член семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками."},tags:[],kind:"person",navigateTo:"__admin",x:498,y:0,width:336,height:180,labelBBox:{x:18,y:45,width:300,height:84}},{id:"telegramCloud",parent:null,level:0,children:[],inEdges:["1c7wxyi","1g67cnp","q4a714"],outEdges:["ti0fiw"],title:"Telegram",modelRef:"telegramCloud",shape:"rectangle",color:"secondary",style:{opacity:70,size:"md"},description:{txt:"Telegram Bot API. Доставляет updates (long-polling)."},tags:[],technology:"Telegram Bot API",kind:"externalSystem",navigateTo:"__telegramCloud",x:310,y:323,width:320,height:180,labelBBox:{x:25,y:44,width:272,height:85}},{id:"familyAchievements",parent:null,level:0,children:[],inEdges:["1c8f41k","17an1j","ti0fiw"],outEdges:["q4a714"],title:"Family Achievements",modelRef:"familyAchievements",shape:"rectangle",color:"blue",style:{opacity:15,size:"md"},description:{txt:"Telegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений."},tags:[],kind:"system",navigateTo:"containers",x:224,y:646,width:370,height:180,labelBBox:{x:18,y:54,width:334,height:65}}],edges:[{id:"1c7wxyi",source:"member",target:"telegramCloud",label:"команды в чате, личные сообщения",points:[[235,180],[254,207],[277,237],[300,263],[316,281],[335,299],[353,316]],labelBBox:{x:301,y:240,width:233,height:18},parent:null,relations:["1m6qjbk"],color:"gray",line:"dashed",head:"normal"},{id:"1c8f41k",source:"member",target:"familyAchievements",label:"просматривает прогресс",points:[[124,180],[78,266],[29,399],[82,503],[112,560],[163,606],[216,642]],labelBBox:{x:83,y:401,width:171,height:18},parent:null,relations:["1m8xnva"],color:"gray",line:"dashed",head:"normal"},{id:"1g67cnp",source:"admin",target:"telegramCloud",label:"управление через бота",points:[[612,180],[587,222],[556,271],[530,314]],labelBBox:{x:575,y:240,width:160,height:18},parent:null,relations:["9hla3y"],color:"gray",line:"dashed",head:"normal"},{id:"17an1j",source:"admin",target:"familyAchievements",label:"агрегированное дерево группы",points:[[735,180],[746,199],[756,219],[762,240],[808,395],[757,462],[653,586],[637,606],[617,624],[595,640]],labelBBox:{x:780,y:401,width:214,height:18},parent:null,relations:["16zugdk"],color:"gray",line:"dashed",head:"normal"},{id:"ti0fiw",source:"telegramCloud",target:"familyAchievements",label:"updates (long-polling)",points:[[311,500],[290,518],[272,539],[260,563],[246,589],[253,615],[270,638]],labelBBox:{x:261,y:562,width:139,height:18},parent:null,relations:["fogont"],color:"gray",line:"dashed",head:"normal"},{id:"q4a714",source:"familyAchievements",target:"telegramCloud",label:"sendMessage / editMessage",points:[[426,646],[434,605],[444,555],[452,513]],labelBBox:{x:443,y:562,width:182,height:18},parent:null,relations:["1ejsqbc"],color:"gray",line:"dashed",head:"normal"}]},containers:{_type:"element",tags:null,links:null,viewOf:"familyAchievements",_stage:"layouted",sourcePath:"architecture.likec4",description:null,title:"Containers",id:"containers",autoLayout:{direction:"TB"},hash:"XMPhSTv4dWxXqokv1l1hrBirN0oZu2w6pKmiZL9mjb0",bounds:{x:0,y:0,width:1975,height:826},nodes:[{id:"familyAchievements.bot",parent:null,level:0,children:[],inEdges:["1xo62wf"],outEdges:["1u39wwb","1b7cp91","uel78v"],title:"Telegram Bot",modelRef:"familyAchievements.bot",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"Обрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)."},tags:[],technology:"Python 3.12, python-telegram-bot v21",kind:"container",navigateTo:"botComponents",x:120,y:0,width:352,height:180,labelBBox:{x:18,y:35,width:317,height:103}},{id:"member",parent:null,level:0,children:[],inEdges:[],outEdges:["ui1qr2","1c7wxyi"],title:"Участник",modelRef:"member",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере."},tags:[],kind:"person",navigateTo:"__member",x:628,y:0,width:356,height:180,labelBBox:{x:18,y:54,width:321,height:66}},{id:"admin",parent:null,level:0,children:[],inEdges:[],outEdges:["nivhgx","1g67cnp"],title:"Администратор",modelRef:"admin",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками."},tags:[],kind:"person",navigateTo:"__admin",x:1418,y:0,width:336,height:180,labelBBox:{x:18,y:45,width:300,height:84}},{id:"familyAchievements.api",parent:null,level:0,children:[],inEdges:["1u39wwb","ui1qr2","nivhgx"],outEdges:["xrk7n8"],title:"REST API & Frontend",modelRef:"familyAchievements.api",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"FastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда."},tags:[],technology:"Python 3.12, FastAPI, Uvicorn",kind:"container",navigateTo:"apiComponents",x:1030,y:323,width:343,height:180,labelBBox:{x:18,y:44,width:308,height:85}},{id:"telegramCloud",parent:null,level:0,children:[],inEdges:["uel78v","1c7wxyi","1g67cnp"],outEdges:["1xo62wf"],title:"Telegram",modelRef:"telegramCloud",shape:"rectangle",color:"secondary",style:{opacity:70,size:"md"},description:{txt:"Telegram Bot API. Доставляет updates (long-polling)."},tags:[],technology:"Telegram Bot API",kind:"externalSystem",navigateTo:"__telegramCloud",x:600,y:323,width:320,height:180,labelBBox:{x:24,y:44,width:272,height:85}},{id:"familyAchievements.db",parent:null,level:0,children:[],inEdges:["1b7cp91","xrk7n8"],outEdges:[],title:"Database",modelRef:"familyAchievements.db",shape:"storage",color:"slate",style:{opacity:15,size:"md"},description:{txt:"users, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events"},tags:[],technology:"SQLite (dev) / PostgreSQL 15 (prod), Alembic",kind:"database",navigateTo:"__familyAchievements_db",x:0,y:646,width:330,height:180,labelBBox:{x:18,y:26,width:294,height:121}}],edges:[{id:"1u39wwb",source:"familyAchievements.bot",target:"familyAchievements.api",label:"[...]",points:[[472,153],[505,163],[540,173],[573,180],[778,226],[855,144],[1042,240],[1077,258],[1108,286],[1133,315]],labelBBox:{x:1075,y:239,width:25,height:18},parent:null,relations:["acl7w","1f42txz","b2zlcs","160lqni"],color:"gray",line:"dashed",head:"normal"},{id:"1b7cp91",source:"familyAchievements.bot",target:"familyAchievements.db",label:"SQL (shared SQLAlchemy engine)",points:[[223,180],[210,199],[199,219],[192,240],[147,371],[148,532],[155,634]],labelBBox:{x:170,y:401,width:220,height:18},parent:null,relations:["pn0ulu"],color:"gray",line:"dashed",head:"normal"},{id:"xrk7n8",source:"familyAchievements.api",target:"familyAchievements.db",label:"SQL",points:[[1030,483],[1012,490],[993,497],[975,503],[759,576],[506,646],[341,690]],labelBBox:{x:778,y:562,width:32,height:18},parent:null,relations:["j1vhnp"],color:"gray",line:"dashed",head:"normal"},{id:"ui1qr2",source:"member",target:"familyAchievements.api",label:"просматривает прогресс",points:[[985,120],[1058,141],[1136,177],[1184,240],[1200,261],[1207,287],[1210,313]],labelBBox:{x:1197,y:240,width:171,height:18},parent:null,relations:["1m8xnva"],color:"gray",line:"dashed",head:"normal"},{id:"nivhgx",source:"admin",target:"familyAchievements.api",label:"агрегированное дерево группы",points:[[1734,180],[1759,205],[1771,234],[1749,263],[1704,321],[1525,362],[1384,386]],labelBBox:{x:1760,y:240,width:214,height:18},parent:null,relations:["16zugdk"],color:"gray",line:"dashed",head:"normal"},{id:"uel78v",source:"familyAchievements.bot",target:"telegramCloud",label:"sendMessage / editMessage",points:[[228,180],[215,208],[210,238],[229,263],[273,321],[452,362],[590,387]],labelBBox:{x:230,y:240,width:182,height:18},parent:null,relations:["1ejsqbc"],color:"gray",line:"dashed",head:"normal"},{id:"1c7wxyi",source:"member",target:"telegramCloud",label:"команды в чате, личные сообщения",points:[[793,180],[790,199],[786,220],[784,240],[780,264],[777,289],[773,313]],labelBBox:{x:785,y:240,width:233,height:18},parent:null,relations:["1m6qjbk"],color:"gray",line:"dashed",head:"normal"},{id:"1g67cnp",source:"admin",target:"telegramCloud",label:"управление через бота",points:[[1509,180],[1478,211],[1438,243],[1396,263],[1225,343],[1157,273],[975,323],[960,327],[945,332],[930,337]],labelBBox:{x:1433,y:240,width:160,height:18},parent:null,relations:["9hla3y"],color:"gray",line:"dashed",head:"normal"},{id:"1xo62wf",source:"telegramCloud",target:"familyAchievements.bot",label:"updates (long-polling)",points:[[632,323],[570,280],[496,229],[433,186]],labelBBox:{x:543,y:240,width:139,height:18},parent:null,relations:["fogont"],color:"gray",line:"dashed",head:"normal"}]},botComponents:{_type:"element",tags:null,links:null,viewOf:"familyAchievements.bot",_stage:"layouted",sourcePath:"architecture.likec4",description:null,title:"Bot — Components",id:"botComponents",autoLayout:{direction:"LR"},hash:"pSd-kKLkc2KH6JNeo82hqkLxjf1LghGqsMUxxDAw3qY",bounds:{x:0,y:0,width:941,height:1050},nodes:[{id:"familyAchievements.bot.groupHandlers",parent:null,level:0,children:[],inEdges:[],outEdges:["10xtbds"],title:"Group Handlers",modelRef:"familyAchievements.bot.groupHandlers",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"/register /join /members /achievements /progress /web"},tags:[],technology:"CommandHandler",kind:"component",navigateTo:"__familyAchievements_bot_groupHandlers",x:21,y:290,width:320,height:180,labelBBox:{x:30,y:44,width:262,height:85}},{id:"familyAchievements.bot.privateHandlers",parent:null,level:0,children:[],inEdges:[],outEdges:["1bkvqj6"],title:"Private Handlers",modelRef:"familyAchievements.bot.privateHandlers",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Просмотр ачивок, подача заявок, рецензирование (states 0-3)"},tags:[],technology:"ConversationHandler",kind:"component",navigateTo:"__familyAchievements_bot_privateHandlers",x:21,y:580,width:320,height:180,labelBBox:{x:40,y:44,width:242,height:85}},{id:"familyAchievements.bot.adminPanel",parent:null,level:0,children:[],inEdges:[],outEdges:["1tro9t9"],title:"Admin Panel",modelRef:"familyAchievements.bot.adminPanel",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"CRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)"},tags:[],technology:"ConversationHandler",kind:"component",navigateTo:"__familyAchievements_bot_adminPanel",x:0,y:870,width:362,height:180,labelBBox:{x:18,y:35,width:327,height:103}},{id:"familyAchievements.bot.keyboards",parent:null,level:0,children:[],inEdges:["10xtbds","1bkvqj6","1tro9t9"],outEdges:[],title:"Keyboards",modelRef:"familyAchievements.bot.keyboards",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Построители всех InlineKeyboardMarkup"},tags:[],technology:"PTB InlineKeyboardMarkup",kind:"component",navigateTo:"__familyAchievements_bot_keyboards",x:617,y:580,width:323,height:180,labelBBox:{x:18,y:53,width:287,height:67}},{id:"familyAchievements.db",parent:null,level:0,children:[],inEdges:[],outEdges:[],title:"Database",modelRef:"familyAchievements.db",shape:"storage",color:"slate",style:{opacity:15,size:"md"},description:{txt:"users, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events"},tags:[],technology:"SQLite (dev) / PostgreSQL 15 (prod), Alembic",kind:"database",navigateTo:"__familyAchievements_db",x:16,y:0,width:330,height:180,labelBBox:{x:18,y:26,width:294,height:121}}],edges:[{id:"10xtbds",source:"familyAchievements.bot.groupHandlers",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[341,457],[423,497],[524,546],[608,587]],labelBBox:{x:424,y:476,width:132,height:18},parent:null,relations:["xr971v"],color:"gray",line:"dashed",head:"normal"},{id:"1bkvqj6",source:"familyAchievements.bot.privateHandlers",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[341,670],[423,670],[523,670],[607,670]],labelBBox:{x:424,y:647,width:132,height:18},parent:null,relations:["lrnjk6"],color:"gray",line:"dashed",head:"normal"},{id:"1tro9t9",source:"familyAchievements.bot.adminPanel",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[363,872],[441,834],[531,790],[608,753]],labelBBox:{x:424,y:757,width:132,height:18},parent:null,relations:["1mpom1k"],color:"gray",line:"dashed",head:"normal"}]},apiComponents:{_type:"element",tags:null,links:null,viewOf:"familyAchievements.api",_stage:"layouted",sourcePath:"architecture.likec4",description:null,title:"API — Components",id:"apiComponents",autoLayout:{direction:"LR"},hash:"G1ZKhNaKjxzwdL2DEA3A3BtnmH2d_70XzbHH8BK6NEA",bounds:{x:0,y:0,width:2184,height:1352},nodes:[{id:"familyAchievements.api.restEndpoints",parent:null,level:0,children:[],inEdges:[],outEdges:["ih6epc","164vvld"],title:"REST Endpoints",modelRef:"familyAchievements.api.restEndpoints",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"GET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories"},tags:[],technology:"FastAPI Router",kind:"component",navigateTo:"__familyAchievements_api_restEndpoints",x:11,y:592,width:333,height:180,labelBBox:{x:19,y:44,width:297,height:85}},{id:"familyAchievements.api.claimService",parent:null,level:0,children:[],inEdges:[],outEdges:["11j4tdy"],title:"Claim Service",modelRef:"familyAchievements.api.claimService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"submit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота."},tags:[],technology:"SQLAlchemy async",kind:"component",navigateTo:"__familyAchievements_api_claimService",x:0,y:882,width:356,height:180,labelBBox:{x:18,y:44,width:321,height:85}},{id:"familyAchievements.api.adminService",parent:null,level:0,children:[],inEdges:[],outEdges:["1m9ligz"],title:"Admin Service",modelRef:"familyAchievements.api.adminService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Безопасные CRUD-обёртки для категорий и ачивок, toggle prerequisite с cycle detection."},tags:[],technology:"SQLAlchemy async",kind:"component",navigateTo:"__familyAchievements_api_adminService",x:0,y:1172,width:355,height:180,labelBBox:{x:19,y:35,width:319,height:103}},{id:"member",parent:null,level:0,children:[],inEdges:[],outEdges:["1eq1rou"],title:"Участник",modelRef:"member",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере."},tags:[],kind:"person",navigateTo:"__member",x:0,y:0,width:356,height:180,labelBBox:{x:18,y:54,width:321,height:66}},{id:"admin",parent:null,level:0,children:[],inEdges:[],outEdges:["1hgima9"],title:"Администратор",modelRef:"admin",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками."},tags:[],kind:"person",navigateTo:"__admin",x:10,y:290,width:336,height:180,labelBBox:{x:18,y:45,width:300,height:84}},{id:"familyAchievements.api.achievementService",parent:null,level:0,children:[],inEdges:["ih6epc"],outEdges:["13i14qz"],title:"Achievement Service",modelRef:"familyAchievements.api.achievementService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"get_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач."},tags:[],technology:"SQLAlchemy async",kind:"component",navigateTo:"__familyAchievements_api_achievementService",x:704,y:416,width:344,height:180,labelBBox:{x:18,y:35,width:308,height:103}},{id:"familyAchievements.api.frontend",parent:null,level:0,children:[],inEdges:["1eq1rou","1hgima9"],outEdges:[],title:"Web Frontend",modelRef:"familyAchievements.api.frontend",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"SPA: каталог групп, дерево ачивок, фильтры, детальная панель."},tags:[],technology:"Vanilla JS, Cytoscape.js, cytoscape-dagre",kind:"component",navigateTo:"__familyAchievements_api_frontend",x:693,y:63,width:366,height:180,labelBBox:{x:18,y:44,width:330,height:85}},{id:"familyAchievements.api.repos",parent:null,level:0,children:[],inEdges:["164vvld","13i14qz","11j4tdy","1m9ligz"],outEdges:["ee7e75"],title:"Repositories",modelRef:"familyAchievements.api.repos",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"user_repo, group_repo, achievement_repo, claim_repo, admin_repo"},tags:[],technology:"SQLAlchemy 2.0 async, selectinload",kind:"component",navigateTo:"__familyAchievements_api_repos",x:1371,y:761,width:328,height:180,labelBBox:{x:18,y:44,width:293,height:85}},{id:"familyAchievements.db",parent:null,level:0,children:[],inEdges:["ee7e75"],outEdges:[],title:"Database",modelRef:"familyAchievements.db",shape:"storage",color:"slate",style:{opacity:15,size:"md"},description:{txt:"users, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events"},tags:[],technology:"SQLite (dev) / PostgreSQL 15 (prod), Alembic",kind:"database",navigateTo:"__familyAchievements_db",x:1854,y:761,width:330,height:180,labelBBox:{x:18,y:26,width:294,height:121}}],edges:[{id:"ih6epc",source:"familyAchievements.api.restEndpoints",target:"familyAchievements.api.achievementService",label:"tree / aggregate",points:[[345,640],[450,614],[586,579],[694,552]],labelBBox:{x:473,y:545,width:103,height:18},parent:null,relations:["1dor4sx"],color:"gray",line:"dashed",head:"normal"},{id:"164vvld",source:"familyAchievements.api.restEndpoints",target:"familyAchievements.api.repos",label:"groups, members, categories",points:[[345,692],[566,706],[970,739],[1311,797],[1327,800],[1344,803],[1361,807]],labelBBox:{x:783,y:697,width:185,height:18},parent:null,relations:["h1rl0x"],color:"gray",line:"dashed",head:"normal"},{id:"13i14qz",source:"familyAchievements.api.achievementService",target:"familyAchievements.api.repos",label:"compute_achievement_status",points:[[1048,543],[1131,565],[1230,599],[1311,646],[1360,675],[1408,716],[1447,754]],labelBBox:{x:1120,y:544,width:190,height:18},parent:null,relations:["1rdelig"],color:"gray",line:"dashed",head:"normal"},{id:"11j4tdy",source:"familyAchievements.api.claimService",target:"familyAchievements.api.repos",label:"claim CRUD",points:[[357,956],[617,933],[1102,890],[1361,866]],labelBBox:{x:835,y:870,width:81,height:18},parent:null,relations:["15mtfus"],color:"gray",line:"dashed",head:"normal"},{id:"1m9ligz",source:"familyAchievements.api.adminService",target:"familyAchievements.api.repos",label:"achievement / category CRUD",points:[[356,1208],[617,1129],[1102,982],[1361,904]],labelBBox:{x:779,y:972,width:193,height:18},parent:null,relations:["10siobq"],color:"gray",line:"dashed",head:"normal"},{id:"ee7e75",source:"familyAchievements.api.repos",target:"familyAchievements.db",label:"SQL",points:[[1699,851],[1745,851],[1796,851],[1843,851]],labelBBox:{x:1761,y:828,width:32,height:18},parent:null,relations:["j1vhnp"],color:"gray",line:"dashed",head:"normal"},{id:"1eq1rou",source:"member",target:"familyAchievements.api.frontend",label:"просматривает прогресс",points:[[357,106],[456,115],[581,126],[683,136]],labelBBox:{x:439,y:89,width:171,height:18},parent:null,relations:["1m8xnva"],color:"gray",line:"dashed",head:"normal"},{id:"1hgima9",source:"admin",target:"familyAchievements.api.frontend",label:"агрегированное дерево группы",points:[[346,326],[447,293],[577,250],[683,216]],labelBBox:{x:418,y:210,width:214,height:18},parent:null,relations:["16zugdk"],color:"gray",line:"dashed",head:"normal"}]},claimFlow:{_type:"element",tags:null,links:null,_stage:"layouted",sourcePath:"architecture.likec4",description:null,title:"Claim Flow",id:"claimFlow",autoLayout:{direction:"TB"},hash:"xUUnNlRAXE7KQMYOZ7MK7TkmJP_QlSb7Yqq7TxXTBo4",bounds:{x:0,y:0,width:2076,height:1013},nodes:[{id:"member",parent:null,level:0,children:[],inEdges:[],outEdges:["1c7wxyi"],title:"Участник",modelRef:"member",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере."},tags:[],kind:"person",navigateTo:"__member",x:1274,y:130,width:356,height:180,labelBBox:{x:18,y:54,width:321,height:66}},{id:"admin",parent:null,level:0,children:[],inEdges:[],outEdges:["1g67cnp"],title:"Администратор",modelRef:"admin",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками."},tags:[],kind:"person",navigateTo:"__admin",x:1740,y:130,width:336,height:180,labelBBox:{x:18,y:45,width:300,height:84}},{id:"familyAchievements",parent:null,level:0,children:["familyAchievements.bot","familyAchievements.api","familyAchievements.db"],inEdges:[],outEdges:[],title:"Family Achievements",modelRef:"familyAchievements",shape:"rectangle",color:"blue",style:{opacity:15,size:"md"},description:{txt:"Telegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений."},tags:[],kind:"system",depth:2,navigateTo:"containers",x:8,y:8,width:1109,height:997,labelBBox:{x:6,y:0,width:135,height:15}},{id:"familyAchievements.bot",parent:"familyAchievements",level:1,children:["familyAchievements.bot.privateHandlers","familyAchievements.bot.adminPanel"],inEdges:[],outEdges:["2r7apm","1b7cp91"],title:"Telegram Bot",modelRef:"familyAchievements.bot",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"Обрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)."},tags:[],technology:"Python 3.12, python-telegram-bot v21",kind:"container",depth:1,navigateTo:"botComponents",x:66,y:69,width:872,height:281,labelBBox:{x:6,y:0,width:92,height:15}},{id:"telegramCloud",parent:null,level:0,children:[],inEdges:["1c7wxyi","1g67cnp"],outEdges:[],title:"Telegram",modelRef:"telegramCloud",shape:"rectangle",color:"secondary",style:{opacity:70,size:"md"},description:{txt:"Telegram Bot API. Доставляет updates (long-polling)."},tags:[],technology:"Telegram Bot API",kind:"externalSystem",navigateTo:"__telegramCloud",x:1409,y:462,width:320,height:180,labelBBox:{x:24,y:45,width:272,height:85}},{id:"familyAchievements.bot.privateHandlers",parent:"familyAchievements.bot",level:2,children:[],inEdges:[],outEdges:["2r7apm"],title:"Private Handlers",modelRef:"familyAchievements.bot.privateHandlers",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Просмотр ачивок, подача заявок, рецензирование (states 0-3)"},tags:[],technology:"ConversationHandler",kind:"component",navigateTo:"__familyAchievements_bot_privateHandlers",x:106,y:130,width:320,height:180,labelBBox:{x:39,y:45,width:242,height:85}},{id:"familyAchievements.bot.adminPanel",parent:"familyAchievements.bot",level:2,children:[],inEdges:[],outEdges:[],title:"Admin Panel",modelRef:"familyAchievements.bot.adminPanel",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"CRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)"},tags:[],technology:"ConversationHandler",kind:"component",navigateTo:"__familyAchievements_bot_adminPanel",x:536,y:130,width:362,height:180,labelBBox:{x:18,y:36,width:327,height:103}},{id:"familyAchievements.api",parent:"familyAchievements",level:1,children:["familyAchievements.api.claimService","familyAchievements.api.repos"],inEdges:["2r7apm"],outEdges:["ee7e75"],title:"REST API & Frontend",modelRef:"familyAchievements.api",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"FastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда."},tags:[],technology:"Python 3.12, FastAPI, Uvicorn",kind:"container",depth:1,navigateTo:"apiComponents",x:48,y:401,width:957,height:281,labelBBox:{x:6,y:0,width:130,height:15}},{id:"familyAchievements.api.claimService",parent:"familyAchievements.api",level:2,children:[],inEdges:["2r7apm"],outEdges:["11j4tdy"],title:"Claim Service",modelRef:"familyAchievements.api.claimService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"submit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота."},tags:[],technology:"SQLAlchemy async",kind:"component",navigateTo:"__familyAchievements_api_claimService",x:88,y:462,width:356,height:180,labelBBox:{x:18,y:45,width:321,height:85}},{id:"familyAchievements.api.repos",parent:"familyAchievements.api",level:2,children:[],inEdges:["11j4tdy"],outEdges:["ee7e75"],title:"Repositories",modelRef:"familyAchievements.api.repos",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"user_repo, group_repo, achievement_repo, claim_repo, admin_repo"},tags:[],technology:"SQLAlchemy 2.0 async, selectinload",kind:"component",navigateTo:"__familyAchievements_api_repos",x:637,y:462,width:328,height:180,labelBBox:{x:18,y:45,width:293,height:85}},{id:"familyAchievements.db",parent:"familyAchievements",level:1,children:[],inEdges:["1b7cp91","ee7e75"],outEdges:[],title:"Database",modelRef:"familyAchievements.db",shape:"storage",color:"slate",style:{opacity:15,size:"md"},description:{txt:"users, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events"},tags:[],technology:"SQLite (dev) / PostgreSQL 15 (prod), Alembic",kind:"database",navigateTo:"__familyAchievements_db",x:636,y:785,width:330,height:180,labelBBox:{x:18,y:26,width:294,height:122}}],edges:[{id:"1c7wxyi",source:"member",target:"telegramCloud",label:"команды в чате, личные сообщения",points:[[1484,310],[1499,354],[1518,408],[1534,453]],labelBBox:{x:1512,y:370,width:233,height:18},parent:null,relations:["1m6qjbk"],color:"gray",line:"dashed",head:"normal"},{id:"1g67cnp",source:"admin",target:"telegramCloud",label:"управление через бота",points:[[1845,310],[1823,338],[1798,368],[1773,393],[1751,415],[1726,436],[1702,456]],labelBBox:{x:1795,y:370,width:160,height:18},parent:null,relations:["9hla3y"],color:"gray",line:"dashed",head:"normal"},{id:"2r7apm",source:"familyAchievements.bot.privateHandlers",target:"familyAchievements.api.claimService",label:"submit / approve / reject",points:[[140,310],[120,335],[109,363],[121,393],[129,415],[142,436],[157,455]],labelBBox:{x:122,y:370,width:153,height:18},parent:"familyAchievements",relations:["acl7w"],color:"gray",line:"dashed",head:"normal"},{id:"11j4tdy",source:"familyAchievements.api.claimService",target:"familyAchievements.api.repos",label:"claim CRUD",points:[[444,552],[503,552],[568,552],[626,552]],labelBBox:{x:500,y:526,width:81,height:18},parent:"familyAchievements.api",relations:["15mtfus"],color:"gray",line:"dashed",head:"normal"},{id:"ee7e75",source:"familyAchievements.api.repos",target:"familyAchievements.db",label:"SQL",points:[[801,642],[801,683],[801,732],[801,774]],labelBBox:{x:802,y:702,width:32,height:18},parent:"familyAchievements",relations:["j1vhnp"],color:"gray",line:"dashed",head:"normal"},{id:"1b7cp91",source:"familyAchievements.bot",target:"familyAchievements.db",label:"SQL (shared SQLAlchemy engine)",points:[[938,307],[976,332],[1010,363],[1032,401],[1095,509],[1085,569],[1032,682],[1014,721],[983,755],[950,783]],labelBBox:{x:1073,y:549,width:220,height:18},parent:"familyAchievements",relations:["pn0ulu"],color:"gray",line:"dashed",head:"normal"}]},__member:{_stage:"layouted",_type:"element",id:"__member",viewOf:"member",title:"Auto / Участник",description:null,autoLayout:{direction:"TB"},hash:"P9WmglzoeNRb2AlheX0md-s0sH0tjYqlgauRgEMZ_Kc",bounds:{x:0,y:0,width:800,height:503},nodes:[{id:"member",parent:null,level:0,children:[],inEdges:[],outEdges:["1c7wxyi","1c8f41k"],title:"Участник",modelRef:"member",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере."},tags:[],kind:"person",x:209,y:0,width:356,height:180,labelBBox:{x:18,y:54,width:321,height:66}},{id:"telegramCloud",parent:null,level:0,children:[],inEdges:["1c7wxyi"],outEdges:[],title:"Telegram",modelRef:"telegramCloud",shape:"rectangle",color:"secondary",style:{opacity:70,size:"md"},description:{txt:"Telegram Bot API. Доставляет updates (long-polling)."},tags:[],technology:"Telegram Bot API",kind:"externalSystem",navigateTo:"__telegramCloud",x:0,y:323,width:320,height:180,labelBBox:{x:24,y:44,width:272,height:85}},{id:"familyAchievements",parent:null,level:0,children:[],inEdges:["1c8f41k"],outEdges:[],title:"Family Achievements",modelRef:"familyAchievements",shape:"rectangle",color:"blue",style:{opacity:15,size:"md"},description:{txt:"Telegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений."},tags:[],kind:"system",navigateTo:"containers",x:430,y:323,width:370,height:180,labelBBox:{x:18,y:54,width:334,height:65}}],edges:[{id:"1c7wxyi",source:"member",target:"telegramCloud",label:"команды в чате, личные сообщения",points:[[292,180],[274,199],[257,219],[243,240],[227,263],[213,289],[200,314]],labelBBox:{x:244,y:240,width:233,height:18},parent:null,relations:["1m6qjbk"],color:"gray",line:"dashed",head:"normal"},{id:"1c8f41k",source:"member",target:"familyAchievements",label:"просматривает прогресс",points:[[456,180],[471,199],[487,220],[501,240],[518,264],[536,290],[552,315]],labelBBox:{x:515,y:240,width:171,height:18},parent:null,relations:["1m8xnva"],color:"gray",line:"dashed",head:"normal"}]},__admin:{_stage:"layouted",_type:"element",id:"__admin",viewOf:"admin",title:"Auto / Администратор",description:null,autoLayout:{direction:"TB"},hash:"dIcZ9-naUBlfPbEa-hNma4vLNzaAeyyxoqKv5xiVEKg",bounds:{x:0,y:0,width:800,height:503},nodes:[{id:"admin",parent:null,level:0,children:[],inEdges:[],outEdges:["1g67cnp","17an1j"],title:"Администратор",modelRef:"admin",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками."},tags:[],kind:"person",x:219,y:0,width:336,height:180,labelBBox:{x:18,y:45,width:300,height:84}},{id:"telegramCloud",parent:null,level:0,children:[],inEdges:["1g67cnp"],outEdges:[],title:"Telegram",modelRef:"telegramCloud",shape:"rectangle",color:"secondary",style:{opacity:70,size:"md"},description:{txt:"Telegram Bot API. Доставляет updates (long-polling)."},tags:[],technology:"Telegram Bot API",kind:"externalSystem",navigateTo:"__telegramCloud",x:0,y:323,width:320,height:180,labelBBox:{x:24,y:44,width:272,height:85}},{id:"familyAchievements",parent:null,level:0,children:[],inEdges:["17an1j"],outEdges:[],title:"Family Achievements",modelRef:"familyAchievements",shape:"rectangle",color:"blue",style:{opacity:15,size:"md"},description:{txt:"Telegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений."},tags:[],kind:"system",navigateTo:"containers",x:430,y:323,width:370,height:180,labelBBox:{x:18,y:54,width:334,height:65}}],edges:[{id:"1g67cnp",source:"admin",target:"telegramCloud",label:"управление через бота",points:[[324,180],[295,222],[259,272],[229,315]],labelBBox:{x:281,y:240,width:160,height:18},parent:null,relations:["9hla3y"],color:"gray",line:"dashed",head:"normal"},{id:"17an1j",source:"admin",target:"familyAchievements",label:"агрегированное дерево группы",points:[[450,180],[480,222],[515,272],[546,315]],labelBBox:{x:509,y:240,width:214,height:18},parent:null,relations:["16zugdk"],color:"gray",line:"dashed",head:"normal"}]},__telegramCloud:{_stage:"layouted",_type:"element",id:"__telegramCloud",viewOf:"telegramCloud",title:"Auto / Telegram",description:null,autoLayout:{direction:"TB"},hash:"4_Fx7OX9tEEccphmasgmYKuDbjoUHsSMt9p2ui0Io8U",bounds:{x:0,y:0,width:802,height:826},nodes:[{id:"member",parent:null,level:0,children:[],inEdges:[],outEdges:["1c7wxyi"],title:"Участник",modelRef:"member",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере."},tags:[],kind:"person",navigateTo:"__member",x:0,y:0,width:356,height:180,labelBBox:{x:18,y:54,width:321,height:66}},{id:"admin",parent:null,level:0,children:[],inEdges:[],outEdges:["1g67cnp"],title:"Администратор",modelRef:"admin",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками."},tags:[],kind:"person",navigateTo:"__admin",x:466,y:0,width:336,height:180,labelBBox:{x:18,y:45,width:300,height:84}},{id:"familyAchievements",parent:null,level:0,children:[],inEdges:["ti0fiw"],outEdges:["q4a714"],title:"Family Achievements",modelRef:"familyAchievements",shape:"rectangle",color:"blue",style:{opacity:15,size:"md"},description:{txt:"Telegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений."},tags:[],kind:"system",navigateTo:"containers",x:221,y:646,width:370,height:180,labelBBox:{x:18,y:54,width:334,height:65}},{id:"telegramCloud",parent:null,level:0,children:[],inEdges:["1c7wxyi","1g67cnp","q4a714"],outEdges:["ti0fiw"],title:"Telegram",modelRef:"telegramCloud",shape:"rectangle",color:"secondary",style:{opacity:70,size:"md"},description:{txt:"Telegram Bot API. Доставляет updates (long-polling)."},tags:[],technology:"Telegram Bot API",kind:"externalSystem",x:246,y:323,width:320,height:180,labelBBox:{x:25,y:44,width:272,height:85}}],edges:[{id:"1c7wxyi",source:"member",target:"telegramCloud",label:"команды в чате, личные сообщения",points:[[215,180],[228,207],[244,237],[262,263],[274,281],[289,299],[304,315]],labelBBox:{x:263,y:240,width:233,height:18},parent:null,relations:["1m6qjbk"],color:"gray",line:"dashed",head:"normal"},{id:"1g67cnp",source:"admin",target:"telegramCloud",label:"управление через бота",points:[[577,180],[559,207],[539,236],[520,263],[508,280],[495,298],[482,315]],labelBBox:{x:534,y:240,width:160,height:18},parent:null,relations:["9hla3y"],color:"gray",line:"dashed",head:"normal"},{id:"q4a714",source:"familyAchievements",target:"telegramCloud",label:"sendMessage / editMessage",points:[[418,646],[420,619],[422,590],[420,563],[420,547],[418,530],[417,513]],labelBBox:{x:422,y:562,width:182,height:18},parent:null,relations:["1ejsqbc"],color:"gray",line:"dashed",head:"normal"},{id:"ti0fiw",source:"telegramCloud",target:"familyAchievements",label:"updates (long-polling)",points:[[272,503],[251,527],[240,556],[253,586],[261,604],[272,622],[286,638]],labelBBox:{x:254,y:562,width:139,height:18},parent:null,relations:["fogont"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_db:{_stage:"layouted",_type:"element",id:"__familyAchievements_db",viewOf:"familyAchievements.db",title:"Auto / Database",description:null,autoLayout:{direction:"TB"},hash:"xEkZXbTcIV26W7ax1opFZZjNE3cB8vh4tOpo5RBsiwo",bounds:{x:0,y:0,width:806,height:503},nodes:[{id:"familyAchievements.bot",parent:null,level:0,children:[],inEdges:[],outEdges:["1b7cp91"],title:"Telegram Bot",modelRef:"familyAchievements.bot",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"Обрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)."},tags:[],technology:"Python 3.12, python-telegram-bot v21",kind:"container",navigateTo:"botComponents",x:0,y:0,width:352,height:180,labelBBox:{x:18,y:35,width:317,height:103}},{id:"familyAchievements.api",parent:null,level:0,children:[],inEdges:[],outEdges:["xrk7n8"],title:"REST API & Frontend",modelRef:"familyAchievements.api",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"FastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда."},tags:[],technology:"Python 3.12, FastAPI, Uvicorn",kind:"container",navigateTo:"apiComponents",x:462,y:0,width:343,height:180,labelBBox:{x:18,y:44,width:308,height:85}},{id:"familyAchievements.db",parent:null,level:0,children:[],inEdges:["1b7cp91","xrk7n8"],outEdges:[],title:"Database",modelRef:"familyAchievements.db",shape:"storage",color:"slate",style:{opacity:15,size:"md"},description:{txt:"users, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events"},tags:[],technology:"SQLite (dev) / PostgreSQL 15 (prod), Alembic",kind:"database",x:240,y:323,width:330,height:180,labelBBox:{x:18,y:26,width:294,height:121}}],edges:[{id:"1b7cp91",source:"familyAchievements.bot",target:"familyAchievements.db",label:"SQL (shared SQLAlchemy engine)",points:[[224,180],[239,207],[257,237],[276,263],[288,280],[302,298],[316,314]],labelBBox:{x:277,y:240,width:220,height:18},parent:null,relations:["pn0ulu"],color:"gray",line:"dashed",head:"normal"},{id:"xrk7n8",source:"familyAchievements.api",target:"familyAchievements.db",label:"SQL",points:[[577,180],[559,207],[539,236],[520,263],[508,279],[495,297],[483,314]],labelBBox:{x:534,y:240,width:32,height:18},parent:null,relations:["j1vhnp"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_bot_groupHandlers:{_stage:"layouted",_type:"element",id:"__familyAchievements_bot_groupHandlers",viewOf:"familyAchievements.bot.groupHandlers",title:"Auto / Group Handlers",description:null,autoLayout:{direction:"TB"},hash:"oz3UI7tUSJrYJAcY5k81uAzDeyxtzcEQFXc55BCEZBI",bounds:{x:0,y:0,width:778,height:503},nodes:[{id:"familyAchievements.bot.groupHandlers",parent:null,level:0,children:[],inEdges:[],outEdges:["1t3r5ch","10xtbds"],title:"Group Handlers",modelRef:"familyAchievements.bot.groupHandlers",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"/register /join /members /achievements /progress /web"},tags:[],technology:"CommandHandler",kind:"component",x:456,y:0,width:320,height:180,labelBBox:{x:29,y:44,width:262,height:85}},{id:"familyAchievements.api",parent:null,level:0,children:[],inEdges:["1t3r5ch"],outEdges:[],title:"REST API & Frontend",modelRef:"familyAchievements.api",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"FastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда."},tags:[],technology:"Python 3.12, FastAPI, Uvicorn",kind:"container",navigateTo:"apiComponents",x:0,y:323,width:343,height:180,labelBBox:{x:18,y:44,width:308,height:85}},{id:"familyAchievements.bot.keyboards",parent:null,level:0,children:[],inEdges:["10xtbds"],outEdges:[],title:"Keyboards",modelRef:"familyAchievements.bot.keyboards",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Построители всех InlineKeyboardMarkup"},tags:[],technology:"PTB InlineKeyboardMarkup",kind:"component",navigateTo:"__familyAchievements_bot_keyboards",x:454,y:323,width:323,height:180,labelBBox:{x:18,y:53,width:287,height:67}}],edges:[{id:"1t3r5ch",source:"familyAchievements.bot.groupHandlers",target:"familyAchievements.api",label:"читает участников и ачивки",points:[[479,180],[450,199],[420,220],[392,240],[359,264],[323,291],[291,317]],labelBBox:{x:393,y:240,width:195,height:18},parent:null,relations:["b2zlcs"],color:"gray",line:"dashed",head:"normal"},{id:"10xtbds",source:"familyAchievements.bot.groupHandlers",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[616,180],[616,221],[616,270],[616,313]],labelBBox:{x:617,y:240,width:132,height:18},parent:null,relations:["xr971v"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_bot_privateHandlers:{_stage:"layouted",_type:"element",id:"__familyAchievements_bot_privateHandlers",viewOf:"familyAchievements.bot.privateHandlers",title:"Auto / Private Handlers",description:null,autoLayout:{direction:"TB"},hash:"6dOHHo5W4yHLj5VAxYNeRdXqnftYls9I5u8UgOn9uxk",bounds:{x:0,y:0,width:778,height:503},nodes:[{id:"familyAchievements.bot.privateHandlers",parent:null,level:0,children:[],inEdges:[],outEdges:["nd3yoz","1bkvqj6"],title:"Private Handlers",modelRef:"familyAchievements.bot.privateHandlers",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Просмотр ачивок, подача заявок, рецензирование (states 0-3)"},tags:[],technology:"ConversationHandler",kind:"component",x:456,y:0,width:320,height:180,labelBBox:{x:39,y:44,width:242,height:85}},{id:"familyAchievements.api",parent:null,level:0,children:[],inEdges:["nd3yoz"],outEdges:[],title:"REST API & Frontend",modelRef:"familyAchievements.api",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"FastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда."},tags:[],technology:"Python 3.12, FastAPI, Uvicorn",kind:"container",navigateTo:"apiComponents",x:0,y:323,width:343,height:180,labelBBox:{x:18,y:44,width:308,height:85}},{id:"familyAchievements.bot.keyboards",parent:null,level:0,children:[],inEdges:["1bkvqj6"],outEdges:[],title:"Keyboards",modelRef:"familyAchievements.bot.keyboards",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Построители всех InlineKeyboardMarkup"},tags:[],technology:"PTB InlineKeyboardMarkup",kind:"component",navigateTo:"__familyAchievements_bot_keyboards",x:454,y:323,width:323,height:180,labelBBox:{x:18,y:53,width:287,height:67}}],edges:[{id:"nd3yoz",source:"familyAchievements.bot.privateHandlers",target:"familyAchievements.api",label:"[...]",points:[[493,180],[434,223],[363,274],[303,317]],labelBBox:{x:408,y:239,width:25,height:18},parent:null,relations:["acl7w","160lqni"],color:"gray",line:"dashed",head:"normal"},{id:"1bkvqj6",source:"familyAchievements.bot.privateHandlers",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[616,180],[616,221],[616,270],[616,313]],labelBBox:{x:617,y:240,width:132,height:18},parent:null,relations:["lrnjk6"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_bot_adminPanel:{_stage:"layouted",_type:"element",id:"__familyAchievements_bot_adminPanel",viewOf:"familyAchievements.bot.adminPanel",title:"Auto / Admin Panel",description:null,autoLayout:{direction:"TB"},hash:"AOH2tusj7BWE-InXCt6exnfALjZ0ArJpN1ABavuxTJw",bounds:{x:0,y:0,width:797,height:503},nodes:[{id:"familyAchievements.bot.adminPanel",parent:null,level:0,children:[],inEdges:[],outEdges:["b3k0yk","1tro9t9"],title:"Admin Panel",modelRef:"familyAchievements.bot.adminPanel",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"CRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)"},tags:[],technology:"ConversationHandler",kind:"component",x:435,y:0,width:362,height:180,labelBBox:{x:18,y:35,width:327,height:103}},{id:"familyAchievements.api",parent:null,level:0,children:[],inEdges:["b3k0yk"],outEdges:[],title:"REST API & Frontend",modelRef:"familyAchievements.api",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"FastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда."},tags:[],technology:"Python 3.12, FastAPI, Uvicorn",kind:"container",navigateTo:"apiComponents",x:0,y:323,width:343,height:180,labelBBox:{x:18,y:44,width:308,height:85}},{id:"familyAchievements.bot.keyboards",parent:null,level:0,children:[],inEdges:["1tro9t9"],outEdges:[],title:"Keyboards",modelRef:"familyAchievements.bot.keyboards",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Построители всех InlineKeyboardMarkup"},tags:[],technology:"PTB InlineKeyboardMarkup",kind:"component",navigateTo:"__familyAchievements_bot_keyboards",x:454,y:323,width:323,height:180,labelBBox:{x:18,y:53,width:287,height:67}}],edges:[{id:"b3k0yk",source:"familyAchievements.bot.adminPanel",target:"familyAchievements.api",label:"CRUD ачивок и категорий",points:[[490,180],[463,200],[433,220],[406,240],[372,265],[335,292],[301,317]],labelBBox:{x:407,y:240,width:181,height:18},parent:null,relations:["1f42txz"],color:"gray",line:"dashed",head:"normal"},{id:"1tro9t9",source:"familyAchievements.bot.adminPanel",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[616,180],[616,221],[616,270],[616,313]],labelBBox:{x:617,y:240,width:132,height:18},parent:null,relations:["1mpom1k"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_bot_keyboards:{_stage:"layouted",_type:"element",id:"__familyAchievements_bot_keyboards",viewOf:"familyAchievements.bot.keyboards",title:"Auto / Keyboards",description:null,autoLayout:{direction:"TB"},hash:"FStbi0SBfs1JGMI9SO10bDNSN0CulN0hwV-EoXeoax8",bounds:{x:0,y:0,width:1222,height:503},nodes:[{id:"familyAchievements.bot.groupHandlers",parent:null,level:0,children:[],inEdges:[],outEdges:["10xtbds"],title:"Group Handlers",modelRef:"familyAchievements.bot.groupHandlers",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"/register /join /members /achievements /progress /web"},tags:[],technology:"CommandHandler",kind:"component",navigateTo:"__familyAchievements_bot_groupHandlers",x:0,y:0,width:320,height:180,labelBBox:{x:29,y:44,width:262,height:85}},{id:"familyAchievements.bot.privateHandlers",parent:null,level:0,children:[],inEdges:[],outEdges:["1bkvqj6"],title:"Private Handlers",modelRef:"familyAchievements.bot.privateHandlers",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Просмотр ачивок, подача заявок, рецензирование (states 0-3)"},tags:[],technology:"ConversationHandler",kind:"component",navigateTo:"__familyAchievements_bot_privateHandlers",x:430,y:0,width:320,height:180,labelBBox:{x:39,y:44,width:242,height:85}},{id:"familyAchievements.bot.adminPanel",parent:null,level:0,children:[],inEdges:[],outEdges:["1tro9t9"],title:"Admin Panel",modelRef:"familyAchievements.bot.adminPanel",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"CRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)"},tags:[],technology:"ConversationHandler",kind:"component",navigateTo:"__familyAchievements_bot_adminPanel",x:860,y:0,width:362,height:180,labelBBox:{x:18,y:35,width:327,height:103}},{id:"familyAchievements.bot.keyboards",parent:null,level:0,children:[],inEdges:["10xtbds","1bkvqj6","1tro9t9"],outEdges:[],title:"Keyboards",modelRef:"familyAchievements.bot.keyboards",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Построители всех InlineKeyboardMarkup"},tags:[],technology:"PTB InlineKeyboardMarkup",kind:"component",x:428,y:323,width:323,height:180,labelBBox:{x:18,y:53,width:287,height:67}}],edges:[{id:"10xtbds",source:"familyAchievements.bot.groupHandlers",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[279,180],[336,223],[405,274],[463,317]],labelBBox:{x:389,y:240,width:132,height:18},parent:null,relations:["xr971v"],color:"gray",line:"dashed",head:"normal"},{id:"1bkvqj6",source:"familyAchievements.bot.privateHandlers",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[590,180],[590,221],[590,270],[590,313]],labelBBox:{x:591,y:240,width:132,height:18},parent:null,relations:["lrnjk6"],color:"gray",line:"dashed",head:"normal"},{id:"1tro9t9",source:"familyAchievements.bot.adminPanel",target:"familyAchievements.bot.keyboards",label:"строит клавиатуры",points:[[916,180],[856,223],[784,274],[723,317]],labelBBox:{x:830,y:240,width:132,height:18},parent:null,relations:["1mpom1k"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_api_restEndpoints:{_stage:"layouted",_type:"element",id:"__familyAchievements_api_restEndpoints",viewOf:"familyAchievements.api.restEndpoints",title:"Auto / REST Endpoints",description:null,autoLayout:{direction:"TB"},hash:"IUP-Bm0yjzfE1R9rU_Rna938sSdX-rc2P2SXpzfM70A",bounds:{x:0,y:0,width:782,height:503},nodes:[{id:"familyAchievements.api.restEndpoints",parent:null,level:0,children:[],inEdges:[],outEdges:["ih6epc","164vvld"],title:"REST Endpoints",modelRef:"familyAchievements.api.restEndpoints",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"GET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories"},tags:[],technology:"FastAPI Router",kind:"component",x:228,y:0,width:333,height:180,labelBBox:{x:18,y:44,width:297,height:85}},{id:"familyAchievements.api.achievementService",parent:null,level:0,children:[],inEdges:["ih6epc"],outEdges:[],title:"Achievement Service",modelRef:"familyAchievements.api.achievementService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"get_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач."},tags:[],technology:"SQLAlchemy async",kind:"component",navigateTo:"__familyAchievements_api_achievementService",x:0,y:323,width:344,height:180,labelBBox:{x:18,y:35,width:308,height:103}},{id:"familyAchievements.api.repos",parent:null,level:0,children:[],inEdges:["164vvld"],outEdges:[],title:"Repositories",modelRef:"familyAchievements.api.repos",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"user_repo, group_repo, achievement_repo, claim_repo, admin_repo"},tags:[],technology:"SQLAlchemy 2.0 async, selectinload",kind:"component",navigateTo:"__familyAchievements_api_repos",x:454,y:323,width:328,height:180,labelBBox:{x:18,y:44,width:293,height:85}}],edges:[{id:"ih6epc",source:"familyAchievements.api.restEndpoints",target:"familyAchievements.api.achievementService",label:"tree / aggregate",points:[[333,180],[304,222],[270,272],[240,315]],labelBBox:{x:291,y:240,width:103,height:18},parent:null,relations:["1dor4sx"],color:"gray",line:"dashed",head:"normal"},{id:"164vvld",source:"familyAchievements.api.restEndpoints",target:"familyAchievements.api.repos",label:"groups, members, categories",points:[[457,180],[486,222],[521,272],[551,315]],labelBBox:{x:514,y:240,width:185,height:18},parent:null,relations:["h1rl0x"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_api_achievementService:{_stage:"layouted",_type:"element",id:"__familyAchievements_api_achievementService",viewOf:"familyAchievements.api.achievementService",title:"Auto / Achievement Service",description:null,autoLayout:{direction:"TB"},hash:"0amd-Oy5kNP0Co0QYktTAXuCpQ5YKiAlkZCBWAhcDXo",bounds:{x:0,y:0,width:821,height:826},nodes:[{id:"familyAchievements.bot",parent:null,level:0,children:[],inEdges:[],outEdges:["16q92nz"],title:"Telegram Bot",modelRef:"familyAchievements.bot",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"Обрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)."},tags:[],technology:"Python 3.12, python-telegram-bot v21",kind:"container",navigateTo:"botComponents",x:0,y:0,width:352,height:180,labelBBox:{x:18,y:35,width:317,height:103}},{id:"familyAchievements.api.restEndpoints",parent:null,level:0,children:[],inEdges:[],outEdges:["ih6epc"],title:"REST Endpoints",modelRef:"familyAchievements.api.restEndpoints",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"GET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories"},tags:[],technology:"FastAPI Router",kind:"component",navigateTo:"__familyAchievements_api_restEndpoints",x:462,y:0,width:333,height:180,labelBBox:{x:19,y:44,width:297,height:85}},{id:"familyAchievements.api.achievementService",parent:null,level:0,children:[],inEdges:["16q92nz","ih6epc"],outEdges:["13i14qz"],title:"Achievement Service",modelRef:"familyAchievements.api.achievementService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"get_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач."},tags:[],technology:"SQLAlchemy async",kind:"component",x:457,y:323,width:344,height:180,labelBBox:{x:18,y:35,width:308,height:103}},{id:"familyAchievements.api.repos",parent:null,level:0,children:[],inEdges:["13i14qz"],outEdges:[],title:"Repositories",modelRef:"familyAchievements.api.repos",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"user_repo, group_repo, achievement_repo, claim_repo, admin_repo"},tags:[],technology:"SQLAlchemy 2.0 async, selectinload",kind:"component",navigateTo:"__familyAchievements_api_repos",x:465,y:646,width:328,height:180,labelBBox:{x:18,y:44,width:293,height:85}}],edges:[{id:"16q92nz",source:"familyAchievements.bot",target:"familyAchievements.api.achievementService",label:"get_user_achievements_by_status",points:[[275,180],[308,208],[345,238],[380,263],[406,281],[435,300],[463,317]],labelBBox:{x:381,y:240,width:220,height:18},parent:null,relations:["160lqni"],color:"gray",line:"dashed",head:"normal"},{id:"ih6epc",source:"familyAchievements.api.restEndpoints",target:"familyAchievements.api.achievementService",label:"tree / aggregate",points:[[629,180],[629,221],[629,270],[629,313]],labelBBox:{x:630,y:240,width:103,height:18},parent:null,relations:["1dor4sx"],color:"gray",line:"dashed",head:"normal"},{id:"13i14qz",source:"familyAchievements.api.achievementService",target:"familyAchievements.api.repos",label:"compute_achievement_status",points:[[629,503],[629,544],[629,593],[629,635]],labelBBox:{x:630,y:562,width:190,height:18},parent:null,relations:["1rdelig"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_api_claimService:{_stage:"layouted",_type:"element",id:"__familyAchievements_api_claimService",viewOf:"familyAchievements.api.claimService",title:"Auto / Claim Service",description:null,autoLayout:{direction:"TB"},hash:"bOzp6S-6mCZYNl3x-kYhHrYwLpa_7csB2v8XHomz62U",bounds:{x:0,y:0,width:357,height:826},nodes:[{id:"familyAchievements.bot",parent:null,level:0,children:[],inEdges:[],outEdges:["1w09xw2"],title:"Telegram Bot",modelRef:"familyAchievements.bot",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"Обрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)."},tags:[],technology:"Python 3.12, python-telegram-bot v21",kind:"container",navigateTo:"botComponents",x:2,y:0,width:352,height:180,labelBBox:{x:18,y:35,width:317,height:103}},{id:"familyAchievements.api.claimService",parent:null,level:0,children:[],inEdges:["1w09xw2"],outEdges:["11j4tdy"],title:"Claim Service",modelRef:"familyAchievements.api.claimService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"submit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота."},tags:[],technology:"SQLAlchemy async",kind:"component",x:0,y:323,width:356,height:180,labelBBox:{x:18,y:44,width:321,height:85}},{id:"familyAchievements.api.repos",parent:null,level:0,children:[],inEdges:["11j4tdy"],outEdges:[],title:"Repositories",modelRef:"familyAchievements.api.repos",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"user_repo, group_repo, achievement_repo, claim_repo, admin_repo"},tags:[],technology:"SQLAlchemy 2.0 async, selectinload",kind:"component",navigateTo:"__familyAchievements_api_repos",x:14,y:646,width:328,height:180,labelBBox:{x:18,y:44,width:293,height:85}}],edges:[{id:"1w09xw2",source:"familyAchievements.bot",target:"familyAchievements.api.claimService",label:"submit / approve / reject",points:[[178,180],[178,221],[178,270],[178,313]],labelBBox:{x:179,y:240,width:153,height:18},parent:null,relations:["acl7w"],color:"gray",line:"dashed",head:"normal"},{id:"11j4tdy",source:"familyAchievements.api.claimService",target:"familyAchievements.api.repos",label:"claim CRUD",points:[[178,503],[178,544],[178,593],[178,635]],labelBBox:{x:179,y:562,width:81,height:18},parent:null,relations:["15mtfus"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_api_adminService:{_stage:"layouted",_type:"element",id:"__familyAchievements_api_adminService",viewOf:"familyAchievements.api.adminService",title:"Auto / Admin Service",description:null,autoLayout:{direction:"TB"},hash:"WxOODElRj4VH1gEGNcYmL1Cw4FgDoom6ZdEGY7Io5uY",bounds:{x:0,y:0,width:373,height:826},nodes:[{id:"familyAchievements.bot",parent:null,level:0,children:[],inEdges:[],outEdges:["lm89br"],title:"Telegram Bot",modelRef:"familyAchievements.bot",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"Обрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)."},tags:[],technology:"Python 3.12, python-telegram-bot v21",kind:"container",navigateTo:"botComponents",x:2,y:0,width:352,height:180,labelBBox:{x:17,y:35,width:317,height:103}},{id:"familyAchievements.api.adminService",parent:null,level:0,children:[],inEdges:["lm89br"],outEdges:["1m9ligz"],title:"Admin Service",modelRef:"familyAchievements.api.adminService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Безопасные CRUD-обёртки для категорий и ачивок, toggle prerequisite с cycle detection."},tags:[],technology:"SQLAlchemy async",kind:"component",x:0,y:323,width:355,height:180,labelBBox:{x:18,y:35,width:319,height:103}},{id:"familyAchievements.api.repos",parent:null,level:0,children:[],inEdges:["1m9ligz"],outEdges:[],title:"Repositories",modelRef:"familyAchievements.api.repos",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"user_repo, group_repo, achievement_repo, claim_repo, admin_repo"},tags:[],technology:"SQLAlchemy 2.0 async, selectinload",kind:"component",navigateTo:"__familyAchievements_api_repos",x:14,y:646,width:328,height:180,labelBBox:{x:17,y:44,width:293,height:85}}],edges:[{id:"lm89br",source:"familyAchievements.bot",target:"familyAchievements.api.adminService",label:"CRUD ачивок и категорий",points:[[178,180],[178,221],[178,270],[178,313]],labelBBox:{x:179,y:240,width:181,height:18},parent:null,relations:["1f42txz"],color:"gray",line:"dashed",head:"normal"},{id:"1m9ligz",source:"familyAchievements.api.adminService",target:"familyAchievements.api.repos",label:"achievement / category CRUD",points:[[178,503],[178,544],[178,593],[178,635]],labelBBox:{x:179,y:562,width:193,height:18},parent:null,relations:["10siobq"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_api_repos:{_stage:"layouted",_type:"element",id:"__familyAchievements_api_repos",viewOf:"familyAchievements.api.repos",title:"Auto / Repositories",description:null,autoLayout:{direction:"TB"},hash:"klYsV62BYjFyZzp5vPF72PqAN15JPX8AqD23bjUPM1Y",bounds:{x:0,y:0,width:2183,height:826},nodes:[{id:"familyAchievements.bot",parent:null,level:0,children:[],inEdges:[],outEdges:["1f80hzy"],title:"Telegram Bot",modelRef:"familyAchievements.bot",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"Обрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)."},tags:[],technology:"Python 3.12, python-telegram-bot v21",kind:"container",navigateTo:"botComponents",x:0,y:0,width:352,height:180,labelBBox:{x:18,y:35,width:317,height:103}},{id:"familyAchievements.api.restEndpoints",parent:null,level:0,children:[],inEdges:[],outEdges:["164vvld"],title:"REST Endpoints",modelRef:"familyAchievements.api.restEndpoints",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"GET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories"},tags:[],technology:"FastAPI Router",kind:"component",navigateTo:"__familyAchievements_api_restEndpoints",x:462,y:0,width:333,height:180,labelBBox:{x:19,y:44,width:297,height:85}},{id:"familyAchievements.api.achievementService",parent:null,level:0,children:[],inEdges:[],outEdges:["13i14qz"],title:"Achievement Service",modelRef:"familyAchievements.api.achievementService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"get_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач."},tags:[],technology:"SQLAlchemy async",kind:"component",navigateTo:"__familyAchievements_api_achievementService",x:906,y:0,width:344,height:180,labelBBox:{x:18,y:35,width:308,height:103}},{id:"familyAchievements.api.claimService",parent:null,level:0,children:[],inEdges:[],outEdges:["11j4tdy"],title:"Claim Service",modelRef:"familyAchievements.api.claimService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"submit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота."},tags:[],technology:"SQLAlchemy async",kind:"component",navigateTo:"__familyAchievements_api_claimService",x:1361,y:0,width:356,height:180,labelBBox:{x:18,y:44,width:321,height:85}},{id:"familyAchievements.api.adminService",parent:null,level:0,children:[],inEdges:[],outEdges:["1m9ligz"],title:"Admin Service",modelRef:"familyAchievements.api.adminService",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"Безопасные CRUD-обёртки для категорий и ачивок, toggle prerequisite с cycle detection."},tags:[],technology:"SQLAlchemy async",kind:"component",navigateTo:"__familyAchievements_api_adminService",x:1827,y:0,width:355,height:180,labelBBox:{x:19,y:35,width:319,height:103}},{id:"familyAchievements.api.repos",parent:null,level:0,children:[],inEdges:["1f80hzy","164vvld","13i14qz","11j4tdy","1m9ligz"],outEdges:["ee7e75"],title:"Repositories",modelRef:"familyAchievements.api.repos",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"user_repo, group_repo, achievement_repo, claim_repo, admin_repo"},tags:[],technology:"SQLAlchemy 2.0 async, selectinload",kind:"component",x:914,y:323,width:328,height:180,labelBBox:{x:18,y:44,width:293,height:85}},{id:"familyAchievements.db",parent:null,level:0,children:[],inEdges:["ee7e75"],outEdges:[],title:"Database",modelRef:"familyAchievements.db",shape:"storage",color:"slate",style:{opacity:15,size:"md"},description:{txt:"users, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events"},tags:[],technology:"SQLite (dev) / PostgreSQL 15 (prod), Alembic",kind:"database",navigateTo:"__familyAchievements_db",x:913,y:646,width:330,height:180,labelBBox:{x:18,y:26,width:294,height:121}}],edges:[{id:"1f80hzy",source:"familyAchievements.bot",target:"familyAchievements.api.repos",label:"читает участников и ачивки",points:[[352,163],[432,195],[528,232],[615,263],[710,297],[817,331],[904,359]],labelBBox:{x:616,y:240,width:195,height:18},parent:null,relations:["b2zlcs"],color:"gray",line:"dashed",head:"normal"},{id:"164vvld",source:"familyAchievements.api.restEndpoints",target:"familyAchievements.api.repos",label:"groups, members, categories",points:[[750,180],[786,207],[827,236],[864,263],[889,280],[915,299],[941,317]],labelBBox:{x:865,y:240,width:185,height:18},parent:null,relations:["h1rl0x"],color:"gray",line:"dashed",head:"normal"},{id:"13i14qz",source:"familyAchievements.api.achievementService",target:"familyAchievements.api.repos",label:"compute_achievement_status",points:[[1078,180],[1078,221],[1078,270],[1078,313]],labelBBox:{x:1079,y:240,width:190,height:18},parent:null,relations:["1rdelig"],color:"gray",line:"dashed",head:"normal"},{id:"11j4tdy",source:"familyAchievements.api.claimService",target:"familyAchievements.api.repos",label:"claim CRUD",points:[[1415,180],[1377,207],[1336,236],[1297,263],[1272,281],[1245,299],[1218,317]],labelBBox:{x:1325,y:240,width:81,height:18},parent:null,relations:["15mtfus"],color:"gray",line:"dashed",head:"normal"},{id:"1m9ligz",source:"familyAchievements.api.adminService",target:"familyAchievements.api.repos",label:"achievement / category CRUD",points:[[1828,160],[1809,167],[1790,174],[1772,180],[1596,243],[1393,310],[1252,356]],labelBBox:{x:1584,y:240,width:193,height:18},parent:null,relations:["10siobq"],color:"gray",line:"dashed",head:"normal"},{id:"ee7e75",source:"familyAchievements.api.repos",target:"familyAchievements.db",label:"SQL",points:[[1078,503],[1078,544],[1078,592],[1078,634]],labelBBox:{x:1079,y:562,width:32,height:18},parent:null,relations:["j1vhnp"],color:"gray",line:"dashed",head:"normal"}]},__familyAchievements_api_frontend:{_stage:"layouted",_type:"element",id:"__familyAchievements_api_frontend",viewOf:"familyAchievements.api.frontend",title:"Auto / Web Frontend",description:null,autoLayout:{direction:"TB"},hash:"isdKm-NO7hwhYnGUXCVvy99yWgMhusi9Vm1oJbMrrtg",bounds:{x:0,y:0,width:802,height:544},nodes:[{id:"member",parent:null,level:0,children:[],inEdges:[],outEdges:["1eq1rou"],title:"Участник",modelRef:"member",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере."},tags:[],kind:"person",navigateTo:"__member",x:0,y:0,width:356,height:180,labelBBox:{x:18,y:54,width:321,height:66}},{id:"admin",parent:null,level:0,children:[],inEdges:[],outEdges:["1hgima9"],title:"Администратор",modelRef:"admin",shape:"person",color:"primary",style:{opacity:15,size:"md"},description:{txt:"Член семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками."},tags:[],kind:"person",navigateTo:"__admin",x:466,y:0,width:336,height:180,labelBBox:{x:18,y:45,width:300,height:84}},{id:"familyAchievements.api",parent:null,level:0,children:["familyAchievements.api.frontend"],inEdges:["1eq1rou","1hgima9"],outEdges:[],title:"REST API & Frontend",modelRef:"familyAchievements.api",shape:"rectangle",color:"sky",style:{opacity:15,size:"md"},description:{txt:"FastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда."},tags:[],technology:"Python 3.12, FastAPI, Uvicorn",kind:"container",depth:1,navigateTo:"apiComponents",x:191,y:271,width:430,height:265,labelBBox:{x:6,y:0,width:130,height:15}},{id:"familyAchievements.api.frontend",parent:"familyAchievements.api",level:1,children:[],inEdges:["1eq1rou","1hgima9"],outEdges:[],title:"Web Frontend",modelRef:"familyAchievements.api.frontend",shape:"rectangle",color:"amber",style:{opacity:15,size:"md"},description:{txt:"SPA: каталог групп, дерево ачивок, фильтры, детальная панель."},tags:[],technology:"Vanilla JS, Cytoscape.js, cytoscape-dagre",kind:"component",x:223,y:324,width:366,height:180,labelBBox:{x:18,y:44,width:330,height:85}}],edges:[{id:"1eq1rou",source:"member",target:"familyAchievements.api.frontend",label:"просматривает прогресс",points:[[241,180],[271,222],[307,272],[337,316]],labelBBox:{x:300,y:240,width:171,height:18},parent:null,relations:["1m8xnva"],color:"gray",line:"dashed",head:"normal"},{id:"1hgima9",source:"admin",target:"familyAchievements.api.frontend",label:"агрегированное дерево группы",points:[[572,180],[542,222],[506,272],[475,316]],labelBBox:{x:528,y:240,width:214,height:18},parent:null,relations:["16zugdk"],color:"gray",line:"dashed",head:"normal"}]}},deployments:{elements:{},relations:{}},imports:{},manualLayouts:{}}),{updateModel:O5,$likec4model:L5,useLikeC4Model:S5,useLikeC4Views:N5,useLikeC4View:I5}=w5(Ys),P5=Object.freeze(Object.defineProperty({__proto__:null,$likec4data:Ys,$likec4model:L5,updateModel:O5,useLikeC4Model:S5,useLikeC4View:I5,useLikeC4Views:N5},Symbol.toStringTag,{value:"Module"})),z5={};function _5({node:e,...t}){const n=z5[e.icon??""];return n?nr.jsx(n,t):null}const G5=Object.freeze(Object.defineProperty({__proto__:null,IconRenderer:_5},Symbol.toStringTag,{value:"Module"}));let Un={default:()=>Ft(()=>Promise.resolve().then(()=>Z5),void 0)};async function M5(e){let t=Un[e];if(!t){const n=Object.keys(Un);if(console.error("Unknown projectId: "+e+" (available: "+n+")"),n.length===0)throw new Error("No projects found, invalid state");e=n[0],console.warn("Falling back to project: "+e),t=Un[e]}return await t()}const Nv=Object.freeze(Object.defineProperty({__proto__:null,loadDrawioSources:M5,loadDrawioSourcesFn:Un},Symbol.toStringTag,{value:"Module"}));let Zn={default:()=>Ft(()=>Promise.resolve().then(()=>Q5),void 0)};async function j5(e){let t=Zn[e];if(!t){const n=Object.keys(Zn);if(console.error("Unknown projectId: "+e+" (available: "+n+")"),n.length===0)throw new Error("No projects found, invalid state");e=n[0],console.warn("Falling back to project: "+e),t=Zn[e]}return await t()}const Iv=Object.freeze(Object.defineProperty({__proto__:null,loadPumlSources:j5,loadPumlSourcesFn:Zn},Symbol.toStringTag,{value:"Module"}));let Vn={default:()=>Ft(()=>Promise.resolve().then(()=>W5),void 0)};async function q5(e){let t=Vn[e];if(!t){const n=Object.keys(Vn);if(console.error("Unknown projectId: "+e+" (available: "+n+")"),n.length===0)throw new Error("No projects found, invalid state");e=n[0],console.warn("Falling back to project: "+e),t=Vn[e]}return await t()}const Pv=Object.freeze(Object.defineProperty({__proto__:null,loadMmdSources:q5,loadMmdSourcesFn:Vn},Symbol.toStringTag,{value:"Module"}));let Qn={default:()=>Ft(()=>Promise.resolve().then(()=>J5),void 0)};async function H5(e){let t=Qn[e];if(!t){const n=Object.keys(Qn);if(console.error("Unknown projectId: "+e+" (available: "+n+")"),n.length===0)throw new Error("No projects found, invalid state");e=n[0],console.warn("Falling back to project: "+e),t=Qn[e]}return await t()}const zv=Object.freeze(Object.defineProperty({__proto__:null,loadDotSources:H5,loadDotSourcesFn:Qn},Symbol.toStringTag,{value:"Module"}));let Kn={default:()=>Ft(()=>Promise.resolve().then(()=>tv),void 0)};async function $5(e){let t=Kn[e];if(!t){const n=Object.keys(Kn);if(console.error("Unknown projectId: "+e+" (available: "+n+")"),n.length===0)throw new Error("No projects found, invalid state");e=n[0],console.warn("Falling back to project: "+e),t=Kn[e]}return await t()}const _v=Object.freeze(Object.defineProperty({__proto__:null,loadD2Sources:$5,loadD2SourcesFn:Kn},Symbol.toStringTag,{value:"Module"}));function Gv(){throw new Error("No projects overview available for this workspace: single project mode is enabled")}function U5(e){switch(e){case"index":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVfHsqtKEvyas7wTeLPECxDeswOE9958%2FbTueW83EyG1RFEU1d2VWdk%2FKPeDilff%2FSDQkS9rPQ4%2FKP%2BDIPB%2FIDACaz5k46ceyl%2Bz54p%2FqO8NVPxBhR%2BI%2BUG5%2FirqLgeu1bhuv27vus057DdADx4v6vzzeweBEOIPhP6BcBeif1AGw8EA0f8hKDL%2B9U%2FKfPgfYf5PdlvyT2a%2F19s95b%2FXn%2Fyos%2Fxvqn%2FzRKDvB%2BU%2BdVIuSQ8uhqT%2Fx9e51y3%2Fmrhx2PJr%2B41V%2F5NyB7LIsD%2F18Mmv33ikf8XZD8JqiHBg8NxbhSEE3Djirza2EQ%2F3lalXjmbOPFuWnajCk3ZRQVTRHEVLOdtJER4qu4R468QSQxYob0A0iEGY4ahsqngOqSIRklg93DbLaaVcE8eY9cV%2BqNkRPLAi7Dmjr6R1L3HXdBBYbjHvijDMjmB7VZH50LxXi1deHPUOPPPsPhP5IylxF%2B%2F0a2cM3qpQLrtfsEifyE7iqsZmUAHi8pSEHfkR9%2FdNDKUqny%2BofypkgCflRdGZ%2FXGDJvnOJGj2eUlWuq89U8jG%2BFGDtbbpR2N7vAjxTKcqs7d5%2FHzQmBAUY5kDNZG7I%2BuLo4auGyEMihPwhrBnJ4cK%2F2hN%2FuBzG%2FdzP3BpUp6dRDqT%2FJiZIpCNEGfuwh4ahdyzbCP2ZoXfztjLDLv7irfldeJwfIfOXHocYT95nz4XnMV1OsufVdjETTQWdFPJX4eDd%2FFIiEQK421pzbhp0P2uhtp3Fft2D9sXnmLm%2FCI%2FwOKZnpCWBKqyWT3sPvThAFJYXbBo8PP92s8ARmyJiQ97gH%2FKTaNCiCCL0QawhVQesFUIqX737BZtliu97UWp%2B6gGmGE4VhMGHi76lwxe9pTTUrbLzo2KmQx3BAmOnD3XMrjywEa6YhuV3Cg6ZgPf17SG8e0Noy%2By7HyfhG4Ry9QZbjqQimg2sTzqsTWsXRdDmtiU4JE1PmNTdFowA5EjKR6K6bNQpYE%2FIr23zAeYeWnVNiGyVt162YK76neYyK%2BXKKHV3ssUZkOkq45SIJJCNQMwiNQtBWBmm9AnmW5dkL%2BR98stKeTaFTQb1OHi9XC9JmOwY6TXzZMrr%2Fwmo%2Bz2CCWZz5fLOh4STkK88m%2BNAjmwnNVv8zMze3Tg76Pp1ZAvTU3FGabVAtWb2UMy4JQbnBMlX6g%2BdBpMq16Ud9kKq6HjW2ImTLCXv6VIBOGMY6lTu0rgQBGmPRC6UOP0uCFtpBRjKaUgv6StmGx8eVhwiUvdifYsP%2FgULsJwlPni9TackuSCyaNORssAk16GJNoGm4j29iXzHCN0hWqDDRbV6sQZb5uYkfEP6ZRTxohKwn35IA9wm4SZK44iJVmrkiUjS5EPtpmjvDQpnIhyBzaGTH4UZxlqyfIND56ieLjMMcd5OGeMVHTYQ8mqnrCJJ4SYeUu4cxpOo90UjuNzH3HZOslVikdV1fgwXkjWhIrY5zxtM%2FZ21VXpu0Xz%2BwQPfOKaKsXTbfKFSWeclxF3WAwbjRy%2FSt8pBhdBMpYKEi8rGBgE%2B2msZ6TFo12SecHKh4OKG2GSoB6T6BT6gD9F7ml0dl7P2xKn1pzeZnPr701KwctcnWVk31qJ2Noloo4C2i5hJ4LMQYQdXU0WYRSaoVYtRVRZV%2FO18nB8VWKZJqAtRVHxNrHt03jDhGwy3VrFN217U%2B%2BSDuB1FmGjUzqP%2FqQEGeZ6e5788pSwWmcXS4M%2FZDabu93VxtNF8Gp%2FXoG4iGI3EOyUEDqDe%2BnAmm7gxtG9FO08R5RMeDCyH3x%2Fni9OfpCS741ig3IWGq2jDwgGWnVmE7k5BG9nGrR8BahdCDGUz%2Fz5DBddWh6M%2Bbfu3dVpJG0wqzzM87ztbnzTjESG5ePcTE9F1DVYXVhksmsFoUhyiHaPzgAtnBcfg%2FbDRh%2FXzVfD1JuETyj3C9MFK96VqoiPRFG1TggrYARW3E5Vd%2BCCr6DysZheNboGIRllhHf3S1GY6IopwzQZY3d%2BAkfCAvmauvNLtQgw0579LNt7UJeEZozEK3Ck%2ByiqgLMRZVyaGDTEL5pk4f04eeHvgPXEmWfsykgWNJzDy%2B7zF551dBZFV5y%2FEXtokU0iTSxaU%2BAr1i%2FIdwMt4JmzpksPdEGBavSm80ABXDo%2BIVemIHLhm5US9IdYDXR8BBHXHnVXIudkbSIxIvKBvW3hrHz1k%2FgbNI9vDNKVrhDhF5UUq6NWNAOv5bIq0GYdFkeRJlmlUGz4ptmMAsgDUeEm7p29gKovW8d3R3ttIfdZSH4RHNEht8KrNK3oZJwRDA3Ra9naoxX4Ez6itz1%2FsI88vSbgW0qD8Q6RGD2fD6IQmZx%2B7k%2FOAmjo8NYjDsRQLqpCCSFdn4wbo7HoKJvB3wNBKaiwEa3kH0tArTlo4OxQlp4l1aAGRHYLJ4%2FEYb5TxCUChvyA5W0O%2BNtVZ0Sf7SV1tfRNs5ADcNmVe2By2v6tw9MdbaZ884weiTXS3tsZnEtDp1YjACSLWRWP2uAzyT2FZsz4XeecEjQJetLaWE73OhOwIeyUnLC9ryYZep561SHZrlXzIReGJgewd9jbzNhR0F6YqCgw2fpVNd37dsV9ox6pBJOfcM1gsfjoeaaXhL3vc%2Fog5mvuB6QmVW3rN0QiC6Ud9Om9aoD6WbvbKNKL19qoUw6Rp2NSuWX81jnQb%2BJuXEaoaIizQ02UURf9BQXKhFqAeQTKQds59Ow8Qt8O2uNxwh%2FVekmnA3%2F7UsBXn9TLtA8H2uCNml7ec6ceBXdFA%2F42P7IUUqs7QZGQRcN8DS5X0oJyIMKA6tRu8clj5ELZm91ooC6nhGxORPaSDyEQqyKatAn6AGKh0YVVb5%2FJEtTQ4PU%2BDQArjRItNNmyv5v7fLWCjosmniRBNWXSJjHwss7pewGB8K86EPL60267ASGZ97C0f6dKunzCrzbDkFMhIliuCPreD9DbPfrR3x0pdaj51uqoE4H0EJ0oXneutYvPWjnf%2FaZTrv8IndQh9bfENOfwSEz%2FVoqYEjhOPq%2FzL6rFhK8yKewXrUrVlu9TD%2FnbAzy36FaJ%2FXg5mnu45ft5nCGwGtPpSswqQdxO60c8RKbdkuIk74w41Ndah9op6sVDVyhAdYt6GOmQKh905L8MumPA8jai8JAN3SVpwRbPpsOEwQg6DS3vkQA8w1Lwwdau99UXsUxi6JQTvtOt9PbuCNDuofj9FV%2FK5cs8T6llDvaCTanKZXEklTi6QawvOvHv467VqSwoGf40GKIrh4N1vyulVBpsEfB37imk28biWfiXpaQKoeBCiwMmysitKvT2jSVGjRJz%2FZU5Zv8Q75HD9jpETSmF4YxBtYkTLv%2BzD3q1aIVG1k2xfYmyOLZCwJmD9PgdWfhAd0B8m1BL6iOxzTsthvYk4bC7V4CQ3XWr5Nzh5Jw%2BfD4IyaQM3O4Yu2eJh81IQ4h7HH9QhydoHvHAs7RE6WPQxlg5aHvEMa1z9CgX%2BSx%2FVWt5YaCuz47Ql6CA%2B%2FirbSmvpgvQrcQDCCvw82U7cBwC478non%2FPc18c%2FR7p%2Flr%2BCw%3D%3D%22%7D";case"containers":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVjHDu26bv2aM3yBexm697bdPXPvvfvrY99zMwiQAIb3lkSTlLS4SOkPzPyB%2Bavv%2FkDAkS9rPQ5%2FYPYPBIH%2FBbzvtzcf0jGrh%2FJvt%2Bvw%2FyG%2BAZj%2FA3N%2FAOoPzPRXUXf5K1qN6%2FZXTK3bnEH%2BKujfz4s6z%2F6OQACE%2FQeA%2FwOgDkD%2BgSkEfV8A%2BV8YQUZ%2F5eMyH%2F4PNf%2BPd1v8r2d%2F29s95X%2FbWX7Uaf6Pq%2F%2F4CQHfAzNZHZdL3L%2BNIe7%2FlWXGYYvr4bXwV0v9r7Pdaz9F%2FpP%2Br2GYwz0wSckd4g4E7OvQJA6qxg5prL0k7uOfHuP5UBSyJTN2hbZup2THvDyEyok500yX2%2Bz62faidPnQBZnQuZ9KVCZ%2FIF4TN8wDAhwe3coyDiZFBbGsTtPsn9EIqKGKaQaSXSRu61X23g%2Bq4pJqAiq5YdalGWz9HzjUB%2FcHorX6Afk0xu1RlTb8yObeNr0fSXL%2BZlVBGtnQXLwKWDsBm3daPNW3B9Kc25qJZJs96GyrhuJB7j0HkeWS5yIf14kQp4CCr%2FT7YDcujdiK1kHd4b6iuLe8qG0IPAQfmQmx9%2Fkv7%2Bgnuq7hR6LyuzqAkUu8WohFrb4OXtAOZO77p26HybRPEhAjsFvUmnVxJ4o4X3ae4WdhHt95Gb8UkqQkCL%2F6jfkw2EGEoOh3ESr6XAo6zFkDoYfVKxAal1gHCnailduD3C9MZqJsTBadkGZbnCNR%2BoDV4XuYDcPh63yxvmXM55ucsvMhHEVJyGA2rzceeCf72QQpj4%2Bn7H4jKoX9dtomk8m7eplnfuPjBhIOsxIqgcAn%2FsYFnYwjB1pG6cYtvFB4dnYJ9aPugSLQA1ViRJiLX8M6r6QddmW3WwUSyurIeYHxoxrkAFpN1KV2ufTqNcb4fehJoW5x9mMiO8l6uamnVtV7nk7ftxzWwyT12ODufBf4lPx%2BgkBX359AxP9GUwcFAbi1TXALvJyf2UFWUzNe22bFBuYeLjdz4Kh0T9dGRXTNj2wCD9R5zkp10%2BIhiQPWlfRIaKx85HepO906Grha7ME9VFvnsN2iyKUGZwNP4q%2FaM1tk3V1%2B23jemKDRdHypvlGBMVrbsyTTixn94AYmzHfNaehg6kdhoWwGxJEV4gBVp5OG6M1FitxAHxumzGwEs%2FiFKc1NmSX7WOObKTxtRnfOoCtjYsIbvhD87j1jT9IfOtm7j9xm9fKh9JjSET%2Bu07vZKRJ%2FPAnnd8NbH%2F7OiNNfVHzVO7tX2TYn%2BqmJrV60eeRbnNSBjUlbF93MGTCMb3d3nIzaS%2Fykb8qTPc4RLhHTCNsTUbKVf30bZhnt0lrr0k7tahNbv%2FuQhFRd56OUSeLuZoiy6lOij5Sc8tRRQ6cpyUvgZYZm4d1QAppA3tO61xAXAWHGzFp%2FSlulovdTlufAxO3KbIjjmlvoqTXNe22lWxPXAY4I2ajpyZcj0PoePu5l6SRIeZtiyApHQhVrmGmLOrkAnKP8qNauteFSaqBuH1m6vhijs1VYaeXehW9TOJNXQobtLLrCJqrcXBPVOm52WXZOaUo5KIbsfye1er9jDhhgKPxZutGSvRr59M4seSZFxoCt021kJAfuZXSat6o3skxbUSY3SFVXEVZXMTpbTUiumnfJxsnutg7IwlmXsj4UGSVV7LcQzIw8Nx0wxkueyzvijqT9AhWDePk8eqTF7jX5AZJe8jLPiJ463vmRgHdG4QFq76qYB35XKJtRZZI6Dw2q7fGvBiwjm6E9itqI%2BmxFLY7JbGzthxkxNaBKC321zXG%2BPJswEY%2BU71YCiseUnhXU2Ai0z4%2FRVdm32RteH6GBs5bthQHSkQ4wokXqrgO%2FfIOkVqBdPpZUq6TtC3L5lT6rmyVfilNGosveTOhrvzQSTIuDX2G1JEjMLPz2iULALcqRjBj12ARh2464Gh21vomJVloSRVscGKChdw7bG8nbS8pFnfkgF27hwDAAjlOcSledoDDxWOgftW8Vhi8FjFssbXXJgRsW1ANQeBX0SdlwhONqonvvxoDl0anl2qA%2FVgRLU5j7oKAkixjZgtbVq%2Bof3gqFN1r6s27t3u9KPUp%2FuGJ5hZZOBcq10fOL125ZKps6wF8Y3AuZc2O2OekC0Ws2t9SuLMcat8o7F2Yc0x6ANX0I29XptM7EI9%2FIlbUnd22yt9OuQUo%2Fjm%2BfrkPSvt%2FIaIllPG7OF3bIu%2BIbpBwgqn%2FbRz95Pu2XWqhQuQgmuMOSj7FwHQmw%2ByaddyNpDG30BBA4WLDIxLK7KKo7KVIrk3JnhehtCOgiocBUAn8Wi98T2REyU1Z0TEoA40VeQPFtZZok%2FLg72cnB%2FNMZE3vp1W10myfuUpRv6zK2%2FpRtRVu6Z1uaPQtfcJH5RWdoXGkY2cic2%2FMH4g59kC5uoKqRF3xz88g6McZCUE5Veq783P0c%2FKZOXh4evFDi1mNXImSvL77N8TLbRcABgGFiLhfW30zlUrRdz6EwhFU0EemCoohseSr3lhwHkjpeVbrlMM4hnfEBo2dKRflU8Kv5y035X%2BVpgFgdSS%2FfItK2rzndzRODQ5530TGImBthlIjWrzue3cd3WFmvl%2FTPHIYMwHOqAuCQwHtLNf6leFiD12JFkSESIBhXah7fyXag2iNpiNwwx8TWzkzWbbC0zwgQS%2BkMB1Rlubv0hCDmp0%2B9puMQBMsI1LLVm4xpq42MhOLHRbV4uKf8%2BxUK9eOmI3B42WkgFLthYtUdJPmYixzp14ZlmUL6cNFGwrz6WR3qmXws6RmTIXni1wI2rxIawK%2B9kF2zwqpegrBGe4sS3u0HB2D9BM0CkKRfJW%2Ff8VZZpdgojP4pDTT%2BnucWaLucWZV9nJf%2BoL%2FCpvjink09sQf5pXeJ7GLo2H6DbqLCQika2W4N2YbfWloC9XjeVCmcV%2FwBbZYCIxTU5qRqZ2fUfC3FsNJ4MbQcZm%2F9yLg4jYpMVzLBsKVrIIPvEmVck55U4xMMwxlng5Jfd5YzO3UdOBeW6ijiLRT0tvCZt6R4xM1Um9UXqptlAc1dZhslfZ3TB6Gv%2FSl8K9s8X64ICE4bgHtwZbVjckgoL%2FJvIUuyfOtmXpaeytRZ8d78smbEc%2Bsr5ijM4uUaIluytA%2FKEOoV8uJ4yrl%2Fyk%2Fuh4Rk0puWUtLgemnRlGTTaviEoV95GICZvWz3pC%2F58SLUR96YchtUiG%2Fzy%2F3Fm5R5s0C4L6u%2B5SgcG0FXWad%2Fzoge%2FwPV63trDbwHnw5BvRKGGBUI9166tLFXB26hV3efQHeV9FVn5iu1QnWGPDicwzhEwgaCdlgzIPbzSq8k8JgRPlhOkqtBqK4VLqnLzEnHFYQmX3Q1d0BVXB5fBuExMoKKVbBb4UWVL7vJaoQTLOhQtWjDKkx2UoSdQmoEXd6F34sU8hXemY9Hq1aYOiLCXIykF1PB5Id8x0R3CcSeX%2BAnkwLi%2B2bkXzUKCx9YQeTWVoNhMpgQvf34CnEYI9Dk83o8NtD%2BwFcH1gluVVKHmmRAwXPmjps4WwocYgsxIXt%2Fk9Tc9AZw6K1VaECJi9zsHfjZmB2OczCCGneY8USPk2nz57pvrIK5j%2BCnytGOIWCyY5DmJ4%2B34jhGOpAGn3cxqjts0nT5IxzKMqatjim%2FCOxkQ5Mc19badepsuilbFDMUeZmCPkoj9iaSneMfhrqyczy1eWSv%2F18l4v09ZdxBAWoRWAEwjCD9XhXz2RB%2Fh07N%2FpQs%2FaZBUmmrNbKr1o%2BBRGp3Zdi8YU9G%2FDnjC26HJ6VejYgnDd6Maj%2FAaMx%2BrI90P8aaDK8196%2FcNiGmpKzVhgeiBdOGxZV1yzfd%2BkAvdiZ9DJccSGE%2FD2kJCdF7wGy%2FlRdUTL0gcZBfyNLy3mrqGmqJeF4kveSN%2F1PcjUU06GMssQa0aAWn3EKUDqpl%2F4bH29rEjFu5vvzLM0DooCLrrYoOrZOoA%2FDgFKU7%2BWdWM2NAftEAwLWorZJ0L0UpqwDZ38hHiL4ZY8KMKXzwqGQ8g4T7YIoEAkPrB7kjc%2B9SPpi3wEkzsMOSvuYIElSD6rf3CdosHhqaBRpAb9L6zpbBmA%2FfQYVc3gPj%2B2fHQlQXQsAh5iWeZ9gd7ztYFGg4Ou23qUuXAFCayR9bAqH5VSuP8E5mvemE7JjKHcEycz3Hci4SVS2r3%2BkYElE%2Br6orEkF4ItBgAFLBFlHtO8go87R8oVtNo3hXaOQcXbIoF5B%2BzhXQ5uc7gMgOmem7WCof575nXuPucqDR6FqIc8LJMt%2FtfFz9wASPWSpvqApNiJHCpYfK1rSn7htV9Dgqpn8ueZbPnUfQwTiyzVbK2IMZlPNZmwNwHhCY0MNXGi7uj5by5zuxE%2Bb5XRV8D%2FNF9b%2BXC%2F9zNfJ2%2FXs78k%2FPfwM%3D%22%7D";case"botComponents":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dRfHzrRI7mm%2B4z8iNOlIpklNk%2BFGzjnz9FvMN3NYaVcqgcp2Odvl%2BkHZH1Q4u%2FYHgfZsXqqh%2F0G5HwSB%2F4LAF0CzPhnSqi9%2BwY4t%2FCEfBCr8oPwPRP%2BgbHfmVZsB0nJY1l8ytWoy9vXLoAPH8ypLfzEIhOB%2FIPQPhNkQ9YPSLwx8IOovnILDX%2FqoyPr%2Fweb%2FaLdG%2F2j2u1%2BvMfvdp9leJdnfqv6tJwI9C2XTKirmqAObPur%2BoWWG9UHyyA8J%2FVBAIMQO3Tj0QJHll2%2F1j%2Fot0Ch5%2FYmH9b8pUJ4wzzTFPwi55q%2FUyBnDv6MfhNGlItPXO6U2yPJXokff%2FKUGSCFcTIOWP4iQOylLF%2B3RTSbcbUQra5lndm%2Bo2yimezcx9iVzUZ93Y%2BWd8DQkqyQ7opurz1toDyuRJG6jVUsfuViOD8bHisr92vb2FeRcPN%2BzNbMywWP1d1gYOUzobwBk2lmvRmUX95PUwSeHsu6gHAZAWJQ8YWhS2vr%2BSqlyWZGxzdBwKAm5CYclhdXN4eddDxlCi0WPp17AOQKFvB13SiUhsskheYfY7VcDdfVBd%2Bc7Difjiirc%2Fq6drZpwo2KUj%2FReXHKv4fMAx5d0yjlXqlySYjCeI5i09dIr4z%2BXqrzDMKX3iBbtY5YrignRgumwM%2BhRhZRQGP9ayss70iTvS2Pwv28%2BJ%2FWY5Qn2jfXba55KelLERlQ1xUDN5vQ4hXUC1U4c6Dwd4rsD8UygoyauwzPZhtFG6Y3h6rQsuQswjaFhLGNESA4WF2NyazkBrOaou%2FW9hdOcl4NceRjQj0%2B1Lj1yIiSObOMRQZPwABQV4ygKkZjpOVptx0PMWblWQ2zQx20e7pJs2YxHqfa3xWyMW3SjlbePxgJ%2Bva%2BzjmaxIkRLJbtA2qc2mTYUVu2bYNiVSLRLXxV7k%2Fk1jEvdasfmDMdWQqzjmnYSNh%2Fbm8LiqBMqn9mqvIA8pT1INGKTkE9OrdGJa%2FLxPC9kqkdly%2F8sCmw5pOHMQWELx7vs4MWSuc6Mjp12wHG%2BAIUB%2FoZs0rhhcllc5C9fc4hIRFtQQQxzGlpZft1mlHTJ8vt7JhhSbPyDzqiCKzbq23hR0H6HseLmTU2sl9ZbNGa%2B3PHoXu7rPSvaalK9hQesJ6643cxMqgDGcmcNHdF%2B3qQwxhfXlCiT3oUPV98igyKUk7MrfVF17CzwkgUizV6Qy4sY1GXNpkDux3FcupmEHPW9l5glExcjeALrap615iLotrLFqpeOF0RJoAMgwqdhYFXC43ij4NuD37H7gpBkoJhD43fMYT7QaBpxAWqJSbqNHFlvBE5IG8kRxdFMdE6GkqQZKtZm58FLCw3OgAMF1lZwUsi1b2zPvf3tcY9rAq5wtiVisVLQ6iRklW%2FC5gQjJNqoXO0QPVnI53GrHPvdBig2hy51oGsKurDw1p%2FM0wi5iMo4IX3sfvGCuzMqpydvORiYuktJmsmCrMeL2BjObxF0LvXaZ8TaKK6oTcDcZKsMunPR3XfQDPbegO3GbYToZTN1aN2NmiuwCSeCLIbxpCdRSysRo3jlHNIzyznImr0Q2%2F%2BKBCrJIbBMLWxG9jmjZ1BTWqeahU%2B7MyQ9LwYNaDvIh0r3At6d%2FNjb5%2Fo2n8bPyAPEzIqgeZceZGsuEiHuRd8saoi27octonNq1AW3ikzeMBzPHAeMhMG5zChk%2Fro4aTTe85JgqrkR9BpTAsDBZ9iQLk4vfKIzaPQK3AHB32lkMtLdS1MUxsPdOAQvA9pPV1z5W9Hft3vOiUKhcaAfc4Gs9qUvINmFDI8jUu0tkra7uhyXtg7uRk9weN4uemsPIhY7Yt99ewBGoqv%2F1mSy3jqWNdj8jfGbtcEjrDVuXpkLEq3ICaNQTANfOLeIFVDCDgF8zytdLWHHZcdb6bCwGkxxGakurLzvE2jyxNIBMsRc5J5yrtsmNepKJ9iQNT8rnLD4YfVbWlUHM9P8WU7R4%2FFP%2B7lXs2TMwr78KumxUPZlpUjCKNRO5OzuPiKxp4%2BP4nTtvrR0I6SzkRWGk9odnT992L558NwJPWqARchWOBPOrd9mreeu%2F0baLktZ3yxIFKB1Hunv2FeFMwyQfaNYsrzzRnmZeTQj3wk74y%2FBtrxpPFwFdY79wQf2lJPQ9nHpNFpAyVdMAGfUjsO2HrCtzY%2FOPOx5EryqWkcrnlASf4pDyGZByt6Tsrv2DJhs5BK9YpwYb1jyoqNA%2FFR1ARm0bTnmcNQLuvE2WAhH32BPH%2FBQFCuOxEyKd7gnD04bltLphggZqQiHX61ReqXKPIUawUSsGm5itUUIbL5Dox26tNhIkxKB0QzhGrUfNkRxLLpghVzrlY0t7geMjm2OiirQYROfVMedaXZRo%2F2sn452AqzBw4GqqbrsaoDNP9JC2apGJgtcZR6ABObIJd6FfwgNk0jmpOqqrXGsI0Q8zstVWPc50uSsfB26DpoUkNN1SCMcTyQEio4byF33x716seaQWqXJBjAIFo%2FZ7vc15eeegaTPuXGmMmjE0JYb0YKT0TjVum6Qu2KuUM6ajz76TrqdEX5rtWjM6fMSCMKRmY%2F5TydxjekgcJvZ1OIWonqVLjmVLltMuXmUgFBmxUiDWfDqEPaiQCP5qVKOjsii1KLhFB%2BF8wLA2g%2Bd93osvMp23dHbMo5e%2FtKFMFtnzywd6H2MuG4M%2BjnCcK%2FBFMlDNogUAcfqE0QKRqW77Mj0lJmmAoAvneyLT8LkFkJUqbViWg%2F7sVvg%2Bn0fRWLIMFFM08sewewnnMOEiKyHephgPbVcDZl%2BmoSsapSxylRyxRnEk61gEgn1BEzNRznNjCfAzWj18TNhvWr6jrzewDf8mXC6rs5xg8qUr4gT0RroUN4aVuGbOypeC%2Bqe20GxwnKtk3ROtsAhceLeFCULLvU4hUqrJ2TZBMTdmZdmkZms03VzGt%2FCoK8jSHjbriLA3cEolsHqHHxZxQio3fYsyTMDkw1a1eAmFeA1MpoY1qL5KWhXogy1oxC0365HgIZKr4nAYqpPWopA8oskMCnjJzkEAkoV4eqEJne8Mb7d6JBMjzhlmIz8k11RAe4Xs9Xjxju%2B%2BGl9jT7OKlRc0awtPmSZV5wbowq%2F%2FnYQUFTURR0aG5J5DnN2FiUpTtpmQMZUZ6pQVlhJqVgjejsIKPtKF%2FZrb04HuyaeUkzNrtw4wOgoTY%2BJ%2FDayXYHWt%2FupRHG6nnWs3LO%2BETSM48EHlQy6vxyT%2BPYv84N%2BwvYqXzbmcU7oSq6Pn8q87lbo%2BMM1GdMOZrQ8BhZprpNltfbMxScKkfqjOWY4ObImy2amYEfTz6vgWc%2FE9u%2FL4t930VOIv0%2BjvyH%2FAQ%3D%3D%22%7D";case"apiComponents":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVjHsq06kv2aO6wKvBniPRvvZnjvPV%2FfcF%2FVoCO6Iw7sgySSlHLlyiX9gZk%2FMH%2F13R8IOPJlrcfhD8z%2BgSDw38B7f1vzIR2zeij%2FaXYd%2Fl%2FE1wHzf2DuD0D9gZn%2BKuouf4dW47r9M0yt25xB%2FjHQv68XdZ790wMBEPYvAP4XgDoA%2BQemEPS9AeS%2FMRKK%2Fhkfl%2Fnwf5j5f7zb4v949s%2Fzdk%2F5P89ZftRp%2FtfVv35CwPcHM1kdl0vcvw9D3P9nLGVIXycH%2FSGAP%2BT7QYAZ%2B2kcXkfWf%2BzW%2F3G%2Fez1KkX%2FFU%2F2%2FR8Ac7oFJhu4IfyBgsOloKod0%2BAeidVETE2PQg18mT1pEYA5%2FJtGYBgL11DJKpoWd17fsmwOWWXLfz%2BCNCBuDL69d3n%2FjwgsnRyb4jObg2u2vxQOOwlgZmkPChymHRSMLWZY6AOsEKGdRVjJubY3%2F3mzfq6Y6dBugfPQWGZKtDshN3ItqH7pBRQB83%2BM9dIaipAs9DPSg26pgOopGN8j7Is%2BidAUxJLyH1xJLLAH4%2Fj7K0zf21J%2F2MA3gpKK%2F9ZD8Wr2i5GKhWxUxGN38KGtTJ48jfcgcT2YudDekZdMfFCGOG5%2FQ9rJwcBB97JdQFibNJLlqbXH9HmTbl%2FcrmhDkmN0pTo7Mg7juW%2B%2FibOt5iAvg0qjA97sSapIiLmjCXtHycSrV72uIaiNxmsIe3rEJaL%2BDfkIw7LtTHeMDU2%2BceYnLHSny9JsAfh25QjkvNWAvu3pe%2FXpsVaKnvQHectyko50goFC4UAAacldwPWHwWhaCTxu8PENnhvjDn998oGmdcLgkrXF0BBIvIQ7DEoLMjLjVTQWx8JzyHTRr6wEKQvH64MDDXnEb8xxv%2BxC8NwdHMxK%2FTt8Lo%2FmYQquP28THx1ZIUF9l5Q2G86AedGKYAlmtByQeS%2BrKLeO1BqwLTDvEoKio30U4WyASNyuFCm8IPOQgZ2v0FVRz%2BEKKxt9r7YMLxqCfGf826mZckgewgh9Za0OvyyidvHjOyOnA0%2BPf0djRtmAuCo2i6L0X8dGHqgxvioEonUATO6KHruFbBdnzc9XgqZo%2FyQxfXtfox%2Fvhu349fIEcLO7uikgWLvaLTFW%2BifT3YiUKnkX4AqVJAJp4vFQxEaxW%2BI5pXXCngYdXxKJvW7094ySsbvN4N4Hxyixp%2FcLmcnY0bNJ0HJ5uMwDahnplCZQFSyF1v%2Bd0iceF%2FPP28MX0ko3ua3tCj%2FmdwgQlJ9w0lNuI3IK2b7Zw1eG8fiRy3kFVlqlSRdvFoq2zhbNNEhVu0ksX6Lu7HEcWqq%2FHkkyDHRlvbPmOcrM9R5gcA6rwsxJu%2FGyhVY6%2B%2F5dCEjaeCjMFX%2Fmz8LCz2lIXCDkb%2B2tLpSmzVNAw4dwzOaltBHLLiOoTQ9ukaBLPZmvWCld%2FPrZbgjlupmfJ8kRtqfB9Z5dM8Ow7T1p9v%2FC8Wpcg0T2o3%2BI2amAP6C1QUq0od5yOeov6SB%2FvjNqkXF0RFKSWUwrFP8J9Z%2BAyA7hXDwZbb9D5GPnIo3XYjAkeng0enTsodr81VwZqJ9EtYM08Xp4n02iVdZOqEjdXwoC5bpBTbkLIwcwg1WduKog1zW36OcFgnSTAXSeu1%2B0lhZ%2Bo7oTMO%2Frf42jgISZVuCbDiwTeeOoMPi1B4OrJjsbXE9o856KvP7Bznk7HY6QkNUZPStVTZaFCwSwC%2BbiJEQD3uYy7rEcuBprgXhskhUr0%2BtNPRLxwryULQeXBAQoAgCJacoAWss4%2Bglqgl%2FXxQ3HP9awBSYG1rOdxKPyaG%2Fq5BmtPEWrhSQPGzsew56DWRVdxmUj90dXym39HBtkXbdQ3uICk7IWEGsmESc7SPK2E9U2Mr38HmU4aXOPWJjoCGqlvWVNT1rLcut4yRR1L5kL0HDPis75EE8EassmHQ%2BAqpu8zrjl1zBAKXkLTzKEf7HfbQy9%2FCfnIGsT4BeRz%2BI2RRiEVUAZkxPT2hSAVv1OxGH9tG9GQ%2BGVZ4fjumppwprs6sqRE5o5M2RkwG79k3jVAI568MeSXnaflexp8vCitzgQsWYbBfVORwR4ybg5VTu5CNH7Y67Ut8yuXx4QrdSvrrZbyGL1Ld4uj%2BIFD0tSxXBNi2nkcNEc57o5fYgkkUjYNLIe%2B9MvjW4URcN6uJ0SWmy0qIXNR5jWbVAsCVNVOkkYT1Zsj9gImAn5vQah6Yj8%2BjbdC87bFav6oTXHp64WwN%2FEBLS7KIsdtXbPaL6XylQdJ7FovmnluYRyNOGrCiGcbZM7dvZpnmCVBB34v00lEE6aP08Af3gqPZaS8dSpyBzUdM0uTefCaFxnzI3UpKeOKTg1T46hS6zn%2BcjyzP2WKe3TfAFwd3W4nubKH42ZPEV6D5DP09Ng03BpLZjBJcTALfZeIA3o5smsFjXzNMdt7qOcMCG8r99SiXpSnsYR9hNqovVL3Nbwg68sY0d1yyCw6bz7Vcu2USqRBtoWYSnGKgAkqFUaXRgt5up5%2BpSZfgL292hGEIEPuF9Afda3iZj8LjkwzK7xcolsydFCRdO6JhYHVZYLOnN%2BV%2BNrc22g3%2BNRCGQD1dFQEya%2B%2B4vuh1yM0RA9vK6l882bDwxqXYk9IyzXqrlhA%2FSHaVR9UJ3kaoq%2BWE1CV9LEmjYdcmxRUh%2BhCedNE%2BBEpDxWEgjygxDRamY%2Bjz%2FuPqmbl49eg7AwDZbT9KPQO6BMAyeq0zS0BBJ1ez6mtw9iykgSArSfVytgwwls0aQoliAmzHqC7IOCsK3QFjnUFSdDv57LtqBt6u%2FeFCxn0q0UOIDMVEPTVdj4pmDYcA36qB1X4rrtShRSRU4WcOZsWrIqUXlS3axI5w0g3d9Im3JV4DHgFYx4brREpWF2MNAM6L2N0MHI6BgANnhtLoXJ5BO2LTjxh85aeeseLts12q0vooBOkrWPDJr7GUbV3o3Y7rJ7BYYsAHMvr0xkaXzCNnnQ%2FRIRaYlHsaLWIUaSNbGneJ3uOfp3YepkXooWYI43E1rOqhiViO%2FHf%2FvFwvSUmkb9C8cp9tCQX6EIzzhdOyNKq%2BmPCUlJ5pZQAT3pYOg9fCU0zuAUgoZavJWumdm5fKlDUyMlD0s5qnms6HNVWj5WY5tlJEtS81hsC4ua%2FUlT6dKSynxEQwWsrsy2TGJnOHy4m%2FKwSYMHH%2FT19CBSf7hg8tO34FhGhzYDqEpZ%2FQGOT4xY7b9Z%2BUwBfekdyvAiN9LKnsMYc5W2NytvWGLSuqTDGz8%2FjfGUckq7UNV6yT2mZlkccjZRqAxJaufIJKNA0x%2FDX9NhNRqb9a4hPdzesea3LAmcrj7%2FMvgdj6x7unksRMZEe9wL%2BU3K3VoiYdMW7aM0SP6dPNIY02GBXlbyFji%2FFbHwMUrFncZakjab5kNHcbNytbfWkpA2WI6l1qz9cVasblDruw6hqx8Ms0BphO2aMkflYSPqKINDA9UgBcRGajutCIgTXzFJKG0RfhqYabEozmg2ZjiAOB1ViZIurrfU5ccomRFqRdl5sKuOshFafEgZ%2Bf7PQ5UT3LI5Rhzq5hJWQ3KZXWfA%2FjCXgT5dBeIzXfdZ%2FbvgAwjs7%2FTPYykNANt4vhWgnmcHd8%2Fz9pl4MRZ9Hml8Xe%2FziI8O9zH%2FrnkpV9%2BvLdXz16AoAsZOHtLoTLSVCze9bLnrx0AuWuuvJMIZQ8iVnubM9VMSUSGbOfhnp3g%2F%2Bqz12aPjZn%2F7nTSnKf3YNiRSxrqpvTl1xy7bBo5aZVvndhVnRVpOmoe57cZIPYHIGF2Ql46sbUUNNc5%2FwpMQ5pZxgGGmNliiaXucy0RS5DgWMBW3JTEKSEspge1q2FVQ%2F5Qf0PJbRqU05DH05Gv1cQn1FNvVHg2WVpufOiz7ktUMAAJydAZ9CkINX%2F%2FkkECnjIGJPK30yywhRQHhrND3pGXW92t9Wh04M1B1XxiYy8QnMRBt8aZaG52QwmxgFknmccNjjWNAiquKTl7aaJU3FJ689GDiiTy71lZKvbk84f9U6g0GTpX4Z0zNDLovrav%2BGbtpjGtgwqCEhCfdzqylsFcowoUkGCzbcBlOt36LOpPDLteArPehe8GE2hsrCsL5WKdb8a%2Fe0xMq5JSnw0ugiilbx9%2BX4hLO%2BBfEmAqzWI6Uz%2BxRKXlmW5FCm3MsCJlOeZi%2FIsb2q68wRXq6zx15o9PYInxQMp4Utz7IRQCk3Ixnbu%2F1gdJjLw1JitwVQjZZZyePKkd9N7sokLAFDXf6mqkDAb7UJeY9RpktkZQB0tBqazoci8Muk%2FqoL%2FJHa04ZrwlVfTxZyGbtu83A1LJNMa9MO4ZDsKJAIdIETCcyMpyQtfd8FP6GswDqkP1EyH%2BjyBYZXMOLTTCmVQkZORRfIvvvawVsHb4ZvEIXQSP5C4unBB74S2BUkVtk4KbIgEs8vq05fnlM4F0MSyJ1l0Zbz9xQ%2F9YiI0Q58aM2X4QsAJt4US8%2BvNOYgG3YbEvGjGUyfXp0nvcf3qbF6Ys3SxECYh02j%2Feiji2iiFsRDU57AKqD2fJ8BCEvyF2A3dQM685wfYHwNMiQuKnkUDiLGMB1Ywa5YIWb9a4g24sB0sPGf11tzvFtGF521IcknL4p8eThE5LbleEo4ll9E8hT4rQegn%2Fq2ovRHptZcqOF6f%2FsMKZhf6OwyTRZVv96PypREOptDhhLXu%2BlKv%2F3x3336yxkd0s7Lu%2Fs4k1%2FET4PjnrX2d2OSfrQ9csDLIfe0AB5le2s9Xcb9MZfevrt2hv1ilc%2Bi5taF90aP%2FmolwD1lhUd2uRg6SsQo7P%2Bwpft59W%2BMh3gEw5eAGtplHAWxg8G4hCN9AkXwgk8r3L8vqTngF46NV2XFfCMx9XUYI7Ll1lU46WIk%2Blnu%2Brmvvgbn804vbipeNajSoZfyUJy3N3XQS6aQ3Bw8weR8DGRBnY2ag%2BJNRst8apbGdnUB1qC6SYUH0iyIrYqPt2UB1EDuwEw7c2wAkujawFPQNwJtnmIHlO2t9opX5Pjco8Q7k0lngTP%2BtifUJJ0smQGPK8DZs0TadzRl5zmvHmWx%2FZzvWKCWF6UnuEkLC2udNtZn%2Fx5VGLwX6WP4Tu1KiP75jqAeqfld5FcQzvQ7GIO%2FxPrvydp%2FzwX%2F5trfo8G%2FLf8D%22%7D";case"claimFlow":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVjHtqy6kvyaM3y98GaI994zw5vCe%2Fj6hnPvm3WvVbtqS0qJTCkUGckfmPkD81ff%2FYGAo1jWZhz%2BwOwfCAL%2FB3i%2F395iyMa8Gap%2Fuj2X%2Fw%2FxDcD8H5j7A1B%2FYKa%2FyqYrXtN6XLd%2FzNTmVzDIPwv07%2FSyKfJ%2FRiAAwv4DwP8BUBcg%2F8AUgr5fAPk%2FGAnH%2F9gnVTH8H8v8P95tyb%2Be%2FdPe7qn4p50XR5MVf1396ycEfB%2BYyZukWpL%2BbQxJ%2F68t0yXN18N34%2FnPOs2%2F7navBxnyn%2Bwz%2BO8ozOE%2BGGeYKfAHAs7rSdya18hizQWoMt8ZnBGOBRehVCdc9%2BNomtomvyzxPYX77nenEbFtGug9KnAMzzAYJKA%2F9BnjBy5i%2BwibqCMzVGrw8W3C7EAR5aVaxx%2BIHkeG5RZmAmZLX4eBysvRlCQOgFxUtxigS6WxSUjZYcdbNan8khCf9%2F0wu7MhsJ00DH5RClA90s7GKvyB%2BPn904UemujSqKXybdG6qndbvLaIBsV1aV%2BKNZBurDTtWt88oC0iQy17%2BFri8zk3cwT3TZrAGUnVa5K0jTG9Z0hT60OQ6j780jg8nCxXR%2FRHi2OzQIUlW8VwVO7%2BmkGJZez3XQtrmJ9YL0bb1nWyOOfx1q%2B3NCrwnvNsresYFs1HxXUa907jq7AFinPZjznSl74P7KLbEbExtuyxMg6Ub4D1K3Hr3Obdpgdgm5qTmxoc58ogDrQQMIbNYWt4nE1A%2BSIGXEprq9nTFTArUjgTFmKwgIktk44l92NUrdy41r7i1yXR4tRWNdK5NR3rETpdI76ct%2FWNN33jAZtYGRsr3htWnFWDz4xUh04psvAf5KEz1RRFRbSD21pGnIjMOwPXcNDuevQu5J7WvfOxCyO3Wk5yQtod6d8emVTiEmv2lCxrSEylgrxGW1l1t8W4Nj%2BR65%2BiMwMOlRpVlQ7F6OC67n6RwYs%2Bp4GVkleJoWA4McHgTmmnYOhIdBWrR6FRfVEGuB9vC7w9tRM2J7ePwIvsKySZZQ%2F0qjq3sbyaPRNc5GmBZLigdbhyXWc1FxFz%2F%2B7iWAsStvlOpbrWua%2FgWu2q6bqOZDEWOp2YDcdY1GJJ1xT9jghBHz7t8kDjJlBQMUw7IpVR3cXw%2Fnf4DN%2BdvRbs9jQy1BUvNx4%2BF28EMfN7sXSIziXcShroegIPaRF1z7uFPuDsvmKnDxL4hNgFYmOWKmYskKWAstDh%2BWuzKN29%2FH5hyIovdfFMgblublM4EnAskpRiQDWVchgnfZw4d34WZSLFfBLFvqnhdrP9dk9aXtRJckbajd7OSMD7SlnXEZjWtGbMS7w1YBN4g%2FyugP82FwUonLjubRYYdcQ%2BtP%2BOHlbXxeldxWTsC%2FDdydtE8%2Blf1CEyY1AbM9BNATsFKSk7tm0yZkbBmv0G6U6N16n3U6N%2FFwqk8f2NL2rGDAm7%2B40gws2bbN57bR6yatPJrJ9AEzJFdvQMmVjcY%2FNKJ6EOv26tnFAEl1jk3oDCXpIsO0bbPpBt%2Bfazc9jj4Cvu1Dnrzq1NRrVRDun4aUOrq88zEauhJRLqhS8fWGhjlMg47BXSGIFRAVXLB9si%2BndQEdUzKVkN6hTHoL2YUXPV83XKdqZmsGVhHObquD%2FufeQ1KGSnXXe74OakzL7emJlxKEPGh%2Bq45cm7214nknX9PrJ0j0mwzs5950lqmaa6QneVSKGdxOh97w3dXF1uco5LCNSxYYguT9z8RcNSaG4N4VozaawYVzBnWTjwu%2BCZhWZTP0pJAzVgIh7q%2FYT5295MEAGecN94F5%2BmDhUFhLNeO24nsWmDrafs3LqBeLY4PFVhx7Q0ptN3bFtVH8yMuwHcCB2VpXVqf%2FtLGgX8cRd%2BXDKHdE2eLvgb0Qo4SBcnPQZcbmCyi42ri%2B%2BgWEaHOu6FCB%2FSryfi4cxb7L4Uw4NAYFIINPmIqlwdHWQKqg3TT8KV7U1wvFMFfLIg%2FHS7xi8GF3UWMGx%2BkncITuLLKzwApEByVpydHpwtJloN5a9WXgYS3IQQHr1CDOCmVdwwNtaInYm20yXZDoV%2Bmk8Ki5dgv1Vmh%2Bb8W7Phq5iUIwwDXy%2BPeSqNPDDffqr%2FbV4ZxPKeWyb8Eql%2BUc5Lzf4QyS0VoT2l%2FNbckQnkzbQ0eQBWCOme9gyYA3NLKryZ6I2bt6%2BNBPz8NLEvtFLXSSpV3iFFqTgf5UP4phi4tOpt424p17n9iQqAe07AKda7gVj4fIKkkKpvjlBEk1adEbx61mrg78nTntdy%2BggOGciM8VNHz0MqJAkn7kKByHwSKjVe7FmfLmuy9r7azbfOvUoNoYFUYEjxUq0cLZ1K9esZR4rFoZ8tqwikpu4cU7kqMEuJujAJb8TPpe50OzkACtsHUy7CswKMmcMrShLDYEPYBEj3Jb0WRGfRow0vnKgX22Wi3J8cyasmyg3i2IX1j5wMt78KX11HAzfzNDou3XXm1F9zsOICQ9PqFY9S%2F2l43WqCDz8YXQIFgZ3iVkzbqoyo0hNeLZGCwfx%2BkEwM0uIE2vzGx6t6ok3d03QvI7B9i7j3IHC6IE%2F8Dv0ggekss12YRig0FYCeTL2hn%2FSIslqshVNAP3lKSz2LEopYE2ShHGBje3s9BWaVhHac4%2FRA%2B0jMm3XsZNU2yLAiC0LTQD5k82h3v%2BQaDJyMubNZ56CzVoeDUhOXXBKQT3QgHGsYAUig4mgzPm2pWazZc60x5MhNFw0wehUmVNAVYdxQwMEh0fKU2M1BHMzO9LOEGKg0wBNywubWbp%2BimrohYz96vujn3rwhF3cyQxBudIJo7RrC%2BPJ64UiXOZqMSBcJ1ZEfDmZsioEiETPnbXBGiyuJcZGA6QjdIfUeiQhODEvT%2FaAfduse6pO4sFHzA56EYjgqk%2BljIsbCOTey31Py6bur%2FDzhLjG5gqv8gQXcYPxKeSeA22YCqyYJjwKBmYbvp7M6tyZ59HqKjdEizOi4K2rd7Pl9OcXB5%2F3neClkYUCsix3ooVfeW1S4ayk0bZCuyXsTuc1lXfkjjqnW%2BTDppdrRpN%2FbDnvSic1R5x5fgs8ERRanoY0%2Bj3yyABmwybXTGhU2gtSZ3njVHX1mGpb1b3o6hQJI0NTKP7oeaXNjehDMpwAZTl%2BKdL4YQRbAev1lCrqsAVjLpTXU0OFCteWL%2F96zvNdvGIk7HOQhuLwg9YjFg1piK7dZX1en3%2FQKpNBarBAYhtoNRUz%2F5NSZmaSwF6aAVaD7APecmJAvVw2RYex14XP5xNar%2FWZy3xMWtnjw4AkEq4m8AR0M6QdXjBzpS7MmTUkEWY660KxiqVtyhK6QXTUqV19jFL0myC4TgRco%2FIVWmQJRH5hWj784LjXcPCALrtSeOSHZOpmGWOdiIUlLe1RuritC8Urn0vqRFEL3iKcHqLzVQeBaEVkTh3yFzqdS0geXm4FoiyUoCOgpK7iYTWKWBZv3NZpoJ2PhTUPJ8bXWluojYKQiY8RU0t8YkUH%2Fs0wit8XiY9IlZlmZwOd7emAT2srd3HPGvFIn8C0qD1%2BdMm0XzjnzGuDCvoAmBkdxsk8R1wZ5y2SOBnvECdylDSfhjXjgCKS4mx07es9knTSCHVOD%2BPkQSqsfBW%2F%2B5I%2FdIX7L%2B09ET7BMh9w2WeR3GQZmq657LQgV86kp0D8dLAC6JqpE4RVKsBpI9TM25V2PHwNMehZBwNdCBYoqOAsVZwQ0sEPd3Xa2umkWJQubKzfwzWDiiZGluQBa6K0bdWHE0KD88OAH0e8D9%2BF6AJukxhHdY1CUjEAVqG9xyYIWLrNq6FjL75CPMMfEFzujJMVUgwF9NuGf4V76aU1DgZCN0j2hkbD4yID13cfaYUjGpmPyNA9EuWe%2FVqNlcVx%2B4ccNRGObtfXF8l39ZBLUuIU0PI3Y9UC6aGqxv8mOhrl1aeUJlaCxTzUyCb5CqhVVaCMHf%2Bz1Pvzmx97N6fRNg3TOg9OBZmoMUJ9s28tFLHlkY%2BDwpq0YgC3VCgstl0cmwbxnqxF%2FyWzQdYq20NEE5iK9tlSy7Rc3vZonLVL0zTgfB41ZJOW2YnHa7y0IwBHjtwOvlxovAMZF%2BYVA4HCCL6zBa9DqKeDZgCXEnQMvvpN8lLeOb88MPLIVNIzOEBaLQYvizaqFf35xhvq1j8Bbl7%2BQOHG3E8OaP36GRGL1uaON9Q68hTovQGGT2%2FlnZ%2FAziZvahx2eJud%2B5Rbg6LvpepKOGYdg69pi611dNZtZTZMvtSvF%2FIvGVtZnSNHrFonIcBrJcI19sd3v%2BTmvY1HtfM3894z4lWT3NfHVfGJ5TD3mA55BOIE1e8NQVmi0%2Ba5ajBZ4i6bVE6pp5GRkyDBqLrzkSoij9%2BEMaMOeZig949cVYgRvBVZdktjON2zr3jL8kmJIGLI3U9Cop8XqDqfM3GjfLtqsQLpZZ0D0R4HNeTt1v3KKwCp4oTsTDJt5gmQDxw4FGnksGGdh1ASlqyli8lmYkV1jjbcx%2BhmB%2F07s3vCZMKPimDQMCZcG7iI0mhdV%2Bkp8jXIVGGufYwjMUhTgT8Q9ptfyFPlttP7zEh4Twuu7pyNw5PMHrePj8Wp%2BCmqDajgKMEArhu%2BWiKSnCoWoCNBV7wSGoU%2B0E9Qarvo1khl4VwdCOV7ONM4qLEbOnDX86b05YNlgCO6qcA7eQNr0p%2FCecm0X%2F%2FJj9GQH9rRVMXnhB%2Bu1dPuTcBvter3gvRbT%2BJ7Efc5wJKN2GpUVy%2FHWTZ1LPCVOkpv0pk5v0LWy54ebJyuKvDxGfC4o7uni%2Bz0rBMVe1bh5ouYCB%2BL2MazsaSTOwiJjzRAo19%2FZHUG7DIDKbOOx%2BIZKS1q%2F0crqL8Q%2BZVxtsw5u1cHPs6Eel1y%2Fp5njJl2M65Pp29Eeyb49q131apa6oLuICloG8b%2Bq4h3Y%2FTFV5Y8clO2R3q3k3%2BzBo7eLfNgN0U%2FuXtSrQnzR311sC9SkJDdF3gIgvLYT7PePVncBbULWzmL3r27Ls6K9s7rE0nZPDBlFMFbN499dnEvo%2BrHoCNjG8Q84VCsU4QmTCRuysqjHh4rZpF3WA6mXJ76d5SXPvdn2zUUTgCIvEuiJoSCEBKR4J74kCyiOakwUd%2FMp9EpwDoz5aLCAlmEtVClWsHqDYgFcxIRhHJHmLZVG80kdNXsJOVlNRI8PklVn55ahj2x9FfR1eTIH%2BSg0y2USJIxAqiVk2cHb5lklCT89E%2FVhpn9QvyxXsyjXXK89SAgiQJdPI5ehSqwwV7zaAGNTG6pglbYY2pR%2BCzNpAh%2FHXEikP4qUgR97o25Aa1lbTpYLJ6Um7gt%2B3zpUyjTEubBnjRu7DW%2FRsXgLbxzbQ36SgAckgpV%2BY1tCm6Nv2EOZoGvI0YPw3zkWaBtG%2BQjF3sW%2B7ULNGJJp899ErZXAPEZbory7zmjzk9bSRnh7o7i%2BKz8MeJKg%2BZUWnUccLEV0Eznjt5MsaPKFsqVh919x5VHqSqeWaZXSNqEDJSLeKe5HM1PF9YoP%2BNAnpoGA7NkhEOxHCC8ZexxC1%2F17g3uSpR9RdBuHOtGgQB%2FSmptvAA6qOHSrT1JurXMCEB4c1bPK7zWPPhYqMLWFKzdOqyfdgH1RRw0ORwLGPIGs7UsB6EZc0W6sYMz6tJ%2FQfkLkLWsM82smwqPyH320Ou%2Fbujx68if6TN%2B39%2FL%2BORvVfwhgie9VK%2Fy9Ufjvu9n%2Fvll%2Bu%2F59ufy3538B%22%7D";case"__member":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbH0qw8Dn2ab%2FlPkcOSTJNz2kyRocm56acf8907u5kqEA6SdWyOJf2g3A8qfob%2BB4HOct3aafxB%2BR8Egf8FAQlGyzGfinas%2Fwz7nvgP9Uyg4g8q%2FEDMD8oNn6rtS6DaTNv%2BR01ru5LD%2FiwwAPOqLYs%2FMwiEEP9A6D8Q7kH0D8pgOBAQ%2FS%2BCxpI%2F%2Bmldjv9jmf%2BDbk%2F%2FIvvT3%2B%2B5%2FNMvyrPNy1%2BovzgR6HlQrmjTek0H0BnT4a8uc%2BzTr4L4SB76YdAfHv6hyKfNQr9t%2BFcivyP8r6R%2BJfPHcft3fz2AnGP%2F%2FPvfQzlk5frHPxnMe45vmGBh8Ljj9IuxONNK5BpHyO%2Fq0t5srZFHw4nC7kbMUjVrkidAg4f28oOwTA711TpDXXdd4YKHENIju9xCaeP3HzCvotwBPvDazyLVWN9NZ6bohbnDWdOW924QTjnUpIVm%2FeVoQHHuX9OgZRD29fnB4kODtEd%2F18NgcHdZnA51jdf8QJK1I4kaP90XfQ2lSnkAEaIlGxx%2Ba7WQQG89G4lA0sOp9WFfueWOcf%2B7aDkZr76v9rcBdKxD6ekvratbmnZ0qC5e3SlmSQTj4mPY1%2F7kVnYPY4nJ16nchJhNuCp8oqz%2FjA0w14XpDVyx6M5JkYl%2Fb6TfLqvgEC%2BRNeIdGRTm9etLQ7s5YkSjMD4prjT420tx1URh4y4hP9MLhUJJxmnXthPyj9A3GaXbNM75rjEfpSqeRyoetQutvhYl6wI1X6kv9D7wdVP2jWiWPmYoDBgQYppO75Ol8tMBqIodPrUw8bTshuXBrdu%2BJgioQginvjxV2EnVX61KejOVoufNNH3Lw4zzSrPGcw9P6SWvRFqlWZc0lR4sX8Utff7dD1A%2FXkV%2B1fWLdSFayZYmWb0Sd%2BrBCsCZjNEr%2F%2FySVRTucBOWWb2EclvvypZEySwgH11rDYqMO2UrpsXsil4jPoAqK2iJd8Hhi62uhoJPSW958FgxUismwHo1HCqQxn2NDJ5SpWko9aLurQYEB5FdwZURk1Rrzo8WGdlFffBIVGlGSOa1UV40HS4TPcwu5IUUTOUpa0VIrxQGWxbBMVmuc2KqnFKS4V7dAgXMcJVfnbRJXs45rx5MPsY0r4b7XGpKfrM9Lp85S61aMyj5ui%2B3clJ8VKKIj7zIN61zaLvy%2FXItuYUzR3AojjeYs%2Fp5eRDjCZCoIMOQczYOQBvaZpPQ%2BZGVY%2F7Snh%2BSWQx3a8YKvbGLi5MxpwI4SruE5U1BqmDrZY8a5jrTUYYWVLdUdXyD0tuZ6CiYtwWpitCPHQ%2F7Lsq716czHfl8n95lLrvoAlZAIhslMQ4n6K4RdbllNhuzdi%2BQL%2FD32ON6BWXtfWp%2Fr3OcVNtJHKUhAodJXi2YD%2FYQ%2BsaS9Eopn5BI3MSGHUWPLJ7axm5SFsIar4c%2BiKSHMWRgThFTA6fwpVu9FyhUw8K87P0Vt9poftxMN4iGzCS9vidf16Ytei2JoC4zeHFBWVUKey5y0bEv3HajpWFDhvU2AAM8GvnCkZFf3od%2FJMqXSIYGS%2BcP3V%2BvrhSXdk89dIs1w23TRrL7GamcImD3Apj64lKYKnl4ddnoSAgiJLu5uPTFUs0c90%2FjRs4ej9moI%2BU4wug0LP7xrnYSYNm%2BBQVBMuWwjK6AbMCzKPPSgivX5kudroeFiPWcI98mOvgqCHWI5BbZfW0s7pVJjm3szW1feyHMRgL5Nu5xdbB6Qcn5q4CR8eW%2BwSq160Af%2BsZpcUdwmVG5V67LOQQxWjvJyoKV%2BJnrUoSqRMvamTCXcydx020Dl9025k1qWSXXCUJkzyTXvWOEVxNaYHupw%2BPhAz2B9vuSCoweoovqgMOXk9FbtQrvJ9G8REwm3JB%2F7RlQLC0b00s%2FuLelv6jMqO3btPjnME7LLM4IWWMDTZ2%2BjolzCte4PncpcmEUCbFXcakgV7Duhso12R9VXWk06HP5wjZ7ufeQWUlq%2FBZqeWI63FelLnpyS%2FWJb33sDmcbSd%2BAE2GV%2BSm%2FByPRrhc1EVPVqDOm6HLvtG%2FNC%2Fla7X3VHtELV63Z5KGK6R4%2FptI3hn1o62IqNPdtgrZx300Ir01YFCrewFIQ%2Bq0X%2BYsTdhcS8by3xK%2B3mRznATmpSjxY31pP2uoNYC3rFwLxhmUDZb%2BjKUZNykbIJ5HYWQUxKFTmIUi5LG4fpI4QSsO%2Ft6s4YXrOvRvmqfUmrVIu1rhQz6sTgmw0ruwzlq%2FHj%2FwSuI%2BtNt7njqyZzOf928Vx2IXQfLiM9F0joIQk5WUoBoGdl%2FrwBMHxsvCPXEBueJQylLko9UawnFdQvdHlLykHsZk90XFLTE%2FgwBLDJfuEX5O3N%2BFd%2FPbbUCsCj3JS7AAXDJff8P1kj07c0gkqD9e6%2BZWK%2BKPUOMN0A83XrryyBOtyANtE7ryfCAwqISWrRh8FludDGh2vgmohdCftDKnRzqP3eco4O8fWv299HDSf6L7q5fd3a7DfJR%2F91ZbCGOxRFLdtDJxCuTe8t4aCF%2BonCFjaVCnazss4Co%2FNVDcQPDg9rE8narl6Qrg5b1847StEYuPsd2XHC7Bc3IXto8hdCpqK5RHJRV1fRV4kR6AkYUSqiz7wEq2zBtBFfChjpOTsaPBFJ1yFK9Xx5PlidzUZalbz2apmJvZIz8GT5OAXtW8gjLNksEcVrPlvTYXHlD4TEIEzcEfYqXYDZchR0vB059v3mHa%2B1NVp5N5yc61sOp0VUv2OBaR66pE7dL3K6uqHd8w3gNK1XT90t3ywbmhJbCRwJ6B9bNXn6yxAAYaZcdeMwJLA2GCWNOy0ufvSqI%2B3UGg8qE%2B4g8FPERkK3zxfvdE38hs%2FxVpiyHT3864%2FWdjYXdmQnZ1O4yZSct84UekpbO4q3O%2BKf2ijCaiPY2A9MRMeuh7cs%2B9iA1GR3XnRf0pBPM%2F6YF%2BLQ4grrbqEp%2BoENTw4wL917X%2BrcjD0tzD%2FHfkP%22%7D";case"__admin":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbHru06rvyaPbwN5zB0jst5OU0azjlnf33b%2B5w7ew8wChJdIooSKfEHZn5g%2FuzaHwjYs3mphv4HZn8gCPwP8OBjzfpkSKu%2B%2BGP%2BOvw%2FxPsD5n9g7gegfmCmO%2FOqzR5qOSzrH5paNRmD%2FHHQPcvzKkv%2F%2FIEACPsHgP8BUAcgf2AKQR8AyP9gJBr%2B4UdF1v8fbv4fdWv0V9mf%2BXqN2Z95mu1Vkv1K%2FdUJAe8HM2kVFXPUPZM%2B6v5yqW0dfgn8iyzwQ%2F4ijfwi84vEL7L%2FjsEfAvxF6Bf%2F8IF%2FLc%2BY%2B2v%2FlVX9jb59AkqQf%2F773yjtqv6PONwdw4RcIM5AwG42DdKgzNS5FH2dP7LQdOlqdIqpW41kBzJv28sEPydAVyjVM3YDsX1U69BZHoFPGTmFbyorDNrgrzfpTiKJ176WsIj0xJadG8cAQuDUZ%2B4X1zHzLMQHTQR0tNxe9g0WJhpT7OXTK%2Bsdw21t14o0o%2FrdEq0MNNfyyDVI10hAbzj6rHjJbV%2FUgSf%2FUWPNWiOriXKO%2BzPTLz%2FodTOro3R1JLYNIl7dv1y4s64CiEZ1U94e76RADLOJQjYg8n5696wW2%2FeiGIN2kDmDmgsQt%2FTjjUMadUCrYv2mPNt5HGSUJXdlkK4Z5VWDqpcdq8riVvp9yHaVAcaVc%2BjtLTxuf5eg1SzNisizRCsnQg8dPjUiA77R3bVQpBdFLXfNxysqr9ihThm9T2uvmzdqrrCWAMCgGa0M7lRGj%2FN%2BewBO1tGGtKSlChaJZjo9YX8S2bDnS18sq4Cfq7HeX%2BEhBn8Bf8K19FTppdcTBbJkRi2Bdgd9fw%2Blm5Xt6TpGw%2FQM0VyeJUwhuk0rxNPFi8%2BRgXegYcGsd6mLGsaoHfqwdpFbdpuhUKcPFW1%2FuJ%2BjLCTabkglnrpwcjL0qL59B17honOPk5y7vo2YcO3AGJGPDgEtFL1yqQ58LIrchSq101MqGyU8ld2li4WFHxC0bRDtCgNpfLB2xCDoEEoxi7koZrOP0uCApjTlIxhlgXpVckr2u3CnIhK%2BVcvcCbt1fCILiKlYw4Jh3Yn7IMapbCWEraflxIdfkjOnmTinxZ7oXctKP8W7Sfv6CBajyOM2LwEdhLkCf3Bw%2FbGm4sECJa9TcpAwWfJYsITQU2YdPvTGnni532G9Jy2djqppJVXxUOglg2TvVhbsFCfjWo0KJsZWhVp3MM7SW2DBZ9XM6ZTSecilGlrWeVetHTvfIpbdBDJn9nM7UVbGysER%2B6ncI1DTA3TgTfoeF9qsF%2FoM0nF4tpq%2BvLIB%2B3I%2F1c3CNiw7wZi55Wukb7nyEpt0CfM9kAGnZIOVm5on9UGD6FZggKvjwr4OuwScttSoowRYHdUbvurxrFijHZdJNikI8dtOIbDYRIyaRILbH0TUsivAmFFuY5WdMsn3dJFUI1LuRBYocNgenFuF%2BZjhsjeHG4YRGK2i7Usafd6IqdOlHH%2FjNJuEynE%2BHCg9Cjm2xojhB%2F7jJCh9NAsFA%2BK6LJUq2ZN3n0WXHZ4eHZ4QnZ6enfwb%2B9oRdKUgPt%2FbprAIvtG9RaDkcgCt7Fjfqm%2BOcfJhHV0rzaaQvvlsx0VIBhRNSs6pfOR5CFHavTrCMgHVVxIXMvcuWTdBZCSY4GwwKJaoVDGNqUcWnWb%2FLKM0siZfVlankhTYLLIngWjICyvgAhbYLsQvoMYyRqyxAn79WqCj4JMpH75n22UEmw1fsgFPWRWRVeMM5TjokBiak5BwYyAQTVjIrZU3nzucnjgZSNf5KbI%2Bm4vJCsgT1YAmC7pcs%2FmVQPZ6uD%2BiTXwklXcDAtGwoih8cq8knhrM8XEBmJXKyhpmWnssOftu0zcg%2BZ8RZ%2B4q8FjbIgCLFIbRbLPAYcDACJ%2FDp3f%2Fxedy46Wyf3PawDk23Op7zmQ50CNtR5vHzC4nUfo6MbvsuWB0qgaEwVBMtuDJzltmKszF9dHYtn0rzA%2FCN%2BHpWXPfNPZ6NI1j4D7EJ5n5HYxgynPUc9ut631qvlTqV4PswgzD6ulKiEtu3CHT%2BK3Ogg3%2BtZBTItPSo082O%2FtCSHPSwSs9tORvPHcnTkvG1MrjoFIG%2FPg%2Fj09zi%2Bpedxb2GZt2CFLZ1UohPddjrDG3PDFwPu0svZAbSe1YkEa3FJqj6%2FSSVWhrejRFDuk1Vg4HAKHkg%2B%2F4Zg9BNG5cCijsAAeH1J7vivTu3Giu9wfCzpGtlyPdQWhC%2B3bkMbGFM0LBvZfj5mUiKd2G3vW4axT27tHAMafJlM55%2BcaIRvNaN9JXtZ%2BbFN4oesVQYq1ZMGRrb%2BqTMw%2Bi54Xn475FQTNCpLI9YTlYKILYvspm1ghYoRoTfNSvujWfWYYddZ4GKJYjzcLhaSCJucZIvZVD7RM6lJrnAT91%2BckEAknW3cXiyPC0S8wlc3Z7u1ph5kZjHNZx0zvWMVlFSPFeu1nurIrHLAo2q2ZENmcus6qsC4e6Qu2hPaFixJgPWvt2O2sfmzkX9dl%2BQRp7HlEL8jWDYAT3JjxLpsZbTN8GhECUFENqhN%2F02%2FYcROf31osn0CYEvYstgbC79n5t1mqYNU1s%2FFMfXxFRlgCB2Z04nDsccivGWnIvG7Y2jEYvQq4GQtuwarYj62ftI4mCahFHiAiElSvfRgzEH6O9Z1E6BuoWB2R1gBlz%2Bfce1%2BS%2BpqZUq%2FEn3t5wBMDRtJmtVxP8VtWm0a3EFFqY1qTin2I3k2%2FOX5IXnw%2BZ06X62bgSWNLECNrAgL6Hh3M5eLErytJgO2nIiGombeyf8Vcb3RZ3y3RIv5c%2BhdYcamUx3lZ9sD4vN3%2FwSSwnXIgDagUDiXOQrtIE8oh4LbSpnSOIWSWbCooVpXZHMQ6rc6w7R%2Fz49bVvQtJ3vGzK8kWBp%2FnBdPBpvPD8eg%2FJIPHBBnASJMpDrq%2FA7vW8xk9CnqsN%2Begxp7nECeOlIdpvddHm22u%2BH%2FO%2Bmn%2Fb3X%2Bb9cf0t1%2F%2FtfwP%22%7D";case"__telegramCloud":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dRfFsuy68WvO8qXMHi%2FNzDyblJmZ%2FfWx77nZJVWulqUGtVpN%2BoHpH5g7u%2FYHAvZsXqqh%2F4GZHwgC%2FwU88FnN%2BmRIq774XXYd7p%2FPi4C5H5j9AcgfmO7OvGqzh7QclvWXTKmajEZ%2BBXQPe15l6S8GAiDsHwD%2BB0AdgPiBSQR9AED8CyPQ7y99VGT9%2FxDzf7Rbo7%2Ba%2Fc7Xa8x%2B52m2V0n2R9U%2FekLA%2B8F0WkXFHHXPpI%2B6v7Tktg5%2FCLgHOlmb%2FVK8Aqu%2FerePKgnyz7%2F%2Fvf5F0%2B2wpb%2Fice9cE0yFWAMB%2B255xCSkQevGVyDhOO48FAcwa%2B%2Fv4bqUMAram7TTMw%2BAfhDSVpqXHsSXoTE%2F1iRFoL8hBET5pi1tAaMdwAfXHoGebg%2FdoX5yqWMx0me2H4h6Pkum7UxZ%2BPWAR5W24prPL03n%2BFPoZcMP9Xvatvo4bKtLPb%2BcGW1Y%2BH7KUG31z7ybyAwxD4NOzUgRcy%2FohRQ3ivUYszoX5zuuUJ6BInmXI65Aa20kbnrHb8%2FepBm5jmbtcKIEVgtM8W%2BkSq5B29MwD%2B5jdMopnEVAnx%2F%2FxjUdLJLnN7FRQAOlSJbHGvR1WfgcdGbgRoabhMl1qxFlCgOVeLxdiObFAWVJQWpqW%2FScf6pqhovT3F0%2FRcXthf9NtVxVpgd1WEAcBf2CFZ04yabVmc0KRySNW2PI9sgmdQNG8OTqivqEDyfUBV21NVaaXArMINGr7BKnexyLR%2BvAUKEYFMVdBzFLeQO35dGMyQ0o1%2FJZox5%2FzsGx%2FcoZBQfLFI0Jo98YeC1on68%2BPjgijWye5V%2BNKeyBXP7I1ybteHbFZ8nNVItvIT5Yz9ZUfZmWBba188ZLzWRFEroZm209PC9g74c5Y9qtoitkLgpiQtbaNodTMejts9RVWwEti7nV0uJn%2F8mgg9gc6%2BG5lhAZfc83R334gADWfneCamhXBuAEg%2Fx7mKLsXMOwU1hs%2Bx6uplnD4%2BpcRbzulMUP7IdCeFb4Nlyf2WPlmGESlvXEuWjFei1nO%2FYEQqxgVEGI1bVMHCmfLT0zmFjcXedzB26BxzK%2B883VRIl2EQqFKR6Rm9NKz7AUR3%2BqTu%2Fh5usX2JEs9Fq0kpW%2BHnNhnKjaLlGoFN8Ni1ezREHPn0PJKsRfsSliT8do8crrUKeulkJESbdVeToY3wvg%2FSSvnPM7pzNRgtP03i%2FLGTvkS6kMA87BBFaE%2BPf4vTT4vabI2rLNG%2FriiTY9OIrach8WIB8Y%2FskJXN5VQD%2BR7ZI23Ta4trRmpmFZSqhpDEuix%2BvseqqRGAYECmG6XNbWe%2BovY5wwwB2KncmzAyeidHunRFnZx4HYIsTgvFc4AZlKDIZnwqMI5T5OYo6QuVK6yHBAfQUuKwAQfbABFTiYP7t3zX%2FVNfkMg43ebduWQe5iJR7gGUKdO%2Bdyhbc06wTeRzjw4SpzlzgYmVuTTOW4INT39kQ%2FuYSqla%2BbyOpoCAoAuu0JBx54%2BQ3MwtR3ibA4BksV0i5F7iYtfOiHiPIup5BPkeSqRswAY4%2F1S2YMW1aMozoSmWJ6ZKmgwAcTgPv6OBKQsQJwgsczy3lk0qEeeQz5JC7VbtEN3nBgWQ%2FYHpaAa10WYRX6oxVDtwVoN4uPWKV1%2B1GEq%2BJzOiafLIJULm1Hont54hQWdJVYlIWe2yEpItQ4puwrR7rbt790YWuD2rfZgZ1cm0BlJnFGYjUh3LGR%2FZZdhEVkXAygRzcHUx4CUsxZzgycxcDyFhSUQuQsfH2tEMnjQcBpwP706Rbg%2BHkrJrVZo1Fzw4N3EZM3ACo5UcgHFnoMa3NJL2s4fCriBdf4kPguquk2dZJjEmo%2F9waD043Sn0NCtlJO15MuX94WSeFcluO9VeL1ScMkPLwTLM%2Ba8nP%2BWvTnPG9c1lsgP8OGxjeZS0tbavo67ry6q4o0KUdNM09NpgLa9ZQuSZ4CRBUrfQ7%2Bfrh69cy%2Bb9ayKGBW4oTsagPtb3CTi1C4iyJ0%2FcCjt5h1qmDC%2BgpXd44lp4OPOHPX63iSqXHuI2dDmw%2F9YS31TvNOaNEEUZruDd8i0qjjmBm%2FLdOpQFyvPbe8T4NOUb24JAIJWueyu0pMl%2FMtXGZCv1Y0hl6ftxfzgbHxlYKu6Con1nCuosf%2BmJC7EN07Gbz56%2BSNqdznaQYAqHtnkuliqvfM13lYu0uV0oAprsXy%2BgnTyeh%2By69%2BnkXkz4mhDJwqK3f67ew0jtyjSHMp1yQB0%2FvxMSxn6jpwzFpPTbFRuwkfQuSHWr51aBwPlhnOHEXISiM%2FwzhrgyGzYZEX19fgXDKvlVh8iCzBnqVYWw3KffM9dtMZAtEWVK0lIRBRkBLmJ333koAu2p%2Fxi7Bw3eGTnDr00HT%2BoHFVGDkHhCwM55Dzpr82UalUL%2Ftd0NenxlH8G4biUlIZKtTAZXlVxF4l158bVmPiHlybPLIAlwxRCLLPHv3YqeUzUkPzoVwwxL%2FVdUt5HkqqRIVvdhefjo8LcHVKl2oTM%2F0uo9dLyHO63QKI2TDRh2QyCbkDVJAhJwN4kkF2uvajiee7QCbQl4GD7De4%2BbBLbxxdF6QKyCRYkP3bZwOq5d1y2J88m4suklvpTkqs5aHUjasraXas8w0RVHlYl%2FRY307FAT6woqhJQqinRI3MULNNtsEfPBngT53jewYMuSEAcU5BufHWugKD1h0EP3xMtvsJI6dEyykL0IiFGSjbe7pHvIYX6i6jyVPE5PnDeZZ377tLJU27ni%2FW5jZDDuMe9DEkNFBNeVpI6y18OreSqrlpygzj7jaT4%2BKpGiXxU03QGTS%2BnjtxRhg9qQjQHW5Q8oE%2F88bvV6fMm7SJDsWWh%2B5pHjmcDVcXk9SHxYQnVLGo0H%2F%2BGddQZVf4rMRFhQikn93xAfU%2B57dVo5ga1DvDMI%2Bg3264v9wZh6W3FbQqJYlQtVHDAD8KCdMzMCPJt89g5WAfjysRz%2Bfoyps32MIG8QmXvigNHZiZWfkAdfp8X6bCZarQMzB%2FPV0uV%2Bd1iqOXMQvfG5jmAX%2FL2gdMyBK9eqJxgqoAlAlk2oUglFIJCI3bHaFohiLdkf5wNAY%2By269F0jNlnl%2F4oIikx2yB%2BE%2B1iw4VvlNSlrZ90j7KZspiAYXU04b%2FcBaVpB9jNzl3VnWXV8bGzpwFyHFdYiExtRSgr8tmt4s0Hspr9U1Ir8ESAhQmaiBHBJSBdeHNGpXiF66vJbFJEUVyE1uc4do%2FvArXnlG4O3vJYZKGPW%2BAlg8nhCnxCAMbhsw3va0XsYM3nH0T5DmZ280AqNcBDF%2BtmN9g%2Ft5PTzwvw%2BI%2Fz5%2FnqW%2FL6A%2FK%2F8B%22%7D";case"__familyAchievements_db":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbH0rU4Dn2ab9lT5LAk55zZdBEvcOGSucDTj%2Fm%2F7t1MFeXClmQfy9KRflDuBxXPof9BoKNa1nb8%2FKD8D4LA%2F4HACFarTzGW7ef1uxz44l%2FUI0DFH1T4gZgflBvOuu0roNqM6%2FarprfvisN%2BNxiAed1W5a8EgRDiLwj9C8J9iP5BGQwHA0T%2Fh6CJ9Fc%2Fe1Wf%2F7HN%2F0G3Zf8g%2B51v11T9zsvqaIvqD9Q%2FOBHo%2BVCubLPXkg1g8smGf3SZfRv%2FKIhg5LMty7O1%2Bt2w%2FQd3D6AU2F9%2F%2F11nQ9tfTNG01VENAOr6d5n%2FHkOGU13QBibYFCRvs1yyX9KfTNlCfxCWGRyFjpaua0NxPV0JXjyGzAvtc%2BDBeqX6ZnCQzFJlj3ykNxzNcLQ%2FZpt6JFRU4wBb1%2FMIBS3DzhtUeb5JsNTcJxiNYXlttt%2B1EMe9Oy%2BAMnN0cuoV6uOg52%2FHi8XBFLMwc5cAMbJQfu26Ora8TCS6tWVRduzvYCIbdk8mF55jcKw3mYsSx23M15Co7r20%2BN%2FCB4Ldlbl%2B2FPzep06kag81VSWxAN%2Fivkf%2F4mEEYRjKYepAdRjQjIQfEmDCu92Y%2FvceJwfRpX6O15kPVSGXJTIbqyq3c2fzwNUW%2BtwG70GxSnLYAN%2BfOXZRL2%2F1gIN0R01klQ7evRi%2FVDMDHQXIsMzUYslaPVxUdP3bjvFbBwUhb5rCUsqHorPDafB7lXP7yFt4mr7EgqWKUTSo81n6oZdUmTCorbqRFZ0NM%2FLmEKTStjuDFyvKLUtvMHdWBszkE232kPbT%2Bs2icZGA5ALogkx0%2Bfa8o63gHPyAc158DbsYVmWoKFj3XOeTriK7NNFkKYv88VkNpZmaMwrsDMzb9VsR9vdwN%2B0nQP3SfKlY9cda57rNzzrNCXDEbxslt0bUibP3diOwaqkVzHTNdIzpqU%2BDgeXlgSuCAvduV2mcP3AgaBzjlkQi4oEYJZb7dPpfHCTIWe455McK51DoydpPKa1o9Ef1Axru5BgL6BsoTISNUqYzsTj9pbdITD4L2PhCkwbG88lo1WOHjp8ZWtGvvISugAs1%2BxH1UKrya0gENjR54kkQtG60HZwc7%2F5aE6QCAysvGXbm9fv3S0b0%2Fb9Fsjin9hhHRfOnXCw1rVc8OIsU3J53Ug3OnZjxqaIgCDeGRryfUqoKye1FaGi92bX0gv%2BpgtvnrHxboJmsIst9ijbF3Gvp8JrdKNVxNhBaUsO2%2Fg4IANW%2FXTu4kVIKG1Ws8TvNzje3c8CsfVoZ5W1GjY3ybyjJ6Hcek1qUmljhC9hdGjQwtq6m%2B5MXEocxM3CITgVJmmqYa9POqrfYRvLnC3Y9c2wbhVoqeZhMya0jOcI8cnF%2FVIIlJ0OZqJwsujcw0CxYbLPi1ZMuV0TmMi3x3fIv1%2FyfRFcRRD88BWOV%2FG6e0cgvIa3l5e3WtlWQSofrSZzphnE6TiP7QuK7tg4tr3bRYFr8LQJe7tkDyOWfpuyLAoC3LQ51ADLU%2Bblc3vmnaNollW6Kz7O1pGSfc8gCmZq6CjfYINxZMYgZAIz4tHu8FONdVOL9ZD3a3Ff11l%2FAuXSQrbTj2F0WzxiDzMPuZ2fq8l0a3PAAaGIg2LjWLs5O7%2FsYgIQTOFXa2knb%2BKga0C2ejCcUvQp%2BdbVF8WTzLIJ1OAvY1xuwvCkjz1m6jwMu212Pgsoke2jCUTAZxlYszAX9q2X2eYltNM5xEvxBmHNxn726ni9xz1eoCi0M0RSjSXpo1GIdHKOT%2BJ2xxcIg8na7zETSQa2GgpzZyiKDj3lKBzns%2Bx9rq8I6kzYyKC7tQC4JGJNLmObD5BN2XX7ZibZeJVQRHCBbGNlnAtdGii2lWgyg%2BZQiEbZsJNQw8MZl44sWzprqOhYvDcknM2PwpOkWJ69hwPyYTVIwkMLupk%2FKbcjaPdeLeLgt3Efb8iW3uOSv6zO6ParnOyhcqb3ffbvuTTWrvJJ1rfSfsIW8YtcD4pmEtcPgIXJFIhJTf40UeIjWf05WJ71urQjQiingNdZHS5R8%2BaAjc0TU80xRjHhaP9w8ytX399uURdM0zzYjby%2B2lFyI4XejFqRUVWCXJy2JWqB4oVCvR8%2FqNmXD86v4d1MzLaO4Ohf%2F%2Bzytpven%2F7N2DEnzlhz9%2F5DUaHQa%2BbsJVc01tfE%2Blc82lfD5mU965AI98ZydPvO%2BWs5%2B2V8SnOrhHXIB3cEzavVlSUqEGWqlDMaR8RYLlFMeAs9dCXfGpADq9F1I6AoZDM6rw%2B4hQRbKqv9NahjOKrQARhgqbpm0Xc%2FvMbZuC4Vkq15oXT0odYZ%2Bc4TWG8twFboDhxVeDUd0ZiyME4BthOKiZCkytU37piowonM8RHUpNeiwK%2BVlg17G0RVWq2rqwT7axfk4uvTQ3x50w%2BWbFtfLdWf2H99VpR%2FIrwacp38niBnRb3lTYFqMKJmHgDPY9msFtVApPk9WStMIDW8bBN6OK9kt8Cptp2RRsKaiz61OQ19Nh6gNXsKczfQj72LR%2B1FrMfh4iVrqCSC24UWAOXRK913pAFuHiMZfso766TgfNGAEcrFZwt2ONm7kayDWOgqTTZA64G5CnTzcXyklkinK3uVUZycpLmkD6Z%2BmodgzFgP9WS6oJYU3iQBsn2Dsfy3kY3hOhevOKr6zl9G9Ai0O65JLEfjapeeEL7UsrDJnibQh0%2Bk8rrvMbZy7rKwtGGeWkk0aUs9JLEYyopaVq1hlya%2B%2BO5gWBBu7VNkeux%2B2Giyn4IlEAJIzVBZ53hwvkJmTJ9V5ASa8ImWLA5m%2B5CK%2FWG%2B1vnibXln72EREMS3Hpf7ykNitMngLueN6N5PB1uZ63XQ2WANU2qprsXBL8vUFSieVQJ%2BesD9CRKlMFU8ysAvibpyuYbN5YUVN0ITIHEXjdE32kmCosbqoT%2FtRVnLckFi6ycEs3WLDdAXillGRjSKfSj2xBvYt0wYzN0SSJjv07E%2B35PE%2F7a7%2Fzbrz%2BV%2F%2B%2FU%2FK%2F8F%22%7D";case"__familyAchievements_bot_groupHandlers":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbHroRGFv2at7RFDktyN7nJsLFITc6Zr5%2FCz5ZmMSOhSjdw6tZNPyj3g4pn1%2F4g0J7PSzX0Pyj%2FgyDwnxAYwWnep0NW9cXvseuIf1APARV%2FUOEHYn5Qrju%2FVZsD1nJY1l82tWpyDvtV0AHxb5VnvxQEQog%2FIPQPCHcg%2BgdlMBwMEP0nQRPRL39c5P3%2FUPN%2F0K3xP8h%2B9%2Bs15r%2F7LN%2BrNP8b6t84Eej5UC6r4mKOO7Dp4%2B4fXmZbh78ZRDBK87CNYH7FfdaCn%2F4qrv7B3wJIKfbHX399465qLyYtq3zPOwB5%2BSsZ1r%2BKR%2Fq%2FRVGB9MYkxRdMNDHYkX8QNj3SN7gVy4pU7OxJVm%2FJqgNmNvLtz%2BKPzKxxJ%2BqBA4DIgt5cGkhJJptZMupyOZSmBRUEfi%2BBYJ99X%2BLfdDx3lFTeMhtfA2G2KncJpr5J08EaL5vvdGUq0o%2BeQjEtFN64OJdur4ylnqNi4x10RGIrHbMihikZDTaChG5LwuX9GpksLZ16HFAAxJ70awpiXmV7WozV29OeO%2FQLMfSnN4Zk7ITYUGS8Vkb%2BHO1VkJAw3t7nMt2oNwxmisvv3l7puO6WjJ%2BAxs709I4%2BlzZNPGzZHHhwegO5K6bGl9wVygs8p%2BcbH1okGV3j1wp1rJe3x7Kq%2BcCCqJQuDCEVCt8nzYcIIRaS5ZMaDe923IVsSGjt3l6%2BwG8%2Fq%2FRI7fgpmL0Uq06VO%2BKY9Wu%2BlJ0WcTRP9kbSWq7PFNoNeHv202%2F1heq9N6IsZabdbCUHbTm8L4tLUgKGZF20u7xje9NiwmoY3iqLbmHdj2vtPhaH4HazG5BM7ZN8MRFiHp9RUs9nZ3Isxcrd6czZ8a1On2CUDyQBjV2rI6VQ3Te7SCAaxeYoMnZTTUV5p2D7ri7e5D7yd3GlQjRi%2BdIPQx7fPv9RD6FmHxHEcht0PAUsuFoY7W3WSyfrJcVV6Hv08o5vv0JXw1LuY%2BMtdkohI%2B1yJSUizeRnjEMfFyThUJqVPRUTpn%2FeN3TJQ7IyyxbHeSfiiiFbkTV0lPkGwhQqUm1awTo25jteYVaBQQyLwBeC4px85Vob21Rfy7G5ryP9DlsdNaJGi8r1%2FKhBBdamiFB%2B1aR5cPw6HlKujc5GAKo6VnKDF%2F5n9%2B0apsI7Hn17VeBA6bAjl%2Fym3exiFNymB64AK8N26JEEb5O47jmjcfZozavF4GIBeTqIfVaCRUlZ5nu0pcbjNgPHCjoFkUwpfimdglsQr69bly7u0iUzQWEZn2ptp0VtpAtUeBzU8V9OSt7WazgS%2FHN3OPPxF1XsJo1JVJT7XO2wYBmWDZywRkoY7kFTVhs%2Bx3MVowjNkyV4fmodVy3b15TdLvvCOpEi1AUupulETu0DYMJFy%2FSfQSPBeiDnwWt2RzBNPFCruswm8YhyA2W848wbju%2F11oMbSiLDkdLx02Vpj9Q%2FDMi48WyVAxQKb%2FAaPgVfThrN3OQbJXKvb3cXWTysoBokGBEyRkS9fe2M6KvSR1HiMzPZpXLCXAqLMtQ0ttyq5dE4YYoi6gUX4omUYWlvp7RfTqDBNEGWYnn9gbzsQydza29PMi5C%2Bh5169pTXNP3NaAGnh7eKPow%2ButIVp5mp0Qxv6tmXy2eVtV2LofVmsV8J1Nh5c%2FORdL%2BGGYgcKjxe6Br%2B3h7K8n5a%2Bm7ItRT82TDhE%2Fl8xDIskSB3Dypq8BEykkyia1ndeB7ZGH3SzUn7nVq7xjbU%2F8NZxj5tkMIgT1D3AT7IJMW%2BhjrwMgCdc1I%2FWKNd%2Bi0Lrur3LvSmFWIlM7zhKxRTepxcRp9bvHt0MZJVXX4WrNBaxE8LwfFT67i4bJbiQFETWtl%2BPmQRQc8EbTHBfFHjaaAQD9IS2dk8nqXFlTBpxmllSgUUwhP3jZvs7%2F4ME6Wr0OZ2o3t57c1d3hLkgX9GeaQgYu7pAECWzsxILHribbeNm6AvMNSyFr0oXThJjqiqqo0LiEiWnPb5s5rgenfc1Cj3StBOs1GVd1imjsWpvviWgSkPnHzDD5Q%2B3U4abWpcgV7nGjalOGVf3KZdQ7KGntrlqaXN6QcadU4FTO8YPAN4KNU8zXvGk%2FU0e3zpjngaHuzNsAIiGhC64jhogM9Hoc2YqkELdrM%2BCWPz9E3ghlISNB1xev9ZDbKIvohQbAp2mtpwpAEVKw9G1D7fkqoSLV390zyk%2FdqmrjQuNd2yvjyO3k2mD%2BTutE7uBvj1Nom8N4uM%2Fvhmj2BRXLo4vAUj9E0qvuAAyT78rQQIxywXYkr%2BVOYg8p9UvLdk0bbULR%2F48Ya7jGc443Ro0s6f9EZ3lCSWrksSuk%2B26RwFIBI7FRSaoJFsWxF5kaJ4k5o7TgoAo3s66yq3btIxs2YAIW%2BDOqMJeZinZyeKh8%2F1ofYHV%2FdFgqVmHlJPX75oNqI4gapgl8zvx1BPzbn0CT49MTUSt7ipvTk%2Bvr67%2FIt5GLlg%2FOv54AIvSnLHC%2BZBabIps9kWy7BHDC06HSCa4b4VbhwanBuoA9R2amxzk9sUlKv10RPu7rHl6Q6TitZEx4z24iZIvxXdY9XnAAifSifYTr3k%2BOTQbkDczIDp1PnxxHg2k26ar7UG1Hs68hvM14%2Fd2s9xr0G89VjeU%2BtDOrm8l3lrx1kaww7NPSpHw0K2jQw%2F9up%2FdtnPh3Db6v598l%2FAA%3D%3D%22%7D";case"__familyAchievements_bot_privateHandlers":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbHruy4Ef2auxxDOSxbObakVtZmoJxz1teb%2Fe4Y8MIGBEIsFg9PBRbrB2V%2FUOHqux8EOvJlrcfhB%2BV%2BEAT%2BFwRGIM2HdMzqofwVu47wF%2FVdQIUflP%2BBXj8o219F3eVAtRrX7VdNq9ucxX4BerC9qPPsdwWBEOIvCP0Lwh2I%2FkFfGA4GiP4XQZPRr35c5sP%2FgPk%2F7Lb4H2a%2F8%2B2e8t95lh91mv%2Bh%2BocnAn0%2FlM3quFziHkyGuP9H97Vv4x8FAYzmUh%2Fx9rVHioesA8f%2BQtf%2FWNABUin2199%2FF3Ffd%2Fcrrer8yHtAev07Gbe%2Fp9%2F9%2F70Z5UlvSlJ8xQQTg4cdmMQgL5NFzPLjaM%2BWvI%2F3W%2BzRIl1k%2Bb3Pr6BlFBT4QyhCoMozjFYu2%2FudgUGpoNXcEONpg6Glllcf5xKKqhRCXpXutuItj%2BbrTlPZ%2BERCc%2BKpeDIE%2FoiCb6EnE9BWbY%2F9Dk%2FOa27CtAvdTc1YN1xvqHLFqjFSNBre3X5dygVXdN6%2B4EswjL4uaBVD9cobxZ477g90ePyD4O%2FIi9417NX79G7K%2Fg1PraRfq3kyGn4A%2FoM0GL7U337jqRxq2KkALWY64UxfXWCZxO8%2BSTEk3QWbkLSRVvjniCJHqkgQAObFZ9cWt%2FOaNUOzSVGZrzwSKYtCfKJ3%2B1Sqf6KHqPelK4iBsc2WoAwfbTx4yd6JPba7njrSTrzZwAZoC2sPzaTPObqzdg1OZ5QhdZV7FcfyY0e4bWHb191uq0L06C%2FlHNrtRN0GJZ1PJoUIalBoefcQ2i%2F8wK6OfWcJvKthNXC9O6WYBzU8QzQSo8jiVE5NLs4xABS0YABjxa%2BIL4QQS0H%2BSaUFNdy98eFOrYLVtaN76BhfE2cnasUnNBsKy8qfhEZ7qQKLJluE7vXUrKPq66sB4XHUl4WN%2BbayXGSyJ8EVZR%2FqRU1p0EwYJVaBE%2Fm5oohQXQSQC06aNfZClo%2BfXrnG9rUOLFVRK18GRm0JY%2BzzV4adIOcYIbmZzKNvKGLgKtHZoiHLwZA7VVX2t8s95gfyXQ5abR4PKAFL2YuBdjWnUME5t3ZCXWHRAkJqohiAiZVvC4jyofInYnfIPGTN5947NlWnT4LUd%2FDsfPyevU66m%2FiccAlH9aenxANSYeIX3NenxE9icaXDq7qXcHwel7%2BdeIz7WIGJdvzmiap44hsrR7Sfd489qTw7Dv%2FlEvCcBsvLb%2FGgY%2FOZ02lLpNLHg20z6tvNzNrATyhX8Wopxyg4k0jPEfQJdSz%2BZLVceC8xE3tcRXocqHkCIlkLeUaup2J4iS71lmO3p2hdx8w4M4u1vdXDJCfdHrFJNwm2KqzsdtQ2ty5Xt%2B5fZ2Avj3CEDPwmrmxQLb17TOmvmtDOuhXVS6V%2BQCUW6rxIE4Ob5TVSb1GDbHmvJzn4%2BH1SGaP2TabEgJRMhpLMmz7stD3XXbRIpRmwq8RREbxy1fIrDxjQpB4agPInvI26leI5DEI6NXB7hI43oc7D6ba1phIuGTOW9U2KMMQxupWnNt0bXFfBVoZ2egFuKByPI%2FMjPBbjB4646TG1y4E%2BuoUqXOv1ERp0uzagno53IG5qcWENXm%2BmU8Nbw1%2B8NZHKEBhEkHXlx3%2FuOtfD1KdiQs%2F9IIovZdMXjuyH4xjEoASMraDPpjDJaNgy9CwZJLk4AXxnz7hodFT4hgb58VADWqFaRe1wmuhafRp8XaDNkXgvw4Wnqf3UAtVekEAlZs5By8%2FGNPG4MEBh6LaaHMqP5nv9gvgLrJOsm11ZANNccaBnl3Aoo4JoCfF8p2UNX6MCJvhn1ldWIHy7Sw8UCKZI1HSa98zmdRHQRzD7uBplvRKWWULzsI6zOSZGRxWTWs2VaqbneGbZbSHA3kuMyzi7KnmWvMuglDPO%2F8TqUuMkXssaFZUwG%2BpNHv1U%2FLwoZDnEXM6G5A0xVD4t7D0n%2B8RjhZ0VuT2NpEmbmpF%2BkQdtjV5oM0e0pme30hirN0sV7YVfd7gjJgSq55O9F5LtEKh7Ib29j9qCtbW0Gw8oV1lyE2qveHNJA52B87%2FGho1fILEiLqdowUPbmYn2lkA5ZYhyaAZKWrBWBK8pA3RvL2GHViIRmRYhN6ElI7h9EQ8ntxoi1RBTpFeHayU8yqCuJIM4%2Bxn7gVchZFOH3HLBs8uYtMqTW%2BQCuA3d1Yh3zqc8vpeeDyyDL%2Bk7rkrymgfms8bVGfU1%2BVDwS5UzSSExP9cGYBk1fO6AM4qLQ4vP7NEXeKDjz3ajZaNZ5UIQdnwdtroltkRIAJsdOah1XNDOIEJZaEdhftTmIPvJ1A3zPTlpO9kDqayd%2BqWINJkC9w0Nfqfj60A9%2FabFB8%2BjiJYocKmEZxvk43PshzXMhxk0OJC19SiZ3vdl2i16RZMVyTDS03zmeMz4IY2jJNE1rMwxt4ejnClrOEmj%2BKax5zx4bJ5oDKxKpJbqGohGjT%2Fti%2BCTqFchJS2Mb4njnEkVXzjIeMRmNiRgxxmWGac8hD8P4PRmb3965xbXMkbG3SOcAPRLXxtpw6xvEg3XN5RnG0wz4SzJZR14ABO1GQYVdS1NCL%2F7tQuf%2FmsjGWClICefakgtmtEsOU2yrA5j6LBNQhAEIqp0O9Mwn0DlZaOgGmk7jJ%2B62aGqNVinZcFrh1ESCJ7Q3mqgtQ%2FClFS%2BjLrW3GL8nVUBcBzDaT5kfU7YG%2BK0uHF3ofHASIx9X6QBUehhQSK3OCOP5C7IJKmJlgia6S%2B9uPXhG64pl5%2FVC0AzCFj%2Fpx%2F8TzcLRP80tH8k%2FwY%3D%22%7D";case"__familyAchievements_bot_adminPanel":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbHrqxIEv2au%2BwR3izxUJiCwrNpYRLvPXz9UO%2F2zGpGQoki40TmIQj3g3I%2FqHh27Q8C7WBeqqH%2FQfkfBIH%2FBT3rswv6dMiqvvjddh3xL%2BqrQMUfVPiBmB%2BU6868asEDLYdl%2FYVpVQM47PeA7jHPK5D9ahAIIf6C0L8g3IHoH5TB8GeB6H8RNBn94uMC9P%2FjmP%2FDbo3%2FYfYrr9cIfuUM7FUK%2FlD9wxOBvg%2FKZVVczHH3CH3c%2FYNltnX4AxCflcm6qn%2FeZtyD9vfU6h%2Fy7cMnxf76%2B%2B887qr2YtKyAjvoHr7L38mw%2Fh1%2FTf9rhwqkN64ZviCiicG9hOU9Y3Jvs6qPPIkXNNHiTN2eSyOrLpBrZoDN9kZN08liC03FwPdnXifyFVvUx7seHErMjzPYppep90NHpNxNy%2BgC1mwQFsYNPUpxPVlV%2FmSAmbnFNcOWt1fbw7VNtfPK1qYw2OJmGeKL7bW3gUanYnms22Gf1GgvQC6hv%2FmId6JAMIhSX4QIRSf5dlqfdLXMIO3gVAnEn99o94nph8sn5OGQnJIQi4JUujwKI5fjk%2BTfz5JxoFORmYGWfZCV0HSZisKTWWCx2cMp7SIJKj2XrYG1v2u4cV5046mnXJtU%2FCY1EDTpkDpQsMhjkcftBiKiJR1NWaOzGTENLtiCUNXH1ewlZUoR7bb8egQeajMYuDZE3KafvrnBbhhwCqsUjU6xR9vCiNsrzVW%2FfV1pV4YEsEXzEprJD4QxdIKSLB%2FyPjeSfkWjnw6BS4I0wEFBrr08Gml3ZmlPDuW5q5wze1UddB0OeXXuVyHGAQTPGofrj5ZOFXg4LaKueqI70%2BSMrtUfJytlXCgcx4jCi%2BbFXBxDNlFMv%2BIY6qYgzGooeUEv2U2q%2B6ral2V9IiuwBDxZU6QU3uo7CQunu6uVZXfIXiQeij363GrirZgqBst9wnpJqdy9MXIxTKRC%2FLDuVTyV9GbTtQb6zL3B72pf9EAHjL2HMzg0bC%2BlWtnTj8gGDx5guFaJdlVJwC%2BAQMtiYJtqq9lGcgbnMQgyQMZYS7Nwun05sRBieqxcyh%2BtA1Yve4vrzklpi9x5jNNUA%2Ff6qQxYXF1ACyvYJ8xCMmDPbt%2BytZ3Zqzx7%2BkynfF83bT4Psp4%2FDk%2BUpNOUzQYzZo%2FigVASpqO6N9EB6T1KZp6nkmJCgdZ842sPFIStd%2BRztCL9gYzMnKM0I5T67rtS0oP3LA4epO28JWQFXCqdMaeQ6Vr62jnFoXMeXGPLGeq8I3AYQnf8YiAnVGYkQYlyMHRMYWaeyXm2VdIEUEOIeHC03O%2Fgxmwf%2FsYMkjOaqoMGXUdJ8Lxd72bB8keRO6JpqEekmdg6zeZvEKkRC5ah94r1eF9OA%2B5RZm4vnMQW6VRhUWfZASwum6LyfuDmeaGl4XUar7Tx1W6ewcD2yZf9FiunIL%2BzK1WGaglpu9iUpbWi8DHCudcwMiM2Mi9sK5xPup%2FigjrHxx%2BLgtisl0q72CFSjSWe26hpO4U52odr1Cwt8jEBoaxEMxKXJNRzX8qFkwXbzQ%2BOqy7PBqumntC%2BMmrYMqcOXoGwyZU2eMJuHybChK6udWOSr2xibHLsLVJrkMB76hZLBm3qPDfTDSXtrYC%2FpvlkzBnEoEmuj9inQvaZYCZEVxyJ5gRbRq%2Bdo6FZ4yl2umKcE48rG0N9%2FuUMGjjjOSjX1pyEP%2Fv5HB8NhSjLeolkfNuVRqDxAeefg9DWRRQoTPX2WGeK4gjQytIhjJKDSuN03xLLwBdO8nI3xUDc2%2BVHOnm%2BuwwYy7zbTKqxaTAlaOzz4lUzFSEeCbSV9SGyBXREUEC3UmHCQuHk34z71rzUT8rTlDFMRiH56UVsgML258wbbnOoUWcKf0VND9nzw7IerRydwAruZ91HFerfbApPKMZFXquSsZNz95liwzj7oUeRCD4ey8h9Flev632THEfsm9BG9cNw%2BcD31YFNVXmbP4JtcnpiBfExKK1gHVs5LWLN4OFK6i7JCd8qds66zKiTLtYZ3Kh%2BGNIVsjMZY9%2FVZ0jqt2m%2FqeGWtQxlLS0oPYfWZePpkeIQq807S1CIOu78kbv8uN2gfPNNXjwtlt1MvK12a%2BPRybpwL7cnjytQexpke8Ewb%2BYn9UG93N4NhKX1BWKB17B%2Fih1Y5i1dpa5NNDeK%2BY4boRf5sYo6qsbDEUyhadiNGyvIlCgltjFIdg2%2Ben5Ar0QFyz4jCivp6Sw2PuVNu2yabwtaDNbKpXsMvtF8SyTRShjLetDJdILodBXXb%2FW3m8jpZ9zf1xhYC61gr%2F5jsrkSasACatKzT%2B3vvcky4uhwaJm%2FKYjRXcy473OgbDPFv31ZvbtN4kiH6NcXb6vV2MBYR8hJlXaHiL8%2F%2BZOerF7r%2B%2BMztoj8QCe%2B%2BVQwt5Cgq0FWFAIowGVsHtAA6O6GtMZlB6KzEGdQwzdYoQZxTRSXHjOHOq6dlp%2FWiFp7j1JaVhJfr54EafEQBgq66RpTtkyE09rr3dSPLo%2BuJTBzpMU%2F8A6i4hZIXlP3ofrWmsXkIe%2BqV4mmGrPsvqXEO9YeneCcvY4KuY73gXX1AaMApm1Wg0Ojp7Q%2FwxOr7EgE5%2Fu3gx4I2siczkTJ9U0Ha1BRL41tCW63VG9gN4CkEHbe62CzjP26BvPioRwbkC6tSpdNWyo14%2FFFxflKiDaSVihtPNRFwraBzYhinozdC%2BFajBJzivAZcxxla885s7Qx2%2BkwNPXf%2Bf34g32tVqf4%2Fa4T37DIO5PUK9m3LFhfbZl6UpzFqTpnBjsM8T0JovxlmsWV0Ezv57Ck4GnmkGH1JGSyP9hjeoGpJi4TD%2Ben6LPE00ybO8j6g1ToCZ712cSUmT%2FxZZ%2BhmUdhnJOMd24gA15ueZNP2n4w33ES%2FYbhf6bR%2F8zS3xz6Haf%2F7Pwb%22%7D";case"__familyAchievements_bot_keyboards":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbHzrQ6En2ab3lHNJklOefM5oqcM00DTz%2Fu%2F7sjzWJGQgbb5VPH5lS5fhD2BxGucfiBobPc9naefhDuB4Zf%2F4JAC0bLKZ%2BLdqp%2Fh31P%2BIv8TiDCD8L%2FQPQPwo5X1Q4lMG3m%2Ffg109q%2BZNFfgBEsr9qy%2BJ2BIRj%2FC0L%2BgjAPon4QGsVAA1H%2Fwiky%2BbVP63L6HzD%2Fh92R%2FsPst3%2FcS%2FnbL8qzzcs%2FVP%2FwhKHvg7BFm9ZbOoLOlI7%2F2NLvY%2F5jIIBWLe9sTrdi%2F0Vs%2FyE%2BAC45%2Btfff1fp2A43nTdteZYj4Lr%2Fnc3H3%2F1%2FL0N4IjiOHNtR3kJfngmOjHnTFgteZth9Iil7Z2mUFgogyNx9V8P3Rpc2JxknRWW5yzfy6S1G2fcH4XEqHKpw%2F8pQEt6D%2Bu0Ld6lEDVHGRQs1u%2BzteGgSuT02LSAscAqb52KcIM7K2tg4Mcx5CUogfghxEclrqD9CU0DhXYoa%2F1JCw5lN%2FYzPHYfjSaBe7qvsr6yRd%2BcChyTMURevBkL7aQp6y2YfeXZk8jMuMcUGmZ63Fcb0xZ5hXK6T7zLMrgIYIiXXaVKbaEXr1ijTZuN7cIjBbJIUkcCed8SMjW4qbvSlzehaQ30mFGIjmcSrfZ8UQLDr4drzvCEomMFnEVYVJSvUa5Po%2BEiYI19cVFIe9K1HiS7qaRYpzAWA59EBi137fUHjFen0gUWCbBW7klUY1%2FVvfqcHC%2Fd73BVKz94FRoTeKl%2FOAVjFL6ktdydLpeK4i9aRjlQcVtN6bdzHZcSLUq%2BXEVJgfwyM0lk6zE41xj3oPhYWVO9Vb00y0Xj3GDvRzBAZWTwf4G4zcSEIA%2FYtKNxs5tVqLfCkTC6WCAqz013xbgSpGnONJ2XWhiS3wQwvbAGwl4m7YSXqO1WBhoQpklU5aXklYU%2FXvrKdFzvcxL25qKXQmxSDWW1bxyZgWmB2UEh2bqdyYB8myvqXzen53TdrOHxs7w3%2B9sig7cnOuqRijw28sQ3uTJ32FqLqq1SqRsCryA3RqVDOlTaIRGekVtq1RTUGyI5lJaKW5j4larMDPkfZbGoHGbICYcrFO%2BatDBHIEm%2BfNNh9eOiHvJOz97Kvs7zfblo9Oo5JsUvU8%2BE23DEujyFVTcuEWG4MsbsURvbklPLWdOlCypAdPPVeuiE6I47d0HtM3L25A0W%2BW%2BrzVqW%2BaZ1a4ackGe%2BiD66SyCcXFuQlkyDOZpJyXbschEsaLaUpmTxb4zYbFDwL0b6QxLW1rZj6JkmdTfFw05o0x4K1cmVuCJhI4s9ef1tFGosBpScYFkO57nYgtzD9BSucq5qSFZBJIqHPpKVOb42t8C4Ex8sPS6bRI3MGsed5bCEYpqUWmTF3XBpPFnjqelfQAZAr05fLoRu7JLJY61dA8KjVtRBSi7SduAKneRh7CdU0zx%2BPDOMFt3Ymo9ZmKSL2YU8%2BVD6ziGBoc3G5Nof3Old8V2tDrNjoi6YDpcWQ2jHCO%2Bco%2BbGaBX0GYv%2FgTGi6cu4hc0xiIVXikVRW0cuUfOPp5zxB%2FJkAghQGyFd7b7U%2FexH4wnBrPg1dTpHQC1uT0FGiA%2BvlCyFpRuaEH4WWmEWigwc5SJsqUVnJ9dLEMQ2XGOrpmmZncmRdpLAtFUMNGvabKD9OX5oQQ2XAXSa9oAvLNvdxLXExsRgbtXejw%2F3YrZeimBVPp7OSTt2Yf8Oj%2B4qYsbumvJ97IHtLJ5%2BytmIw13y4QsQyCPWF5RlRc%2FMonRJgh9s%2FKt%2Fds6IZwlJ0UILLHu7GqGPsAtuZjc9Xx56EPIob2x4trLtjVsGXq5eQz%2FzClNMvgsxKmHfBd30EZ0jPvN5SGX%2BAzxzBSNyi8PA5xELODqo5rumWAUlH9kqKGF2g9GL6JF61yrwhxxRn8yP3EWRowWVByuDZaLKFLe81fj2OMvjaK83dLZniEIFDx64q0ohf4qjqJlZH1CV2s1Oe84yshiGmBf4hgNILEJPwdd8e3MziKPXu02O%2B7E68j%2BLYFH2zscBNgy1BIGfmRJVljwrnhAcuBzms0uDlU8%2FxCZ9Mn3kv955JUivMIKWG9iqrRoMXDyB0XM7FTNrEvulEiscCW5%2BoT1l%2BTAbB2yN0hYRBkp6Rdv29Muxn4SU5KJqQDT%2FZ56yP0FBq6Npm0dHSa2cTvQRIITROdSi2u%2BPfCnpqb%2Fqx5Cz%2FZg9YFjjV9TQ645pnusOdeIQXSLbMWiSvGiH2FT3xC%2B82kPO27d2q4HdIiiZRo1T61n6sQksdDvwekoLp783%2FZtcyvlMNQLTx8%2FRDlVpQJrh72fKHrxokoa7o2q5XaBerEUXBo61DUznn5qgZVcAHKB%2BYkzLXAhefRJLs4yWkSeGEjY3Cxxzg6g3uGEa8A8ganTVI51PvhnQu7EKI1giBYbG0qipDYWPqUMpT5Ze7DX7FXTgehCTplR3y1VT60Av2PYCKTesFfBDqWFVdJx0fcZJHzX0gHGUlTrHXOVa7W9n9fVzb44TMhKpAxhiIBlGqxnoBsHbjTvBytJCqjuiCqeKx107FkNDNhvMojGVKdeRugJSSYrDT0vtefpmHYd8LgoJyMpewb8yCx8o5pPbgEMkdhoi4PkE6iSAT8S7q1ILFCOhTXYcCQTcJ23yIQO%2FqXqd6J0FZwUPjKSGyyaxiZn3CqSafehEG%2BktRJMVt%2FtQ%2Boegg%2BRGadBDfJPHuAXMm5jVqH83p8rOTYqgtZdPHGqpXapVLyTWCKZD%2BJzi%2BIZeyakVtH%2BblfiuEtpCFuF7lb8GEE1EcmrrQsAW9HnKviCuVGkAxTEcWcOi2GAhBdi3SXlfUNXxh283XelAxRpX0Ul5G11c1kQpN8KA%2F%2ByugUlDXCX5o4gOCIcR6g2nsystK2d6VsgRSukuLXyFK%2BK0JsH4rCES8vuVLRUxY4MsoguwD9IBJlAE16%2Fc6%2F6ds%2FU%2FR%2Fb1tf%2BvuPyP%2FBg%3D%3D%22%7D";case"__familyAchievements_api_restEndpoints":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbHruPKEf2auxyDOSyZKYo5k5sHijnn%2BPVuzYwXBmxAaKpCH56qri7WD8r9oOLVdz8IdOTLWo%2FDD8r%2FIAj8LwisQJsP6ZjVQ%2FlH7bniL%2BprQMUfVPiBmB%2BU66%2Bi7nLgWo3r9sdNrducw%2F4A9GB7UefZHwsCIcQvCP0F4S5E%2F6AMhoMFov9F0FT8xz8p8%2BF%2FwPwfdlvyl9kfebun%2FI%2Bc5Ued5r%2Bp%2FuaJQN8fymV1Ui5JD4Qh6f%2F6Mvs2%2FnYQwWoLjgsewpBNYz1s6x%2Fg%2Bi%2F%2FDlBKsV%2F%2F%2FFMkfd3dTFrV%2BZH3gPL6TzLV%2Fyz5uv3XVlQg%2FemT4ismmhjsKj8Im2oBW%2BO0jEE7rAFwFkKQnERux%2BAb3WOock4RE4VNLw1bjVdiXp8yslgcK2nds5gI%2FeooTYnTsNxuiSSbOYVoTKnyg%2Bd2OxVagChYS1mmBsT0wXssjzPYET%2BfLc9A4rvfZO2dUOTVG1em5eLgTHJ0vkoHxJ9RLWLKWYjGkkaP%2FFIZNk2D5LEB3O10jfApttBW16P6fZBdZ49TzcmBQfSIYoSoWFn7YcjeSX5ImcIEHCAG%2FIklo6FdY7O8kHRzl1yTb%2FIBmMuGdjK1oPkuJYRZTQqnYoeHLdBRFRINbwE4EXbNnJCH5M4yETXa0wahovAbIfa0IcTROOfZl29tQOM8W%2Fn0%2BKQdi0CYkD4Dnf%2BGUFQ%2FHJZzazPiPhHQqTN%2BxJJuT81h3NUESf0uzUkzjYk2W%2BlBMG6nWkRAjaqHWQcIoXQMcqQNbMvsvUH9eT4aq4ScJNALg0jKaoD0yNGhymRSQWH9p19FJ12bTRbiDGwnM4HAGg%2F847kF6eIgFiEyDN%2B2xzMsjzqNMT34LTGitcpKGUjA0e7EgBw0rp%2FwNY3tpvnEzM2EpJAzHXYeOs1ESIRz58IS%2FDW2rwgXNrYupLDwg%2BcJBebpMrX%2FZPyo%2BMSLBUE%2FkGdPMmnZ6pSrmPMwfi5XZxR5Kqhq8d16%2B40RTakDQSARM5VjDorCybjLbR1eVRWXN5O8a4AUkVlflrvI2lb4sVSK8Fd%2BjDRgOVELK5dYyDZeobtHyQfcOfH37byCYQ5hSNgpU3FiGw%2FWZFLOYFvQVeU%2Bjsp3zeaY7cl8K1BKHS9k0754tmK5IuS2yBfvOeeTSswLpFYrLW%2BDO%2Bd7XUOoy6HtkF%2B63oySGjvQ%2BEljP4b629U5DTZghpkQjYM%2BW5Os256tQqDPt%2BUel20f6sELAS1BUhvWM3vOwdQ2Ka%2BeXYJPABxjfRffRgdXEDZuZ2%2FQsOvN13zCxdQUrUJozJIFcZ8GXko1Q0r0TDeqk2Sm3N%2B5jz5Wr6WI%2FrTarjS6fHEPYwfdNpr4tzC%2FJewVEuOoDdPJC%2Fv%2B5g8mQ%2FC4VRm8fTY0tn3pyM7XhMG1z9s50e91lBhBHNzScJtVH6HuhK2jB00ibzjQWsRlyCosQj4zVAJpgr0aEcjF9ueRK0LHmc3ArTVI480oeO98Mm1%2B7qmJmj290PE90TGfW42riuLuWDMP3kMQJT97C4dWx%2FdNk7xsIxqOzmsnYxkamrCZ0xbbzR5sqH4ccR9e6vJuacJZ8SF%2FkNacHg8Pv%2BE4BUy9Th%2B0Ke6qLm2XR%2BJoY3IorCf5Elfh2mU9c2qNHKIn%2Bp3QenuDbJSZ6jPcybV%2Bdt8V8MQ%2FabeJRJURQLDmLI%2FDBvKYVmERSwhcP1f7dockfrCQ73vzix%2BUUkIwQpzOJ%2FB8GIC6RCJdHwHYW9%2BFbjgqew981kRJXaSUpdd3SE1I%2FEa7BL5MoVq5XcPJ901YH1bEMJUOX8DZeH0e6O5qVjN0FSJdcG6TYfeBuG7lELYftKuRvKXi29%2Bomfbgl%2BspEOWXvtpo5SMWnjTj4c2u%2Bz5X3peL7U9l%2Bnkz8wrxLeVTn4kix1BMoeEq7nGadF9pz7WOUMfWlmMMohjdWwyXAlgjCvZ1iZJ42echyHlZ2fmLsWe1urE%2BQGSXmiBFNZSrhJDEb44JZntY6Zuw%2FvaGZO66MHLQbF2lWngekp8QODZOYFK647HJruiZNqglWRd62VvvAnahk%2Fi0ZSvd%2BnDsBMEBX%2BpqPXdPZkQI%2BqeN2tkRiVy99qNAW%2FKJhV0d8Tv0tfROnKZon11iB5MvixeeHQuX5QUOY6AQw2iHUBL0Yhhdhtu2ALI94uxZL%2FjZxHxpDANQSaxmEfaEm11DK7c5vTK4emUo9XwbWNp00eUwVeNS3iBNS3xMAaO6ocpx0zqzqWl%2Fs02T1fqCwcUTi0jnx6KnSHna6esjvpHsmNtY7ez0Ie5Q68oiTO8XGat65mzBg3QXg%2B1Vl0xoejmQ%2FTSZ0j3Q9hHc%2B2BQGylASbP4wzTrsLK0H1qRO5FjGkafYifJ9Yh3M5%2BIOaxDBQnkjh58R8FlR5vQWr8bK%2FgOCdQeh1U%2FNklpjg3HHc%2FGtYzChi5DfD9KlxmLk7wXuo2Mnn1vr%2FwCu2DQV0RYW5W2AVkS9drsDdaHLiULkNuts4qXyHOhjaXEtY9cOYXDuwV0Owh07YtpXtdJv1Zo7HQDpnHdOAoAUuWKMr37yxm5lZgaoDlfn6y%2FRr4HlwQhn9dGSaEarw9Juh%2FykTYaMBFDCrnASCf6okAFdE0f9Zx%2FD%2B40EpbEdYiiP%2FIpSTVCfScrMIeC3v93NvvPZAlUf4fL35p%2FAw%3D%3D%22%7D";case"__familyAchievements_api_achievementService":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVfXrrW4kn6afdlHLDKX5JwzNy1yWOQMTz%2Fw727NuZiRDJLL5arPrugfiP6BuLNrf0Bgz%2BelHvofiPkBwc9%2FgOf%2FUPM%2BHbK6L3%2FJrsP9hb8LEPcDsT8A%2BQPR3VnUbf6wVsOy%2FrIp9Ten4V8B3bO9qPPsdwUEQPQvAPoLQByA%2BIFIGHl%2BAPEflCCiX%2F64zPv%2FQ8z%2Fg26N%2F0H2O1%2BvMf%2BdZ%2Flep%2FkfqH9wgsA7IDqr43KOu2fSx90%2FvOS2Dn8YuOdPplWd73n3ogABO5%2F%2FlQMC9T%2BHaB9cKfzX338XcVe313%2FtWP6Ox%2Frv%2BH8J%2F7UfYjFrnVNUBXEtPRIHh8MPej5KLQGPmfVO4h%2BQCggjkERYVz8mXZeSDu8YPA92UTb6wxkHMk7cxKdcvGl9BmEvwtniwf25%2FYlZX1mcnusaABZC8MzaXENwfXB7EjnRUj662MwuLadfWeKXc2Uxs8MhoTG%2B1XhCikzV8ccQjm0gnLodjWRjjX3M8CdWZQ4KotNJADhCBCuMlecrqvoHMWMHsaliG1SjaG9SUjTLJjJI5rPE29SjCHOPpsKC9c%2F1cug1ziYBXqBVb2l7j90yWjdniCiUF8%2BWMxw7Q34umZIrc%2BtARHctFjSicIj2bYfxTKdWo97Msp%2BLUF4poq6UQLF2O0P2yUTmnCdG2i1P95MAR5E%2BdqeSL2kX1H08iDgo0v37NDP%2FoY%2BwmKtAJfmHN5opLWAsZSPJw9SjAgoUtDTA3AerNjzQ9h2ceMNGlnkCQ26uV%2Bdhe0EmYr9HCkDwwbJpRVZiRr5StFxFSFe%2F5nwGt8M2yCob%2B2zRnPKhDEWGAee6%2B52eNXUwzO9KGaDp95vNNIg9U52RiVoogDyTTQPoIj1AgQHyZfToSVBGAIwNt%2FBaWJMV5Dq3AvNj2B7T0a2bYD353aLm0eO0mkPSE9selB4LxzqcdNn7TkftNhxTZVyFa%2F2L0cgaAFGI2JS6DyRR6IWFdZ%2FQFdKbo7ZCICk9mAwC2Il%2BAeXjyjGOo%2FDK2DfX9Sqvr5NXyB5qn533twOMqwXWs96jdIAE2EFRs0RYum%2BZw9IlCQucAIiWMgPCVqEPpUdAf7GYD%2BoWX2HtGqu77ZneE75Kh%2BJo37kXA%2BmpFzdk17AAzYnHN9kfN3AdykMPOaKRoh9fV7TBNjE3V4ARD0cmtL59jOowpm2aQp0T9%2BhHsGSgh1EymhNBKRYe8xnatIeiqM3GOKa3HxFNi7QfQheSOQfBtN%2FwvoN0lXUyqPmCJoGoiYWp%2BshXrxJP3qQof5m5I0mRpnxMzknzcLQyLFMWpyn1AXSFE4wtCvddYLbmmvmzEJuNzRdNfbBV3tntRo%2F8YqkYtbpj0207NpytHDnUZ%2BVI9SJK0byoXrKN3tbFr7uSLVSq6Z2U9OvQ7fhhqKAwla61ykhdQTRMpBYk3kOFuuWUBxSHWE0y9MQV8iT1jWSRs0hw1pex2kueGybQpgRsGX3Oa7aQ8upSpIw7v6R7c5JrHnAQ%2BV%2BYmTc0NdM2pqj5pnI8RsZL2CsJB02e7hQbYBtSft0AuYWIindlqKZDHfk3knePI06tyiTr%2BbwqG6MiFZ6cSLXwtBqnCxqa%2B6U9NxGUJ5%2FyUeoL0dcqvNqyzQ%2B8ATB39VBzitGgHRc04%2BDh29PNlFcFKHsuyUjo2XMq6Usq3lPtvYFJDpDtAtMSgeQOyie1XmYsCk1pRdgtp7I2e5gW3k0eD970QfaIP4emoAALteJugFqaFDilL%2BkUmBhPfORdyfUmtBW6ve1sx9n%2B2OcswfLH%2BT70fF96xkIXjeniBvuCEW3uKc2hyGX53W2htw7wa%2BcK1UY5MdknzEetcQvCaO%2BwwEU%2BFVeIvcrQlDGwIfhzLCj9PQno4uQGg7hLVjlV7ZIleUvUSjp20hTSrm%2Fok8Y4GaqFSPMjUlH1psGBQPWeGvhUAhFvzTe%2B8dGlBkgAUQNCdboLgjvlpCPMW26qWWI7npA7EQmeHtYIYXxn52P7A5yXJqkppyKd39dbwCRKAKUPyywZhCsdWaMlHksUHwM7a2qoLE14dHZZYXULAm9RmOBPRHJPTacwIoKI%2B00zQRx6UnK%2BOdBxcIgonsxHAXDrmn4N8rZZcwUJKSLDzU1YWv5EgAYD3YmuiLGam1GaaEMcEkGx%2B6fZrn44mvokwnzQaCGrnUR5IJlbEus6nhBvetNdOd4aExdQrY6mrvxbEIcXFXyLJ15zazBcXp1oH1aZ5jDqhl19EOcypzdZbkAK8wUfPEZFJwF8EXlERqHpe1JVZzCj3hb3Gl4Rl1lj6LZmHI0G2AOghAlWtXidByzJ8INZUYyzAMnIHr0O0oWWydUX9DgTt3yZFdEzn2sPBr7dY2%2BjC30N7KfVnuavPXKohDcUlmezIAImm9CrNYPuvVTR83MYcqQEcmQG4pPFmPHbyhIqCa45kZwGEmtUg0RBS8L%2Bgrz804%2FOAK6dp%2Bh5aiOlt%2BlTJ%2BFRlaSzDI4eLxZ8IKOkf3qYLtdFFLhazG%2BGYC8L2fSsFiZqJAA5TwY4ujyp90Zk763n1JabxpSiu1wE%2FfcjGu6bE60QsSLUXPg4ulkL1ASENyD54R%2FQA%2FMNfMk3yTDHrQ5jPYOV7KSJC4bzKYOpHU8c6%2BFsQMb97RkegQLROGBf2Mh7cyRG7YxTU1ponPIJdRx71VjZWJ2rVAlp%2BnuB4i3x1lFZnYkcMciq923juYu0KJruqgxmLuE0mQY9CqT443rKr6L1dl43zUmf6oOaU6%2F9dHv8yPYP06v4MQeTIJ%2FJA46aAnpHRi3Ns4wE1bp6S8jmz3jTm98YoC1hZOjTbckUL9CzOZIIa0eh3ISPbdDxjt3612d6O00uUdVVz4iaTpJZJv1IxFh2Y0J%2FfA%2BwTQVMJosTucjlEfw02rvl9M7K843q571CASHVQi0liZnXceVEsKPcV0aRgDcWCRZ7akTsT%2Bkbb9HcSRDYhGs8vN2GKCu1OkAhckDHuqwjvjCENj16rffmg6fZpViRAhSTN5%2FuPllnVBbWgGhwau2AhjqLYvSGmQ0gJxWZQn0cgUIzFKFT%2B6Yj50OdLqq3XLP5b43KFy5xcbQOF5uKYOF8%2BorLaOh8xb1CtODnTSA55WOY43DEYFpYmG2bYa0mkBGa3Eg5DDEmgdf9XRrevkutrqY1D6IlmWRrchYWkJUU8DdevoWrNJWBIu0ePUXm1BplnCDi2eQZO%2BEAM4aYxmL7rSNw4%2FLmRiUgoI%2FLGCjMU19VE2jg7cagryYYi870jF7wS39WS6EV87wf5PsAgN5D%2FfuO%2BPcV9Ga%2F34fQH8r%2FAA%3D%3D%22%7D";case"__familyAchievements_api_claimService":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbHrus4Ev2au%2ByBgiVLS2VZOadNQznn7K8f6t0eYBYzgEGIlXjKLJ6qH5T5Qfmr734Q6MiXtR6HH5T9QRD4XxBYgTQf0jGrh%2FJX7Dr8X8SjQPkflPuBqB%2BU6a%2Bi7nJgWo3r9mum1G3OvH4D9MC9qPPsV4NACP4XhP4FYQ5E%2FqDUCwMLRP4LJ8no1z4u8%2BF%2FhPk%2F6Lb4H2S%2F%2B%2B2e8t99lh91mv%2BB%2BgcnAj0%2FlMnquFziHmyGuP%2FHltq38Y8BD1ami%2BtHbefLfyIgUP0P%2FA4gSl9%2F%2Ff13Efd1d1NpVedH3gPE69%2FxVP%2BdPs7%2F5Ylyb28qWmxFOIOAHG0U0Rd1GsdqrRoMSf3goIy3DT3WtgLaUbxIZWj4g9CFlzFcpZTkJEn6MTS7ten%2BjLSwv6Dbe02bCoAdLpiYAx0r1slq2UFxQBK0eoih0y%2FlZjhNAzPKLk81KuFniZKUblmqh4xMPylpLKzxXU0urPq8YE4KP%2B7yEo4EgkRRT8avDo045mUHFDIZmAQh4eG8hF0Hx05fc8jeW6Ki%2FttsdC9RidqBxblYIZvFZCLVxAxHCmCJvML5xHT8DoleU9UZWyY3x5qX4YtfMhAPlY7ODEuZDkphOZ61urKpYSCvE%2Fjm29epttvVdaFpUBY2tRXN7VgEYiWc4os5Rl5%2BUdM87TIaqbkaG6gkgYujp9y5uiaqJxCFNVUq5QPtQzmrlKRhNCndiE7iXBbq9rnbfa6q663BvjU2fRP1wlDpfju7b9OAZ1mHe9ICEXWkS9G9ifZctmWfXxIHJ2f0pRZmV05Bx6bwHLyLQ0%2BFmjzVBKr7jn0roQGNkwncfaLPABbxXfEWvSGD5kDUDSNNRe6%2B5Ntx%2BYEKcJ%2F0tsuieJkz1WpaPe7ONjP9dp9f1k617arcgHCAldPxYcn0Lg%2FRui8G0mixdbMjH2bDvsFAXbIU0BdUbCyasVtsfnT4rPgM0k4%2BhTmH1Sc7OJqUCkAoeIP2rdvBlwzdeSLy%2BoqpYZ8L9mm%2FrYXkFd1IF6WaUq3GZmBmqL53WYdJC%2FENiVfpYrMg4ZS4tz7QHv5Et9xAE0uCmuzgJTMLt2%2Bg4J0lb4QptPlQEaiZvCx3bnBdQSVZfTOj6u2doDJMUH2OnFXiaWcGqBZ9qQb%2FmpEY%2BLTIcO0BIqC%2Fk9t0Cgz3K9iwxi0aLLvbR7zMMpTEVENYDsE50otqehnpX%2BOwI8yaCgivPoURcOaNw0%2BNINWcHzOzNnkmJ9koUypJOR9H2GykSspsxoIe7TDLrxPxTNS2uTNi27%2B2vtB5KjcRuamlCW15AgDuZiXF9iBoM8IvfrdQKNBujC7SjVfSNhzVb0TU0onup2J53Y0cwjS5cSVzmSYvYBTdbu9uL21RYE8r4khOWkyRczeYklON5RSGoINx75M5nVoua1KmZEuzT9CSfU%2Beemye9n3Jrim5KtZqKoSlF%2F6iXHHz8nWqkTWjriiBqOP24fQayP01jnVV0PECtYAU6f4V0dLRAbzEh193PR%2FH5fZ04bZO6JV07RpRXwFweCMYHgfsP9HNyv6ueMTUU7NL0V7MlPLeUHg1HKTHzatIzTjDeRiVdih2saqNIWbXIV%2FV88bK5vKG80%2FN4wmkuw2zhgrVLpQEuLtikDLfza5Kj5msiI7hivYz1T6DQ4p7p56SWx8BQfO3r2qnRK9UQVP1Fwj6ZY4xsq9EDr0%2B2%2F0h6zbp6S1UYQrh9s2XuJBYR9XlJZZBNSmZl%2FybVBe3BU9J7RY8LvE9NL788XDd40kQck61YYZOKZqNyYkgiSbPTzAMGh9HMhrwSImldUuqcYJQDdxlpIp3Ra0XpklvcsQY4mY%2FvLFPU3VsmkKknJ9WXUWIkRBY2%2B1EIA%2Ba6gGb0u91gd6aWN%2FJk4p8%2BHtXQ%2FbBn7Jt9SaLsu2TsylhOe4UhCnmr0%2BSql41oSLwFozjWdMd9ciClCA87zCk4%2FGigsKhQeyjI%2B7bXfs8bVsFG9qYCTFZ%2BmqbQae7f%2FsHiRE%2BU7zL4Fo%2BdCbEwuTBlWEQAAxNRmUsu0644DutVc9BjZnz%2BBFITWdjABUEUyP6vNFx%2B14FYyV%2BBcF6%2F97bzn73WLf7fGSa0tzWKHMl9%2BRylUVpo2LAGLKzXDnnfcjd%2BPelK6VlK3JM7JCc5jFPXzTJrtbbtdZ4ZOyS3KlTjU11kr4fq0CCGo%2Fz8jv7D0HI4XxvjMiK6%2BV1fL7gMb1dl9%2FRs3K1E4u8SFfY0K%2FkBg%2FRRZoVhVYmOJ7voJH0p%2BXzwSeWm%2BHbxvJQ%2BGejgwKGETnlyJWGo4%2BSBCNsIw9Bp9OoBjFijLAQjV9P7bMFvLY9a3N%2FXyJD96JKsIOhT5QRG4kgjJLVDrA5eT9Ph0%2B70QmNbxOwQoNX8ya6JG4DHuYj6CqiBYVob5ielPAC1n0NfIBGSIeDcvaSSVyLLLdA1o13e%2Bop0MQv5szGNKKKMqgmctDPKbcpDP1sNB%2FRczp7pa4owMXKsA9KIjB5Ychrs9Bdtuov%2BQL3OnR84XajVRmy9IbqA0wQfCJAhOqIqS27xVQfkyMEJZgouIwZNDQZPPf8jPsga6Y8BbM7CGmyfAQdY6bD84mwHUCI9Xz6mSdlwamE2SVSx3orKmujKtQ9%2Bfa%2BXT4DQgeaKA%2FGvw2%2FgT121DiRKX86IRVdnWVN97NrXqD2eOrmq1shqcR7QfVdkljDsa5lWmbA2fpm9MqGEwwSrOB8Oqf9GVOvSzkOTL7oUiqf6g2J3M3IOk1JNU3QgIrLwHgojf9TBXTPJ7NdvtphKtdS%2BEzf9E04dF4Rzzhiktb2huy2fCjDo%2Ff%2BaeyXKUWSAtfY6TmHLcik8BvJ%2B86fqd1lziCbuAjnDxtip9bwwtMlkTcYoOkVvcPBKOoUxUxsTZy8BK4HgWhFbn4M4bneSXK%2BjU0CHz5zn8BgVgef%2F8yv%2F5m%2BH%2F77HcD%2FSP4N%22%7D";case"__familyAchievements_api_adminService":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVbH0qRIDn6a%2FzgTeHPEe%2B8KLhN47ync0y9090TsYTeiKiElpfQhKSX9wMwPzJ999wMBe76s9Tj8wOwPBIF%2FA8%2F6UPMhHbN6KH%2BTPZf%2Fi3gZMP8Dcz8A9QMz%2FVnUXf6IVuO6%2FRZT6zZnkN8K%2Bud4UefZbw4EQNhfAPwXgLoA%2BQNTCPosAPk3RpLRb%2Fm4zIf%2Foeb%2FoNviP8h%2B77dryn%2Fvs3yv0%2FwX1F84IeD9wUxWx%2BUS989miPs%2FstR3G38J8M9KZX09PE8nX%2F7VAAH1H%2FjdgyhF%2FvrnnyLu6%2B6i0qrO97x%2FEK%2F%2FxFP9T%2Fwe%2Fq%2BTMIf7y9KiK8SZ5NKrVlFoJjsYkIlwhdvHtp6i%2BWOY%2FlhNiVz%2Bg5O2qH0xbxBOO5JyUqPJZPkgTW06Qyfe%2FXjP4e8tGxpDGDvojxsMyh564Pu05oPAVo8CE%2FeyXJQZLTWkeJOgSSLcpKxEnCuvnsfbrxoLW2X1TdZGp%2BYGU4jEzhHP9YLFDwA%2BAfQzz8L0ghkzlZlm9x4i0ceJ5n%2BfN2rodyRtoWPxn138jSDQLHO7XCMdq0EVi2WGmXJdYPs9eQQQHbWD7l671VBK9B5YPXNuSMns82GSRXefblh4KvIRzozRgXyqw%2BV7nc5NRIh7SmQCfJlE9KYQv7TUzBjIjQQVL2GZuAc9tj677ICVxx8wn8CiGMgGPnBX0e4HcoHT4w1usfdZMMRbli2ylGPAnyxvyb%2Br6FMQr56tnH%2FYDwKw%2FcRMhc64%2Fm0QAXBwIFiZOTsldUMW0TioMQDF4AlsuVNLDh%2BF815YCy3qE4NE6jWtif%2BkDb3Dt0CTOpAtA%2FftPg%2BloEwAl0vsQ2AHiUeVePYVKuhFJ13rIY9NsHndpZdaYoynBxNTFUo2TUWONj3x6Ccd7xgxjJOP0n%2FlhhTioKU6TlJDIQfEs7AYXTDSQeGi8%2FJc7VLoD3ukn52EfVZfU9vgb5aPIRxh6piLyN6bTOg0OKkcIbwPACjhg9DU57L82iI8GHpW2UH9wjY%2FhPIm5i3aiErbQWoUG1bWMQUpnqKlBY4M4zljNkaL6yjCj2hXs6OikWEAZ0caKbDHLdxLR5stZ4Vv7ID2JUg9CaE5YZTA%2BU1D7GaqDyUhoXHYkpFvYDL1Sg8wYmCATv7ZUVvsNnk%2B1A4F9k7lz2HrXRMSTYrF0m%2BCfx1giWl81wbxTSf8nCqLNJctJpxCTQ1UC256gEzaps5gPRRUZw%2FW7droxvx0oz1qqIWCkSBZjfm5QtXbV4hukv36Zs%2BE6GoNhI7POYX%2BgXPptISBAEhCvPGFyRMKlrZ04n9lqJODakDjraIMmG03Ku7mk79Xw1lckX%2FKAP%2BpOgFAZzZxZAqty3L2LmqQXVj1mXbm%2BJK5T%2Bzxk7NR6eN5PrfqgbJcYzgtvNyCe86mkcs%2FhMS2XqkJootBwiOWGjOf9qOwU04dMRbGTEqfqOycazyF28HmWOuSt2yO%2BdTah5D6WNBI7cMrHMfji251FHxBfKhqYUxI6i4Izhur5Qq%2BDGBZEpwEZRXTLgcbFiEsupR5IUGBfEDNRHDflVbZymiVnT9a8fLUbvraalCpKl%2BvaKwtTbI%2BT7v1xlttrkVu1Hl0Zod5cHOQRn948HkzWqTfPVbNR3URIgXXjFJpRj9LY%2FOyoC4Igy1ErMFtVx4v828rNds5sPRj6wgk%2FZDpkSpoqr6hfpkVNJsfRk98Ht%2FQ8RrM4JMRdCiA413ogD1HYRDeOGVJreoI1DdO2Dml8PUu6GAUpw%2BFQd2ZLiH%2FtAaar5sX3xDdjj2mwRNh%2FaHeUiIsEmyYRsqBs6p%2B0Ky0Q7YiJTuEjhtjqsQltZmxT5w5z9ENfYSsbR3DKoGEFl09Eq7%2FiNCBUKtajIFMrg7M2M294zMknFMPA4KPgUD6WMYg5IQau7eYm12RN9gizCsvB6BM2ZP0XflQcfZUe%2F7bvHesLJcOLD6klxniZMfjJCaEwaZE7ujE3udW1%2BJn206ZljaMi9MfI%2BomZO4O6ALJHXo955YgmwplI5glwwd%2Bb5oMieQroPGKvnabm7tecqyAWMWLD6C3nD22Z6zy9Pue%2BW%2BeHK1qWtogj9GwHCdAWEkVFjh2B3J7m5TWsZytLAodOyddCQZNx2a%2F6CzVYQEN0uOVqGFvtohO88dTdvj6QlP7G6%2FFyKbTobydpmGHlgGrxl8ftAF6ueL7%2BfW0B%2Bdb5xkrKjBi%2Bc4qplHEF448EUCDEGUTUtjV07uKRLZA%2Bg2v2oW9u5AeIA6kJ%2FrHt5mmt5U9f9MFPdtuOcAX3SlYZDfKu9lGs%2FuthRknugsX5AScmhPY8HDWZx9VCQXhaktyA7VFKTrOcHTS%2FJ5YkaSxRyJFsL8BDNj79Zjp1dekbeqIEoYym5Erh2%2B60vUdwYAGjUX0edsIb7sHHRnpKpstzcfOCGPodz%2B%2BBG302uufsxm9PKj4tLh29DpxqODzN9mP%2B2CBjAhxZwk581FNMfcalHLT1pXbK2iQ1O%2BX7mlAPs9sy9M8%2FoizgVtNocGGXSRIOvGk4zoCh0C3ujxlgz%2FIWODOhG0CV9N5UAb25SuLm9aBSrP534wDWFIhU2mSJrX5GAIA%2BUZrYRG4wU3v7u99rUXUG%2FWC2kqTS5n3Mg1B9Awq9xXQdRTJFWH6%2B0Uo%2BYTLF5bfarni3VEZX%2FleTiHKplPF47B5GxLKOigKcpQfAm395oLQSEwvHWtqSYc5mb24xSRDFJHRUOYyS6jAwxspQwlIrSBwFNgk7kPHv8E4eN1P%2BLTE0qB8i8U752BKSO1Snq%2BbpA%2B8yyt4Yzy8NcUHbydZUsBMWsnJ%2B80jLLY%2FmY%2B0oeygzx6Jywumy88avXPPQ1AWxggWqcRhzQMuMiLdjxlrkMQpB4UwFCRXttpOC3Fm7nOC4TUtrxOkZ0jC8PU0r1TnrG6k3wztzR0kYaMXYrm%2Bwyj81tJ%2Fp9l%2FZ%2FGH9Gcc%2F0X5Dw%3D%3D%22%7D";case"__familyAchievements_api_repos":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVjHsqw4Ev2at%2BwJvFniXWEKD5sOPBTeFvD1I%2B7t3s1EVFAgUlJKmTrnJH9Q7g8qnn33B4GOYlmbcfiD8n8QBP4PBK6gtRiyMW%2BG6rfZc8W%2FqOcFKv5BhT8Q8wfl%2BrNsugKY1uO6%2FZq9mrbgsN8BetC9bIr89w0CIcRfEPoXhLsQ%2FQdlMBxcIPo%2FJATFv%2FZJVQz%2FY5j%2F492W%2FOPZ7%2FN2TcXvc14cTVb8uPrjJwI9P5TLm6Rakh48DEn%2Fjy2zb%2BOPgQiudjGNa7ONS1Osv4M2%2F%2FjeAXcy7K%2B%2F%2Fy6TvukuJqub4ih64O76dzI1fy9Pz98ZSR9OM3pHhAODBy6yqINpiEMbE3qONwHeNiKnoZZp1Zfc2443gWnY%2BbC%2B6zuHNA315wlDuaTNWnEVv9x%2BAtcQBvoEXJDGGJY5ZJiBJvEjmnIOuhoyDlfk8QG3lxzW3bcx655N1UH4ULNbqUeb6pd05G3dhFLrE4SqEIhzcITe3KjoJbfqdWvAhz3sTtbk00jzCjAt5TR%2FI0owqLMbxLmDGTnZOzDaXSKy7P1Dl3BNX9%2FLeu9T3lS7XNv2KvNZ45kmHQJzduEuDfTv3%2BeCv%2Bl7YJ%2BnaUEVcjexC9yXKJ7m%2BAfWwAazt9TnMtyWuRDY9yWpFjHUhi6jsfoJnh3QOK3jbx5SjMMPslkzoD65xxnSTIF6odpoaOi8Lh%2B%2B%2FrAGOfAe6HOhLE%2FmqptQkJk7IoaVAlTze82eOYbCthr6trq%2B3Wk9vdBIMchuWmEv4cYm%2Btc4v3ij7IQMKzcXI5M%2Bs66WvUHkpuq%2Bq%2FfqZMl1QESlv2%2BTi2g3eNYsLjUFRhgoOyzdXEzwG6xTrIl2lKlEBbd5cnx%2FUo01a3boNeJ1woQPWlS0Da4iWpT1OnvPiqX3KA36IH%2BEhRWkAOfhfcFdyUl9S8jvKVZN5zPtjkVCmJZJ3qTXrFyHkxKZvObNbpoTPJNhszLG5umyPXRTlh%2FD6%2BeDKFs8IRt3cWNSk5vazp94YetGUIwd7w%2Bjf8%2FQ64NWceeEc6u%2BdaH6HpdMRMDJ7wCDqzKnOFmhGgin%2BLmla3Q3JTGFl5eVaKwUtefRBFO2XyTzqUzjTSgXBmXloDpHh%2Fy7Sc9yExtswbG4sP5K1pFpEYqKnzCX5HveM29Cp2hkTtjVJGaOEj5cst07WU%2BPUl8GPYvhZT0pVl%2FYer1Bw%2BAu4atfPkbRGk%2BW4RCjfLqTIGVVzb7nNQBr0gFvOqOcbfPyFgofcr60d1Gf3WQ4UKSvRS9Y3iBKbFJWxiw505P0JAbymsf4ouULsZrFdfy05l44znEmdxePXxotlWl%2B4uzfk5%2BK1UIe6oxtSdfEHAMODruS9x4LxUIzGQfr6eW%2FpgGKtptx90Wv2NmZhPd%2Bkp2eTa%2BNLjWPdHfF2pWG6zWd606Fga6CSkaltj8ZExK6272%2BMvPM2PNjxch0civ0yK2FD8G324ApnwMVYbFsMty0FRwwjWNPp0WPtSo34LjhxXEvpft4XeuVnFPRY1sZo%2BcHjgBzo61hu7ESTbbfTahzz7lV%2B6qpSDJhiiAtOkyzCkFfaSJs%2B12ClFH5LtGuX%2B%2Fxm%2BGW08S17rWgV3StnKdm5gLuQxDWVjF9TpLnjuPgsGxvwZk83ZwggZkdBkVwUxGaTnoCGCOdSxbjR66eeGcpxO38%2FADlE15Duo01ebeS8rWP7ya%2Bdg6kJ2v7sAZgUGzT2kM%2BdVBkHMB1NqXoU4xDdaigAX7C6%2B7vuGpYiKV05slDu8ffezpPvioRoPvQJNykld6RetIBMkxTTVXtb%2B6r1a%2BeYc2xE%2F1AwttnV6Vw9BpD6%2FCgqWdf3ZuTEN8fiJZjcuY9PSC6xEA%2B0WIlbokZ9e0ebuIbxiB9HJRXptru6DCSHSTlElKVeSggWGZGE2W6C0efjSXWhvVZwiAOvOin37wlNwk1jaUTuDgV9qv8HJ5pqTvEzVhCICmUAjgsPuGLFWrIs3qa%2FHaGRchkrGxzKe6MOhwYJH8oLvDaRdvJEeduR6cbzZUbs3s3CK7hOd61HdQhfeCEjj%2Felx2f%2FmZxHmrHUwqWXcw64lY4s0k8Lx6ZHEFEDd%2FghcmVEJG8k9cX75%2B4OU8yhhxaSk86OIdUcYd4FygkE%2FZDbIDW47vLPb6qKX%2FDcHXkYeREBWU%2FqvITj9D3S7cJ00mZfE3ENjiSBzVJjfCgJ3aKe2hctrptl9dLkTA2JtsixDmHUfRewM7n0NWE0evIvOT6nGEGEYvgJyi0r6NXYdh09FJvMm2VnWTam%2BoXeqCELuJ14hYbVzqDejhdjDXnbVgvEnEw%2FehMWV4RahYFaXT8djSqQzbYu%2BYpJAxse97STuE9ZKtqrfJH7WuLHv1w3ZtPQzaX2THcEhcMCnaL%2FbqdnVXZdFjRN27UFwXHG2t8DFQotIEyqs8jS4wUPWGAuyyCheezm6xNqXjUrAep6tqhxgm6i4TNiYiti%2Bd2FTgtYFxbCSnitO9%2BCS2RM8E4QoKLy4ODBnT1Oe1fbaJ93MA%2FI8Fnxz2wzneUf4uJ1jghKrXN%2FfYwURMI9zIHMea3yLfg2pLKnBQ8fNRNVz406qTLIZmqNHG614Po6KF1xlCbeC0q3AgYxOvoAzrmnQBrZoW2p89SXvsU8tOwucp3fHY8IjUBeqJkfKt8Plsy4n6XNFZAWk2GpgKRCCIQuhKSvU%2F%2F3BJx4TL04VKH1lDjExFd6W30aaYIOQLNx8oe472U2Uz9twv7WlDYRff2NbGneZ%2FGh6AEoNsZ6kq%2BBziHD7dtQiTqYeoBhk0da1L%2FwNE%2BRydGt0iTU7lppqE%2FBVPR58GQlFT7YDqKGGE5FYgqv%2FglNBlKX21veKTcwc3mfN2TiIuf0BNm4wHjEHolSzRpLnsd7buhqG4n79J4KE%2FAxyGSOAtaVU9H2Z5TJeZiBJdJzcC8SHZJjBAxUDBIbUuSe%2BhjoG1Ni3FrHQFEFGX8tNuGhNdR%2FGLYK%2B%2Fur9Cd7%2BxuSY522SrXgRFzcRjCMGr37jRoF5NdCVrNTXvdFjf2TPt4YQ5g5kr4WrBG2zGwquyjVB%2FW8vXNHl%2FjR6N5cSiMDzo%2FosaDh%2FKSvJeq%2B8hLWweY58dxIHxXs9IuUQc%2FdicOnj1wLJZ76syUuxHe2NgIlnhQFlxzhS%2FWYqEC9JM5PDK1m7IqnS5RPhudlrndc2ot4QMj9BQFg2UQs1VPy2LJ0JZ6GVl2%2Beb7Hy9hmSrZmSuuUFGarMVltl4mtB4NTjVv90xlHFDjiM3x%2Fr4yRjYyZdx8yJUaIKh26fzRYyK1bOspFusgLe8smU0PBmIUguEdiG2Wygd%2F9qi8lULl49SKjJQptN%2BYMb9cuEmgBS%2B9JoKPRyZrRDIJLyKdBnhxiDQeABCKVW70%2BowjaBGPi7aivLzM1i5yK6hwRNuv8HZ8dx2%2BbAazqRyfv%2Fet8vuMCMwE9VRAoUzp6SqkBJFPVOfrYpMK29yFjlBXiXJORjZFs2msCHyF5fP8oSZWf6W5u5QJng6XrbTNlD1UkjQIt%2Bw3haRyAkU2ILgEotDlZwvsOxtHq1kRt6sf%2FSxsXmgH6PSDQ%2BqTR9DiUy1ax5E2fd2KWmwGnBYK891H%2F5hFHvbkTLUlMZ5PaTLqcIa1RoumRTEcBCB2sW9ADohpr5b91zjCWR7hwBXJEUr1h4qX0xkO2h4Q8ZyaHZk0vx805xtW6ICe2CMj5j6S7YLFvLQ5Hwwleuobhtf26shlRs1POoS7htfIeOm6ybF5pmtz7up%2BCZ83Qkfjvh0OVy7D%2Bwtvdlicd3WnT7HgVNZTQVkwOKb7h9K%2FlIRZnvd6WSuqocODvOs3C8%2Fh3tGH2pIFnec1QdQ38nUoKALc7RFwcduvyZAwGgnO%2FslrUVfZjtKLs%2Fz8yDIxp4LopIla4CaDCCRpsT2CjovwQl%2FYFq2h47ynrL3hlvGgmPmVcpPpdBhZikmh1HcXIGaKJndxF%2BOha1tJWH4GU5%2BmdJAX%2F%2BiXZT%2FzrKxnlMlEyj9Iz8dfAqA2sePLQHQNUSjh7kmR6Uc7%2B6UbT15yQlLXmnxjPRLpfV8hh7jjMX5Wwpi1C29lZPChVlW5QIriBQidB9GHOHhjTxiUn8KgEstaLsor9y99WOfvUy5EZI%2FztP191g%2B7shZIokd%2BM85AwhZRDyp2YteiClpt7MO4iKjpXO7B4qfeEKmJ7h1QVYKGCofNW9j4PhSSj%2Fwg0CwnWDfFD5ne91Xozhe5QtTcH8hwMhYqcWIzjqu0Q8Vt1QjHtuNbFzyoP9jgRYKgs7ENBYhF29FQdAEmfmAsVPbLuEwzkYY94aGLp6OZwp7TQUAvunu262fnNkC31qaq9JWtOBoMGYV%2FTRomMyJTQzy02eun9KU7DJRtxkMuHxg5jgYpZfk7D9eJPkdK3AGAuGkMRGwhpY9j92t5jgmgVnjfnkpp04mH7GDKTMAf%2FaTQA8FqtT4FJ%2FN%2BPk88v8erf79v%2FPt15jlvvx9oflr%2BCw%3D%3D%22%7D";case"__familyAchievements_api_frontend":return"https://app.diagrams.net/#create=%7B%22type%22%3A%22xml%22%2C%22compressed%22%3Atrue%2C%22data%22%3A%22dVfHruu6kv2aPbwPyrKGyjlY0dLkQlbOOX79o84%2BDfSgG7AJsVhVXCxW4g%2FK%2FqDC2bU%2FCLRn81IN%2FQ%2FK%2FSAI%2FB8IjICa9cmQVn3xS%2FZc4Z%2FXs4AKPyj%2FA9E%2FKNudedVmgLUclvWXTauajMV%2BFXRAPK%2By9HcFgRDiHwj9B8JdiPpBaQwHA0T9h4Tg6Jc%2FLrL%2B%2F1Dz%2F6Bb47%2FIfufrNWa%2F8zTbqyT7A%2FUPTgR6fiibVnExxx2Y9HH3l5fe1uEPgwDGIPuCUZiHfs369Fdt9Rd9CwAl2D%2F%2F%2FpvHXdVedFJW2Z51APDybzxW%2F%2Bb%2FSwrlSX9dE0LH%2BB2DYQm%2F2JE5SfkHYWjyu1HImHtKvZJgjrQa050zvRRSUmr7DFOKw5fs0fOXcevkGhPN1xAhdB7yNZ%2Fs422MVK7uTEkiFhBXX6qGvm%2F49Vosl01MkqQUXXELi5kbAVeOycMYkgreVelzW7WLhWGHyumkHCOIMTYPmy5yWmhYdeQbewVtN0xLmaB8aysUWy2HdBwJ16jUUhVYaHuxZB5fOMIihIl7Hjtp3dcmO9Po3bcd9CVFzuINUBWky3TynbXN7Dvw5N3G16knOdfgC6jZYyLES32pwSWHK9coLGpjopkK0AFWXzx37XzWbMDoAl0bMDVORA%2BYR6cXyOo1XKfjb4QUGDExeavqMvXLpwNVk%2BRxBXu%2F9c9NX%2BprBOKlvDCp%2BFXfdv9uZkDwowWwWBlxuN4Y1xNv0xca8%2FWp94znUXZz6kMyFsHGrmpCWIEWfjM3yYPF9Fc2nV54VsWCRzMLTKazWYjNyt6L5gRA9dp8bhAeTFgfyD60KOO2AvTdiXuTiKLZ9y0zbpGDQ8nyEyQxYKICzLM4N7zOWjZz83I6E8txkM5BFO%2FMw7aRnv3LXaely10Y7rxP8XbTPOR5uu3KD4Qo0VdtzWO5LEJQlTIqC6M99TPdHBlHSkwKFkj2z1BK4rigQhIu%2B%2BotfyUfZ4U7YyYWiz3H4qJ3Y2npfBR5k3w0upT7GQMhI5y4nHPgDhjXIVePk8mBi%2Bhe46EaA9HCpN9cm7%2FffYgSMIOOu3ycGfw%2FR7YMOFAwwgzzEOmmqrt%2BkzbiqytaVrnPRdisnjXNWgZfOyoOjA%2FBhxEcio0ZIXc0O2DJJ15fb88rxqpqH2co29fF8PBQhdham5Hmd%2FJUOaMB9qBUQiNQAuSA5fAXBVBgudpgV0X%2F3I2IF%2FAmz3ujNs8NNYYVI3PcwvY%2BkWKZ%2BC2UTrNnrhrNQQEyE12evs48vbLrxKHy8KB3sqfQ4IWRVfuLNu446xKl5LgCTXyNTYDHI5QV8oKw9CObe0QV55tLrJHw8iEf1ccK0KDScezQWZUpQW%2FYHwALLiFYNVJT3paFKwS50NSyTDtZDeqsBzL8yMirY2EU1kW0j7e3g0r8PTW%2BiQTegGEFSS2zhk2AVZMP5aZt%2BjOstqlrCem694p37xkRBWeLKZLErXxzhv1axq9Ql9Iarhp60VwoQ2RPSu0rtF1%2FJCJIo4o5SqARj73WcZ%2BUNW2wDqMn5GnQmRKAcN0DGvU0SnMHKisvXvYRpeT0%2FXR1wj81fG8Sy%2B7Dbkf3y9KESDZypUIJnvLIaoOM765WnU9HCCaSZvJm6JvW7DKYFFR2nHGqqZZhzR3GrvO0PE8EhlLqtjJvK29ElXidxBwMyvnec3jq%2FIqoNsS8kry%2BYAah9AbDsQJgrKBHUO7pRVE6yY7HD8SeaEJi7bIdptGouv7VjyPXG52xVZceeaOvvaDFheqEPWV6%2B1pcjxGK4fU3M1lUt6nvhdueVOH78TKVrTQxQs%2B5oRj3fKm1FG0LHFNeZXvdOI6fTwTNissOmWFErPgOiuILwoo5JOANQrGg9lJHi9p2ryS90%2BozxWRcg0SjULQGXbhiIl2S6HAOTsGc%2BJo8QVO3vgc%2Fp5o%2B6VQFhD83w6AZQmTHxVpGE0ZxgXa3COxNHY6Pj19I%2FJNTKcGeFcqGKCN6mV5LHbIuEk7%2BVhSpQxsmILJFRGqGHWzATODNwc1ff8t4%2BvZVF01jsxwTk6ne0IQXAuuAzCWAOsfkJDZc08T5iHdO4SevlYhQciLRzclTyDsCJVUAZZiRRWGr90QeJQo4V4vx33zUyK%2FnAweet0AJJJgchLVetpHfb9qghHZiHSBcKexW2YrOqgRP6sgLL9ZlctXRFKK2Z6Sk56TOXs5WE18Ha1vhrVvrzQfh0RWiyoCdUX14Ij4DPQ6D3Xl6JLeed9%2FZTVjHBTTx3SA25TSyoCIrZQjvANejWj%2BaQDCssAjgKhT4rH7PGfJqD%2BBvlRrW571gYhvBZvn%2BbKi9wp%2BgIQ1%2FjepSHIt1de3v44ADcU7MVm5GF7SQqB28JKW%2Bhwk2aJZSihEwqrCNfquaRZ23kHZVXudKciltGVYWiGAVYbNhqE8Hjw6%2BxvkU4Lzmicp4wT55d9WaJq9omPfaf3KJ6XJDx2w9IXKxGCZCA7Ev4hh2SRtiGCSmZWdhTOGm6cnRVqVNzUc9VF5Z1bzPc8P22AEbZMyU1WmNdTXByMDcpA7%2BRLU7HsQS3GOZUno1nBTDx4g7zj1uPzmKbGHpXMmNXZ6wA82RLM4eQo8zF9R0DLuJEYdXXr3u7nWU5VMsJMTq79pTTLJwqGp94uG%2B%2BN2zvv6zOqez%2FwlUX%2BGw7AqT5XLMsacnwqVZ76vrHoN9kndo8csBt9dUly9sK6%2FMb6ULeuGNwElMhWVzWxFmYT%2FOn7uzWR0hgITNEMb0KoIYzU6hGe8VvLVb%2FOWsVI2TSXK7pWP2ZRXGAAdOhBJj1MDsjPJyvSegi6Q%2Fn7aiz2g1PE%2Fj8aDvrUX3li8KSdcWPvKfjvrs3RjRXJ7ybncT6eQ%2B1fBlOdr0dCCofmfddyJelj9j%2Fqxzs%2BfJaQeRKwRF6xJTGQA7687gJ2ocu5Vc7wyZE2Jy6QPH1NachnFnDCHQFcYQjE8hnPgSyJTadBGPk7DDClucZjAHG7tMMa5LeXDdkuwf0cXTOjCKyTfafS3w7DncV%2FVOrDuugqoZ3j8TmP%2FAh7VFkMV%2BPpCf9S7lm1OtEj2k27%2Blf2WPKTY3uZ3U12NhbEDnp6%2BSlbH2RzRRxuJpiOJtMsjDEaU3bKj3HIcw6FgFVX6909ADXwyD7o9ZydXXodJivl505pZ5%2BqmiO1WCo9xn4t7dk2l4qX7KvKPFwJAEBvpuksl4qUSD2ruha4rsoVvUfeIZzFmfgt92%2BNPTc4z11Z4tBhRh1iEt2TvFtZDwCRBiqbVrRVFmCvO5kLDbQEyyzymegpP530s5qe%2F%2BHkh8dtdhTfeOVCiwboi0A26UiTQqSwxUhEtMp6hVF41i65jHTZ5y31OGw10xtWefU3IQDtlM3RXv%2B7EM7SP1grV2QFCU6OW1adTN0ay0v09TCzOr5FI3YwmuL7DFSOrfHdvfGgXTFIyGH4EWpY9XtmGwGu5mT9hCQFec4vgHaXsndfxXdy1MrgU%2BpAWPLVAzbfyktT%2Fo2vvO8bTny%2FOkAc8%2FkMb%2FPon%2B50EHSH%2FfdH8o%2FwU%3D%22%7D";default:throw new Error("Unknown viewId: "+e)}}const Z5=Object.freeze(Object.defineProperty({__proto__:null,drawioEditUrl:U5},Symbol.toStringTag,{value:"Module"}));function V5(e){switch(e){case"index":return`@startuml
title "System Context"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Member>>{
  BackgroundColor #428a4f
  FontColor #f8fafc
  BorderColor #2d5d39
}
skinparam person<<Admin>>{
  BackgroundColor #AC4D39
  FontColor #FBD3CB
  BorderColor #853A2D
}
skinparam rectangle<<TelegramCloud>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievements>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
person "==Участник\\n\\nЧлен семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере." <<Member>> as Member
person "==Администратор\\n\\nЧлен семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками." <<Admin>> as Admin
rectangle "==Telegram\\n<size:10>[Telegram Bot API]</size>\\n\\nTelegram Bot API. Доставляет updates (long-polling)." <<TelegramCloud>> as TelegramCloud
rectangle "==Family Achievements\\n\\nTelegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений." <<FamilyAchievements>> as FamilyAchievements

Member .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>команды в чате, личные сообщения
Member .[#8D8D8D,thickness=2].> FamilyAchievements : <color:#8D8D8D>просматривает прогресс
Admin .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>управление через бота
Admin .[#8D8D8D,thickness=2].> FamilyAchievements : <color:#8D8D8D>агрегированное дерево группы
TelegramCloud .[#8D8D8D,thickness=2].> FamilyAchievements : <color:#8D8D8D>updates (long-polling)
FamilyAchievements .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>sendMessage / editMessage
@enduml
`;case"containers":return`@startuml
title "Containers"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBot>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam person<<Member>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam person<<Admin>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<FamilyAchievementsApi>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<TelegramCloud>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam database<<FamilyAchievementsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Telegram Bot\\n<size:10>[Python 3.12, python-telegram-bot v21]</size>\\n\\nОбрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)." <<FamilyAchievementsBot>> as FamilyAchievementsBot
person "==Участник\\n\\nЧлен семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере." <<Member>> as Member
person "==Администратор\\n\\nЧлен семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками." <<Admin>> as Admin
rectangle "==REST API & Frontend\\n<size:10>[Python 3.12, FastAPI, Uvicorn]</size>\\n\\nFastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда." <<FamilyAchievementsApi>> as FamilyAchievementsApi
rectangle "==Telegram\\n<size:10>[Telegram Bot API]</size>\\n\\nTelegram Bot API. Доставляет updates (long-polling)." <<TelegramCloud>> as TelegramCloud
database "==Database\\n<size:10>[SQLite (dev) / PostgreSQL 15 (prod), Alembic]</size>\\n\\nusers, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events" <<FamilyAchievementsDb>> as FamilyAchievementsDb

FamilyAchievementsBot .[#8D8D8D,thickness=2].> FamilyAchievementsApi : <color:#8D8D8D>[...]
FamilyAchievementsBot .[#8D8D8D,thickness=2].> FamilyAchievementsDb : <color:#8D8D8D>SQL (shared SQLAlchemy engine)
FamilyAchievementsApi .[#8D8D8D,thickness=2].> FamilyAchievementsDb : <color:#8D8D8D>SQL
Member .[#8D8D8D,thickness=2].> FamilyAchievementsApi : <color:#8D8D8D>просматривает прогресс
Admin .[#8D8D8D,thickness=2].> FamilyAchievementsApi : <color:#8D8D8D>агрегированное дерево группы
FamilyAchievementsBot .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>sendMessage / editMessage
Member .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>команды в чате, личные сообщения
Admin .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>управление через бота
TelegramCloud .[#8D8D8D,thickness=2].> FamilyAchievementsBot : <color:#8D8D8D>updates (long-polling)
@enduml
`;case"botComponents":return`@startuml
title "Bot — Components"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBotGroupHandlers>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsBotPrivateHandlers>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsBotAdminPanel>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsBotKeyboards>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<FamilyAchievementsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Group Handlers\\n<size:10>[CommandHandler]</size>\\n\\n/register /join /members /achievements /progress /web" <<FamilyAchievementsBotGroupHandlers>> as FamilyAchievementsBotGroupHandlers
rectangle "==Private Handlers\\n<size:10>[ConversationHandler]</size>\\n\\nПросмотр ачивок, подача заявок, рецензирование (states 0-3)" <<FamilyAchievementsBotPrivateHandlers>> as FamilyAchievementsBotPrivateHandlers
rectangle "==Admin Panel\\n<size:10>[ConversationHandler]</size>\\n\\nCRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)" <<FamilyAchievementsBotAdminPanel>> as FamilyAchievementsBotAdminPanel
rectangle "==Keyboards\\n<size:10>[PTB InlineKeyboardMarkup]</size>\\n\\nПостроители всех InlineKeyboardMarkup" <<FamilyAchievementsBotKeyboards>> as FamilyAchievementsBotKeyboards
database "==Database\\n<size:10>[SQLite (dev) / PostgreSQL 15 (prod), Alembic]</size>\\n\\nusers, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events" <<FamilyAchievementsDb>> as FamilyAchievementsDb

FamilyAchievementsBotGroupHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
FamilyAchievementsBotPrivateHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
FamilyAchievementsBotAdminPanel .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
@enduml
`;case"apiComponents":return`@startuml
title "API — Components"
left to right direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsApiRestEndpoints>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiClaimService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiAdminService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam person<<Member>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam person<<Admin>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<FamilyAchievementsApiAchievementService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiFrontend>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiRepos>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<FamilyAchievementsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==REST Endpoints\\n<size:10>[FastAPI Router]</size>\\n\\nGET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories" <<FamilyAchievementsApiRestEndpoints>> as FamilyAchievementsApiRestEndpoints
rectangle "==Claim Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nsubmit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота." <<FamilyAchievementsApiClaimService>> as FamilyAchievementsApiClaimService
rectangle "==Admin Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nБезопасные CRUD-обёртки для категорий и ачивок, toggle prerequisite с cycle detection." <<FamilyAchievementsApiAdminService>> as FamilyAchievementsApiAdminService
person "==Участник\\n\\nЧлен семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере." <<Member>> as Member
person "==Администратор\\n\\nЧлен семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками." <<Admin>> as Admin
rectangle "==Achievement Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nget_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач." <<FamilyAchievementsApiAchievementService>> as FamilyAchievementsApiAchievementService
rectangle "==Web Frontend\\n<size:10>[Vanilla JS, Cytoscape.js, cytoscape-dagre]</size>\\n\\nSPA: каталог групп, дерево ачивок, фильтры, детальная панель." <<FamilyAchievementsApiFrontend>> as FamilyAchievementsApiFrontend
rectangle "==Repositories\\n<size:10>[SQLAlchemy 2.0 async, selectinload]</size>\\n\\nuser_repo, group_repo, achievement_repo, claim_repo, admin_repo" <<FamilyAchievementsApiRepos>> as FamilyAchievementsApiRepos
database "==Database\\n<size:10>[SQLite (dev) / PostgreSQL 15 (prod), Alembic]</size>\\n\\nusers, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events" <<FamilyAchievementsDb>> as FamilyAchievementsDb

FamilyAchievementsApiRestEndpoints .[#8D8D8D,thickness=2].> FamilyAchievementsApiAchievementService : <color:#8D8D8D>tree / aggregate
FamilyAchievementsApiRestEndpoints .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>groups, members, categories
FamilyAchievementsApiAchievementService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>compute_achievement_status
FamilyAchievementsApiClaimService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>claim CRUD
FamilyAchievementsApiAdminService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>achievement / category CRUD
FamilyAchievementsApiRepos .[#8D8D8D,thickness=2].> FamilyAchievementsDb : <color:#8D8D8D>SQL
Member .[#8D8D8D,thickness=2].> FamilyAchievementsApiFrontend : <color:#8D8D8D>просматривает прогресс
Admin .[#8D8D8D,thickness=2].> FamilyAchievementsApiFrontend : <color:#8D8D8D>агрегированное дерево группы
@enduml
`;case"claimFlow":return`@startuml
title "Claim Flow"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Member>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam person<<Admin>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<TelegramCloud>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsBotPrivateHandlers>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsBotAdminPanel>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiClaimService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiRepos>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<FamilyAchievementsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
person "==Участник\\n\\nЧлен семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере." <<Member>> as Member
person "==Администратор\\n\\nЧлен семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками." <<Admin>> as Admin
rectangle "Family Achievements" <<FamilyAchievements>> as FamilyAchievements {
  skinparam RectangleBorderColor<<FamilyAchievements>> #3b82f6
  skinparam RectangleFontColor<<FamilyAchievements>> #3b82f6
  skinparam RectangleBorderStyle<<FamilyAchievements>> dashed

  rectangle "Telegram Bot" <<FamilyAchievementsBot>> as FamilyAchievementsBot {
    skinparam RectangleBorderColor<<FamilyAchievementsBot>> #0284c7
    skinparam RectangleFontColor<<FamilyAchievementsBot>> #0284c7
    skinparam RectangleBorderStyle<<FamilyAchievementsBot>> dashed

    rectangle "==Private Handlers\\n<size:10>[ConversationHandler]</size>\\n\\nПросмотр ачивок, подача заявок, рецензирование (states 0-3)" <<FamilyAchievementsBotPrivateHandlers>> as FamilyAchievementsBotPrivateHandlers
    rectangle "==Admin Panel\\n<size:10>[ConversationHandler]</size>\\n\\nCRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)" <<FamilyAchievementsBotAdminPanel>> as FamilyAchievementsBotAdminPanel
  }
  rectangle "REST API & Frontend" <<FamilyAchievementsApi>> as FamilyAchievementsApi {
    skinparam RectangleBorderColor<<FamilyAchievementsApi>> #0284c7
    skinparam RectangleFontColor<<FamilyAchievementsApi>> #0284c7
    skinparam RectangleBorderStyle<<FamilyAchievementsApi>> dashed

    rectangle "==Claim Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nsubmit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота." <<FamilyAchievementsApiClaimService>> as FamilyAchievementsApiClaimService
    rectangle "==Repositories\\n<size:10>[SQLAlchemy 2.0 async, selectinload]</size>\\n\\nuser_repo, group_repo, achievement_repo, claim_repo, admin_repo" <<FamilyAchievementsApiRepos>> as FamilyAchievementsApiRepos
  }
  database "==Database\\n<size:10>[SQLite (dev) / PostgreSQL 15 (prod), Alembic]</size>\\n\\nusers, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events" <<FamilyAchievementsDb>> as FamilyAchievementsDb
}
rectangle "==Telegram\\n<size:10>[Telegram Bot API]</size>\\n\\nTelegram Bot API. Доставляет updates (long-polling)." <<TelegramCloud>> as TelegramCloud

Member .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>команды в чате, личные сообщения
Admin .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>управление через бота
FamilyAchievementsBotPrivateHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsApiClaimService : <color:#8D8D8D>submit / approve / reject
FamilyAchievementsApiClaimService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>claim CRUD
FamilyAchievementsApiRepos .[#8D8D8D,thickness=2].> FamilyAchievementsDb : <color:#8D8D8D>SQL
FamilyAchievementsBot .[#8D8D8D,thickness=2].> FamilyAchievementsDb : <color:#8D8D8D>SQL (shared SQLAlchemy engine)
@enduml
`;case"__member":return`@startuml
title "Участник"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Member>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<TelegramCloud>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievements>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
person "==Участник\\n\\nЧлен семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере." <<Member>> as Member
rectangle "==Telegram\\n<size:10>[Telegram Bot API]</size>\\n\\nTelegram Bot API. Доставляет updates (long-polling)." <<TelegramCloud>> as TelegramCloud
rectangle "==Family Achievements\\n\\nTelegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений." <<FamilyAchievements>> as FamilyAchievements

Member .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>команды в чате, личные сообщения
Member .[#8D8D8D,thickness=2].> FamilyAchievements : <color:#8D8D8D>просматривает прогресс
@enduml
`;case"__admin":return`@startuml
title "Администратор"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Admin>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<TelegramCloud>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievements>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
person "==Администратор\\n\\nЧлен семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками." <<Admin>> as Admin
rectangle "==Telegram\\n<size:10>[Telegram Bot API]</size>\\n\\nTelegram Bot API. Доставляет updates (long-polling)." <<TelegramCloud>> as TelegramCloud
rectangle "==Family Achievements\\n\\nTelegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений." <<FamilyAchievements>> as FamilyAchievements

Admin .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>управление через бота
Admin .[#8D8D8D,thickness=2].> FamilyAchievements : <color:#8D8D8D>агрегированное дерево группы
@enduml
`;case"__telegramCloud":return`@startuml
title "Telegram"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Member>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam person<<Admin>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<FamilyAchievements>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<TelegramCloud>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
person "==Участник\\n\\nЧлен семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере." <<Member>> as Member
person "==Администратор\\n\\nЧлен семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками." <<Admin>> as Admin
rectangle "==Family Achievements\\n\\nTelegram-бот + REST API + веб-интерфейс для отслеживания семейных достижений." <<FamilyAchievements>> as FamilyAchievements
rectangle "==Telegram\\n<size:10>[Telegram Bot API]</size>\\n\\nTelegram Bot API. Доставляет updates (long-polling)." <<TelegramCloud>> as TelegramCloud

Member .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>команды в чате, личные сообщения
Admin .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>управление через бота
FamilyAchievements .[#8D8D8D,thickness=2].> TelegramCloud : <color:#8D8D8D>sendMessage / editMessage
TelegramCloud .[#8D8D8D,thickness=2].> FamilyAchievements : <color:#8D8D8D>updates (long-polling)
@enduml
`;case"__familyAchievements_db":return`@startuml
title "Database"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBot>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsApi>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam database<<FamilyAchievementsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Telegram Bot\\n<size:10>[Python 3.12, python-telegram-bot v21]</size>\\n\\nОбрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)." <<FamilyAchievementsBot>> as FamilyAchievementsBot
rectangle "==REST API & Frontend\\n<size:10>[Python 3.12, FastAPI, Uvicorn]</size>\\n\\nFastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда." <<FamilyAchievementsApi>> as FamilyAchievementsApi
database "==Database\\n<size:10>[SQLite (dev) / PostgreSQL 15 (prod), Alembic]</size>\\n\\nusers, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events" <<FamilyAchievementsDb>> as FamilyAchievementsDb

FamilyAchievementsBot .[#8D8D8D,thickness=2].> FamilyAchievementsDb : <color:#8D8D8D>SQL (shared SQLAlchemy engine)
FamilyAchievementsApi .[#8D8D8D,thickness=2].> FamilyAchievementsDb : <color:#8D8D8D>SQL
@enduml
`;case"__familyAchievements_bot_groupHandlers":return`@startuml
title "Group Handlers"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBotGroupHandlers>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApi>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsBotKeyboards>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Group Handlers\\n<size:10>[CommandHandler]</size>\\n\\n/register /join /members /achievements /progress /web" <<FamilyAchievementsBotGroupHandlers>> as FamilyAchievementsBotGroupHandlers
rectangle "==REST API & Frontend\\n<size:10>[Python 3.12, FastAPI, Uvicorn]</size>\\n\\nFastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда." <<FamilyAchievementsApi>> as FamilyAchievementsApi
rectangle "==Keyboards\\n<size:10>[PTB InlineKeyboardMarkup]</size>\\n\\nПостроители всех InlineKeyboardMarkup" <<FamilyAchievementsBotKeyboards>> as FamilyAchievementsBotKeyboards

FamilyAchievementsBotGroupHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsApi : <color:#8D8D8D>читает участников и ачивки
FamilyAchievementsBotGroupHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
@enduml
`;case"__familyAchievements_bot_privateHandlers":return`@startuml
title "Private Handlers"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBotPrivateHandlers>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApi>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsBotKeyboards>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Private Handlers\\n<size:10>[ConversationHandler]</size>\\n\\nПросмотр ачивок, подача заявок, рецензирование (states 0-3)" <<FamilyAchievementsBotPrivateHandlers>> as FamilyAchievementsBotPrivateHandlers
rectangle "==REST API & Frontend\\n<size:10>[Python 3.12, FastAPI, Uvicorn]</size>\\n\\nFastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда." <<FamilyAchievementsApi>> as FamilyAchievementsApi
rectangle "==Keyboards\\n<size:10>[PTB InlineKeyboardMarkup]</size>\\n\\nПостроители всех InlineKeyboardMarkup" <<FamilyAchievementsBotKeyboards>> as FamilyAchievementsBotKeyboards

FamilyAchievementsBotPrivateHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsApi : <color:#8D8D8D>[...]
FamilyAchievementsBotPrivateHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
@enduml
`;case"__familyAchievements_bot_adminPanel":return`@startuml
title "Admin Panel"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBotAdminPanel>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApi>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsBotKeyboards>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Admin Panel\\n<size:10>[ConversationHandler]</size>\\n\\nCRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)" <<FamilyAchievementsBotAdminPanel>> as FamilyAchievementsBotAdminPanel
rectangle "==REST API & Frontend\\n<size:10>[Python 3.12, FastAPI, Uvicorn]</size>\\n\\nFastAPI + Uvicorn :8000. REST-эндпоинты и статика фронтенда." <<FamilyAchievementsApi>> as FamilyAchievementsApi
rectangle "==Keyboards\\n<size:10>[PTB InlineKeyboardMarkup]</size>\\n\\nПостроители всех InlineKeyboardMarkup" <<FamilyAchievementsBotKeyboards>> as FamilyAchievementsBotKeyboards

FamilyAchievementsBotAdminPanel .[#8D8D8D,thickness=2].> FamilyAchievementsApi : <color:#8D8D8D>CRUD ачивок и категорий
FamilyAchievementsBotAdminPanel .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
@enduml
`;case"__familyAchievements_bot_keyboards":return`@startuml
title "Keyboards"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBotGroupHandlers>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsBotPrivateHandlers>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsBotAdminPanel>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsBotKeyboards>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Group Handlers\\n<size:10>[CommandHandler]</size>\\n\\n/register /join /members /achievements /progress /web" <<FamilyAchievementsBotGroupHandlers>> as FamilyAchievementsBotGroupHandlers
rectangle "==Private Handlers\\n<size:10>[ConversationHandler]</size>\\n\\nПросмотр ачивок, подача заявок, рецензирование (states 0-3)" <<FamilyAchievementsBotPrivateHandlers>> as FamilyAchievementsBotPrivateHandlers
rectangle "==Admin Panel\\n<size:10>[ConversationHandler]</size>\\n\\nCRUD категорий и ачивок, мастер создания, управление пресреквизитами с DFS cycle detection (states 4-11)" <<FamilyAchievementsBotAdminPanel>> as FamilyAchievementsBotAdminPanel
rectangle "==Keyboards\\n<size:10>[PTB InlineKeyboardMarkup]</size>\\n\\nПостроители всех InlineKeyboardMarkup" <<FamilyAchievementsBotKeyboards>> as FamilyAchievementsBotKeyboards

FamilyAchievementsBotGroupHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
FamilyAchievementsBotPrivateHandlers .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
FamilyAchievementsBotAdminPanel .[#8D8D8D,thickness=2].> FamilyAchievementsBotKeyboards : <color:#8D8D8D>строит клавиатуры
@enduml
`;case"__familyAchievements_api_restEndpoints":return`@startuml
title "REST Endpoints"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsApiRestEndpoints>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiAchievementService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiRepos>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==REST Endpoints\\n<size:10>[FastAPI Router]</size>\\n\\nGET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories" <<FamilyAchievementsApiRestEndpoints>> as FamilyAchievementsApiRestEndpoints
rectangle "==Achievement Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nget_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач." <<FamilyAchievementsApiAchievementService>> as FamilyAchievementsApiAchievementService
rectangle "==Repositories\\n<size:10>[SQLAlchemy 2.0 async, selectinload]</size>\\n\\nuser_repo, group_repo, achievement_repo, claim_repo, admin_repo" <<FamilyAchievementsApiRepos>> as FamilyAchievementsApiRepos

FamilyAchievementsApiRestEndpoints .[#8D8D8D,thickness=2].> FamilyAchievementsApiAchievementService : <color:#8D8D8D>tree / aggregate
FamilyAchievementsApiRestEndpoints .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>groups, members, categories
@enduml
`;case"__familyAchievements_api_achievementService":return`@startuml
title "Achievement Service"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBot>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsApiRestEndpoints>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiAchievementService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiRepos>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Telegram Bot\\n<size:10>[Python 3.12, python-telegram-bot v21]</size>\\n\\nОбрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)." <<FamilyAchievementsBot>> as FamilyAchievementsBot
rectangle "==REST Endpoints\\n<size:10>[FastAPI Router]</size>\\n\\nGET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories" <<FamilyAchievementsApiRestEndpoints>> as FamilyAchievementsApiRestEndpoints
rectangle "==Achievement Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nget_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач." <<FamilyAchievementsApiAchievementService>> as FamilyAchievementsApiAchievementService
rectangle "==Repositories\\n<size:10>[SQLAlchemy 2.0 async, selectinload]</size>\\n\\nuser_repo, group_repo, achievement_repo, claim_repo, admin_repo" <<FamilyAchievementsApiRepos>> as FamilyAchievementsApiRepos

FamilyAchievementsBot .[#8D8D8D,thickness=2].> FamilyAchievementsApiAchievementService : <color:#8D8D8D>get_user_achievements_by_status
FamilyAchievementsApiRestEndpoints .[#8D8D8D,thickness=2].> FamilyAchievementsApiAchievementService : <color:#8D8D8D>tree / aggregate
FamilyAchievementsApiAchievementService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>compute_achievement_status
@enduml
`;case"__familyAchievements_api_claimService":return`@startuml
title "Claim Service"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBot>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsApiClaimService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiRepos>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Telegram Bot\\n<size:10>[Python 3.12, python-telegram-bot v21]</size>\\n\\nОбрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)." <<FamilyAchievementsBot>> as FamilyAchievementsBot
rectangle "==Claim Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nsubmit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота." <<FamilyAchievementsApiClaimService>> as FamilyAchievementsApiClaimService
rectangle "==Repositories\\n<size:10>[SQLAlchemy 2.0 async, selectinload]</size>\\n\\nuser_repo, group_repo, achievement_repo, claim_repo, admin_repo" <<FamilyAchievementsApiRepos>> as FamilyAchievementsApiRepos

FamilyAchievementsBot .[#8D8D8D,thickness=2].> FamilyAchievementsApiClaimService : <color:#8D8D8D>submit / approve / reject
FamilyAchievementsApiClaimService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>claim CRUD
@enduml
`;case"__familyAchievements_api_adminService":return`@startuml
title "Admin Service"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBot>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsApiAdminService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiRepos>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
rectangle "==Telegram Bot\\n<size:10>[Python 3.12, python-telegram-bot v21]</size>\\n\\nОбрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)." <<FamilyAchievementsBot>> as FamilyAchievementsBot
rectangle "==Admin Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nБезопасные CRUD-обёртки для категорий и ачивок, toggle prerequisite с cycle detection." <<FamilyAchievementsApiAdminService>> as FamilyAchievementsApiAdminService
rectangle "==Repositories\\n<size:10>[SQLAlchemy 2.0 async, selectinload]</size>\\n\\nuser_repo, group_repo, achievement_repo, claim_repo, admin_repo" <<FamilyAchievementsApiRepos>> as FamilyAchievementsApiRepos

FamilyAchievementsBot .[#8D8D8D,thickness=2].> FamilyAchievementsApiAdminService : <color:#8D8D8D>CRUD ачивок и категорий
FamilyAchievementsApiAdminService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>achievement / category CRUD
@enduml
`;case"__familyAchievements_api_repos":return`@startuml
title "Repositories"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam rectangle<<FamilyAchievementsBot>>{
  BackgroundColor #0284c7
  FontColor #f0f9ff
  BorderColor #0369a1
}
skinparam rectangle<<FamilyAchievementsApiRestEndpoints>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiAchievementService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiClaimService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiAdminService>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam rectangle<<FamilyAchievementsApiRepos>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
skinparam database<<FamilyAchievementsDb>>{
  BackgroundColor #64748b
  FontColor #f8fafc
  BorderColor #475569
}
rectangle "==Telegram Bot\\n<size:10>[Python 3.12, python-telegram-bot v21]</size>\\n\\nОбрабатывает команды в групповых чатах и ведёт личные диалоги (12 состояний ConversationHandler)." <<FamilyAchievementsBot>> as FamilyAchievementsBot
rectangle "==REST Endpoints\\n<size:10>[FastAPI Router]</size>\\n\\nGET /api/groups, /members, /users/{id}/tree, /tree/aggregate, /categories" <<FamilyAchievementsApiRestEndpoints>> as FamilyAchievementsApiRestEndpoints
rectangle "==Achievement Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nget_user_tree_graph, get_group_aggregate_tree. Статус ачивки вычисляется лениво — без фоновых задач." <<FamilyAchievementsApiAchievementService>> as FamilyAchievementsApiAchievementService
rectangle "==Claim Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nsubmit_claim, approve_claim, reject_claim. Транзакция в БД → уведомление через бота." <<FamilyAchievementsApiClaimService>> as FamilyAchievementsApiClaimService
rectangle "==Admin Service\\n<size:10>[SQLAlchemy async]</size>\\n\\nБезопасные CRUD-обёртки для категорий и ачивок, toggle prerequisite с cycle detection." <<FamilyAchievementsApiAdminService>> as FamilyAchievementsApiAdminService
rectangle "==Repositories\\n<size:10>[SQLAlchemy 2.0 async, selectinload]</size>\\n\\nuser_repo, group_repo, achievement_repo, claim_repo, admin_repo" <<FamilyAchievementsApiRepos>> as FamilyAchievementsApiRepos
database "==Database\\n<size:10>[SQLite (dev) / PostgreSQL 15 (prod), Alembic]</size>\\n\\nusers, groups, group_members, categories, achievements, achievement_prerequisites (DAG), group_user_achievements, achievement_claims, achievement_events" <<FamilyAchievementsDb>> as FamilyAchievementsDb

FamilyAchievementsBot .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>читает участников и ачивки
FamilyAchievementsApiRestEndpoints .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>groups, members, categories
FamilyAchievementsApiAchievementService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>compute_achievement_status
FamilyAchievementsApiClaimService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>claim CRUD
FamilyAchievementsApiAdminService .[#8D8D8D,thickness=2].> FamilyAchievementsApiRepos : <color:#8D8D8D>achievement / category CRUD
FamilyAchievementsApiRepos .[#8D8D8D,thickness=2].> FamilyAchievementsDb : <color:#8D8D8D>SQL
@enduml
`;case"__familyAchievements_api_frontend":return`@startuml
title "Web Frontend"
top to bottom direction

hide stereotype
skinparam ranksep 60
skinparam nodesep 30
skinparam {
  arrowFontSize 10
  defaultTextAlignment center
  wrapWidth 200
  maxMessageSize 100
  shadowing false
}

skinparam person<<Member>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam person<<Admin>>{
  BackgroundColor #3b82f6
  FontColor #eff6ff
  BorderColor #2563eb
}
skinparam rectangle<<FamilyAchievementsApiFrontend>>{
  BackgroundColor #A35829
  FontColor #FFE0C2
  BorderColor #7E451D
}
person "==Участник\\n\\nЧлен семьи. Подаёт заявки на ачивки, просматривает прогресс в боте и браузере." <<Member>> as Member
person "==Администратор\\n\\nЧлен семьи с правами admin. Одобряет / отклоняет заявки, регистрирует группу, управляет ачивками." <<Admin>> as Admin
rectangle "REST API & Frontend" <<FamilyAchievementsApi>> as FamilyAchievementsApi {
  skinparam RectangleBorderColor<<FamilyAchievementsApi>> #0284c7
  skinparam RectangleFontColor<<FamilyAchievementsApi>> #0284c7
  skinparam RectangleBorderStyle<<FamilyAchievementsApi>> dashed

  rectangle "==Web Frontend\\n<size:10>[Vanilla JS, Cytoscape.js, cytoscape-dagre]</size>\\n\\nSPA: каталог групп, дерево ачивок, фильтры, детальная панель." <<FamilyAchievementsApiFrontend>> as FamilyAchievementsApiFrontend
}

Member .[#8D8D8D,thickness=2].> FamilyAchievementsApiFrontend : <color:#8D8D8D>просматривает прогресс
Admin .[#8D8D8D,thickness=2].> FamilyAchievementsApiFrontend : <color:#8D8D8D>агрегированное дерево группы
@enduml
`;default:throw new Error("Unknown viewId: "+e)}}const Q5=Object.freeze(Object.defineProperty({__proto__:null,pumlSource:V5},Symbol.toStringTag,{value:"Module"}));function K5(e){switch(e){case"index":return`---
title: "System Context"
---
graph TB
  Member@{ icon: "fa:user", shape: rounded, label: "Участник" }
  Admin@{ icon: "fa:user", shape: rounded, label: "Администратор" }
  TelegramCloud@{ shape: rectangle, label: "Telegram" }
  FamilyAchievements@{ shape: rectangle, label: "Family Achievements" }
  Member -. "\`команды в чате, личные сообщения\`" .-> TelegramCloud
  Member -. "\`просматривает прогресс\`" .-> FamilyAchievements
  Admin -. "\`управление через бота\`" .-> TelegramCloud
  Admin -. "\`агрегированное дерево группы\`" .-> FamilyAchievements
  TelegramCloud -. "\`updates (long-polling)\`" .-> FamilyAchievements
  FamilyAchievements -. "\`sendMessage / editMessage\`" .-> TelegramCloud
`;case"containers":return`---
title: "Containers"
---
graph TB
  FamilyAchievementsBot@{ shape: rectangle, label: "Telegram Bot" }
  Member@{ icon: "fa:user", shape: rounded, label: "Участник" }
  Admin@{ icon: "fa:user", shape: rounded, label: "Администратор" }
  FamilyAchievementsApi@{ shape: rectangle, label: "REST API & Frontend" }
  TelegramCloud@{ shape: rectangle, label: "Telegram" }
  FamilyAchievementsDb@{ shape: disk, label: "Database" }
  FamilyAchievementsBot -. "\`[...]\`" .-> FamilyAchievementsApi
  FamilyAchievementsBot -. "\`SQL (shared SQLAlchemy engine)\`" .-> FamilyAchievementsDb
  FamilyAchievementsApi -. "\`SQL\`" .-> FamilyAchievementsDb
  Member -. "\`просматривает прогресс\`" .-> FamilyAchievementsApi
  Admin -. "\`агрегированное дерево группы\`" .-> FamilyAchievementsApi
  FamilyAchievementsBot -. "\`sendMessage / editMessage\`" .-> TelegramCloud
  Member -. "\`команды в чате, личные сообщения\`" .-> TelegramCloud
  Admin -. "\`управление через бота\`" .-> TelegramCloud
  TelegramCloud -. "\`updates (long-polling)\`" .-> FamilyAchievementsBot
`;case"botComponents":return`---
title: "Bot — Components"
---
graph LR
  FamilyAchievementsBotGroupHandlers@{ shape: rectangle, label: "Group Handlers" }
  FamilyAchievementsBotPrivateHandlers@{ shape: rectangle, label: "Private Handlers" }
  FamilyAchievementsBotAdminPanel@{ shape: rectangle, label: "Admin Panel" }
  FamilyAchievementsBotKeyboards@{ shape: rectangle, label: "Keyboards" }
  FamilyAchievementsDb@{ shape: disk, label: "Database" }
  FamilyAchievementsBotGroupHandlers -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
  FamilyAchievementsBotPrivateHandlers -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
  FamilyAchievementsBotAdminPanel -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
`;case"apiComponents":return`---
title: "API — Components"
---
graph LR
  FamilyAchievementsApiRestEndpoints@{ shape: rectangle, label: "REST Endpoints" }
  FamilyAchievementsApiClaimService@{ shape: rectangle, label: "Claim Service" }
  FamilyAchievementsApiAdminService@{ shape: rectangle, label: "Admin Service" }
  Member@{ icon: "fa:user", shape: rounded, label: "Участник" }
  Admin@{ icon: "fa:user", shape: rounded, label: "Администратор" }
  FamilyAchievementsApiAchievementService@{ shape: rectangle, label: "Achievement Service" }
  FamilyAchievementsApiFrontend@{ shape: rectangle, label: "Web Frontend" }
  FamilyAchievementsApiRepos@{ shape: rectangle, label: "Repositories" }
  FamilyAchievementsDb@{ shape: disk, label: "Database" }
  FamilyAchievementsApiRestEndpoints -. "\`tree / aggregate\`" .-> FamilyAchievementsApiAchievementService
  FamilyAchievementsApiRestEndpoints -. "\`groups, members, categories\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiAchievementService -. "\`compute_achievement_status\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiClaimService -. "\`claim CRUD\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiAdminService -. "\`achievement / category CRUD\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiRepos -. "\`SQL\`" .-> FamilyAchievementsDb
  Member -. "\`просматривает прогресс\`" .-> FamilyAchievementsApiFrontend
  Admin -. "\`агрегированное дерево группы\`" .-> FamilyAchievementsApiFrontend
`;case"claimFlow":return`---
title: "Claim Flow"
---
graph TB
  Member@{ icon: "fa:user", shape: rounded, label: "Участник" }
  Admin@{ icon: "fa:user", shape: rounded, label: "Администратор" }
  subgraph FamilyAchievements["\`Family Achievements\`"]
    subgraph FamilyAchievements.Bot["\`Telegram Bot\`"]
      FamilyAchievements.Bot.PrivateHandlers@{ shape: rectangle, label: "Private Handlers" }
      FamilyAchievements.Bot.AdminPanel@{ shape: rectangle, label: "Admin Panel" }
    end
    subgraph FamilyAchievements.Api["\`REST API & Frontend\`"]
      FamilyAchievements.Api.ClaimService@{ shape: rectangle, label: "Claim Service" }
      FamilyAchievements.Api.Repos@{ shape: rectangle, label: "Repositories" }
    end
    FamilyAchievements.Db@{ shape: disk, label: "Database" }
  end
  TelegramCloud@{ shape: rectangle, label: "Telegram" }
  Member -. "\`команды в чате, личные сообщения\`" .-> TelegramCloud
  Admin -. "\`управление через бота\`" .-> TelegramCloud
  FamilyAchievements.Bot.PrivateHandlers -. "\`submit / approve / reject\`" .-> FamilyAchievements.Api.ClaimService
  FamilyAchievements.Api.ClaimService -. "\`claim CRUD\`" .-> FamilyAchievements.Api.Repos
  FamilyAchievements.Api.Repos -. "\`SQL\`" .-> FamilyAchievements.Db
  FamilyAchievements.Bot -. "\`SQL (shared SQLAlchemy engine)\`" .-> FamilyAchievements.Db
`;case"__member":return`---
title: "Участник"
---
graph TB
  Member@{ icon: "fa:user", shape: rounded, label: "Участник" }
  TelegramCloud@{ shape: rectangle, label: "Telegram" }
  FamilyAchievements@{ shape: rectangle, label: "Family Achievements" }
  Member -. "\`команды в чате, личные сообщения\`" .-> TelegramCloud
  Member -. "\`просматривает прогресс\`" .-> FamilyAchievements
`;case"__admin":return`---
title: "Администратор"
---
graph TB
  Admin@{ icon: "fa:user", shape: rounded, label: "Администратор" }
  TelegramCloud@{ shape: rectangle, label: "Telegram" }
  FamilyAchievements@{ shape: rectangle, label: "Family Achievements" }
  Admin -. "\`управление через бота\`" .-> TelegramCloud
  Admin -. "\`агрегированное дерево группы\`" .-> FamilyAchievements
`;case"__telegramCloud":return`---
title: "Telegram"
---
graph TB
  Member@{ icon: "fa:user", shape: rounded, label: "Участник" }
  Admin@{ icon: "fa:user", shape: rounded, label: "Администратор" }
  FamilyAchievements@{ shape: rectangle, label: "Family Achievements" }
  TelegramCloud@{ shape: rectangle, label: "Telegram" }
  Member -. "\`команды в чате, личные сообщения\`" .-> TelegramCloud
  Admin -. "\`управление через бота\`" .-> TelegramCloud
  FamilyAchievements -. "\`sendMessage / editMessage\`" .-> TelegramCloud
  TelegramCloud -. "\`updates (long-polling)\`" .-> FamilyAchievements
`;case"__familyAchievements_db":return`---
title: "Database"
---
graph TB
  FamilyAchievementsBot@{ shape: rectangle, label: "Telegram Bot" }
  FamilyAchievementsApi@{ shape: rectangle, label: "REST API & Frontend" }
  FamilyAchievementsDb@{ shape: disk, label: "Database" }
  FamilyAchievementsBot -. "\`SQL (shared SQLAlchemy engine)\`" .-> FamilyAchievementsDb
  FamilyAchievementsApi -. "\`SQL\`" .-> FamilyAchievementsDb
`;case"__familyAchievements_bot_groupHandlers":return`---
title: "Group Handlers"
---
graph TB
  FamilyAchievementsBotGroupHandlers@{ shape: rectangle, label: "Group Handlers" }
  FamilyAchievementsApi@{ shape: rectangle, label: "REST API & Frontend" }
  FamilyAchievementsBotKeyboards@{ shape: rectangle, label: "Keyboards" }
  FamilyAchievementsBotGroupHandlers -. "\`читает участников и ачивки\`" .-> FamilyAchievementsApi
  FamilyAchievementsBotGroupHandlers -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
`;case"__familyAchievements_bot_privateHandlers":return`---
title: "Private Handlers"
---
graph TB
  FamilyAchievementsBotPrivateHandlers@{ shape: rectangle, label: "Private Handlers" }
  FamilyAchievementsApi@{ shape: rectangle, label: "REST API & Frontend" }
  FamilyAchievementsBotKeyboards@{ shape: rectangle, label: "Keyboards" }
  FamilyAchievementsBotPrivateHandlers -. "\`[...]\`" .-> FamilyAchievementsApi
  FamilyAchievementsBotPrivateHandlers -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
`;case"__familyAchievements_bot_adminPanel":return`---
title: "Admin Panel"
---
graph TB
  FamilyAchievementsBotAdminPanel@{ shape: rectangle, label: "Admin Panel" }
  FamilyAchievementsApi@{ shape: rectangle, label: "REST API & Frontend" }
  FamilyAchievementsBotKeyboards@{ shape: rectangle, label: "Keyboards" }
  FamilyAchievementsBotAdminPanel -. "\`CRUD ачивок и категорий\`" .-> FamilyAchievementsApi
  FamilyAchievementsBotAdminPanel -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
`;case"__familyAchievements_bot_keyboards":return`---
title: "Keyboards"
---
graph TB
  FamilyAchievementsBotGroupHandlers@{ shape: rectangle, label: "Group Handlers" }
  FamilyAchievementsBotPrivateHandlers@{ shape: rectangle, label: "Private Handlers" }
  FamilyAchievementsBotAdminPanel@{ shape: rectangle, label: "Admin Panel" }
  FamilyAchievementsBotKeyboards@{ shape: rectangle, label: "Keyboards" }
  FamilyAchievementsBotGroupHandlers -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
  FamilyAchievementsBotPrivateHandlers -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
  FamilyAchievementsBotAdminPanel -. "\`строит клавиатуры\`" .-> FamilyAchievementsBotKeyboards
`;case"__familyAchievements_api_restEndpoints":return`---
title: "REST Endpoints"
---
graph TB
  FamilyAchievementsApiRestEndpoints@{ shape: rectangle, label: "REST Endpoints" }
  FamilyAchievementsApiAchievementService@{ shape: rectangle, label: "Achievement Service" }
  FamilyAchievementsApiRepos@{ shape: rectangle, label: "Repositories" }
  FamilyAchievementsApiRestEndpoints -. "\`tree / aggregate\`" .-> FamilyAchievementsApiAchievementService
  FamilyAchievementsApiRestEndpoints -. "\`groups, members, categories\`" .-> FamilyAchievementsApiRepos
`;case"__familyAchievements_api_achievementService":return`---
title: "Achievement Service"
---
graph TB
  FamilyAchievementsBot@{ shape: rectangle, label: "Telegram Bot" }
  FamilyAchievementsApiRestEndpoints@{ shape: rectangle, label: "REST Endpoints" }
  FamilyAchievementsApiAchievementService@{ shape: rectangle, label: "Achievement Service" }
  FamilyAchievementsApiRepos@{ shape: rectangle, label: "Repositories" }
  FamilyAchievementsBot -. "\`get_user_achievements_by_status\`" .-> FamilyAchievementsApiAchievementService
  FamilyAchievementsApiRestEndpoints -. "\`tree / aggregate\`" .-> FamilyAchievementsApiAchievementService
  FamilyAchievementsApiAchievementService -. "\`compute_achievement_status\`" .-> FamilyAchievementsApiRepos
`;case"__familyAchievements_api_claimService":return`---
title: "Claim Service"
---
graph TB
  FamilyAchievementsBot@{ shape: rectangle, label: "Telegram Bot" }
  FamilyAchievementsApiClaimService@{ shape: rectangle, label: "Claim Service" }
  FamilyAchievementsApiRepos@{ shape: rectangle, label: "Repositories" }
  FamilyAchievementsBot -. "\`submit / approve / reject\`" .-> FamilyAchievementsApiClaimService
  FamilyAchievementsApiClaimService -. "\`claim CRUD\`" .-> FamilyAchievementsApiRepos
`;case"__familyAchievements_api_adminService":return`---
title: "Admin Service"
---
graph TB
  FamilyAchievementsBot@{ shape: rectangle, label: "Telegram Bot" }
  FamilyAchievementsApiAdminService@{ shape: rectangle, label: "Admin Service" }
  FamilyAchievementsApiRepos@{ shape: rectangle, label: "Repositories" }
  FamilyAchievementsBot -. "\`CRUD ачивок и категорий\`" .-> FamilyAchievementsApiAdminService
  FamilyAchievementsApiAdminService -. "\`achievement / category CRUD\`" .-> FamilyAchievementsApiRepos
`;case"__familyAchievements_api_repos":return`---
title: "Repositories"
---
graph TB
  FamilyAchievementsBot@{ shape: rectangle, label: "Telegram Bot" }
  FamilyAchievementsApiRestEndpoints@{ shape: rectangle, label: "REST Endpoints" }
  FamilyAchievementsApiAchievementService@{ shape: rectangle, label: "Achievement Service" }
  FamilyAchievementsApiClaimService@{ shape: rectangle, label: "Claim Service" }
  FamilyAchievementsApiAdminService@{ shape: rectangle, label: "Admin Service" }
  FamilyAchievementsApiRepos@{ shape: rectangle, label: "Repositories" }
  FamilyAchievementsDb@{ shape: disk, label: "Database" }
  FamilyAchievementsBot -. "\`читает участников и ачивки\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiRestEndpoints -. "\`groups, members, categories\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiAchievementService -. "\`compute_achievement_status\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiClaimService -. "\`claim CRUD\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiAdminService -. "\`achievement / category CRUD\`" .-> FamilyAchievementsApiRepos
  FamilyAchievementsApiRepos -. "\`SQL\`" .-> FamilyAchievementsDb
`;case"__familyAchievements_api_frontend":return`---
title: "Web Frontend"
---
graph TB
  Member@{ icon: "fa:user", shape: rounded, label: "Участник" }
  Admin@{ icon: "fa:user", shape: rounded, label: "Администратор" }
  subgraph FamilyAchievementsApi["\`REST API & Frontend\`"]
    FamilyAchievementsApi.Frontend@{ shape: rectangle, label: "Web Frontend" }
  end
  Member -. "\`просматривает прогресс\`" .-> FamilyAchievementsApi.Frontend
  Admin -. "\`агрегированное дерево группы\`" .-> FamilyAchievementsApi.Frontend
`;default:throw new Error("Unknown viewId: "+e)}}const W5=Object.freeze(Object.defineProperty({__proto__:null,mmdSource:K5},Symbol.toStringTag,{value:"Module"}));function X5(e){switch(e){case"index":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=index,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    member [color="#2d5d39",
        fillcolor="#428a4f",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Участник</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#c2f0c2">Член семьи. Подаёт заявки на ачивки,<BR/>просматривает прогресс в боте и браузере.</FONT></TD></TR></TABLE>>,
        likec4_id=member,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    telegramcloud [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Telegram Bot API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Telegram Bot API. Доставляет updates<BR/>(long-polling).</FONT></TD></TR></TABLE>>,
        likec4_id=telegramCloud,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">команды в чате, личные сообщения</FONT></TD></TR></TABLE>>,
        likec4_id="1c7wxyi",
        style=dashed];
    familyachievements [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Family Achievements</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Telegram-бот + REST API + веб-интерфейс для<BR/>отслеживания семейных достижений.</FONT></TD></TR></TABLE>>,
        likec4_id=familyAchievements,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> familyachievements [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">просматривает прогресс</FONT></TD></TR></TABLE>>,
        likec4_id="1c8f41k",
        style=dashed];
    admin [color="#853A2D",
        fillcolor="#AC4D39",
        fontcolor="#FBD3CB",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Администратор</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f5b2a3">Член семьи с правами admin. Одобряет /<BR/>отклоняет заявки, регистрирует группу,<BR/>управляет ачивками.</FONT></TD></TR></TABLE>>,
        likec4_id=admin,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    admin -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">управление через бота</FONT></TD></TR></TABLE>>,
        likec4_id="1g67cnp",
        style=dashed];
    admin -> familyachievements [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">агрегированное дерево группы</FONT></TD></TR></TABLE>>,
        likec4_id="17an1j",
        style=dashed];
    telegramcloud -> familyachievements [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">updates (long-polling)</FONT></TD></TR></TABLE>>,
        likec4_id=ti0fiw,
        style=dashed];
    familyachievements -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">sendMessage / editMessage</FONT></TD></TR></TABLE>>,
        likec4_id=q4a714,
        style=dashed];
}
`;case"containers":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=containers,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        label="\\N",
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    bot [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram Bot</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, python-telegram-bot v21</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Обрабатывает команды в групповых чатах и<BR/>ведёт личные диалоги (12 состояний<BR/>ConversationHandler).</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    api [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST API &amp; Frontend</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, FastAPI, Uvicorn</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">FastAPI + Uvicorn :8000. REST-эндпоинты и<BR/>статика фронтенда.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    bot -> api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id="1u39wwb",
        style=dashed,
        weight=2];
    telegramcloud [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Telegram Bot API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Telegram Bot API. Доставляет updates<BR/>(long-polling).</FONT></TD></TR></TABLE>>,
        likec4_id=telegramCloud,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    bot -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">sendMessage / editMessage</FONT></TD></TR></TABLE>>,
        likec4_id=uel78v,
        style=dashed];
    db [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Database</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">users, groups, group_members, categories,<BR/>achievements, achievement_prerequisites<BR/>(DAG), group_user_achievements,<BR/>achievement_claims, achievement_events</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.db",
        likec4_level=0,
        margin="0.223,0",
        penwidth=2,
        shape=cylinder,
        width=4.445];
    bot -> db [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">SQL (shared SQLAlchemy engine)</FONT></TD></TR></TABLE>>,
        likec4_id="1b7cp91",
        style=dashed,
        weight=2];
    member [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Участник</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи. Подаёт заявки на ачивки,<BR/>просматривает прогресс в боте и браузере.</FONT></TD></TR></TABLE>>,
        likec4_id=member,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">просматривает прогресс</FONT></TD></TR></TABLE>>,
        likec4_id=ui1qr2,
        style=dashed];
    member -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">команды в чате, личные сообщения</FONT></TD></TR></TABLE>>,
        likec4_id="1c7wxyi",
        style=dashed,
        weight=2];
    admin [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Администратор</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи с правами admin. Одобряет /<BR/>отклоняет заявки, регистрирует группу,<BR/>управляет ачивками.</FONT></TD></TR></TABLE>>,
        likec4_id=admin,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    admin -> api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">агрегированное дерево группы</FONT></TD></TR></TABLE>>,
        likec4_id=nivhgx,
        style=dashed];
    admin -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">управление через бота</FONT></TD></TR></TABLE>>,
        likec4_id="1g67cnp",
        style=dashed,
        weight=2];
    api -> db [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">SQL</FONT></TD></TR></TABLE>>,
        likec4_id=xrk7n8,
        style=dashed,
        weight=2];
    telegramcloud -> bot [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">updates (long-polling)</FONT></TD></TR></TABLE>>,
        likec4_id="1xo62wf",
        style=dashed];
}
`;case"botComponents":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=botComponents,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    grouphandlers [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Group Handlers</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">CommandHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">/register /join /members /achievements<BR/>/progress /web</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.groupHandlers",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    keyboards [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Keyboards</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">PTB InlineKeyboardMarkup</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Построители всех InlineKeyboardMarkup</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.keyboards",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    grouphandlers -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="10xtbds",
        minlen=1,
        style=dashed];
    privatehandlers [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Private Handlers</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">ConversationHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Просмотр ачивок, подача заявок,<BR/>рецензирование (states 0-3)</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.privateHandlers",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    privatehandlers -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="1bkvqj6",
        minlen=1,
        style=dashed];
    adminpanel [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Admin Panel</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">ConversationHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">CRUD категорий и ачивок, мастер создания,<BR/>управление пресреквизитами с DFS cycle<BR/>detection (states 4-11)</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.adminPanel",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    adminpanel -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="1tro9t9",
        minlen=1,
        style=dashed];
    db [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Database</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">users, groups, group_members, categories,<BR/>achievements, achievement_prerequisites<BR/>(DAG), group_user_achievements,<BR/>achievement_claims, achievement_events</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.db",
        likec4_level=0,
        margin="0.223,0",
        penwidth=2,
        shape=cylinder,
        width=4.445];
}
`;case"apiComponents":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=apiComponents,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=LR,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    restendpoints [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST Endpoints</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">FastAPI Router</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">GET /api/groups, /members, /users/{id}/tree,<BR/>/tree/aggregate, /categories</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.restEndpoints",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    achievementservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Achievement Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">get_user_tree_graph,<BR/>get_group_aggregate_tree. Статус ачивки<BR/>вычисляется лениво — без фоновых задач.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.achievementService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    restendpoints -> achievementservice [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tree / aggregate</FONT></TD></TR></TABLE>>,
        likec4_id=ih6epc,
        style=dashed];
    repos [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Repositories</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy 2.0 async, selectinload</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">user_repo, group_repo, achievement_repo,<BR/>claim_repo, admin_repo</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.repos",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    restendpoints -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">groups, members, categories</FONT></TD></TR></TABLE>>,
        likec4_id="164vvld",
        style=dashed,
        weight=2];
    claimservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Claim Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">submit_claim, approve_claim, reject_claim.<BR/>Транзакция в БД → уведомление через бота.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.claimService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    claimservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">claim CRUD</FONT></TD></TR></TABLE>>,
        likec4_id="11j4tdy",
        minlen=1,
        style=dashed,
        weight=2];
    adminservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Admin Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Безопасные CRUD-обёртки для категорий и<BR/>ачивок, toggle prerequisite с cycle<BR/>detection.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.adminService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    adminservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">achievement / category CRUD</FONT></TD></TR></TABLE>>,
        likec4_id="1m9ligz",
        minlen=1,
        style=dashed,
        weight=2];
    member [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Участник</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи. Подаёт заявки на ачивки,<BR/>просматривает прогресс в боте и браузере.</FONT></TD></TR></TABLE>>,
        likec4_id=member,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    frontend [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Web Frontend</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">Vanilla JS, Cytoscape.js, cytoscape-dagre</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">SPA: каталог групп, дерево ачивок, фильтры,<BR/>детальная панель.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.frontend",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> frontend [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">просматривает прогресс</FONT></TD></TR></TABLE>>,
        likec4_id="1eq1rou",
        minlen=1,
        style=dashed];
    admin [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Администратор</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи с правами admin. Одобряет /<BR/>отклоняет заявки, регистрирует группу,<BR/>управляет ачивками.</FONT></TD></TR></TABLE>>,
        likec4_id=admin,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    admin -> frontend [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">агрегированное дерево группы</FONT></TD></TR></TABLE>>,
        likec4_id="1hgima9",
        minlen=1,
        style=dashed];
    achievementservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">compute_achievement_status</FONT></TD></TR></TABLE>>,
        likec4_id="13i14qz",
        style=dashed,
        weight=2];
    db [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Database</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">users, groups, group_members, categories,<BR/>achievements, achievement_prerequisites<BR/>(DAG), group_user_achievements,<BR/>achievement_claims, achievement_events</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.db",
        likec4_level=0,
        margin="0.223,0",
        penwidth=2,
        shape=cylinder,
        width=4.445];
    repos -> db [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">SQL</FONT></TD></TR></TABLE>>,
        likec4_id=ee7e75,
        minlen=1,
        style=dashed];
}
`;case"claimFlow":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=claimFlow,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    subgraph cluster_familyachievements {
        graph [color="#1c3979",
            fillcolor="#1a468d",
            label=<<FONT POINT-SIZE="11" COLOR="#bfdbfeb3"><B>FAMILY ACHIEVEMENTS</B></FONT>>,
            likec4_depth=2,
            likec4_id=familyAchievements,
            likec4_level=0,
            margin=40,
            style=filled
        ];
        subgraph cluster_bot {
            graph [color="#0b3c57",
                fillcolor="#0d4b6c",
                label=<<FONT POINT-SIZE="11" COLOR="#b6ecf7b3"><B>TELEGRAM BOT</B></FONT>>,
                likec4_depth=1,
                likec4_id="familyAchievements.bot",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            privatehandlers [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                group=familyAchievements,
                height=2.5,
                label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Private Handlers</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">ConversationHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Просмотр ачивок, подача заявок,<BR/>рецензирование (states 0-3)</FONT></TD></TR></TABLE>>,
                likec4_id="familyAchievements.bot.privateHandlers",
                likec4_level=2,
                margin="0.223,0.223",
                width=4.445];
            adminpanel [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                height=2.5,
                label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Admin Panel</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">ConversationHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">CRUD категорий и ачивок, мастер создания,<BR/>управление пресреквизитами с DFS cycle<BR/>detection (states 4-11)</FONT></TD></TR></TABLE>>,
                likec4_id="familyAchievements.bot.adminPanel",
                likec4_level=2,
                margin="0.223,0.223",
                width=4.445];
        }
        subgraph cluster_api {
            graph [color="#0b3c57",
                fillcolor="#0d4b6c",
                label=<<FONT POINT-SIZE="11" COLOR="#b6ecf7b3"><B>REST API &amp; FRONTEND</B></FONT>>,
                likec4_depth=1,
                likec4_id="familyAchievements.api",
                likec4_level=1,
                margin=40,
                style=filled
            ];
            claimservice [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                group=familyAchievements,
                height=2.5,
                label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Claim Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">submit_claim, approve_claim, reject_claim.<BR/>Транзакция в БД → уведомление через бота.</FONT></TD></TR></TABLE>>,
                likec4_id="familyAchievements.api.claimService",
                likec4_level=2,
                margin="0.223,0.223",
                width=4.445];
            repos [color="#7E451D",
                fillcolor="#A35829",
                fontcolor="#FFE0C2",
                group=familyAchievements,
                height=2.5,
                label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Repositories</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy 2.0 async, selectinload</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">user_repo, group_repo, achievement_repo,<BR/>claim_repo, admin_repo</FONT></TD></TR></TABLE>>,
                likec4_id="familyAchievements.api.repos",
                likec4_level=2,
                margin="0.223,0.223",
                width=4.445];
        }
        db [color="#475569",
            fillcolor="#64748b",
            fontcolor="#f8fafc",
            group=familyAchievements,
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Database</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">users, groups, group_members, categories,<BR/>achievements, achievement_prerequisites<BR/>(DAG), group_user_achievements,<BR/>achievement_claims, achievement_events</FONT></TD></TR></TABLE>>,
            likec4_id="familyAchievements.db",
            likec4_level=1,
            margin="0.223,0",
            penwidth=2,
            shape=cylinder,
            width=4.445];
    }
    member [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Участник</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи. Подаёт заявки на ачивки,<BR/>просматривает прогресс в боте и браузере.</FONT></TD></TR></TABLE>>,
        likec4_id=member,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    telegramcloud [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Telegram Bot API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Telegram Bot API. Доставляет updates<BR/>(long-polling).</FONT></TD></TR></TABLE>>,
        likec4_id=telegramCloud,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">команды в чате, личные сообщения</FONT></TD></TR></TABLE>>,
        likec4_id="1c7wxyi",
        minlen=1,
        style=dashed];
    admin [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Администратор</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи с правами admin. Одобряет /<BR/>отклоняет заявки, регистрирует группу,<BR/>управляет ачивками.</FONT></TD></TR></TABLE>>,
        likec4_id=admin,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    admin -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">управление через бота</FONT></TD></TR></TABLE>>,
        likec4_id="1g67cnp",
        minlen=1,
        style=dashed];
    privatehandlers -> claimservice [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">submit / approve / reject</FONT></TD></TR></TABLE>>,
        likec4_id="2r7apm",
        minlen=1,
        style=dashed];
    adminpanel -> db [arrowhead=normal,
        likec4_id="1b7cp91",
        ltail=cluster_bot,
        minlen=1,
        style=dashed,
        weight=2,
        xlabel=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">SQL (shared SQLAlchemy engine)</FONT></TD></TR></TABLE>>];
    claimservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">claim CRUD</FONT></TD></TR></TABLE>>,
        likec4_id="11j4tdy",
        minlen=0,
        style=dashed,
        weight=3];
    repos -> db [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">SQL</FONT></TD></TR></TABLE>>,
        likec4_id=ee7e75,
        style=dashed];
}
`;case"__member":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__member,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    member [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Участник</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи. Подаёт заявки на ачивки,<BR/>просматривает прогресс в боте и браузере.</FONT></TD></TR></TABLE>>,
        likec4_id=member,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    telegramcloud [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Telegram Bot API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Telegram Bot API. Доставляет updates<BR/>(long-polling).</FONT></TD></TR></TABLE>>,
        likec4_id=telegramCloud,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">команды в чате, личные сообщения</FONT></TD></TR></TABLE>>,
        likec4_id="1c7wxyi",
        minlen=1,
        style=dashed];
    familyachievements [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Family Achievements</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Telegram-бот + REST API + веб-интерфейс для<BR/>отслеживания семейных достижений.</FONT></TD></TR></TABLE>>,
        likec4_id=familyAchievements,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> familyachievements [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">просматривает прогресс</FONT></TD></TR></TABLE>>,
        likec4_id="1c8f41k",
        minlen=1,
        style=dashed];
}
`;case"__admin":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__admin,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    admin [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Администратор</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи с правами admin. Одобряет /<BR/>отклоняет заявки, регистрирует группу,<BR/>управляет ачивками.</FONT></TD></TR></TABLE>>,
        likec4_id=admin,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    telegramcloud [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Telegram Bot API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Telegram Bot API. Доставляет updates<BR/>(long-polling).</FONT></TD></TR></TABLE>>,
        likec4_id=telegramCloud,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    admin -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">управление через бота</FONT></TD></TR></TABLE>>,
        likec4_id="1g67cnp",
        minlen=1,
        style=dashed];
    familyachievements [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Family Achievements</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Telegram-бот + REST API + веб-интерфейс для<BR/>отслеживания семейных достижений.</FONT></TD></TR></TABLE>>,
        likec4_id=familyAchievements,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    admin -> familyachievements [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">агрегированное дерево группы</FONT></TD></TR></TABLE>>,
        likec4_id="17an1j",
        minlen=1,
        style=dashed];
}
`;case"__telegramCloud":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__telegramCloud,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    member [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Участник</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи. Подаёт заявки на ачивки,<BR/>просматривает прогресс в боте и браузере.</FONT></TD></TR></TABLE>>,
        likec4_id=member,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    telegramcloud [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Telegram Bot API</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Telegram Bot API. Доставляет updates<BR/>(long-polling).</FONT></TD></TR></TABLE>>,
        likec4_id=telegramCloud,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">команды в чате, личные сообщения</FONT></TD></TR></TABLE>>,
        likec4_id="1c7wxyi",
        minlen=1,
        style=dashed];
    admin [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Администратор</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи с правами admin. Одобряет /<BR/>отклоняет заявки, регистрирует группу,<BR/>управляет ачивками.</FONT></TD></TR></TABLE>>,
        likec4_id=admin,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    admin -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">управление через бота</FONT></TD></TR></TABLE>>,
        likec4_id="1g67cnp",
        minlen=1,
        style=dashed];
    familyachievements [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Family Achievements</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Telegram-бот + REST API + веб-интерфейс для<BR/>отслеживания семейных достижений.</FONT></TD></TR></TABLE>>,
        likec4_id=familyAchievements,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    familyachievements -> telegramcloud [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">sendMessage / editMessage</FONT></TD></TR></TABLE>>,
        likec4_id=q4a714,
        style=dashed];
    telegramcloud -> familyachievements [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">updates (long-polling)</FONT></TD></TR></TABLE>>,
        likec4_id=ti0fiw,
        style=dashed];
}
`;case"__familyAchievements_db":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_db,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    bot [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram Bot</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, python-telegram-bot v21</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Обрабатывает команды в групповых чатах и<BR/>ведёт личные диалоги (12 состояний<BR/>ConversationHandler).</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    db [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Database</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">users, groups, group_members, categories,<BR/>achievements, achievement_prerequisites<BR/>(DAG), group_user_achievements,<BR/>achievement_claims, achievement_events</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.db",
        likec4_level=0,
        margin="0.223,0",
        penwidth=2,
        shape=cylinder,
        width=4.445];
    bot -> db [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">SQL (shared SQLAlchemy engine)</FONT></TD></TR></TABLE>>,
        likec4_id="1b7cp91",
        minlen=1,
        style=dashed];
    api [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST API &amp; Frontend</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, FastAPI, Uvicorn</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">FastAPI + Uvicorn :8000. REST-эндпоинты и<BR/>статика фронтенда.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    api -> db [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">SQL</FONT></TD></TR></TABLE>>,
        likec4_id=xrk7n8,
        minlen=1,
        style=dashed];
}
`;case"__familyAchievements_bot_groupHandlers":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_bot_groupHandlers,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    grouphandlers [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Group Handlers</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">CommandHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">/register /join /members /achievements<BR/>/progress /web</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.groupHandlers",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    api [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST API &amp; Frontend</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, FastAPI, Uvicorn</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">FastAPI + Uvicorn :8000. REST-эндпоинты и<BR/>статика фронтенда.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    grouphandlers -> api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">читает участников и ачивки</FONT></TD></TR></TABLE>>,
        likec4_id="1t3r5ch",
        minlen=1,
        style=dashed];
    keyboards [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Keyboards</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">PTB InlineKeyboardMarkup</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Построители всех InlineKeyboardMarkup</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.keyboards",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    grouphandlers -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="10xtbds",
        minlen=1,
        style=dashed,
        weight=2];
}
`;case"__familyAchievements_bot_privateHandlers":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_bot_privateHandlers,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    privatehandlers [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Private Handlers</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">ConversationHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Просмотр ачивок, подача заявок,<BR/>рецензирование (states 0-3)</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.privateHandlers",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    api [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST API &amp; Frontend</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, FastAPI, Uvicorn</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">FastAPI + Uvicorn :8000. REST-эндпоинты и<BR/>статика фронтенда.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    privatehandlers -> api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14"><B>[...]</B></FONT></TD></TR></TABLE>>,
        likec4_id=nd3yoz,
        minlen=1,
        style=dashed];
    keyboards [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Keyboards</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">PTB InlineKeyboardMarkup</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Построители всех InlineKeyboardMarkup</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.keyboards",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    privatehandlers -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="1bkvqj6",
        minlen=1,
        style=dashed,
        weight=2];
}
`;case"__familyAchievements_bot_adminPanel":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_bot_adminPanel,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    adminpanel [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Admin Panel</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">ConversationHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">CRUD категорий и ачивок, мастер создания,<BR/>управление пресреквизитами с DFS cycle<BR/>detection (states 4-11)</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.adminPanel",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    api [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST API &amp; Frontend</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, FastAPI, Uvicorn</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">FastAPI + Uvicorn :8000. REST-эндпоинты и<BR/>статика фронтенда.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    adminpanel -> api [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">CRUD ачивок и категорий</FONT></TD></TR></TABLE>>,
        likec4_id=b3k0yk,
        minlen=1,
        style=dashed];
    keyboards [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Keyboards</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">PTB InlineKeyboardMarkup</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Построители всех InlineKeyboardMarkup</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.keyboards",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    adminpanel -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="1tro9t9",
        minlen=1,
        style=dashed,
        weight=2];
}
`;case"__familyAchievements_bot_keyboards":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_bot_keyboards,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    grouphandlers [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Group Handlers</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">CommandHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">/register /join /members /achievements<BR/>/progress /web</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.groupHandlers",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    keyboards [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Keyboards</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">PTB InlineKeyboardMarkup</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Построители всех InlineKeyboardMarkup</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.keyboards",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    grouphandlers -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="10xtbds",
        minlen=1,
        style=dashed];
    privatehandlers [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Private Handlers</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">ConversationHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Просмотр ачивок, подача заявок,<BR/>рецензирование (states 0-3)</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.privateHandlers",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    privatehandlers -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="1bkvqj6",
        minlen=1,
        style=dashed];
    adminpanel [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Admin Panel</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">ConversationHandler</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">CRUD категорий и ачивок, мастер создания,<BR/>управление пресреквизитами с DFS cycle<BR/>detection (states 4-11)</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot.adminPanel",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    adminpanel -> keyboards [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">строит клавиатуры</FONT></TD></TR></TABLE>>,
        likec4_id="1tro9t9",
        minlen=1,
        style=dashed];
}
`;case"__familyAchievements_api_restEndpoints":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_api_restEndpoints,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    restendpoints [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST Endpoints</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">FastAPI Router</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">GET /api/groups, /members, /users/{id}/tree,<BR/>/tree/aggregate, /categories</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.restEndpoints",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    achievementservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Achievement Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">get_user_tree_graph,<BR/>get_group_aggregate_tree. Статус ачивки<BR/>вычисляется лениво — без фоновых задач.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.achievementService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    restendpoints -> achievementservice [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tree / aggregate</FONT></TD></TR></TABLE>>,
        likec4_id=ih6epc,
        minlen=1,
        style=dashed];
    repos [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Repositories</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy 2.0 async, selectinload</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">user_repo, group_repo, achievement_repo,<BR/>claim_repo, admin_repo</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.repos",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    restendpoints -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">groups, members, categories</FONT></TD></TR></TABLE>>,
        likec4_id="164vvld",
        minlen=1,
        style=dashed];
}
`;case"__familyAchievements_api_achievementService":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_api_achievementService,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    bot [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram Bot</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, python-telegram-bot v21</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Обрабатывает команды в групповых чатах и<BR/>ведёт личные диалоги (12 состояний<BR/>ConversationHandler).</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    achievementservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Achievement Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">get_user_tree_graph,<BR/>get_group_aggregate_tree. Статус ачивки<BR/>вычисляется лениво — без фоновых задач.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.achievementService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    bot -> achievementservice [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">get_user_achievements_by_status</FONT></TD></TR></TABLE>>,
        likec4_id="16q92nz",
        minlen=1,
        style=dashed];
    restendpoints [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST Endpoints</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">FastAPI Router</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">GET /api/groups, /members, /users/{id}/tree,<BR/>/tree/aggregate, /categories</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.restEndpoints",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    restendpoints -> achievementservice [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">tree / aggregate</FONT></TD></TR></TABLE>>,
        likec4_id=ih6epc,
        minlen=1,
        style=dashed,
        weight=2];
    repos [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Repositories</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy 2.0 async, selectinload</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">user_repo, group_repo, achievement_repo,<BR/>claim_repo, admin_repo</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.repos",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    achievementservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">compute_achievement_status</FONT></TD></TR></TABLE>>,
        likec4_id="13i14qz",
        minlen=1,
        style=dashed,
        weight=2];
}
`;case"__familyAchievements_api_claimService":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_api_claimService,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    bot [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram Bot</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, python-telegram-bot v21</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Обрабатывает команды в групповых чатах и<BR/>ведёт личные диалоги (12 состояний<BR/>ConversationHandler).</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    claimservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Claim Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">submit_claim, approve_claim, reject_claim.<BR/>Транзакция в БД → уведомление через бота.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.claimService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    bot -> claimservice [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">submit / approve / reject</FONT></TD></TR></TABLE>>,
        likec4_id="1w09xw2",
        minlen=1,
        style=dashed];
    repos [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Repositories</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy 2.0 async, selectinload</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">user_repo, group_repo, achievement_repo,<BR/>claim_repo, admin_repo</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.repos",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    claimservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">claim CRUD</FONT></TD></TR></TABLE>>,
        likec4_id="11j4tdy",
        minlen=1,
        style=dashed,
        weight=2];
}
`;case"__familyAchievements_api_adminService":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_api_adminService,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    bot [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram Bot</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, python-telegram-bot v21</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Обрабатывает команды в групповых чатах и<BR/>ведёт личные диалоги (12 состояний<BR/>ConversationHandler).</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    adminservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Admin Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Безопасные CRUD-обёртки для категорий и<BR/>ачивок, toggle prerequisite с cycle<BR/>detection.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.adminService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    bot -> adminservice [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">CRUD ачивок и категорий</FONT></TD></TR></TABLE>>,
        likec4_id=lm89br,
        minlen=1,
        style=dashed];
    repos [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Repositories</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy 2.0 async, selectinload</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">user_repo, group_repo, achievement_repo,<BR/>claim_repo, admin_repo</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.repos",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    adminservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">achievement / category CRUD</FONT></TD></TR></TABLE>>,
        likec4_id="1m9ligz",
        minlen=1,
        style=dashed,
        weight=2];
}
`;case"__familyAchievements_api_repos":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_api_repos,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    bot [color="#0369a1",
        fillcolor="#0284c7",
        fontcolor="#f0f9ff",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Telegram Bot</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#B6ECF7">Python 3.12, python-telegram-bot v21</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#B6ECF7">Обрабатывает команды в групповых чатах и<BR/>ведёт личные диалоги (12 состояний<BR/>ConversationHandler).</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.bot",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    repos [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Repositories</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy 2.0 async, selectinload</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">user_repo, group_repo, achievement_repo,<BR/>claim_repo, admin_repo</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.repos",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    bot -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">читает участников и ачивки</FONT></TD></TR></TABLE>>,
        likec4_id="1f80hzy",
        minlen=1,
        style=dashed];
    restendpoints [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">REST Endpoints</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">FastAPI Router</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">GET /api/groups, /members, /users/{id}/tree,<BR/>/tree/aggregate, /categories</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.restEndpoints",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    restendpoints -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">groups, members, categories</FONT></TD></TR></TABLE>>,
        likec4_id="164vvld",
        minlen=1,
        style=dashed,
        weight=2];
    achievementservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Achievement Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">get_user_tree_graph,<BR/>get_group_aggregate_tree. Статус ачивки<BR/>вычисляется лениво — без фоновых задач.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.achievementService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    achievementservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">compute_achievement_status</FONT></TD></TR></TABLE>>,
        likec4_id="13i14qz",
        minlen=1,
        style=dashed,
        weight=2];
    claimservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Claim Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">submit_claim, approve_claim, reject_claim.<BR/>Транзакция в БД → уведомление через бота.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.claimService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    claimservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">claim CRUD</FONT></TD></TR></TABLE>>,
        likec4_id="11j4tdy",
        minlen=1,
        style=dashed,
        weight=2];
    adminservice [color="#7E451D",
        fillcolor="#A35829",
        fontcolor="#FFE0C2",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Admin Service</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">SQLAlchemy async</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">Безопасные CRUD-обёртки для категорий и<BR/>ачивок, toggle prerequisite с cycle<BR/>detection.</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.api.adminService",
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    adminservice -> repos [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">achievement / category CRUD</FONT></TD></TR></TABLE>>,
        likec4_id="1m9ligz",
        minlen=1,
        style=dashed,
        weight=2];
    db [color="#475569",
        fillcolor="#64748b",
        fontcolor="#f8fafc",
        height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Database</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#cbd5e1">users, groups, group_members, categories,<BR/>achievements, achievement_prerequisites<BR/>(DAG), group_user_achievements,<BR/>achievement_claims, achievement_events</FONT></TD></TR></TABLE>>,
        likec4_id="familyAchievements.db",
        likec4_level=0,
        margin="0.223,0",
        penwidth=2,
        shape=cylinder,
        width=4.445];
    repos -> db [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">SQL</FONT></TD></TR></TABLE>>,
        likec4_id=ee7e75,
        minlen=1,
        style=dashed];
}
`;case"__familyAchievements_api_frontend":return`digraph {
    graph [TBbalance=min,
        bgcolor=transparent,
        compound=true,
        fontname=Arial,
        fontsize=20,
        labeljust=l,
        labelloc=t,
        layout=dot,
        likec4_viewId=__familyAchievements_api_frontend,
        nodesep=1.528,
        outputorder=nodesfirst,
        pad=0.209,
        rankdir=TB,
        ranksep=1.667,
        splines=spline
    ];
    node [color="#2563eb",
        fillcolor="#3b82f6",
        fontcolor="#eff6ff",
        fontname=Arial,
        penwidth=0,
        shape=rect,
        style=filled
    ];
    edge [arrowsize=0.75,
        color="#8D8D8D",
        fontcolor="#C9C9C9",
        fontname=Arial,
        fontsize=14,
        penwidth=2
    ];
    subgraph cluster_api {
        graph [color="#0b3c57",
            fillcolor="#0d4b6c",
            label=<<FONT POINT-SIZE="11" COLOR="#b6ecf7b3"><B>REST API &amp; FRONTEND</B></FONT>>,
            likec4_depth=1,
            likec4_id="familyAchievements.api",
            likec4_level=0,
            margin=32,
            style=filled
        ];
        frontend [color="#7E451D",
            fillcolor="#A35829",
            fontcolor="#FFE0C2",
            height=2.5,
            label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Web Frontend</FONT></TD></TR><TR><TD><FONT POINT-SIZE="13" COLOR="#f9b27c">Vanilla JS, Cytoscape.js, cytoscape-dagre</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#f9b27c">SPA: каталог групп, дерево ачивок, фильтры,<BR/>детальная панель.</FONT></TD></TR></TABLE>>,
            likec4_id="familyAchievements.api.frontend",
            likec4_level=1,
            margin="0.223,0.223",
            width=4.445];
    }
    member [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Участник</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи. Подаёт заявки на ачивки,<BR/>просматривает прогресс в боте и браузере.</FONT></TD></TR></TABLE>>,
        likec4_id=member,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    member -> frontend [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">просматривает прогресс</FONT></TD></TR></TABLE>>,
        likec4_id="1eq1rou",
        minlen=1,
        style=dashed];
    admin [height=2.5,
        label=<<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="4"><TR><TD><FONT POINT-SIZE="20">Администратор</FONT></TD></TR><TR><TD><FONT POINT-SIZE="15" COLOR="#bfdbfe">Член семьи с правами admin. Одобряет /<BR/>отклоняет заявки, регистрирует группу,<BR/>управляет ачивками.</FONT></TD></TR></TABLE>>,
        likec4_id=admin,
        likec4_level=0,
        margin="0.223,0.223",
        width=4.445];
    admin -> frontend [arrowhead=normal,
        label=<<TABLE BORDER="0" CELLPADDING="3" CELLSPACING="0" BGCOLOR="#18191BA0"><TR><TD ALIGN="TEXT" BALIGN="LEFT"><FONT POINT-SIZE="14">агрегированное дерево группы</FONT></TD></TR></TABLE>>,
        likec4_id="1hgima9",
        minlen=1,
        style=dashed];
}
`;default:throw new Error("Unknown viewId: "+e)}}function Y5(e){switch(e){case"index":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="1025pt" height="856pt"
 viewBox="0.00 0.00 1025.00 856.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 840.65)">
<!-- member -->
<g id="node1" class="node">
<title>member</title>
<polygon fill="#428a4f" stroke="#2d5d39" stroke-width="0" points="356.84,-825.6 0,-825.6 0,-645.6 356.84,-645.6 356.84,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="133.97" y="-749.6" font-family="Arial" font-size="20.00" fill="#f8fafc">Участник</text>
<text xml:space="preserve" text-anchor="start" x="42.98" y="-726.1" font-family="Arial" font-size="15.00" fill="#c2f0c2">Член семьи. Подаёт заявки на ачивки,</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-708.1" font-family="Arial" font-size="15.00" fill="#c2f0c2">просматривает прогресс в боте и браузере.</text>
</g>
<!-- telegramcloud -->
<g id="node2" class="node">
<title>telegramcloud</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="630.44,-502.8 310.4,-502.8 310.4,-322.8 630.44,-322.8 630.44,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="428.18" y="-436.6" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram</text>
<text xml:space="preserve" text-anchor="start" x="419.12" y="-414.9" font-family="Arial" font-size="13.00" fill="#b6ecf7">Telegram Bot API</text>
<text xml:space="preserve" text-anchor="start" x="336.61" y="-393.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">Telegram Bot API. Доставляет updates</text>
<text xml:space="preserve" text-anchor="start" x="424.98" y="-375.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">(long&#45;polling).</text>
</g>
<!-- familyachievements -->
<g id="node3" class="node">
<title>familyachievements</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="594.52,-180 224.32,-180 224.32,0 594.52,0 594.52,-180"/>
<text xml:space="preserve" text-anchor="start" x="314.39" y="-104" font-family="Arial" font-size="20.00" fill="#eff6ff">Family Achievements</text>
<text xml:space="preserve" text-anchor="start" x="244.38" y="-80.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">Telegram&#45;бот + REST API + веб&#45;интерфейс для</text>
<text xml:space="preserve" text-anchor="start" x="278.14" y="-62.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">отслеживания семейных достижений.</text>
</g>
<!-- admin -->
<g id="node4" class="node">
<title>admin</title>
<polygon fill="#ac4d39" stroke="#853a2d" stroke-width="0" points="834.42,-825.6 498.42,-825.6 498.42,-645.6 834.42,-645.6 834.42,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="594.18" y="-758.6" font-family="Arial" font-size="20.00" fill="#fbd3cb">Администратор</text>
<text xml:space="preserve" text-anchor="start" x="525.14" y="-735.1" font-family="Arial" font-size="15.00" fill="#f5b2a3">Член семьи с правами admin. Одобряет /</text>
<text xml:space="preserve" text-anchor="start" x="518.47" y="-717.1" font-family="Arial" font-size="15.00" fill="#f5b2a3">отклоняет заявки, регистрирует группу,</text>
<text xml:space="preserve" text-anchor="start" x="591.41" y="-699.1" font-family="Arial" font-size="15.00" fill="#f5b2a3">управляет ачивками.</text>
</g>
<!-- member&#45;&gt;telegramcloud -->
<g id="edge1" class="edge">
<title>member&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M235.18,-645.91C254.43,-618.23 276.93,-588.3 299.93,-562.8 316.32,-544.64 334.82,-526.5 353.43,-509.44"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="354.81,-511.73 358.6,-504.75 351.28,-507.85 354.81,-511.73"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="299.93,-562.8 299.93,-585.6 535.42,-585.6 535.42,-562.8 299.93,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="302.93" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">команды в чате, личные сообщения</text>
</g>
<!-- member&#45;&gt;familyachievements -->
<g id="edge2" class="edge">
<title>member&#45;&gt;familyachievements</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M123.91,-645.88C78.35,-559.39 28.71,-426.17 82.17,-322.8 111.84,-265.42 162.99,-219.18 216.16,-183.55"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="217.36,-185.9 222.18,-179.58 214.47,-181.52 217.36,-185.9"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="82.17,-401.4 82.17,-424.2 255.42,-424.2 255.42,-401.4 82.17,-401.4"/>
<text xml:space="preserve" text-anchor="start" x="85.17" y="-408.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">просматривает прогресс</text>
</g>
<!-- telegramcloud&#45;&gt;familyachievements -->
<g id="edge5" class="edge">
<title>telegramcloud&#45;&gt;familyachievements</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M310.54,-325.27C290.11,-307.36 272.08,-286.57 259.78,-262.8 246.2,-236.56 253.28,-211.01 270.13,-187.98"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="272.01,-189.82 274.6,-182.31 267.89,-186.57 272.01,-189.82"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="259.78,-240 259.78,-262.8 400.42,-262.8 400.42,-240 259.78,-240"/>
<text xml:space="preserve" text-anchor="start" x="262.78" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">updates (long&#45;polling)</text>
</g>
<!-- familyachievements&#45;&gt;telegramcloud -->
<g id="edge6" class="edge">
<title>familyachievements&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M426.31,-179.83C434.16,-221.1 443.52,-270.33 451.59,-312.79"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="448.96,-313.01 452.94,-319.89 454.12,-312.03 448.96,-313.01"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="441.75,-240 441.75,-262.8 625.96,-262.8 625.96,-240 441.75,-240"/>
<text xml:space="preserve" text-anchor="start" x="444.75" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">sendMessage / editMessage</text>
</g>
<!-- admin&#45;&gt;telegramcloud -->
<g id="edge3" class="edge">
<title>admin&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M612.08,-645.67C586.59,-603.94 556.15,-554.11 530.03,-511.36"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="532.42,-510.24 526.27,-505.21 527.94,-512.98 532.42,-510.24"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="574.3,-562.8 574.3,-585.6 735.88,-585.6 735.88,-562.8 574.3,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="577.3" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">управление через бота</text>
</g>
<!-- admin&#45;&gt;familyachievements -->
<g id="edge4" class="edge">
<title>admin&#45;&gt;familyachievements</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M735.18,-645.65C746.41,-626.77 756.34,-606.26 762.42,-585.6 807.88,-431.09 756.64,-363.63 653.42,-240 636.78,-220.07 616.75,-202.06 595.41,-186.02"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="597.21,-184.09 589.61,-181.76 594.1,-188.32 597.21,-184.09"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="779.08,-401.4 779.08,-424.2 995.12,-424.2 995.12,-401.4 779.08,-401.4"/>
<text xml:space="preserve" text-anchor="start" x="782.08" y="-408.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">агрегированное дерево группы</text>
</g>
</g>
</svg>
`;case"containers":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="2005pt" height="856pt"
 viewBox="0.00 0.00 2005.00 856.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 840.65)">
<!-- bot -->
<g id="node1" class="node">
<title>bot</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="472.46,-825.6 119.79,-825.6 119.79,-645.6 472.46,-645.6 472.46,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="236.1" y="-768.4" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram Bot</text>
<text xml:space="preserve" text-anchor="start" x="187.37" y="-746.7" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, python&#45;telegram&#45;bot v21</text>
<text xml:space="preserve" text-anchor="start" x="139.85" y="-725.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">Обрабатывает команды в групповых чатах и</text>
<text xml:space="preserve" text-anchor="start" x="164.43" y="-707.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ведёт личные диалоги (12 состояний</text>
<text xml:space="preserve" text-anchor="start" x="221.09" y="-689.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ConversationHandler).</text>
</g>
<!-- api -->
<g id="node2" class="node">
<title>api</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="1374.11,-502.8 1030.15,-502.8 1030.15,-322.8 1374.11,-322.8 1374.11,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="1104.31" y="-436.6" font-family="Arial" font-size="20.00" fill="#f0f9ff">REST API &amp; Frontend</text>
<text xml:space="preserve" text-anchor="start" x="1115.06" y="-414.9" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, FastAPI, Uvicorn</text>
<text xml:space="preserve" text-anchor="start" x="1050.2" y="-393.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">FastAPI + Uvicorn :8000. REST&#45;эндпоинты и</text>
<text xml:space="preserve" text-anchor="start" x="1131.28" y="-375.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">статика фронтенда.</text>
</g>
<!-- telegramcloud -->
<g id="node3" class="node">
<title>telegramcloud</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="920.15,-502.8 600.11,-502.8 600.11,-322.8 920.15,-322.8 920.15,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="717.89" y="-436.6" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram</text>
<text xml:space="preserve" text-anchor="start" x="708.83" y="-414.9" font-family="Arial" font-size="13.00" fill="#b6ecf7">Telegram Bot API</text>
<text xml:space="preserve" text-anchor="start" x="626.32" y="-393.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">Telegram Bot API. Доставляет updates</text>
<text xml:space="preserve" text-anchor="start" x="714.69" y="-375.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">(long&#45;polling).</text>
</g>
<!-- db -->
<g id="node4" class="node">
<title>db</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M330.25,-163.64C330.25,-172.67 256.24,-180 165.13,-180 74.01,-180 0,-172.67 0,-163.64 0,-163.64 0,-16.36 0,-16.36 0,-7.33 74.01,0 165.13,0 256.24,0 330.25,-7.33 330.25,-16.36 330.25,-16.36 330.25,-163.64 330.25,-163.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M330.25,-163.64C330.25,-154.61 256.24,-147.27 165.13,-147.27 74.01,-147.27 0,-154.61 0,-163.64"/>
<text xml:space="preserve" text-anchor="start" x="122.32" y="-131.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Database</text>
<text xml:space="preserve" text-anchor="start" x="32.91" y="-110.1" font-family="Arial" font-size="13.00" fill="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-88.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">users, groups, group_members, categories,</text>
<text xml:space="preserve" text-anchor="start" x="25.05" y="-70.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievements, achievement_prerequisites</text>
<text xml:space="preserve" text-anchor="start" x="49.24" y="-52.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">(DAG), group_user_achievements,</text>
<text xml:space="preserve" text-anchor="start" x="24.22" y="-34.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievement_claims, achievement_events</text>
</g>
<!-- member -->
<g id="node5" class="node">
<title>member</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="984.55,-825.6 627.71,-825.6 627.71,-645.6 984.55,-645.6 984.55,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="761.67" y="-749.6" font-family="Arial" font-size="20.00" fill="#eff6ff">Участник</text>
<text xml:space="preserve" text-anchor="start" x="670.68" y="-726.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи. Подаёт заявки на ачивки,</text>
<text xml:space="preserve" text-anchor="start" x="647.76" y="-708.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">просматривает прогресс в боте и браузере.</text>
</g>
<!-- admin -->
<g id="node6" class="node">
<title>admin</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1754.13,-825.6 1418.13,-825.6 1418.13,-645.6 1754.13,-645.6 1754.13,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="1513.89" y="-758.6" font-family="Arial" font-size="20.00" fill="#eff6ff">Администратор</text>
<text xml:space="preserve" text-anchor="start" x="1444.84" y="-735.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи с правами admin. Одобряет /</text>
<text xml:space="preserve" text-anchor="start" x="1438.18" y="-717.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">отклоняет заявки, регистрирует группу,</text>
<text xml:space="preserve" text-anchor="start" x="1511.11" y="-699.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">управляет ачивками.</text>
</g>
<!-- bot&#45;&gt;api -->
<g id="edge1" class="edge">
<title>bot&#45;&gt;api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M472.12,-672.72C505.38,-662.56 540.09,-652.95 573.13,-645.6 778.25,-599.93 855.16,-681.54 1042.13,-585.6 1076.91,-567.75 1108.1,-539.15 1133.49,-510.37"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1135.26,-512.34 1138.18,-504.95 1131.29,-508.91 1135.26,-512.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1074.37,-562.8 1074.37,-585.6 1101.36,-585.6 1101.36,-562.8 1074.37,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="1077.37" y="-571" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- bot&#45;&gt;telegramcloud -->
<g id="edge2" class="edge">
<title>bot&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M228.41,-645.87C215.15,-617.59 210.34,-587.3 228.91,-562.8 272.88,-504.81 451.8,-463.17 589.98,-438.9"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="590.35,-441.5 597.29,-437.62 589.45,-436.32 590.35,-441.5"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="228.91,-562.8 228.91,-585.6 413.13,-585.6 413.13,-562.8 228.91,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="231.91" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">sendMessage / editMessage</text>
</g>
<!-- bot&#45;&gt;db -->
<g id="edge3" class="edge">
<title>bot&#45;&gt;db</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M222.6,-645.99C210.36,-627.08 199.32,-606.48 192.13,-585.6 147.08,-454.92 147.96,-293.37 154.85,-191.22"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="157.45,-191.6 155.36,-183.93 152.21,-191.23 157.45,-191.6"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="169.26,-401.4 169.26,-424.2 390.81,-424.2 390.81,-401.4 169.26,-401.4"/>
<text xml:space="preserve" text-anchor="start" x="172.26" y="-408.6" font-family="Arial" font-size="14.00" fill="#c9c9c9">SQL (shared SQLAlchemy engine)</text>
</g>
<!-- api&#45;&gt;db -->
<g id="edge8" class="edge">
<title>api&#45;&gt;db</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1030.17,-342.41C1011.68,-335.54 993.07,-328.87 975.13,-322.8 759.12,-249.73 505.82,-179.7 340.75,-136.1"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="341.83,-133.67 333.91,-134.29 340.5,-138.74 341.83,-133.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="777.05,-240 777.05,-262.8 811.06,-262.8 811.06,-240 777.05,-240"/>
<text xml:space="preserve" text-anchor="start" x="780.05" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">SQL</text>
</g>
<!-- telegramcloud&#45;&gt;bot -->
<g id="edge9" class="edge">
<title>telegramcloud&#45;&gt;bot</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M631.65,-502.63C569.93,-545.29 495.93,-596.46 433.15,-639.87"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="431.93,-637.52 427.25,-643.94 434.91,-641.84 431.93,-637.52"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="542.04,-562.8 542.04,-585.6 682.68,-585.6 682.68,-562.8 542.04,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="545.04" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">updates (long&#45;polling)</text>
</g>
<!-- member&#45;&gt;api -->
<g id="edge4" class="edge">
<title>member&#45;&gt;api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M984.52,-706.05C1057.65,-685.05 1136.22,-648.64 1184.13,-585.6 1199.83,-564.94 1206.97,-538.63 1209.55,-512.83"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1212.14,-513.31 1210.11,-505.62 1206.91,-512.9 1212.14,-513.31"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1195.92,-562.8 1195.92,-585.6 1369.17,-585.6 1369.17,-562.8 1195.92,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="1198.92" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">просматривает прогресс</text>
</g>
<!-- member&#45;&gt;telegramcloud -->
<g id="edge5" class="edge">
<title>member&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M792.55,-645.99C789.56,-626.13 786.45,-605.15 783.64,-585.6 780.24,-562 776.7,-536.57 773.42,-512.69"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="776.06,-512.63 772.45,-505.56 770.86,-513.34 776.06,-512.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="783.64,-562.8 783.64,-585.6 1019.13,-585.6 1019.13,-562.8 783.64,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="786.64" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">команды в чате, личные сообщения</text>
</g>
<!-- admin&#45;&gt;api -->
<g id="edge6" class="edge">
<title>admin&#45;&gt;api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1733.84,-646C1758.97,-620.17 1770.84,-591.22 1749.13,-562.8 1704.45,-504.32 1525.33,-463.32 1384.07,-439.33"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1384.79,-436.79 1376.95,-438.14 1383.92,-441.97 1384.79,-436.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1759.14,-562.8 1759.14,-585.6 1975.19,-585.6 1975.19,-562.8 1759.14,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="1762.14" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">агрегированное дерево группы</text>
</g>
<!-- admin&#45;&gt;telegramcloud -->
<g id="edge7" class="edge">
<title>admin&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1509.47,-646.03C1477.59,-614.77 1438.21,-582.53 1396.13,-562.8 1224.99,-482.58 1157.43,-552.67 975.13,-502.8 960.26,-498.73 945.06,-493.9 929.94,-488.63"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="930.82,-486.15 922.87,-486.11 929.06,-491.1 930.82,-486.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1432.42,-562.8 1432.42,-585.6 1594,-585.6 1594,-562.8 1432.42,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="1435.42" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">управление через бота</text>
</g>
</g>
</svg>
`;case"botComponents":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="971pt" height="1080pt"
 viewBox="0.00 0.00 971.00 1080.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1065.05)">
<!-- grouphandlers -->
<g id="node1" class="node">
<title>grouphandlers</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="341.35,-760 21.31,-760 21.31,-580 341.35,-580 341.35,-760"/>
<text xml:space="preserve" text-anchor="start" x="110.74" y="-693.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Group Handlers</text>
<text xml:space="preserve" text-anchor="start" x="128.59" y="-672.1" font-family="Arial" font-size="13.00" fill="#f9b27c">CommandHandler</text>
<text xml:space="preserve" text-anchor="start" x="52.53" y="-650.7" font-family="Arial" font-size="15.00" fill="#f9b27c">/register /join /members /achievements</text>
<text xml:space="preserve" text-anchor="start" x="132.14" y="-632.7" font-family="Arial" font-size="15.00" fill="#f9b27c">/progress /web</text>
</g>
<!-- keyboards -->
<g id="node2" class="node">
<title>keyboards</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="940.58,-470 617.02,-470 617.02,-290 940.58,-290 940.58,-470"/>
<text xml:space="preserve" text-anchor="start" x="730.99" y="-394.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Keyboards</text>
<text xml:space="preserve" text-anchor="start" x="699.32" y="-373.1" font-family="Arial" font-size="13.00" fill="#f9b27c">PTB InlineKeyboardMarkup</text>
<text xml:space="preserve" text-anchor="start" x="637.08" y="-351.7" font-family="Arial" font-size="15.00" fill="#f9b27c">Построители всех InlineKeyboardMarkup</text>
</g>
<!-- privatehandlers -->
<g id="node3" class="node">
<title>privatehandlers</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="341.35,-470 21.31,-470 21.31,-290 341.35,-290 341.35,-470"/>
<text xml:space="preserve" text-anchor="start" x="107.41" y="-403.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Private Handlers</text>
<text xml:space="preserve" text-anchor="start" x="120.27" y="-382.1" font-family="Arial" font-size="13.00" fill="#f9b27c">ConversationHandler</text>
<text xml:space="preserve" text-anchor="start" x="62.56" y="-360.7" font-family="Arial" font-size="15.00" fill="#f9b27c">Просмотр ачивок, подача заявок,</text>
<text xml:space="preserve" text-anchor="start" x="82.97" y="-342.7" font-family="Arial" font-size="15.00" fill="#f9b27c">рецензирование (states 0&#45;3)</text>
</g>
<!-- adminpanel -->
<g id="node4" class="node">
<title>adminpanel</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="362.66,-180 0,-180 0,0 362.66,0 362.66,-180"/>
<text xml:space="preserve" text-anchor="start" x="124.63" y="-122.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Admin Panel</text>
<text xml:space="preserve" text-anchor="start" x="120.27" y="-101.1" font-family="Arial" font-size="13.00" fill="#f9b27c">ConversationHandler</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-79.7" font-family="Arial" font-size="15.00" fill="#f9b27c">CRUD категорий и ачивок, мастер создания,</text>
<text xml:space="preserve" text-anchor="start" x="32.55" y="-61.7" font-family="Arial" font-size="15.00" fill="#f9b27c">управление пресреквизитами с DFS cycle</text>
<text xml:space="preserve" text-anchor="start" x="106.71" y="-43.7" font-family="Arial" font-size="15.00" fill="#f9b27c">detection (states 4&#45;11)</text>
</g>
<!-- db -->
<g id="node5" class="node">
<title>db</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M346.46,-1033.64C346.46,-1042.67 272.45,-1050 181.33,-1050 90.22,-1050 16.2,-1042.67 16.2,-1033.64 16.2,-1033.64 16.2,-886.36 16.2,-886.36 16.2,-877.33 90.22,-870 181.33,-870 272.45,-870 346.46,-877.33 346.46,-886.36 346.46,-886.36 346.46,-1033.64 346.46,-1033.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M346.46,-1033.64C346.46,-1024.61 272.45,-1017.27 181.33,-1017.27 90.22,-1017.27 16.2,-1024.61 16.2,-1033.64"/>
<text xml:space="preserve" text-anchor="start" x="138.52" y="-1001.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Database</text>
<text xml:space="preserve" text-anchor="start" x="49.11" y="-980.1" font-family="Arial" font-size="13.00" fill="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</text>
<text xml:space="preserve" text-anchor="start" x="36.26" y="-958.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">users, groups, group_members, categories,</text>
<text xml:space="preserve" text-anchor="start" x="41.26" y="-940.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievements, achievement_prerequisites</text>
<text xml:space="preserve" text-anchor="start" x="65.44" y="-922.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">(DAG), group_user_achievements,</text>
<text xml:space="preserve" text-anchor="start" x="40.42" y="-904.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievement_claims, achievement_events</text>
</g>
<!-- grouphandlers&#45;&gt;keyboards -->
<g id="edge1" class="edge">
<title>grouphandlers&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M341.12,-592.67C423.4,-552.6 523.92,-503.64 607.76,-462.81"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="608.81,-465.22 614.4,-459.58 606.51,-460.5 608.81,-465.22"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="422.66,-550.97 422.66,-573.77 557.02,-573.77 557.02,-550.97 422.66,-550.97"/>
<text xml:space="preserve" text-anchor="start" x="425.66" y="-558.17" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
<!-- privatehandlers&#45;&gt;keyboards -->
<g id="edge2" class="edge">
<title>privatehandlers&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M341.12,-380C423.06,-380 523.1,-380 606.74,-380"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="606.6,-382.63 614.1,-380 606.6,-377.38 606.6,-382.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="422.66,-380 422.66,-402.8 557.02,-402.8 557.02,-380 422.66,-380"/>
<text xml:space="preserve" text-anchor="start" x="425.66" y="-387.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
<!-- adminpanel&#45;&gt;keyboards -->
<g id="edge3" class="edge">
<title>adminpanel&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M362.61,-177.8C440.57,-215.76 531.32,-259.96 608.06,-297.33"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="606.73,-299.61 614.63,-300.53 609.03,-294.89 606.73,-299.61"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="422.66,-269.5 422.66,-292.3 557.02,-292.3 557.02,-269.5 422.66,-269.5"/>
<text xml:space="preserve" text-anchor="start" x="425.66" y="-276.7" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
</g>
</svg>
`;case"apiComponents":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="2214pt" height="1382pt"
 viewBox="0.00 0.00 2214.00 1382.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1367.05)">
<!-- restendpoints -->
<g id="node1" class="node">
<title>restendpoints</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="345.21,-760 11.63,-760 11.63,-580 345.21,-580 345.21,-760"/>
<text xml:space="preserve" text-anchor="start" x="104.49" y="-693.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">REST Endpoints</text>
<text xml:space="preserve" text-anchor="start" x="133.99" y="-672.1" font-family="Arial" font-size="13.00" fill="#f9b27c">FastAPI Router</text>
<text xml:space="preserve" text-anchor="start" x="31.69" y="-650.7" font-family="Arial" font-size="15.00" fill="#f9b27c">GET /api/groups, /members, /users/{id}/tree,</text>
<text xml:space="preserve" text-anchor="start" x="86.7" y="-632.7" font-family="Arial" font-size="15.00" fill="#f9b27c">/tree/aggregate, /categories</text>
</g>
<!-- achievementservice -->
<g id="node2" class="node">
<title>achievementservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1048.06,-936 703.72,-936 703.72,-756 1048.06,-756 1048.06,-936"/>
<text xml:space="preserve" text-anchor="start" x="781.96" y="-878.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Achievement Service</text>
<text xml:space="preserve" text-anchor="start" x="819.17" y="-857.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="804.17" y="-835.7" font-family="Arial" font-size="15.00" fill="#f9b27c">get_user_tree_graph,</text>
<text xml:space="preserve" text-anchor="start" x="730.8" y="-817.7" font-family="Arial" font-size="15.00" fill="#f9b27c">get_group_aggregate_tree. Статус ачивки</text>
<text xml:space="preserve" text-anchor="start" x="723.78" y="-799.7" font-family="Arial" font-size="15.00" fill="#f9b27c">вычисляется лениво — без фоновых задач.</text>
</g>
<!-- repos -->
<g id="node3" class="node">
<title>repos</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1699.53,-591 1370.9,-591 1370.9,-411 1699.53,-411 1699.53,-591"/>
<text xml:space="preserve" text-anchor="start" x="1479.63" y="-524.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Repositories</text>
<text xml:space="preserve" text-anchor="start" x="1429.72" y="-503.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy 2.0 async, selectinload</text>
<text xml:space="preserve" text-anchor="start" x="1390.95" y="-481.7" font-family="Arial" font-size="15.00" fill="#f9b27c">user_repo, group_repo, achievement_repo,</text>
<text xml:space="preserve" text-anchor="start" x="1454.76" y="-463.7" font-family="Arial" font-size="15.00" fill="#f9b27c">claim_repo, admin_repo</text>
</g>
<!-- claimservice -->
<g id="node4" class="node">
<title>claimservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="356.84,-470 0,-470 0,-290 356.84,-290 356.84,-470"/>
<text xml:space="preserve" text-anchor="start" x="116.74" y="-403.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Claim Service</text>
<text xml:space="preserve" text-anchor="start" x="121.7" y="-382.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="35.45" y="-360.7" font-family="Arial" font-size="15.00" fill="#f9b27c">submit_claim, approve_claim, reject_claim.</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-342.7" font-family="Arial" font-size="15.00" fill="#f9b27c">Транзакция в БД → уведомление через бота.</text>
</g>
<!-- adminservice -->
<g id="node5" class="node">
<title>adminservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="356,-180 0.84,-180 0.84,0 356,0 356,-180"/>
<text xml:space="preserve" text-anchor="start" x="113.95" y="-122.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Admin Service</text>
<text xml:space="preserve" text-anchor="start" x="121.7" y="-101.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="20.9" y="-79.7" font-family="Arial" font-size="15.00" fill="#f9b27c">Безопасные CRUD&#45;обёртки для категорий и</text>
<text xml:space="preserve" text-anchor="start" x="62.12" y="-61.7" font-family="Arial" font-size="15.00" fill="#f9b27c">ачивок, toggle prerequisite с cycle</text>
<text xml:space="preserve" text-anchor="start" x="145.9" y="-43.7" font-family="Arial" font-size="15.00" fill="#f9b27c">detection.</text>
</g>
<!-- member -->
<g id="node6" class="node">
<title>member</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="356.84,-1352 0,-1352 0,-1172 356.84,-1172 356.84,-1352"/>
<text xml:space="preserve" text-anchor="start" x="133.97" y="-1276" font-family="Arial" font-size="20.00" fill="#eff6ff">Участник</text>
<text xml:space="preserve" text-anchor="start" x="42.98" y="-1252.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи. Подаёт заявки на ачивки,</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-1234.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">просматривает прогресс в боте и браузере.</text>
</g>
<!-- frontend -->
<g id="node7" class="node">
<title>frontend</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1058.9,-1289 692.88,-1289 692.88,-1109 1058.9,-1109 1058.9,-1289"/>
<text xml:space="preserve" text-anchor="start" x="812.53" y="-1222.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Web Frontend</text>
<text xml:space="preserve" text-anchor="start" x="754.5" y="-1201.1" font-family="Arial" font-size="13.00" fill="#f9b27c">Vanilla JS, Cytoscape.js, cytoscape&#45;dagre</text>
<text xml:space="preserve" text-anchor="start" x="712.94" y="-1179.7" font-family="Arial" font-size="15.00" fill="#f9b27c">SPA: каталог групп, дерево ачивок, фильтры,</text>
<text xml:space="preserve" text-anchor="start" x="809.21" y="-1161.7" font-family="Arial" font-size="15.00" fill="#f9b27c">детальная панель.</text>
</g>
<!-- admin -->
<g id="node8" class="node">
<title>admin</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="346.42,-1062 10.42,-1062 10.42,-882 346.42,-882 346.42,-1062"/>
<text xml:space="preserve" text-anchor="start" x="106.18" y="-995" font-family="Arial" font-size="20.00" fill="#eff6ff">Администратор</text>
<text xml:space="preserve" text-anchor="start" x="37.14" y="-971.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи с правами admin. Одобряет /</text>
<text xml:space="preserve" text-anchor="start" x="30.47" y="-953.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">отклоняет заявки, регистрирует группу,</text>
<text xml:space="preserve" text-anchor="start" x="103.41" y="-935.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">управляет ачивками.</text>
</g>
<!-- db -->
<g id="node9" class="node">
<title>db</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M2183.8,-574.64C2183.8,-583.67 2109.79,-591 2018.67,-591 1927.56,-591 1853.55,-583.67 1853.55,-574.64 1853.55,-574.64 1853.55,-427.36 1853.55,-427.36 1853.55,-418.33 1927.56,-411 2018.67,-411 2109.79,-411 2183.8,-418.33 2183.8,-427.36 2183.8,-427.36 2183.8,-574.64 2183.8,-574.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M2183.8,-574.64C2183.8,-565.61 2109.79,-558.27 2018.67,-558.27 1927.56,-558.27 1853.55,-565.61 1853.55,-574.64"/>
<text xml:space="preserve" text-anchor="start" x="1975.87" y="-542.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Database</text>
<text xml:space="preserve" text-anchor="start" x="1886.45" y="-521.1" font-family="Arial" font-size="13.00" fill="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</text>
<text xml:space="preserve" text-anchor="start" x="1873.6" y="-499.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">users, groups, group_members, categories,</text>
<text xml:space="preserve" text-anchor="start" x="1878.6" y="-481.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievements, achievement_prerequisites</text>
<text xml:space="preserve" text-anchor="start" x="1902.79" y="-463.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">(DAG), group_user_achievements,</text>
<text xml:space="preserve" text-anchor="start" x="1877.77" y="-445.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievement_claims, achievement_events</text>
</g>
<!-- restendpoints&#45;&gt;achievementservice -->
<g id="edge1" class="edge">
<title>restendpoints&#45;&gt;achievementservice</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M345.12,-711.93C450.12,-738.5 585.95,-772.88 693.79,-800.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="692.96,-802.67 700.87,-801.96 694.25,-797.58 692.96,-802.67"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="472.44,-784.05 472.44,-806.85 577.28,-806.85 577.28,-784.05 472.44,-784.05"/>
<text xml:space="preserve" text-anchor="start" x="475.44" y="-791.25" font-family="Arial" font-size="14.00" fill="#c9c9c9">tree / aggregate</text>
</g>
<!-- restendpoints&#45;&gt;repos -->
<g id="edge2" class="edge">
<title>restendpoints&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M344.8,-660.26C566.05,-645.62 970.06,-613.25 1310.9,-555 1327.25,-552.21 1344.18,-548.89 1361.07,-545.31"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1361.27,-547.95 1368.05,-543.8 1360.17,-542.82 1361.27,-547.95"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="782.24,-632.27 782.24,-655.07 969.54,-655.07 969.54,-632.27 782.24,-632.27"/>
<text xml:space="preserve" text-anchor="start" x="785.24" y="-639.47" font-family="Arial" font-size="14.00" fill="#c9c9c9">groups, members, categories</text>
</g>
<!-- achievementservice&#45;&gt;repos -->
<g id="edge7" class="edge">
<title>achievementservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1047.84,-809.08C1130.81,-786.72 1229.83,-753.21 1310.9,-706 1360.35,-677.2 1408.08,-635.88 1446.63,-597.88"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1448.11,-600.11 1451.57,-592.96 1444.41,-596.39 1448.11,-600.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1118.9,-785.11 1118.9,-807.91 1310.9,-807.91 1310.9,-785.11 1118.9,-785.11"/>
<text xml:space="preserve" text-anchor="start" x="1121.9" y="-792.31" font-family="Arial" font-size="14.00" fill="#c9c9c9">compute_achievement_status</text>
</g>
<!-- repos&#45;&gt;db -->
<g id="edge8" class="edge">
<title>repos&#45;&gt;db</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1699.22,-501C1745.34,-501 1795.74,-501 1842.55,-501"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1842.27,-503.63 1849.77,-501 1842.27,-498.38 1842.27,-503.63"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1759.53,-501 1759.53,-523.8 1793.55,-523.8 1793.55,-501 1759.53,-501"/>
<text xml:space="preserve" text-anchor="start" x="1762.53" y="-508.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">SQL</text>
</g>
<!-- claimservice&#45;&gt;repos -->
<g id="edge3" class="edge">
<title>claimservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M356.54,-395.82C617.45,-419.12 1102.08,-462.41 1360.84,-485.52"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1360.37,-488.11 1368.07,-486.16 1360.84,-482.88 1360.37,-488.11"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="834.39,-458.41 834.39,-481.21 917.39,-481.21 917.39,-458.41 834.39,-458.41"/>
<text xml:space="preserve" text-anchor="start" x="837.39" y="-465.61" font-family="Arial" font-size="14.00" fill="#c9c9c9">claim CRUD</text>
</g>
<!-- adminservice&#45;&gt;repos -->
<g id="edge4" class="edge">
<title>adminservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M355.84,-143.52C616.65,-222.64 1102.09,-369.91 1361.02,-448.46"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1360.06,-450.91 1368,-450.58 1361.59,-445.89 1360.06,-450.91"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="778.35,-356.33 778.35,-379.13 973.43,-379.13 973.43,-356.33 778.35,-356.33"/>
<text xml:space="preserve" text-anchor="start" x="781.35" y="-363.53" font-family="Arial" font-size="14.00" fill="#c9c9c9">achievement / category CRUD</text>
</g>
<!-- member&#45;&gt;frontend -->
<g id="edge5" class="edge">
<title>member&#45;&gt;frontend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M356.72,-1245.94C456.32,-1236.92 580.71,-1225.65 682.65,-1216.41"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="682.82,-1219.03 690.06,-1215.74 682.35,-1213.81 682.82,-1219.03"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="438.23,-1239.82 438.23,-1262.62 611.49,-1262.62 611.49,-1239.82 438.23,-1239.82"/>
<text xml:space="preserve" text-anchor="start" x="441.23" y="-1247.02" font-family="Arial" font-size="14.00" fill="#c9c9c9">просматривает прогресс</text>
</g>
<!-- admin&#45;&gt;frontend -->
<g id="edge6" class="edge">
<title>admin&#45;&gt;frontend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M346,-1026.37C447.42,-1059.47 577.36,-1101.89 683.06,-1136.39"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="682.06,-1138.82 690.01,-1138.65 683.69,-1133.83 682.06,-1138.82"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="416.84,-1119.1 416.84,-1141.9 632.88,-1141.9 632.88,-1119.1 416.84,-1119.1"/>
<text xml:space="preserve" text-anchor="start" x="419.84" y="-1126.3" font-family="Arial" font-size="14.00" fill="#c9c9c9">агрегированное дерево группы</text>
</g>
</g>
</svg>
`;case"claimFlow":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="2106pt" height="1043pt"
 viewBox="0.00 0.00 2106.00 1043.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 1028.25)">
<g id="clust1" class="cluster">
<title>cluster_familyachievements</title>
<polygon fill="#1a468d" stroke="#1c3979" points="8,-8 8,-1005.2 1117,-1005.2 1117,-8 8,-8"/>
<text xml:space="preserve" text-anchor="start" x="16" y="-992.3" font-family="Arial" font-weight="bold" font-size="11.00" fill="#bfdbfe" fill-opacity="0.701961">FAMILY ACHIEVEMENTS</text>
</g>
<g id="clust2" class="cluster">
<title>cluster_bot</title>
<polygon fill="#0d4b6c" stroke="#0b3c57" points="66,-662.8 66,-944 938,-944 938,-662.8 66,-662.8"/>
<text xml:space="preserve" text-anchor="start" x="74" y="-931.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#b6ecf7" fill-opacity="0.701961">TELEGRAM BOT</text>
</g>
<g id="clust3" class="cluster">
<title>cluster_api</title>
<polygon fill="#0d4b6c" stroke="#0b3c57" points="48,-330.8 48,-612 1005,-612 1005,-330.8 48,-330.8"/>
<text xml:space="preserve" text-anchor="start" x="56" y="-599.1" font-family="Arial" font-weight="bold" font-size="11.00" fill="#b6ecf7" fill-opacity="0.701961">REST API &amp; FRONTEND</text>
</g>
<!-- privatehandlers -->
<g id="node1" class="node">
<title>privatehandlers</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="426.02,-882.8 105.98,-882.8 105.98,-702.8 426.02,-702.8 426.02,-882.8"/>
<text xml:space="preserve" text-anchor="start" x="192.08" y="-816.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Private Handlers</text>
<text xml:space="preserve" text-anchor="start" x="204.94" y="-794.9" font-family="Arial" font-size="13.00" fill="#f9b27c">ConversationHandler</text>
<text xml:space="preserve" text-anchor="start" x="147.23" y="-773.5" font-family="Arial" font-size="15.00" fill="#f9b27c">Просмотр ачивок, подача заявок,</text>
<text xml:space="preserve" text-anchor="start" x="167.64" y="-755.5" font-family="Arial" font-size="15.00" fill="#f9b27c">рецензирование (states 0&#45;3)</text>
</g>
<!-- adminpanel -->
<g id="node2" class="node">
<title>adminpanel</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="898.33,-882.8 535.67,-882.8 535.67,-702.8 898.33,-702.8 898.33,-882.8"/>
<text xml:space="preserve" text-anchor="start" x="660.3" y="-825.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Admin Panel</text>
<text xml:space="preserve" text-anchor="start" x="655.94" y="-803.9" font-family="Arial" font-size="13.00" fill="#f9b27c">ConversationHandler</text>
<text xml:space="preserve" text-anchor="start" x="555.72" y="-782.5" font-family="Arial" font-size="15.00" fill="#f9b27c">CRUD категорий и ачивок, мастер создания,</text>
<text xml:space="preserve" text-anchor="start" x="568.22" y="-764.5" font-family="Arial" font-size="15.00" fill="#f9b27c">управление пресреквизитами с DFS cycle</text>
<text xml:space="preserve" text-anchor="start" x="642.38" y="-746.5" font-family="Arial" font-size="15.00" fill="#f9b27c">detection (states 4&#45;11)</text>
</g>
<!-- claimservice -->
<g id="node3" class="node">
<title>claimservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="444.42,-550.8 87.58,-550.8 87.58,-370.8 444.42,-370.8 444.42,-550.8"/>
<text xml:space="preserve" text-anchor="start" x="204.32" y="-484.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Claim Service</text>
<text xml:space="preserve" text-anchor="start" x="209.28" y="-462.9" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="123.03" y="-441.5" font-family="Arial" font-size="15.00" fill="#f9b27c">submit_claim, approve_claim, reject_claim.</text>
<text xml:space="preserve" text-anchor="start" x="107.64" y="-423.5" font-family="Arial" font-size="15.00" fill="#f9b27c">Транзакция в БД → уведомление через бота.</text>
</g>
<!-- repos -->
<g id="node4" class="node">
<title>repos</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="965.32,-550.8 636.68,-550.8 636.68,-370.8 965.32,-370.8 965.32,-550.8"/>
<text xml:space="preserve" text-anchor="start" x="745.42" y="-484.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Repositories</text>
<text xml:space="preserve" text-anchor="start" x="695.5" y="-462.9" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy 2.0 async, selectinload</text>
<text xml:space="preserve" text-anchor="start" x="656.74" y="-441.5" font-family="Arial" font-size="15.00" fill="#f9b27c">user_repo, group_repo, achievement_repo,</text>
<text xml:space="preserve" text-anchor="start" x="720.54" y="-423.5" font-family="Arial" font-size="15.00" fill="#f9b27c">claim_repo, admin_repo</text>
</g>
<!-- db -->
<g id="node5" class="node">
<title>db</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M966.13,-211.64C966.13,-220.67 892.11,-228 801,-228 709.89,-228 635.87,-220.67 635.87,-211.64 635.87,-211.64 635.87,-64.36 635.87,-64.36 635.87,-55.33 709.89,-48 801,-48 892.11,-48 966.13,-55.33 966.13,-64.36 966.13,-64.36 966.13,-211.64 966.13,-211.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M966.13,-211.64C966.13,-202.61 892.11,-195.27 801,-195.27 709.89,-195.27 635.87,-202.61 635.87,-211.64"/>
<text xml:space="preserve" text-anchor="start" x="758.19" y="-179.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Database</text>
<text xml:space="preserve" text-anchor="start" x="668.78" y="-158.1" font-family="Arial" font-size="13.00" fill="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</text>
<text xml:space="preserve" text-anchor="start" x="655.93" y="-136.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">users, groups, group_members, categories,</text>
<text xml:space="preserve" text-anchor="start" x="660.92" y="-118.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievements, achievement_prerequisites</text>
<text xml:space="preserve" text-anchor="start" x="685.11" y="-100.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">(DAG), group_user_achievements,</text>
<text xml:space="preserve" text-anchor="start" x="660.09" y="-82.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievement_claims, achievement_events</text>
</g>
<!-- member -->
<g id="node6" class="node">
<title>member</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="1630.42,-882.8 1273.58,-882.8 1273.58,-702.8 1630.42,-702.8 1630.42,-882.8"/>
<text xml:space="preserve" text-anchor="start" x="1407.55" y="-806.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Участник</text>
<text xml:space="preserve" text-anchor="start" x="1316.56" y="-783.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи. Подаёт заявки на ачивки,</text>
<text xml:space="preserve" text-anchor="start" x="1293.64" y="-765.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">просматривает прогресс в боте и браузере.</text>
</g>
<!-- telegramcloud -->
<g id="node7" class="node">
<title>telegramcloud</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="1729.02,-550.8 1408.98,-550.8 1408.98,-370.8 1729.02,-370.8 1729.02,-550.8"/>
<text xml:space="preserve" text-anchor="start" x="1526.76" y="-484.6" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram</text>
<text xml:space="preserve" text-anchor="start" x="1517.7" y="-462.9" font-family="Arial" font-size="13.00" fill="#b6ecf7">Telegram Bot API</text>
<text xml:space="preserve" text-anchor="start" x="1435.19" y="-441.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">Telegram Bot API. Доставляет updates</text>
<text xml:space="preserve" text-anchor="start" x="1523.56" y="-423.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">(long&#45;polling).</text>
</g>
<!-- admin -->
<g id="node8" class="node">
<title>admin</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="2076,-882.8 1740,-882.8 1740,-702.8 2076,-702.8 2076,-882.8"/>
<text xml:space="preserve" text-anchor="start" x="1835.76" y="-815.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Администратор</text>
<text xml:space="preserve" text-anchor="start" x="1766.72" y="-792.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи с правами admin. Одобряет /</text>
<text xml:space="preserve" text-anchor="start" x="1760.05" y="-774.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">отклоняет заявки, регистрирует группу,</text>
<text xml:space="preserve" text-anchor="start" x="1832.99" y="-756.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">управляет ачивками.</text>
</g>
<!-- privatehandlers&#45;&gt;claimservice -->
<g id="edge3" class="edge">
<title>privatehandlers&#45;&gt;claimservice</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M139.67,-702.96C119.7,-678.21 108.97,-649.85 120.6,-620 129.13,-598.1 142.27,-577.4 157.24,-558.64"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="159.09,-560.51 161.83,-553.05 155.04,-557.18 159.09,-560.51"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="120.6,-620 120.6,-642.8 276,-642.8 276,-620 120.6,-620"/>
<text xml:space="preserve" text-anchor="start" x="123.6" y="-627.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">submit / approve / reject</text>
</g>
<!-- adminpanel&#45;&gt;db -->
<g id="edge4" class="edge">
<title>adminpanel&#45;&gt;db</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M938,-706.12C975.58,-681.48 1009.63,-650.52 1032,-612 1094.76,-503.92 1085.11,-443.93 1032,-330.8 1013.75,-291.92 983.32,-258.2 950.43,-230.35"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="952.27,-228.45 944.82,-225.69 948.92,-232.5 952.27,-228.45"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1071.93,-441.25 1071.93,-464.05 1293.49,-464.05 1293.49,-441.25 1071.93,-441.25"/>
<text xml:space="preserve" text-anchor="start" x="1074.93" y="-448.45" font-family="Arial" font-size="14.00" fill="#c9c9c9">SQL (shared SQLAlchemy engine)</text>
</g>
<!-- claimservice&#45;&gt;repos -->
<g id="edge5" class="edge">
<title>claimservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M444.15,-460.8C502.79,-460.8 567.9,-460.8 626.28,-460.8"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="626.2,-463.43 633.7,-460.8 626.2,-458.18 626.2,-463.43"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="499.05,-463.8 499.05,-486.6 582.05,-486.6 582.05,-463.8 499.05,-463.8"/>
<text xml:space="preserve" text-anchor="start" x="502.05" y="-471" font-family="Arial" font-size="14.00" fill="#c9c9c9">claim CRUD</text>
</g>
<!-- repos&#45;&gt;db -->
<g id="edge6" class="edge">
<title>repos&#45;&gt;db</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M801,-370.87C801,-330.01 801,-281.38 801,-239.23"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="803.63,-239.47 801,-231.97 798.38,-239.47 803.63,-239.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="801,-288 801,-310.8 835.01,-310.8 835.01,-288 801,-288"/>
<text xml:space="preserve" text-anchor="start" x="804" y="-295.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">SQL</text>
</g>
<!-- member&#45;&gt;telegramcloud -->
<g id="edge1" class="edge">
<title>member&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1483.51,-702.93C1499.11,-658.91 1518,-605.64 1534.05,-560.37"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1536.49,-561.34 1536.53,-553.39 1531.55,-559.59 1536.49,-561.34"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1510.5,-620 1510.5,-642.8 1745.99,-642.8 1745.99,-620 1510.5,-620"/>
<text xml:space="preserve" text-anchor="start" x="1513.5" y="-627.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">команды в чате, личные сообщения</text>
</g>
<!-- admin&#45;&gt;telegramcloud -->
<g id="edge2" class="edge">
<title>admin&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1844.97,-703.11C1823.48,-675.29 1798.43,-645.27 1773,-620 1751.13,-598.27 1726.27,-576.79 1701.62,-556.99"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1703.5,-555.14 1696,-552.52 1700.23,-559.24 1703.5,-555.14"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1793.52,-620 1793.52,-642.8 1955.11,-642.8 1955.11,-620 1793.52,-620"/>
<text xml:space="preserve" text-anchor="start" x="1796.52" y="-627.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">управление через бота</text>
</g>
</g>
</svg>
`;case"__member":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="830pt" height="533pt"
 viewBox="0.00 0.00 830.00 533.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 517.85)">
<!-- member -->
<g id="node1" class="node">
<title>member</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="565.44,-502.8 208.6,-502.8 208.6,-322.8 565.44,-322.8 565.44,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="342.57" y="-426.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Участник</text>
<text xml:space="preserve" text-anchor="start" x="251.58" y="-403.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи. Подаёт заявки на ачивки,</text>
<text xml:space="preserve" text-anchor="start" x="228.66" y="-385.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">просматривает прогресс в боте и браузере.</text>
</g>
<!-- telegramcloud -->
<g id="node2" class="node">
<title>telegramcloud</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="320.04,-180 0,-180 0,0 320.04,0 320.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="117.78" y="-113.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram</text>
<text xml:space="preserve" text-anchor="start" x="108.72" y="-92.1" font-family="Arial" font-size="13.00" fill="#b6ecf7">Telegram Bot API</text>
<text xml:space="preserve" text-anchor="start" x="26.21" y="-70.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">Telegram Bot API. Доставляет updates</text>
<text xml:space="preserve" text-anchor="start" x="114.58" y="-52.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">(long&#45;polling).</text>
</g>
<!-- familyachievements -->
<g id="node3" class="node">
<title>familyachievements</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="800.12,-180 429.92,-180 429.92,0 800.12,0 800.12,-180"/>
<text xml:space="preserve" text-anchor="start" x="519.99" y="-104" font-family="Arial" font-size="20.00" fill="#eff6ff">Family Achievements</text>
<text xml:space="preserve" text-anchor="start" x="449.98" y="-80.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">Telegram&#45;бот + REST API + веб&#45;интерфейс для</text>
<text xml:space="preserve" text-anchor="start" x="483.74" y="-62.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">отслеживания семейных достижений.</text>
</g>
<!-- member&#45;&gt;telegramcloud -->
<g id="edge1" class="edge">
<title>member&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M291.88,-322.9C274.3,-304.01 256.96,-283.49 242.53,-262.8 226.76,-240.18 212.51,-214.07 200.46,-189.15"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="202.84,-188.05 197.25,-182.4 198.1,-190.31 202.84,-188.05"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="242.53,-240 242.53,-262.8 478.02,-262.8 478.02,-240 242.53,-240"/>
<text xml:space="preserve" text-anchor="start" x="245.53" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">команды в чате, личные сообщения</text>
</g>
<!-- member&#45;&gt;familyachievements -->
<g id="edge2" class="edge">
<title>member&#45;&gt;familyachievements</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M456.43,-323.1C471.39,-303.43 486.93,-282.56 501.02,-262.8 518.03,-238.95 535.82,-212.78 552.15,-188.23"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="554.23,-189.84 556.18,-182.14 549.85,-186.94 554.23,-189.84"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="513.9,-240 513.9,-262.8 687.15,-262.8 687.15,-240 513.9,-240"/>
<text xml:space="preserve" text-anchor="start" x="516.9" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">просматривает прогресс</text>
</g>
</g>
</svg>
`;case"__admin":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="830pt" height="533pt"
 viewBox="0.00 0.00 830.00 533.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 517.85)">
<!-- admin -->
<g id="node1" class="node">
<title>admin</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="555.02,-502.8 219.02,-502.8 219.02,-322.8 555.02,-322.8 555.02,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="314.78" y="-435.8" font-family="Arial" font-size="20.00" fill="#eff6ff">Администратор</text>
<text xml:space="preserve" text-anchor="start" x="245.74" y="-412.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи с правами admin. Одобряет /</text>
<text xml:space="preserve" text-anchor="start" x="239.07" y="-394.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">отклоняет заявки, регистрирует группу,</text>
<text xml:space="preserve" text-anchor="start" x="312.01" y="-376.3" font-family="Arial" font-size="15.00" fill="#bfdbfe">управляет ачивками.</text>
</g>
<!-- telegramcloud -->
<g id="node2" class="node">
<title>telegramcloud</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="320.04,-180 0,-180 0,0 320.04,0 320.04,-180"/>
<text xml:space="preserve" text-anchor="start" x="117.78" y="-113.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram</text>
<text xml:space="preserve" text-anchor="start" x="108.72" y="-92.1" font-family="Arial" font-size="13.00" fill="#b6ecf7">Telegram Bot API</text>
<text xml:space="preserve" text-anchor="start" x="26.21" y="-70.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">Telegram Bot API. Доставляет updates</text>
<text xml:space="preserve" text-anchor="start" x="114.58" y="-52.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">(long&#45;polling).</text>
</g>
<!-- familyachievements -->
<g id="node3" class="node">
<title>familyachievements</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="800.12,-180 429.92,-180 429.92,0 800.12,0 800.12,-180"/>
<text xml:space="preserve" text-anchor="start" x="519.99" y="-104" font-family="Arial" font-size="20.00" fill="#eff6ff">Family Achievements</text>
<text xml:space="preserve" text-anchor="start" x="449.98" y="-80.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">Telegram&#45;бот + REST API + веб&#45;интерфейс для</text>
<text xml:space="preserve" text-anchor="start" x="483.74" y="-62.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">отслеживания семейных достижений.</text>
</g>
<!-- admin&#45;&gt;telegramcloud -->
<g id="edge1" class="edge">
<title>admin&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M324.09,-322.87C294.51,-281.06 259.16,-231.11 228.86,-188.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="231.1,-186.91 224.62,-182.3 226.81,-189.94 231.1,-186.91"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="280.33,-240 280.33,-262.8 441.91,-262.8 441.91,-240 280.33,-240"/>
<text xml:space="preserve" text-anchor="start" x="283.33" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">управление через бота</text>
</g>
<!-- admin&#45;&gt;familyachievements -->
<g id="edge2" class="edge">
<title>admin&#45;&gt;familyachievements</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M450.23,-322.87C479.94,-281.06 515.44,-231.11 545.87,-188.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="547.93,-189.93 550.13,-182.3 543.65,-186.89 547.93,-189.93"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="507.86,-240 507.86,-262.8 723.9,-262.8 723.9,-240 507.86,-240"/>
<text xml:space="preserve" text-anchor="start" x="510.86" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">агрегированное дерево группы</text>
</g>
</g>
</svg>
`;case"__telegramCloud":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="833pt" height="856pt"
 viewBox="0.00 0.00 833.00 856.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 840.65)">
<!-- member -->
<g id="node1" class="node">
<title>member</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="356.84,-825.6 0,-825.6 0,-645.6 356.84,-645.6 356.84,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="133.97" y="-749.6" font-family="Arial" font-size="20.00" fill="#eff6ff">Участник</text>
<text xml:space="preserve" text-anchor="start" x="42.98" y="-726.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи. Подаёт заявки на ачивки,</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-708.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">просматривает прогресс в боте и браузере.</text>
</g>
<!-- telegramcloud -->
<g id="node2" class="node">
<title>telegramcloud</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="566.44,-502.8 246.4,-502.8 246.4,-322.8 566.44,-322.8 566.44,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="364.18" y="-436.6" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram</text>
<text xml:space="preserve" text-anchor="start" x="355.12" y="-414.9" font-family="Arial" font-size="13.00" fill="#b6ecf7">Telegram Bot API</text>
<text xml:space="preserve" text-anchor="start" x="272.61" y="-393.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">Telegram Bot API. Доставляет updates</text>
<text xml:space="preserve" text-anchor="start" x="360.98" y="-375.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">(long&#45;polling).</text>
</g>
<!-- admin -->
<g id="node3" class="node">
<title>admin</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="802.42,-825.6 466.42,-825.6 466.42,-645.6 802.42,-645.6 802.42,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="562.18" y="-758.6" font-family="Arial" font-size="20.00" fill="#eff6ff">Администратор</text>
<text xml:space="preserve" text-anchor="start" x="493.14" y="-735.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи с правами admin. Одобряет /</text>
<text xml:space="preserve" text-anchor="start" x="486.47" y="-717.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">отклоняет заявки, регистрирует группу,</text>
<text xml:space="preserve" text-anchor="start" x="559.41" y="-699.1" font-family="Arial" font-size="15.00" fill="#bfdbfe">управляет ачивками.</text>
</g>
<!-- familyachievements -->
<g id="node4" class="node">
<title>familyachievements</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="591.52,-180 221.32,-180 221.32,0 591.52,0 591.52,-180"/>
<text xml:space="preserve" text-anchor="start" x="311.39" y="-104" font-family="Arial" font-size="20.00" fill="#eff6ff">Family Achievements</text>
<text xml:space="preserve" text-anchor="start" x="241.38" y="-80.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">Telegram&#45;бот + REST API + веб&#45;интерфейс для</text>
<text xml:space="preserve" text-anchor="start" x="275.14" y="-62.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">отслеживания семейных достижений.</text>
</g>
<!-- member&#45;&gt;telegramcloud -->
<g id="edge1" class="edge">
<title>member&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M214.93,-645.95C228.03,-618.27 244.04,-588.33 261.93,-562.8 274.48,-544.89 289.21,-527.09 304.37,-510.36"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="306.17,-512.29 309.31,-504.99 302.3,-508.73 306.17,-512.29"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="261.93,-562.8 261.93,-585.6 497.42,-585.6 497.42,-562.8 261.93,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="264.93" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">команды в чате, личные сообщения</text>
</g>
<!-- telegramcloud&#45;&gt;familyachievements -->
<g id="edge4" class="edge">
<title>telegramcloud&#45;&gt;familyachievements</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M271.86,-323.01C251.02,-298.35 240.07,-270.03 252.78,-240 260.74,-221.18 272.38,-203.57 285.74,-187.52"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="287.54,-189.45 290.45,-182.05 283.56,-186.02 287.54,-189.45"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="252.78,-240 252.78,-262.8 393.42,-262.8 393.42,-240 252.78,-240"/>
<text xml:space="preserve" text-anchor="start" x="255.78" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">updates (long&#45;polling)</text>
</g>
<!-- admin&#45;&gt;telegramcloud -->
<g id="edge2" class="edge">
<title>admin&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M577.26,-645.99C559.42,-619.02 539.44,-589.47 520.42,-562.8 508.31,-545.82 495.13,-528.02 482.17,-510.86"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="484.28,-509.3 477.66,-504.91 480.1,-512.47 484.28,-509.3"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="533.3,-562.8 533.3,-585.6 694.89,-585.6 694.89,-562.8 533.3,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="536.3" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">управление через бота</text>
</g>
<!-- familyachievements&#45;&gt;telegramcloud -->
<g id="edge3" class="edge">
<title>familyachievements&#45;&gt;telegramcloud</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M418,-179.65C420.31,-206.35 421.69,-235.75 420.42,-262.8 419.66,-278.92 418.45,-295.99 417.05,-312.6"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="414.45,-312.15 416.41,-319.85 419.68,-312.61 414.45,-312.15"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="420.89,-240 420.89,-262.8 605.11,-262.8 605.11,-240 420.89,-240"/>
<text xml:space="preserve" text-anchor="start" x="423.89" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">sendMessage / editMessage</text>
</g>
</g>
</svg>
`;case"__familyAchievements_db":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="836pt" height="533pt"
 viewBox="0.00 0.00 836.00 533.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 517.85)">
<!-- bot -->
<g id="node1" class="node">
<title>bot</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="352.67,-502.8 0,-502.8 0,-322.8 352.67,-322.8 352.67,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="116.31" y="-445.6" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram Bot</text>
<text xml:space="preserve" text-anchor="start" x="67.58" y="-423.9" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, python&#45;telegram&#45;bot v21</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-402.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">Обрабатывает команды в групповых чатах и</text>
<text xml:space="preserve" text-anchor="start" x="44.64" y="-384.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">ведёт личные диалоги (12 состояний</text>
<text xml:space="preserve" text-anchor="start" x="101.3" y="-366.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">ConversationHandler).</text>
</g>
<!-- db -->
<g id="node2" class="node">
<title>db</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M570.46,-163.64C570.46,-172.67 496.45,-180 405.34,-180 314.22,-180 240.21,-172.67 240.21,-163.64 240.21,-163.64 240.21,-16.36 240.21,-16.36 240.21,-7.33 314.22,0 405.34,0 496.45,0 570.46,-7.33 570.46,-16.36 570.46,-16.36 570.46,-163.64 570.46,-163.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M570.46,-163.64C570.46,-154.61 496.45,-147.27 405.34,-147.27 314.22,-147.27 240.21,-154.61 240.21,-163.64"/>
<text xml:space="preserve" text-anchor="start" x="362.53" y="-131.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Database</text>
<text xml:space="preserve" text-anchor="start" x="273.11" y="-110.1" font-family="Arial" font-size="13.00" fill="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</text>
<text xml:space="preserve" text-anchor="start" x="260.27" y="-88.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">users, groups, group_members, categories,</text>
<text xml:space="preserve" text-anchor="start" x="265.26" y="-70.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievements, achievement_prerequisites</text>
<text xml:space="preserve" text-anchor="start" x="289.45" y="-52.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">(DAG), group_user_achievements,</text>
<text xml:space="preserve" text-anchor="start" x="264.43" y="-34.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievement_claims, achievement_events</text>
</g>
<!-- api -->
<g id="node3" class="node">
<title>api</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="806.32,-502.8 462.36,-502.8 462.36,-322.8 806.32,-322.8 806.32,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="536.52" y="-436.6" font-family="Arial" font-size="20.00" fill="#f0f9ff">REST API &amp; Frontend</text>
<text xml:space="preserve" text-anchor="start" x="547.27" y="-414.9" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, FastAPI, Uvicorn</text>
<text xml:space="preserve" text-anchor="start" x="482.41" y="-393.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">FastAPI + Uvicorn :8000. REST&#45;эндпоинты и</text>
<text xml:space="preserve" text-anchor="start" x="563.49" y="-375.5" font-family="Arial" font-size="15.00" fill="#b6ecf7">статика фронтенда.</text>
</g>
<!-- bot&#45;&gt;db -->
<g id="edge1" class="edge">
<title>bot&#45;&gt;db</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M223.54,-322.82C239.14,-295.57 257.26,-265.94 275.79,-240 288.05,-222.83 301.91,-205.29 315.89,-188.57"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="317.54,-190.69 320.36,-183.26 313.52,-187.3 317.54,-190.69"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="275.79,-240 275.79,-262.8 497.34,-262.8 497.34,-240 275.79,-240"/>
<text xml:space="preserve" text-anchor="start" x="278.79" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">SQL (shared SQLAlchemy engine)</text>
</g>
<!-- api&#45;&gt;db -->
<g id="edge2" class="edge">
<title>api&#45;&gt;db</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M577.24,-323.14C559.41,-296.17 539.41,-266.63 520.34,-240 508.4,-223.33 495.41,-205.89 482.59,-189.05"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="484.8,-187.61 478.16,-183.24 480.62,-190.79 484.8,-187.61"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="533.25,-240 533.25,-262.8 567.26,-262.8 567.26,-240 533.25,-240"/>
<text xml:space="preserve" text-anchor="start" x="536.25" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">SQL</text>
</g>
</g>
</svg>
`;case"__familyAchievements_bot_groupHandlers":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="808pt" height="533pt"
 viewBox="0.00 0.00 808.00 533.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 517.85)">
<!-- grouphandlers -->
<g id="node1" class="node">
<title>grouphandlers</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="776,-502.8 455.96,-502.8 455.96,-322.8 776,-322.8 776,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="545.39" y="-436.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Group Handlers</text>
<text xml:space="preserve" text-anchor="start" x="563.23" y="-414.9" font-family="Arial" font-size="13.00" fill="#f9b27c">CommandHandler</text>
<text xml:space="preserve" text-anchor="start" x="487.18" y="-393.5" font-family="Arial" font-size="15.00" fill="#f9b27c">/register /join /members /achievements</text>
<text xml:space="preserve" text-anchor="start" x="566.79" y="-375.5" font-family="Arial" font-size="15.00" fill="#f9b27c">/progress /web</text>
</g>
<!-- api -->
<g id="node2" class="node">
<title>api</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="343.96,-180 0,-180 0,0 343.96,0 343.96,-180"/>
<text xml:space="preserve" text-anchor="start" x="74.16" y="-113.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">REST API &amp; Frontend</text>
<text xml:space="preserve" text-anchor="start" x="84.91" y="-92.1" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, FastAPI, Uvicorn</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-70.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">FastAPI + Uvicorn :8000. REST&#45;эндпоинты и</text>
<text xml:space="preserve" text-anchor="start" x="101.13" y="-52.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">статика фронтенда.</text>
</g>
<!-- keyboards -->
<g id="node3" class="node">
<title>keyboards</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="777.76,-180 454.2,-180 454.2,0 777.76,0 777.76,-180"/>
<text xml:space="preserve" text-anchor="start" x="568.17" y="-104.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Keyboards</text>
<text xml:space="preserve" text-anchor="start" x="536.49" y="-83.1" font-family="Arial" font-size="13.00" fill="#f9b27c">PTB InlineKeyboardMarkup</text>
<text xml:space="preserve" text-anchor="start" x="474.25" y="-61.7" font-family="Arial" font-size="15.00" fill="#f9b27c">Построители всех InlineKeyboardMarkup</text>
</g>
<!-- grouphandlers&#45;&gt;api -->
<g id="edge1" class="edge">
<title>grouphandlers&#45;&gt;api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M479.19,-322.98C450.26,-303.54 420.1,-282.79 392.39,-262.8 358.92,-238.66 323.37,-211.6 290.81,-186.22"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="292.51,-184.22 284.98,-181.67 289.28,-188.36 292.51,-184.22"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="392.39,-240 392.39,-262.8 588.98,-262.8 588.98,-240 392.39,-240"/>
<text xml:space="preserve" text-anchor="start" x="395.39" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">читает участников и ачивки</text>
</g>
<!-- grouphandlers&#45;&gt;keyboards -->
<g id="edge2" class="edge">
<title>grouphandlers&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M615.98,-322.87C615.98,-281.67 615.98,-232.56 615.98,-190.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="618.6,-190.36 615.98,-182.86 613.35,-190.36 618.6,-190.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="615.98,-240 615.98,-262.8 750.34,-262.8 750.34,-240 615.98,-240"/>
<text xml:space="preserve" text-anchor="start" x="618.98" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
</g>
</svg>
`;case"__familyAchievements_bot_privateHandlers":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="808pt" height="533pt"
 viewBox="0.00 0.00 808.00 533.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 517.85)">
<!-- privatehandlers -->
<g id="node1" class="node">
<title>privatehandlers</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="776,-502.8 455.96,-502.8 455.96,-322.8 776,-322.8 776,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="542.06" y="-436.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Private Handlers</text>
<text xml:space="preserve" text-anchor="start" x="554.92" y="-414.9" font-family="Arial" font-size="13.00" fill="#f9b27c">ConversationHandler</text>
<text xml:space="preserve" text-anchor="start" x="497.21" y="-393.5" font-family="Arial" font-size="15.00" fill="#f9b27c">Просмотр ачивок, подача заявок,</text>
<text xml:space="preserve" text-anchor="start" x="517.62" y="-375.5" font-family="Arial" font-size="15.00" fill="#f9b27c">рецензирование (states 0&#45;3)</text>
</g>
<!-- api -->
<g id="node2" class="node">
<title>api</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="343.96,-180 0,-180 0,0 343.96,0 343.96,-180"/>
<text xml:space="preserve" text-anchor="start" x="74.16" y="-113.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">REST API &amp; Frontend</text>
<text xml:space="preserve" text-anchor="start" x="84.91" y="-92.1" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, FastAPI, Uvicorn</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-70.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">FastAPI + Uvicorn :8000. REST&#45;эндпоинты и</text>
<text xml:space="preserve" text-anchor="start" x="101.13" y="-52.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">статика фронтенда.</text>
</g>
<!-- keyboards -->
<g id="node3" class="node">
<title>keyboards</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="777.76,-180 454.2,-180 454.2,0 777.76,0 777.76,-180"/>
<text xml:space="preserve" text-anchor="start" x="568.17" y="-104.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Keyboards</text>
<text xml:space="preserve" text-anchor="start" x="536.49" y="-83.1" font-family="Arial" font-size="13.00" fill="#f9b27c">PTB InlineKeyboardMarkup</text>
<text xml:space="preserve" text-anchor="start" x="474.25" y="-61.7" font-family="Arial" font-size="15.00" fill="#f9b27c">Построители всех InlineKeyboardMarkup</text>
</g>
<!-- privatehandlers&#45;&gt;api -->
<g id="edge1" class="edge">
<title>privatehandlers&#45;&gt;api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M492.89,-322.87C433.94,-280.27 363.3,-229.23 303.31,-185.89"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="304.99,-183.87 297.38,-181.6 301.92,-188.12 304.99,-183.87"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="407.29,-240 407.29,-262.8 434.28,-262.8 434.28,-240 407.29,-240"/>
<text xml:space="preserve" text-anchor="start" x="410.29" y="-248.2" font-family="Arial" font-weight="bold" font-size="14.00" fill="#c9c9c9">[...]</text>
</g>
<!-- privatehandlers&#45;&gt;keyboards -->
<g id="edge2" class="edge">
<title>privatehandlers&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M615.98,-322.87C615.98,-281.67 615.98,-232.56 615.98,-190.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="618.6,-190.36 615.98,-182.86 613.35,-190.36 618.6,-190.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="615.98,-240 615.98,-262.8 750.34,-262.8 750.34,-240 615.98,-240"/>
<text xml:space="preserve" text-anchor="start" x="618.98" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
</g>
</svg>
`;case"__familyAchievements_bot_adminPanel":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="827pt" height="533pt"
 viewBox="0.00 0.00 827.00 533.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 517.85)">
<!-- adminpanel -->
<g id="node1" class="node">
<title>adminpanel</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="797.31,-502.8 434.65,-502.8 434.65,-322.8 797.31,-322.8 797.31,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="559.28" y="-445.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Admin Panel</text>
<text xml:space="preserve" text-anchor="start" x="554.92" y="-423.9" font-family="Arial" font-size="13.00" fill="#f9b27c">ConversationHandler</text>
<text xml:space="preserve" text-anchor="start" x="454.7" y="-402.5" font-family="Arial" font-size="15.00" fill="#f9b27c">CRUD категорий и ачивок, мастер создания,</text>
<text xml:space="preserve" text-anchor="start" x="467.2" y="-384.5" font-family="Arial" font-size="15.00" fill="#f9b27c">управление пресреквизитами с DFS cycle</text>
<text xml:space="preserve" text-anchor="start" x="541.36" y="-366.5" font-family="Arial" font-size="15.00" fill="#f9b27c">detection (states 4&#45;11)</text>
</g>
<!-- api -->
<g id="node2" class="node">
<title>api</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="343.96,-180 0,-180 0,0 343.96,0 343.96,-180"/>
<text xml:space="preserve" text-anchor="start" x="74.16" y="-113.8" font-family="Arial" font-size="20.00" fill="#f0f9ff">REST API &amp; Frontend</text>
<text xml:space="preserve" text-anchor="start" x="84.91" y="-92.1" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, FastAPI, Uvicorn</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-70.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">FastAPI + Uvicorn :8000. REST&#45;эндпоинты и</text>
<text xml:space="preserve" text-anchor="start" x="101.13" y="-52.7" font-family="Arial" font-size="15.00" fill="#b6ecf7">статика фронтенда.</text>
</g>
<!-- keyboards -->
<g id="node3" class="node">
<title>keyboards</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="777.76,-180 454.2,-180 454.2,0 777.76,0 777.76,-180"/>
<text xml:space="preserve" text-anchor="start" x="568.17" y="-104.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Keyboards</text>
<text xml:space="preserve" text-anchor="start" x="536.49" y="-83.1" font-family="Arial" font-size="13.00" fill="#f9b27c">PTB InlineKeyboardMarkup</text>
<text xml:space="preserve" text-anchor="start" x="474.25" y="-61.7" font-family="Arial" font-size="15.00" fill="#f9b27c">Построители всех InlineKeyboardMarkup</text>
</g>
<!-- adminpanel&#45;&gt;api -->
<g id="edge1" class="edge">
<title>adminpanel&#45;&gt;api</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M490.26,-322.86C462.58,-303.16 433.46,-282.33 406.4,-262.8 372.03,-237.99 334.97,-210.96 300.69,-185.84"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="302.54,-183.94 294.94,-181.63 299.44,-188.18 302.54,-183.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="406.4,-240 406.4,-262.8 588.98,-262.8 588.98,-240 406.4,-240"/>
<text xml:space="preserve" text-anchor="start" x="409.4" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">CRUD ачивок и категорий</text>
</g>
<!-- adminpanel&#45;&gt;keyboards -->
<g id="edge2" class="edge">
<title>adminpanel&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M615.98,-322.87C615.98,-281.67 615.98,-232.56 615.98,-190.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="618.6,-190.36 615.98,-182.86 613.35,-190.36 618.6,-190.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="615.98,-240 615.98,-262.8 750.34,-262.8 750.34,-240 615.98,-240"/>
<text xml:space="preserve" text-anchor="start" x="618.98" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
</g>
</svg>
`;case"__familyAchievements_bot_keyboards":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="1252pt" height="533pt"
 viewBox="0.00 0.00 1252.00 533.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 517.85)">
<!-- grouphandlers -->
<g id="node1" class="node">
<title>grouphandlers</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="320.04,-502.8 0,-502.8 0,-322.8 320.04,-322.8 320.04,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="89.43" y="-436.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Group Handlers</text>
<text xml:space="preserve" text-anchor="start" x="107.27" y="-414.9" font-family="Arial" font-size="13.00" fill="#f9b27c">CommandHandler</text>
<text xml:space="preserve" text-anchor="start" x="31.22" y="-393.5" font-family="Arial" font-size="15.00" fill="#f9b27c">/register /join /members /achievements</text>
<text xml:space="preserve" text-anchor="start" x="110.83" y="-375.5" font-family="Arial" font-size="15.00" fill="#f9b27c">/progress /web</text>
</g>
<!-- keyboards -->
<g id="node2" class="node">
<title>keyboards</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="751.8,-180 428.24,-180 428.24,0 751.8,0 751.8,-180"/>
<text xml:space="preserve" text-anchor="start" x="542.21" y="-104.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Keyboards</text>
<text xml:space="preserve" text-anchor="start" x="510.53" y="-83.1" font-family="Arial" font-size="13.00" fill="#f9b27c">PTB InlineKeyboardMarkup</text>
<text xml:space="preserve" text-anchor="start" x="448.3" y="-61.7" font-family="Arial" font-size="15.00" fill="#f9b27c">Построители всех InlineKeyboardMarkup</text>
</g>
<!-- privatehandlers -->
<g id="node3" class="node">
<title>privatehandlers</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="750.04,-502.8 430,-502.8 430,-322.8 750.04,-322.8 750.04,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="516.1" y="-436.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Private Handlers</text>
<text xml:space="preserve" text-anchor="start" x="528.96" y="-414.9" font-family="Arial" font-size="13.00" fill="#f9b27c">ConversationHandler</text>
<text xml:space="preserve" text-anchor="start" x="471.25" y="-393.5" font-family="Arial" font-size="15.00" fill="#f9b27c">Просмотр ачивок, подача заявок,</text>
<text xml:space="preserve" text-anchor="start" x="491.66" y="-375.5" font-family="Arial" font-size="15.00" fill="#f9b27c">рецензирование (states 0&#45;3)</text>
</g>
<!-- adminpanel -->
<g id="node4" class="node">
<title>adminpanel</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1222.35,-502.8 859.69,-502.8 859.69,-322.8 1222.35,-322.8 1222.35,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="984.32" y="-445.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Admin Panel</text>
<text xml:space="preserve" text-anchor="start" x="979.96" y="-423.9" font-family="Arial" font-size="13.00" fill="#f9b27c">ConversationHandler</text>
<text xml:space="preserve" text-anchor="start" x="879.74" y="-402.5" font-family="Arial" font-size="15.00" fill="#f9b27c">CRUD категорий и ачивок, мастер создания,</text>
<text xml:space="preserve" text-anchor="start" x="892.24" y="-384.5" font-family="Arial" font-size="15.00" fill="#f9b27c">управление пресреквизитами с DFS cycle</text>
<text xml:space="preserve" text-anchor="start" x="966.4" y="-366.5" font-family="Arial" font-size="15.00" fill="#f9b27c">detection (states 4&#45;11)</text>
</g>
<!-- grouphandlers&#45;&gt;keyboards -->
<g id="edge1" class="edge">
<title>grouphandlers&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M279.23,-322.87C336.32,-280.27 404.74,-229.23 462.83,-185.89"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="464.09,-188.23 468.53,-181.64 460.95,-184.02 464.09,-188.23"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="387.91,-240 387.91,-262.8 522.27,-262.8 522.27,-240 387.91,-240"/>
<text xml:space="preserve" text-anchor="start" x="390.91" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
<!-- privatehandlers&#45;&gt;keyboards -->
<g id="edge2" class="edge">
<title>privatehandlers&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M590.02,-322.87C590.02,-281.67 590.02,-232.56 590.02,-190.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="592.65,-190.36 590.02,-182.86 587.4,-190.36 592.65,-190.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="590.02,-240 590.02,-262.8 724.38,-262.8 724.38,-240 590.02,-240"/>
<text xml:space="preserve" text-anchor="start" x="593.02" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
<!-- adminpanel&#45;&gt;keyboards -->
<g id="edge3" class="edge">
<title>adminpanel&#45;&gt;keyboards</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M915.99,-322.87C856.11,-280.27 784.35,-229.23 723.42,-185.89"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="725,-183.79 717.37,-181.58 721.96,-188.07 725,-183.79"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="829.04,-240 829.04,-262.8 963.4,-262.8 963.4,-240 829.04,-240"/>
<text xml:space="preserve" text-anchor="start" x="832.04" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">строит клавиатуры</text>
</g>
</g>
</svg>
`;case"__familyAchievements_api_restEndpoints":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="813pt" height="533pt"
 viewBox="0.00 0.00 813.00 533.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 517.85)">
<!-- restendpoints -->
<g id="node1" class="node">
<title>restendpoints</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="561.95,-502.8 228.38,-502.8 228.38,-322.8 561.95,-322.8 561.95,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="321.24" y="-436.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">REST Endpoints</text>
<text xml:space="preserve" text-anchor="start" x="350.74" y="-414.9" font-family="Arial" font-size="13.00" fill="#f9b27c">FastAPI Router</text>
<text xml:space="preserve" text-anchor="start" x="248.44" y="-393.5" font-family="Arial" font-size="15.00" fill="#f9b27c">GET /api/groups, /members, /users/{id}/tree,</text>
<text xml:space="preserve" text-anchor="start" x="303.44" y="-375.5" font-family="Arial" font-size="15.00" fill="#f9b27c">/tree/aggregate, /categories</text>
</g>
<!-- achievementservice -->
<g id="node2" class="node">
<title>achievementservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="344.34,-180 0,-180 0,0 344.34,0 344.34,-180"/>
<text xml:space="preserve" text-anchor="start" x="78.24" y="-122.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Achievement Service</text>
<text xml:space="preserve" text-anchor="start" x="115.45" y="-101.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="100.45" y="-79.7" font-family="Arial" font-size="15.00" fill="#f9b27c">get_user_tree_graph,</text>
<text xml:space="preserve" text-anchor="start" x="27.08" y="-61.7" font-family="Arial" font-size="15.00" fill="#f9b27c">get_group_aggregate_tree. Статус ачивки</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-43.7" font-family="Arial" font-size="15.00" fill="#f9b27c">вычисляется лениво — без фоновых задач.</text>
</g>
<!-- repos -->
<g id="node3" class="node">
<title>repos</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="782.49,-180 453.85,-180 453.85,0 782.49,0 782.49,-180"/>
<text xml:space="preserve" text-anchor="start" x="562.59" y="-113.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Repositories</text>
<text xml:space="preserve" text-anchor="start" x="512.67" y="-92.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy 2.0 async, selectinload</text>
<text xml:space="preserve" text-anchor="start" x="473.91" y="-70.7" font-family="Arial" font-size="15.00" fill="#f9b27c">user_repo, group_repo, achievement_repo,</text>
<text xml:space="preserve" text-anchor="start" x="537.71" y="-52.7" font-family="Arial" font-size="15.00" fill="#f9b27c">claim_repo, admin_repo</text>
</g>
<!-- restendpoints&#45;&gt;achievementservice -->
<g id="edge1" class="edge">
<title>restendpoints&#45;&gt;achievementservice</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M333.35,-322.87C304.28,-281.06 269.56,-231.11 239.8,-188.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="242.08,-186.98 235.65,-182.32 237.77,-189.97 242.08,-186.98"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="290.36,-240 290.36,-262.8 395.2,-262.8 395.2,-240 290.36,-240"/>
<text xml:space="preserve" text-anchor="start" x="293.36" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">tree / aggregate</text>
</g>
<!-- restendpoints&#45;&gt;repos -->
<g id="edge2" class="edge">
<title>restendpoints&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M456.99,-322.87C486.05,-281.06 520.78,-231.11 550.54,-188.29"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="552.57,-189.97 554.69,-182.32 548.26,-186.98 552.57,-189.97"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="513.36,-240 513.36,-262.8 700.66,-262.8 700.66,-240 513.36,-240"/>
<text xml:space="preserve" text-anchor="start" x="516.36" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">groups, members, categories</text>
</g>
</g>
</svg>
`;case"__familyAchievements_api_achievementService":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="851pt" height="856pt"
 viewBox="0.00 0.00 851.00 856.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 840.65)">
<!-- bot -->
<g id="node1" class="node">
<title>bot</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="352.67,-825.6 0,-825.6 0,-645.6 352.67,-645.6 352.67,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="116.31" y="-768.4" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram Bot</text>
<text xml:space="preserve" text-anchor="start" x="67.58" y="-746.7" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, python&#45;telegram&#45;bot v21</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-725.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">Обрабатывает команды в групповых чатах и</text>
<text xml:space="preserve" text-anchor="start" x="44.64" y="-707.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ведёт личные диалоги (12 состояний</text>
<text xml:space="preserve" text-anchor="start" x="101.3" y="-689.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ConversationHandler).</text>
</g>
<!-- achievementservice -->
<g id="node2" class="node">
<title>achievementservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="801.51,-502.8 457.17,-502.8 457.17,-322.8 801.51,-322.8 801.51,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="535.41" y="-445.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Achievement Service</text>
<text xml:space="preserve" text-anchor="start" x="572.62" y="-423.9" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="557.62" y="-402.5" font-family="Arial" font-size="15.00" fill="#f9b27c">get_user_tree_graph,</text>
<text xml:space="preserve" text-anchor="start" x="484.25" y="-384.5" font-family="Arial" font-size="15.00" fill="#f9b27c">get_group_aggregate_tree. Статус ачивки</text>
<text xml:space="preserve" text-anchor="start" x="477.22" y="-366.5" font-family="Arial" font-size="15.00" fill="#f9b27c">вычисляется лениво — без фоновых задач.</text>
</g>
<!-- restendpoints -->
<g id="node3" class="node">
<title>restendpoints</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="796.12,-825.6 462.55,-825.6 462.55,-645.6 796.12,-645.6 796.12,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="555.41" y="-759.4" font-family="Arial" font-size="20.00" fill="#ffe0c2">REST Endpoints</text>
<text xml:space="preserve" text-anchor="start" x="584.9" y="-737.7" font-family="Arial" font-size="13.00" fill="#f9b27c">FastAPI Router</text>
<text xml:space="preserve" text-anchor="start" x="482.61" y="-716.3" font-family="Arial" font-size="15.00" fill="#f9b27c">GET /api/groups, /members, /users/{id}/tree,</text>
<text xml:space="preserve" text-anchor="start" x="537.61" y="-698.3" font-family="Arial" font-size="15.00" fill="#f9b27c">/tree/aggregate, /categories</text>
</g>
<!-- repos -->
<g id="node4" class="node">
<title>repos</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="793.65,-180 465.02,-180 465.02,0 793.65,0 793.65,-180"/>
<text xml:space="preserve" text-anchor="start" x="573.76" y="-113.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Repositories</text>
<text xml:space="preserve" text-anchor="start" x="523.84" y="-92.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy 2.0 async, selectinload</text>
<text xml:space="preserve" text-anchor="start" x="485.08" y="-70.7" font-family="Arial" font-size="15.00" fill="#f9b27c">user_repo, group_repo, achievement_repo,</text>
<text xml:space="preserve" text-anchor="start" x="548.88" y="-52.7" font-family="Arial" font-size="15.00" fill="#f9b27c">claim_repo, admin_repo</text>
</g>
<!-- bot&#45;&gt;achievementservice -->
<g id="edge1" class="edge">
<title>bot&#45;&gt;achievementservice</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M275.25,-645.62C307.73,-617.92 344.58,-588.05 379.98,-562.8 406.12,-544.15 434.67,-525.57 462.83,-508.16"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="463.96,-510.55 468.98,-504.38 461.21,-506.08 463.96,-510.55"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="379.98,-562.8 379.98,-585.6 602.34,-585.6 602.34,-562.8 379.98,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="382.98" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">get_user_achievements_by_status</text>
</g>
<!-- achievementservice&#45;&gt;repos -->
<g id="edge3" class="edge">
<title>achievementservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M629.34,-322.87C629.34,-281.67 629.34,-232.56 629.34,-190.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="631.96,-190.36 629.34,-182.86 626.71,-190.36 631.96,-190.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="629.34,-240 629.34,-262.8 821.34,-262.8 821.34,-240 629.34,-240"/>
<text xml:space="preserve" text-anchor="start" x="632.34" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">compute_achievement_status</text>
</g>
<!-- restendpoints&#45;&gt;achievementservice -->
<g id="edge2" class="edge">
<title>restendpoints&#45;&gt;achievementservice</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M629.34,-645.67C629.34,-604.47 629.34,-555.36 629.34,-512.97"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="631.96,-513.16 629.34,-505.66 626.71,-513.16 631.96,-513.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="629.34,-562.8 629.34,-585.6 734.18,-585.6 734.18,-562.8 629.34,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="632.34" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">tree / aggregate</text>
</g>
</g>
</svg>
`;case"__familyAchievements_api_claimService":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="387pt" height="856pt"
 viewBox="0.00 0.00 387.00 856.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 840.65)">
<!-- bot -->
<g id="node1" class="node">
<title>bot</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="354.76,-825.6 2.08,-825.6 2.08,-645.6 354.76,-645.6 354.76,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="118.4" y="-768.4" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram Bot</text>
<text xml:space="preserve" text-anchor="start" x="69.66" y="-746.7" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, python&#45;telegram&#45;bot v21</text>
<text xml:space="preserve" text-anchor="start" x="22.14" y="-725.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">Обрабатывает команды в групповых чатах и</text>
<text xml:space="preserve" text-anchor="start" x="46.72" y="-707.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ведёт личные диалоги (12 состояний</text>
<text xml:space="preserve" text-anchor="start" x="103.38" y="-689.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ConversationHandler).</text>
</g>
<!-- claimservice -->
<g id="node2" class="node">
<title>claimservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="356.84,-502.8 0,-502.8 0,-322.8 356.84,-322.8 356.84,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="116.74" y="-436.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Claim Service</text>
<text xml:space="preserve" text-anchor="start" x="121.7" y="-414.9" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="35.45" y="-393.5" font-family="Arial" font-size="15.00" fill="#f9b27c">submit_claim, approve_claim, reject_claim.</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-375.5" font-family="Arial" font-size="15.00" fill="#f9b27c">Транзакция в БД → уведомление через бота.</text>
</g>
<!-- repos -->
<g id="node3" class="node">
<title>repos</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="342.74,-180 14.1,-180 14.1,0 342.74,0 342.74,-180"/>
<text xml:space="preserve" text-anchor="start" x="122.84" y="-113.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Repositories</text>
<text xml:space="preserve" text-anchor="start" x="72.92" y="-92.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy 2.0 async, selectinload</text>
<text xml:space="preserve" text-anchor="start" x="34.16" y="-70.7" font-family="Arial" font-size="15.00" fill="#f9b27c">user_repo, group_repo, achievement_repo,</text>
<text xml:space="preserve" text-anchor="start" x="97.96" y="-52.7" font-family="Arial" font-size="15.00" fill="#f9b27c">claim_repo, admin_repo</text>
</g>
<!-- bot&#45;&gt;claimservice -->
<g id="edge1" class="edge">
<title>bot&#45;&gt;claimservice</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M178.42,-645.67C178.42,-604.47 178.42,-555.36 178.42,-512.97"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="181.05,-513.16 178.42,-505.66 175.8,-513.16 181.05,-513.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="178.42,-562.8 178.42,-585.6 333.82,-585.6 333.82,-562.8 178.42,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="181.42" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">submit / approve / reject</text>
</g>
<!-- claimservice&#45;&gt;repos -->
<g id="edge2" class="edge">
<title>claimservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M178.42,-322.87C178.42,-281.67 178.42,-232.56 178.42,-190.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="181.05,-190.36 178.42,-182.86 175.8,-190.36 181.05,-190.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="178.42,-240 178.42,-262.8 261.42,-262.8 261.42,-240 178.42,-240"/>
<text xml:space="preserve" text-anchor="start" x="181.42" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">claim CRUD</text>
</g>
</g>
</svg>
`;case"__familyAchievements_api_adminService":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="403pt" height="856pt"
 viewBox="0.00 0.00 403.00 856.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 840.65)">
<!-- bot -->
<g id="node1" class="node">
<title>bot</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="353.91,-825.6 1.24,-825.6 1.24,-645.6 353.91,-645.6 353.91,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="117.55" y="-768.4" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram Bot</text>
<text xml:space="preserve" text-anchor="start" x="68.82" y="-746.7" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, python&#45;telegram&#45;bot v21</text>
<text xml:space="preserve" text-anchor="start" x="21.3" y="-725.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">Обрабатывает команды в групповых чатах и</text>
<text xml:space="preserve" text-anchor="start" x="45.88" y="-707.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ведёт личные диалоги (12 состояний</text>
<text xml:space="preserve" text-anchor="start" x="102.54" y="-689.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ConversationHandler).</text>
</g>
<!-- adminservice -->
<g id="node2" class="node">
<title>adminservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="355.16,-502.8 0,-502.8 0,-322.8 355.16,-322.8 355.16,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="113.11" y="-445.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Admin Service</text>
<text xml:space="preserve" text-anchor="start" x="120.86" y="-423.9" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-402.5" font-family="Arial" font-size="15.00" fill="#f9b27c">Безопасные CRUD&#45;обёртки для категорий и</text>
<text xml:space="preserve" text-anchor="start" x="61.28" y="-384.5" font-family="Arial" font-size="15.00" fill="#f9b27c">ачивок, toggle prerequisite с cycle</text>
<text xml:space="preserve" text-anchor="start" x="145.05" y="-366.5" font-family="Arial" font-size="15.00" fill="#f9b27c">detection.</text>
</g>
<!-- repos -->
<g id="node3" class="node">
<title>repos</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="341.9,-180 13.26,-180 13.26,0 341.9,0 341.9,-180"/>
<text xml:space="preserve" text-anchor="start" x="122" y="-113.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Repositories</text>
<text xml:space="preserve" text-anchor="start" x="72.08" y="-92.1" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy 2.0 async, selectinload</text>
<text xml:space="preserve" text-anchor="start" x="33.32" y="-70.7" font-family="Arial" font-size="15.00" fill="#f9b27c">user_repo, group_repo, achievement_repo,</text>
<text xml:space="preserve" text-anchor="start" x="97.12" y="-52.7" font-family="Arial" font-size="15.00" fill="#f9b27c">claim_repo, admin_repo</text>
</g>
<!-- bot&#45;&gt;adminservice -->
<g id="edge1" class="edge">
<title>bot&#45;&gt;adminservice</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M177.58,-645.67C177.58,-604.47 177.58,-555.36 177.58,-512.97"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="180.2,-513.16 177.58,-505.66 174.95,-513.16 180.2,-513.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="177.58,-562.8 177.58,-585.6 360.16,-585.6 360.16,-562.8 177.58,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="180.58" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">CRUD ачивок и категорий</text>
</g>
<!-- adminservice&#45;&gt;repos -->
<g id="edge2" class="edge">
<title>adminservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M177.58,-322.87C177.58,-281.67 177.58,-232.56 177.58,-190.17"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="180.2,-190.36 177.58,-182.86 174.95,-190.36 180.2,-190.36"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="177.58,-240 177.58,-262.8 372.65,-262.8 372.65,-240 177.58,-240"/>
<text xml:space="preserve" text-anchor="start" x="180.58" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">achievement / category CRUD</text>
</g>
</g>
</svg>
`;case"__familyAchievements_api_repos":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="2213pt" height="856pt"
 viewBox="0.00 0.00 2213.00 856.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 840.65)">
<!-- bot -->
<g id="node1" class="node">
<title>bot</title>
<polygon fill="#0284c7" stroke="#0369a1" stroke-width="0" points="352.67,-825.6 0,-825.6 0,-645.6 352.67,-645.6 352.67,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="116.31" y="-768.4" font-family="Arial" font-size="20.00" fill="#f0f9ff">Telegram Bot</text>
<text xml:space="preserve" text-anchor="start" x="67.58" y="-746.7" font-family="Arial" font-size="13.00" fill="#b6ecf7">Python 3.12, python&#45;telegram&#45;bot v21</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-725.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">Обрабатывает команды в групповых чатах и</text>
<text xml:space="preserve" text-anchor="start" x="44.64" y="-707.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ведёт личные диалоги (12 состояний</text>
<text xml:space="preserve" text-anchor="start" x="101.3" y="-689.3" font-family="Arial" font-size="15.00" fill="#b6ecf7">ConversationHandler).</text>
</g>
<!-- repos -->
<g id="node2" class="node">
<title>repos</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1242.65,-502.8 914.02,-502.8 914.02,-322.8 1242.65,-322.8 1242.65,-502.8"/>
<text xml:space="preserve" text-anchor="start" x="1022.76" y="-436.6" font-family="Arial" font-size="20.00" fill="#ffe0c2">Repositories</text>
<text xml:space="preserve" text-anchor="start" x="972.84" y="-414.9" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy 2.0 async, selectinload</text>
<text xml:space="preserve" text-anchor="start" x="934.08" y="-393.5" font-family="Arial" font-size="15.00" fill="#f9b27c">user_repo, group_repo, achievement_repo,</text>
<text xml:space="preserve" text-anchor="start" x="997.88" y="-375.5" font-family="Arial" font-size="15.00" fill="#f9b27c">claim_repo, admin_repo</text>
</g>
<!-- restendpoints -->
<g id="node3" class="node">
<title>restendpoints</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="796.12,-825.6 462.55,-825.6 462.55,-645.6 796.12,-645.6 796.12,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="555.41" y="-759.4" font-family="Arial" font-size="20.00" fill="#ffe0c2">REST Endpoints</text>
<text xml:space="preserve" text-anchor="start" x="584.9" y="-737.7" font-family="Arial" font-size="13.00" fill="#f9b27c">FastAPI Router</text>
<text xml:space="preserve" text-anchor="start" x="482.61" y="-716.3" font-family="Arial" font-size="15.00" fill="#f9b27c">GET /api/groups, /members, /users/{id}/tree,</text>
<text xml:space="preserve" text-anchor="start" x="537.61" y="-698.3" font-family="Arial" font-size="15.00" fill="#f9b27c">/tree/aggregate, /categories</text>
</g>
<!-- achievementservice -->
<g id="node4" class="node">
<title>achievementservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1250.51,-825.6 906.17,-825.6 906.17,-645.6 1250.51,-645.6 1250.51,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="984.41" y="-768.4" font-family="Arial" font-size="20.00" fill="#ffe0c2">Achievement Service</text>
<text xml:space="preserve" text-anchor="start" x="1021.62" y="-746.7" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="1006.62" y="-725.3" font-family="Arial" font-size="15.00" fill="#f9b27c">get_user_tree_graph,</text>
<text xml:space="preserve" text-anchor="start" x="933.25" y="-707.3" font-family="Arial" font-size="15.00" fill="#f9b27c">get_group_aggregate_tree. Статус ачивки</text>
<text xml:space="preserve" text-anchor="start" x="926.22" y="-689.3" font-family="Arial" font-size="15.00" fill="#f9b27c">вычисляется лениво — без фоновых задач.</text>
</g>
<!-- claimservice -->
<g id="node5" class="node">
<title>claimservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="1717.76,-825.6 1360.92,-825.6 1360.92,-645.6 1717.76,-645.6 1717.76,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="1477.66" y="-759.4" font-family="Arial" font-size="20.00" fill="#ffe0c2">Claim Service</text>
<text xml:space="preserve" text-anchor="start" x="1482.62" y="-737.7" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="1396.37" y="-716.3" font-family="Arial" font-size="15.00" fill="#f9b27c">submit_claim, approve_claim, reject_claim.</text>
<text xml:space="preserve" text-anchor="start" x="1380.97" y="-698.3" font-family="Arial" font-size="15.00" fill="#f9b27c">Транзакция в БД → уведомление через бота.</text>
</g>
<!-- adminservice -->
<g id="node6" class="node">
<title>adminservice</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="2182.91,-825.6 1827.76,-825.6 1827.76,-645.6 2182.91,-645.6 2182.91,-825.6"/>
<text xml:space="preserve" text-anchor="start" x="1940.87" y="-768.4" font-family="Arial" font-size="20.00" fill="#ffe0c2">Admin Service</text>
<text xml:space="preserve" text-anchor="start" x="1948.62" y="-746.7" font-family="Arial" font-size="13.00" fill="#f9b27c">SQLAlchemy async</text>
<text xml:space="preserve" text-anchor="start" x="1847.81" y="-725.3" font-family="Arial" font-size="15.00" fill="#f9b27c">Безопасные CRUD&#45;обёртки для категорий и</text>
<text xml:space="preserve" text-anchor="start" x="1889.04" y="-707.3" font-family="Arial" font-size="15.00" fill="#f9b27c">ачивок, toggle prerequisite с cycle</text>
<text xml:space="preserve" text-anchor="start" x="1972.81" y="-689.3" font-family="Arial" font-size="15.00" fill="#f9b27c">detection.</text>
</g>
<!-- db -->
<g id="node7" class="node">
<title>db</title>
<path fill="#64748b" stroke="#475569" stroke-width="2" d="M1243.46,-163.64C1243.46,-172.67 1169.45,-180 1078.34,-180 987.22,-180 913.21,-172.67 913.21,-163.64 913.21,-163.64 913.21,-16.36 913.21,-16.36 913.21,-7.33 987.22,0 1078.34,0 1169.45,0 1243.46,-7.33 1243.46,-16.36 1243.46,-16.36 1243.46,-163.64 1243.46,-163.64"/>
<path fill="none" stroke="#475569" stroke-width="2" d="M1243.46,-163.64C1243.46,-154.61 1169.45,-147.27 1078.34,-147.27 987.22,-147.27 913.21,-154.61 913.21,-163.64"/>
<text xml:space="preserve" text-anchor="start" x="1035.53" y="-131.8" font-family="Arial" font-size="20.00" fill="#f8fafc">Database</text>
<text xml:space="preserve" text-anchor="start" x="946.11" y="-110.1" font-family="Arial" font-size="13.00" fill="#cbd5e1">SQLite (dev) / PostgreSQL 15 (prod), Alembic</text>
<text xml:space="preserve" text-anchor="start" x="933.27" y="-88.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">users, groups, group_members, categories,</text>
<text xml:space="preserve" text-anchor="start" x="938.26" y="-70.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievements, achievement_prerequisites</text>
<text xml:space="preserve" text-anchor="start" x="962.45" y="-52.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">(DAG), group_user_achievements,</text>
<text xml:space="preserve" text-anchor="start" x="937.43" y="-34.7" font-family="Arial" font-size="15.00" fill="#cbd5e1">achievement_claims, achievement_events</text>
</g>
<!-- bot&#45;&gt;repos -->
<g id="edge1" class="edge">
<title>bot&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M352.44,-662.69C432.11,-630.91 527.73,-593.8 614.74,-562.8 709.73,-528.96 816.85,-494.31 904.17,-466.95"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="904.91,-469.46 911.28,-464.72 903.34,-464.45 904.91,-469.46"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="614.74,-562.8 614.74,-585.6 811.34,-585.6 811.34,-562.8 614.74,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="617.74" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">читает участников и ачивки</text>
</g>
<!-- repos&#45;&gt;db -->
<g id="edge6" class="edge">
<title>repos&#45;&gt;db</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1078.34,-322.87C1078.34,-282.01 1078.34,-233.38 1078.34,-191.23"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1080.96,-191.47 1078.34,-183.97 1075.71,-191.47 1080.96,-191.47"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1078.34,-240 1078.34,-262.8 1112.35,-262.8 1112.35,-240 1078.34,-240"/>
<text xml:space="preserve" text-anchor="start" x="1081.34" y="-247.2" font-family="Arial" font-size="14.00" fill="#c9c9c9">SQL</text>
</g>
<!-- restendpoints&#45;&gt;repos -->
<g id="edge2" class="edge">
<title>restendpoints&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M749.53,-645.75C786.16,-618.91 826.63,-589.49 864.03,-562.8 888.83,-545.11 915.38,-526.43 941.06,-508.51"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="942.23,-510.9 946.88,-504.45 939.22,-506.59 942.23,-510.9"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="864.03,-562.8 864.03,-585.6 1051.34,-585.6 1051.34,-562.8 864.03,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="867.03" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">groups, members, categories</text>
</g>
<!-- achievementservice&#45;&gt;repos -->
<g id="edge3" class="edge">
<title>achievementservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1078.34,-645.67C1078.34,-604.47 1078.34,-555.36 1078.34,-512.97"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1080.96,-513.16 1078.34,-505.66 1075.71,-513.16 1080.96,-513.16"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1078.34,-562.8 1078.34,-585.6 1270.34,-585.6 1270.34,-562.8 1078.34,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="1081.34" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">compute_achievement_status</text>
</g>
<!-- claimservice&#45;&gt;repos -->
<g id="edge4" class="edge">
<title>claimservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1415,-645.62C1377.32,-618.84 1335.73,-589.49 1297.34,-562.8 1271.87,-545.1 1244.61,-526.38 1218.29,-508.41"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1219.95,-506.37 1212.28,-504.31 1216.99,-510.71 1219.95,-506.37"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1323.74,-562.8 1323.74,-585.6 1406.74,-585.6 1406.74,-562.8 1323.74,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="1326.74" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">claim CRUD</text>
</g>
<!-- adminservice&#45;&gt;repos -->
<g id="edge5" class="edge">
<title>adminservice&#45;&gt;repos</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M1827.84,-665.91C1809.14,-658.94 1790.38,-652.06 1772.34,-645.6 1596.08,-582.54 1392.78,-515.27 1251.98,-469.53"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="1253.19,-467.17 1245.25,-467.35 1251.57,-472.16 1253.19,-467.17"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="1582.59,-562.8 1582.59,-585.6 1777.66,-585.6 1777.66,-562.8 1582.59,-562.8"/>
<text xml:space="preserve" text-anchor="start" x="1585.59" y="-570" font-family="Arial" font-size="14.00" fill="#c9c9c9">achievement / category CRUD</text>
</g>
</g>
</svg>
`;case"__familyAchievements_api_frontend":return`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<!-- Generated by graphviz version 14.1.2 (0)
 -->
<!-- Pages: 1 -->
<svg width="833pt" height="574pt"
 viewBox="0.00 0.00 833.00 574.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(15.05 559.05)">
<g id="clust1" class="cluster">
<title>cluster_api</title>
<polygon fill="#0d4b6c" stroke="#0b3c57" points="191.42,-8 191.42,-273.2 621.42,-273.2 621.42,-8 191.42,-8"/>
<text xml:space="preserve" text-anchor="start" x="199.42" y="-260.3" font-family="Arial" font-weight="bold" font-size="11.00" fill="#b6ecf7" fill-opacity="0.701961">REST API &amp; FRONTEND</text>
</g>
<!-- frontend -->
<g id="node1" class="node">
<title>frontend</title>
<polygon fill="#a35829" stroke="#7e451d" stroke-width="0" points="589.43,-220 223.41,-220 223.41,-40 589.43,-40 589.43,-220"/>
<text xml:space="preserve" text-anchor="start" x="343.06" y="-153.8" font-family="Arial" font-size="20.00" fill="#ffe0c2">Web Frontend</text>
<text xml:space="preserve" text-anchor="start" x="285.03" y="-132.1" font-family="Arial" font-size="13.00" fill="#f9b27c">Vanilla JS, Cytoscape.js, cytoscape&#45;dagre</text>
<text xml:space="preserve" text-anchor="start" x="243.47" y="-110.7" font-family="Arial" font-size="15.00" fill="#f9b27c">SPA: каталог групп, дерево ачивок, фильтры,</text>
<text xml:space="preserve" text-anchor="start" x="339.74" y="-92.7" font-family="Arial" font-size="15.00" fill="#f9b27c">детальная панель.</text>
</g>
<!-- member -->
<g id="node2" class="node">
<title>member</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="356.84,-544 0,-544 0,-364 356.84,-364 356.84,-544"/>
<text xml:space="preserve" text-anchor="start" x="133.97" y="-468" font-family="Arial" font-size="20.00" fill="#eff6ff">Участник</text>
<text xml:space="preserve" text-anchor="start" x="42.98" y="-444.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи. Подаёт заявки на ачивки,</text>
<text xml:space="preserve" text-anchor="start" x="20.06" y="-426.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">просматривает прогресс в боте и браузере.</text>
</g>
<!-- admin -->
<g id="node3" class="node">
<title>admin</title>
<polygon fill="#3b82f6" stroke="#2563eb" stroke-width="0" points="802.42,-544 466.42,-544 466.42,-364 802.42,-364 802.42,-544"/>
<text xml:space="preserve" text-anchor="start" x="562.18" y="-477" font-family="Arial" font-size="20.00" fill="#eff6ff">Администратор</text>
<text xml:space="preserve" text-anchor="start" x="493.14" y="-453.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">Член семьи с правами admin. Одобряет /</text>
<text xml:space="preserve" text-anchor="start" x="486.47" y="-435.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">отклоняет заявки, регистрирует группу,</text>
<text xml:space="preserve" text-anchor="start" x="559.41" y="-417.5" font-family="Arial" font-size="15.00" fill="#bfdbfe">управляет ачивками.</text>
</g>
<!-- member&#45;&gt;frontend -->
<g id="edge1" class="edge">
<title>member&#45;&gt;frontend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M241.33,-364.16C271.17,-322.01 306.9,-271.55 337.48,-228.36"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="339.58,-229.94 341.77,-222.3 335.3,-226.9 339.58,-229.94"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="299.26,-281.2 299.26,-304 472.51,-304 472.51,-281.2 299.26,-281.2"/>
<text xml:space="preserve" text-anchor="start" x="302.26" y="-288.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">просматривает прогресс</text>
</g>
<!-- admin&#45;&gt;frontend -->
<g id="edge2" class="edge">
<title>admin&#45;&gt;frontend</title>
<path fill="none" stroke="#8d8d8d" stroke-width="2" stroke-dasharray="5,2" d="M571.51,-364.16C541.67,-322.01 505.94,-271.55 475.36,-228.36"/>
<polygon fill="#8d8d8d" stroke="#8d8d8d" stroke-width="2" points="477.54,-226.9 471.07,-222.3 473.26,-229.94 477.54,-226.9"/>
<polygon fill="#18191b" fill-opacity="0.627451" stroke="none" points="527.26,-281.2 527.26,-304 743.3,-304 743.3,-281.2 527.26,-281.2"/>
<text xml:space="preserve" text-anchor="start" x="530.26" y="-288.4" font-family="Arial" font-size="14.00" fill="#c9c9c9">агрегированное дерево группы</text>
</g>
</g>
</svg>
`;default:throw new Error("Unknown viewId: "+e)}}const J5=Object.freeze(Object.defineProperty({__proto__:null,dotSource:X5,svgSource:Y5},Symbol.toStringTag,{value:"Module"}));function ev(e){switch(e){case"index":return`direction: down

Member: {
  label: "Участник"
  shape: c4-person
}
Admin: {
  label: "Администратор"
  shape: c4-person
}
TelegramCloud: {
  label: "Telegram"
}
FamilyAchievements: {
  label: "Family Achievements"
}

Member -> TelegramCloud: "команды в чате, личные сообщения"
Member -> FamilyAchievements: "просматривает прогресс"
Admin -> TelegramCloud: "управление через бота"
Admin -> FamilyAchievements: "агрегированное дерево группы"
TelegramCloud -> FamilyAchievements: "updates (long-polling)"
FamilyAchievements -> TelegramCloud: "sendMessage / editMessage"
`;case"containers":return`direction: down

FamilyAchievementsBot: {
  label: "Telegram Bot"
}
Member: {
  label: "Участник"
  shape: c4-person
}
Admin: {
  label: "Администратор"
  shape: c4-person
}
FamilyAchievementsApi: {
  label: "REST API & Frontend"
}
TelegramCloud: {
  label: "Telegram"
}
FamilyAchievementsDb: {
  label: "Database"
  shape: stored_data
}

FamilyAchievementsBot -> FamilyAchievementsApi: "[...]"
FamilyAchievementsBot -> FamilyAchievementsDb: "SQL (shared SQLAlchemy engine)"
FamilyAchievementsApi -> FamilyAchievementsDb: "SQL"
Member -> FamilyAchievementsApi: "просматривает прогресс"
Admin -> FamilyAchievementsApi: "агрегированное дерево группы"
FamilyAchievementsBot -> TelegramCloud: "sendMessage / editMessage"
Member -> TelegramCloud: "команды в чате, личные сообщения"
Admin -> TelegramCloud: "управление через бота"
TelegramCloud -> FamilyAchievementsBot: "updates (long-polling)"
`;case"botComponents":return`direction: right

FamilyAchievementsBotGroupHandlers: {
  label: "Group Handlers"
}
FamilyAchievementsBotPrivateHandlers: {
  label: "Private Handlers"
}
FamilyAchievementsBotAdminPanel: {
  label: "Admin Panel"
}
FamilyAchievementsBotKeyboards: {
  label: "Keyboards"
}
FamilyAchievementsDb: {
  label: "Database"
  shape: stored_data
}

FamilyAchievementsBotGroupHandlers -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
FamilyAchievementsBotPrivateHandlers -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
FamilyAchievementsBotAdminPanel -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
`;case"apiComponents":return`direction: right

FamilyAchievementsApiRestEndpoints: {
  label: "REST Endpoints"
}
FamilyAchievementsApiClaimService: {
  label: "Claim Service"
}
FamilyAchievementsApiAdminService: {
  label: "Admin Service"
}
Member: {
  label: "Участник"
  shape: c4-person
}
Admin: {
  label: "Администратор"
  shape: c4-person
}
FamilyAchievementsApiAchievementService: {
  label: "Achievement Service"
}
FamilyAchievementsApiFrontend: {
  label: "Web Frontend"
}
FamilyAchievementsApiRepos: {
  label: "Repositories"
}
FamilyAchievementsDb: {
  label: "Database"
  shape: stored_data
}

FamilyAchievementsApiRestEndpoints -> FamilyAchievementsApiAchievementService: "tree / aggregate"
FamilyAchievementsApiRestEndpoints -> FamilyAchievementsApiRepos: "groups, members, categories"
FamilyAchievementsApiAchievementService -> FamilyAchievementsApiRepos: "compute_achievement_status"
FamilyAchievementsApiClaimService -> FamilyAchievementsApiRepos: "claim CRUD"
FamilyAchievementsApiAdminService -> FamilyAchievementsApiRepos: "achievement / category CRUD"
FamilyAchievementsApiRepos -> FamilyAchievementsDb: "SQL"
Member -> FamilyAchievementsApiFrontend: "просматривает прогресс"
Admin -> FamilyAchievementsApiFrontend: "агрегированное дерево группы"
`;case"claimFlow":return`direction: down

Member: {
  label: "Участник"
  shape: c4-person
}
Admin: {
  label: "Администратор"
  shape: c4-person
}
FamilyAchievements: {
  label: "Family Achievements"

  Bot: {
    label: "Telegram Bot"

    PrivateHandlers: {
      label: "Private Handlers"
    }
    AdminPanel: {
      label: "Admin Panel"
    }
  }
  Api: {
    label: "REST API & Frontend"

    ClaimService: {
      label: "Claim Service"
    }
    Repos: {
      label: "Repositories"
    }
  }
  Db: {
    label: "Database"
    shape: stored_data
  }
}
TelegramCloud: {
  label: "Telegram"
}

Member -> TelegramCloud: "команды в чате, личные сообщения"
Admin -> TelegramCloud: "управление через бота"
FamilyAchievements.Bot.PrivateHandlers -> FamilyAchievements.Api.ClaimService: "submit / approve / reject"
FamilyAchievements.Api.ClaimService -> FamilyAchievements.Api.Repos: "claim CRUD"
FamilyAchievements.Api.Repos -> FamilyAchievements.Db: "SQL"
FamilyAchievements.Bot -> FamilyAchievements.Db: "SQL (shared SQLAlchemy engine)"
`;case"__member":return`direction: down

Member: {
  label: "Участник"
  shape: c4-person
}
TelegramCloud: {
  label: "Telegram"
}
FamilyAchievements: {
  label: "Family Achievements"
}

Member -> TelegramCloud: "команды в чате, личные сообщения"
Member -> FamilyAchievements: "просматривает прогресс"
`;case"__admin":return`direction: down

Admin: {
  label: "Администратор"
  shape: c4-person
}
TelegramCloud: {
  label: "Telegram"
}
FamilyAchievements: {
  label: "Family Achievements"
}

Admin -> TelegramCloud: "управление через бота"
Admin -> FamilyAchievements: "агрегированное дерево группы"
`;case"__telegramCloud":return`direction: down

Member: {
  label: "Участник"
  shape: c4-person
}
Admin: {
  label: "Администратор"
  shape: c4-person
}
FamilyAchievements: {
  label: "Family Achievements"
}
TelegramCloud: {
  label: "Telegram"
}

Member -> TelegramCloud: "команды в чате, личные сообщения"
Admin -> TelegramCloud: "управление через бота"
FamilyAchievements -> TelegramCloud: "sendMessage / editMessage"
TelegramCloud -> FamilyAchievements: "updates (long-polling)"
`;case"__familyAchievements_db":return`direction: down

FamilyAchievementsBot: {
  label: "Telegram Bot"
}
FamilyAchievementsApi: {
  label: "REST API & Frontend"
}
FamilyAchievementsDb: {
  label: "Database"
  shape: stored_data
}

FamilyAchievementsBot -> FamilyAchievementsDb: "SQL (shared SQLAlchemy engine)"
FamilyAchievementsApi -> FamilyAchievementsDb: "SQL"
`;case"__familyAchievements_bot_groupHandlers":return`direction: down

FamilyAchievementsBotGroupHandlers: {
  label: "Group Handlers"
}
FamilyAchievementsApi: {
  label: "REST API & Frontend"
}
FamilyAchievementsBotKeyboards: {
  label: "Keyboards"
}

FamilyAchievementsBotGroupHandlers -> FamilyAchievementsApi: "читает участников и ачивки"
FamilyAchievementsBotGroupHandlers -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
`;case"__familyAchievements_bot_privateHandlers":return`direction: down

FamilyAchievementsBotPrivateHandlers: {
  label: "Private Handlers"
}
FamilyAchievementsApi: {
  label: "REST API & Frontend"
}
FamilyAchievementsBotKeyboards: {
  label: "Keyboards"
}

FamilyAchievementsBotPrivateHandlers -> FamilyAchievementsApi: "[...]"
FamilyAchievementsBotPrivateHandlers -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
`;case"__familyAchievements_bot_adminPanel":return`direction: down

FamilyAchievementsBotAdminPanel: {
  label: "Admin Panel"
}
FamilyAchievementsApi: {
  label: "REST API & Frontend"
}
FamilyAchievementsBotKeyboards: {
  label: "Keyboards"
}

FamilyAchievementsBotAdminPanel -> FamilyAchievementsApi: "CRUD ачивок и категорий"
FamilyAchievementsBotAdminPanel -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
`;case"__familyAchievements_bot_keyboards":return`direction: down

FamilyAchievementsBotGroupHandlers: {
  label: "Group Handlers"
}
FamilyAchievementsBotPrivateHandlers: {
  label: "Private Handlers"
}
FamilyAchievementsBotAdminPanel: {
  label: "Admin Panel"
}
FamilyAchievementsBotKeyboards: {
  label: "Keyboards"
}

FamilyAchievementsBotGroupHandlers -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
FamilyAchievementsBotPrivateHandlers -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
FamilyAchievementsBotAdminPanel -> FamilyAchievementsBotKeyboards: "строит клавиатуры"
`;case"__familyAchievements_api_restEndpoints":return`direction: down

FamilyAchievementsApiRestEndpoints: {
  label: "REST Endpoints"
}
FamilyAchievementsApiAchievementService: {
  label: "Achievement Service"
}
FamilyAchievementsApiRepos: {
  label: "Repositories"
}

FamilyAchievementsApiRestEndpoints -> FamilyAchievementsApiAchievementService: "tree / aggregate"
FamilyAchievementsApiRestEndpoints -> FamilyAchievementsApiRepos: "groups, members, categories"
`;case"__familyAchievements_api_achievementService":return`direction: down

FamilyAchievementsBot: {
  label: "Telegram Bot"
}
FamilyAchievementsApiRestEndpoints: {
  label: "REST Endpoints"
}
FamilyAchievementsApiAchievementService: {
  label: "Achievement Service"
}
FamilyAchievementsApiRepos: {
  label: "Repositories"
}

FamilyAchievementsBot -> FamilyAchievementsApiAchievementService: "get_user_achievements_by_status"
FamilyAchievementsApiRestEndpoints -> FamilyAchievementsApiAchievementService: "tree / aggregate"
FamilyAchievementsApiAchievementService -> FamilyAchievementsApiRepos: "compute_achievement_status"
`;case"__familyAchievements_api_claimService":return`direction: down

FamilyAchievementsBot: {
  label: "Telegram Bot"
}
FamilyAchievementsApiClaimService: {
  label: "Claim Service"
}
FamilyAchievementsApiRepos: {
  label: "Repositories"
}

FamilyAchievementsBot -> FamilyAchievementsApiClaimService: "submit / approve / reject"
FamilyAchievementsApiClaimService -> FamilyAchievementsApiRepos: "claim CRUD"
`;case"__familyAchievements_api_adminService":return`direction: down

FamilyAchievementsBot: {
  label: "Telegram Bot"
}
FamilyAchievementsApiAdminService: {
  label: "Admin Service"
}
FamilyAchievementsApiRepos: {
  label: "Repositories"
}

FamilyAchievementsBot -> FamilyAchievementsApiAdminService: "CRUD ачивок и категорий"
FamilyAchievementsApiAdminService -> FamilyAchievementsApiRepos: "achievement / category CRUD"
`;case"__familyAchievements_api_repos":return`direction: down

FamilyAchievementsBot: {
  label: "Telegram Bot"
}
FamilyAchievementsApiRestEndpoints: {
  label: "REST Endpoints"
}
FamilyAchievementsApiAchievementService: {
  label: "Achievement Service"
}
FamilyAchievementsApiClaimService: {
  label: "Claim Service"
}
FamilyAchievementsApiAdminService: {
  label: "Admin Service"
}
FamilyAchievementsApiRepos: {
  label: "Repositories"
}
FamilyAchievementsDb: {
  label: "Database"
  shape: stored_data
}

FamilyAchievementsBot -> FamilyAchievementsApiRepos: "читает участников и ачивки"
FamilyAchievementsApiRestEndpoints -> FamilyAchievementsApiRepos: "groups, members, categories"
FamilyAchievementsApiAchievementService -> FamilyAchievementsApiRepos: "compute_achievement_status"
FamilyAchievementsApiClaimService -> FamilyAchievementsApiRepos: "claim CRUD"
FamilyAchievementsApiAdminService -> FamilyAchievementsApiRepos: "achievement / category CRUD"
FamilyAchievementsApiRepos -> FamilyAchievementsDb: "SQL"
`;case"__familyAchievements_api_frontend":return`direction: down

Member: {
  label: "Участник"
  shape: c4-person
}
Admin: {
  label: "Администратор"
  shape: c4-person
}
FamilyAchievementsApi: {
  label: "REST API & Frontend"

  Frontend: {
    label: "Web Frontend"
  }
}

Member -> FamilyAchievementsApi.Frontend: "просматривает прогресс"
Admin -> FamilyAchievementsApi.Frontend: "агрегированное дерево группы"
`;default:throw new Error("Unknown viewId: "+e)}}const tv=Object.freeze(Object.defineProperty({__proto__:null,d2Source:ev},Symbol.toStringTag,{value:"Module"}));export{kv as $,Bv as A,Y1 as B,is as C,fv as D,br as E,ls as F,Ev as G,Cv as H,Ft as I,yn as J,Lv as K,ke as L,v5 as M,vi as N,ir as O,js as P,bv as Q,Dv as R,_ as S,xe as T,Gt as U,yv as V,Sv as W,Uy as X,wv as Y,Zy as Z,Av as _,Ov as a,E5 as a0,Gv as a1,Nv as a2,Iv as a3,Pv as a4,zv as a5,_v as a6,$t as b,K1 as c,zs as d,Us as e,yr as f,lo as g,C5 as h,Tv as i,hv as j,Z1 as k,uv as l,ss as m,Fv as n,pv as o,W1 as p,It as q,Rv as r,bt as s,X1 as t,xv as u,mv as v,Jr as w,Se as x,vv as y,an as z};

var Ce=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},Dt=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let o=e[n++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=e[n++],s=e[n++],a=e[n++],c=((i&7)<<18|(o&63)<<12|(s&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let o=e[n++],s=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|s&63)}}return t.join("")},Oe={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){let o=e[i],s=i+1<e.length,a=s?e[i+1]:0,c=i+2<e.length,f=c?e[i+2]:0,u=o>>2,C=(o&3)<<4|a>>4,x=(a&15)<<2|f>>6,R=f&63;c||(R=64,s||(x=64)),r.push(n[u],n[C],n[x],n[R])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Ce(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Dt(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){let o=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;let f=i<e.length?n[e.charAt(i)]:64;++i;let C=i<e.length?n[e.charAt(i)]:64;if(++i,o==null||a==null||f==null||C==null)throw new q;let x=o<<2|a>>4;if(r.push(x),f!==64){let R=a<<4&240|f>>2;if(r.push(R),C!==64){let At=f<<6&192|C;r.push(At)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},q=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Tt=function(e){let t=Ce(e);return Oe.encodeByteArray(t,!0)},G=function(e){return Tt(e).replace(/\./g,"")},Ct=function(e){try{return Oe.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Ot(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var kt=()=>Ot().__FIREBASE_DEFAULTS__,Nt=()=>{if(typeof process>"u"||typeof process.env>"u")return;let e=process.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},xt=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&Ct(e[1]);return t&&JSON.parse(t)},Rt=()=>{try{return kt()||Nt()||xt()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}};var J=()=>{var e;return(e=Rt())===null||e===void 0?void 0:e.config};var M=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}};function B(){try{return typeof indexedDB=="object"}catch{return!1}}function P(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){t(n)}})}function ke(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}var Mt="FirebaseError",m=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Mt,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,b.prototype.create)}},b=class{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){let r=n[0]||{},i=`${this.service}/${t}`,o=this.errors[t],s=o?Bt(o,r):"Error",a=`${this.serviceName}: ${s} (${i}).`;return new m(i,a,r)}};function Bt(e,t){return e.replace(Pt,(n,r)=>{let i=t[r];return i!=null?String(i):`<${r}?>`})}var Pt=/\{\$([^}]+)}/g;function L(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let o=e[i],s=t[i];if(Te(o)&&Te(s)){if(!L(o,s))return!1}else if(o!==s)return!1}for(let i of r)if(!n.includes(i))return!1;return!0}function Te(e){return e!==null&&typeof e=="object"}var fi=4*60*60*1e3;function j(e){return e&&e._delegate?e._delegate:e}var h=class{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var E="[DEFAULT]";var Y=class{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){let r=new M;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;let r=this.normalizeInstanceIdentifier(t?.identifier),i=(n=t?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(jt(t))try{this.getOrInitializeService({instanceIdentifier:E})}catch{}for(let[n,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=E){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=E){return this.instances.has(t)}getOptions(t=E){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(let[o,s]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(o);r===a&&s.resolve(i)}return i}onInit(t,n){var r;let i=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);let s=this.instances.get(i);return s&&t(s,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,n){let r=this.onInitCallbacks.get(n);if(r)for(let i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Lt(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=E){return this.component?this.component.multipleInstances?t:E:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Lt(e){return e===E?void 0:e}function jt(e){return e.instantiationMode==="EAGER"}var $=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let n=new Y(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}};var $t=[],d;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(d||(d={}));var Ft={debug:d.DEBUG,verbose:d.VERBOSE,info:d.INFO,warn:d.WARN,error:d.ERROR,silent:d.SILENT},Ht=d.INFO,Vt={[d.DEBUG]:"log",[d.VERBOSE]:"log",[d.INFO]:"info",[d.WARN]:"warn",[d.ERROR]:"error"},Ut=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=Vt[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},F=class{constructor(t){this.name=t,this._logLevel=Ht,this._logHandler=Ut,this._userLogHandler=null,$t.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in d))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ft[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,d.DEBUG,...t),this._logHandler(this,d.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,d.VERBOSE,...t),this._logHandler(this,d.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,d.INFO,...t),this._logHandler(this,d.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,d.WARN,...t),this._logHandler(this,d.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,d.ERROR,...t),this._logHandler(this,d.ERROR,...t)}};var Wt=(e,t)=>t.some(n=>e instanceof n),Ne,xe;function zt(){return Ne||(Ne=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Kt(){return xe||(xe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Re=new WeakMap,Q=new WeakMap,Me=new WeakMap,X=new WeakMap,ee=new WeakMap;function qt(e){let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{n(p(e.result)),i()},s=()=>{r(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&Re.set(n,e)}).catch(()=>{}),ee.set(t,e),t}function Gt(e){if(Q.has(e))return;let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{n(),i()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});Q.set(e,t)}var Z={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Q.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Me.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Be(e){Z=e(Z)}function Jt(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){let r=e.call(H(this),t,...n);return Me.set(r,t.sort?t.sort():[t]),p(r)}:Kt().includes(e)?function(...t){return e.apply(H(this),t),p(Re.get(this))}:function(...t){return p(e.apply(H(this),t))}}function Yt(e){return typeof e=="function"?Jt(e):(e instanceof IDBTransaction&&Gt(e),Wt(e,zt())?new Proxy(e,Z):e)}function p(e){if(e instanceof IDBRequest)return qt(e);if(X.has(e))return X.get(e);let t=Yt(e);return t!==e&&(X.set(e,t),ee.set(t,e)),t}var H=e=>ee.get(e);function I(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){let s=indexedDB.open(e,t),a=p(s);return r&&s.addEventListener("upgradeneeded",c=>{r(p(s.result),c.oldVersion,c.newVersion,p(s.transaction),c)}),n&&s.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{o&&c.addEventListener("close",()=>o()),i&&c.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),a}function V(e,{blocked:t}={}){let n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),p(n).then(()=>{})}var Xt=["get","getKey","getAll","getAllKeys","count"],Qt=["put","add","delete","clear"],te=new Map;function Pe(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(te.get(t))return te.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=Qt.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Xt.includes(n)))return;let o=async function(s,...a){let c=this.transaction(s,i?"readwrite":"readonly"),f=c.store;return r&&(f=f.index(a.shift())),(await Promise.all([f[n](...a),i&&c.done]))[0]};return te.set(t,o),o}Be(e=>({...e,get:(t,n,r)=>Pe(t,n)||e.get(t,n,r),has:(t,n)=>!!Pe(t,n)||e.has(t,n)}));var re=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Zt(n)){let r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}};function Zt(e){let t=e.getComponent();return t?.type==="VERSION"}var ie="@firebase/app",Le="0.10.13";var w=new F("@firebase/app"),en="@firebase/app-compat",tn="@firebase/analytics-compat",nn="@firebase/analytics",rn="@firebase/app-check-compat",on="@firebase/app-check",sn="@firebase/auth",an="@firebase/auth-compat",cn="@firebase/database",un="@firebase/data-connect",fn="@firebase/database-compat",dn="@firebase/functions",ln="@firebase/functions-compat",hn="@firebase/installations",pn="@firebase/installations-compat",gn="@firebase/messaging",mn="@firebase/messaging-compat",bn="@firebase/performance",wn="@firebase/performance-compat",yn="@firebase/remote-config",_n="@firebase/remote-config-compat",vn="@firebase/storage",En="@firebase/storage-compat",In="@firebase/firestore",Sn="@firebase/vertexai-preview",An="@firebase/firestore-compat",Dn="firebase";var oe="[DEFAULT]",Tn={[ie]:"fire-core",[en]:"fire-core-compat",[nn]:"fire-analytics",[tn]:"fire-analytics-compat",[on]:"fire-app-check",[rn]:"fire-app-check-compat",[sn]:"fire-auth",[an]:"fire-auth-compat",[cn]:"fire-rtdb",[un]:"fire-data-connect",[fn]:"fire-rtdb-compat",[dn]:"fire-fn",[ln]:"fire-fn-compat",[hn]:"fire-iid",[pn]:"fire-iid-compat",[gn]:"fire-fcm",[mn]:"fire-fcm-compat",[bn]:"fire-perf",[wn]:"fire-perf-compat",[yn]:"fire-rc",[_n]:"fire-rc-compat",[vn]:"fire-gcs",[En]:"fire-gcs-compat",[In]:"fire-fst",[An]:"fire-fst-compat",[Sn]:"fire-vertex","fire-js":"fire-js",[Dn]:"fire-js-all"};var U=new Map,Cn=new Map,se=new Map;function je(e,t){try{e.container.addComponent(t)}catch(n){w.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function y(e){let t=e.name;if(se.has(t))return w.debug(`There were multiple attempts to register component ${t}.`),!1;se.set(t,e);for(let n of U.values())je(n,e);for(let n of Cn.values())je(n,e);return!0}function k(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}var On={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},v=new b("app","Firebase",On);var ae=class{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new h("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw v.create("app-deleted",{appName:this._name})}};function Ve(e,t={}){let n=e;typeof t!="object"&&(t={name:t});let r=Object.assign({name:oe,automaticDataCollectionEnabled:!1},t),i=r.name;if(typeof i!="string"||!i)throw v.create("bad-app-name",{appName:String(i)});if(n||(n=J()),!n)throw v.create("no-options");let o=U.get(i);if(o){if(L(n,o.options)&&L(r,o.config))return o;throw v.create("duplicate-app",{appName:i})}let s=new $(i);for(let c of se.values())s.addComponent(c);let a=new ae(n,r,s);return U.set(i,a),a}function fe(e=oe){let t=U.get(e);if(!t&&e===oe&&J())return Ve();if(!t)throw v.create("no-app",{appName:e});return t}function g(e,t,n){var r;let i=(r=Tn[e])!==null&&r!==void 0?r:e;n&&(i+=`-${n}`);let o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){let a=[`Unable to register library "${i}" with version "${t}":`];o&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&a.push("and"),s&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),w.warn(a.join(" "));return}y(new h(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}var kn="firebase-heartbeat-database",Nn=1,O="firebase-heartbeat-store",ne=null;function Ue(){return ne||(ne=I(kn,Nn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(O)}catch(n){console.warn(n)}}}}).catch(e=>{throw v.create("idb-open",{originalErrorMessage:e.message})})),ne}async function xn(e){try{let n=(await Ue()).transaction(O),r=await n.objectStore(O).get(We(e));return await n.done,r}catch(t){if(t instanceof m)w.warn(t.message);else{let n=v.create("idb-get",{originalErrorMessage:t?.message});w.warn(n.message)}}}async function $e(e,t){try{let r=(await Ue()).transaction(O,"readwrite");await r.objectStore(O).put(t,We(e)),await r.done}catch(n){if(n instanceof m)w.warn(n.message);else{let r=v.create("idb-set",{originalErrorMessage:n?.message});w.warn(r.message)}}}function We(e){return`${e.name}!${e.options.appId}`}var Rn=1024,Mn=30*24*60*60*1e3,ce=class{constructor(t){this.container=t,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new ue(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Fe();return((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(s=>s.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{let a=new Date(s.date).valueOf();return Date.now()-a<=Mn}),this._storage.overwrite(this._heartbeatsCache))}catch(r){w.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=Fe(),{heartbeatsToSend:r,unsentEntries:i}=Bn(this._heartbeatsCache.heartbeats),o=G(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return w.warn(n),""}}};function Fe(){return new Date().toISOString().substring(0,10)}function Bn(e,t=Rn){let n=[],r=e.slice();for(let i of e){let o=n.find(s=>s.agent===i.agent);if(o){if(o.dates.push(i.date),He(n)>t){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),He(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var ue=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return B()?P().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await xn(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){let i=await this.read();return $e(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){let i=await this.read();return $e(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}};function He(e){return G(JSON.stringify({version:2,heartbeats:e})).length}function Pn(e){y(new h("platform-logger",t=>new re(t),"PRIVATE")),y(new h("heartbeat",t=>new ce(t),"PRIVATE")),g(ie,Le,e),g(ie,Le,"esm2017"),g("fire-js","")}Pn("");var Ln="firebase",jn="10.14.1";g(Ln,jn,"app");var qe="@firebase/installations",pe="0.6.9";var Ge=1e4,Je=`w:${pe}`,Ye="FIS_v2",$n="https://firebaseinstallations.googleapis.com/v1",Fn=60*60*1e3,Hn="installations",Vn="Installations";var Un={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},A=new b(Hn,Vn,Un);function Xe(e){return e instanceof m&&e.code.includes("request-failed")}function Qe({projectId:e}){return`${$n}/projects/${e}/installations`}function Ze(e){return{token:e.token,requestStatus:2,expiresIn:zn(e.expiresIn),creationTime:Date.now()}}async function et(e,t){let r=(await t.json()).error;return A.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function tt({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Wn(e,{refreshToken:t}){let n=tt(e);return n.append("Authorization",Kn(t)),n}async function nt(e){let t=await e();return t.status>=500&&t.status<600?e():t}function zn(e){return Number(e.replace("s","000"))}function Kn(e){return`${Ye} ${e}`}async function qn({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=Qe(e),i=tt(e),o=t.getImmediate({optional:!0});if(o){let f=await o.getHeartbeatsHeader();f&&i.append("x-firebase-client",f)}let s={fid:n,authVersion:Ye,appId:e.appId,sdkVersion:Je},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await nt(()=>fetch(r,a));if(c.ok){let f=await c.json();return{fid:f.fid||n,registrationStatus:2,refreshToken:f.refreshToken,authToken:Ze(f.authToken)}}else throw await et("Create Installation",c)}function rt(e){return new Promise(t=>{setTimeout(t,e)})}function Gn(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}var Jn=/^[cdef][\w-]{21}$/,he="";function Yn(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let n=Xn(e);return Jn.test(n)?n:he}catch{return he}}function Xn(e){return Gn(e).substr(0,22)}function z(e){return`${e.appName}!${e.appId}`}var it=new Map;function ot(e,t){let n=z(e);st(n,t),Qn(n,t)}function st(e,t){let n=it.get(e);if(n)for(let r of n)r(t)}function Qn(e,t){let n=Zn();n&&n.postMessage({key:e,fid:t}),er()}var S=null;function Zn(){return!S&&"BroadcastChannel"in self&&(S=new BroadcastChannel("[Firebase] FID Change"),S.onmessage=e=>{st(e.data.key,e.data.fid)}),S}function er(){it.size===0&&S&&(S.close(),S=null)}var tr="firebase-installations-database",nr=1,D="firebase-installations-store",de=null;function ge(){return de||(de=I(tr,nr,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(D)}}})),de}async function W(e,t){let n=z(e),i=(await ge()).transaction(D,"readwrite"),o=i.objectStore(D),s=await o.get(n);return await o.put(t,n),await i.done,(!s||s.fid!==t.fid)&&ot(e,t.fid),t}async function at(e){let t=z(e),r=(await ge()).transaction(D,"readwrite");await r.objectStore(D).delete(t),await r.done}async function K(e,t){let n=z(e),i=(await ge()).transaction(D,"readwrite"),o=i.objectStore(D),s=await o.get(n),a=t(s);return a===void 0?await o.delete(n):await o.put(a,n),await i.done,a&&(!s||s.fid!==a.fid)&&ot(e,a.fid),a}async function me(e){let t,n=await K(e.appConfig,r=>{let i=rr(r),o=ir(e,i);return t=o.registrationPromise,o.installationEntry});return n.fid===he?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function rr(e){let t=e||{fid:Yn(),registrationStatus:0};return ct(t)}function ir(e,t){if(t.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(A.create("app-offline"));return{installationEntry:t,registrationPromise:i}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=or(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:sr(e)}:{installationEntry:t}}async function or(e,t){try{let n=await qn(e,t);return W(e.appConfig,n)}catch(n){throw Xe(n)&&n.customData.serverCode===409?await at(e.appConfig):await W(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function sr(e){let t=await ze(e.appConfig);for(;t.registrationStatus===1;)await rt(100),t=await ze(e.appConfig);if(t.registrationStatus===0){let{installationEntry:n,registrationPromise:r}=await me(e);return r||n}return t}function ze(e){return K(e,t=>{if(!t)throw A.create("installation-not-found");return ct(t)})}function ct(e){return ar(e)?{fid:e.fid,registrationStatus:0}:e}function ar(e){return e.registrationStatus===1&&e.registrationTime+Ge<Date.now()}async function cr({appConfig:e,heartbeatServiceProvider:t},n){let r=ur(e,n),i=Wn(e,n),o=t.getImmediate({optional:!0});if(o){let f=await o.getHeartbeatsHeader();f&&i.append("x-firebase-client",f)}let s={installation:{sdkVersion:Je,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await nt(()=>fetch(r,a));if(c.ok){let f=await c.json();return Ze(f)}else throw await et("Generate Auth Token",c)}function ur(e,{fid:t}){return`${Qe(e)}/${t}/authTokens:generate`}async function be(e,t=!1){let n,r=await K(e.appConfig,o=>{if(!ut(o))throw A.create("not-registered");let s=o.authToken;if(!t&&lr(s))return o;if(s.requestStatus===1)return n=fr(e,t),o;{if(!navigator.onLine)throw A.create("app-offline");let a=pr(o);return n=dr(e,a),a}});return n?await n:r.authToken}async function fr(e,t){let n=await Ke(e.appConfig);for(;n.authToken.requestStatus===1;)await rt(100),n=await Ke(e.appConfig);let r=n.authToken;return r.requestStatus===0?be(e,t):r}function Ke(e){return K(e,t=>{if(!ut(t))throw A.create("not-registered");let n=t.authToken;return gr(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function dr(e,t){try{let n=await cr(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await W(e.appConfig,r),n}catch(n){if(Xe(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await at(e.appConfig);else{let r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await W(e.appConfig,r)}throw n}}function ut(e){return e!==void 0&&e.registrationStatus===2}function lr(e){return e.requestStatus===2&&!hr(e)}function hr(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Fn}function pr(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function gr(e){return e.requestStatus===1&&e.requestTime+Ge<Date.now()}async function mr(e){let t=e,{installationEntry:n,registrationPromise:r}=await me(t);return r?r.catch(console.error):be(t).catch(console.error),n.fid}async function br(e,t=!1){let n=e;return await wr(n),(await be(n,t)).token}async function wr(e){let{registrationPromise:t}=await me(e);t&&await t}function yr(e){if(!e||!e.options)throw le("App Configuration");if(!e.name)throw le("App Name");let t=["projectId","apiKey","appId"];for(let n of t)if(!e.options[n])throw le(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function le(e){return A.create("missing-app-config-values",{valueName:e})}var ft="installations",_r="installations-internal",vr=e=>{let t=e.getProvider("app").getImmediate(),n=yr(t),r=k(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Er=e=>{let t=e.getProvider("app").getImmediate(),n=k(t,ft).getImmediate();return{getId:()=>mr(n),getToken:i=>br(n,i)}};function Ir(){y(new h(ft,vr,"PUBLIC")),y(new h(_r,Er,"PRIVATE"))}Ir();g(qe,pe);g(qe,pe,"esm2017");var Sr="/firebase-messaging-sw.js",Ar="/firebase-cloud-messaging-push-scope",bt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Dr="https://fcmregistrations.googleapis.com/v1",wt="google.c.a.c_id",Tr="google.c.a.c_l",Cr="google.c.a.ts",Or="google.c.a.e",dt;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(dt||(dt={}));var N;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(N||(N={}));function _(e){let t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function kr(e){let t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}var we="fcm_token_details_db",Nr=5,lt="fcm_token_object_Store";async function xr(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(o=>o.name).includes(we))return null;let t=null;return(await I(we,Nr,{upgrade:async(r,i,o,s)=>{var a;if(i<2||!r.objectStoreNames.contains(lt))return;let c=s.objectStore(lt),f=await c.index("fcmSenderId").get(e);if(await c.clear(),!!f){if(i===2){let u=f;if(!u.auth||!u.p256dh||!u.endpoint)return;t={token:u.fcmToken,createTime:(a=u.createTime)!==null&&a!==void 0?a:Date.now(),subscriptionOptions:{auth:u.auth,p256dh:u.p256dh,endpoint:u.endpoint,swScope:u.swScope,vapidKey:typeof u.vapidKey=="string"?u.vapidKey:_(u.vapidKey)}}}else if(i===3){let u=f;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:_(u.auth),p256dh:_(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:_(u.vapidKey)}}}else if(i===4){let u=f;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:_(u.auth),p256dh:_(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:_(u.vapidKey)}}}}}})).close(),await V(we),await V("fcm_vapid_details_db"),await V("undefined"),Rr(t)?t:null}function Rr(e){if(!e||!e.subscriptionOptions)return!1;let{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}var Mr="firebase-messaging-database",Br=1,T="firebase-messaging-store",ye=null;function Ee(){return ye||(ye=I(Mr,Br,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(T)}}})),ye}async function yt(e){let t=Se(e),r=await(await Ee()).transaction(T).objectStore(T).get(t);if(r)return r;{let i=await xr(e.appConfig.senderId);if(i)return await Ie(e,i),i}}async function Ie(e,t){let n=Se(e),i=(await Ee()).transaction(T,"readwrite");return await i.objectStore(T).put(t,n),await i.done,t}async function Pr(e){let t=Se(e),r=(await Ee()).transaction(T,"readwrite");await r.objectStore(T).delete(t),await r.done}function Se({appConfig:e}){return e.appId}var Lr={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},l=new b("messaging","Messaging",Lr);async function jr(e,t){let n=await De(e),r=vt(t),i={method:"POST",headers:n,body:JSON.stringify(r)},o;try{o=await(await fetch(Ae(e.appConfig),i)).json()}catch(s){throw l.create("token-subscribe-failed",{errorInfo:s?.toString()})}if(o.error){let s=o.error.message;throw l.create("token-subscribe-failed",{errorInfo:s})}if(!o.token)throw l.create("token-subscribe-no-token");return o.token}async function $r(e,t){let n=await De(e),r=vt(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},o;try{o=await(await fetch(`${Ae(e.appConfig)}/${t.token}`,i)).json()}catch(s){throw l.create("token-update-failed",{errorInfo:s?.toString()})}if(o.error){let s=o.error.message;throw l.create("token-update-failed",{errorInfo:s})}if(!o.token)throw l.create("token-update-no-token");return o.token}async function _t(e,t){let r={method:"DELETE",headers:await De(e)};try{let o=await(await fetch(`${Ae(e.appConfig)}/${t}`,r)).json();if(o.error){let s=o.error.message;throw l.create("token-unsubscribe-failed",{errorInfo:s})}}catch(i){throw l.create("token-unsubscribe-failed",{errorInfo:i?.toString()})}}function Ae({projectId:e}){return`${Dr}/projects/${e}/registrations`}async function De({appConfig:e,installations:t}){let n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function vt({p256dh:e,auth:t,endpoint:n,vapidKey:r}){let i={web:{endpoint:n,auth:t,p256dh:e}};return r!==bt&&(i.web.applicationPubKey=r),i}var Fr=7*24*60*60*1e3;async function Hr(e){let t=await Wr(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:_(t.getKey("auth")),p256dh:_(t.getKey("p256dh"))},r=await yt(e.firebaseDependencies);if(r){if(zr(r.subscriptionOptions,n))return Date.now()>=r.createTime+Fr?Ur(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await _t(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return ht(e.firebaseDependencies,n)}else return ht(e.firebaseDependencies,n)}async function Vr(e){let t=await yt(e.firebaseDependencies);t&&(await _t(e.firebaseDependencies,t.token),await Pr(e.firebaseDependencies));let n=await e.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function Ur(e,t){try{let n=await $r(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await Ie(e.firebaseDependencies,r),n}catch(n){throw n}}async function ht(e,t){let r={token:await jr(e,t),createTime:Date.now(),subscriptionOptions:t};return await Ie(e,r),r.token}async function Wr(e,t){let n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:kr(t)})}function zr(e,t){let n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}function pt(e){let t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Kr(t,e),qr(t,e),Gr(t,e),t}function Kr(e,t){if(!t.notification)return;e.notification={};let n=t.notification.title;n&&(e.notification.title=n);let r=t.notification.body;r&&(e.notification.body=r);let i=t.notification.image;i&&(e.notification.image=i);let o=t.notification.icon;o&&(e.notification.icon=o)}function qr(e,t){t.data&&(e.data=t.data)}function Gr(e,t){var n,r,i,o,s;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};let a=(i=(r=t.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&i!==void 0?i:(o=t.notification)===null||o===void 0?void 0:o.click_action;a&&(e.fcmOptions.link=a);let c=(s=t.fcmOptions)===null||s===void 0?void 0:s.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}function Jr(e){return typeof e=="object"&&!!e&&wt in e}Yr("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");function Yr(e,t){let n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}function Xr(e){if(!e||!e.options)throw _e("App Configuration Object");if(!e.name)throw _e("App Name");let t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(let r of t)if(!n[r])throw _e(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function _e(e){return l.create("missing-app-config-values",{valueName:e})}var ve=class{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let i=Xr(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}};async function Et(e){try{e.swRegistration=await navigator.serviceWorker.register(Sr,{scope:Ar}),e.swRegistration.update().catch(()=>{})}catch(t){throw l.create("failed-service-worker-registration",{browserErrorMessage:t?.message})}}async function Qr(e,t){if(!t&&!e.swRegistration&&await Et(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw l.create("invalid-sw-registration");e.swRegistration=t}}async function Zr(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=bt)}async function It(e,t){if(!navigator)throw l.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw l.create("permission-blocked");return await Zr(e,t?.vapidKey),await Qr(e,t?.serviceWorkerRegistration),Hr(e)}async function ei(e,t,n){let r=ti(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[wt],message_name:n[Tr],message_time:n[Cr],message_device_time:Math.floor(Date.now()/1e3)})}function ti(e){switch(e){case N.NOTIFICATION_CLICKED:return"notification_open";case N.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}async function ni(e,t){let n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===N.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(pt(n)):e.onMessageHandler.next(pt(n)));let r=n.data;Jr(r)&&r[Or]==="1"&&await ei(e,n.messageType,r)}var gt="@firebase/messaging",mt="0.12.12";var ri=e=>{let t=new ve(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>ni(t,n)),t},ii=e=>{let t=e.getProvider("messaging").getImmediate();return{getToken:r=>It(t,r)}};function oi(){y(new h("messaging",ri,"PUBLIC")),y(new h("messaging-internal",ii,"PRIVATE")),g(gt,mt),g(gt,mt,"esm2017")}async function St(){try{await P()}catch{return!1}return typeof window<"u"&&B()&&ke()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}async function si(e){if(!navigator)throw l.create("only-available-in-window");return e.swRegistration||await Et(e),Vr(e)}function ai(e=fe()){return St().then(t=>{if(!t)throw l.create("unsupported-browser")},t=>{throw l.create("indexed-db-unsupported")}),k(j(e),"messaging").getImmediate()}async function ci(e,t){return e=j(e),It(e,t)}function ui(e){return e=j(e),si(e)}oi();export{ui as deleteToken,ai as getMessaging,ci as getToken,Ve as initializeApp,St as isSupported};
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
   * in compliance with the License. You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under the License
   * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
   * or implied. See the License for the specific language governing permissions and limitations under
   * the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/

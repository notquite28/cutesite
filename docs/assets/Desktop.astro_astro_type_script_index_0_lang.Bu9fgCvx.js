import{o as v,$ as b,a as g,b as f,c as k}from"./chunks/windows.CJP78FRN.js";import{a as w}from"./chunks/theme.BNr7VQyl.js";import"./chunks/index.CASokwIO.js";function y(s){const t={about:"content-about",links:"content-links",work:"content-work",faq:"content-faq",autism:"content-autism"};if(s.startsWith("blog-"))return`
      <div class="blog-post-iframe" style="height: 100%; width: 100%; overflow: hidden;">
        <iframe src="/posts/${s.replace("blog-","")}" style="height: 100%; width: 100%; border: none;"></iframe>
      </div>
    `;const e=t[s];if(!e)return null;const i=document.getElementById(e);return i?i.innerHTML:null}async function E(s){const t=s.querySelector("#dynamic-work-content");if(!t)return;const e="/";try{const n=await(await fetch(`${e}work-component`)).text();t.innerHTML=n,s.querySelectorAll(".blog-post").forEach(r=>{r.addEventListener("click",()=>{const d=r.dataset.url;if(d){const h=d.split("/").pop();h&&v(`blog-${h}`)}})})}catch(i){console.error("Error loading work component:",i),t.innerHTML="<p>Error loading projects</p>"}}function T(s,t){const e=y(s);if(!e){t.innerHTML="<p>Content not found</p>";return}t.innerHTML=e,s==="work"&&E(t),s==="autism"&&w()}function L(s,t){const e=t.querySelector(".window-content");e&&(e.innerHTML=`
    <div class="loading-spinner">
      <div class="spinner"></div>
      <span>Loading...</span>
    </div>
  `,setTimeout(()=>{T(s,e)},300))}const J=String.raw;class x extends HTMLElement{#i;#t;constructor(){super(),this.attachShadow({mode:"open"}),this.#i={},this.#t={}}connectedCallback(){this.shadowRoot.innerHTML=J`
            <style>
                :host {
                    --JpadController-padding: 1em;
                    --JpadController-gap: .5em;
                    --JpadController-background: transparent;

                    display: grid;
                    grid-template:
                        "left top    right" 1fr
                        "left center right" 1fr
                        "left bottom right" 1fr
                        / 1fr auto 1fr;
                    padding: var(--JpadController-padding);
                    grid-gap: var(--JpadController-gap);
                    background: var(--JpadController-background);
                }

                .Top {
                    grid-area: top;
                }

                .LeftArea {
                    grid-area: left;
                }

                .Center {
                    grid-area: center;
                }

                .RightArea {
                    grid-area: right;
                }

                .Bottom {
                    grid-area: bottom;
                }

                .Area {
                    display: grid;
                    grid-template:
                        "above " 1fr
                        "middle" auto
                        "below " 1fr
                        / 1fr;
                    grid-gap: var(--JpadController-gap);
                }

                .Surface {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }

                @media (orientation: portrait) {
                    :host {
                        grid-template:
                            "top    top    top   " auto
                            "left   center right " 1fr
                            "bottom bottom bottom" auto
                            / 1fr auto 1fr;
                    }

                    :host([expanded="portrait"]),
                    :host([expanded="always"]) {
                        grid-template-columns: auto 1fr auto;
                    }
                }

                @media (orientation: landscape) {
                    :host([expanded="landscape"]),
                    :host([expanded="always"]) {
                        grid-template-columns: auto 1fr auto;
                    }
                }
            </style>

            <div class="Top Surface" part="top">
                <slot name="top"></slot>
            </div>

            <div class="LeftArea Area">
                <div class="Surface" part="top-left">
                    <slot name="top-left"></slot>
                </div>
                <div class="Surface" part="left">
                    <slot name="left"></slot>
                </div>
                <div class="Surface" part="bottom-left">
                    <slot name="bottom-left"></slot>
                </div>
            </div>

            <div class="Center Surface" part="center">
                <slot></slot>
            </div>

            <div class="RightArea Area">
                <div class="Surface" part="top-right">
                    <slot name="top-right"></slot>
                </div>
                <div class="Surface" part="right">
                    <slot name="right"></slot>
                </div>
                <div class="Surface" part="bottom-right">
                    <slot name="bottom-right"></slot>
                </div>
            </div>

            <div class="Bottom Surface" part="bottom">
                <slot name="bottom"></slot>
            </div>
        `,this.addEventListener("trackpadmove",this.#e),this.addEventListener("buttontrigger",this.#n)}#e=t=>{this.#i[t.detail.name]=t.detail.axis};#n=t=>{this.#t[t.detail.name]={pressed:t.detail.pressed,justPressed:t.detail.pressed}};getAxis(t){return this.#i[t]||{x:0,y:0}}isPressed(t){return(this.#t[t]||{}).pressed||!1}isJustPressed(t){const e=this.#t[t]||{},i=e.justPressed||!1;return e.justPressed=!1,i}}customElements.define("jpad-controller",x);const A=String.raw;class R extends HTMLElement{#i;#t;#e;#n;#o;static get observedAttributes(){return["name","dpad","normalize","upkey","upkeys","downkey","downkeys","leftkey","leftkeys","rightkey","rightkeys"]}constructor(){super(),this.attachShadow({mode:"open"}),this.#i=null,this.#t={up:[],down:[],left:[],right:[]},this.#e={}}connectedCallback(){this.shadowRoot.innerHTML=A`
            <style>
                :host {
                    --JpadTrackpad-padding: .2em;
                    --JpadTrackpad-size: 6em;
                    --JpadTrackpad-border: .2em solid rgba(150, 150, 150, .6);
                    --JpadTrackpad-borderRadius: 50%;
                    --JpadTrackpad-background: transparent;

                    --JpadTrackpad-indicator-size: 50%;
                    --JpadTrackpad-indicator-borderRadius: 50%;
                    --JpadTrackpad-indicator-background: rgba(150, 150, 150, .6);
                    --JpadTrackpad-indicator-transitionDuration: .05s;

                    --JpadTrackpad-active-border: .2em solid rgba(150, 150, 150, .6);
                    --JpadTrackpad-active-background: transparent;
                    --JpadTrackpad-active-indicator-background: rgba(150, 150, 150, .8);

                    display: block;
                    padding: var(--JpadTrackpad-padding);
                    border-radius: var(--JpadTrackpad-borderRadius);
                }

                .Trackpad {
                    display: grid;
                    place-items: center;
                    width: var(--JpadTrackpad-size);
                    height: var(--JpadTrackpad-size);
                    border-radius: var(--JpadTrackpad-borderRadius);
                    border: var(--JpadTrackpad-border);
                    background: var(--JpadTrackpad-background);
                }

                .Indicator {
                    display: block;
                    width: var(--JpadTrackpad-indicator-size);
                    height: var(--JpadTrackpad-indicator-size);
                    border-radius: var(--JpadTrackpad-indicator-borderRadius);
                    background: var(--JpadTrackpad-indicator-background);
                    transition: transform var(--JpadTrackpad-indicator-transitionDuration);
                }

                :host([active]) .Trackpad {
                    border: var(--JpadTrackpad-active-border);
                    background: var(--JpadTrackpad-active-background);
                }

                :host([active]) .Indicator {
                    background: var(--JpadTrackpad-active-indicator-background);
                }

                :host([hide-indicator]) .Indicator {
                    opacity: 0;
                }
            </style>

            <div class="Trackpad" part="trackpad">
                <div class="Indicator" part="indicator"></div>
            </div>
        `,this.#n=this.shadowRoot.querySelector(".Trackpad"),this.#o=this.shadowRoot.querySelector(".Indicator"),this.addEventListener("touchstart",this.#w),this.addEventListener("touchmove",this.#h),this.addEventListener("touchend",this.#s),this.addEventListener("touchcancel",this.#s),this.addEventListener("mousedown",this.#u,{passive:!0}),window.addEventListener("keydown",this.#a),window.addEventListener("keyup",this.#a)}disconnectedCallback(){window.removeEventListener("mousemove",this.#r),window.removeEventListener("mouseup",this.#p),window.removeEventListener("keydown",this.#a),window.removeEventListener("keyup",this.#a)}#w=t=>{t.preventDefault(),this.active=!0;for(const e of t.changedTouches){this.#i=e.identifier,this.#d(e);return}};#h=t=>{t.preventDefault();for(const e of t.changedTouches)if(e.identifier===this.#i){this.#c(e);return}};#s=t=>{t.preventDefault(),this.active=!1,this.#i=null,this.#m()};#u=t=>{this.active=!0,this.#d(t),window.addEventListener("mousemove",this.#r,{passive:!0}),window.addEventListener("mouseup",this.#p,{passive:!0,once:!0})};#r=t=>{!this._trackpadRect||!this.active||this.#c(t)};#p=()=>{this.active=!1,this.#m(),window.removeEventListener("mousemove",this.#r,{passive:!0})};#a=t=>{const e=!!t.type[5];if(t.repeat||!this.#t.up.includes(t.code)&&!this.#t.down.includes(t.code)&&!this.#t.left.includes(t.code)&&!this.#t.right.includes(t.code))return;this.#e[t.code]=e;const i=this.#t.up.some(o=>this.#e[o]),n=this.#t.down.some(o=>this.#e[o]),a=this.#t.left.some(o=>this.#e[o]),r=this.#t.right.some(o=>this.#e[o]),d=i||n||a||r,h={x:r-a,y:n-i},l=this.#g(h);this.active!==d&&d&&this.#x(l),this.#f(l),this.active!==d&&!d&&this.#A(l),this._trackpadRect=this.#n.getBoundingClientRect(),this._trackpadRadius=this._trackpadRect.width*.5,this.#b({x:l.x*this._trackpadRadius,y:l.y*this._trackpadRadius}),this.active=d};get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t)}get active(){return this.hasAttribute("active")}set active(t){this.active!==t&&(this.toggleAttribute("active",t),t?this.#C():this.#P(),this.#B())}get normalize(){return this.hasAttribute("normalize")}set normalize(t){this.toggleAttribute("normalize",t)}get dpad(){return this.hasAttribute("dpad")}set dpad(t){this.toggleAttribute("dpad",t)}#d(t){this._trackpadRect=this.#n.getBoundingClientRect(),this._trackpadRadius=this._trackpadRect.width*.5;const e=this.#v(t,this._trackpadRect),i=this.#E(e,this._trackpadRadius);this.#x(i),this.#f(i),this.#b(e)}#c(t){const e=this.#v(t,this._trackpadRect),i=this.#E(e,this._trackpadRadius);this.#f(i),this.#b(e)}#m(){const t={x:0,y:0};this.#f(t),this.#A(t),this.#b(t)}#v(t,e){const i=t.clientX-e.x-this._trackpadRadius,n=t.clientY-e.y-this._trackpadRadius;return this.#y({x:i,y:n},this._trackpadRadius)}#l({x:t,y:e}){return Math.hypot(t,e)}#y(t,e){const i=this.#l(t),n=Math.min(i,e)/i;return{x:n*t.x,y:n*t.y}}#E(t,e){return this.normalize&&this.dpad?this.#J(t):this.normalize?this.#g(t):this.dpad?this.#R(t,e):this.#T(t,e)}#R(t,e){const i=this.#J(t),n=this.#T(t,e),a=this.#l(n);return{x:i.x*a,y:i.y*a}}#g(t){const e=this.#l(t);return{x:t.x/e||0,y:t.y/e||0}}#T(t,e){return{x:this.#L(t.x,e),y:this.#L(t.y,e)}}#L(t,e){const i=-e,n=e;return 2*((t-i)/(n-i))-1}#J(t){const e=this.#g(t),i={x:Math.round(e.x),y:Math.round(e.y)};return this.#g(i)}#b({x:t,y:e}){this.#o.style.transform=`translate(${t}px, ${e}px)`}#x(t){this.dispatchEvent(new CustomEvent("trackpadpress",{composed:!0,bubbles:!0,detail:{name:this.name,axis:t}}))}#f(t){this.dispatchEvent(new CustomEvent("trackpadmove",{composed:!0,bubbles:!0,detail:{name:this.name,axis:t}}))}#A(t){this.dispatchEvent(new CustomEvent("trackpadrelease",{composed:!0,bubbles:!0,detail:{name:this.name,axis:t}}))}#C(){this.dispatchEvent(new CustomEvent("buttonpress",{composed:!0,bubbles:!0,detail:{name:this.name}}))}#B(){this.dispatchEvent(new CustomEvent("buttontrigger",{composed:!0,bubbles:!0,detail:{name:this.name,pressed:this.active}}))}#P(){this.dispatchEvent(new CustomEvent("buttonrelease",{composed:!0,bubbles:!0,detail:{name:this.name}}))}#k(t){return t.split(",").map(e=>e.trim())}attributeChangedCallback(t,e,i){if(e!==i)switch(t){case"upkey":case"upkeys":this.#t.up=this.#k(i);return;case"downkey":case"downkeys":this.#t.down=this.#k(i);return;case"leftkey":case"leftkeys":this.#t.left=this.#k(i);return;case"rightkey":case"rightkeys":this.#t.right=this.#k(i);return}}}customElements.define("jpad-trackpad",R);const C=String.raw;class B extends HTMLElement{#i;#t;#e;static get observedAttributes(){return["name","key","keys","passby"]}constructor(){super(),this.attachShadow({mode:"open"}),this.#i=[],this.#t={}}connectedCallback(){this.shadowRoot.innerHTML=C`
            <style>
                :host {
                    --JpadButton-padding: .2em;
                    --JpadButton-borderRadius: 50%;
                    --JpadButton-minSize: 2em;
                    --JpadButton-background: rgba(150, 150, 150, .6);

                    --JpadButton-active-background: rgba(150, 150, 150, .8);

                    --JpadButton-trigger-padding: .2em 1.5em;
                    --JpadButton-trigger-borderRadius: .5em;

                    display: inline-block;
                    padding: var(--JpadButton-padding);
                    border-radius: var(--JpadButton-borderRadius);
                }

                .Button {
                    display: grid;
                    place-items: center;
                    text-align: center;
                    min-width: var(--JpadButton-minSize);
                    min-height: var(--JpadButton-minSize);
                    border-radius: var(--JpadButton-borderRadius);
                    line-height: 1;
                    background: var(--JpadButton-background);
                    user-select: none;
                }

                :host([active]) .Button {
                    background: var(--JpadButton-active-background);
                }

                :host([trigger]) {
                    border-radius: var(--JpadButton-trigger-borderRadius);
                }

                :host([trigger]) .Button {
                    border-radius: var(--JpadButton-trigger-borderRadius);
                    padding: var(--JpadButton-trigger-padding);
                }
            </style>

            <div class="Button" part="button">
                <slot></slot>
            </div>
        `,this.#e=this.closest("jpad-tile")||this.parentNode,this.addEventListener("touchstart",this.#n),this.addEventListener("touchend",this.#o),this.addEventListener("touchcancel",this.#o),this.addEventListener("mousedown",this.#w),this.addEventListener("mouseup",this.#h),this.addEventListener("mouseleave",this.#h),this.#d(),window.addEventListener("keydown",this.#a),window.addEventListener("keyup",this.#a)}disconnectedCallback(){this.#c(),window.removeEventListener("keydown",this.#a),window.removeEventListener("keyup",this.#a)}#n=t=>{t.preventDefault(),this.active=!0};#o=t=>{t.preventDefault(),this.active=!1};#w=()=>{this.active=!0};#h=()=>{this.active=!1};#s=t=>{t.preventDefault();for(const e of t.targetTouches){const i=this.#y(e.clientX,e.clientY);if(i&&i===this){this.active=!0;return}}this.active=!1};#u=()=>{this.addEventListener("mouseenter",this.#r,{passive:!0}),window.addEventListener("mouseup",this.#p,{passive:!0,once:!0})};#r=()=>{this.active=!0};#p=()=>{this.removeEventListener("mouseenter",this.#r)};#a=t=>{const e=!!t.type[5];t.repeat||this.#i.includes(t.code)&&(this.#t[t.code]=e,this.active=this.#i.some(i=>this.#t[i]))};#d(){this.passby&&this.#e&&(this.#e.addEventListener("touchstart",this.#s),this.#e.addEventListener("touchmove",this.#s),this.#e.addEventListener("touchend",this.#s),this.#e.addEventListener("touchcancel",this.#s),this.#e.addEventListener("mousedown",this.#u))}#c(){this.#e&&(this.#e.removeEventListener("touchstart",this.#s),this.#e.removeEventListener("touchmove",this.#s),this.#e.removeEventListener("touchend",this.#s),this.#e.removeEventListener("touchcancel",this.#s),this.#e.removeEventListener("mousedown",this.#u))}get name(){return this.getAttribute("name")}set name(t){this.setAttribute("name",t)}get active(){return this.hasAttribute("active")}set active(t){this.active!==t&&(this.toggleAttribute("active",t),t?this.#m():this.#l(),this.#v())}get passby(){return this.hasAttribute("passby")}set passby(t){this.toggleAttribute("passby",t)}#m(){this.dispatchEvent(new CustomEvent("buttonpress",{composed:!0,bubbles:!0,detail:{name:this.name}}))}#v(){this.dispatchEvent(new CustomEvent("buttontrigger",{composed:!0,bubbles:!0,detail:{name:this.name,pressed:this.active}}))}#l(){this.dispatchEvent(new CustomEvent("buttonrelease",{composed:!0,bubbles:!0,detail:{name:this.name}}))}attributeChangedCallback(t,e,i){if(e!==i)switch(t){case"key":case"keys":this.#i=i.split(",").map(n=>n.trim());return;case"passby":this.passby?this.#d():this.#c();return}}#y(t,e){const i=document.elementFromPoint(t,e);return i&&i.closest("jpad-button")}}customElements.define("jpad-button",B);const P=String.raw;class S extends HTMLElement{static get observedAttributes(){return["diagonal","slanted","reverse"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.innerHTML=P`
            <style>
                :host {
                    --JpadTile-row-flexDirection: row;
                    --JpadTile-row-gap: 0;

                    --JpadTile-diagonal-padding: 1em 0;
                    --JpadTile-diagonal-rotationAngle: 45deg;

                    --JpadTile-slanted-padding: .5em 0;
                    --JpadTile-slanted-rotationAngle: 5deg;

                    display: inline-block;
                }

                .Tile {
                    display: block;
                }

                .Row {
                    display: flex;
                    flex-direction: var(--JpadTile-row-flexDirection);
                    gap: var(--JpadTile-row-gap);
                }

                :host([diagonal]) .Tile {
                    transform: rotate(calc(-1 * var(--JpadTile-diagonal-rotationAngle)));
                    padding: var(--JpadTile-diagonal-padding);
                }

                :host([diagonal]) ::slotted(*) {
                    transform: rotate(var(--JpadTile-diagonal-rotationAngle));
                }

                :host([diagonal][reverse]) .Tile {
                    transform: rotate(var(--JpadTile-diagonal-rotationAngle));
                }

                :host([diagonal][reverse]) ::slotted(*) {
                    transform: rotate(calc(-1 * var(--JpadTile-diagonal-rotationAngle)));
                }

                :host([slanted]) .Tile {
                    padding: var(--JpadTile-slanted-padding);
                }

                :host([slanted]) .Row {
                    transform: rotate(calc(-1 * var(--JpadTile-slanted-rotationAngle)));
                }

                :host([slanted]) ::slotted(*) {
                    transform: rotate(var(--JpadTile-slanted-rotationAngle));
                }

                :host([slanted][reverse]) .Row {
                    transform: rotate(var(--JpadTile-slanted-rotationAngle));
                }

                :host([slanted][reverse]) ::slotted(*) {
                    transform: rotate(calc(-1 * var(--JpadTile-slanted-rotationAngle)));
                }
            </style>

            <div class="Tile" part="tile">
                <div class="Row" part="secondary">
                    <slot name="secondary"></slot>
                </div>
                <div class="Row" part="primary">
                    <slot></slot>
                </div>
            </div>
        `,this.addEventListener("touchstart",this.#i),this.addEventListener("touchmove",this.#i),this.addEventListener("touchend",this.#i),this.addEventListener("touchcancel",this.#i)}#i=t=>{t.preventDefault()}}customElements.define("jpad-tile",S);function M(s){const t=document.createElement("div");return t.className="window",t.dataset.windowId=s.id,t.style.cssText=`left: ${s.position.x}px; top: ${s.position.y}px; width: ${s.size.width}px; height: ${s.size.height}px; z-index: ${s.zIndex};`,t.innerHTML=`
      <header class="window-header" data-drag-handle>
        <span class="window-title">${s.title}</span>
        <button class="window-close" aria-label="Close ${s.title}" data-close>×</button>
      </header>
      <main class="window-content"></main>
    `,requestAnimationFrame(()=>{t.classList.add("is-open"),L(s.id,t)}),t}function m(){const s=document.getElementById("windows-container");if(!s)return;const t=f.get(),e=g.get(),i=new Map;s.querySelectorAll(".window").forEach(a=>{const r=a.dataset.windowId;r&&i.set(r,a)});const n=new Set(t.map(a=>a.id));i.forEach((a,r)=>{n.has(r)||a.remove()}),t.forEach(a=>{let r=i.get(a.id);r?(r.style.left=`${a.position.x}px`,r.style.top=`${a.position.y}px`,r.style.zIndex=String(a.zIndex),r.classList.toggle("is-active",a.id===e)):(r=M(a),s.appendChild(r))})}function z(){const s=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"];let t=0;function e(){document.querySelectorAll("#konami-controller .dot").forEach((c,u)=>{u<t?c.classList.add("active"):c.classList.remove("active")})}function i(){document.body.classList.add("konami-activated"),setTimeout(()=>{document.body.classList.remove("konami-activated")},500),v("autism"),d(),t=0,e()}function n(o){const c=s[t];o===c?(t++,e(),t===s.length&&setTimeout(i,300)):(t=0,e())}function a(o){n(o.code)}function r(){document.getElementById("konami-controller")?.classList.remove("hidden"),t=0,e()}function d(){document.getElementById("konami-controller")?.classList.add("hidden"),t=0,e()}function h(){[{id:"btn-up",key:"ArrowUp"},{id:"btn-down",key:"ArrowDown"},{id:"btn-left",key:"ArrowLeft"},{id:"btn-right",key:"ArrowRight"},{id:"btn-a",key:"KeyA"},{id:"btn-b",key:"KeyB"}].forEach(({id:c,key:u})=>{document.getElementById(c)?.addEventListener("click",()=>n(u))}),document.getElementById("controller-close")?.addEventListener("click",d)}function l(){new MutationObserver(c=>{c.forEach(u=>{if(u.type==="childList"){const p=document.getElementById("controller-trigger-panel");p&&!p.hasAttribute("data-initialized")&&(p.addEventListener("click",()=>{k("faq"),setTimeout(r,350)}),p.setAttribute("data-initialized","true"))}})}).observe(document.body,{childList:!0,subtree:!0})}document.addEventListener("keydown",a),h(),l()}document.addEventListener("astro:page-load",()=>{b.subscribe(m),g.subscribe(m),z(),I()});function I(){const s=document.getElementById("greeting");if(!s)return;const t=new Date().getHours(),e=t>=18||t<6;s.textContent=e?"こんばんわ！":"こんにちは！"}

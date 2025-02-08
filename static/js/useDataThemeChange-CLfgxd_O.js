var z=Object.defineProperty;var L=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var w=(t,e,a)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,H=(t,e)=>{for(var a in e||(e={}))F.call(e,a)&&w(t,a,e[a]);if(L)for(var a of L(e))O.call(e,a)&&w(t,a,e[a]);return t};var x=(t,e,a)=>new Promise((o,l)=>{var r=s=>{try{m(a.next(s))}catch(f){l(f)}},g=s=>{try{m(a.throw(s))}catch(f){l(f)}},m=s=>s.done?o(s.value):Promise.resolve(s.value).then(r,g);m((a=a.apply(t,e)).next())});import{ai as P,v as E,b2 as q,G as R,a6 as V,l as Q,N as T,t as k,m as y,ad as U,s as J,q as B,b3 as K,x as N,b0 as X,b4 as Y}from"./index-DjhCWRO9.js";import{u as M}from"./epTheme-DasudRKL.js";import{i as Z}from"./test-CR63KouC.js";function ee(){const{$storage:t,$config:e}=P(),a=()=>{var r,g,m,s,f,h,$,C,b,p,u,n,d,c,i,v,S;q().multiTagsCache&&(!t.tags||t.tags.length===0)&&(t.tags=R),t.locale||(t.locale={locale:(r=e==null?void 0:e.Locale)!=null?r:"zh"},V().locale.value=(g=e==null?void 0:e.Locale)!=null?g:"zh"),t.layout||(t.layout={layout:(m=e==null?void 0:e.Layout)!=null?m:"vertical",theme:(s=e==null?void 0:e.Theme)!=null?s:"light",darkMode:(f=e==null?void 0:e.DarkMode)!=null?f:!1,sidebarStatus:(h=e==null?void 0:e.SidebarStatus)!=null?h:!0,epThemeColor:($=e==null?void 0:e.EpThemeColor)!=null?$:"#409EFF",themeColor:(C=e==null?void 0:e.Theme)!=null?C:"light",overallStyle:(b=e==null?void 0:e.OverallStyle)!=null?b:"light"}),t.configure||(t.configure={grey:(p=e==null?void 0:e.Grey)!=null?p:!1,weak:(u=e==null?void 0:e.Weak)!=null?u:!1,hideTabs:(n=e==null?void 0:e.HideTabs)!=null?n:!1,hideFooter:(d=e.HideFooter)!=null?d:!0,showLogo:(c=e==null?void 0:e.ShowLogo)!=null?c:!0,showModel:(i=e==null?void 0:e.ShowModel)!=null?i:"smart",multiTagsCache:(v=e==null?void 0:e.MultiTagsCache)!=null?v:!1,stretch:(S=e==null?void 0:e.Stretch)!=null?S:!1})},o=E(()=>t==null?void 0:t.layout.layout),l=E(()=>t.layout);return{layout:o,layoutTheme:l,initStorage:a}}const te=Q({id:"pure-app",state:()=>{var t,e,a,o;return{sidebar:{opened:(e=(t=T().getItem(`${k()}layout`))==null?void 0:t.sidebarStatus)!=null?e:y().SidebarStatus,withoutAnimation:!1,isClickCollapse:!1},layout:(o=(a=T().getItem(`${k()}layout`))==null?void 0:a.layout)!=null?o:y().Layout,device:U()?"mobile":"desktop",viewportSize:{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight},sortSwap:!1}},getters:{getSidebarStatus(t){return t.sidebar.opened},getDevice(t){return t.device},getViewportWidth(t){return t.viewportSize.width},getViewportHeight(t){return t.viewportSize.height}},actions:{TOGGLE_SIDEBAR(t,e){const a=T().getItem(`${k()}layout`);t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!0,a.sidebarStatus=!0):!t&&e?(this.sidebar.withoutAnimation=!0,this.sidebar.opened=!1,a.sidebarStatus=!1):!t&&!e&&(this.sidebar.withoutAnimation=!1,this.sidebar.opened=!this.sidebar.opened,this.sidebar.isClickCollapse=!this.sidebar.opened,a.sidebarStatus=this.sidebar.opened),T().setItem(`${k()}layout`,a)},toggleSideBar(t,e){return x(this,null,function*(){yield this.TOGGLE_SIDEBAR(t,e)})},toggleDevice(t){this.device=t},setLayout(t){this.layout=t},setViewportSize(t){this.viewportSize=t},setSortSwap(t){this.sortSwap=t}}});function ae(){return te(J)}const A={outputDir:"",defaultScopeName:"",includeStyleWithColors:[],extract:!0,themeLinkTagId:"theme-link-tag",themeLinkTagInjectTo:"head",removeCssScopeName:!1,customThemeCssFileName:null,arbitraryMode:!1,defaultPrimaryColor:"",customThemeOutputPath:"/Users/tanyi/lastWorkDay/business_seal_btd/node_modules/.pnpm/@pureadmin+theme@3.2.0/node_modules/@pureadmin/theme/setCustomTheme.js",styleTagId:"custom-theme-tagid",InjectDefaultStyleTagToHtml:!0,hueDiffControls:{low:0,high:0},multipleScopeVars:[{scopeName:"layout-theme-light",varsContent:`
        $subMenuActiveText: #000000d9 !default;
        $menuBg: #fff !default;
        $menuHover: #f6f6f6 !default;
        $subMenuBg: #fff !default;
        $subMenuActiveBg: #e0ebf6 !default;
        $menuText: rgb(0 0 0 / 60%) !default;
        $sidebarLogo: #fff !default;
        $menuTitleHover: #000 !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-default",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #001529 !default;
        $menuHover: rgb(64 145 247 / 15%) !default;
        $subMenuBg: #0f0303 !default;
        $subMenuActiveBg: #4091f7 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #002140 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-saucePurple",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #130824 !default;
        $menuHover: rgb(105 58 201 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #693ac9 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #1f0c38 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #693ac9 !default;
      `},{scopeName:"layout-theme-pink",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #28081a !default;
        $menuHover: rgb(216 68 147 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #d84493 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #3f0d29 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #d84493 !default;
      `},{scopeName:"layout-theme-dusk",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2a0608 !default;
        $menuHover: rgb(225 60 57 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #e13c39 !default;
        $menuText: rgb(254 254 254 / 65.1%) !default;
        $sidebarLogo: #42090c !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e13c39 !default;
      `},{scopeName:"layout-theme-volcano",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2b0e05 !default;
        $menuHover: rgb(232 95 51 / 15%) !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #e85f33 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #441708 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e85f33 !default;
      `},{scopeName:"layout-theme-mingQing",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #032121 !default;
        $menuHover: rgb(89 191 193 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #59bfc1 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #053434 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #59bfc1 !default;
      `},{scopeName:"layout-theme-auroraGreen",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #0b1e15 !default;
        $menuHover: rgb(96 172 128 / 15%) !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #60ac80 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #112f21 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #60ac80 !default;
      `}]},oe="./",ue="assets",_=t=>{let e=t.replace("#","").match(/../g);for(let a=0;a<3;a++)e[a]=parseInt(e[a],16);return e},j=(t,e,a)=>{let o=[t.toString(16),e.toString(16),a.toString(16)];for(let l=0;l<3;l++)o[l].length==1&&(o[l]=`0${o[l]}`);return`#${o.join("")}`},le=(t,e)=>{let a=_(t);for(let o=0;o<3;o++)a[o]=Math.floor(a[o]*(1-e));return j(a[0],a[1],a[2])},ne=(t,e)=>{let a=_(t);for(let o=0;o<3;o++)a[o]=Math.floor((255-a[o])*e+a[o]);return j(a[0],a[1],a[2])},I=t=>`(^${t}\\s+|\\s+${t}\\s+|\\s+${t}$|^${t}$)`,D=({scopeName:t,multipleScopeVars:e})=>{const a=Array.isArray(e)&&e.length?e:A.multipleScopeVars;let o=document.documentElement.className;new RegExp(I(t)).test(o)||(a.forEach(l=>{o=o.replace(new RegExp(I(l.scopeName),"g"),` ${t} `)}),document.documentElement.className=o.replace(/(^\s+|\s+$)/g,""))},G=({id:t,href:e})=>{const a=document.createElement("link");return a.rel="stylesheet",a.href=e,a.id=t,a},se=t=>{const e=H({scopeName:"theme-default",customLinkHref:r=>r},t),a=e.themeLinkTagId||A.themeLinkTagId;let o=document.getElementById(a);const l=e.customLinkHref(`${oe.replace(/\/$/,"")}${`/${ue}/${e.scopeName}.css`.replace(/\/+(?=\/)/g,"")}`);if(o){o.id=`${a}_old`;const r=G({id:a,href:l});o.nextSibling?o.parentNode.insertBefore(r,o.nextSibling):o.parentNode.appendChild(r),r.onload=()=>{setTimeout(()=>{o.parentNode.removeChild(o),o=null},60),D(e)};return}o=G({id:a,href:l}),D(e),document[(e.themeLinkTagInjectTo||A.themeLinkTagInjectTo||"").replace("-prepend","")].appendChild(o)};function fe(){var b,p;const{layoutTheme:t,layout:e}=ee(),a=B([{color:"#ffffff",themeColor:"light"},{color:"#1b2a47",themeColor:"default"},{color:"#722ed1",themeColor:"saucePurple"},{color:"#eb2f96",themeColor:"pink"},{color:"#f5222d",themeColor:"dusk"},{color:"#fa541c",themeColor:"volcano"},{color:"#13c2c2",themeColor:"mingQing"},{color:"#52c41a",themeColor:"auroraGreen"}]),{$storage:o}=P(),l=B((b=o==null?void 0:o.layout)==null?void 0:b.darkMode),r=B((p=o==null?void 0:o.layout)==null?void 0:p.overallStyle),g=document.documentElement;function m(u,n,d){const c=d||document.body;let{className:i}=c;i=i.replace(n,"").trim(),c.className=u?`${i} ${n}`:i}function s(u=(d=>(d=y().Theme)!=null?d:"light")(),n=!0){var i,v;t.value.theme=u,se({scopeName:`layout-theme-${u}`});const c=o.layout.themeColor;if(o.layout={layout:e.value,theme:u,darkMode:l.value,sidebarStatus:(i=o.layout)==null?void 0:i.sidebarStatus,epThemeColor:(v=o.layout)==null?void 0:v.epThemeColor,themeColor:n?u:c,overallStyle:r.value},u==="default"||u==="light")h(y().EpThemeColor);else{const S=a.value.find(W=>W.themeColor===u);h(S.color)}}function f(u,n,d){document.documentElement.style.setProperty(`--el-color-primary-${u}-${n}`,l.value?le(d,n/10):ne(d,n/10))}const h=u=>{M().setEpThemeColor(u),document.documentElement.style.setProperty("--el-color-primary",u);for(let n=1;n<=2;n++)f("dark",n,u);for(let n=1;n<=9;n++)f("light",n,u)};function $(u){r.value=u,M().epTheme==="light"&&l.value?s("default",!1):s(M().epTheme,!1),l.value?document.documentElement.classList.add("dark"):(o.layout.themeColor==="light"&&s("light",!1),document.documentElement.classList.remove("dark"))}function C(){K(),T().clear();const{Grey:u,Weak:n,MultiTagsCache:d,EpThemeColor:c,Layout:i}=y();ae().setLayout(i),h(c),N().multiTagsCacheChange(d),m(u,"html-grey",document.querySelector("html")),m(n,"html-weakness",document.querySelector("html")),X.push("/login"),N().handleTags("equal",[...R]),Y(),Z()}return{body:g,dataTheme:l,overallStyle:r,layoutTheme:t,themeColors:a,onReset:C,toggleClass:m,dataThemeChange:$,setEpThemeColor:h,setLayoutThemeColor:s}}export{ae as a,ee as b,se as t,fe as u};

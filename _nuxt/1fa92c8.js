(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{146:function(t,e,r){"use strict";r.r(e);r(45),r(26),r(52),r(30);var n={props:{title:Object},computed:{posterPath:function(){return this.title.poster_path?"https://image.tmdb.org/t/p/w185".concat(this.title.poster_path):this.title.profile_path?"https://image.tmdb.org/t/p/w185".concat(this.title.profile_path):"nopicture.jpg"},subTitle:function(){var t=this.title.media_type;if("movie"===t){t=t.charAt(0).toUpperCase()+t.slice(1);var e=this.title.release_date.split("-")[0];return"".concat(t," (").concat(e,")")}if("tv"===t){t=t.toUpperCase();var r=this.title.first_air_date.split("-")[0];return"".concat(t," (").concat(r,")")}if("person"===t)return this.title.known_for_department}},methods:{onClickTitle:function(t){var e=this.title.media_type;"movie"===e?this.$router.push("/movie/".concat(t)):"tv"===e?this.$router.push("/tv/".concat(t)):"person"===e&&this.$router.push("/person/".concat(t)),this.$emit("item-clicked")}}},o=(r(280),r(63)),c=r(77),l=r.n(c),f=r(356),h=r(363),d=r(237),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{on:{click:function(e){return t.onClickTitle(t.title.id)}}},[r("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.hover;return[r("div",{staticClass:"d-flex py-4",class:{"on-hover":n}},[r("v-img",{attrs:{src:t.posterPath,alt:"Poster for "+t.title.title,"lazy-src":"nopicture.jpg",contain:"","aspect-ratio":"2/3","max-width":"6rem"}}),t._v(" "),r("div",{staticClass:"px-4 py-2"},[r("h2",[t._v(t._s(t.title.name||t.title.title))]),t._v(" "),r("p",{staticClass:"subtitle-1 font-weight-light"},[t._v(t._s(t.subTitle))])])],1)]}}])}),t._v(" "),r("v-divider")],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VDivider:f.a,VHover:h.a,VImg:d.a})},216:function(t,e,r){var content=r(275);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(20).default)("3e812f96",content,!0,{sourceMap:!1})},218:function(t,e,r){var content=r(281);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(20).default)("6fc8eac0",content,!0,{sourceMap:!1})},225:function(t,e,r){var content=r(304);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(20).default)("56b15182",content,!0,{sourceMap:!1})},236:function(t,e,r){"use strict";r(13),r(12),r(15),r(5),r(21),r(14),r(22);var n=r(11),o=r(2),c=(r(78),r(47),r(74));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={name:"DefaultLayout",components:{TitleItem:r(146).default},data:function(){return{title:"Also Known For",isExpanded:!1,isLoading:!1,searchText:"",hasError:!1,errorMsg:"",debounceTimeout:null,overlay:!1}},computed:f({},Object(c.c)(["titles"])),mounted:function(){this.attachClickEventToMain()},methods:f(f({},Object(c.b)(["searchTitles","resetSearchPage"])),{},{attachClickEventToMain:function(){var t=this,e=this.$refs.main.$el;e&&e.addEventListener("click",(function(){t.isExpanded=!1}))},onHome:function(){this.$router.push("/")},onKeyType:function(text){var t=this;this.isExpanded=!0,this.isLoading=!0,this.resetSearchPage(),clearTimeout(this.debounceTimeout),this.debounceTimeout=setTimeout((function(){t.onSearch()}),500)},onSearch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t.searchText){e.next=3;break}return t.isLoading=!1,e.abrupt("return");case 3:return e.prev=3,t.hasError=!1,t.isLoading=!0,e.next=8,t.searchTitles({searchText:t.searchText});case 8:e.next=14;break;case 10:e.prev=10,e.t0=e.catch(3),t.hasError=!0,t.errorMsg=e.t0.message;case 14:return e.prev=14,t.isLoading=!1,e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[3,10,14,17]])})))()},toggleOverlay:function(){this.overlay=!this.overlay},onItemClicked:function(){this.isExpanded=!1,this.overlay=!1,this.searchText="",this.resetSearchPage()}})},d=(r(303),r(63)),v=r(77),m=r.n(v),y=r(355),x=r(361),_=r(362),k=r(168),w=r(357),O=r(358),j=r(359),E=r(360),T=r(55),component=Object(d.a)(h,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("v-app-bar",{attrs:{color:"rgb(18,18,18)",fixed:"",app:""}},[r("div",{staticClass:"nav-bar-content"},[r("div",{staticClass:"nav-bar-title"},[r("img",{attrs:{src:"AKF-Logo.ico",width:"40",height:"40"},on:{click:function(e){return t.onHome()}}}),t._v(" "),r("a",{staticClass:"text-h6 font-weight-regular pl-4",attrs:{color:"primary"},on:{click:function(e){return t.onHome()}}},[t._v("\n          "+t._s(t.title)+"\n        ")]),t._v(" "),t.$vuetify.breakpoint.mdAndUp?r("div",{staticClass:"search-container"},[r("v-text-field",{staticClass:"pa-2",attrs:{placeholder:"Search Movies, TV Shows, and People",required:"",solo:"","hide-details":"auto",color:"secondary"},on:{click:function(e){t.isExpanded=!0},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSearch.apply(null,arguments)},input:t.onKeyType},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}}),t._v(" "),t.isExpanded?r("div",{staticClass:"d-flex flex-column secondary expand-container"},[t.isLoading?r("v-skeleton-loader",{attrs:{type:"list-item-three-line"}}):t._e(),t._v(" "),t._l(t.titles,(function(title){return r("TitleItem",{key:title.id,attrs:{title:title},on:{"item-clicked":t.onItemClicked}})}))],2):t._e()],1):t._e()]),t._v(" "),t.$vuetify.breakpoint.smAndDown?r("v-icon",{attrs:{large:""},on:{click:t.toggleOverlay}},[t._v("\n        mdi-magnify\n      ")]):t._e()],1)]),t._v(" "),r("v-main",{ref:"main"},[r("v-container",{staticClass:"main-container"},[r("Nuxt")],1),t._v(" "),r("v-overlay",{staticClass:"search-overlay",attrs:{value:t.overlay,opacity:"1"}},[r("v-toolbar",{staticClass:"sticky-toolbar"},[r("v-text-field",{staticClass:"pa-2",attrs:{placeholder:"Search Movies, TV Shows, and People",required:"",solo:"","full-width":"",dense:"","hide-details":"auto",color:"secondary"},on:{click:function(e){t.isExpanded=!0},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onSearch.apply(null,arguments)},input:t.onKeyType},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}}),t._v(" "),r("v-icon",{attrs:{large:""},on:{click:t.toggleOverlay}},[t._v("mdi-close")])],1),t._v(" "),r("div",{staticClass:"secondary searchResults"},[t.isLoading?r("v-skeleton-loader",{attrs:{type:"list-item-three-line"}}):t._e(),t._v(" "),t._l(t.titles,(function(title){return r("TitleItem",{key:title.id,attrs:{title:title},on:{"item-clicked":t.onItemClicked}})}))],2)],1)],1)],1)}),[],!1,null,null,null);e.a=component.exports;m()(component,{TitleItem:r(146).default}),m()(component,{VApp:y.a,VAppBar:x.a,VContainer:_.a,VIcon:k.a,VMain:w.a,VOverlay:O.a,VSkeletonLoader:j.a,VTextField:E.a,VToolbar:T.a})},241:function(t,e,r){r(242),t.exports=r(243)},27:function(t,e){t.exports={BASE_URL:"https://api.themoviedb.org/3",API_KEY:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzcwZDI3MTI1NjE4OGUyN2E0MDU3M2MzMjRkN2IyZSIsInN1YiI6IjY0OWFlMWNmYTZkZGNiMDBhZTY3ZjlkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IW_xukAC7ht0AYX96MSGKAxXOMMkaYYzyTpKAmRn04c",NODE_ENV:"production"}},274:function(t,e,r){"use strict";r(216)},275:function(t,e,r){var n=r(19)(!1);n.push([t.i,"h1[data-v-5ee9a2f7]{font-size:20px}",""]),t.exports=n},280:function(t,e,r){"use strict";r(218)},281:function(t,e,r){var n=r(19)(!1);n.push([t.i,".on-hover{background-color:#272727}",""]),t.exports=n},303:function(t,e,r){"use strict";r(225)},304:function(t,e,r){var n=r(19)(!1);n.push([t.i,".nav-bar-content{justify-content:center}.nav-bar-content,.nav-bar-title{display:flex;align-items:center;width:100%}.nav-bar-title{padding:0 24px;max-width:1280px}.main-container{max-width:1280px!important}.search-container{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);flex:1 1 auto;max-width:640px;width:50%}.expand-container{position:absolute;z-index:8;width:100%;max-width:624px;top:56px;left:8px}.search-overlay.v-overlay{align-items:start;height:100%;overflow:auto}.search-overlay .v-overlay__content{flex-grow:1}.search-icon{justify-self:flex-end}.v-toolbar.sticky-toolbar{position:-webkit-sticky;position:sticky;top:0;z-index:9}",""]),t.exports=n},338:function(t,e,r){"use strict";r.r(e),r.d(e,"state",(function(){return v})),r.d(e,"actions",(function(){return m})),r.d(e,"mutations",(function(){return y})),r.d(e,"getters",(function(){return x}));r(13),r(12),r(15),r(21),r(14),r(22);var n=r(112),o=r(2),c=r(11),l=(r(78),r(30),r(5),r(41),r(339),r(46),r(51),r(341),r(167),r(180),r(0)),f=r(27);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=function(){return{titles:{},title:{},actor:{},cast:[]}},m={searchTitles:function(t,e){return Object(c.a)(regeneratorRuntime.mark((function r(){var n,o,l,h,data,d;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=t.commit,o=e.searchText,n("resetTitles"),f.BASE_URL&&f.API_KEY){r.next=5;break}throw new Error("API Key Missing");case 5:return l=encodeURIComponent(o),h="".concat(f.BASE_URL,"/search/multi?query=").concat(l,"&include_adult=false&language=en-US&page=1"),r.next=9,fetch(h,{headers:{Authorization:"Bearer ".concat(f.API_KEY)}}).then(function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 9:if(data=r.sent,d=data.results){r.next=13;break}throw Error("Search failed");case 13:n("setTitles",{titles:d});case 14:case"end":return r.stop()}}),r)})))()},fetchTitle:function(t,e){return Object(c.a)(regeneratorRuntime.mark((function r(){var n,o,l,h,title;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=t.commit,o=e.titleId,n("resetTitle"),n("resetCast"),f.BASE_URL&&f.API_KEY){r.next=6;break}throw new Error("API Key Missing");case 6:return l=encodeURIComponent(o),h="".concat(f.BASE_URL,"/movie/").concat(l,"?append_to_response=credits"),r.next=10,fetch(h,{headers:{Authorization:"Bearer ".concat(f.API_KEY)}}).then(function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 10:title=r.sent,n("setTitle",{title:title});case 12:case"end":return r.stop()}}),r)})))()},fetchTV:function(t,e){return Object(c.a)(regeneratorRuntime.mark((function r(){var n,o,l,h,title;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=t.commit,o=e.titleId,n("resetTitle"),n("resetCast"),f.BASE_URL&&f.API_KEY){r.next=6;break}throw new Error("API Key Missing");case 6:return l=encodeURIComponent(o),h="".concat(f.BASE_URL,"/tv/").concat(l,"?append_to_response=credits"),r.next=10,fetch(h,{headers:{Authorization:"Bearer ".concat(f.API_KEY)}}).then(function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 10:title=r.sent,n("setTitle",{title:title});case 12:case"end":return r.stop()}}),r)})))()},fetchActor:function(t,e){return Object(c.a)(regeneratorRuntime.mark((function r(){var n,o,l,h,d;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=t.commit,o=e.actorId,l=encodeURIComponent(o),h="".concat(f.BASE_URL,"/person/").concat(l,"?append_to_response=combined_credits&language=en-US"),r.next=6,fetch(h,{headers:{Authorization:"Bearer ".concat(f.API_KEY)}}).then(function(){var t=Object(c.a)(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 6:d=r.sent,n("setActor",{actor:d});case 8:case"end":return r.stop()}}),r)})))()},fetchCast:function(t,e){return Object(c.a)(regeneratorRuntime.mark((function r(){var n,o,c,l,h;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=t.commit,t.state,o=e.cast,r.prev=2,c=o.map((function(t){var e=t.id,r="".concat(f.BASE_URL,"/person/").concat(e,"?append_to_response=combined_credits&language=en-US");return fetch(r,{headers:{Authorization:"Bearer ".concat(f.API_KEY)}}).then((function(t){return t.json()}))})),r.next=6,Promise.allSettled(c);case 6:l=r.sent,h=l.map((function(t,e){var r;return"fulfilled"===t.status?d({character:(null===(r=o[e])||void 0===r?void 0:r.character)||""},t.value):(console.error(t.reason),null)})),n("setCast",{cast:h}),r.next=14;break;case 11:throw r.prev=11,r.t0=r.catch(2),r.t0;case 14:case"end":return r.stop()}}),r,null,[[2,11]])})))()},fetchList:function(t,e){return Object(c.a)(regeneratorRuntime.mark((function r(){var n,o,c,l,data,h;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n=t.commit,o=e.listName,c=e.apiPath,r.prev=2,f.BASE_URL&&f.API_KEY){r.next=5;break}throw new Error("API Key Missing");case 5:return l="".concat(f.BASE_URL).concat(c,"?language=en-US"),r.next=8,fetch(l,{headers:{Authorization:"Bearer ".concat(f.API_KEY)}}).then((function(t){return t.json()}));case 8:if(data=r.sent,h=data.results){r.next=12;break}throw Error("Fetching ".concat(o," failed"));case 12:n("setList",{listName:o,results:h}),r.next=19;break;case 15:throw r.prev=15,r.t0=r.catch(2),console.error(r.t0),r.t0;case 19:case"end":return r.stop()}}),r,null,[[2,15]])})))()},resetTitlePage:function(t){var e=t.commit;e("resetTitle"),e("resetCast")},resetSearchPage:function(t){(0,t.commit)("resetTitles")}},y={setTitles:function(t,e){var r=e.titles;if(!r)throw Error("No Titles to set");var n=Object.fromEntries(r.map((function(title){return[title.id,title]})));l.a.set(t,"titles",n)},setTitle:function(t,e){var title=e.title;l.a.set(t,"title",title)},setCast:function(t,e){var r=e.cast,o=[].concat(Object(n.a)(t.cast),Object(n.a)(r));l.a.set(t,"cast",o)},setActor:function(t,e){var r=e.actor;l.a.set(t,"actor",r)},setList:function(t,e){var r=e.listName,n=e.results;l.a.set(t,r,n)},resetCast:function(t){l.a.set(t,"cast",[])},resetTitle:function(t){l.a.set(t,"title",{})},resetTitles:function(t){l.a.set(t,"titles",{})}},x={titles:function(t){var e=Object.values(t.titles);return e.sort((function(a,b){return b.popularity-a.popularity})),e},title:function(t){return t.title},titleById:function(t){return function(e){return t.titles[e]}},actor:function(t){return t.actor},cast:function(t){return t.cast},listByName:function(t){return function(e){return t[e]}}}},75:function(t,e,r){"use strict";var n={name:"EmptyLayout",layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},o=(r(274),r(63)),c=r(77),l=r.n(c),f=r(355),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[404===t.error.statusCode?r("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):r("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),r("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"5ee9a2f7",null);e.a=component.exports;l()(component,{VApp:f.a})}},[[241,11,3,12]]]);
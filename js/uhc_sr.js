// uhc_sr.js - Application Specific Javascript 
!function(e,t){"use strict";"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.ScrollMagic=t()}(this,function(){"use strict";var e=function(){};e.version="2.0.5",window.addEventListener("mousewheel",function(){});var t="data-scrollmagic-pin-spacer";e.Controller=function(r){var o,s,a="ScrollMagic.Controller",l="FORWARD",c="REVERSE",u="PAUSED",f=n.defaults,d=this,h=i.extend({},f,r),g=[],p=!1,v=0,m=u,w=!0,y=0,S=!0,b=function(){for(var e in h)f.hasOwnProperty(e)||delete h[e];if(h.container=i.get.elements(h.container)[0],!h.container)throw a+" init failed.";w=h.container===window||h.container===document.body||!document.body.contains(h.container),w&&(h.container=window),y=z(),h.container.addEventListener("resize",T),h.container.addEventListener("scroll",T),h.refreshInterval=parseInt(h.refreshInterval)||f.refreshInterval,E()},E=function(){h.refreshInterval>0&&(s=window.setTimeout(A,h.refreshInterval))},x=function(){return h.vertical?i.get.scrollTop(h.container):i.get.scrollLeft(h.container)},z=function(){return h.vertical?i.get.height(h.container):i.get.width(h.container)},C=this._setScrollPos=function(e){h.vertical?w?window.scrollTo(i.get.scrollLeft(),e):h.container.scrollTop=e:w?window.scrollTo(e,i.get.scrollTop()):h.container.scrollLeft=e},F=function(){if(S&&p){var e=i.type.Array(p)?p:g.slice(0);p=!1;var t=v;v=d.scrollPos();var n=v-t;0!==n&&(m=n>0?l:c),m===c&&e.reverse(),e.forEach(function(e){e.update(!0)})}},L=function(){o=i.rAF(F)},T=function(e){"resize"==e.type&&(y=z(),m=u),p!==!0&&(p=!0,L())},A=function(){if(!w&&y!=z()){var e;try{e=new Event("resize",{bubbles:!1,cancelable:!1})}catch(t){e=document.createEvent("Event"),e.initEvent("resize",!1,!1)}h.container.dispatchEvent(e)}g.forEach(function(e){e.refresh()}),E()};this._options=h;var O=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort(function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1}),t};return this.addScene=function(t){if(i.type.Array(t))t.forEach(function(e){d.addScene(e)});else if(t instanceof e.Scene)if(t.controller()!==d)t.addTo(d);else if(g.indexOf(t)<0){g.push(t),g=O(g),t.on("shift.controller_sort",function(){g=O(g)});for(var n in h.globalSceneOptions)t[n]&&t[n].call(t,h.globalSceneOptions[n])}return d},this.removeScene=function(e){if(i.type.Array(e))e.forEach(function(e){d.removeScene(e)});else{var t=g.indexOf(e);t>-1&&(e.off("shift.controller_sort"),g.splice(t,1),e.remove())}return d},this.updateScene=function(t,n){return i.type.Array(t)?t.forEach(function(e){d.updateScene(e,n)}):n?t.update(!0):p!==!0&&t instanceof e.Scene&&(p=p||[],-1==p.indexOf(t)&&p.push(t),p=O(p),L()),d},this.update=function(e){return T({type:"resize"}),e&&F(),d},this.scrollTo=function(n,r){if(i.type.Number(n))C.call(h.container,n,r);else if(n instanceof e.Scene)n.controller()===d&&d.scrollTo(n.scrollOffset(),r);else if(i.type.Function(n))C=n;else{var o=i.get.elements(n)[0];if(o){for(;o.parentNode.hasAttribute(t);)o=o.parentNode;var s=h.vertical?"top":"left",a=i.get.offset(h.container),l=i.get.offset(o);w||(a[s]-=d.scrollPos()),d.scrollTo(l[s]-a[s],r)}}return d},this.scrollPos=function(e){return arguments.length?(i.type.Function(e)&&(x=e),d):x.call(d)},this.info=function(e){var t={size:y,vertical:h.vertical,scrollPos:v,scrollDirection:m,container:h.container,isDocument:w};return arguments.length?void 0!==t[e]?t[e]:void 0:t},this.loglevel=function(){return d},this.enabled=function(e){return arguments.length?(S!=e&&(S=!!e,d.updateScene(g,!0)),d):S},this.destroy=function(e){window.clearTimeout(s);for(var t=g.length;t--;)g[t].destroy(e);return h.container.removeEventListener("resize",T),h.container.removeEventListener("scroll",T),i.cAF(o),null},b(),d};var n={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};e.Controller.addOption=function(e,t){n.defaults[e]=t},e.Controller.extend=function(t){var n=this;e.Controller=function(){return n.apply(this,arguments),this.$super=i.extend({},this),t.apply(this,arguments)||this},i.extend(e.Controller,n),e.Controller.prototype=n.prototype,e.Controller.prototype.constructor=e.Controller},e.Scene=function(n){var o,s,a="BEFORE",l="DURING",c="AFTER",u=r.defaults,f=this,d=i.extend({},u,n),h=a,g=0,p={start:0,end:0},v=0,m=!0,w=function(){for(var e in d)u.hasOwnProperty(e)||delete d[e];for(var t in u)L(t);C()},y={};this.on=function(e,t){return i.type.Function(t)&&(e=e.trim().split(" "),e.forEach(function(e){var n=e.split("."),r=n[0],i=n[1];"*"!=r&&(y[r]||(y[r]=[]),y[r].push({namespace:i||"",callback:t}))})),f},this.off=function(e,t){return e?(e=e.trim().split(" "),e.forEach(function(e){var n=e.split("."),r=n[0],i=n[1]||"",o="*"===r?Object.keys(y):[r];o.forEach(function(e){for(var n=y[e]||[],r=n.length;r--;){var o=n[r];!o||i!==o.namespace&&"*"!==i||t&&t!=o.callback||n.splice(r,1)}n.length||delete y[e]})}),f):f},this.trigger=function(t,n){if(t){var r=t.trim().split("."),i=r[0],o=r[1],s=y[i];s&&s.forEach(function(t){o&&o!==t.namespace||t.callback.call(f,new e.Event(i,t.namespace,f,n))})}return f},f.on("change.internal",function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&("triggerElement"===e.what?E():"reverse"===e.what&&f.update())}).on("shift.internal",function(){S(),f.update()}),this.addTo=function(t){return t instanceof e.Controller&&s!=t&&(s&&s.removeScene(f),s=t,C(),b(!0),E(!0),S(),s.info("container").addEventListener("resize",x),t.addScene(f),f.trigger("add",{controller:s}),f.update()),f},this.enabled=function(e){return arguments.length?(m!=e&&(m=!!e,f.update(!0)),f):m},this.remove=function(){if(s){s.info("container").removeEventListener("resize",x);var e=s;s=void 0,e.removeScene(f),f.trigger("remove")}return f},this.destroy=function(e){return f.trigger("destroy",{reset:e}),f.remove(),f.off("*.*"),null},this.update=function(e){if(s)if(e)if(s.enabled()&&m){var t,n=s.info("scrollPos");t=d.duration>0?(n-p.start)/(p.end-p.start):n>=p.start?1:0,f.trigger("update",{startPos:p.start,endPos:p.end,scrollPos:n}),f.progress(t)}else T&&h===l&&O(!0);else s.updateScene(f,!1);return f},this.refresh=function(){return b(),E(),f},this.progress=function(e){if(arguments.length){var t=!1,n=h,r=s?s.info("scrollDirection"):"PAUSED",i=d.reverse||e>=g;if(0===d.duration?(t=g!=e,g=1>e&&i?0:1,h=0===g?a:l):0>e&&h!==a&&i?(g=0,h=a,t=!0):e>=0&&1>e&&i?(g=e,h=l,t=!0):e>=1&&h!==c?(g=1,h=c,t=!0):h!==l||i||O(),t){var o={progress:g,state:h,scrollDirection:r},u=h!=n,p=function(e){f.trigger(e,o)};u&&n!==l&&(p("enter"),p(n===a?"start":"end")),p("progress"),u&&h!==l&&(p(h===a?"start":"end"),p("leave"))}return f}return g};var S=function(){p={start:v+d.offset},s&&d.triggerElement&&(p.start-=s.info("size")*d.triggerHook),p.end=p.start+d.duration},b=function(e){if(o){var t="duration";F(t,o.call(f))&&!e&&(f.trigger("change",{what:t,newval:d[t]}),f.trigger("shift",{reason:t}))}},E=function(e){var n=0,r=d.triggerElement;if(s&&r){for(var o=s.info(),a=i.get.offset(o.container),l=o.vertical?"top":"left";r.parentNode.hasAttribute(t);)r=r.parentNode;var c=i.get.offset(r);o.isDocument||(a[l]-=s.scrollPos()),n=c[l]-a[l]}var u=n!=v;v=n,u&&!e&&f.trigger("shift",{reason:"triggerElementPosition"})},x=function(){d.triggerHook>0&&f.trigger("shift",{reason:"containerResize"})},z=i.extend(r.validate,{duration:function(e){if(i.type.String(e)&&e.match(/^(\.|\d)*\d+%$/)){var t=parseFloat(e)/100;e=function(){return s?s.info("size")*t:0}}if(i.type.Function(e)){o=e;try{e=parseFloat(o())}catch(t){e=-1}}if(e=parseFloat(e),!i.type.Number(e)||0>e)throw o?(o=void 0,0):0;return e}}),C=function(e){e=arguments.length?[e]:Object.keys(z),e.forEach(function(e){var t;if(z[e])try{t=z[e](d[e])}catch(n){t=u[e]}finally{d[e]=t}})},F=function(e,t){var n=!1,r=d[e];return d[e]!=t&&(d[e]=t,C(e),n=r!=d[e]),n},L=function(e){f[e]||(f[e]=function(t){return arguments.length?("duration"===e&&(o=void 0),F(e,t)&&(f.trigger("change",{what:e,newval:d[e]}),r.shifts.indexOf(e)>-1&&f.trigger("shift",{reason:e})),f):d[e]})};this.controller=function(){return s},this.state=function(){return h},this.scrollOffset=function(){return p.start},this.triggerPosition=function(){var e=d.offset;return s&&(e+=d.triggerElement?v:s.info("size")*f.triggerHook()),e};var T,A;f.on("shift.internal",function(e){var t="duration"===e.reason;(h===c&&t||h===l&&0===d.duration)&&O(),t&&_()}).on("progress.internal",function(){O()}).on("add.internal",function(){_()}).on("destroy.internal",function(e){f.removePin(e.reset)});var O=function(e){if(T&&s){var t=s.info(),n=A.spacer.firstChild;if(e||h!==l){var r={position:A.inFlow?"relative":"absolute",top:0,left:0},o=i.css(n,"position")!=r.position;A.pushFollowers?d.duration>0&&(h===c&&0===parseFloat(i.css(A.spacer,"padding-top"))?o=!0:h===a&&0===parseFloat(i.css(A.spacer,"padding-bottom"))&&(o=!0)):r[t.vertical?"top":"left"]=d.duration*g,i.css(n,r),o&&_()}else{"fixed"!=i.css(n,"position")&&(i.css(n,{position:"fixed"}),_());var u=i.get.offset(A.spacer,!0),f=d.reverse||0===d.duration?t.scrollPos-p.start:Math.round(g*d.duration*10)/10;u[t.vertical?"top":"left"]+=f,i.css(A.spacer.firstChild,{top:u.top,left:u.left})}}},_=function(){if(T&&s&&A.inFlow){var e=h===l,t=s.info("vertical"),n=A.spacer.firstChild,r=i.isMarginCollapseType(i.css(A.spacer,"display")),o={};A.relSize.width||A.relSize.autoFullWidth?e?i.css(T,{width:i.get.width(A.spacer)}):i.css(T,{width:"100%"}):(o["min-width"]=i.get.width(t?T:n,!0,!0),o.width=e?o["min-width"]:"auto"),A.relSize.height?e?i.css(T,{height:i.get.height(A.spacer)-(A.pushFollowers?d.duration:0)}):i.css(T,{height:"100%"}):(o["min-height"]=i.get.height(t?n:T,!0,!r),o.height=e?o["min-height"]:"auto"),A.pushFollowers&&(o["padding"+(t?"Top":"Left")]=d.duration*g,o["padding"+(t?"Bottom":"Right")]=d.duration*(1-g)),i.css(A.spacer,o)}},N=function(){s&&T&&h===l&&!s.info("isDocument")&&O()},P=function(){s&&T&&h===l&&((A.relSize.width||A.relSize.autoFullWidth)&&i.get.width(window)!=i.get.width(A.spacer.parentNode)||A.relSize.height&&i.get.height(window)!=i.get.height(A.spacer.parentNode))&&_()},D=function(e){s&&T&&h===l&&!s.info("isDocument")&&(e.preventDefault(),s._setScrollPos(s.info("scrollPos")-((e.wheelDelta||e[s.info("vertical")?"wheelDeltaY":"wheelDeltaX"])/3||30*-e.detail)))};this.setPin=function(e,n){var r={pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"};if(n=i.extend({},r,n),e=i.get.elements(e)[0],!e)return f;if("fixed"===i.css(e,"position"))return f;if(T){if(T===e)return f;f.removePin()}T=e;var o=T.parentNode.style.display,s=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];T.parentNode.style.display="none";var a="absolute"!=i.css(T,"position"),l=i.css(T,s.concat(["display"])),c=i.css(T,["width","height"]);T.parentNode.style.display=o,!a&&n.pushFollowers&&(n.pushFollowers=!1);var u=T.parentNode.insertBefore(document.createElement("div"),T),d=i.extend(l,{position:a?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(a||i.extend(d,i.css(T,["width","height"])),i.css(u,d),u.setAttribute(t,""),i.addClass(u,n.spacerClass),A={spacer:u,relSize:{width:"%"===c.width.slice(-1),height:"%"===c.height.slice(-1),autoFullWidth:"auto"===c.width&&a&&i.isMarginCollapseType(l.display)},pushFollowers:n.pushFollowers,inFlow:a},!T.___origStyle){T.___origStyle={};var h=T.style,g=s.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]);g.forEach(function(e){T.___origStyle[e]=h[e]||""})}return A.relSize.width&&i.css(u,{width:c.width}),A.relSize.height&&i.css(u,{height:c.height}),u.appendChild(T),i.css(T,{position:a?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(A.relSize.width||A.relSize.autoFullWidth)&&i.css(T,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",N),window.addEventListener("resize",N),window.addEventListener("resize",P),T.addEventListener("mousewheel",D),T.addEventListener("DOMMouseScroll",D),O(),f},this.removePin=function(e){if(T){if(h===l&&O(!0),e||!s){var n=A.spacer.firstChild;if(n.hasAttribute(t)){var r=A.spacer.style,o=["margin","marginLeft","marginRight","marginTop","marginBottom"];margins={},o.forEach(function(e){margins[e]=r[e]||""}),i.css(n,margins)}A.spacer.parentNode.insertBefore(n,A.spacer),A.spacer.parentNode.removeChild(A.spacer),T.parentNode.hasAttribute(t)||(i.css(T,T.___origStyle),delete T.___origStyle)}window.removeEventListener("scroll",N),window.removeEventListener("resize",N),window.removeEventListener("resize",P),T.removeEventListener("mousewheel",D),T.removeEventListener("DOMMouseScroll",D),T=void 0}return f};var R,k=[];return f.on("destroy.internal",function(e){f.removeClassToggle(e.reset)}),this.setClassToggle=function(e,t){var n=i.get.elements(e);return 0!==n.length&&i.type.String(t)?(k.length>0&&f.removeClassToggle(),R=t,k=n,f.on("enter.internal_class leave.internal_class",function(e){var t="enter"===e.type?i.addClass:i.removeClass;k.forEach(function(e){t(e,R)})}),f):f},this.removeClassToggle=function(e){return e&&k.forEach(function(e){i.removeClass(e,R)}),f.off("start.internal_class end.internal_class"),R=void 0,k=[],f},w(),f};var r={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!i.type.Number(e))throw 0;return e},triggerElement:function(e){if(e=e||void 0){var t=i.get.elements(e)[0];if(!t)throw 0;e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(i.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));else{if(!(e in t))throw 0;e=t[e]}return e},reverse:function(e){return!!e}},shifts:["duration","offset","triggerHook"]};e.Scene.addOption=function(e,t,n,i){e in r.defaults||(r.defaults[e]=t,r.validate[e]=n,i&&r.shifts.push(e))},e.Scene.extend=function(t){var n=this;e.Scene=function(){return n.apply(this,arguments),this.$super=i.extend({},this),t.apply(this,arguments)||this},i.extend(e.Scene,n),e.Scene.prototype=n.prototype,e.Scene.prototype.constructor=e.Scene},e.Event=function(e,t,n,r){r=r||{};for(var i in r)this[i]=r[i];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};var i=e._util=function(e){var t,n={},r=function(e){return parseFloat(e)||0},i=function(t){return t.currentStyle?t.currentStyle:e.getComputedStyle(t)},o=function(t,n,o,s){if(n=n===document?e:n,n===e)s=!1;else if(!f.DomElement(n))return 0;t=t.charAt(0).toUpperCase()+t.substr(1).toLowerCase();var a=(o?n["offset"+t]||n["outer"+t]:n["client"+t]||n["inner"+t])||0;if(o&&s){var l=i(n);a+="Height"===t?r(l.marginTop)+r(l.marginBottom):r(l.marginLeft)+r(l.marginRight)}return a},s=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})};n.extend=function(e){for(e=e||{},t=1;t<arguments.length;t++)if(arguments[t])for(var n in arguments[t])arguments[t].hasOwnProperty(n)&&(e[n]=arguments[t][n]);return e},n.isMarginCollapseType=function(e){return["block","flex","list-item","table","-webkit-box"].indexOf(e)>-1};var a=0,l=["ms","moz","webkit","o"],c=e.requestAnimationFrame,u=e.cancelAnimationFrame;for(t=0;!c&&t<l.length;++t)c=e[l[t]+"RequestAnimationFrame"],u=e[l[t]+"CancelAnimationFrame"]||e[l[t]+"CancelRequestAnimationFrame"];c||(c=function(t){var n=(new Date).getTime(),r=Math.max(0,16-(n-a)),i=e.setTimeout(function(){t(n+r)},r);return a=n+r,i}),u||(u=function(t){e.clearTimeout(t)}),n.rAF=c.bind(e),n.cAF=u.bind(e);var f=n.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};f.String=function(e){return"string"===f(e)},f.Function=function(e){return"function"===f(e)},f.Array=function(e){return Array.isArray(e)},f.Number=function(e){return!f.Array(e)&&e-parseFloat(e)+1>=0},f.DomElement=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};var d=n.get={};return d.elements=function(t){var n=[];if(f.String(t))try{t=document.querySelectorAll(t)}catch(e){return n}if("nodelist"===f(t)||f.Array(t))for(var r=0,i=n.length=t.length;i>r;r++){var o=t[r];n[r]=f.DomElement(o)?o:d.elements(o)}else(f.DomElement(t)||t===document||t===e)&&(n=[t]);return n},d.scrollTop=function(t){return t&&"number"==typeof t.scrollTop?t.scrollTop:e.pageYOffset||0},d.scrollLeft=function(t){return t&&"number"==typeof t.scrollLeft?t.scrollLeft:e.pageXOffset||0},d.width=function(e,t,n){return o("width",e,t,n)},d.height=function(e,t,n){return o("height",e,t,n)},d.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(n.top+=d.scrollTop(),n.left+=d.scrollLeft())}return n},n.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},n.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},n.css=function(e,t){if(f.String(t))return i(e)[s(t)];if(f.Array(t)){var n={},r=i(e);return t.forEach(function(e){n[e]=r[s(e)]}),n}for(var o in t){var a=t[o];a==parseFloat(a)&&(a+="px"),e.style[s(o)]=a}},n}(window||{});return e});

// BEGIN AngularJS 

var app = angular.module("srApp", ["ngMaterial", "ngMessages","pageslide-directive"]);

//// BEGIN Header 

app.controller('searchCtrl',['$scope',function($scope){

	// functions move to end of file to genetic JS to be called by HTML Dom Event

}]);

//// END Header

//// BEGIN Sidenav Pulldown Menu

app.controller('pageslideRightMenuCtrl',['$scope',function($scope){

	$scope.checked = false; // This will be binded using the ps-open attribute
	$scope.rightNavState = "none"; // initially all closed

	$scope.toggle = function(){
		$scope.checked = !$scope.checked
	}

	$scope.sideMenuOn = function(){
		$scope.toggle();
		$("button#myAccountLinkButton").css("visibility", "hidden"); 
		$("div#headerHamburgerWrapper").css("visibility", "hidden"); 

		angular.element(document.getElementsByTagName("body")).addClass("noScroll");

	}

	$scope.sideMenuOff = function(){
		$scope.toggle();
		$("button#myAccountLinkButton").css("visibility", "visible"); 
		$("div#headerHamburgerWrapper").css("visibility", "visible"); 
		angular.element(document.getElementsByTagName("body")).removeClass("noScroll");

	}

	$scope.rightNavShow = function(showThis){
		$("ul#rightNav1").css("display", "none");  
		$("ul#rightNav2").css("display", "none");  

		if($scope.rightNavState == showThis) {	
			// closing what was opened
			$scope.rightNavState = "none";
		} else {
			// opening what was closed
			$("ul#"+showThis).css("display", "inherit"); 
			$scope.rightNavState = showThis;
		}
	}
	
}]);




app.controller('mobile-search',['$scope',function($scope){

	
var controller = new ScrollMagic.Controller({container: "#mobileSearchWrapper"});

// create a scene
new ScrollMagic.Scene({
        offset: 50        // start this scene after scrolling for 50px
    }).setClassToggle("#searchHeader", "toggleSearch").addTo(controller)



	
}]);


function hideSearch($scope){
    

   angular.element(document.getElementById("mobileSearchWrapper")).addClass("ng-hide");


    };

function showSearch($scope){
    

   angular.element(document.getElementById("mobileSearchWrapper")).removeClass("ng-hide");


    };


//// END Sidenav and MyAccount Pulldown Menu

//// BEGIN Search Schools

app.controller('searchSchoolCtrl', schoolSearch);


	/**
	 * Build `schools` list of key/value pairs
	 */

	/* ul-0 */
	 
   
  //	$http.get('js/faq.json')
   //    .then(function(res){
     //     $scope.faqs = res.data;             
      //  });



function schoolSearch ($timeout, $q, $log, $http, $scope) {


    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    self.repos         = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;


    function querySearch (query) {
      var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
    //  console.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {

     //console.info('Item changed to ' + JSON.stringify(item['id']));

     window.location.href = 'registration.html?id='+item;

    }

  


 function loadAll() {
      


      var repos = [
      
        {
          'name'  : 'Purdue University',
          'id'    : '3,623'
        },
        {
          'name'   : 'Auburn University',
          'id'     : '469'
        },
        {
          'name'   : 'ACSA - American College Student Association',
          'id'     : '1,241'
        },
        {
          'name' : 'Winona State University',
          'id'   : '84'
        },
        {
          'name' : 'College of William & Mary',
          'id' 	 : '81'
        }
      ];
    

  return repos.map( function (repo) {
        repo.value = repo.name.toLowerCase();
        return repo;
      });
	


    }
	


    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };

    }
  

}







//// END Search Schools

//// BEGIN Home page show next Tip

app.controller('homeTipCtrl',['$scope',function($scope){

	$scope.nextTip = function(showThis){
		$("div#homeTip1").css("display", "none");  
		$("div#homeTip2").css("display", "none"); 	
		$("div#homeTip3").css("display", "none"); 

		$("div#"+showThis).css("display", "inherit"); 
	}
}]);

//// END Home page Tip

//// BEGIN Login Modal Controller 

app.controller('loginModalCtrl', ["$scope", function ($scope) {
	/* Model (MVC) interface logic goes here for login and create my account process */

	$scope.checked = false; // This will be binded using the ps-open attribute
	$scope.hiddenAdditionalIDField = true;

	$scope.toggle = function(){
			$scope.checked = !$scope.checked
	}

	if (location.hash == '#/create') {

		$("div#accountPage1").css("display", "none");	// Login to My Account
		$("div#accountPage2").css("display", "inherit");

	}


$scope.$watch(function () {
    return location.hash
}, function (value) {

	if (location.hash == '#/create') {

		$("div#accountPage1").css("display", "none");	// Login to My Account
		$("div#accountPage2").css("display", "inherit");

	}

});



	// handle some other controller wanting to open 
	$scope.$on('handleBroadcastMenuSwitch', function(event, args) {
		$scope.toggle();
	}); 

	/* CSS note: "visibility" keeps white space and only hides content,
	 * "display" removes both white space and content, so it is completely gone
	*/
	$scope.accountMenuOn = function(){
		$scope.toggle();
		$("button#myAccountLinkButton").css("visibility", "hidden"); 
		$("div#headerHamburgerWrapper").css("visibility", "hidden"); 
		$scope.accountPage('accountPage1');
	}

	$scope.accountMenuOff = function(){
		$scope.toggle();
		$("button#myAccountLinkButton").css("visibility", "visible"); 
		$("div#headerHamburgerWrapper").css("visibility", "visible"); 
	}



	$scope.accountPage = function(showThis){
		$("div#accountPage1").css("display", "none");	// Login to My Account
		$("div#accountPage2").css("display", "none");	// Dot 1 - ABC Create an online account	
		$("div#accountPage3").css("display", "none");	// Dot 2 - Now let's create an account
		$("div#accountPage4").css("display", "none"); 	// Dot 3 - Secure your Identity
		$("div#accountPage5").css("display", "none"); 	// Verification Code Renewal
		$("div#accountPage6").css("display", "none"); 	// Account creation complete
		$("div#accountPage7").css("display", "none"); 	// Login with error displayed
		$("div#accountPage8").css("display", "none"); 	// Lost Username 
		$("div#accountPage9").css("display", "none"); 	// Username Sent 
		$("div#accountPage10").css("display", "none"); // Lost Password 
		$("div#accountPage11").css("display", "none"); // Password Sent 
		$("div#accountPage12").css("display", "none"); // Password Sent 
		$("div#accountHelpPage2").css("display","none");   // Reset any open field tips

		$("div#"+showThis).css("display", "inherit"); 
	}

	$scope.accountHelpToggleOpened = "none";

	$scope.accountHelpToggle = function(showThis){

		if (showThis == $scope.accountHelpToggleOpened) {
			$scope.accountHelpToggleOpened = "none"
			$("div#"+showThis).css("display", "none"); 
		} else {
			$scope.accountHelpToggleOpened = showThis;
			$("div#"+showThis).css("display", "inherit"); 
		}
	}

	$scope.toggleAdditionalIDField = function(){
		if ($scope.hiddenAdditionalIDField) {
			$("div#additionalIDField").css("display", "inherit"); 
		} else {
			$("div#additionalIDField").css("display", "none"); 
		}

		$scope.hiddenAdditionalIDField = !$scope.hiddenAdditionalIDField;
	}

	/* Account Page 2 B to activate C */
	$scope.Account2PageState = "A";

	$("#accountPage2UserID").focusout(function() {
		if ($scope.Account2PageState == "A") {
			$scope.Account2PageState = "B";
			/* if SR ID is not needed, enable Next button */
			/* else SR ID is need, enable field */
			if (true) {
				$("div#barLoginState1").css("display", "none"); 
				$("div#barLoginState2").css("display", "inherit"); 
				$("div#additionalIDFieldDisabled").css("display", "none"); 
				$("div#additionalIDField").css("display", "inherit"); 
			}
		}
	});

	/* Account Page 2 C to activate Next */
	$("#accountPageAdditionalID").focusout(function() {

		if ($scope.Account2PageState == "B") {
			$scope.Account2PageState = "C";

			if (true) {
				$("div#barLoginState2").css("display", "none"); 
				$("div#barLoginState3").css("display", "inherit"); 
				$("div#accountPage2NextDisabled").css("display", "none"); 
				$("div#accountPage2Next").css("display", "inherit"); 
			}
		}
	});

}]);

//// END Login Modal Controller 	

//// BEGIN School Page Controller 

app.controller('faqScroll', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){



setTimeout(function(){ 
var controller = new ScrollMagic.Controller();

	// create a scene
	new ScrollMagic.Scene({
	        offset: 2200 // start this scene after scrolling for 50px
	    }).setClassToggle("#faqNavFixed", "hideFAQMenu").addTo(controller);

 }, 5000);


// new ScrollMagic.Scene({
 //       triggerElement: "#footerFull"
  //  })
   // .on('start', function () {
       
   // })
   // .addIndicators()
   // .addTo(controller);

// #footerFullLogoWrapper








}]);


app.controller('schoolPageCtrl',['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){

	var controller = new ScrollMagic.Controller();

	// create a scene
	new ScrollMagic.Scene({
	        offset: 332        // start this scene after scrolling for 50px
	    }).setClassToggle("#schoolNavDesktop", "sticky").addTo(controller)


	new ScrollMagic.Scene({
	        offset: 710        // start this scene after scrolling for 50px
	    }).setClassToggle("#tagBar", "sticky").addTo(controller)


	/* school explore policy scroll */
	$scope.scrollTo = function(id) {

		/* if a policy document, show it first */
		if (id == "a" || id=="b" || id=="c") {
			$scope.showPolicyDisplay('policyDisplay1');
		}
		/* note: scrolling to Value Added Benefits is not required, no logic added */

		$location.hash(id);
		$anchorScroll();
	}

	/* school explore Level A: policy toggle menus - mobile only */
	$scope.togglePolicyMenuMobile = function(showThis){
		$("div#mobileExplorePolicyMenu1").css("display", "none");  
		$("div#mobileExplorePolicyMenu2").css("display", "none"); 	

		/* if a policy document, show it first */
		if (showThis == "mobileExplorePolicyMenu1") {
			$scope.showPolicyDisplay('policyDisplay1');
		} else if (showThis == "mobileExplorePolicyMenu2") {
			$scope.showPolicyDisplay('policyDisplay2');
		}

		$("div#"+showThis).css("display", "inherit"); 
	}

	/* school explore policy Level B: Plan Documents menu - mobile only */
	$scope.showPolicyMenu1Mobile = function(showThis){
		$("div#explorePolicyMenu1").css("display", "none");  
		$("div#explorePolicyMenu2").css("display", "none"); 	
		$("div#explorePolicyMenu3").css("display", "none"); 

		$("div#"+showThis).css("display", "inherit"); 
	}

	/* school explore policy Level B: Value Added Benefits menu - mobile only */
	$scope.showPolicyMenu2Mobile = function(showThis){
		$("div#explorePolicyMenu4").css("display", "none"); 
		$("div#explorePolicyMenu5").css("display", "none"); 
		$("div#explorePolicyMenu6").css("display", "none"); 
		$("div#explorePolicyMenu7").css("display", "none"); 

		$("div#"+showThis).css("display", "inherit"); 
	}

	/* school explore policy display and hide parts */
	$scope.showPolicyDisplay = function(showThis){
		$("div#policyDisplay1").css("display", "none"); 	/* all policy documents */
		$("div#policyDisplay2").css("display", "none"); 
		$("div#policyDisplay3").css("display", "none"); 
		$("div#policyDisplay4").css("display", "none"); 
		$("div#policyDisplay5").css("display", "none"); 
		$("div#policyDisplay6").css("display", "none"); 

		$("div#"+showThis).css("display", "inherit"); 
	}

	$scope.checked = false; // This will be binded using the ps-open attribute
	$scope.hiddenAdditionalIDField = true;

	$scope.toggle = function(){
			$scope.checked = !$scope.checked
	}


$scope.policyFilter = "all";
	$scope.showPolicy = function(showThis){

		// reset all buttons to normal display
		$("button#policyDUClose").css("display", "none"); 
		$("button#policyDU").css("display", "inline-block");  
		$("button#policyISClose").css("display", "none"); 
		$("button#policyIS").css("display", "inline-block"); 	
		$("button#policyGPClose").css("display", "none"); 
		$("button#policyGP").css("display", "inline-block"); 

		// clicking the current filter turns it off
		if (showThis == $scope.policyFilter) {
			showThis = "all";
		}
		$scope.policyFilter = showThis;

		if (showThis == "all") {
			$("div.policyDU").css("display", "inline-block");  
			$("div.policyIS").css("display", "inline-block"); 	
			$("div.policyGP").css("display", "inline-block"); 
		} else {
			$("div.policyDU").css("display", "none");  
			$("div.policyIS").css("display", "none"); 	
			$("div.policyGP").css("display", "none"); 

			$("div."+showThis).css("display", "inline-block"); 
			$("button#"+showThis).css("display", "none"); 
			$("button#"+showThis+"Close").css("display", "inline-block"); 
		}
	}

	$scope.policyMessageClose = function(){
		$("div#policyImportantMessage").css("display", "none")
	}



	$scope.socialSecurityFormat = function(){

  $('#spouseGovID, #selfGovID, #child1GovID').keyup(function() {
          var val = this.value.replace(/\D/g, '');
          var newVal = '';
          if(val.length > 4) {
             this.value = val;
          }
          if((val.length > 3) && (val.length < 6)) {
             newVal += val.substr(0, 3) + '-';
             val = val.substr(3);
          }
          if (val.length > 5) {
             newVal += val.substr(0, 3) + '-';
             newVal += val.substr(3, 2) + '-';
             val = val.substr(5);
           }
           newVal += val;
           this.value = newVal;



        });

}


$scope.socialSecurityhide = function(){





}




	$scope.showInfo = function(showThis) {
			if (showThis == "infoDefault") {
				$("div#info1").css("display", "none");  
				$("div#info2").css("display", "none");  
				$("div#info3").css("display", "none"); 
				$("div#info4").css("display", "none"); 
				$("div#schoolTopMenu3").css("display", "inline-block");  

			} else {
				$("div#infoDefault").css("display", "none");  
				$("div#schoolTopMenu3").css("display", "none");  
			}
			$("div#"+showThis).css("display", "inline-block"); 
	}


	/* CSS note: "visibility" keeps white space and only hides content,
	 * "display" removes both white space and content, so it is completely gone
	 */
	$scope.schoolMenuOn = function(){
		$scope.toggle();
		$("button#myschoolLinkButton").css("visibility", "hidden"); 
		$("div#headerHamburgerWrapper").css("visibility", "hidden"); 
		$scope.schoolPage('schoolPage1');
	}

	$scope.schoolMenuOff = function(){
		$scope.toggle();
		$("button#myschoolLinkButton").css("visibility", "visible"); 
		$("div#headerHamburgerWrapper").css("visibility", "visible"); 
	}

	$scope.schoolMenuBarOpen = "none";

	$scope.schoolMenuBarToggle = function(toggleThis) {
		$("#schoolMenuBar ul#menu1").css("display", "none"); 	
		$("#schoolMenuBar ul#menu2").css("display", "none"); 	
		$("#schoolMenuBar ul#menu3").css("display", "none"); 	

		if ($scope.schoolMenuBarOpen != toggleThis) {
			$("#schoolMenuBar ul#" + toggleThis).css("display", "block"); 	
			$scope.schoolMenuBarOpen = toggleThis;
		} else {
			$scope.schoolMenuBarOpen = "none";
		}
	}

	$scope.schoolMenuBarMobileOpen = "none";

	$scope.schoolMenuBarMobileToggle = function(toggleThis) {

		$("#schoolNavMobileMenu1").css("display", "none"); 	
		$("#schoolNavMobileMenu2").css("display", "none"); 	
		$("#schoolNavMobileMenu3").css("display", "none"); 	

		if ($scope.schoolMenuBarMobileOpen != toggleThis) {
			$("#" + toggleThis).css("display", "inline-block"); 	
			$scope.schoolMenuBarMobileOpen = toggleThis;
		} else {
			$scope.schoolMenuBarMobileOpen = "none";
		}
	}

	$scope.schoolPage = function(showThis){

		if (showThis == "schoolPage1") {
			$("section#schoolTop1").css("display", "block");  
			$("section#schoolTop2").css("display", "none");  
			$("section#schoolBottom").removeClass("uhcLightGrayBackground");
			
		} else {
			$("section#schoolTop1").css("display", "none");  
			$("section#schoolTop2").css("display", "block");  
			$("section#schoolBottom").addClass("uhcLightGrayBackground");
		}

		// note: there is no page 1 div
		$("div#schoolPage2").css("display", "none"); 	// Welcome
		$("div#schoolPage3").css("display", "none"); 	// Policy plan - Enroll Now
		$("div#schoolPage4").css("display", "none"); 	// Step 1 - Basic Info
		$("div#schoolPage5").css("display", "none"); 	// Step 2 - Select a policy Term
		$("div#schoolPage6").css("display", "none"); 	// Step 3 - Account Status
		$("div#schoolPage7").css("display", "none"); 	// Step 4 - Tell Us About Yourself
		$("div#schoolPage8").css("display", "none"); 	// Step 5 - Complete Purchase
		$("div#schoolPage9").css("display", "none"); 	// Congratulations
		$("div#schoolPage10").css("display", "none"); 	// dev only: all form elements

		$("div#"+showThis).css("display", "block");
		$("#schoolClaimsWrapper").css("display","block");
		
		if (showThis != "schoolPage2"){
			$scope.scrollTo(showThis);	
		};

	}

	$scope.toggleAdditionalIDField = function(){

		if ($scope.hiddenAdditionalIDField) {
			$("div#additionalIDField").css("display", "inherit"); 
		} else {
			$("div#additionalIDField").css("display", "none"); 
		}

		$scope.hiddenAdditionalIDField = !$scope.hiddenAdditionalIDField;
	}

	/* select policy Year */
	$scope.policyYears = ["Policy Year","2015 - 2016", "2016 - 2017"];
	$scope.policyYearModel; 	/* placeholder model */
	$scope.getPolicyYear = function() {
		if ($scope.selectedItem !== undefined) {
			return $scope.selectedItem;
		} else {
			return "Policy Year";
		}
	};

	/* school registration step 1 */
	/* Note: generate array per business requirements */
	$scope.selectOptionStep1CategoryItems = ["Category A", "Category B", "Category C" ];
	$scope.selectOptionStep1CategoryModel; 		

	$scope.selectOptionBirthMonthItems = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	$scope.selectOptionBirthMonthModel; 		

	$scope.selectOptionBirthDayOfMonthItems = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20","21","22","23","24","25","26","27","28","29","30","31",  ];
	$scope.selectOptionBirthDayOfMonthModel; 		

	/* Note: generate array per business requirements for min and max years allowed */
	/* Array used for both children and students */
	$scope.selectOptionBirthYearItems = ["2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006", "2004", "2003", "2002", "2001", "2000", "1999", "1998", "1997", "1996", "1995", "1994", "1993", "1992",  ];
	$scope.selectOptionBirthYearModel; 		


	$scope.schoolStep1CheckboxChanged = function() {

		if ($("#readAllDocsCheckbox.md-checked").length) {
			/* checkbox was unchecked */
			$("#readAllDocsStep1Next").removeClass("uhcLightBlue");
			$("#readAllDocsStep1Next").addClass("uhcDisabledLightBlue");
		} else {
			/* checkbox was checked */
			$("#readAllDocsStep1Next").removeClass("uhcDisabledLightBlue");
			$("#readAllDocsStep1Next").addClass("uhcLightBlue");
			$("#readAllDocsCheckbox").removeClass("uhcFontBold");
		}
	};

	$scope.schoolStep1NextClicked = function() {

		if ($("#readAllDocsCheckbox.md-checked").length) {
			$scope.schoolPage('schoolPage5');
		} else {
			$("#readAllDocsCheckbox").addClass("uhcFontBold");
		}
	};

	/* step 4: default set mailing address is same as permanent address */
	$scope.checkboxMailSameInitialState = true;
	$scope.checkboxMailSameToggle = function () {
		if ($("#checkboxMailSame.md-checked").length) {
			$("div#mailingAddress").css("display", "inherit");
		} else {
			$("div#mailingAddress").css("display", "none");
		}
	}

	$scope.selectRaceItems = ["Race 1", "Race 2", "Race 3", "Race 4", "Race 5" ];
	$scope.selectRaceModel; 		

	$scope.selectEthnicityItems = ["Ethnicity 1", "Ethnicity 2", "Ethnicity 3", "Ethnicity 4", "Ethnicity 5" ];
	$scope.selectEthnicityModel; 		

	$scope.selectLanguageItems = ["Language 1", "Language 2", "Language 3", "Language 4", "Language 5" ];
	$scope.selectLanguageModel; 		

	/* step 5: payment */
	$scope.selectRadioPlaymentModel; 		
	$scope.showPayment = function(state) {
		if (state == "on") {
			$("div#echeckFields").css("display", "inherit");
		} else {
			$("div#echeckFields").css("display", "none");
		}
	}

	/* Note: generate array per business requirements */
	$scope.selectOptionStep1ChildrenItems = ["0", "1", "2 or more" ];
	$scope.selectOptionStep1ChildrenModel; 		


	/* DEV for page 10 - all form elements */
	$scope.selectOption1Items = ["Option 1A", "Option 1B", "Option 1C" ];
	$scope.selectOption1Model; 		

	$scope.selectOption2Items = ["0", "1", "2" ];
	$scope.selectOption2Model; 		

	$scope.selectOption3Items = ["A", "B", "C" ];
	$scope.selectOption3Model; 		

	$scope.selectRadio1Model; 		

}]);

//// END School Page Controller 

//// BEGIN Help Center Navigation Controller 

app.run(['$anchorScroll', function($anchorScroll) {
      $anchorScroll.yOffset = 260;   // leave room for navbar
}])

app.controller('navCtrl',['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){

	/* glossary scroll */
//	$scope.scrollTo = function(id) {
//		$location.hash(id);
//		$anchorScroll();
//	}





     /* on of FAQ page, call javascript script function */
	/* $window.onload = function() { */
	$scope.scrollToLink = function() {
		var myID;

		// make sure document is visible
		document.body.style.opacity='1';

		switch (location.hash) {
			case "#/Q1": 
				var myID = 'Q1-question';
				break;
			case "#/Q2": 
				var myID = 'Q2-question';
				break;
			case "#/Q3": 
				var myID = 'Q3-question';
				break;
			case "#/Q4": 
				var myID = 'Q4-question';
				break;
			default:
				return;
		};

		if (myID) {
			var myElement = document.getElementById(myID);
			myElement.style.display = 'block'; 
			$location.hash(myID);
			$anchorScroll();
		};
};










	$scope.helpCenterHeroCurrent = 1;

	$scope.helpCenterHeroNext = function(){
		$("div#helpCenterHeroOption"+$scope.helpCenterHeroCurrent).css("display", "none"); 	

		$scope.helpCenterHeroCurrent++;
		if ($scope.helpCenterHeroCurrent > 4) $scope.helpCenterHeroCurrent = 1;

		$("div#helpCenterHeroOption"+$scope.helpCenterHeroCurrent).css("display", "inherit"); 
	}

	$scope.helpCenterHeroPrevious = function(){
		$("div#helpCenterHeroOption"+$scope.helpCenterHeroCurrent).css("display", "none"); 	

		$scope.helpCenterHeroCurrent--;
		if ($scope.helpCenterHeroCurrent < 1) $scope.helpCenterHeroCurrent = 4;

		$("div#helpCenterHeroOption"+$scope.helpCenterHeroCurrent).css("display", "inherit"); 
	}

}]);

//// END Navigation Controller 

//// BEGIN FAQ Search Controller 

app.controller('faqSearchCtrl',['$scope',function($scope){
	$scope.hiddenFaqResultsSearchWrapper = true;

	$scope.toggleFaqResultsSearch = function(){
		if ($scope.hiddenFaqResultsSearchWrapper) {
			$("div#FaqResultsSearchWrapper").css("display", "inherit"); 
			$("div#FaqResultsSearchIcon").css("display", "none"); 
		} else {
			$("div#FaqResultsSearchWrapper").css("display", "none"); 
			$("div#FaqResultsSearchIcon").css("display", "inherit"); 
		}

		$scope.hiddenFaqResultsSearchWrapper = !$scope.hiddenFaqResultsSearchWrapper;
	}

}]);

//// END FAQ Search Controller 


//// BEGIN Glossary Mobile Horizontal Menu

app.controller('glossaryMobileMenuCtrl',['$scope',function($scope){

	$scope.showMenu = function(showThis){
		$("div#glossaryMenu1").css("display", "none");  
		$("div#glossaryMenu2").css("display", "none"); 	
		$("div#glossaryMenu3").css("display", "none"); 
		$("div#glossaryMenu4").css("display", "none"); 
		$("div#glossaryMenu5").css("display", "none"); 

		$("div#"+showThis).css("display", "inherit"); 
	}
}]);

//// END Glossary Mobile Horizontal Menu

//// BEGIN Survey Page Controller 

app.controller('surveyPageCtrl',['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){
	
	$scope.surveySays = function(responseGiven) {

		if(responseGiven == "question1Yes") {
			$("div#question2").css("display", "inherit"); 
			$("div#question3").css("display", "inherit"); 
		}
		if(responseGiven == "question1No") {
			$("div#question2").css("display", "none"); 
			$("div#question3").css("display", "inherit"); 
		}
		if(responseGiven == "question3Option1" 
 	  || responseGiven == "question3Option2"
	  || responseGiven == "question3Option3")  {
			$("div#finalSurvey").css("display", "inherit"); 
		}
	}
}]);

//// END Survey Page Controller 


// END AngularJS



// FAQ TOGGLE //





app.directive('dExpandCollapse', function() {
  return {
          restrict: 'EA',
          link: function(scope, element, attrs){
       
            $(element).click( function() {
            	//var show = "false";
            	$(element).find(".answer").slideToggle('200',function() {});
       		  });
          }
        }

});
// FAQ TOGGLE //


  app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });


	








app.controller('stickyEnabled',['$scope',function($scope){

	// $scope.disableSticking = false;


//#sideNavLeft

var controller = new ScrollMagic.Controller();

	// create a scene
	new ScrollMagic.Scene({
	        offset: 332,
	        duration: 500        // start this scene after scrolling for 50px
	    }).setClassToggle("#stickNav", "stickyNav").addTo(controller)

}]);



app.controller('rfpstickyEnabled',['$scope',function($scope){

	// $scope.disableSticking = false;


//#sideNavLeft

var controller = new ScrollMagic.Controller();

	// create a scene
	new ScrollMagic.Scene({
	        offset: 332,
	        duration: 1200        // start this scene after scrolling for 50px
	    }).setClassToggle("#stickNav", "stickyNav").addTo(controller)

}]);



//// BEGIN Request Quote Controller 

app.controller('requestQuoteCtrl',['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){

}]);

//// END Request Quote Controller 

//// BEGIN Modify Default Theme

/* used for survey slider thumb indicator */
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .accentPalette('blue', {
      'default': '200' 
    });
});



// BEGIN Generic Javascript d
// The following code does not need to be inside a specific Angular Controller

// fade hero overlay text as user scrolls up
$(window).scroll(function(){
    $(".heroOverlayText").css("opacity", 1 - $(window).scrollTop() / 250);
	var y = $(window).scrollTop() / -5;
	$(".parallax").css("background-position", "0px " + y + "px");
  });

// open and close header search field
// NOTE: not included in angular since call to close is an HTML Dom Event 

function openHeaderFullSearch() {
	$("div#headerFullSearchWrapper").css("display", "inherit"); 
	$("div#headerFullSearchIcon").css("display", "none"); 
};

function closeHeaderFullSearch() {
	$("div#headerFullSearchWrapper").css("display", "none"); 
	$("div#headerFullSearchIcon").css("display", "inherit"); 
};

// END Generic Javascript

//$('').attr('disabled-sticky','disableSticking')



// FIXED POSITION SCROLLING FIX

app.directive('isolateScrolling', function () {
  return {
    restrict: 'A',
      link: function (scope, element, attr) {
        element.bind('DOMMouseScroll', function (e) {
          if (e.detail > 0 && this.clientHeight + this.scrollTop == this.scrollHeight) {
            this.scrollTop = this.scrollHeight - this.clientHeight;
            e.stopPropagation();
            e.preventDefault();
            return false;
          }
          else if (e.detail < 0 && this.scrollTop <= 0) {
            this.scrollTop = 0;
            e.stopPropagation();
            e.preventDefault();
            return false;
          }
        });
        element.bind('mousewheel', function (e) {
          if (e.deltaY > 0 && this.clientHeight + this.scrollTop >= this.scrollHeight) {
            this.scrollTop = this.scrollHeight - this.clientHeight;
            e.stopPropagation();
            e.preventDefault();
            return false;
          }
          else if (e.deltaY < 0 && this.scrollTop <= 0) {
            this.scrollTop = 0;
            e.stopPropagation();
            e.preventDefault();
            return false;
          }

          return true;
        });
      }
  };
});


// 1.1 FAQ GENERATE & SEARCH
app.controller('faqGenerate', function($scope, $http) {
  $http.get('js/faq.json')
       .then(function(res){
          $scope.faqs = res.data;             
        });

	    // 1.1A ADD DYNAMIC LINKS EVENT FAQ DOM MODEL
		$scope.$on('lastFAQ', function(ngRepeatFinishedEvent) { $scope.scrollToLink();});
})

// 1.2 CHECK TO SEE WHETHER ALL FAQS ARE IN THE DOM
app.directive('onFinishFaq', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('lastFAQ');
                });
            }
        }
    }
});

// 1.3 FAQ TERM HIGHLIGHTING 
app.filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>')
      return $sce.trustAsHtml(text)
    }
  })



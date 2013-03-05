// turbolinks
var anchoredLink,assetsChanged,browserCompatibleDocumentParser,browserIsntBuggy,browserSupportsPushState,cacheCurrentPage,changePage,constrainPageCacheTo,createDocument,crossOriginLink,currentState,executeScriptTags,extractLink,extractTitleAndBody,extractTrackAssets,fetchHistory,fetchReplacement,handleClick,ignoreClick,initializeTurbolinks,initialized,installClickHandlerLast,intersection,loadedAssets,noTurbolink,nonHtmlLink,nonStandardClick,pageCache,recallScrollPosition,referer,reflectNewUrl,reflectRedirectedUrl,rememberCurrentState,rememberCurrentUrl,rememberInitialPage,removeHash,requestMethod,requestMethodIsSafe,resetScrollPosition,targetLink,triggerEvent,visit,xhr,_ref,__hasProp={}.hasOwnProperty,__indexOf=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++){if(t in this&&this[t]===e)return t}return-1};initialized=false;currentState=null;referer=document.location.href;loadedAssets=null;pageCache={};createDocument=null;requestMethod=((_ref=document.cookie.match(/request_method=(\w+)/))!=null?_ref[1].toUpperCase():void 0)||"";xhr=null;visit=function(e){if(browserSupportsPushState){cacheCurrentPage();reflectNewUrl(e);return fetchReplacement(e)}else{return document.location.href=e}};fetchReplacement=function(e){var t,n=this;triggerEvent("page:fetch");t=removeHash(e);if(xhr!=null){xhr.abort()}xhr=new XMLHttpRequest;xhr.open("GET",t,true);xhr.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml");xhr.setRequestHeader("X-XHR-Referer",referer);xhr.onload=function(){var e;e=createDocument(xhr.responseText);if(assetsChanged(e)){return document.location.reload()}else{changePage.apply(null,extractTitleAndBody(e));reflectRedirectedUrl(xhr);if(document.location.hash){document.location.href=document.location.href}else{resetScrollPosition()}return triggerEvent("page:load")}};xhr.onloadend=function(){return xhr=null};xhr.onabort=function(){return rememberCurrentUrl()};xhr.onerror=function(){return document.location.href=e};return xhr.send()};fetchHistory=function(e){var t;cacheCurrentPage();if(t=pageCache[e.position]){if(xhr!=null){xhr.abort()}changePage(t.title,t.body);recallScrollPosition(t);return triggerEvent("page:restore")}else{return fetchReplacement(document.location.href)}};cacheCurrentPage=function(){rememberInitialPage();pageCache[currentState.position]={url:document.location.href,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset};return constrainPageCacheTo(10)};constrainPageCacheTo=function(e){var t,n,r;r=[];for(t in pageCache){if(!__hasProp.call(pageCache,t))continue;n=pageCache[t];if(t<=currentState.position-e){r.push(pageCache[t]=null)}else{r.push(void 0)}}return r};changePage=function(e,t,n){document.title=e;document.documentElement.replaceChild(t,document.body);if(n){executeScriptTags()}currentState=window.history.state;return triggerEvent("page:change")};executeScriptTags=function(){var e,t,n,r,i,s,o,u,a,f,l,c,h;f=document.body.getElementsByTagName("script");h=[];for(s=0,u=f.length;s<u;s++){i=f[s];if(!((l=i.type)===""||l==="text/javascript")){continue}t=document.createElement("script");c=i.attributes;for(o=0,a=c.length;o<a;o++){e=c[o];t.setAttribute(e.name,e.value)}t.appendChild(document.createTextNode(i.innerHTML));r=i.parentNode,n=i.nextSibling;r.removeChild(i);h.push(r.insertBefore(t,n))}return h};reflectNewUrl=function(e){if(e!==document.location.href){referer=document.location.href;return window.history.pushState({turbolinks:true,position:currentState.position+1},"",e)}};reflectRedirectedUrl=function(e){var t;if((t=e.getResponseHeader("X-XHR-Current-Location"))&&t!==document.location.pathname+document.location.search){return window.history.replaceState(currentState,"",t+document.location.hash)}};rememberCurrentUrl=function(){return window.history.replaceState({turbolinks:true,position:Date.now()},"",document.location.href)};rememberCurrentState=function(){return currentState=window.history.state};rememberInitialPage=function(){if(!initialized){rememberCurrentUrl();rememberCurrentState();createDocument=browserCompatibleDocumentParser();return initialized=true}};recallScrollPosition=function(e){return window.scrollTo(e.positionX,e.positionY)};resetScrollPosition=function(){return window.scrollTo(0,0)};removeHash=function(e){var t;t=e;if(e.href==null){t=document.createElement("A");t.href=e}return t.href.replace(t.hash,"")};triggerEvent=function(e){var t;t=document.createEvent("Events");t.initEvent(e,true,true);return document.dispatchEvent(t)};extractTrackAssets=function(e){var t,n,r,i,s;i=e.head.childNodes;s=[];for(n=0,r=i.length;n<r;n++){t=i[n];if((typeof t.getAttribute==="function"?t.getAttribute("data-turbolinks-track"):void 0)!=null){s.push(t.src||t.href)}}return s};assetsChanged=function(e){var t;loadedAssets||(loadedAssets=extractTrackAssets(document));t=extractTrackAssets(e);return t.length!==loadedAssets.length||intersection(t,loadedAssets).length!==loadedAssets.length};intersection=function(e,t){var n,r,i,s,o;if(e.length>t.length){s=[t,e],e=s[0],t=s[1]}o=[];for(r=0,i=e.length;r<i;r++){n=e[r];if(__indexOf.call(t,n)>=0){o.push(n)}}return o};extractTitleAndBody=function(e){var t;t=e.querySelector("title");return[t!=null?t.textContent:void 0,e.body,"runScripts"]};browserCompatibleDocumentParser=function(){var e,t,n,r;e=function(e){return(new DOMParser).parseFromString(e,"text/html")};t=function(e){var t;t=document.implementation.createHTMLDocument("");t.open("replace");t.write(e);t.close();return t};if(window.DOMParser){n=e("<html><body><p>test")}if((n!=null?(r=n.body)!=null?r.childNodes.length:void 0:void 0)===1){return e}else{return t}};installClickHandlerLast=function(e){if(!e.defaultPrevented){document.removeEventListener("click",handleClick);return document.addEventListener("click",handleClick)}};handleClick=function(e){var t;if(!e.defaultPrevented){t=extractLink(e);if(t.nodeName==="A"&&!ignoreClick(e,t)){visit(t.href);return e.preventDefault()}}};extractLink=function(e){var t;t=e.target;while(!(!t.parentNode||t.nodeName==="A")){t=t.parentNode}return t};crossOriginLink=function(e){return location.protocol!==e.protocol||location.host!==e.host};anchoredLink=function(e){return(e.hash&&removeHash(e))===removeHash(location)||e.href===location.href+"#"};nonHtmlLink=function(e){return e.href.match(/\.[a-z]+(\?.*)?$/g)&&!e.href.match(/\.html?(\?.*)?$/g)};noTurbolink=function(e){var t;while(!(t||e===document)){t=e.getAttribute("data-no-turbolink")!=null;e=e.parentNode}return t};targetLink=function(e){return e.target.length!==0};nonStandardClick=function(e){return e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey};ignoreClick=function(e,t){return crossOriginLink(t)||anchoredLink(t)||nonHtmlLink(t)||noTurbolink(t)||targetLink(t)||nonStandardClick(e)};initializeTurbolinks=function(){document.addEventListener("click",installClickHandlerLast,true);return window.addEventListener("popstate",function(e){var t;if((t=e.state)!=null?t.turbolinks:void 0){return fetchHistory(e.state)}})};browserSupportsPushState=window.history&&window.history.pushState&&window.history.replaceState&&window.history.state!==void 0;browserIsntBuggy=!navigator.userAgent.match(/CriOS\//);requestMethodIsSafe=requestMethod==="GET"||requestMethod==="";if(browserSupportsPushState&&browserIsntBuggy&&requestMethodIsSafe){initializeTurbolinks()}this.Turbolinks={visit:visit}


// save website to cache
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);


// for dribble shots
(function(a){"use strict",a.fn.jribbble=function(){return this.makeRequest=function(b,c,d){var e=function(b){a.isFunction(c)&&c(b)},f=b.replace("//","/");a.ajax({data:d,dataType:"jsonp",success:e,type:"GET",url:a.jribbble.baseUrl+f})},this},a.jribbble={},a.jribbble.baseUrl="http://api.dribbble.com",a.jribbble.paths={shots:"/shots/",rebounds:"/rebounds/",following:"/following/",players:"/players/",followers:"/followers/",draftees:"/draftees/",comments:"/comments/",likes:"/likes/"},a.jribbble.getShotById=function(b,c){var d=a.jribbble.paths.shots+b;a.fn.jribbble().makeRequest(d,c)},a.jribbble.getReboundsOfShot=function(b,c,d){var e=a.jribbble.paths.shots+b+a.jribbble.paths.rebounds;a.fn.jribbble().makeRequest(e,c,d)},a.jribbble.getShotsByList=function(b,c,d){var e=a.jribbble.paths.shots+b;a.fn.jribbble().makeRequest(e,c,d)},a.jribbble.getShotsByPlayerId=function(b,c,d){var e=a.jribbble.paths.players+b+a.jribbble.paths.shots;a.fn.jribbble().makeRequest(e,c,d)},a.jribbble.getShotsThatPlayerFollows=function(b,c,d){var e=a.jribbble.paths.players+b+a.jribbble.paths.shots+a.jribbble.paths.following;a.fn.jribbble().makeRequest(e,c,d)},a.jribbble.getPlayerById=function(b,c){var d=a.jribbble.paths.players+b;a.fn.jribbble().makeRequest(d,c)},a.jribbble.getPlayerFollowers=function(b,c,d){var e=a.jribbble.paths.players+b+a.jribbble.paths.followers;a.fn.jribbble().makeRequest(e,c,d)},a.jribbble.getPlayerFollowing=function(b,c,d){var e=a.jribbble.paths.players+b+a.jribbble.paths.following;a.fn.jribbble().makeRequest(e,c,d)},a.jribbble.getPlayerDraftees=function(b,c,d){var e=a.jribbble.paths.players+b+a.jribbble.paths.draftees;a.fn.jribbble().makeRequest(e,c,d)},a.jribbble.getCommentsOfShot=function(b,c,d){var e=a.jribbble.paths.shots+b+a.jribbble.paths.comments;a.fn.jribbble().makeRequest(e,c,d)},a.jribbble.getShotsThatPlayerLikes=function(b,c,d){var e=a.jribbble.paths.players+b+a.jribbble.paths.shots+a.jribbble.paths.likes;a.fn.jribbble().makeRequest(e,c,d)}})(jQuery);


// iphone and ipad styling
if (navigator.userAgent.match(/iPhone/i)) { // || navigator.userAgent.match(/iPad/i)
  /* fixes map positioning */
  detectOrientation();
  window.onorientationchange = detectOrientation;
  function detectOrientation(){
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    /* if iPhone */
    if (width < '768') {
      $("#locations span").css("top", "30%"); /* +2% down */
      $(".map").css("height", "165px");

    /* if iPad portrait */
    } else if (width == '768') {
      // $("#locations span").css("top", "32%"); /* +5% down */

    /* if iPad landscape revert changes */
    // } else {
      // $("#location span").css("top", "28.5%");
      // $(".design").css("margin-bottom", "1.55em");
    }
  }
}

console.log("Feel free to look around, but create your own; don't steal. Questions or feedback: http://twitter.com/sican");

$('.to_top').click(function() {
  $('body,html').animate({scrollTop: 0}, 300);
  return false;
})

/* hides Safari address bar on iPhone */
if (navigator.userAgent.match(/iPhone/i)) {
  window.addEventListener("load",function() {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 500);
  });
}

/* displays dribbble shots */
$.jribbble.getShotsByPlayerId('sican', function (playerShots) {
  var html = [];

  $.each(playerShots.shots, function (i, shot) {
    html.push('<li><a href="' + shot.url + '" class="img dribbble_shot" target="_blank">');
    html.push('<img src="' + shot.image_url + '" ');
    html.push('alt="' + shot.title + '"></a></li>');
  });

  $('#shots').html(html.join(''));
}, {page: 1, per_page: 6});
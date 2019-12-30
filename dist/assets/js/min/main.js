"use strict";var gridContainers=document.querySelectorAll(".grid-container-home");gridContainers.forEach(function(e){var t=e.querySelectorAll(".card");e.classList.add("grid-container-home-".concat(t.length))}),document.body.onload=document.body.classList.add("animate");var sun=document.querySelectorAll(".color-mode-btn--sun"),moon=document.querySelectorAll(".color-mode-btn--moon"),toggleBrightMode=function(){document.documentElement.setAttribute("color-mode","bright"),localStorage.setItem("pref","bright")},toggleDarkMode=function(){document.documentElement.setAttribute("color-mode","dark"),localStorage.setItem("pref","dark")};sun.forEach(function(e){e.addEventListener("click",toggleBrightMode)}),moon.forEach(function(e){e.addEventListener("click",toggleDarkMode)}),"bright"===localStorage.getItem("pref")&&toggleBrightMode();var siteTitles=document.querySelectorAll(".site-title"),hero=document.querySelector(".hero"),scrollPosHero=0,tickingHero=!1,animateNav=function(e){e>hero.offsetHeight+25?siteTitles.forEach(function(e){return e.classList.add("show-nav")}):siteTitles.forEach(function(e){return e.classList.remove("show-nav")})};null!==hero&&window.addEventListener("scroll",function(){scrollPosHero=window.scrollY,tickingHero||(window.requestAnimationFrame(function(){animateNav(scrollPosHero),tickingHero=!1}),tickingHero=!0)});var smSearchBtn=document.querySelector(".navbar-mobile__search-btn"),lgSearchBtn=document.querySelector(".navbar__right-item--search"),hamburgerBtn=document.querySelector(".navbar-mobile__hamburger-btn"),mobileNavMenu=document.querySelector(".mobile-nav-menu"),searchModal=document.querySelector(".modal-search"),modalSearchCloseBtn=document.querySelector(".modal-search__close-btn"),searchModalInner=document.querySelector(".modal-search__inner-container"),mobileNavMenuInner=document.querySelector(".mobile-nav-menu__inner");"undefined"!=typeof SEARCH_API&&(smSearchBtn.style.display="block",lgSearchBtn.style.display="block");var btns=[smSearchBtn,lgSearchBtn,hamburgerBtn,modalSearchCloseBtn],closeMenu=function(e,t){document.body.classList.remove("expanded-".concat(t)),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-hidden","true")},openMenu=function(n,r){document.body.classList.contains("expanded-menu")&&closeMenu(mobileNavMenu,"menu"),document.body.classList.contains("expanded-modal-search")&&closeMenu(searchModal,"modal-search"),document.body.classList.add("expanded-".concat(r)),n.setAttribute("aria-expanded","true"),n.setAttribute("aria-hidden","false");document.body.addEventListener("keyup",function e(t){"Escape"===t.key&&(closeMenu(n,r),document.body.removeEventListener("keyup",e))})};btns.forEach(function(e){e.addEventListener("click",function(e){var t=e.currentTarget.dataset.target,n=document.getElementById(t);return"false"===n.getAttribute("aria-expanded")?openMenu(n,t):closeMenu(n,t)})});var lastKnownScrollPos=0,ticking=!1,progressBar=document.querySelector(".post-reading-progress"),shareBar=document.querySelector(".post-share-bar"),footer=document.querySelector(".footer--outer-container"),buffer=50,postImg=null!==document.querySelector(".post__img")?document.querySelector(".post__img"):document.querySelector(".post__no-img"),postContentHeight=document.querySelector(".post__content");function readingBarProgress(e){var t=Math.ceil(e/postContentHeight.clientHeight*100);progressBar.style.width="".concat(t,"%")}function shareBarAnimation(){postImg.getBoundingClientRect().bottom+buffer<shareBar.getBoundingClientRect().top&&shareBar.getBoundingClientRect().bottom<footer.getBoundingClientRect().top-buffer?(1024<window.innerWidth?shareBar.style.marginLeft="0":shareBar.style.marginBottom="0",shareBar.style.opacity="1"):(1024<window.innerWidth?shareBar.style.marginLeft="-200px":shareBar.style.marginBottom="-100px",shareBar.style.opacity="0")}null!==shareBar&&window.addEventListener("scroll",function(){lastKnownScrollPos=window.scrollY,ticking||(window.requestAnimationFrame(function(){shareBarAnimation(),null!==progressBar&&readingBarProgress(lastKnownScrollPos),ticking=!1}),ticking=!0)});var copyButton=document.getElementById("copy-button");copyButton&&copyButton.addEventListener("click",function(){var e=window.location.href,t=document.createElement("input");document.body.appendChild(t),t.value=e,t.select(),document.execCommand("copy"),document.body.removeChild(t)});var tables=document.querySelectorAll(".post__content > table");function tablePrepend(e){var t=document.createElement("div");t.setAttribute("style","width: 100%; overflow-x: auto; margin: 1em 0;"),e.parentNode.insertBefore(t,e),t.appendChild(e)}tables.forEach(function(e){return tablePrepend(e)});var builtIdx="";if("undefined"!=typeof SEARCH_API){var api=new GhostContentAPI({url:"".concat(window.location.protocol,"//").concat(window.location.host),key:SEARCH_API,version:"v2"});""===builtIdx&&(builtIdx=api.posts.browse({include:"tags,authors",formats:"plaintext",limit:"all"}).then(function(e){var t=lunr(function(){var t=this;this.ref("uuid"),this.field("plaintext"),this.field("title"),e.forEach(function(e){t.add(e)},this)});return{posts:e,idx:t}}).catch(function(e){console.error(e)}))}var searchInput=document.querySelector(".modal-search__input"),searchBtn=document.querySelector(".modal-search__btn"),searchResultHeader=document.querySelector(".search-results__header"),searchResult=document.querySelector(".search-results__container");function searchPosts(n){searchResult.innerHTML="",builtIdx.then(function(e){var t=e.idx.search(n);1<t.length?searchResultHeader.textContent="".concat(t.length," Results"):0!==t.length?searchResultHeader.textContent="".concat(t.length," Result"):searchResultHeader.textContent="No results",t.forEach(function(a){e.posts.filter(function(e){if(e.uuid===a.ref){var t=e.published_at.substring(8,10),n=e.published_at.substring(0,4),r=["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(e.published_at.substring(5,7),10)-1],o="".concat(t," ").concat(r," ").concat(n);searchResult.innerHTML+='<article class="search-results__item"><p class="search-results__date">'.concat(o,'</p>\n          <a class="search-results__link" href="').concat(e.url,'">').concat(e.title,"</a></article>")}})})})}searchBtn.addEventListener("click",function(){""===searchInput.value?(searchResultHeader.textContent="Enter a search term",searchResult.innerHTML=""):searchPosts(searchInput.value)}),searchInput.addEventListener("keyup",function(e){""===searchInput.value?(searchResultHeader.textContent="Enter a search term",searchResult.innerHTML=""):13===e.keyCode&&searchPosts(searchInput.value)}),searchInput.addEventListener("focus",function(e){e.target.value=""});
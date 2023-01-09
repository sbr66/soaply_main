window.addEventListener("load", function () {
  /********** Elements Clone For Mobile*********/
  const mobileMenus = document.querySelector(".mobile-menus");
  // const navs = document.querySelector(".nav-lists").cloneNode(true);
  // const info = document.querySelector(".info").cloneNode(true);

  // mobileMenus.appendChild(navs);
  // mobileMenus.appendChild(info);

  /********** Change Menu Link Between Main and Sub pages*********/
  // 1. 웹주소에서 'index'포함 여부를 파악한다.
  // 2. 포함이 되었을 경우 navs li a의 href 는 #
  // 3. 포함이 안되었을 경우 navs li a의 주소를 해당 페이지 주소로 변경
  // 4. 주의할 점은 각 링크가 두 개씩 존재한다는 것.

  const pgadr = window.location.href;
  const homeLink = this.document.querySelectorAll(".home-link");
  const shopLink = this.document.querySelectorAll(".shop-link");
  const galLink = this.document.querySelectorAll(".gal-link");

  // console.log(pgadr.includes("shop"));
  if (pgadr.includes("index")) {
    homeLink.forEach((item) => {
      item.setAttribute("href", "#");
    });
    shopLink.forEach((item) => {
      item.setAttribute("href", "#");
    });
    galLink.forEach((item) => {
      item.setAttribute("href", "#");
    });
  } else {
    homeLink.forEach((item) => {
      item.setAttribute("href", "/main_project/index.html");
    });
    shopLink.forEach((item) => {
      item.setAttribute("href", "/main_project/pages/shop.html");
    });
    galLink.forEach((item) => {
      item.setAttribute("href", "/main_project/pages/gallery.html");
    });
  }

  /********** Mobile Menu Toggle *********/
  const mobileBtn = document.querySelector(".mobile-btn");

  toggleMobileBtn = (e) => {
    const target = e.currentTarget;
    const menuHeight = mobileMenus.scrollHeight; //scrollheight : 지정 대상의 높이값을 읽어준다.
    target.classList.toggle("active");

    if (target.classList.contains("active")) {
      target.classList.remove("not-active");
      mobileMenus.style.height = menuHeight + "px"; //`${menuHeight}px`
    } else {
      target.classList.add("not-active");
      mobileMenus.style.height = 0;
    }
  };
  mobileBtn.addEventListener("click", toggleMobileBtn);
});

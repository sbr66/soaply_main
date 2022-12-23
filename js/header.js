window.addEventListener("load", function () {
  /********** Elements Clone For Mobile*********/
  const mobileMenus = document.querySelector(".mobile-menus");
  const navs = document.querySelector(".nav-lists").cloneNode(true);
  const info = document.querySelector(".info").cloneNode(true);

  mobileMenus.appendChild(navs);
  mobileMenus.appendChild(info);

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

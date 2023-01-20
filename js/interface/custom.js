/********** Fit Insta Image Height *********/
const instaImgHeight = document.querySelector("#h").scrollHeight;
document.querySelector("#fh").style.height = instaImgHeight + "px";

window.addEventListener("resize", () => {
  const instaImgHeight = document.querySelector("#h").scrollHeight;
  document.querySelector("#fh").style.height = instaImgHeight + "px";
});

window.addEventListener("load", function () {
  //********** Scrollreveal Effect *********/
  const sr = ScrollReveal({
    reset: false,
  });

  sr.reveal(".wrapper", { duration: 1000 });
  sr.reveal(".landing-text-box", {
    duration: 1000,
    origin: "right",
    distance: "80px",
  });
  sr.reveal(".meet-text-box, .swiper, .products, .review-frame", {
    duration: 1000,
    origin: "bottom",
    distance: "40px",
  });
  sr.reveal(".meet-wrapper img, .feature, .product-frame, .review-frame", {
    duration: 1000,
    origin: "bottom",
    distance: "40px",
    interval: 300,
  });
});

/********** Swiper Slider Effect *********/
const swiper = new Swiper(".swiper", {
  loop: true, // 슬라이더 무한 반복
  navigation: {
    //네비게이션 인디케이터
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    //슬라이더 인디케이터
    el: ".swiper-pagination",
    clickable: true,
  },
});

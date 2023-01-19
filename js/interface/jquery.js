$(document).ready(function () {
  //do something...
}); // not recommended...

$(function () {
  // Navigation Moving to Target Section
  $(document).ajaxComplete(function () {
    // 비동기 데이터가 완전히 로딩된 후에 실행
    $(".nav-lists li").on("click", function (e) {
      e.preventDefault(); // a태그에 적용된 기본 기능 제거(클릭이벤트)
      const targetIdx = $(this).index();
      //console.log(targetIdx);
      //console.log($(".nav-target").eq(0));
      const pagePosition = $(".nav-target").eq(targetIdx).offset().top;
      console.log($(".nav-lists li"));
      $("html, body").animate({ scrollTop: pagePosition - 50 }, 100);
    });
  });
}); // recommended...

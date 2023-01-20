$(function () {
  const gridBox = $(".grid");

  // 1. 변수 선언
  let initCount = 3; // 초기에 뿌려질 데이터 갯수
  let addCount = 0; // 특정 동작(클릭)시 추가될 데이터 갯수
  let allData = []; // 전체 데이터 요소가 들어갈 초기 공간
  const galPgadr = window.location.href;
  if (galPgadr.includes("gallery")) {
    initCount = 3;
  } else {
    initCount = 9;
  }

  $(".grid").masonry({
    // options
    itemSelector: ".grid-item",
    columnWidth: ".grid-sizer",
  });

  // 2. 데이터 요청 후 초기 기능함수(initGalData) 실행
  $.getJSON("/main_backend/model/get_products.php?qnt=all", initGalData);

  // 3. 초기 기능함수 작성
  function initGalData(data) {
    allData = data; // 변수 입력 후 함수(getGalleryData) 전달
    getGalleryData(); // allData 지역 변수를 getGalleryData에서 사용하기 위해 사용될 getGalleryData함수를 작성하여 연결한다.
    // 4. 로드 모어 클릭 함수 선언
    $(".load-more button").on("click", getGalleryData);
  }

  const getGalleryData = () => {
    //console.log(data);
    let items = [];
    // 5. 받아온 전체 데이터 요소 중 0번째 인덱스에서 초기 카운트(initCount)만큼 잘라서 저장
    let slicedData = allData.slice(addCount, addCount + initCount);
    $.each(slicedData, function (i, item) {
      const galleryItems = `
                <div class="grid-item">
                  <a href="/main_project/pages/details.html?idx=${item.pro_idx}">
                  <img src="/main_project/images/products/${item.pro_img}" alt="" />
                  <span class="overlay">
                    <em class="common-btn">제품보기</em>
                  </span>
                  </a>
                </div>
            `;
      items.push($(galleryItems).get(0));
      //gridBox.innerHTML += galleryItems;
    });
    $(".grid").append(items);
    $(".grid").imagesLoaded(function () {
      $(".grid").masonry("appended", items);
    });

    addCount += slicedData.length; // addCount = addCount+slicedData.length

    if (addCount === allData.length) {
      $(".load-more").hide();
    }
  };
});

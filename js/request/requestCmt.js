const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const isCheck = document.getElementsByName("cmt_star");
const url = document.location.href;
const urlIndex = Number(url.split("=")[1]);
// console.log(isCheck);
//console.log(`p_idx: ${urlIndex}`);

// 상품평 작성
cmtBtn.addEventListener("click", async () => {
  let seleted = false;
  // 입력창 작성 체크 (아무것도 입력 안하고 입력 버튼 누를시 경고창)
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요.");
    cmtInputBox.focus();
    return;
  }

  // 별점 작성 체크
  for (let radio of isCheck) {
    if (radio.checked) {
      seleted = true;
    }
  }

  if (!seleted) {
    const isInput = confirm(
      "별점 평가가 없으면 한개가 입력됩니다. \n입력하시겠습니까?"
    );
    if (!isInput) {
      return;
    }
  }

  // 입력창 작성 체크 끝 : 위 부분이 완료 되면 다음 코드로 진행
  //   formdata 참조 : https://ko.javascript.info/formdata
  const formData = new FormData(document.querySelector(".comment-form > form"));
  await fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=post_cmt`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      //console.log(res);
      //status = res.status;
      return res.json();
    })
    .then((resData) => {
      // console.log(resData);
      alert(resData.msg);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

const cmtWrapper = document.querySelector(".comment-wrapper");
const listCount = document.querySelector(".comment-info strong");

// Get Comments
const getCmtList = async () => {
  await fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=get_cmt`
  )
    .then((res) => res.json())
    .then((lists) => {
      // console.log(lists);
      if (lists.msg) {
        // 상품평이 없을 때
        cmtWrapper.innerHTML = `<p class="no-list">${lists.msg}</p>`;
        return;
      }
      // console.log(lists);
      listCount.textContent = lists.length;
      let listsElmt;
      lists.map((list, idx) => {
        if (list.user_id === "guest") {
          listsElmt = `<div class="comment-list">
            <div class="list-info">
              <p>${list.user_id} |</p>
              <em>${list.cmt_reg} |</em>
              <div class="star-lists"></div>
            </div>
            <div class="list-content" id="list-${idx}">
              <p>
                ${list.cmt_cont}
              </p>
            </div>
          </div>`;
        } else {
          if (list.user_id === list.session_id) {
            listsElmt = `           
              <div class="comment-list">
                <div class="list-info">
                  <p>${list.user_id} |</p>
                  <em>${list.cmt_reg} |</em>
                  <button type="button" class="cmt-update">수정하기</button> |
                  <div class="star-lists"></div>
                </div>
                <div class="list-content" id="list-${idx}">
                  <p>
                    ${list.cmt_cont}
                  </p>
                </div>
              </div>
            `;
          } else {
            listsElmt = `<div class="comment-list">
            <div class="list-info">
              <p>${list.user_id} | </p>
              <em>${list.cmt_reg} | </em>
              <div class="star-lists"></div>
            </div>
            <div class="list-content" id="list-${idx}">
              <p>
                ${list.cmt_cont}
              </p>
            </div>
          </div>`;
          }
        }
        cmtWrapper.innerHTML += listsElmt;
      });

      updateCmt(lists); // 수정하기 기능 분리 호출
      getRating(lists); // 별점 출력 함수 호출
    })
    .catch((err) => console.log(err));
};

getCmtList();

// 별점 출력 함수 선언
function getRating(star) {
  // console.log(star); // lists
  let starArr = [];
  const starLists = document.querySelectorAll(".star-lists");
  // console.log(star.rating); // 여러개 제이슨 요소이기 때문에 읽히지 않음 : undefind
  star.forEach((num) => {
    // console.log(num.rating);
    starArr.push(num.rating);
  });
  // console.log(starArr);

  starLists.forEach((elm, i) => {
    // console.log(starArr[i]);
    const negativeNo = 5 - starArr[i];
    for (let j = 0; j < starArr[i]; j++) {
      elm.innerHTML += '<i class="ri-star-fill"></i>';
    }
    for (let k = 0; k < negativeNo; k++) {
      elm.innerHTML += '<i class="ri-star-line"></i>';
    }
  });
}

// 수정하기 기능 함수 선언
function updateCmt(cmtObjs) {
  console.log(cmtObjs);
  const cmtUpBtns = document.querySelectorAll("button.cmt-update");
  // console.log(cmtUpBtns);
  if (cmtObjs.length !== 0 && cmtUpBtns) {
    cmtUpBtns.forEach((btn) => {
      //console.log(btn);
      btn.addEventListener("click", function () {
        // console.log(this);
        // 노드 추적은 공백(엔터)을 포함한다.
        const changeInput = this.parentNode.nextSibling.nextSibling;
        const thisIdx = changeInput.getAttribute("id").split("-")[1];
        //console.log(thisIdx);
        // console.log(changeInput);

        this.classList.toggle("active");
        if (btn.classList.contains("active")) {
          this.textContent = "취소하기";
          changeInput.innerHTML = `
            <form onsubmit="return false;" class="update-form update-form-${thisIdx}">
              <input type="text" name="update_cont" value="${cmtObjs[thisIdx].cmt_cont}">
              <div class="rating">
                <div class="stars">
                  <input type="radio" name="cmt_star" id="up-star1" value="5" class="val-5"/>
                    <label for="up-star1">
                      <i class="ri-star-line"></i>
                      <i class="ri-star-fill"></i>
                    </label>
                    <input type="radio" name="cmt_star" id="up-star2" value="4" class="val-4"/>
                    <label for="up-star2">
                      <i class="ri-star-line"></i>
                      <i class="ri-star-fill"></i>
                    </label>
                    <input type="radio" name="cmt_star" id="up-star3" value="3" class="val-3"/>
                    <label for="up-star3">
                      <i class="ri-star-line"></i>
                      <i class="ri-star-fill"></i>
                    </label>
                    <input type="radio" name="cmt_star" id="up-star4" value="2" class="val-2"/>
                    <label for="up-star4">
                      <i class="ri-star-line"></i>
                      <i class="ri-star-fill"></i>
                    </label>
                    <input type="radio" name="cmt_star" id="up-star5" value="1" class="val-1"/>
                    <label for="up-star5">
                      <i class="ri-star-line"></i>
                      <i class="ri-star-fill"></i>
                    </label>
                </div>
              </div>
              <button type="submit">수정입력</button>
            </form>
          `;

          // 기존 입력된 별점 가져오기
          const upRadioNum = document.querySelector(
            `.update-form-${thisIdx} input[type="radio"].val-${cmtObjs[thisIdx].rating}`
          );
          console.log(upRadioNum);
          upRadioNum.checked = true;

          const udSubmitBtn = document.querySelector(
            `.update-form-${thisIdx} button`
          );

          udSubmitBtn.addEventListener("click", async function () {
            const formData = new FormData(
              document.querySelector(`.update-form-${thisIdx}`)
            );
            await fetch(
              `/main_backend/model/cmt_ctrl.php?cmt_idx=${cmtObjs[thisIdx].cmt_idx}&req_sign=patch_cmt`,
              {
                method: "PATCH",
                body: formData,
              }
            )
              .then((res) => {
                //console.log(res);
                //status = res.status;
                return res.json();
              })
              .then((resData) => {
                alert(resData.msg);
                location.reload();
                // console.log(resData);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        } else {
          this.textContent = "수정하기";
          changeInput.innerHTML = `
            <p>${cmtObjs[thisIdx].cmt_cont}</p>
          `;
        }
      });
    });
  } else {
  }
}

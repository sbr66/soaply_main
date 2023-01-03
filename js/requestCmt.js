const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const url = document.location.href;
const urlIndex = Number(url.split("=")[1]);
console.log(`p_idx: ${urlIndex}`);

// 상품평 작성
cmtBtn.addEventListener("click", async () => {
  // 입력창 작성 체크 (아무것도 입력 안하고 입력 버튼 누를시 경고창)
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요.");
    cmtInputBox.focus();
    return;
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
      alert(resData.msg);
      // console.log(resData);
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
              <p>${list.user_id}</p>
              <em>${list.cmt_reg}</em>
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
                  <button type="button" class="cmt-update">수정하기</button>
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
              <p>${list.user_id}</p>
              <em>${list.cmt_reg}</em>
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
      // 수정하기 기능 분리 선언
      updateCmt(lists);
    })
    .catch((err) => console.log(err));
};

getCmtList();

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
              <button type="submit">수정입력</button>
            </form>
          `;

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
                //console.log(resData);
                location.reload();
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

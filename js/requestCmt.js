const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const url = document.location.href;
const urlIndex = Number(url.split("=")[1]);
console.log(`p_idx: ${urlIndex}`);

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
      lists.map((list) => {
        if (list.user_id === list.session_id) {
          listsElmt = `
            <form onsubmit="return false">
              <div class="comment-list">
                <div class="list-info">
                  <p>${list.user_id} |</p>
                  <em>${list.cmt_reg} |</em>
                  <button type="submit" class="cmt-update">수정하기</button>
                </div>
                <div class="list-content">
                  <p>
                    ${list.cmt_cont}
                  </p>
                </div>
              </div>
            </form>
            `;
        } else {
          listsElmt = `<div class="comment-list">
            <div class="list-info">
              <p>${list.user_id}</p>
              <em>${list.cmt_reg}</em>
            </div>
            <div class="list-content">
              <p>
                ${list.cmt_cont}
              </p>
            </div>
          </div>`;
        }
        cmtWrapper.innerHTML += listsElmt;
      });
    })
    .catch((err) => console.log(err));
};

getCmtList();

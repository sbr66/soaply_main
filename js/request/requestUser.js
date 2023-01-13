window.addEventListener("load", function () {
  const userLists = document.querySelector(".user-lists");

  const getUserLists = async () => {
    await this.fetch("/main_backend/model/user_ctrl.php?req_sign=get_user")
      .then((response) => response.json())
      .then((user) => {
        // console.log(user);
        let userListEl;
        user.map((item, i) => {
          userListEl = `
          <li>
            <form onsubmit="return false;" class="update-form-${i}">
              <span class="num">${item.user_idx}</span>
              <span class="id">${item.user_id}</span>
              <span class="name">${item.user_name}</span>
              <span class="lvl">
                <input type="text" value="${item.user_lvl}" name="lvl"/>
              </span>
              <span class="updt">
                <button type="submit">수정</button>
              </span>
              <span class="del">
                <button type="submit">삭제</button>
              </span>
            </form>
          </li>
        `;
          userLists.innerHTML += userListEl;
        });
        updateUser(user); // updateUser함수 호출
        deleteUser(user); // deleteUser함수 호출
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUserLists();

  function updateUser(data) {
    // updateUser 함수 선언
    // console.log(data);
    const updtBtns = document.querySelectorAll(".updt button");
    // console.log(updtBtns);

    updtBtns.forEach((btn, i) => {
      btn.addEventListener("click", async function () {
        // console.log(data[i].user_idx);
        const formData = new FormData(
          document.querySelector(`.update-form-${i}`)
        );
        await fetch(
          `/main_backend/model/user_ctrl.php?req_sign=patch_user&user_idx=${data[i].user_idx}`,
          {
            method: "PATCH",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((updt) => {
            alert(updt.msg);
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }

  function deleteUser(data) {
    const delBtns = document.querySelectorAll(".del button");
    // console.log(delBtns);

    delBtns.forEach((btn, i) => {
      btn.addEventListener("click", async function () {
        // console.log(data[i].user_idx);
        await fetch(
          `/main_backend/model/user_ctrl.php?req_sign=del_user&user_idx=${data[i].user_idx}`
        )
          .then((res) => res.json())
          .then((del) => {
            // console.log(del);
            alert(del.msg);
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }
});

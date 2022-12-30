window.addEventListener("load", function () {
  const userIcon = document.querySelectorAll(".user");
  // console.log(userIcon); // 2개 배열 요소
  const adminIcon = document.querySelectorAll(".admin");

  this.fetch("/main_backend/etc/check_sign.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.userid, data.user_idx);
      if (data.userid === "guest") {
        adminIcon.forEach((item) => {
          item.style.display = "none";
        });
        userIcon.forEach((item) => {
          item.innerHTML = `<a href="/main_project/pages/sign-in.html">
          <i class="ri-user-3-fill"></i>
        </a>`;
        });
        //   userIcon.innerHTML = `<a href="/main_project/pages/sign-in.html">
        //   <i class="ri-user-3-fill"></i>
        // </a>`;
      } else {
        adminIcon.forEach((item) => {
          item.style.display = "flex";
        });
        userIcon.forEach((item) => {
          item.innerHTML = `<button class="signout">${data.userid} | <a href="#">Logout</a></button>`;
        });
        // userIcon.innerHTML = `<button class="signout">${data.userid} | <a href="#">Logout</a></button>`;
      }

      const signoutBtn = document.querySelector(".signout a");

      if (signoutBtn) {
        signoutBtn.addEventListener("click", (e) => {
          e.preventDefault(); // 로그아웃하면 주소값 끝에 #이 붙으면서 details 페이지 사진들 사라짐 -> preventDefault()로 signoutBtn(a 태그)의 디폴트 속성 지움(href="#" 지움)
          this.fetch("/main_backend/model/register.php?q=signout")
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              this.alert("로그아웃 되었습니다.");
              this.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // const signoutBtn = document.querySelector("#so");

  // signoutBtn.addEventListener("click", () => {
  //   this.fetch("/main_backend/model/register.php?q=signout")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // });
});

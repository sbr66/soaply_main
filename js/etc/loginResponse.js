window.addEventListener("load", function () {
  async function checkSign() {
    const userIcon = document.querySelectorAll(".user");
    const adminIcon = document.querySelectorAll(".admin");
    const cart = document.querySelectorAll(".cart");
    this.fetch("/main_backend/etc/check_sign.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const cartItemEl = `<a href="/main_project/pages/cart.html"><i class="ri-shopping-cart-line"></i><em>(${data.cart_count})</em></a>`;

        if (data.userid === "guest") {
          // 로그인 하지 않았을때
          adminIcon.forEach((item) => {
            item.style.display = "none";
          }); // admin icon 가림
          userIcon.forEach((item) => {
            // 사용자 정보 없는 유저 아이콘
            item.innerHTML = `<a href="/main_project/pages/sign-in.html">
          <i class="ri-user-3-fill"></i>
        </a>`;
          });
          //   userIcon.innerHTML = `<a href="/main_project/pages/sign-in.html">
          //   <i class="ri-user-3-fill"></i>
          // </a>`;
          cart.forEach((item) => {
            item.innerHTML = cartItemEl;
          }); // 카트 숫자 아이콘
        } else {
          if (data.user_lvl === 1) {
            // 어드민 계정으로 로그인 했을 경우
            adminIcon.forEach((item) => {
              item.style.display = "flex"; // admin icon 보이게
            });
            userIcon.forEach((item) => {
              item.innerHTML = `<button class="signout"><span>${data.userid}</span> &nbsp;| <a href="#">Logout</a></button>`;
            });
            cart.forEach((item) => {
              item.innerHTML = cartItemEl;
            });
          } else {
            // 일반 회원 계정으로 로그인 했을 경우
            adminIcon.forEach((item) => {
              item.style.display = "none"; // admin icon 안보이게
            });
            userIcon.forEach((item) => {
              item.innerHTML = `<button class="signout"><span>${data.userid}</span> &nbsp;| <a href="#">Logout</a></button>`;
            });
            cart.forEach((item) => {
              item.innerHTML = cartItemEl;
            });
          }
        }

        const signoutBtn = document.querySelectorAll(".signout a");

        if (signoutBtn) {
          signoutBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
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
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  this.setTimeout(function () {
    checkSign();
  }, 300);
});

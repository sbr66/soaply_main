const getCartLists = async () => {
  await fetch("/soaply_backend/model/cart_ctrl.php?req_cart=get_cart")
    .then((res) => res.json())
    .then((cartData) => {
      const cartWrapper = document.querySelector(".cart-lists-wrapper");
      console.log(cartData);
      if (!cartData || cartData.length === 0) {
        cartWrapper.innerHTML = `<p class="no-cart">장바구니에 상품이 없습니다.</p>`;
        return;
      }
      let cartPrice;
      cartData.map((list) => {
        cartListEl = `
        <div class="cart-list">
            <div class="cart-frame">
            <div class="cart-image">
                <img src="/soaply/images/products/${list.cart_img}" alt="" />
            </div>
            </div>

            <div class="cart-text">
            <h2 class="item-title">${list.cart_name}</h2>
            <p>${list.cart_desc}</p>
            </div>
            <div class="cart-price">
            <div class="qnts">
                <button class="down">-</button>
                <strong class="count">${list.cart_count}</strong>
                <button class="up">+</button>
            </div>
            <div class="sum">합계 : <em>${list.cart_sum}</em>원</div>
            </div>
            <div class="cart-btns">
            <button class="common-btn remove-cart" id="btn-${list.cart_idx}">상품삭제</button>
            <button class="common-btn">바로구매</button>
            </div>
        </div>
        `;
        cartWrapper.innerHTML += cartListEl;
        cartPrice = list.cart_price;
      });

      const requestCart = () => {
        // 수량 증가 및 합산 가격 출력
        // 1. DOM 객체 선택
        const countBtnUp = document.querySelectorAll(".qnts button.up"); // +, - 버튼
        const countBtnDown = document.querySelectorAll(".qnts button.down"); // +, - 버튼

        const countEl = document.querySelectorAll(".count"); // 카운팅 숫자 요소
        const sumEl = document.querySelectorAll(".sum em"); // 가격 합산 요소

        let count = [];
        countEl.forEach((i) => {
          count.push(Number(i.textContent));
        });

        countBtnUp.forEach((btn, idx) => {
          btn.addEventListener("click", () => {
            count[idx]++;
            console.log(count[idx]);
            countEl[idx].textContent = count[idx];
            // cartCountEl.value = count;
            sumEl[idx].textContent = (count[idx] * cartPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
        });

        countBtnDown.forEach((btn, idx) => {
          btn.addEventListener("click", () => {
            count[idx] <= 1 ? (count[idx] = 1) : count[idx]--;
            countEl[idx].textContent = count[idx];
            // cartCountEl.value = count;
            sumEl[idx].textContent = (count[idx] * cartPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
        });
      };

      requestCart();

      const rmvCartBtn = document.querySelectorAll(".remove-cart");
      rmvCartBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
          const cartIdx = Number(this.getAttribute("id").split("-")[1]);
          fetch(
            `/soaply_backend/model/cart_ctrl.php?req_cart=del_cart&cart_idx=${cartIdx}`
          )
            .then((res) => res.json())
            .then((del) => {
              alert(del.msg);
              location.reload();
            })
            .catch((err) => console.log(err));
        });
      });
    })
    .catch((err) => console.log(err));
};

window.addEventListener("load", getCartLists);

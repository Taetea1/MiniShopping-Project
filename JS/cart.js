const datas = document.querySelector(".itemcart");
const mainwrap = document.querySelector(".mainwrap");
const pricewrap = document.querySelector(".pricewrap");

let cartData = []; //장바구니 데이터

//장바구니 정보 가져오기
const getcartInfo = () => {
  let cartList = JSON.parse(localStorage.getItem("cartInfo")) || [];
  if (cartList.length === 0) {
    mainwrap.innerHTML += `
    <div class="tungbox"><img class="tungimg" src="../image/tung.png" alt="빈이미지" /></div>
  `;
    return [];
  } else {
    let cellprice = 0;
    // 배열을 빼고 넣어주기
    cartData.push(...cartList);
    cartData.map((x, i) => {
      //   datas.innerHTML += `
      //   <div id=id${x.id} class="flexbox">
      //     <div class="imgbox"><img class="itemimg" src="${x.img}" alt="상품이미지" /></div>
      //     <div>${x.name}</div>
      //     <div>${x.price}원</div>
      //     <div>${x.content}</div>
      //     <div class="imgbox"><img id=${x.id} class="iconimg" src="../image/trash.png" alt="삭제아이콘" onclick="removeData(${x.id})" /></div>
      //   </div>
      // `;
      datas.innerHTML += `
      <div id=id${x.id} class="flexbox2">
        <div class="flexbox2-2">
          <div class="imgbox">
            <img class="itemimg" src="${x.img}" alt="상품이미지" />
          </div>
          <div class="textbox">
            <div class="titlebox">
              <div class="name">${x.name}</div>
              <div>${x.content}</div>
            </div>
            <div>${x.price}원</div>
            <div class="amountbox amountbox${x.id}">
              
            </div>
          </div>
        </div>
        <div class="imgbox2">
          <img id=${x.id} class="iconimg" src="../image/trash.png" alt="삭제아이콘" onclick="removeData(${x.id})" />
        </div>
      </div>
    `;
      const amountbox = document.querySelector(`.amountbox${x.id}`);
      if (x.amount <= 1) {
        amountbox.innerHTML = `<button class="minus minus${x.id}" onclick="subCount(${x.id})" disabled>-</button>
        <input class="amount amount${x.id}" type="text" name="amounts" value=${x.amount} size="3">
        <button class="plus" onclick="addCount(${x.id})">+</button>`;
      } else {
        amountbox.innerHTML = `<button class="minus minus${x.id}" onclick="subCount(${x.id})">-</button>
        <input class="amount amount${x.id}" type="text" name="amounts" value=${x.amount} size="3">
        <button class="plus" onclick="addCount(${x.id})">+</button>`;
      }

      cellprice += x.amount * x.price.split(",").join("");
    });
    pricewrap.innerHTML = `
      <div class="pricebox">
        <div class="name">주문 예상 금액</div>
        <div class="totalprice">
          <div>총 상품 가격</div>
          <div>${cellprice.toLocaleString()}원</div>
        </div>
        <button class="buybtn" onclick="checkAlert2()">구매하기</button>
      </div>`;
    mainwrap.innerHTML += `<button class="alldeletebtn" onclick="allDelete()">장바구니 비우기</button>`;
    return cartData;
  }
};

const cartInfo = getcartInfo();

// 전체삭제
const allDelete = () => {
  localStorage.removeItem("cartInfo");
  window.location.reload();
};

// 삭제
const removeData = (id) => {
  // 데이터덮어씌우기
  let leftData = cartData.filter((item) => item.id !== String(id));
  localStorage.setItem("cartInfo", JSON.stringify(leftData));
  let cartLists = JSON.parse(localStorage.getItem("cartInfo"));
  cartData = [];
  cartData.push(...cartLists);
  let div = document.querySelector(`.itemcart > div[id=id${id}]`);
  div.remove();

  window.location.reload();
};

// 장바구니 개수
const cartCount = () => {
  let count = document.querySelector(".count");
  let countbox = document.querySelector(".countbox");
  let cartList = JSON.parse(localStorage.getItem("cartInfo")) || [];
  if (cartList.length === 0) {
    countbox.style.display = "none";
  } else {
    countbox.style.display = "block";
    count.innerHTML = cartList.length;
  }
};
cartCount();

// 더하기 함수
const addCount = (id) => {
  let num = ++document.querySelector(`.amount${id}`).value;
  let cartamount = JSON.parse(localStorage.getItem("cartInfo")) || [];
  let index = cartamount.findIndex((obj) => obj.id === String(id));
  cartamount[index].amount = num;
  localStorage.setItem("cartInfo", JSON.stringify(cartamount));
  cartData = [];
  cartData.push(...cartamount);
  window.location.reload();
};
// 빼기 함수
const subCount = (id) => {
  let num = --document.querySelector(`.amount${id}`).value;

  let cartamount = JSON.parse(localStorage.getItem("cartInfo")) || [];
  let index = cartamount.findIndex((obj) => obj.id === String(id));
  cartamount[index].amount = num;
  localStorage.setItem("cartInfo", JSON.stringify(cartamount));
  cartData = [];
  cartData.push(...cartamount);
  window.location.reload();
};

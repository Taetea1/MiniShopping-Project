// URLSearchParams 객체
// const urlParams = url.searchParams;

// 쿼리스트링에서 첫번째값 리턴
// console.log(urlParams.get("id"));

// 주소받아오기//
let queryString = window.location.search;

//parameter와 value를 분리
let queryParameterValue = new URLSearchParams(queryString);
let [key, value] = "";
for ([key, value] of queryParameterValue) {
  console.log(key, value);
}
// 주소받아오기 끝//

const datas = document.querySelector(".mainwrap");
let data = [];
let cartData = []; //장바구니 데이터
//정보 가져오기
const getInfo = () => {
  let userList = JSON.parse(localStorage.getItem("userInfo"));

  // 배열을 빼고 넣어주기
  data.push(...userList);
  data.map((x, i) => {
    if (x.id === value) {
      datas.innerHTML += `
      <div class="text">
      <div class="imgbox"><img class="img" src="${x.img}" alt="선택된이미지" /></div>
        <div class="flexbox">
        <div class="title">${x.name}</div>
        <button class="btn" onclick="getCart()">장바구니</button>
      </div>
      <div>${x.price}원</div>
      <div>${x.content}</div>
      </div>`;
    }
  });
};
getInfo();

const getCart = () => {
  let cartList = JSON.parse(localStorage.getItem("cartInfo"));

  // 배열을 빼고 넣어주기
  cartData.push(...cartList);
  data.map((x, i) => {
    if (x.id === value) {
      // 데이터 넣기
      let cartInfo = {
        id: x.id,
        img: x.img,
        name: x.name,
        price: x.price,
        content: x.content,
      };
      cartData.push(cartInfo);

      localStorage.setItem("cartInfo", JSON.stringify(cartData));
    }
  });
  window.location.reload();
};

// 장바구니 개수
const cartCount = () => {
  let count = document.querySelector(".count");
  let countbox = document.querySelector(".countbox");
  let cartList = JSON.parse(localStorage.getItem("cartInfo"));
  if (cartList.length === 0) {
    countbox.style.display = "none";
  } else {
    countbox.style.display = "block";
    count.innerHTML = cartList.length;
  }
};
cartCount();

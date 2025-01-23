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
        <button class="btn" onclick="checkAlert()">장바구니</button>
      </div>
      <div>${x.price}원</div>
      <div>${x.content}</div>
      </div>`;
    }
  });
};
getInfo();

const getCart = () => {
  let cartList = JSON.parse(localStorage.getItem("cartInfo")) || [];

  // 배열을 빼고 넣어주기
  cartData.push(...cartList);
  data.map((x) => {
    if (x.id === value) {
      // 이미 있는 아이디인지 체크(filter는 새로운 배열로 반환, some은 true,false 반환)
      const isInCart = cartData.some((item) => item.id === x.id);
      if (!isInCart) {
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
        window.location.reload();
      }
    }
  });
};
//담을건지 확인
const checkAlert = () => {
  Swal.fire({
    title: "장바구니",
    text: "장바구니에 담을까요??",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네",
    cancelButtonText: "아니요",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "이미 담긴 상품입니다!",
        text: "장바구니에서 확인해주세요",
        icon: "success",
      });
      getCart();
    }
  });
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

// 주소받아오기 시작//
let queryString = window.location.search;

//parameter와 value를 분리
let queryParameterValue = new URLSearchParams(queryString);
let [key, value] = "";
let getvalue = "";
for ([key, value] of queryParameterValue) {
  getvalue = value;
}
// 주소받아오기 끝//

const datas = document.querySelector(".main-wrap");
let data = []; //등록된 데이터
let cartData = []; //장바구니 데이터

//정보 가져오기
const getInfo = () => {
  let userList = JSON.parse(localStorage.getItem("userInfo"));

  // 배열을 빼고 넣어주기
  data.push(...userList);
  data.map((x) => {
    if (x.id === getvalue) {
      datas.innerHTML += `
      <div class="text2">
        <div class="imgbox2"><img class="img2" src="${x.img}" alt="선택된이미지" /></div>
          <div class="flexbox2">
            <div class="title2">${x.name}</div>
            <div class="content">${x.content}</div>
            <div class="price">${x.price}원</div>
            <hr>
            <div class="fontchange">이 상품은 내일 도착, 무료배송 내일(화) 2/4 도착 보장(3시간 18분 내 주문 시 / 서울⋅경기 기준) 무료배송</div>
            <div>
            <button class="btn2" onclick="checkAlert()">장바구니</button>
            <button class="btn2" onclick="readyalert('구매하기')">구매하기</button>
            </div>
          </div>
      </div>`;
    }
  });
};
getInfo();

// 장바구니 정보
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
          amount: 1,
        };
        cartData.push(cartInfo);

        localStorage.setItem("cartInfo", JSON.stringify(cartData));
        Swal.fire({
          title: "장바구니에 담겼습니다!",
          text: "장바구니에서 확인해주세요",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        // 장바구니에 이미 존재하는 경우
        let cartList2 = JSON.parse(localStorage.getItem("cartInfo")) || [];
        let index = cartList2.findIndex((obj) => obj.id === `${value}`);

        // 최대수량 55보다 작으면 실행
        if (cartList2[index].amount < 55) {
          cartList2[index].amount++;

          localStorage.setItem(`cartInfo`, JSON.stringify(cartList2));
          Swal.fire({
            title: "장바구니에 담겼습니다!",
            text: "장바구니에서 확인해주세요",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "최대수량을 넘겼습니다!",
            text: "장바구니에서 확인해주세요",
            icon: "error",
          });
        }
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
      getCart();
    }
  });
};

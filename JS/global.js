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

// 준비중 함수
const readyalert = () => {
  Swal.fire({
    icon: "info",
    title: "로그인기능은 준비중입니다.",
  });
};

// 구매 함수
const checkAlert2 = () => {
  Swal.fire({
    title: "구매",
    text: "구매하시겠습니까??",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "네",
    cancelButtonText: "아니요",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "구매했습니다!",
        text: "사실 구매 기능은 아직 없습니다.",
        icon: "success",
      });
    }
  });
};

// 풋터 삽입
fetch("footer.html")
  .then((response) => response.text())
  .then((footdata) => {
    document.getElementById("footer-container").innerHTML = footdata;
  })
  .catch((error) => console.error("Error fetching footer:", error)); // 에러 처리

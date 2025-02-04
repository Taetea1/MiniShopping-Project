// 장바구니에 담긴 개수 표시
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
const readyalert = (text) => {
  Swal.fire({
    icon: "info",
    title: `${text}기능은 준비중입니다.`,
  });
};

// 풋터 삽입
fetch("footer.html")
  .then((response) => response.text())
  .then((footdata) => {
    document.getElementById("footer-container").innerHTML = footdata;
  })
  .catch((error) => console.error("Error fetching footer:", error)); // 에러 처리

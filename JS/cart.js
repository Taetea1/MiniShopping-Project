const datas = document.querySelector(".mainwrap");
let cartData = []; //장바구니 데이터

//장바구니 정보 가져오기
const getcartInfo = () => {
  let cartList = JSON.parse(localStorage.getItem("cartInfo")) || [];
  if (cartList.length === 0) {
    datas.innerHTML += `
    <div class="tungbox"><img class="tungimg" src="../image/tung.png" alt="빈이미지" /></div>
  `;
    return [];
  } else {
    // 배열을 빼고 넣어주기
    cartData.push(...cartList);
    cartData.map((x, i) => {
      datas.innerHTML += `
      <div id=id${x.id} class="flexbox">
        <div class="imgbox"><img class="itemimg" src="${x.img}" alt="상품이미지" /></div>
        <div>${x.name}</div>        
        <div>${x.price}원</div>
        <div>${x.content}</div>
        <div class="imgbox"><img id=${x.id} class="iconimg" src="../image/trash.png" alt="삭제아이콘" onclick="removeData(${x.id})" /></div>
      </div>
    `;
    });
    datas.innerHTML += `<button class="alldeletebtn" onclick="allDelete()">장바구니 비우기</button>`;
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
  let div = document.querySelector(`.mainwrap > div[id=id${id}]`);
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

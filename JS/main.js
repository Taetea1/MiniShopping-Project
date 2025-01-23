const datas = document.querySelector(".main-wrap");
const menu = document.querySelector(".menu");
let data = [];

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
//사용자 정보 가져오기
const getUserInfo = () => {
  let userList = JSON.parse(localStorage.getItem("userInfo"));
  if (userList.length === 0) {
    datas.innerHTML += `
    <div class="tungbox"><img class="tungimg" src="../image/tung.png" alt="빈이미지" /></div>
  `;
    return [];
  } else {
    // 배열을 빼고 넣어주기
    data.push(...userList);
    data.map((x, i) => {
      menu.innerHTML += `
      <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
        <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>

        <div class="textbox">
          <div class="textflex">
            <div class="test3${x.id}">${x.name}</div>        
            <div class="test2${x.id}">${x.price}</div>
          </div>
            <div class="happy happy${x.id}"><img class="happyimg" src="../image/favoritebin.png" alt="좋아요" onclick="checkFavorite(${x.id})" /></div>
        </div>
      </div>

    `;
    });
    return data;
  }
};

const userInfo = getUserInfo();

// 좋아요
const checkFavorite = (id) => {
  const heart = document.querySelector(`.happy${id}`);
  heart.innerHTML = `<img class="happyimg" src="../image/favorite.png" alt="좋아요" onclick="checkFavoriteBin(${id})" />`;
};
const checkFavoriteBin = (id) => {
  const heart = document.querySelector(`.happy${id}`);
  heart.innerHTML = `<img class="happyimg" src="../image/favoritebin.png" alt="좋아요" onclick="checkFavorite(${id})" />`;
};

// 각 페이지의 상세페이지(쿼리사용)
const moveDetailPage = (id) => {
  const url = new URL(`http://127.0.0.1:5500/page/itemDetail.html?id=${id}`);
  window.location.href = `${url}`;
};

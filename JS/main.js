const idd = document.querySelector(".idd");
const idd_value = document.querySelector(".idd_value");
const namee = document.querySelector(".namee");
const namee_value = document.querySelector(".namee_value");
const price = document.querySelector(".price");
const price_value = document.querySelector(".price_value");
const content = document.querySelector(".content");
const content_value = document.querySelector(".content_value");

const btn = document.querySelector(".btn");
const datas = document.querySelector(".main-wrap");
const input = document.querySelector(".input-wrap");

// 이미지
const img = [
  "../image/냉장고.png",
  "../image/밥솥.png",
  "../image/세탁기.png",
  "../image/소파.png",
  "../image/의자.png",
  "../image/책상.png",
];

const menu = document.querySelector(".menu");
let data = [];

//사용자 정보 가져오기
const getUserInfo = () => {
  let userList = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userList);
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

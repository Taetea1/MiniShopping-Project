const datas = document.querySelector(".main-wrap");
const menu = document.querySelector(".menu");
let data = [];

//정보 가져오기
const getUserInfo = () => {
  let userList = JSON.parse(localStorage.getItem("userInfo")) || [];

  if (userList.length === 0) {
    datas.innerHTML = `
    <div class="tungbox">
      <div class="tungcontent">
        <div class="tungtext">장바구니에 담은 상품이 없습니다.</div>
        <div class="tungimg"><img src="../image/producttung.png" alt="빈이미지" /></div>
      </div>
    </div>
  `;
    return [];
  } else {
    // 배열을 빼고 넣어주기
    data.push(...userList);
    data.map((x, i) => {
      if (x.heart === false) {
        menu.innerHTML += `
        <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
          <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>
          <div class="textbox">
            <div class="textflex">
              <div class="testname testname${x.id}">${x.name}</div>        
              <div class="testprice${x.id}">${x.price}원</div>
            </div>
              <div class="happy happy${x.id}"><img class="happyimg" src="../image/favoritebin.png" alt="안좋아요" onclick="checkFavorite(event,${x.id})" /></div>
          </div>
        </div>
  
      `;
      } else {
        menu.innerHTML += `
        <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
          <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>
          <div class="textbox">
            <div class="textflex">
              <div class="testname testname${x.id}">${x.name}</div>        
              <div class="testprice${x.id}">${x.price}</div>
            </div>
              <div class="happy happy${x.id}"><img class="happyimg" src="../image/favorite.png" alt="좋아요" onclick="checkFavoriteBin(event,${x.id})" /></div>
          </div>
        </div>
  
      `;
      }
    });
    return data;
  }
};

const userInfo = getUserInfo();

// 좋아요
const checkFavorite = (event, id) => {
  // 이벤트 전파를 막음
  event.stopPropagation();
  const heart = document.querySelector(`.happy${id}`);
  heart.innerHTML = `<img class="happyimg" src="../image/favorite.png" alt="좋아요" onclick="checkFavoriteBin(event,${id})" />`;

  let cList = JSON.parse(localStorage.getItem("userInfo"));
  let index = cList.findIndex((obj) => obj.id === `${id}`);
  cList[index].heart = true;

  localStorage.setItem(`userInfo`, JSON.stringify(cList));
  data = [];
  data.push(...cList);
};
const checkFavoriteBin = (event, id) => {
  // 이벤트 전파를 막음
  event.stopPropagation();
  const heart = document.querySelector(`.happy${id}`);
  heart.innerHTML = `<img class="happyimg" src="../image/favoritebin.png" alt="안좋아요" onclick="checkFavorite(event,${id})" />`;
  let cList = JSON.parse(localStorage.getItem("userInfo"));
  let index = cList.findIndex((obj) => obj.id === `${id}`);
  cList[index].heart = false;

  localStorage.setItem(`userInfo`, JSON.stringify(cList));
  data = [];
  data.push(...cList);
};

// 각 페이지의 상세페이지(쿼리사용)
const moveDetailPage = (id) => {
  const url = new URL(`http://127.0.0.1:5500/page/itemDetail.html?id=${id}`);
  window.location.href = `${url}`;
};

// nav 클릭시 변경 함수
const changeType = (type) => {
  // 활성화된 메뉴
  let nowactive = document.querySelector(".checked");
  nowactive.classList.remove("checked");
  let nextactive = document.querySelector(`.${type}`);
  nextactive.classList.add("checked");

  // menu 초기화
  menu.innerHTML = "";
  if (type === "all") {
    data.map((x, i) => {
      if (x.heart === false) {
        menu.innerHTML += `
        <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
          <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>
          <div class="textbox">
            <div class="textflex">
              <div class="testname testname${x.id}">${x.name}</div>        
              <div class="testprice${x.id}">${x.price}원</div>
            </div>
              <div class="happy happy${x.id}"><img class="happyimg" src="../image/favoritebin.png" alt="안좋아요" onclick="checkFavorite(event,${x.id})" /></div>
          </div>
        </div>
  
      `;
      } else {
        menu.innerHTML += `
        <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
          <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>
          <div class="textbox">
            <div class="textflex">
              <div class="testname testname${x.id}">${x.name}</div>        
              <div class="testprice${x.id}">${x.price}</div>
            </div>
              <div class="happy happy${x.id}"><img class="happyimg" src="../image/favorite.png" alt="좋아요" onclick="checkFavoriteBin(event,${x.id})" /></div>
          </div>
        </div>
  
      `;
      }
    });
  } else {
    // 데이터 처리
    const selectedCategory = data.filter((category) => category.type === type);
    selectedCategory.map((x) => {
      if (x.heart === false) {
        menu.innerHTML += `
      <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
        <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>
        <div class="textbox">
          <div class="textflex">
            <div class="testname testname${x.id}">${x.name}</div>        
            <div class="testprice${x.id}">${x.price}원</div>
          </div>
            <div class="happy happy${x.id}"><img class="happyimg" src="../image/favoritebin.png" alt="안좋아요" onclick="checkFavorite(event,${x.id})" /></div>
        </div>
      </div>

    `;
      } else {
        menu.innerHTML += `
      <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
        <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>
        <div class="textbox">
          <div class="textflex">
            <div class="testname testname${x.id}">${x.name}</div>        
            <div class="testprice${x.id}">${x.price}</div>
          </div>
            <div class="happy happy${x.id}"><img class="happyimg" src="../image/favorite.png" alt="좋아요" onclick="checkFavoriteBin(event,${x.id})" /></div>
        </div>
      </div>

    `;
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Top 버튼 특정 스크롤 높이에서만 보이기
  window.addEventListener("scroll", function () {
    const topBtn = document.getElementById("top-btn");
    if (window.scrollY > 500) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });

  // Top 버튼 클릭 시 페이지 상단으로 이동
  const topBtn = document.getElementById("top-btn");
  topBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// 스크롤시 카테고리메뉴 fix
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("on");
    navbar.classList.add("fix");
    header.classList.remove("shadow");
  } else {
    navbar.classList.remove("on");
    navbar.classList.remove("fix");
    header.classList.add("shadow");
  }
});

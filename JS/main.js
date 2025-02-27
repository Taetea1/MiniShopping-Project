const datas = document.querySelector(".main-wrap");
const menu = document.querySelector(".menu");
let data = [];
let datalength;
let type = "all";
let heartimg;
// 한페이지에 보여줄 컨텐츠 개수
const conCount = 10;

// 보여줄 페이지네이션 개수
const PAGE = 4;

// 총페이지개수
let totalPage;

// 현재페이지
let nowPage = 1;
let first = 1;
let last = PAGE;
let pageGroup;

// 좋아요에 따라 상품 넣기
const inputMenu = () => {
  menu.innerHTML = "";

  data.map((x, i) => {
    if (i < nowPage * conCount && i >= (nowPage - 1) * conCount) {
      menu.innerHTML += `
      <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
        <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>
        <div class="textbox">
          <div class="textflex">
            <div class="testname testname${x.id}">${x.name}</div>        
            <div class="testprice testprice${x.id}">${x.price}원</div>
          </div>
            <div class="happy happy${x.id}"><img class="happyimg happyimg${x.id}" src="" alt="" onclick="checkFavorite(event,${x.id})" /></div>
        </div>
      </div>`;

      heartimg = document.querySelector(`.happyimg${x.id}`);

      if (x.heart === false) {
        heartimg.src = "../image/favoritebin.png";
        heartimg.alt = "안좋아요";
      } else {
        heartimg.src = "../image/favorite.png";
        heartimg.alt = "좋아요";
      }
    }
  });
};

const inputCateMenu = (types) => {
  menu.innerHTML = "";
  // 데이터 처리
  const selectedCategory = data.filter((category) => category.type === types);
  datalength = selectedCategory.length;
  selectedCategory.map((x, i) => {
    if (i < nowPage * conCount && i >= (nowPage - 1) * conCount) {
      menu.innerHTML += `
      <div id=id${x.id} class="box" onclick="moveDetailPage(${x.id})">
        <div class="imgwrap"><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></div>
        <div class="textbox">
          <div class="textflex">
            <div class="testname testname${x.id}">${x.name}</div>        
            <div class="testprice testprice${x.id}">${x.price}원</div>
          </div>
            <div class="happy happy${x.id}"><img class="happyimg happyimg${x.id}" src="" alt="" onclick="checkFavorite(event,${x.id})" /></div>
        </div>
      </div>`;

      heartimg = document.querySelector(`.happyimg${x.id}`);

      if (x.heart === false) {
        heartimg.src = "../image/favoritebin.png";
        heartimg.alt = "안좋아요";
      } else {
        heartimg.src = "../image/favorite.png";
        heartimg.alt = "좋아요";
      }
    }
  });
};

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
    datalength = data.length;
    //상품들 넣어주기
    inputMenu();
  }
};

getUserInfo();

// 페이지 번호 버튼 동적 생성
const numberWrap = document.querySelector(".numberWrap");

const setPageBtn = () => {
  // 화면에 보여질 페이지 그룹
  pageGroup = Math.ceil(nowPage / PAGE);
  totalPage = Math.ceil(datalength / conCount);
  first = (pageGroup - 1) * PAGE + 1;
  last = pageGroup * PAGE;
  if (last > totalPage) {
    last = totalPage;
  }

  numberWrap.innerHTML = "";
  for (let i = first; i <= last; i++) {
    numberWrap.innerHTML += `<span class="number-btn number-btn${i}">${i}</span>`;
    if (i === nowPage) {
      document.querySelector(`.number-btn${i}`).classList.add("active");
    }
  }
  // 버튼 비활성화/활성화
  if (totalPage <= last) {
    document.querySelector(".next-btn").style.display = "none";
    document.querySelector(".next").style.display = "none";
  } else {
    document.querySelector(".next-btn").style.display = "block";
    document.querySelector(".next").style.display = "block";
  }
  if (first <= 1) {
    document.querySelector(".prev-btn").style.display = "none";
    document.querySelector(".prev").style.display = "none";
  } else {
    document.querySelector(".prev-btn").style.display = "block";
    document.querySelector(".prev").style.display = "block";
  }
  // 클릭시 해당 버튼 활성화 표시
  document.querySelectorAll(".number-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      nowPage = btn.innerText;

      document.querySelector(".active").classList.remove("active");
      btn.classList.add("active");
      if (type === "all") {
        inputMenu();
      } else {
        inputCateMenu(type);
      }
    });
  });
};
setPageBtn();
// 뒤
document.querySelector(".next-btn").addEventListener("click", () => {
  if (first + PAGE <= totalPage) {
    nowPage = first + PAGE;
  }
  setPageBtn();
  if (type === "all") {
    inputMenu();
  } else {
    inputCateMenu(type);
  }
});
// 앞
document.querySelector(".prev-btn").addEventListener("click", () => {
  if (first - PAGE > 0) {
    nowPage = first - PAGE;
  }
  setPageBtn();
  if (type === "all") {
    inputMenu();
  } else {
    inputCateMenu(type);
  }
});

// 맨앞/맨뒤
document.querySelector(".prev").addEventListener("click", () => {
  nowPage = 1;
  setPageBtn();
  if (type === "all") {
    inputMenu();
  } else {
    inputCateMenu(type);
  }
});
document.querySelector(".next").addEventListener("click", () => {
  nowPage = totalPage;

  setPageBtn();
  if (type === "all") {
    inputMenu();
  } else {
    inputCateMenu(type);
  }
});

// 좋아요
const checkFavorite = (event, id) => {
  // 이벤트 전파를 막음
  event.stopPropagation();

  heartimg = document.querySelector(`.happyimg${id}`);
  let cList = JSON.parse(localStorage.getItem("userInfo"));
  let index = cList.findIndex((obj) => obj.id === `${id}`);

  if (heartimg.alt === "안좋아요") {
    heartimg.src = `../image/favorite.png`;
    heartimg.alt = "좋아요";
    cList[index].heart = true;
  } else {
    heartimg.src = `../image/favoritebin.png`;
    heartimg.alt = "안좋아요";
    cList[index].heart = false;
  }

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
const changeType = (types) => {
  if (type !== types) {
    // 타입 업데이트
    type = types;

    // 활성화된 메뉴
    let nowactive = document.querySelector(".checked");
    nowactive.classList.remove("checked");
    let nextactive = document.querySelector(`.${types}`);
    nextactive.classList.add("checked");

    // menu 초기화
    menu.innerHTML = "";
    if (types === "all") {
      datalength = data.length;
      // 상품 넣기
      inputMenu();
      setPageBtn();
    } else {
      nowPage = 1;
      first = 1;
      last = PAGE;
      document.querySelectorAll(".number-btn").forEach((btn) => {
        if (btn.innerText === "1") {
          document.querySelector(".active").classList.remove("active");
          btn.classList.add("active");
        }
      });

      inputCateMenu(type);
      setPageBtn();
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Top 버튼 특정 스크롤 높이에서만 보이기
  window.addEventListener("scroll", function () {
    const topBtn = document.getElementById("top-btn");
    if (window.scrollY > 100) {
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
  if (window.scrollY > 300) {
    navbar.classList.add("on");
    navbar.classList.add("fix");
    header.classList.remove("shadow");
  } else {
    navbar.classList.remove("on");
    navbar.classList.remove("fix");
    header.classList.add("shadow");
  }
});

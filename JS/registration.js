let isid = false;
let isprice = false;
let isname = false;
let iscontent = false;
let isbincheck = [0, 0, 0, 0];

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
let img = [];
const bedimg = [
  "../image/글라스타드.png",
  "../image/람네피엘.png",
  "../image/베벨스타드.png",
  "../image/송에산드.png",
  "../image/슬라툼.png",
  "../image/우토케르.png",
  "../image/쿠라.png",
  "../image/타르바.png",
];
const deskimg = [
  "../image/책상1.png",
  "../image/책상2.png",
  "../image/책상3.png",
  "../image/책상4.png",
  "../image/책상5.png",
  "../image/책상6.png",
];
const lightingimg = [
  "../image/조명1.png",
  "../image/조명2.png",
  "../image/조명3.png",
  "../image/조명4.png",
  "../image/조명5.png",
];
const ornamentimg = [
  "../image/룽나레.png",
  "../image/리사토르프.png",
  "../image/베이카.png",
  "../image/쿠기스.png",
  "../image/크나페르.png",
  "../image/피스크보.png",
  "../image/예스탈타.png",
  "../image/이코르네스.png",
];
datas.innerHTML = `
    <table>
    <thead>
      <tr>
        <td>상품이미지</td>
        <td>상품명</td>
        <td>가격</td>
        <td>상세내용</td>
        <td>관리</td>
      </tr>
    </thead>
    <tbody class="tablebody">
    </tbody>
    </table>`;
const tbodys = document.querySelector(".tablebody");
let data = [];

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
//사용자 정보 가져오기
const getUserInfo = () => {
  let userList = JSON.parse(localStorage.getItem("userInfo"));

  if (userList === null) {
    return [];
  } else {
    // 배열을 빼고 넣어주기
    data.push(...userList);
    data.map((x, i) => {
      tbodys.innerHTML += `
    <tr id=id${x.id}>
      <td><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></td>
      <td class="test3${x.id}">${x.name}</td>
      <td class="test2${x.id}">${x.price}</td>
      <td class="test${x.id}">${x.content}</td>
      <td><div class="flexbtn">
      <button id="${x.id}" class="changebtn" onclick=changeData(${x.id})>수정</button><button class="changebtn" onclick=removeData(${x.id})>삭제</button>
      </div></td>
    </tr>
  `;
    });
    return data;
  }
};

const userInfo = getUserInfo();

// 사용자가 입력한 정보 확인

const checkId = () => {
  checkBin(idd, 0);
  let countid = data.filter((word) => word.id === idd.value);

  if (countid.length !== 0) {
    isid = true;
  } else {
    isid = false;
  }
  if (isid === true) {
    idd_value.textContent = "이미 존재하는 아이디입니다.";
    btn.disabled = true; //비활성화
    isbincheck[0] = 0;
  } else {
    idd_value.textContent = "";
    isbincheck[0] = 1;
  }
  check();
};
const checkName = () => {
  checkBin(namee, 1);
  check();
};
const checkPrice = () => {
  checkBin(price, 2);
  check();
};
const checkContent = () => {
  checkBin(content, 3);
  check();
};

// 버튼 비활성화
const check = () => {
  let bincheck = isbincheck.filter((x, i) => x === 1);
  if (bincheck.length === 4) {
    btn.disabled = false;
  } else {
    btn.disabled = true; //비활성화
  }
};
// 빈값인지 확인
const checkBin = (type, index) => {
  if (type.value.trim().length !== 0) {
    isbincheck[index] = 1;
  } else {
    isbincheck[index] = 0;
  }
};

// 타입 드롭다운버튼
let types = "";
function getType() {
  types = document.getElementById("types").value;
}

btn.addEventListener("click", () => {
  if (
    isid === false &&
    isname === false &&
    isprice === false &&
    iscontent === false
  ) {
    img = [];
    if (types === "bed") {
      img.push(...bedimg);
    } else if (types === "lighting") {
      img.push(...lightingimg);
    } else if (types === "desk") {
      img.push(...deskimg);
    } else if (types === "ornament") {
      img.push(...ornamentimg);
    }
    console.log(img);
    // 데이터 넣기
    let userInfo1 = {
      id: idd.value,
      img: img[Math.floor(Math.random() * img.length)],
      name: namee.value,
      price: Number(price.value).toLocaleString(),
      content: content.value,
      heart: false,
      type: types,
    };
    data.push(userInfo1);

    localStorage.setItem("userInfo", JSON.stringify(data));
    tbodys.innerHTML += `
    <tr id=id${data[data.length - 1].id}>
    <td><div class="imgbox"><img class="imgs" src="${
      data[data.length - 1].img
    }" alt="상품이미지" /></div></td>
    <td class="test3${data[data.length - 1].id}">${
      data[data.length - 1].name
    }</td>
      <td class="test2${data[data.length - 1].id}">${
      data[data.length - 1].price
    }</td>
      <td class="test${data[data.length - 1].id}">${
      data[data.length - 1].content
    }</td>
      <td><div class="flexbtn">
      <button id="${
        data[data.length - 1].id
      }" class="changebtn" onclick=changeData(${
      data[data.length - 1].id
    })>수정</button><button class="changebtn" onclick=removeData(${
      data[data.length - 1].id
    })>삭제</button>
    </div></td>
    </tr>`;
    // 초기화
    idd.value = "";
    namee.value = "";
    price.value = "";
    content.value = "";
    isbincheck.fill(0);
    btn.disabled = true;
  }
}); //수정버튼

//수정
let ischangecar = false;
let ischangeage = false;
let ischangename = false;
const changeData = (id) => {
  const inputtest3 = document.querySelector(`.test3${id}`);
  const inputtest2 = document.querySelector(`.test2${id}`);
  const inputtest = document.querySelector(`.test${id}`);
  let btnsss = document.getElementById(`${id}`);
  if (btnsss.innerText === "수정") {
    btnsss.innerText = "수정완료";
    inputtest3.innerHTML = `
    <input class="c c3${id}" oninput=checkChangename(${id}) value="${inputtest3.innerText}" />`;
    inputtest2.innerHTML = `
    <input type=number oninput="changePrice(${id})" class="c c2${id}" value="${inputtest2.innerText.replace(
      /,/g,
      ""
    )}" />
    <div class="changecar changecar2${id}"></div>`;
    inputtest.innerHTML = `
    <input class="c c${id}" oninput=checkChangeContent(${id}) value="${inputtest.innerText}"/>
    <div class="changecar changecar${id}"></div>`;
  } else if (
    btnsss.innerText === "수정완료" &&
    ischangecar === false &&
    ischangeage === false &&
    ischangename === false
  ) {
    btnsss.innerText = "수정";

    //직접변경
    let changecar = JSON.parse(localStorage.getItem("userInfo"));

    // 나중에 만들어줘야 각각을 알 수 있음
    let c3 = document.querySelector(`.c3${id}`);
    let c2 = document.querySelector(`.c2${id}`);
    let c = document.querySelector(`.c${id}`);
    // 객체의 인덱스 찾기
    let index = changecar.findIndex((obj) => obj.id === `${id}`);
    changecar[index].name = c3.value;
    changecar[index].price = c2.value;
    changecar[index].content = c.value;
    localStorage.setItem(`userInfo`, JSON.stringify(changecar));

    // 바뀐값 전역변수에 넣어주기
    let userL = JSON.parse(localStorage.getItem("userInfo"));
    data = [];
    data.push(...userL);

    inputtest3.innerHTML = `<td class="test3${id}">${data[index].name}</td>`;
    inputtest2.innerHTML = `<td class="test2${id}">${Number(
      data[index].price
    ).toLocaleString()}</td>`;
    inputtest.innerHTML = `<td class="test${id}">${data[index].content}</td>`;
  }
};

const changedisable = (id) => {
  let bbb = document.getElementById(`${id}`);
  if (
    ischangeage === false &&
    ischangecar === false &&
    ischangename === false
  ) {
    bbb.disabled = false;
  } else {
    bbb.disabled = true;
  }
};

// 수정할때 검사할 함수들
const checkChangename = (id) => {
  let nameinput = document.querySelector(`.c3${id}`);
  let b3 = document.getElementById(`${id}`);

  if (nameinput.value.length <= 0) {
    ischangename = true;
    b3.disabled = true; //비활성화
  } else {
    ischangename = false;
  }

  changedisable(id);
};

const changePrice = (id) => {
  const ageEle = document.querySelector(`.changecar2${id}`);
  let b2 = document.getElementById(`${id}`);
  let ageinput = document.querySelector(`.c2${id}`);
  if (ageinput.value.length === 0) {
    ageEle.textContent = "";
    ischangeage = true;
    b2.disabled = true; //비활성화
  } else {
    ageEle.textContent = "";
    ischangeage = false;
  }

  changedisable(id);
};

const checkChangeContent = (id) => {
  let b1 = document.getElementById(`${id}`);
  let carinput = document.querySelector(`.c${id}`);
  const carEle = document.querySelector(`.changecar${id}`);
  if (carinput.value.length === 0) {
    carEle.textContent = "";
    ischangecar = true;
    b1.disabled = true; //비활성화
  } else {
    carEle.textContent = "";
    ischangecar = false;
  }
  changedisable(id);
};

// 삭제
const removeData = (id) => {
  // 데이터덮어씌우기
  let removebtn = document.getElementById(`${id}`);
  let leftData = data.filter((item) => item.id !== String(id));
  localStorage.setItem("userInfo", JSON.stringify(leftData));
  let userLists = JSON.parse(localStorage.getItem("userInfo"));
  data = [];
  data.push(...userLists);
  if (!removebtn) {
    tbodys.innerHTML = "";

    data.map((x, i) => {
      tbodys.innerHTML += `
    <tr>
      <td><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></td>
      <td>${x.name}</td>
      <td>${x.price}</td>
      <td class="test${x.id}">${x.content}</td>
      <td><div class="flexbtn"><button id="${x.id}" class="changebtn" onclick=changeData(${x.id})>수정</button><button class="changebtn" onclick=removeData(${x.id})>삭제</button></div></td>
    </tr>
  `;
    });
  } else {
    let tr = document.querySelector(`.tablebody > tr[id=id${id}]`);
    tr.remove();
  }
};

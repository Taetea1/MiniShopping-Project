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
  "../image/조명6.png",
  "../image/조명7.png",
  "../image/조명8.png",
  "../image/조명9.png",
  "../image/조명10.png",
  "../image/조명11.png",
  "../image/조명12.png",
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
      <td class="testname${x.id}">${x.name}</td>
      <td class="testprice${x.id}">${x.price}</td>
      <td class="testcontent${x.id}">${x.content}</td>
      <td><div class="flexbtn">
      <button id="re${x.id}" class="changebtn" onclick=changeData(${x.id})>수정</button><button class="changebtn" onclick=removeData(${x.id})>삭제</button>
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

// 저장버튼 누르면 실행
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
    <td class="testname${data[data.length - 1].id}">${
      data[data.length - 1].name
    }</td>
      <td class="testprice${data[data.length - 1].id}">${
      data[data.length - 1].price
    }</td>
      <td class="testcontent${data[data.length - 1].id}">${
      data[data.length - 1].content
    }</td>
      <td><div class="flexbtn">
      <button id="re${
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
  const inputtestname = document.querySelector(`.testname${id}`);
  const inputtestprice = document.querySelector(`.testprice${id}`);
  const inputtestcontent = document.querySelector(`.testcontent${id}`);
  let btnsss = document.getElementById(`re${id}`);

  if (btnsss.innerText.trim() === "수정") {
    btnsss.innerText = "수정완료";
    inputtestname.innerHTML = `
    <input class="c channame${id}" oninput="checkChangename(${id})" value="${inputtestname.innerText}" />`;
    inputtestprice.innerHTML = `
    <input type="number" oninput="changePrice(${id})" class="c chanprice${id}" value="${inputtestprice.innerText.replace(
      /,/g,
      ""
    )}" />
    <div class="changecar changecar2${id}"></div>`;
    inputtestcontent.innerHTML = `
    <input class="c chancontent${id}" oninput="checkChangeContent(${id})" value="${inputtestcontent.innerText}"/>
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
    let channame = document.querySelector(`.channame${id}`);
    let chanprice = document.querySelector(`.chanprice${id}`);
    let chancontent = document.querySelector(`.chancontent${id}`);
    // 객체의 인덱스 찾기
    let index = changecar.findIndex((obj) => obj.id === `${id}`);
    changecar[index].name = channame.value;
    changecar[index].price = String(Number(chanprice.value).toLocaleString());
    changecar[index].content = chancontent.value;
    localStorage.setItem(`userInfo`, JSON.stringify(changecar));

    // 바뀐값 전역변수에 넣어주기
    let userL = JSON.parse(localStorage.getItem("userInfo"));
    data = [];
    data.push(...userL);

    // 등록칸에서 수정된 아이템이 장바구니에 있다면 수정
    let cartli = JSON.parse(localStorage.getItem("cartInfo")) || [];
    let index2 = cartli.findIndex((item) => item.id === String(id));
    if (index2 >= 0) {
      cartli[index2].name = channame.value;
      cartli[index2].price = String(Number(chanprice.value).toLocaleString());
      cartli[index2].content = chancontent.value;
      localStorage.setItem("cartInfo", JSON.stringify(cartli));
    }

    inputtestname.innerHTML = `<td class="testname${id}">${data[index].name}</td>`;
    inputtestprice.innerHTML = `<td class="testprice${id}">${data[index].price}</td>`;
    inputtestcontent.innerHTML = `<td class="testcontent${id}">${data[index].content}</td>`;
  }
};

// 버튼 활성화/비활성화
const changedisable = (id) => {
  let bbb = document.getElementById(`re${id}`);
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
  let nameinput = document.querySelector(`.channame${id}`);
  let b3 = document.getElementById(`re${id}`);

  if (nameinput.value.length <= 0) {
    ischangename = true;
    b3.disabled = true; //비활성화
  } else {
    ischangename = false;
  }

  changedisable(id);
};

// 바뀐 가격 조건 확인
const changePrice = (id) => {
  const ageEle = document.querySelector(`.changecar2${id}`);
  let b2 = document.getElementById(`re${id}`);
  let ageinput = document.querySelector(`.chanprice${id}`);
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

// 바뀐 내용 조건 확인
const checkChangeContent = (id) => {
  let b1 = document.getElementById(`re${id}`);
  let carinput = document.querySelector(`.chancontent${id}`);
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
  let removebtn = document.getElementById(`re${id}`);
  let leftData = data.filter((item) => item.id !== String(id));
  localStorage.setItem("userInfo", JSON.stringify(leftData));

  // 등록칸에서 삭제된 아이템이 장바구니에 있다면 삭제
  let cartdata = [];
  let cartlist = JSON.parse(localStorage.getItem("cartInfo")) || [];
  cartdata.push(...cartlist);
  let leftcartData = cartdata.filter((item) => item.id !== String(id));
  localStorage.setItem("cartInfo", JSON.stringify(leftcartData));

  let userLists = JSON.parse(localStorage.getItem("userInfo"));
  data = [];
  data.push(...userLists);
  if (!removebtn) {
    tbodys.innerHTML = "";

    data.map((x, i) => {
      tbodys.innerHTML += `
    <tr>
      <td><div class="imgbox"><img class="imgs" src="${x.img}" alt="상품이미지" /></div></td>
      <td class="testname${x.id}">${x.name}</td>
      <td class="testprice${x.id}">${x.price}</td>
      <td class="testcontent${x.id}">${x.content}</td>
      <td><div class="flexbtn"><button id="re${x.id}" class="changebtn" onclick=changeData(${x.id})>수정</button><button class="changebtn" onclick=removeData(${x.id})>삭제</button></div></td>
    </tr>
  `;
    });
  } else {
    let tr = document.querySelector(`.tablebody > tr[id=id${id}]`);
    tr.remove();
  }
  cartCount();
};

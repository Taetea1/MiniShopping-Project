const datas = document.querySelector(".itemcart");
const mainwrap = document.querySelector(".main-wrap");
const pricewrap = document.querySelector(".pricewrap");

let cartData = []; //장바구니 데이터

//장바구니 정보 가져오기
const getcartInfo = () => {
  let cartList = JSON.parse(localStorage.getItem("cartInfo")) || [];
  if (cartList.length === 0) {
    mainwrap.innerHTML += `
    
    <div class="tungbox">
      <div class="tungcontent">
        <div class="tungtext">장바구니에 담은 상품이 없습니다.</div>
        <div class="tungimg"><img src="../image/carttung.png" alt="빈이미지" /></div>
      </div>
    </div>
  `;
    return [];
  } else {
    let cellprice = 0;
    let eachprice = [];
    // 배열을 빼고 넣어주기
    cartData.push(...cartList);
    cartData.map((x, i) => {
      datas.innerHTML += `
      <div id=id${x.id} class="flexbox2">
        <div class="flexbox2-2">
          <div class="imgbox">
            <img class="itemimg" src="${x.img}" alt="상품이미지" />
          </div>
          <div class="textbox">
            <div class="titlebox">
              <div class="name">${x.name}</div>
              <div>${x.content}</div>
            </div>
            <div class="eachprice${x.id}"></div>
            <div class="amountbox amountbox${x.id}">
              
            </div>
          </div>
        </div>
        <div class="imgbox2">
          <img id=${x.id} class="iconimg" src="../image/trash.png" alt="삭제아이콘" onclick="removeData(${x.id})" />
        </div>
      </div>
    `;
      const amountbox = document.querySelector(`.amountbox${x.id}`);
      if (x.amount <= 1) {
        amountbox.innerHTML = `<button class="minus" onclick="subCount(${x.id})" disabled>-</button>
        <input class="amount amount${x.id}" type="number" name="amounts" value=${x.amount} onkeyup="enterkey(${x.id});" onChange="changeAmount(${x.id})" />
        <button class="plus" onclick="addCount(${x.id})">+</button>
        <div class="abox"><div id="amountinfo${x.id}" class="amountinfo"></div></div>`;
      } else if (x.amount >= 55) {
        amountbox.innerHTML = `<button class="minus" onclick="subCount(${x.id})">-</button>
        <input class="amount amount${x.id}" type="number" name="amounts" value=${x.amount} onkeyup="enterkey(${x.id});" onChange="changeAmount(${x.id})" />
        <button class="plus" onclick="addCount(${x.id})" disabled>+</button>
        <div class="abox"><div id="amountinfo${x.id}" class="amountinfo"></div></div>`;
      } else {
        amountbox.innerHTML = `<button class="minus" onclick="subCount(${x.id})">-</button>
        <input class="amount amount${x.id}" type="number" name="amounts" value=${x.amount} onkeyup="enterkey(${x.id});" onChange="changeAmount(${x.id})" />
        <button class="plus" onclick="addCount(${x.id})">+</button>
        <div class="abox"><div id="amountinfo${x.id}" class="amountinfo"></div></div>`;
      }
      eachprice.push(x.amount * x.price.split(",").join(""));
      cellprice += x.amount * x.price.split(",").join("");
    });
    cartData.map((item, i) => {
      let each = document.querySelector(`.eachprice${item.id}`);
      each.innerHTML = `${eachprice[i].toLocaleString()}원`;
    });

    pricewrap.innerHTML = `
      <div class="pricebox">
        <div class="name">주문 예상 금액</div>
        <div class="totalprice">
          <div>총 상품 가격</div>
          <div>${cellprice.toLocaleString()}원</div>
        </div>
        <button class="buybtn" onclick="checkAlert2()">구매하기</button>
      </div>`;
    mainwrap.innerHTML += `<button class="alldeletebtn" onclick="allDelete()">장바구니 비우기</button>`;
    return cartData;
  }
};

const cartInfo = getcartInfo();

// input에 숫자가 바뀌면
const changeAmount = (id) => {
  let num = document.querySelector(`.amount${id}`);
  let cartamount = JSON.parse(localStorage.getItem("cartInfo")) || [];
  let index = cartamount.findIndex((obj) => obj.id === String(id));

  if (num.value > 0 && num.value <= 55) {
    cartamount[index].amount = num.value;
    localStorage.setItem("cartInfo", JSON.stringify(cartamount));
    cartData = [];
    cartData.push(...cartamount);
  }
  window.location.reload();
};

// 입력 가능 수량 확인
const enterkey = (id) => {
  let num = document.querySelector(`.amount${id}`);
  let amountinfo = document.getElementById(`amountinfo${id}`);
  let cartamount = JSON.parse(localStorage.getItem("cartInfo")) || [];
  let index = cartamount.findIndex((obj) => obj.id === String(id));
  if (num.value < 0) {
    num.value = cartamount[index].amount;
    amountinfo.innerHTML = ``;
  } else if (num.value > 55) {
    num.value = 55;
    amountinfo.innerHTML = `최대 구매 가능한 수량으로 변경됐습니다.`;
  } else if (num.value < 55) {
    amountinfo.innerHTML = ``;
  }
};

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
  let div = document.querySelector(`.itemcart > div[id=id${id}]`);
  div.remove();

  window.location.reload();
};

// 더하기 함수
const addCount = (id) => {
  let num = ++document.querySelector(`.amount${id}`).value;
  let cartamount = JSON.parse(localStorage.getItem("cartInfo")) || [];
  let index = cartamount.findIndex((obj) => obj.id === String(id));
  cartamount[index].amount = num;
  localStorage.setItem("cartInfo", JSON.stringify(cartamount));
  cartData = [];
  cartData.push(...cartamount);
  window.location.reload();
};

// 빼기 함수
const subCount = (id) => {
  let num = --document.querySelector(`.amount${id}`).value;

  let cartamount = JSON.parse(localStorage.getItem("cartInfo")) || [];
  let index = cartamount.findIndex((obj) => obj.id === String(id));
  cartamount[index].amount = num;
  localStorage.setItem("cartInfo", JSON.stringify(cartamount));
  cartData = [];
  cartData.push(...cartamount);

  window.location.reload();
};

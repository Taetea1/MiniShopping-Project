// 준비중 함수
const readyalert = () => {
  Swal.fire({
    icon: "info",
    title: "로그인기능은 준비중입니다.",
  });
};

// URL에서 해시 값을 추출하고 changeMenu 함수를 호출하는 함수
function handleHashChange() {
  const hash = window.location.hash.slice(1); // '#'을 제외한 해시 값
  if (hash) {
    changeMenu(hash);
  }
}
// URL 해시가 변경될 때마다 실행
window.addEventListener("hashchange", handleHashChange);

## SNUGGLE shopping Web Project

> **목차**
>
> 1. [프로젝트 기술 스택 및 개발 환경](#프로젝트-기술-스택-및-개발-환경)
> 2. [시연 영상](#시연-영상)
> 3. [소개](#소개)
> 4. [주요 기능](#주요-기능)
> 5. [사용된 라이브러리](#사용된-라이브러리)

</br>

## 💻프로젝트 기술 스택 및 개발 환경

### 기술 스택

<img 
src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" />

### 개발 환경

<img src="https://img.shields.io/badge/visual%20studio%20code-%23007ACC.svg?&style=for-the-badge&logo=visual%20studio%20code&logoColor=white" /> <img src="https://img.shields.io/badge/github-%23181717.svg?&style=for-the-badge&logo=github&logoColor=white" />

<br>

## 시연 영상

<br>

## 소개

<img width="1278" alt="Image" src="https://github.com/user-attachments/assets/89f1d396-74e4-4e77-bb7f-338e22d69dac" />

백엔드 없이 로컬스토리지로 데이터를 활용한 쇼핑 웹사이트입니다!

<br>

## 주요 기능

### 관리자페이지

1. **상품 등록**</br>
   ![Image](https://github.com/user-attachments/assets/4243ea28-5585-4e8f-8879-3d6e0e09f20b)
- 실시간으로 id 중복 확인
- 선택한 타입에 맞게 이미지 랜덤 등록
- 사용자가 입력한 데이터가 조건에 맞을 경우 등록 버튼 활성화
- 등록 버튼 클릭시 로컬스토리지에 저장되어 반영</br>

</br>

2. **상품 수정**</br>
 ![Image](https://github.com/user-attachments/assets/2b8a29e7-0cf2-4e58-91f0-dcd9ab5d9507)
- 수정시 해당 id를 통해 원하는 데이터만 수정하여 반영</br>

</br>

3. **상품 삭제**</br>
   ![Image](https://github.com/user-attachments/assets/5339547b-863e-489d-a707-a549075634f5)
- 삭제시 해당 id를 통해 원하는 데이터만 삭제하여 반영
- 만약 해당 상품이 장바구니에 담겨있었다면 장바구니에서도 상품 삭제</br>

</br>

4. **엑셀 다운로드**</br>
  ![Image](https://github.com/user-attachments/assets/c231c9df-53cd-4110-aaea-3dbe196bcb0d)
- 엑셀 다운로드 버튼 클릭시 등록한 데이터들을 엑셀로 다운</br>
  <br>

### 사용자 페이지

1. **메인페이지**</br><br>
   **:one:카테고리 이동 및 좋아요**</br>
   ![Image](https://github.com/user-attachments/assets/0d58af47-3133-43dc-8ef1-11744aac6732)
- 로컬스토리지에서 카테고리에 따라 원하는 데이터 이용</br>
- 하트를 눌러 좋아요 가능</br><br>
  **:two:반응형**</br>
  <img width="1278" alt="Image" src="https://github.com/user-attachments/assets/07bce4ff-a91a-4036-a87b-16ec7fdc0bb4" />
- 스크롤시 top버튼 생성
- top버튼 클릭시 페이지 상단 이동</br>
- 스크롤시 카테고리바를 상단에 고정</br></br>
  **:three:페이지네이션**</br>
  ![Image](https://github.com/user-attachments/assets/875b6bda-30b6-43ca-9dd5-277ac0e39d81)
- 한 페이지에 10개의 콘텐츠와 페이지네이션 4개 보여줌
- '>' 또는 '<' 버튼 클릭시 다음 페이지네이션 그룹의 첫번째 번호로 이동
- '>>' 버튼 클릭시 마지막 페이지네이션 그룹의 마지막 번호로 이동
- '<<' 버튼 클릭시 처음 페이지네이션 그룹의 첫번째 번호로 이동
- 만약 페이지네이션이 첫번째 그룹이라면 '<'와 '<<'버튼 비활성화, 맨 마지막 그룹이라면 '>'와 '>>'버튼 비활성화</br>
  </br>
  <br>

2. **상품 상세 페이지**</br><br>
   **:one:상세페이지 이동 및 장바구니 담기**</br>
   ![Image](https://github.com/user-attachments/assets/a24b067c-bf91-4812-92f2-e11d6db9caac)
- 쿼리를 이용한 주소를 받아와 원하는 정보를 출력한 상세페이지로 이동
- 장바구니 버튼 클릭시 장바구니 로컬스토리지에 해당 데이터 추가
- 장바구니에 없는 새로운 상품 추가시 장바구니 아이콘의 count가 1증가
- 장바구니에 이미 담긴 상품 추가시 장바구니에서 해당 상품의 개수 증가
- 장바구니 아이콘 클릭시 해당 장바구니 페이지로 이동하여 로컬스토리지에서 데이터를 가져와 정보 출력</br>
- 장바구니에서 상품 클릭시 해당 상품의 상세페이지로 이동</br></br>

  **:two:반응형**</br>
   <img width="1278" alt="Image" src="https://github.com/user-attachments/assets/d7fbd71d-8418-4d1d-861c-6fb715b1b5ab" />
- 화면 크기에 따라 요소 재배치</br>

</br></br>

3. **장바구니 페이지**</br>
   **:one:반응형 및 주문 박스 고정**</br>
   <img width="1278" alt="Image" src="https://github.com/user-attachments/assets/2acfcd00-5d9b-4107-ad11-c663eaf9c8fb" />
- 화면 크기에 따라 요소 재배치
- 스크롤시 주문 박스가 상단에 고정<br><br>

  **:two:개수 수정**</br>
![Image](https://github.com/user-attachments/assets/eb7fa539-061c-4d9e-bf97-5b8d85c32b45)
- +, - 버튼 클릭시 수량과 가격에 반영
- 직접 숫자로 작성하여 수량과 가격에 반영
- 직접 작성시 최대 개수는 55개로 제한
- 수량이 1개면 - 버튼 비활성화
  <br><br>

  **:three:장바구니 비우기**</br>
![Image](https://github.com/user-attachments/assets/058a5dc0-f465-40e2-90f0-36096bd80d0c)
- 상품 삭제시 해당 id를 활용하여 장바구니에서 삭제하여 가격과 수량에 반영
- 장바구니 비우기 버튼 클릭시 모든 상품 삭제
  </br>

</br>

## 사용된 라이브러리

### 라이브러리

- [SweetAlert2](https://sweetalert2.github.io/)
  - 모던한 디자인의 알림창을 제공하는 JavaScript 라이브러리

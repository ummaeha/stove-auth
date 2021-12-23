# stove-auth
Authentication Homework

SGS_Devcamp - 인증 개인과제





## ⚠️ 필수 구현 기능

<hr/>

1. 사용자 DB설계
2. 가입, 로그인 페이지
3. 인증서버(API)
4. RDBMS DB 사용( MySQL, PostgreSQL)
5. Password Encryption
6. 유저 관리 페이지(Admin/BackOffice)













## ✔︎ 아키텍쳐

<hr/>

![image](https://user-images.githubusercontent.com/48500209/146796672-780efd97-9a17-4950-bd12-bd221147535f.png)

- 클라이언트와 백엔드 서버의 HTTP통신을 위해 **Axois**를 사용했습니다.
- 가입, 로그인 페이지: Access Token 을 위해 **JWT**를 사용했습니다. 브라우저의 **Localstorage**에 저장했습니다.
- 비밀번호 암호화(Password Encryption)에 **Bcrypt**를 사용했습니다



















### ✔︎ 데이터베이스(MySQL) 설계

<hr/>

- #### users table

| 이름         | 타입        | 특성                                 | 설명                                                         |
| ------------ | ----------- | ------------------------------------ | ------------------------------------------------------------ |
| **id**       | INT         | auto increase, not null, primary key | 사용자의 인덱스번호                                          |
| **email**    | VARCHAR(32) | not null, unique                     | 사용자의 이메일                                              |
| **password** | VARCHAR(65) | not null                             | password를 암호화했을 때, 60자리정도로 일정하게 나와서 VARCHAR(65)로 설정함. |
| **role**     | VARCHAR(32) |                                      | Admin 유저('admin')인지 일반유저('null')'인지                |



- #### SQL문

  ![image](https://user-images.githubusercontent.com/48500209/146956590-ca343f69-7a67-4649-b1b0-880097b43108.png)





















## ✔︎ API설계

<hr/>

#### **POST** /signup

> : 회원가입

- request로 온 email, password 정보를 데이터베이스에 저장 

- 비밀번호 암호화, 기존에 DB에 존재하는 유저인지 판단하는 코드 포함



#### POST /login

> : 로그인

- request: email, password



#### GET /token

> : 회원 인증

- jwt.verify로 token이 회원이 맞는지 판단



#### GET /userlist

> : 관리자페이지 - 회원 목록을 불러옴



#### DELETE /user/:id

> : 유저를 데이터베이스에서 삭제



















### ✔︎ 시나리오

<hr/> 



![IMG_2970](https://user-images.githubusercontent.com/48500209/146956090-cb49f1f1-5b30-4a73-900b-35eee5f9b007.PNG)















## ✔︎ 파일구조

<hr/>

#### 클라이언트 웹

```
📦src
 ┣ 📂apis : 백엔드와의 HTTP통신을 위한 axios 인스턴스 생성
 ┃ ┗ 📜server.js
 ┣ 📂pages 
 ┃ ┣ 📜Afterlogin.js : 로그인 이후 페이지
 ┃ ┣ 📜Login.js : 로그인 페이지
 ┃ ┣ 📜Main.js : 로그인 이전 메인페이지
 ┃ ┣ 📜Manage.js : 관리페이지(Admin유저와 general유저는 삭제버튼 유무의 차이가 있음)
 ┃ ┗ 📜Signup.js : 회원가입 페이지
 ┣ 📂utils
 ┃ ┗ 📜IsLogin.js
 ┣ 📜App.js
 ┣ 📜PrivateRoute.js
 ┣ 📜history.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜reset.css
```



#### 백엔드

```
📦backend
 ┣ 📂config
 ┃ ┣ 📜db.js
 ┃ ┗ 📜env.js : .env파일에 정의된 환경변수 사용을 위한 설정
 ┣ 📂database
 ┃ ┗ 📜inital.sql : 데이터베이스 설정
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜index.js : REST API 기반 서버라우팅 설정
```















## ✔︎ 구현

<hr/>

#### 회원가입

![회원가입](https://user-images.githubusercontent.com/48500209/146965616-8f944783-0355-44da-a873-6740e654c3d8.gif)

(비밀번호가 일치함을 보여주기위해 비밀번호를 가리지 않았습니다)



#### 로그인

: 데이터 베이스에 등록되어있는 정보와 일치하면 로그인이 됩니다.

![내 프로젝트 (3)](https://user-images.githubusercontent.com/48500209/147098218-34c23b6d-b663-45d6-a665-1e957437eb59.gif) 





#### 관리자페이지 - 권한(Admin/General)에 따라 다른 뷰

: Admin유저는 모든 유저에 대한 삭제 권한을 갖고, General유저는 자신의 계정만 삭제할 수 있습니다.

![내 프로젝트 (3) 2](https://user-images.githubusercontent.com/48500209/147098476-621e062f-cae3-4af9-9543-6480b80cb01d.gif)



##### 

#### 관리자페이지 - 유저 삭제

![관리자페이지-유저 삭제](https://user-images.githubusercontent.com/48500209/146965707-1e2e971e-740a-4735-bc6e-614ef1da25b7.gif)













## ✔︎ 어려웠던 점 / 문제 상황

<hr/>

1. HTTP 상태코드
   - **문제**: HTTP 상태코드에 대해서 잘 몰라서 로그인을 시도한 유저가 비밀번호를 틀렸을 때 상태코드를 400번을 주고 클라이언트는 이를 catch문으로 에러로 잡아서 alert로 유저에게 오류메시지를 전달했습니다
   - **해결**: 하지만, 이 때는 통신에는 성공한 것이니 200번대 코드가 나와야 맞다는 것을 알게됐습니다. 또한, response의 msg와 desc필드등의 용도도 잘 모르고 사용했어서 공부할 것 입니다.



2. 인증 서버
   - 처음에 인증이라는 개념 자체가 잘 잡히지 않아서 아키텍쳐 작성에 어려움이 있었습니다.











## ✔︎ TO DO

<hr/>

1. Access Token의 보안상 이슈를 보안해줄 수 있는 Refresh Token 도입
2. 로그아웃기능을 도입해서 Localstorage의 토큰을 삭제
3. IsLogin() 로 토큰의 유효성을 측정하고 PrivateRouter 구현
4. console.log 삭제
5. GITHUB에 남은 .env파일 로그 삭제
6. CSS
7. (Optional) E-Mail 인증 / 비밀번호 찾기 / 캐시

















### ✔︎ 참고할 커멘드

<hr/>

.sql파일 실행하기 : source [경로]

21년도 캡스톤 디자인으로 개발한 "Hyperledger Fabric을 활용한 중고차 거래 시스템"의 웹 클라이언트 파트이다.
(21.01.~21.11.)

Hyperledger Fabric은 private blockchain으로 IBM에서 개발한 Enterprise 목적의 blockchain이다.

Vue.js로 개발한 웹클라이언트 부분에서 Node.js로 작성된 API 서버를 호출하는 방식으로 동작한다.

(개발 캡쳐부분)

이하 개발노트.

--------- 개발 ---------

client/vue_app 프로젝트 생성
> npm install -g @vue/cli
> vue create vue_app
manual -> babel, Router, vuex 선택 -> 모두 enter

bootstrap-vue 설치
> npm install vue bootstrap bootstrap-vue

component CarList.vue 생성 - get all car 결과 반환 예정.

표형태까지 출력하는데 성공.



08.14.
계속 개발 후 npm run serve 오류.
-> npm run serve 상태로 계속해서 개발 진행.

ELIFECYCLE, 'vue-cli-service' error


app.js 와 server.js 두 개로 나눠진 웹 배포 및 node 파일을
/server/server.js 에 하나로 작성하기로 하겠음. 
(+08202021 사실상 controller.js 에 이미 api 호출이 정의되어 있기에
호출할 api 를 controller.js 에 추가하여 사용하여 해결)



08.15.
자꾸 뻗네;;
node 테스트를 윈도우에서 고정값을 전달하고
vue.js 에서 받아서 화면에 출력하게 테스트해서 이식해보자...


분석 확인
app.js 는 AngularJS 실행을 위한 부분.
app.js 의 함수 실행(구성)부분을 server.js 에 포함시키거나
따로 분리하여 실제 함수 실행부분을 작성하는 방법을 사용해야할것 같음.


var const let 차이
vue 에서 node 호출 및 값을 받아오는 과정을 정리
componet 넘어 다니는 경로, port 번호 지정 위치...

NodeJS_REST-API_template
const express = require('express');
const router = express.Router();
module.exports = router;

Create.vue / index.js - addContent
this.$router.push({
        path: "/board/free/"
      });
사용하는 componet 의 method 에 추가하여 
router.post("/add/content", bodyParser(), addContent);
추가되는 /board/free/add/content 형태로 호출하는듯하다.



8.16
출력문 자체가 app.js에 있는 형태이면
AngularJS 모듈이 담긴 app.js 를 무시하고 Vue에 작성하면 바로 불려와질듯 하다.
(맞다면 후술된 분석 문단은 수정필요)
1. IBM/evote의 app.js / network.js 방식으로 수정한다.
2. lln 코드 방식으로 수정한다.


ng~ 형태의 html 태그들을 vue 문법에 맞게 수정.
api 연결을 위한 vue 파일 생성 및 정의 -> /services/api.js | apiServices.js 
import PostsService from "@/services/apiService"; 하여 함수 접근에 사용 가능할것임.

app.js 의 getAllCar 수정하여 CarList.vue 에 함수 동작 작성
(결과 값을 받아와서 화면에 출력하도록 함.)
 


8.19

기존 코드는 node 실행후 지정한 api 주소를 호출시 지정한 함수가 실행되는 원리.
client 의 app.js 를 모두 지우고 server/server.js 안의 
app.use(express.static(path.join(__dirname, '../client'))); 를 지워도 
node 정상 작동 및 api 를 정상적으로 호출한다. 
server 의 server.js 안에 app 이 var 로 선언된 이유가 
client/app.js 에서 angular 사용을 위한 app 재선언을 위해 사용한것.
(코드 진짜 잘짠 코드인듯하다... modules 식 구현에 매우 부합하는 형태...)

pp.use(express.static(path.join(__dirname, '../client'))); 를 활용하여 웹에서만 쓰이는 코드를 
분리하여 구현할수 있을것 같다.


getAllCar 를 실제 Api 호출로 데이터를 가져오는 경우 
[{"Key":"CAR0", "Record":{"maker":"Genesis","model":"G90","price":"40","sellername":"Byun","walletid":"bkw1212"}},
{"Key":"CAR1", "Record":{"maker":"KIA","model":"K9","price":"30","sellername":"Byun","walletid":"bkw1212"}},
{"Key":"CAR2", "Record":{"maker":"Hyundai","model":"Sonata","price":"20","sellername":"Byun","walletid":"bkw1212"}}]
를 반환 받는다.

받아오는 데이터가 key:value 형식이기 때문에 웹에서 Api 호출로 받아오는 이 값마다 
변수를 할당하여 출력 위치를 결정해주면 되는듯 하다.



8.20

api 가 구현되어 있는 상태라고 가정하고 구현을 진행해보기로 했다.
(api 확인을 했으니...?)
데이터를 가져오기 위한 변수 mapping 하는 위치,
vue 에서 api 연결을 위한 부분을 구현하면 될것 같다.

key:value 값의 형태로 데이터를 받아오기 때문에 
vue 에서 key:value 값을 받아오는 방식을 찾아보고 연결만 해주면 간단히(flag..) 끝날듯하다.
(기존 app.js 의 경우 동작 및 호출 등이 이루어지는 부분이 모두 외부 js 에 작성되고
index.html 에는 그저 변수 위치만 할당하고 위치의 변수 값만 유동적으로 뿌려지는 식이었던것 같다.)


npm install axios // node 연동을 위해 vue 프로젝트에서 설치
CarList.vue 에 import apiService from "@/services/apiService"; 추가 및
api 로 받아온 데이터를 출력하는 html 코드부분 작성.
-> 무의미. 아래의 다른 방법으로 해결.


node 코드에 
app.get('/api/hello', (req, res) => {
    res.json({
        state: 200,
        message: 'Hello World'
    })
});
추가 해서 값이 뜨는지 확인하기? 확인 완료

1. vue에서 node 값 넘어오는지
2. component - vue - node - api 호출까지 되는지
-> 아래 Ubuntu 에서 node - vue 간 간단한 통신 확인 참고


아놔 우분투에서 Vue 오류나는거 그냥 권한 문제인듯...?
chmod -R 777 vue-app 으로 해결(된듯하다)


Ubuntu 에서 node - vue 간 간단한 통신 확인
1) vue.config.js 로 node - vue 연결, 
2) App.vue 에 script 구문 추가 
(vue - component CarList.vue 에 추가해도 정상 동작 확인)
(호출 api 를 getAllCar 로 해도 정상 동작 확인)
<script>
import axios from 'axios';

export default {
  name: 'App',
  async created () {
    const { data } = await axios.get('/api/hello');
    console.log(data);
  }
}
</script>
3) api 호출이 정의 되어있는 controller.js 에 테스트 코드 추가
(controller.js가 아닌 server.js 에 추가해도 정상 동작 확인. )
(두 파일간 "app"의 정의 동일(공유) 또한 증명됨)
app.get('/api/hello', (req, res) => {
    res.json({
      state: 200,
      message: 'Hello World'
    })
});
4) 크롬 개발자 도구의 console 에서 정상적으로 결과를 확인할 수 있다.


화면에 출력되는 getAllCar 결과 구문을 확인하면서 표에 넣기..!

화면에 출력 
CarList.vue 만 수정.
{{apiResponse}} 를 사용해서 출력완료.
commit 완료

표에 출력 
getAllCar 함수 결과 중에서 data 부분만 가져와서
각 컬럼에 맞게 들어가도록 데이터를 수정한다.
수정결과를 표에 그냥 넣는다.(자동으로 표 형식에 맞게 들어감.)
끄아아아아ㅏ commit 완료

버튼 눌렀을때만 출력되도록 하는법?
vue.js 전체 구성도 (기능별 분리, view|component 구분...) + 뼈대
상세 서비스 루틴 및 디자인은 구현하면서 붙이기...?
+ Error from chokidar 다시 뜨네... node module 문제인듯한데...
vue.js 를 별개로 repositorie 생성해서 관리하기
client 위치에 vue 프로젝트만 넣기(보류)
vue 외에 나머지 코드 최신화...!
template...
couch db 사진 추가



->중간 개발 정리<-
0. 개념 정리

1) Vue.js
vue 는 화면 출력과 관련된 웹 프레임워크이다.
main.js -> App.vue -> component 순으로 실행된다.
componet는 기능이나 출력 부분을 유지보수가 편하게 나눠놓은것이다.
A componet 안에 B componet 를 호출하는것이 가능하지만 과하면 꼬인다...
(계층도를 그리면서 작업하면 편할것이다.)
componet 는 html 부분인 template, JS 부분인 script, CSS 부분인 style 부분으로 나뉜다.
router 를 통해서 각 접속 경로마다 보여주는 페이지를 바꿀 수 있다. (~/router.js or ~/router/index.js)
axios 를 통해서 node 와 통신이 가능하다.

2) Node.js
JS 코드를 실행할수 있게 해주는 JS runtime 이다.
server.js 는 네트워크 기초 셋팅을 위한 값이 선언되는 곳이다.
기본적으로는 연결된 controller.js, sdk.js 에도 server.js 의 선언들이 적용되지만
var로 인자들이 선언되어 있기에 재선언을 통해 각 파일에서 인자를 재정의 가능하다.
controller.js 는 HLF 의 api (사실상 chaincode) 호출과 관련된 코드들이다.
sdk.js 는 HLF 과의 통신을 위한 부분이 선언되어 있는 부분이다.

+ api 의 경우 서버의 값이나 정보를 직접적으로 변경하지 못하도록 
특정함수들을 통해 간접적으로 데이터에 접근할수 있게 만든 인터페이스이다.
vue 에서의 api 호출은 node 의  controller.js 부분에 있는 값을 호출하고
node 에서의 api 호출은 HLF 의 chaincode 에 선언된 함수를 호출한다.
실제 api 호출이라는 정의에 가까운것은 node 에서의 호출이지만
둘모두 HLF로의 요청을 목적으로 한다는점과 필자가 실무에서 api 호출의 기준을 잘모르는점,
두 호출 모두 api 호출이 아니면 표현이 모호하기에 편의상 api 호출로 모두 표현하였다.


1. Api 사용
vue.config.js 생성 및 코드 작성 (vue - node 연결)
Vue 의 어디서든 script(JS) 부분에서 api 호출이 가능하다
nodejs(/server) 의 controller.js 에 api 호출 구문을 정의할 수 있다.


2. 각 파트 실행방법(각 파트 최상단 경로에서 실행)
Vue 실행
> npm run start 
Node 실행
> node server.js
HLF 실행
-> 서버운용 파일 참고

3. 추가 구현 remind
1) node 를 npm start 로 실행하도록
2) node 실행시 nodemon 를 사용하도록 (코드변화 자동 감지)
3) vue code refactoring 하여 script 부분 적정위치로 분리
4) vue 를 build 하여 node 로 한번에 구동 할 수 있도록
+ X509WalletMixin 를 사용하는 구문이 IBM/evote 의 network.js에 있다. (지갑 관련)



08.22

중간 계획서 수정
8, 17, 20


내용 추가
18 : 각 시스템 구조도 그림 추가 -> 시스템 구성도를 사용하면 될것같음.
(인터페이스 부분 작성이 17 페이지에 되어있음.)


일부 삭제 필요
24


무엇을 했고 왜 했는지 누가 들어도 납득이 가도록
1) 페이지 구현
기존 AngularJS 대신 Vue.js 를 사용하여 차량 정보조회 기능을 구현하였다.
(가능하면 중간 발표전까지 최대한 더 구현해보는걸로... 차량 거래페이지까지 구현)
 - 페이지 구성 및 API 호출을 통한 체인코드 실행 구현

2) Vue.js 사용이유
componet 형태로 부분 구현 및 페이지를 모듈식으로 구현할 수 있다.
Vuex 를 통한 데이터 바인딩이 용이하다.
JS 대비 구현이 용이하다.

3) 기존의 node 부분 코드가 모듈식으로 구현이 잘 되어있기 때문에
client 부분을 Vue.js 로 대체하여 구현하면 된다.


web 부분에서는 기존의 AngularJS 대신 Vue.js framwork 를 사용하여 구현하였다.
Vuex 를 통한 데이터 바인딩이 용이하고,
componet 형태로 부분 구현 및 페이지를 모듈식으로 구현할 수 있다.
또한 별개의 Vue.js 로 동작할 수 있기 때문에
Hyperledger Fabric 의 장점인 module 식 구성에 부합하여
AngularJS 대신 사용하였다.



08.24.

code pen 등에서 웹페이지 template 찾기
페이지 구성 정리 완료하고 틀 만들어두기

넣을 기능, 효과 필요할때마다 계속해서 정리하기



08.26.
자꾸 우분투에서 npm 관련 오류 발생.
기존 virtual box로 프로젝트로 회귀 후 angular 작동 확인.
일단은 다시 vue - node - HLF 연결 확인.
vue 프로젝트를 별개로 git 에 업로드 완료.... 이나 문제 있음. 아래 참고.

저장 경로가 연동이 안된다... 아마 ubuntu와 win10 에 돌아가는 npm 모듈이 달라서 그런듯하다.
vue create client-vue 로 생성 후에
https://github.com/Nshellb/client-vue 를 client 에서 하고
vue 파일이 포함된 src 아래의 파일들과
css 파일이 포함된 public 파일들과
node와 연결하는 vue.config.js 파일을
붙여넣어서 node_modules 가 충돌나지 않도록 
핵심 코드만 붙여넣어서 돌려야 겠다...
아오 진짜 몇시간이냐


윈도우10에서 개발하고 
우분투에서 https://github.com/Nshellb/client-vue 으로 가져와서 



->중간 개발 정리<-
처음 vue 코드 추가시
npm install -g @vue/cli 로 npm 모듈 설치
~/application 에서 vue create client-vue 로 vue 프로젝트 생성 후에
~/application/client 에서 npm install axios 로 node 연결을 위한 axios 설치
~/application/client 에서 https://github.com/Nshellb/client-vue 를 하고
git clone 결과에서 vue 파일이 포함된 src 아래의 파일들과
git clone 결과에서 css 파일이 포함된 public 파일들은 복붙. html 파일은 내용 복붙.
git clone 결과에서 node와 연결하는 vue.config.js 파일을
~/application/client-vue 에 붙여넣어서 node_modules 가 충돌나지 않도록 한다.

vue 프로젝트 추가후 코드 갱신
~/application/client 에서 https://github.com/Nshellb/client-vue 를 하고
git clone 결과에서 vue 파일이 포함된 src 아래의 파일들과
git clone 결과에서 css 파일이 포함된 public 파일들을 
~/application/client-vue 에 붙여넣어서 node_modules 가 충돌나지 않도록 한다.



개발 방향
1. Header / Footer 생성
2. main / 조회 / 거래 / 보험 / 수리 페이지 생성
3. 거래 코드만 1차적으로 거래 페이지에 그냥 때려박기 (Angular 구현 형태처럼...)

1. Header.vue / Footer.vue 생성 및 스케치

2-1. Header.vue 의 menu 에 페이지 항목 추가.
router-link 로 페이지 이동해야 refresh 없이 동작.
(refresh 해도 임시 데이터가 남도록 vuex 활용 / 캐시 활용해야할것임...)
mobile page 에서도 수정.

2-2. ~/router/index.js 에 views 에 생성한 각 메뉴 페이지를 추가.
- 모바일 페이지 로고 클릭시 메인 페이지로 돌아가지 않는 문제
- 모바일 페이지 햄버거 메뉴의 항목 클릭시 페이지 이동후 메뉴가 접히지 않는 문제
- 새로 vue 프로젝트 생성 후에는 src, vue.config.js 만 복붙하자...
- public 의 index.html은 내용 복붙, 그외 디렉토리들은 디렉토리를 통으로 복붙.
- npm install axios

3-1. CarTest.vue 를 만들고 페이지 탭을 별개로 만든다.
기존 Angular에서 구현한 기능을 여기에 구현해두고 필요한 것들을 이곳에 동작시킬것이다.
(Debug Page / Dev Page 처럼)

3-2. Header.vue 의 메인 메뉴 부분에 CarTest 페이지를 추가
~/Router/index.js 에 라우팅 설정.

3-3. CarTest.vue에는 CarList.vue, SearchWallet.vue, CreateCar.vue, .vue 를 component로 넣었다.
-> 재사용 가능한 부분끼리 묶어서 componet 구성.

3-4. /api/getWallet 호출 뜯어보기
http://localhost:8080/api/getWallet?walletid=bkw1212 형태로 호출시 
[{"Name":"Byun", "ID":"bkw1212", "Token":"200"}] 형태로 반환.
API 호출을 하며 query 로 walletid 값을 넘겨야 한다.
(크롬 개발자도구 네트워크 탭에서 확인했음.)

3-5. axios 를 활용한 get 방식의 쿼리 요청
(네트워크에서 다 까지기 때문에 요청을 속이거나 감추는 방법 공부가 필요)
-> 자꾸 페이지 전체가 Refresh 되기 때문에 getAllCar만 클릭으로 조회 되도록 테스트 해보기
getWallet(walletid) {
            axios.get('/api/getWallet?walletid=' + this.walletid)
            .then(response => {
                this.walletid = response;
            })
                // .catch(error => {
                //     alert(error)
                // })
            // api 호출로 가져온 데이터를 임시 공간에 저장
        },




08282021

1. getAllCar 를 클릭으로 실행되게 구현해보자
(2번 호출되며 refresh 되는데 이유를 모르겠음...)
-> store 활용...? action 을 통한 코드 실행으로 제어가 가능하지 않을까...?

2. getWallet 을 클릭식으로 구현해보자.



09032021
1. 버튼을 누를때 refresh 되는 이유
https://devhoma.tistory.com/90
button이 form 태그 안에 있는경우
-> 1) button 의 type 값을 기본 submit 에서 button 으로 변경
-> 2) form 태그를 div 태그로 대체한다.

2. 우분투에서 chokidar / code ELIFECYCLE 
/ vue-client@0.1.0 serve: `vue-cli-service serve` 오류는
public 의 template 관련 오류였다....



09062021
1. 테스트 페이지 구현 (angular 이식)
1) API 호출 중 쿼리를 아예 작성하여 호출하는 방식
axios.get('/api/getWallet?walletid=' + this.walletid)

2) API 호출 중 parameter 값을 mapping 하는 방식
axios.get('/api/getWallet', { // controller.js 의 /api/getWallet 를 호출
		params: { // parameter 호출 구문
		walletid: this.walletid
	}
}
+ 입력 필드 값은 따로 data 변수를 등록할 필요가 없는듯 하다.

2. 표에 받아온값을 출력 
http://localhost:8000/api/getCar?carkey=CAR0 으로 쿼리 요청시 
[{"Model":"G90", "Maker":"Genesis", "Price":"40", "WalletID":"bkw1212", "Sellername":"Byun"}]
-> controller.js 에 선언된 인자 전달 값을 확인하고
    받아온 출력값은 app.js(angular) 에서 확인하고 이식하면 되는듯하다.
    넘겨줄 인자의 값을 mapping 해야하기 때문에 이를 정리해야 할듯하다...(API 문서)



09072021
1. 표 버튼 구현은 button 태그 + button type 으로 구현. (재확인)

2. 버튼 행의 값을 반환하는 방법...?
let allCar = document.getElementById('allCar');
let selectCar = '';
let walletid = '';

for (let i = 1; i < allCar.rows.length; i++) {
                allCar.rows[i].cells[5].onclick = function () {
                    selectCar = allCar.rows[i].cells[0].innerText;
                    walletid = allCar.rows[i].cells[4].innerText;
                    alert(selectCar+"와 "+walletid+"을 선택하셨습니다.");
	}
}



09162021
footer 디자인 다듬기
좌측 메뉴 필터 디자인 다듬기 
좌측 메뉴 필터 브랜드, 가격 필터


상품 목록 페이지 상품 띄우기
즐겨찾기 기능 (별모양) 추가 필요 (장바구니 기능 개선)
상품 목록 페이지 -> 상품 등록 페이지(등록 기능)
상품 목록 페이지 -> 상품 상세 페이지(구매 기능)


좌측 필터 모두 좌측정렬 및 필터 버튼 하나로 통합



09172021

Vue lifecycle
created - 화면이 출력되기 전 단계이기에 태그 접근 불가. 
            API 로 데이터를 불러와서 출력해야하는 경우에 
            코드를 작성하여 데이터를 미리 가져올수있게 한다.
mounted - 화면 출력 후 호출 되기에 태그 접근 가능. 
              대부분의 작업이 이 시점에 수행된다.
              상단바에서 통화를 바꾸는 메뉴바 같은 작업을 여기에 작성.
beforeDestroy - 인스턴스가 제거되기 전에 호출된다.
                    별도의 이벤트 리스너를 작성하는 경우 이곳에 작성.

+ Vue.js 에서는 동작하지 않는 template의 속성들은 
mounted 에 작성하면 정상동작할 가능성이 크다.

http://localhost:8080/api/best-product.json 접속시
~/public/api/best-product.json 데이터 접근이 되는것을 확인할 수 있다.
-> public 디렉토리 아래의 파일 및 항목들은 
접근가능한 형태의 공개 데이터로 처리되는듯하다.

~/src/api/http.js 에는 axios 를 활용한 api 서버와의 라우팅,
구버전 브라우저 호환과 관련한 _method 사용이 정의 되어있다.
사용하는 api 규격에 맞게 수정해서 사용하면 된다.

nextTick을 통해 화면이 그려진뒤 구동하는 작업수행이 가능하다.
(SlideBanner.vue 의 created 코드 참조.)

store 를 활용한 Vuex 작업 (refactoring)
~/store 하위에 세부 디렉토리를 만들고 store 형식 코드 작성 후 
~/store 의 index.js 에 moudules 영역을 만들고 작성했던 store 코드를 등록한다.
기존에 작성했던 자리에(.vue) $store.dispatch 하여 사용하도록 해준다.
(store 에 작업하면서 vuex 에 데이터를 저장하여 다루게 된다.)
([Vue.js] 템플릿을 활용한 Vue.js 개발 - 5. Vuex 참고)
(~/store/index 들 참고)
state : 
mutations : 
actions : 

페이지에 따라서 보여주는 값 변경
~/store/product/index.js setProducts 에서 page 에따라 보여주는 값이 바뀌도록 작성.



09272021
1. 판매 목록을 서버에서 가져온것으로 대체
1) get 으로 상품 Data 받아오기
2) 받아온 데이터 정리 (재가공, 특정배열에 넣거나)
3) 데이터 화면에 출력

+ 담아두기, 필터
(판매목록에서 바로 구매는 재확인겸 해서 상세페이지를 한번 거치도록)

2. 판매목록 페이지 수정
1) ADD TO CART / 상품명 클릭시 상세 페이지로
2) 하트 모양은 찜해두기
3) New 는 다 떼어놔도 될듯..?

3. 판매 목록에 상품 게시 기능 추가
1) 상품 추가 버튼 추가
2) 상품 추가 페이지
- 데이터 형식에 맞는 데이터 입력 
- 버튼으로 최종 등록
3) 등록 이후 최신의 등록이 
가장 맨앞으로 오도록(등록번호 높음을...) page refresh

판매완료 표시 상품 아이디어... 필요...

과정 (설계 numbering 과 무관. 순서만 나열)
1) CarPurchase.vue 에 차량 등록 버튼을 추가
2) CarPurchase.vue 에 추가한 버튼 클릭 method 추가
- path 변경
3) 차량 등록 페이지에 보여줄 componet 생성
- CreateCar.vue 생성
4) path 접속시 보여줄 componet 를 추가하기위해 
router/index.js 에 추가.
5) 차량 등록을 위한 입력 필드 및 저장 버튼 생성
6) 차량 등록시 결과 반환 이후 완료 창을 띄우고 기존 페이지로 돌아감.
(수정 기능 미이식)
저장 버튼 클릭시 트랜젝션 처리 대기 및 완료시 완료 alert 띄우고 확인시 차량 목록페이지로 이동


4. 상세페이지
1) 선택한 항목의 이름을 받아옴 
2) 이름에 해당하는 데이터를 불러와서 화면에 출력

+ 구매 버튼 / 담아두기

5. 구매 진행
1) 상세페이지에서 진행
2) 구매 버튼 누르기
3) 체크박스로 상품설명 확인했음을 동의 (뒷배경 흐리게 새화면)
4) 구매 페이지에서 결제 진행
5) 결제 결과 페이지 - 쿼리 요청 결과를 받아서 구매 성공/실패 화면 출력


데이터는 임의로 만들어서 진행해보자.


10.04.2021.

기존 이어서 구현(10.11.2021. 해결)

1. 판매 목록을 서버에서 가져온것으로 대체
1) api 로 데이터를 받아오는 부분인 products.js 에 
axios 로 getallcar 를 통해 데이터 받는 부분 구현.
http.js 활용.
2) 받아온 데이터를 vuex 로 사용하도록 store 에서 작업.
3) product 에서 가져오는 값을 변경한다.


4. 상세페이지(10.11)

과정 (설계 numbering 과 무관. 순서만 나열)
1) 상품 상세 페이지인 ProductDetail.vue 생성
2) router/index.js 에 ProductDetail 의 router 등록 (일단은 productId라는 상품값 사용.)
3) 상품목록 페이지에 항목들을 띄우도록 먼저 구현하지 않으면 오류 발생.
(상품의 버튼 클릭시 /purchase/detail/:productId 의 항목에따른 값을 보여주도록)
4) 상품 목록 구현이후 router/index.js 값과 Product.vue 의 router-link :to 의 값을 mapping 한다.

CAR key 가 HLF 에 등록되는 차량에 대한 고유 구별 값이라면
게시글에 대한 값은 또 다시 새로 부여하는 것이 필요할듯...?
(동일 차량이 다시 판매 등록이 될수도 있으니...)
혹은 판매중/판매중이 아님을 나타내는 값도 하나 있어야할듯하다.
(이러면 판매되었던 이력들 확인이 곤란할듯...?)


추가 구현

계정 생성 (HLF 네트워크에 지갑등록) + 중복확인
로그인 (입력한 id 값을 통해 체인코드로 계정의 정보를 가져옴
-> 일단은 vuex에 모든 계정 정보를 저장하는식...?
-> 최종적으로는 id 값만 가지고 체인코드로 데이터 값 접근하도록)
(로그인 후 사용자 ID를 vuex 로 저장하여 사용)
- 차량 등록 및 구매시 계정 값을 vuex 에 저장한 로그인 값으로 대체

차량 등록시 등록완료 문구 확인하도록 안내

차량 상세 페이지, 구매 과정, 구매 완료/실패






10.10.2021.
/api/products.json 받아온 결과 (8080)
{ "data": { "products": [ { "image": "https://picsum.photos/720/960/?image=476", "title": "Herschel supply co 25l", "link": "", "price": 75, "badge": "new" }, { "image": "https://picsum.photos/720/960/?image=478", "title": "Denim jacket blue", "link": "", "price": 92.5, "badge": null }, { "image": "https://picsum.photos/720/960/?image=479", "title": "Coach slim easton black", "link": "", "price": 165.9, "badge": null }, { "image": "https://picsum.photos/720/960/?image=480", "title": "Frayed denim shorts", "link": "", "price": 29.5, "badge": "sale" }, { "image": "https://picsum.photos/720/960/?image=476", "title": "Herschel supply co 25l", "link": "", "price": 75, "badge": "new" }, { "image": "https://picsum.photos/720/960/?image=478", "title": "Denim jacket blue", "link": "", "price": 92.5, "badge": null }, { "image": "https://picsum.photos/720/960/?image=479", "title": "Coach slim easton black", "link": "", "price": 165.9, "badge": null }, { "image": "https://picsum.photos/720/960/?image=480", "title": "Frayed denim shorts", "link": "", "price": 29.5, "badge": "sale" }, { "image": "https://picsum.photos/720/960/?image=476", "title": "Herschel supply co 25l", "link": "", "price": 75, "badge": "new" }, { "image": "https://picsum.photos/720/960/?image=478", "title": "Denim jacket blue", "link": "", "price": 92.5, "badge": null }, { "image": "https://picsum.photos/720/960/?image=479", "title": "Coach slim easton black", "link": "", "price": 165.9, "badge": null }, { "image": "https://picsum.photos/720/960/?image=480", "title": "Frayed denim shorts", "link": "", "price": 29.5, "badge": "sale" } ], "total": 24 }, "status": 200, "statusText": "OK", "headers": { "accept-ranges": "bytes", "content-length": "2278", "content-type": "application/json; charset=UTF-8", "date": "Sun, 10 Oct 2021 05:37:14 GMT", "etag": "W/\"8e6-Wc0D//ScHgMgFQpbRZPpR7rmhaQ\"", "x-powered-by": "Express" }, "config": { "transitional": { "silentJSONParsing": true, "forcedJSONParsing": true, "clarifyTimeoutError": false }, "transformRequest": [ null ], "transformResponse": [ null ], "timeout": 0, "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN", "maxContentLength": -1, "maxBodyLength": -1, "headers": { "Accept": "application/json, text/plain, */*" }, "method": "get", "url": "/api/products.json" }, "request": {} }

/api/getAllCar 받아온 결과 (8000)
{ "data": [ { "Key": "CAR0", "Record": { "maker": "Genesis", "model": "G90", "price": "40", "sellername": "Byun", "walletid": "bkw1212" } }, { "Key": "CAR1", "Record": { "maker": "KIA", "model": "K9", "price": "30", "sellername": "Byun", "walletid": "bkw1212" } }, { "Key": "CAR2", "Record": { "maker": "Hyundai", "model": "Sonata", "price": "20", "sellername": "Byun", "walletid": "bkw1212" } } ], "status": 200, "statusText": "OK", "headers": { "content-length": "339", "content-type": "text/html; charset=utf-8", "date": "Sun, 10 Oct 2021 05:39:49 GMT", "etag": "W/\"153-yTeJZ/VSsOMnwmgidcDSp7YyVMA\"", "x-powered-by": "Express" }, "config": { "transitional": { "silentJSONParsing": true, "forcedJSONParsing": true, "clarifyTimeoutError": false }, "transformRequest": [ null ], "transformResponse": [ null ], "timeout": 0, "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN", "maxContentLength": -1, "maxBodyLength": -1, "headers": { "Accept": "application/json, text/plain, */*" }, "method": "get", "url": "/api/getAllCar" }, "request": {} }


action -> mutation 순으로 실행이 되며
vuex log 와 HLF node 에서 값을 호출하고 가져오는것을 확인
(/api/http 를 활용해도 포트 변경없이 pubilc / HLF 를 구분해서 잘 가져왔다.
브라우저에서 호출시에는 포트를 각각 반대로 쓰면 당연히 안됬는데 말이지...)


/api/products.json
data -> products -> 0, 1, 2, ... -> badge, image, ...

/api/getAllCar
data -> 0, 1, 2 -> Key, Record(-> maker, model, ...)


vue extension 에서 Base State -> state -> product -> products 에서 값들 정상 확인






10112021

vuex 바인딩시 computed state 부분도 vue 구조에 맞게 가져와야 한다.
vuex 바인딩 후 출력할 부분 값이 없어도 오류가 나지는 않는다.(img)

router-link 에서 params 를 통해서 값 전달이 가능하다.

상품 세부 페이지에서 productId 값 다시 가져오기.
const productId = String(this.$route.params.productId);






10122021

api로 받아온값을 설마했는데 배열의 key 값으로 접근해야 했다. 
{this.apiResponse[0].maker}


v-for 에서는 이런 작업없이 잘됬던건 반복문으로 풀어냈기 때문인듯한다.


< token error.
public/index.html 경로지정 오류라고 한다...
<!-- Unexpected token '<' error sol. -->
<base href="/" />






10152021

Modal
ProductDetail.vue 에서 [구매하기] 버튼 클릭시
modal 로 지정한 컴포넌트인 ModalView.vue 가 보이도록 
isModalViewed 변수를 할당.

ModalView.vue 에서 보여줄 컴포넌트로는 BuyCar.vue 선택.

남은 추가 구현 기능

사진 업로드 - 아마... node?

로그인 (접속중인 사용자)
- 구매시 사용자 이름으로
- 등록시 사용자 이름으로
- 판매목록에 접속중인 사용자 상품은 등장하지 않도록
- 접속중인 사용자의 차량 정보 불러오기 (추가)

수리내역 조회 버그 수정

디자인 디테일

예외처리

refresh 버그






10202021
setWallet name, id 입력받고 coin 은 def 값 할당.
setWallet 으로 계정 생성후 
~CA 껴야될수도?~
getWallet 으로 로그인
로그인정보는 vuex 에 저장.


1. 로그인 페이지 생성 
1) GetWallet.vue 로그인 페이지 생성
2) router/index.js 에 로그인 페이지 등록
3) Header.vue 에 계정 아이콘 클릭시 로그인 페이지 이동.
Header.vue 에 {{ this.wallet }} 로그인 전에는 Login / 로그인 후에는 계정이름 할당.
Login 되었을때는 router-link 미작동 변경 & wallet name 값 출력.
4) name + id 입력이후 로그인 버튼 클릭
5) 로그인 이후 상단바에 name + coin 출력
(가능하면 추후 cart 처럼 띄우기.)
wallet 정보를 vuex 에 저장하고 가져와서 띄워주기


1. 계정 생성 페이지 생성 
1) SetWallet.vue 계정 생성 페이지 생성
2) router/index.js 에 생성 페이지 등록
3) 로그인 페이지에서 가입 버튼으로 이동하도록 설정.
4) 입력 필드 name, id 입력받고 coin 은 def 값 할당.
id는 중복확인.
(생성이 안되면 dialog 띄워주는식으로 해결될듯.)
각 입력 필드에는 설명이 있어야 할듯...?
5) 최종으로 가입 버튼으로 회원 가입
-> Home 페이지로 이동


+ 스크롤바 커스텀
+ vuex 로 사진 업로드 하면서 비밀번호까지 vuex 로 관리가능하면 해보자...


02242022

로그인 기능은 vue 에서 state 를 활용하여 로그인 상태에 따른 로그인/로그아웃 버튼 변화


갑작스런 체인 코드변경으로 인한 핫픽스 결과까지를 업로드하고 마무리 짓겠다...

변경된 파일 목록
BuyCar.vue
ChargeMoney.vue
CreateCar.vue
PayCar.vue
GetWallet.vue
CountryFilter.vue
SegmentFilter.vue




--------- 생각 및 예제 분석 ---------
IBM/evote 의 public 부분이 build 된 Vue 파일들이 들어가는 부분이다.
(그런데 왜 ~/client/src/에도 vue 관련 파일이 있는가;;)
-> music 의 client 부분 안에 Vue 파일들이 들어가있는 느낌...? 일단 vue 디렉토리랑 대조 필요.
(vue 따로 node 따로 HF 따로 실행해야하는건지...?) -> 현재는 따로실행 08202021



loacal 환경
https://github.com/IBM/evote/blob/master/docs/run-local.md
1. node 를 evote/web-app/server 에서 [ npm start ] 로 실행 (nodemon 활용. package.json 에 선언)
2. vue 를 evote/web-app/client 에서 [ npm run serve ] 로 실행 (vue cli 로 만든 프로젝트 실행하듯...?)
-> hyperledger fabric 의 Car all 항목을 node로 가져오고 Vue 로 띄워보자.



Page 이동 
IBM/evote 실행시 Home / QueryAll / Query by Type / Query by Key / Get Poll Standings 를 통해 이동. 
evote/web-app/client/src/components 에 선언되어 있음. -> router/index.js 참고. 
-> 기존 차량 거래페이지의 get all car 만 출력하는 페이지 작성 후 
    메인페이지에서 차량 거래페이지로 진입하여 get all car 출력하도록 해보자.
    json 파일 형태로 vuex 에 저장하고 넘기는 방식을 해야할지... 데이터 접근방식은 생각해보자.



구성 파일 역할 (vue.config.js 사용으로 수정 필요)
App.vue : 메인 vue 부분.
main.js : vue 프로젝트 구동부.
other.vue files : vue의 componet. 기능이 동작하는 단위 모듈이라고 생각하면 된다.
                   동작을 위한 HF 네트워크 통신을 위한 api 호출이 1차적으로 이곳에서 이루어진다.
services/apiService.js : HF 로의 호출을 위한 함수들이 정의 됨. 
services/api.js : HF 와 연결된 node 의 함수 위치 지정. node 의 port 로 설정한다. (axios 활용)
app.js : node 구동부. HF 와의 실제적인 통신부. chain code 호출등이 이루어지는 곳이다.



Vue - Node - HF 간 통신 과정 (vue.config.js 사용으로 수정 필요)
(main.js ->) App.vue -> (Home.vue -> 다른 component 이동)
-> component 에서 입력 및 호출 -> @/services/apiService 호출
-> @/services/api 호출 -> axios 를 통한 http://localhost:[node port] 으로 HF 호출.
-> node 부분의 server 에서 체인코드 및 HF 네트워크에 접근하여 response.



Angular get all car 를 위한 호출 흐름 (출력 ~ 값 위치) (08162021)
1.  출력위치
~/clinet/index.html
tr ng-repeat="car in allCar" -> v-for 구문으로 수정
car.Key
car.model
car.maker
car.price
car.walletid

2. 버튼 위치
~/clinet/index.html
input id="getAllCar" -> 버튼 id 명
ng-click="getAllCar()" -> 버튼의 click event -> @click 으로 수정

3. 웹페이지 body tag (angualr와 연결)
~/clinet/index.html
body ng-app="application" ng-controller="AppCtrl"
script type="text/javascript" src="../app.js"

4. node 부분 (app.js)
var app = angular.module('application', []);
angular 로 app 이 선언되어 있음.

5-1. getAllCar 선언부 (app.js - $scope)
$scope.getAllCar = function(){
 appFactory.getAllCar(function(data){
 };
}
반복문을 통해 배열 형태로 출력.

5-2. getAllCar 선언부 (app.js - factory)
factory.getAllCar = function(callback){ ~ }

$http.get('/api/getAllCar/') -> /api/getAllCar/ 에서 get 방식으로 데이터를 페이지에 전달
데이터 전송이후 callback 으로 데이터 전송이후 결과를 전달.
/api 경로는 HFN 구동부 내부에 선언되어 있으며 sdk.js 에 
const { FileSystemWallet, Gateway } = require('fabric-network'); 를 통해서 호출한다.

6. server.js
서버 구동부분.
8000 번 포트를 열고 대기중.
getAllCar 함수 호출이 이루어지는 app.js 를 구동하는 상위 노드.
노드의 구성요소들만 포함 되어있으며 기능은 없음.

7. controller.js
/api 에 선언된 함수들을 호출하며 각 parameter 를 mapping 하여 데이터를 송수신하는 부분.
정의한 parameter를 sdk.js 로 송신하여 HFN 내부의 /api 함수들을 실행시킴.
(* /api(api 서버) 는 단순히 input 에 대한 동작만 있기 때문에 output만으로 서버에 접근할수 있으며
이를 통해 부정한 방법의 서버 조작을 막는 역할도 한다.)

8. sdk.js 
실제 HFN 와 송수신이 이루어지는 부분.


--------- 구조도 ---------
*. back end 서버 구동부 (node 서버 설정 값)
music
hyperledger-fabric-stream-music/stream-music-2/application/server/server.js

IBM/evote
evote/web-app/server/src/app.js 

used car
used-car/application/server/server.js


*. hyperledger fabric sdk (node - HLF 연결부)
music
hyperledger-fabric-stream-music/stream-music-2/application/server/sdk.js

IBM/evote
evote/web-app/server/src/fabric/network.js

used car
used-car/application/server/sdk.js


*. HF network 구조도 추정(단어가;;)
music
hyperledger-fabric-stream-music/stream-music-2/application/connection.json
 - sdk.js 에서 접속하는 HF 와의 연결을 위한 json 으로 추정

IBM/evote
evote/web-app/server/local_fabric_connection.json
 - 접속하는 HF 와의 연결을 위한 json 으로 추정 (호출 위치 불명확.)
 - config.json -> network.js 로 호출 추측

used car



*. 웹 페이지 부분
music
client 하위 디렉토리.

IBM/evote
web-app/client/src/App.vue, main.js, componets(d), router(d),
plugins 는 차트를 그리기위한 플러그인 선언부.

used car
client/vue_app (추후 client 로 편입해도 될듯하다.)


*. node 부분
music
application/client/app.js

IBM/evote
server/src/app.js

used car
사실상 music의 app.js 가 AngularJS 만을 위한 파일이므로 무의미

*. server node 부분의 형태는 
music : /server/server.js (node) + /client/app.js (Angualr)
IBM/evote : server/src/app.js
이기 때문에 
/server/server.js 에 하나로 작성하기로 하겠음.
-> Api 호출 구문이 controller.js 에 구현되어있기에 /server/~는 현상 유지
-> Vue.js 에 vue.config.js 작성 및 전역에서 api 호출 가능으로 해결. 

--------- 참고 ---------
Hyperleger Fabric Project - music
https://github.com/hyblekorea/hyperledger-fabric-stream-music/blob/master/stream-music-2/application/connection.json

Hyperleger Fabric + Vue.js Project - IBM/evote
https://github.com/IBM/evote/blob/master/docs/run-local.md

IBM/evote app.js 의 cpp 설명
https://medium.com/@taehyoung46/hyperledger-fabric-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0-e6d346c995ec

@/~ 경로는 vue에서 src를 /로 하는 경로를 나타낸다. (자동으로 path 설정이 되어있다고 생각하면 쉽다.)
ex. @/services/apiService 는 /src/services/apiService 를 나타낸다.
(+ js 파일을 나타내는 경우 js 를 생략한 표현이 가능)

GET / POST
https://hongsii.github.io/2017/08/02/what-is-the-difference-get-and-post/
GET : 정보 및 데이터를 ? 뒤의 쿼리 스트링으로 전달.

var const let 차이
https://velog.io/@bathingape/JavaScript-var-let-const-%EC%B0%A8%EC%9D%B4%EC%A0%90
var : 재선언 불가능
const, let : 재선언 가능 (let은 변수에도 재할당가능)

axios 를 활용한 서버 통신
https://uxgjs.tistory.com/138

Vuex 바인딩
https://kdydesign.github.io/2019/04/06/vuejs-vuex-helper/


--------- 틀 ---------
*.
music

IBM/evote

used car

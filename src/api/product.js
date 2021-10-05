import http from './http';
import axios from 'axios';

export default {
    async getBestProducts() { // best-product.json data를 가져오는 코드 
        return http.get('api/best-product.json');
    },
    async getFeaturedProducts() { // featured-product.json data를 가져오는 코드
        return http.get('api/featured-product.json');
    },
    async getProducts() { // page 값과 가격 범위(pricefilter)를 인자로 받아서 가져옴
        this.apiResponse = null; // 받아온값이 저장되는 변수 초기화
        axios.get('/api/getAllCar') // controller.js 의 /api/getAllCar 를 호출
        .then(response => { // 결과 반환 부분
            const { data } = response; // 반환되는 결과중에서 data 부분만 가져옴
            console.log(data);
            var array = []; // 데이터 정렬용 배열
            for (var i = 0; i < data.length; i++){
                parseInt(data[i].Key);
                data[i].Record.Key = data[i].Key;
                array.push(data[i].Record);
            }
            array.sort(function(a, b) {
                return parseFloat(a.Key) - parseFloat(b.Key);
            });
            this.apiResponse = array; // 화면에 출력되는 부분에 저장
            console.log("success_getallcar");
            this.purchase_car = 'success_getallcar'; // 화면에 출력되는 부분에 저장
        })
            // .catch(error => { // error catch
            //     alert(error)
            // })
        return apiResponse;
    },
    // async getProducts(page = 1, priceRange = null) { // page 값과 가격 범위(pricefilter)를 인자로 받아서 가져옴
    //     return http.get('api/products.json', { // products.json data를 가져오는 코드
    //         page, 
    //         priceRange,
    //     });
    // },
}

import http from './http';

export default {
    async getBestProducts() { // best-product.json data를 가져오는 코드 
        return http.get('api/best-product.json');
    },
    async getFeaturedProducts() { // featured-product.json data를 가져오는 코드
        return http.get('api/featured-product.json');
    },
    async getProducts(page = 1, priceRange = null) { // page 값과 가격 범위(pricefilter)를 인자로 받아서 가져옴
        return http.get('api/products.json', { // products.json data를 가져오는 코드
            page, 
            priceRange,
        });
    },
}
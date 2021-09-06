<template>
    <div>
        <!-- delete_car start -->
        <div class="delete_car">
            <form>
                <h1>차 매물 삭제</h1>
                <div class="form-row align-items-center">
                    <!-- input -->
                    <div class="col-sm-3 my-1">
                        <input class="form-control" type="text" placeholder="Ex: CAR0" v-model="carkeydelete">
                    </div>
                    <!-- btn -->
                    <div class="col-auto my-1">
                        <button id="deleteCar" type="button" value="Delete" class="btn btn-primary" @click="deleteCar">Delete Car</button>
                    </div>
                </div>
                <h5 style="color:green;margin-bottom:2%" id="success_deletecar">{{delete_car}}</h5>
            </form>
        </div>
        <!-- delete_car end -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            delete_car: '', // 반환 값
        };
    },
    methods: {
        deleteCar(carkeydelete) {
            axios.get('/api/deleteCar', { // controller.js 의 /api/deleteCar 를 호출
                params: { // parameter 호출 구문
                    carkey: this.carkeydelete,
                }
            }).then(response => { // 결과 반환 부분
                console.log("success_deletecar");
                this.delete_car = 'success_deletecar'; // 화면에 출력되는 부분에 저장
            })
                // .catch(error => {
                //     alert(error)
                // })
        },
    },
}
</script>
<template>
    <div>
        <!-- create_car start -->
        <div class="create_car">
            <form>
                <h1>차 매물 등록</h1>
                <div class="create_car_text">
                    <h3>Model:</h3>
                    <input class="form-control" type="text" placeholder="Ex: K7" ng-model="car.model">
                    <h3>Maker: </h3>
                    <input class="form-control" type="text" placeholder="Ex: KIA" ng-model="car.maker">
                    <h3>Price: </h3>
                    <input class="form-control" type="text" placeholder="Ex: 20" ng-model="car.price">
                    <h3>Owner: </h3>
                    <input class="form-control" type="text" placeholder="Ex: 5T6Y7U8I" ng-model="car.walletid">
                    <input id="setCar" type="submit" value="Create" class="btn btn-primary" ng-click="setCar()">
                    <h5 style="color:green;margin-bottom:2%" id="success_setcar">{{create_car}}</h5>
                </div>
            </form>
        </div>
        <!-- create_car end -->
    </div>
</template>
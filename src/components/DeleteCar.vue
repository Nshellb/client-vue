<template>
    <div>
        <!-- delete_car start -->
        <div class="delete_car">
            <form>
                <h1>차 매물 삭제</h1>
                <div class="form-row align-items-center">
                    <!-- input -->
                    <div class="col-sm-3 my-1">
                        <input class="form-control" type="text" placeholder="Ex: CAR0" ng-model="carkeydelete">
                    </div>
                    <!-- btn -->
                    <div class="col-auto my-1">
                        <input id="deleteCar" type="submit" value="Delete" class="btn btn-primary" ng-click="deleteCar()">
                    </div>
                </div>
                <h5 style="color:green;margin-bottom:2%" id="success_deletecar">{{delete_car}}</h5>
            </form>
        </div>
        <!-- delete_car end -->
    </div>
</template>
'use strict';
var app = angular.module('application', []);
app.controller('AppCtrl', function($scope, appFactory){
    $("#success_setcar").hide();
    $("#success_getallcar").hide();
    $("#success_getcar").hide();
    $("#success_getwallet").hide();
    $("#success_deletecar").hide();
    $scope.getWallet = function(){
            appFactory.getWallet($scope.walletid, function(data){
                    $scope.search_wallet = data;
                    $("#success_getwallet").show();
            });
    }
    $scope.getAllCar = function(){
            appFactory.getAllCar(function(data){
                    var array = [];
                    for (var i = 0; i < data.length; i++){
                            parseInt(data[i].Key);
                            data[i].Record.Key = data[i].Key;
                            array.push(data[i].Record);
                            $("#success_getallcar").hide();
                    }
                    array.sort(function(a, b) {
                        return parseFloat(a.Key) - parseFloat(b.Key);
                    });
                    $scope.allCar = array;
            });
    }
    $scope.getCar = function(){
            appFactory.getCar($scope.carkey, function(data){
                    $("#success_getcar").show();
                    var array = [];
                    for (var i = 0; i < data.length; i++){
                            data[i].Key = $scope.carkey;
                            data[i].model = data[i].Model;
                            data[i].maker = data[i].Maker;
                            data[i].price = data[i].Price;
                            data[i].walletid = data[i].WalletID;
                            data[i].sellername = data[i].Sellername;
                            array.push(data[i]);
                    }
                    $scope.allCar = array;
            });
    }
    $scope.setCar = function(){
        appFactory.setCar($scope.car, function(data){
                    $scope.create_car = data;
                    $("#success_setcar").show();
        });
    }
    $scope.purchaseCar = function(key){
            appFactory.purchaseCar(key, function(data){
                    var array = [];
                    for (var i = 0; i < data.length; i++){
                            parseInt(data[i].Key);
                            data[i].Record.Key = data[i].Key;
                            array.push(data[i].Record);
                            $("#success_getallcar").hide();
                    }
                    array.sort(function(a, b) {
                        return parseFloat(a.Key) - parseFloat(b.Key);
                    });
                    $scope.allCar = array;
            });
    }
    
    $scope.deleteCar = function(){
            appFactory.deleteCar($scope.carkeydelete, function(data){
                    $scope.delete_car = data;
                    $("#success_deletecar").show();
            });
    }
});
app.factory('appFactory', function($http){
    var factory = {};
    factory.getWallet = function(key, callback){
        $http.get('/api/getWallet?walletid='+key).success(function(output){
                    callback(output)
            });
    }
    factory.getAllCar = function(callback){
        $http.get('/api/getAllCar/').success(function(output){
                    callback(output)
            });
    }
    factory.getCar = function(key, callback){
        $http.get('/api/getCar?carkey='+key).success(function(output){
                    callback(output)
            });
    }
    factory.setCar = function(data, callback){
        $http.get('/api/setCar?model='+data.model+'&maker='+data.maker+'&price='+data.price+'&walletid='+data.walletid+'&sellername='+data.sellername).success(function(output){
                    callback(output)
            });
    }
    factory.purchaseCar = function(key, callback){
        $http.get('/api/purchaseCar?walletid=5T6Y7U8I&carkey='+key).success(function(output){
            $http.get('/api/getAllCar/').success(function(output){
                    callback(output)
            });
        });
    }
    factory.deleteCar = function(key, callback){
        $http.get('/api/deleteCar?carkey='+key).success(function(output){
                    callback(output)
            });
    }
    return factory;
});
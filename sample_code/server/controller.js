var sdk = require('./sdk.js');
module.exports = function(app){
  app.get('/api/getWallet', function (req, res) {
    var walletid = req.query.walletid;
    let args = [walletid];
    sdk.send(false, 'getWallet', args, res);
  });
  app.get('/api/setWallet', function(req, res){
    var name = req.query.name;
		var id = req.query.id;
    var coin = req.query.coin;
    let args = [name, id, coin];
    sdk.send(true, 'setWallet', args, res);
  });
  app.get('/api/getCar', function(req, res){
    var carkey = req.query.carkey;
    let args = [carkey];
    sdk.send(false, 'getCar', args, res);
  });
  app.get('/api/setCar', function (req, res) {
    var model = req.query.model;
    var maker = req.query.maker;
    var price = req.query.price;
    var walletid = req.query.walletid;
    var sellername = req.query.sellername;
    let args = [model, maker, price, walletid, sellername];
    sdk.send(true, 'setCar', args, res);
  });
  app.get('/api/getAllCar', function (req, res) {
    let args = [];
    sdk.send(false, 'getAllCar', args, res);
  });
  app.get('/api/purchaseCar', function (req, res) {
    var walletid = req.query.walletid;
    var carkey = req.query.carkey;
    let args = [walletid, carkey];
    sdk.send(true, 'purchaseCar', args, res);
  });
  app.get('/api/deleteCar', function(req, res){
    var carkey = req.query.carkey;
    let args = [carkey];
    sdk.send(true, 'deleteCar', args, res);
  });
}
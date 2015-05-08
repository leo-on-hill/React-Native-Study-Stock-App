'use strict';


var Reflux = require('reflux'),
  React = require('react-native'),
  _ = require("underscore"),
  StockModel = require('./StockModel'),
  Utils=require('../Utils/Utils');

var {
  AlertIOS
}=React;

module.exports = Reflux.createStore({
  listenables: [require('../Actions/StockListActions')],
  list:[],

  error:function(error){
    AlertIOS.alert('Error',error.message);
    console.log("fetch failed:",error.message);
  },

  onStockListFetch: function() {
    console.log("StockListStore","onStockListFetch",arguments);
    StockModel.fetch().then(data =>  {
      this.list=data;
      this.trigger();
    }).catch(error=>this.error(error)).done();
  },

  onStockListDelete: function(id) {
    console.log("StockListStore","onStockListDelete",arguments);
    StockModel.del(id).then(()=>this.onStockListFetch()).catch((error)=>this.error(error)).done();
  },

  onStockListUpdate: function(id,price,count) {
    console.log("StockListStore","onStockListUpdate",arguments);
    StockModel.updateInfo(id,price,count).then(()=>this.onStockListFetch()).catch((error)=>this.error(error)).done();
  },

  onStockListAdd: function(id) {
    console.log("StockListStore","onStockListAdd",arguments);
    StockModel.add(id).then((data)=>{this.onStockListFetch();}).catch((error)=>this.error(error)).done();
  },

  getAll: function() {
    return this.list;
  },
});

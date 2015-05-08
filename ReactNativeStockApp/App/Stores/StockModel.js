'use strict'
var StoredData = require('./StoredData'),
Utils=require('../Utils/Utils');
//单例 
//http://stackoverflow.com/questions/9733201/is-it-a-bad-practice-to-use-the-requirejs-module-as-a-singleton

var URL = ["ht","tp://stock","app.finan","ce.q","q.com","/pst","ock/api/app","stoc","ksho","w.php"].join("");
var SERACH="http://smartbox.gtimg.cn/s3/index_app.php?q=_QQQ_&t=all&_rndtime=";
var StockModel={

	code:[],
	stock:{},
	list:[],

	save:function(){
		return StoredData.save({code:this.code,stock:this.stock,list:this.list});
	},

	add:function(id){
		if(this.code.indexOf(id)==-1){ 
			this.code.push(id);
			this.stock[id]={price:0,count:0};
		}
		return this.save();
	},

	del:function(id){
		var pos=this.code.indexOf(id);
		if(pos!=-1){
			this.code.splice(pos,1);
			delete this.stock[id];
		}
		return this.save();
	},

	updateInfo:function(code,price,count){
		console.log("StockModel","updateInfo",arguments);
		this.stock[code].price=price;
		this.stock[code].count=count;
		return this.save();
	},

	fetch:function(){
		console.log("StockModel::fetch");
		var that=this;
		return new Promise(function(resolve, reject) {
			StoredData.load().then((data) => {
				that.code=data.code;
				that.stock=data.stock;
				var codeStr =that.code.join("|");
				console.log("StockModel::fetch::URL",URL);
				console.log("StockModel::fetch::code",codeStr);
				fetch(URL,{method:"POST",body:"code="+codeStr})
			  		.then(response => response.json())
			  		.then(responseData => {
			  			if(responseData.code!=0){
			  				reject(new TypeError(JSON.stringify(responseData)));
							return;
						}
						that.list=responseData.data.list;
						that.list.map(function(row){
							var i=that.stock[row.code]?that.stock[row.code]:{count:0,price:0};
							row.price=i.price;
							row.count=i.count;
							row.benefit=Math.round(row.count*(row.zxj-row.price));
						});
						//console.log("StockModel::fetch::response::list",Utils.formatJson(that.list));
						resolve(that.list);
			  		}).catch((error)=>reject(error)).done();	

			}).catch((error)=>reject(error)).done();
		});
	},

	search:function(q){
		var that=this;
		return new Promise(function(resolve, reject) {
			var url = SERACH.replace("_QQQ_", encodeURIComponent(q))+Math.round(new Date().getTime()/1000);
			console.log("StockModel::fetch::URL",SERACH);
			fetch(url)
			  	.then(response => response.text())
			  	.then(text => {
			  		text = "{\""+text.replace("=","\":")+"}";
		  			try{
				  		var obj = JSON.parse(text);
			  			text=obj.v_hint;
			  			var list = text.split("^");
			  			list=list.map(row=>row.split("~"));
	/*[
	    ["sh","600555","\u4e5d\u9f99\u5c71","jls","GP-A"],
	    ["us","s.n","\u65af\u666e\u6797\u7279","splt","GP"]
	]*/
						resolve(list);
		  			}catch(err){
		  				console.log("StockModel::fetch::URL",text);
		  				reject(new TypeError(err));
		  			}
		  		}).catch((error)=>reject(error)).done();	

		});

	},

};

module.exports = StockModel;

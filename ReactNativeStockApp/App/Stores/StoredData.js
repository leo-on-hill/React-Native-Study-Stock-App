'use strict'

var React = require('react-native'),Utils=require('../Utils/Utils');
var {
	AsyncStorage
} = React;
var defaultValue = 'sh601299|sh601766|sz300146|sz300393|sz002524|sz002117|sh600048|sz000835|sh601519|sz002230|sz000150'.split("|");
var STORAGE_KEY = "liuhw@data";
var StoredData = {

	save: function(data) {
		return new Promise(function(resolve, reject) {
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
				.then(() => {
					resolve(data);
				}).catch((error) => reject(error)).done();
		});
	},

	load: function() {
		console.log("StoredData::load");
		return new Promise(function(resolve, reject) {
			AsyncStorage.getItem(STORAGE_KEY)
				.then((value) => {
					if (value) {
						value = JSON.parse(value);
					} else {
						value = {
							code: defaultValue,
							stock: {}
						};
					}

					value.code.map(function(c) {
						if (!value.stock[c]) {
							value.stock[c] = {
								count: 0,
								price: 0
							};
						}
					});

					//console.log("StoredData::load::value",Utils.formatJson(value));

					resolve(value);

				}).catch((error) => reject(error)).done();
		});

	},

}

module.exports = StoredData;
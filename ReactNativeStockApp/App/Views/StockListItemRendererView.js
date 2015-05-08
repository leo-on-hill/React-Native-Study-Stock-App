
'use strict'

var React = require('react-native'),
	Utils = require('../Utils/Utils');

var {
	StyleSheet,
	View,
	Text
}=React;


var StockListItemRendererView=React.createClass({
/*名称*/
/*代号*/

/*损益情况*/
//购入股数

//当期价格
//购入价格

//当期涨跌幅

	render: function() {
		var d=this.props.data;
		var benefit=d.count*(d.zxj-d.price);
		benefit=Math.round(benefit);
		var color={color:gray};
		if(benefit>0){
			color={color:red};
		}else if(benefit<0){
			color={color:green};
		}
		return (
			<View style={[styles.container]}>
				
				<View style={[styles.titleContainer]}>
					<Text style={[styles.titleText]}>{d.name}</Text>
					<Text style={[styles.codeText]}>{d.symbol}</Text>
				</View>
				<View style={[styles.syContainer]}>
					<Text style={[styles.zxjText,color ]}>{benefit}</Text>
					<Text style={[styles.codeText]}>{d.count}</Text>
				</View>
				<View style={[styles.zxjContainer]}>
					<Text style={[styles.zxjText]}>{d.zxj}</Text>
					<Text style={[styles.codeText]}>{d.price}</Text>
				</View>
				<View style={[styles.zdfContainer, {backgroundColor:(d.zdf>0?red:green)}]}>
					<Text style={[styles.zdfText]}>{d.zdf>0?'+':''}{d.zdf}%</Text>
				</View>
			</View>
		);
	},

});

var red='#a63402',green="#297312",gray='#5c636b',white='#f4f7fe',dark="#5e6166";

var styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center', //flex-start, flex-end, center, stretch

	},
	titleContainer: {
		//alignItems: 'flex-start',
	},
	titleText:{
		color:white,
		fontSize:16,
	},
	codeText:{
		color:dark,
		fontSize:12,
	},
	syContainer:{
		width:60,
		justifyContent:'center',
	},
	zxjContainer:{
		width:50,
		justifyContent:'center',
	},
	zxjText:{
		color:white,
		fontSize:16,
		fontWeight:"bold",
	},
	zdfContainer:{
		backgroundColor:gray,
		width:70,
		height:30,
		justifyContent:'center',
	},
	zdfText:{
		alignSelf:'center',
		textAlign:'center',
		color:white,
		fontSize:14,
		fontWeight:"bold",
	},

});

module.exports = StockListItemRendererView;
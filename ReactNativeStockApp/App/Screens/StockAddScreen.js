
'use strict'

var React = require('react-native'),
	StockModel = require('../Stores/StockModel'),
	StockListActions = require('../Actions/StockListActions'),
	StockAddPendingListView = require('../Views/StockAddPendingListView');

var {
	StyleSheet,
	View,
	TextInput,
	Text,
	TouchableHighlight,
}=React;


var StockAddScreen=React.createClass({
	getInitialState:function(){
		return {	data:[]};
	},

	render: function() {
		var d=this.state;
		return (
		<View style={{flex:1,backgroundColor:"#10131a",marginTop: 64}}>
			<View style={styles.innerContainer}>
				<TextInput
					keyboardType='decimal-pad'
					placeholder='Enter stock'
					style={styles.textInput}
					onChange={this.handlePriceInputChange}></TextInput>
				<StockAddPendingListView data={this.state.data} onSelectChange={this.handleStockSelected}/>
			</View>
		</View>
		);
	},

	handlePriceInputChange:function(event){
		var q=event.nativeEvent.text;
		StockModel.search(q).then(list=>{
			this.setState({data:list});
		}).catch(error=>console.log(error.message)).done();
	},

	handleStockSelected:function(rowData){
		console.log("StockAddScreen::handleStockSelected",rowData);
	    //rowData
	    StockListActions.stockListAdd(rowData[0]+rowData[1]);
	    this.props.navigator.pop();
	},

});

var red='#a63402',green="#297312",gray='#5c636b',white='#f4f7fe',dark="#5e6166";

var styles = StyleSheet.create({
	searchContainer: {

	},
	innerContainer: {
		backgroundColor: 'transparent',
		justifyContent: 'flex-start',
		flexDirection:'column',
		padding: 20
	},
	textInput: {
		height: 36,
		marginTop: 20,
		marginBottom: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#0ea378',
		backgroundColor: 'white',
		borderRadius: 3,
		color: '#48BBEC'
	},
	button: {
		height: 36,
		backgroundColor: '#6BBD6D',
		//borderColor: '#0ea378',
		//borderWidth: 1,
		borderRadius: 3,
		alignSelf: 'stretch',
		justifyContent: 'center',
		marginBottom: 10
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		alignSelf: 'center'
	}
});

module.exports = StockAddScreen;
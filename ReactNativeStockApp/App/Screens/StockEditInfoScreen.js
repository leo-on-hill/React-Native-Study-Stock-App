
'use strict'

var React = require('react-native'),
	StockListActions = require('../Actions/StockListActions'),
	StockListItemRendererView=require('../Views/StockListItemRendererView');

var {
	StyleSheet,
	View,
	TextInput,
	Text,
	TouchableHighlight,
}=React;


var StockEditInfoScreen=React.createClass({
	getInitialState:function(){
		return {
			data:this.props.data
		};
	},

	render: function() {
		var d=this.state.data;
		return (
		<View style={{flex:1,backgroundColor:"#10131a",marginTop: 64}}>
			<View style={styles.searchContainer}>
				<StockListItemRendererView data={d} />
				<View style={styles.innerContainer}>
					<Text style={styles.text}>Enter your stocks</Text>

					<TextInput
						keyboardType='decimal-pad'
						placeholder='Enter stock price'
						style={styles.textInput}
						value={d.price?d.price:''}
						onChange={this.handlePriceInputChange}></TextInput>

					<TextInput
						keyboardType='number-pad'
						placeholder='Enter stock count'
						style={styles.textInput}
						value={d.count?d.count:''}
						onChange={this.handleCountInputChange}></TextInput>


					<TouchableHighlight style={styles.button} underlayColor="#5CBC85" onPress={this.handleButtonPressed}>
						<Text style={styles.buttonText}>Submit changes</Text>
					</TouchableHighlight>


					<TouchableHighlight style={styles.button} underlayColor="#5CBC85" onPress={this.handleDeleteButtonPressed}>
						<Text style={styles.buttonText}>Delete stock</Text>
					</TouchableHighlight>

				</View>
			</View>
		</View>

		);
	},

	handleCountInputChange:function(event){
		this.state.data.count=event.nativeEvent.text;
		this.setState({count: event.nativeEvent.text,data:this.state.data});
	},

	handlePriceInputChange:function(event){
		this.state.data.price=event.nativeEvent.text;
		this.setState({price: event.nativeEvent.text,data:this.state.data});
	},

	handleButtonPressed:function(){
		var d=this.state.data;
		StockListActions.stockListUpdate(d.code,d.price,d.count);
		this.props.navigator.pop();
	},

	handleDeleteButtonPressed:function(){
		var d=this.state.data;
		StockListActions.stockListDelete(d.code);
		this.props.navigator.pop();
	},

});

var red='#a63402',green="#297312",gray='#5c636b',white='#f4f7fe',dark="#5e6166";

var styles = StyleSheet.create({
	searchContainer: {

	},
	innerContainer: {
		backgroundColor: 'transparent',
		flex: 1,
		justifyContent: 'flex-start',
		flexDirection:'column',
		padding: 20
	},
	text: {
	  	marginTop: 30,
		fontSize: 28,
		textAlign: 'center',
		color: 'white',
		backgroundColor: 'transparent'
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

module.exports = StockEditInfoScreen;
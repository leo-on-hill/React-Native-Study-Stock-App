'use strict'

var Reflux = require('reflux'),
	React = require('react-native'),
	StockDetailScrollView=require('../Views/StockDetailScrollView'),
	StockEditInfoScreen=require('./StockEditInfoScreen'),
	StockListItemRendererView=require('../Views/StockListItemRendererView'),
	StockListStore = require('../Stores/StockListStore'),
	StockListActions = require('../Actions/StockListActions');

var {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	ListView
} = React;


var StockListScreen = React.createClass({

	mixins: [Reflux.listenTo(StockListStore, 'handlerStockListUpdate')],

	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => true}),
		}
	},

	handlerStockListUpdate:function(data){
		console.log("StockListScreen","handlerStockListUpdate",arguments);
		if (data&&data.err) {
        	return
    	}
    	this.setState({
    		dataSource: this.state.dataSource.cloneWithRows(StockListStore.getAll()),
    	});
	},

	error:function(error){
		console.log("fetch failed:",error.message);
	},

	componentWillMount: function() {
		StockListActions.stockListFetch();
	},

	componentDidMount: function() {
		this.interval = setInterval(function(){
			StockListActions.stockListFetch();
		}, 5000);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	renderRow: function(rowData, sectionId, rowId) {
		return (
		<TouchableHighlight underlayColor="#1e212a" onPress={() => this._pressRow(rowId)}  onLongPress={() => this._pressLongRow(rowData)}>
			<View>
				<StockListItemRendererView data={rowData} />
				<View style={styles.separator}/>
			</View>
		</TouchableHighlight>
		);
	},
	render: function() {
		return (
			<ListView style={styles.listContainer} dataSource={this.state.dataSource} renderRow={this.renderRow}/>
		);
	},

	_pressRow: function(rowID: number) {
	    return;
	},

	_pressLongRow: function(rowData) {
	    this.props.navigator.push({
			title: rowData.name,
			component: StockEditInfoScreen,
			passProps: {
				data:rowData
			},
		});
	},
});

//3171c9
var styles = StyleSheet.create({
	separator: {
	   height: 1,
	   backgroundColor: '#1e212a',
	},
	listContainer: {
		backgroundColor: '#10131a'
	},
});

module.exports = StockListScreen;
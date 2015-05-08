'use strict'

var React = require('react-native');

var {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	ListView
} = React;


var StockAddPendingListView = React.createClass({
	getInitialState: function() {
		return {
			dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.code !== r2.code}),
		}
	},
	
	renderRow: function(rowData, sectionId, rowId) {
		return (
		<TouchableHighlight underlayColor="#1e212a" onPress={() => this._pressRow(rowData)}>
			<View>
				<View style={[styles.container]}>
					<Text style={[styles.text]}>{rowData[1]}</Text>
					<Text style={[styles.text]}>{rowData[2]}</Text>
				</View>
				<View style={styles.separator}/>
			</View>
		</TouchableHighlight>
		);
	},
	render: function() {
		var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.code !== r2.code});
		var data=dataSource.cloneWithRows(this.props.data);
		return (
			<ListView style={styles.listContainer} dataSource={data} renderRow={this.renderRow}/>
		);
	},

	_pressRow: function(rowData) {
		//console.log("StockAddPendingListView::_pressRow",rowData);
		if(this.props.onSelectChange!=null) {
			this.props.onSelectChange(rowData);
		}
	},

	
});

//3171c9
var styles = StyleSheet.create({
	separator: {
	   height: 1,
	   backgroundColor: '#1e212a',
	},
	listContainer: {
		flex: 1,
		backgroundColor: '#10131a'
	},
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
	text:{
		color:'#ffffff',
		fontSize:12,
	},
});

module.exports = StockAddPendingListView;
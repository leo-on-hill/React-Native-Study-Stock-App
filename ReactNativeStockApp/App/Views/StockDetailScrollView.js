/* Forecast View Component */
/*
GET /appstock/app/minute/query?p=1&code=sh600048&_rndtime=1430108730&_appName=ios&_dev=iPhone6,2&_devId=de73fece1fe4342d9322cc5eb2f3ea0c59e137fc&_appver=3.8.0&_ifChId=&_isChId=1&_osVer=8.3&_uin=285891588&_wxuin=285891588 HTTP/1.1
Host: ifzq.gtimg.cn
Connection: keep-alive
User-Agent: QQStock/15041720 CFNetwork/711.3.18 Darwin/14.0.0
Accept-Language: zh-cn
Referer: http://zixuanguapp.finance.qq.com
Accept-Encoding: gzip,deflate
*/
'use strict'

var React = require('react-native'),
	Utils = require('../Utils/Utils');

var {
	StyleSheet,
	ScrollView,
	View,
	Text,
	Image,
} = React;


var StockListView = React.createClass({
	

	componentWillMount: function() {
	},
	
	render: function() {
		return (
		<ScrollView
	        onScroll={() => { console.log('onScroll!'); }}
	        scrollEventThrottle={200}
	        contentInset={{top: -50}}
	        style={styles.scrollView}>
	        {this.props.data.map(createThumbRow)}
	      </ScrollView>
		);
	},
});


var Thumb = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.button}>
        <Text style={styles.lightText} >{this.props.name}</Text>
        <Text style={styles.lightText} >{this.props.key}</Text>
        <Text style={styles.lightText} >{this.props.id}</Text>
      </View>
    );
  }
});

var createThumbRow = (data, i) => <Thumb key={i} id={data.id} name={data.name} />;

var styles = StyleSheet.create({

	lightText: {
		color: "#9a9a9a"
	},
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});

module.exports = StockListView;
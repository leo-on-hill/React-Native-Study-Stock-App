/**
 * Weather App for iOS made with React Native
 * https://github.com/jsphkhan/ReactNativeExamples/tree/master/ios/ReactNativeStockApp
 */
'use strict';

 var  Reflux=require('reflux');
 
var React = require('react-native'),
    StockListScreen = require('./Screens/StockListScreen'),
    StockAddScreen = require('./Screens/StockAddScreen');

//*
var TodoActions = Reflux.createActions([
        "toggleItem",     // called by button in TodoItem
        "toggleAllItems", // called by button in TodoMain (even though you'd think TodoHeader)
        "addItem",        // called by hitting enter in field in TodoHeader
        "removeItem",     // called by button in TodoItem
        "clearCompleted", // called by button in TodoFooter
        "editItem"        // called by finishing edit in TodoItem
    ]);
//*/

//https://github.com/spoike/refluxjs

var {
  View,
  Text,
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  StatusBarIOS
} = React;


//'#2373ff' #183E63
var ReactNativeStockApp = React.createClass({

  gotoAddStockView:function(){
    this.refs.nav.push({
      title: 'Add Stock',
      component: StockAddScreen,
      passProps: {},
    });
  },

  render: function() {
    StatusBarIOS.setStyle(StatusBarIOS.Style['lightContent']);
    return (
      <NavigatorIOS
        ref="nav"
        tintColor="#2373ff"
        barTintColor="#1e212a"
        titleTextColor="#FFFFFF"
        style={styles.navigatorContainer}
        initialRoute={{
          component: StockListScreen,
          title: 'Stock',
          rightButtonTitle: '+ Add', 
          onRightButtonPress: this.gotoAddStockView,
        }} />
    );
  }
});

var styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('ReactNativeStockApp', () => ReactNativeStockApp);

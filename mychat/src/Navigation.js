import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/chat';
const AuthStackNavigator = createStackNavigator({
    Login: {
      screen: Login,
    },
    Register: {
        screen: Register,
    }
},  { headerMode: 'none'});
const AppStackNavigator= createStackNavigator({
   Home: {
       screen: Home,
       navigationOptions:{
        title:'My friend List',
       },
    },
    Chat :{
      screen: Chat,
    },
});
const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthStackNavigator,
    App : AppStackNavigator
},
{
    initialRouteName: 'AuthLoading',
});
const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;
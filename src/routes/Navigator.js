import React from 'react';
import { createStackNavigator, createAppContainer , createBottomTabNavigator , createSwitchNavigator } from "react-navigation";
//Icon
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';

//Component
import Login   from '../components/Login';
import Signup  from '../components/Signup';
import Home    from '../components/Home';
import Profile from '../components/Profile';
import AddPost from '../components/AddPost';

//Colors
import Colors from '../constants/Colors';

import { AddButton , LogoutButton } from './HeaderButtons';


const Navigator = createStackNavigator({
    Login : {
        screen :  Login,
        navigationOptions : {
            title : 'Login'
        }
    },
    Singup : {
        screen : Signup,
        navigationOptions : {
            title : 'Signup'
        }
    },
    Add : {
        screen : AddPost,
        navigationOptions : {
            title : 'Share Image'
        }
    },
},{
    defaultNavigationOptions : {
        headerStyle : { 
            backgroundColor : Colors.redColor,
        },  
        headerTintColor : Colors.white,
        headerTitleStyle : { 
            color : Colors.white,
            fontSize : 20
        }
    }
});

const HomeScreen = createStackNavigator({
    Home : {
        screen : Home,
        navigationOptions : ({ navigation }) => ({
            title : 'Home',
            headerRight : <AddButton navigation={ navigation }/>,
            headerLeft : <LogoutButton navigation={navigation}/>,
            tabBarIcon : ({ tintColor }) => {
                return(
                    <FAIcon
                        name='home'
                        size={25}
                        color={tintColor}
                    />
                );
            },

        })
    }
},{
    defaultNavigationOptions : {
        headerStyle : { 
            backgroundColor : Colors.redColor,
        },  
        headerTintColor : Colors.white,
        headerTitleStyle : { 
            color : Colors.white,
            fontSize : 20
        }
    }
});

const ProfileScreen = createStackNavigator({
    Profile : {
        screen : Profile,
        navigationOptions : ({ navigation }) => ({
            title : 'Profile',
            headerLeft : <LogoutButton navigation={navigation}/>,
            
        })
    }
},{
    defaultNavigationOptions : {
        headerStyle : { 
            backgroundColor : Colors.redColor,
        },  
        headerTintColor : Colors.white,
        headerTitleStyle : { 
            color : Colors.white,
            fontSize : 20
        }
    }
})

const AppTabNavigator = createBottomTabNavigator(
    {
        Home : {
            screen : HomeScreen,
            navigationOptions : ({ navigation }) => ({
                tabBarIcon : ({ tintColor }) => {
                    return(
                        <FAIcon
                            name='home'
                            size={25}
                            color={tintColor}
                        />
                    );
                }
            })
        },
        Profile : {
            screen : ProfileScreen,
            navigationOptions : ({ navigation }) => ({
                tabBarIcon : ({ tintColor }) => {
                    return(
                        <MIcon
                            name='account-circle'
                            size={25}
                            color={tintColor}
                        />
                    );
                }
            })
        },
    },{
        tabBarPosition : 'top',
        tabBarOptions : {
            showIcon : true,    
            showLabel : false,
            inactiveTintColor : Colors.blue,
            activeTintColor : Colors.redColor,
            pressColor : Colors.redColor,
            indicatorStyle : { backgroundColor : Colors.redColor },
            style : {
                backgroundColor : Colors.white
            }
        }
    }
  );

  const MainNav = createSwitchNavigator({
    nunAuth: Navigator,
    auth: AppTabNavigator,
})

export default createAppContainer(MainNav);

import React, { Component } from 'react'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import MenuComponent from './MenuComponent';
import DishComponent from './DishComponent';
import { Icon } from 'react-native-elements'
import HomeComponent from './HomeComponent';
import AboutComponent from './AboutComponent'
import ContactComponent from './ContactComponent'
import { ScrollView, SafeAreaView, View, Text, Image, StyleSheet } from 'react-native'
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { connect } from 'react-redux'
import Reservation from './Reservation'
import Favorites from './FavoriteComponent';
import Login from './LoginComponent'

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: MenuComponent,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => <Icon name='menu' size={24}
                color='black'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    },
    Dish: DishComponent
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgorundColor: '#512DA8'
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            color: '#000'
        }
    }

})

const HomeNavigator = createStackNavigator({
    Home: HomeComponent,

}, {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgorundColor: '#512DA8'
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            color: '#000'
        },
        headerLeft: <Icon name='menu' size={24}
            color='black'
            onPress={() => navigation.toggleDrawer()}
        />
    })

})


const AboutNavigator = createStackNavigator({
    About: AboutComponent

}, {
    initialRouteName: 'About',
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgorundColor: '#512DA8'
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            color: '#000'
        },
        headerLeft: <Icon name='menu' size={24}
            color='black'
            onPress={() => navigation.toggleDrawer()}
        />
    })

})


const ContactNavigator = createStackNavigator({
    Contact: ContactComponent

}, {
    initialRouteName: 'Contact',
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgorundColor: '#512DA8'
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            color: '#000'
        },
        headerLeft: <Icon name='menu' size={24}
            color='black'
            onPress={() => navigation.toggleDrawer()}
        />
    })

})

const FavoritesNavigator = createStackNavigator({
    Favorites: Favorites

}, {
    initialRouteName: 'Favorites',
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgorundColor: '#512DA8'
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            color: '#000'
        },
        headerLeft: <Icon name='menu' size={24}
            color='black'
            onPress={() => navigation.toggleDrawer()}
        />
    })

})

const LoginNavigator = createStackNavigator({
    Login: Login

}, {
    initialRouteName: 'Login',
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgorundColor: '#512DA8'
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            color: '#000'
        },
        headerLeft: <Icon name='menu' size={24}
            color='black'
            onPress={() => navigation.toggleDrawer()}
        />
    })

})

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
            iconStyle={{ color: 'white' }}
            onPress={() => navigation.navigate('DrawerToggle')} />
    })
})





const CustomDrawerContentComponent = (props) => {
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}
                forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./images/logo.png')}
                            style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>



                </View>
                <DrawerItems {...props} />

            </SafeAreaView>
        </ScrollView>
    )
}




const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="sign-in"
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }

    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="list"
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }

    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="address-card"
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                />
            )
        }

    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    iconStyle={{ color: tintColor }}
                />
            ),
        }

    },
    Reservation:
    {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    iconStyle={{ color: tintColor }}
                />
            ),
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="info-circle"
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }


    }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
})


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'

    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

const App = createAppContainer(MainNavigator)
class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

    }
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }} >
                <App />
            </View>
        )
    }
}

// export default createAppContainer(MainNavigator)
const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders())

})
export default connect(null, mapDispatchToProps)(Main)

// export default createAppContainer(Final)
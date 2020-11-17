import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { Icon, Input, CheckBox, Button } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { baseUrl } from '../shared/baseUrl'

class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }


    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata)
                if (userinfo) {
                    this.setState({ username: userinfo.username })
                    this.setState({ password: userinfo.password })
                    this.setState({ remember: true })
                }
            })
    }

    handleLogin() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password }))

                .catch(err => console.log('Could not save userinfo', err))
        }
        else {

            SecureStore.deleteItemAsync('userinfo')
                .catch(err => console.log('Could not delete userinfo ', err))

            this.setState({
                username: '',
                password: '',
                remember: false

            })
        }
    }
    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({ username: username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({ password: password })}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    secureTextEntry
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={<Icon name='sign-in' type='font-awesome' color='white' />}

                        buttonStyle={{ backgroundColor: "#512DA8" }}
                        titleStyle={{ marginLeft: 10 }}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        icon={<Icon name='user-plus' type='font-awesome' color='white' />}


                        titleStyle={{ marginLeft: 5, color: "white" }}
                    />
                </View>
            </View>
        )
    }
}


class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            imageUrl: baseUrl + '/images/logo.png',
            remember: false

        }

    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let captureImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3]

            })
            if (!captureImage.cancelled) {
                this.setState({ imageUrl: captureImage.uri })
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password }))

                .catch(err => console.log('Could not save userinfo', err))
        }
        else {

            SecureStore.deleteItemAsync('userinfo')
                .catch(err => console.log('Could not delete userinfo ', err))

            this.setState({
                username: '',
                password: '',
                remember: false

            })
        }
    }
    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{ color: tintColor }}
            />
        )
    }
    render() {
        return (
            <ScrollView >
                <View style={styles.container} >
                    <View style={styles.imageContainer} >
                        <Image
                            source={{ uri: this.state.imageUrl }}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                    </View>
                    <Input
                        placeholder='username'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({ username: username })}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='password'
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({ password: password })}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        secureTextEntry
                    />
                    <Input
                        placeholder='First Name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => this.setState({ firstname: firstname })}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(lastname) => this.setState({ lastname: lastname })}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        secureTextEntry
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({ email: email })}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        secureTextEntry
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={<Icon name='user-plus' type='font-awesome' color='white' />}

                            titleStyle={{ marginLeft: 5 }}
                            buttonStyle={{ backgroundColor: "#512DA8" }}
                        />
                    </View>
                </View>
            </ScrollView>
        )

    }
}


const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
    }
})



export default Login

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10,

    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 30
    }
})

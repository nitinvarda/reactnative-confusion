import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Card, Icon, Input, CheckBox } from 'react-native-elements'

import * as SecureStore from 'expo-secure-store'

class LoginComponent extends Component {
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
        title: 'Login'
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
                        color="#512DA8"
                    />
                </View>
            </View>
        )
    }
}

export default LoginComponent

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10,

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

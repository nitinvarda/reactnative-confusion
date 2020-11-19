import React, { Component } from 'react'
import { StyleSheet, Text, View, Switch, Button, ScrollView, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Card } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '2020-11-19'
        }



    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '2020-11-19'
        })
    }
    handleReservation() {
        Alert.alert(
            'Your Reservation. Ok ?',
            'Number of Guests :' + this.state.guests + '\n Somking :' + this.state.smoking + '\n Date and Time :' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        this.AddReservationToCalendar(this.state.date)
                        this.presentLocalNotification(this.state.date)
                        this.resetForm()
                    }

                }
            ],
            { cancelable: false }
        )
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }

        return permission;
    }
    async presentLocalNotification(date) {
        try {
            await this.obtainNotificationPermission();
            await Notifications.setNotificationHandler({
                handleNotification: async () => {
                    return {
                        shouldShowAlert: true,
                        shouldPlaySound: true,
                        shouldSetBadge: true,
                    };
                },
            });
            const content = {
                title: 'Your Reservation',
                body: 'Reservation for ' + date + ' requested',
                ios: {
                    sound: true
                },
                android: {
                    sound: true,
                    vibrate: true,
                    color: '#512DA8'
                },
            }
            await Notifications.scheduleNotificationAsync({ content, trigger: null })


        }
        catch (err) {
            console.log(err)
        }
    }
    async ObtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }

        return permission;


    }
    async AddReservationToCalendar(date) {
        try {
            await this.ObtainCalendarPermission();
            const event = {
                title: 'Con Fusion Table Reservation',
                timezone: 'Asia/Hong_Kong',
                startDate: new Date(Date.parse(date)),
                endDate: new Date(2 * 60 * 60 * 1000 + Date.parse(date)),
                location: '21, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            }
            console.log(event)
            await Calendar.createEventAsync("1", event)
        }
        catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <ScrollView>
                <Animatable.View animation='zoomInUp' duration={2000} >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState({ smoking: value })}>
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="2016-05-01"
                            maxDate="2022-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;

import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch, Button, ScrollView, Modal, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Card } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'
import { Permissions, Notifications } from 'expo'


const Reservation = () => {
    const [guests, setGuests] = useState(1)
    const [smoking, setSmoking] = useState(false)
    const [date, setDate] = useState('2016-01-01')
    const [showModal, setShowModal] = useState(false)



    const resetForm = () => {
        setGuests(1)
        setSmoking(false)
        setDate('2016-01-01')
    }
    const openAlert = () => {
        Alert.alert(
            'Your Reservation. Ok ?',
            'Number of Guests :' + guests + '\n Somking :' + smoking + '\n Date and Time :' + date,
            [
                {
                    text: 'Cancel',
                    onPress: () => resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => resetForm()

                }
            ],
            { cancelable: false }
        )
    }
    return (
        <ScrollView>
            <Animatable.View animation='zoomInUp' duration={2000} >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={guests}
                        onValueChange={(itemValue, itemIndex) => setGuests(itemValue)}>
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
                        value={smoking}
                        onTintColor='#512DA8'
                        onValueChange={(value) => setSmoking(value)}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    {/* <DatePicker
                    style={{ flex: 2, marginRight: 20 }}
                    date={date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2017-01-01"
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
                    onDateChange={(date) => setDate(date)}
                /> */}
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => openAlert()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </Animatable.View>


        </ScrollView>
    )
}

export default Reservation

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
    },
    modal: {
        justifyContent: 'center',
        margin: 20,

    },
    moadalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512AD8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});


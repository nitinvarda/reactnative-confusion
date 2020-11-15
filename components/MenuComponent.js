import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Tile } from 'react-native-elements'
import { Loading } from './LoadingComponent';

class MenuComponent extends Component {
    constructor(props) {
        super(props)
    }
    static navigationOptions = {
        title: 'Menu'
    };

    render() {

        const { navigate } = this.props.navigation
        const renderMenuItem = (item, index) => {



            return (
                <Tile
                    key={index}
                    imageSrc={{ uri: baseUrl + item.item.image }}
                    title={item.item.name}
                    caption={item.item.description}
                    featured
                    onPress={() => navigate('Dish', { dishId: item.item.id })}

                />

            )


        }
        if (this.props.dishes.isLoading) {
            return <Loading />
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        }
        else {
            return (
                <FlatList data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()} />
            )
        }
    }





}
const mapStateToProps = (state) => ({
    dishes: state.dishes
})
export default connect(mapStateToProps)(MenuComponent)

const styles = StyleSheet.create({})

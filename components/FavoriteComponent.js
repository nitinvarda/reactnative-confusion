import React, { Component } from 'react'
import { StyleSheet, Text, FlatList, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

class FavoriteComponent extends Component {

    render() {
        const { navigate } = this.props.navigation
        const renderMenuItem = ({ item, index }) => {
            return (
                <ListItem key={index} onPress={() => navigate('Dish', { dishId: item.id })}>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    <Avatar source={{ uri: baseUrl + item.image }} />
                </ListItem>
            )
        }
        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            )
        }
        else if (this.props.dishes.errMess) {
            return <Loading />
        }
        else {
            return (
                <FlatList
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            )
        }
    }
}


const mapStateToProps = (state) => ({
    dishes: state.dishes,
    favorites: state.favorites
})
export default connect(mapStateToProps)(FavoriteComponent)

const styles = StyleSheet.create({})

import React, { Component } from 'react'
import { Animated, Easing, StyleSheet, Text, FlatList, View, Alert } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { deleteFavorite } from '../redux/ActionCreators'
import Swipeout from 'react-native-swipeout'
import * as Animatable from 'react-native-animatable'


class FavoriteComponent extends Component {
    // renderLeftActions = (progress, dragX) => {
    //     const trans = dragX.interpolate({
    //         inputRange: [0, 50, 100, 101],
    //         outputRange: [-20, 0, 0, 1],
    //     });
    //     return (
    //         <RectButton style={styles.leftAction} onPress={this.close}>
    //             <Animated.Text
    //                 style={[
    //                     styles.actionText,
    //                     {
    //                         transform: [{ translateX: trans }],
    //                     },
    //                 ]}>
    //                 Archive
    //         </Animated.Text>
    //         </RectButton>
    //     );
    // };
    render() {

        const { navigate } = this.props.navigation
        const renderMenuItem = ({ item, index }) => {
            const rightButton = [{
                text: 'Delete',
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you want to delete Favorite dish ' + item.name + '?',
                        [
                            {
                                text: 'Cancel', onPress: () => console.log(item.name + 'Not Deleted'),
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => this.props.deleteFavorite(item.id)
                            }
                        ],
                        { cancelable: false }
                    )


                }

            }]
            return (
                <Swipeout right={rightButton} autoClose={true} >
                    <Animatable.View animation='fadeInRightBig' duration={2000} >
                        <ListItem key={index} onPress={() => navigate('Dish', { dishId: item.id })}>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>

                            <Avatar source={{ uri: baseUrl + item.image }} />
                        </ListItem>
                    </Animatable.View>
                </Swipeout>
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
                <>
                    <FlatList
                        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}

                    />

                </>
            )
        }
    }
}


const mapStateToProps = (state) => ({
    dishes: state.dishes,
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteComponent)

const styles = StyleSheet.create({})

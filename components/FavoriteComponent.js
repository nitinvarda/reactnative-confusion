import React, { Component } from 'react'
import { Animated, StyleSheet, Text, FlatList, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { deleteFavorite } from '../redux/ActionCreators'
// import { RectButton } from 'react-native-gesture-handler'
// import Swipeable from 'react-native-gesture-handler/Swipeable';
import Swipeout from 'react-native-swipeout'


class FavoriteComponent extends Component {
    renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction} onPress={this.close}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}>
                    Archive
            </Animated.Text>
            </RectButton>
        );
    };
    render() {

        const { navigate } = this.props.navigation
        const renderMenuItem = ({ item, index }) => {
            const rightButton = [{
                text: 'Delete',
                type: 'delete',
                onPress: () => this.props.deleteFavorite(item.id)

            }]
            return (
                <Swipeout right={rightButton} autoClose={true} >
                    <ListItem key={index} onPress={() => navigate('Dish', { dishId: item.id })}>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                        <Avatar source={{ uri: baseUrl + item.image }} />
                    </ListItem>
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

import React, { Component, useState } from 'react'
import { FlatList, Modal, ScrollView, Text, View, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating } from 'react-native-elements'

import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite } from '../redux/ActionCreators';
import { TextInput } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'


const RenderDish = (props) => {

    const dish = props.dish;

    handleViewRef = ref => this.view = ref;
    const recognizeDrag = ({ moveX, moveY, dy, dx }) => {
        if (dx < -200) {
            return true
        }
        else {
            return false
        }

    }
    const recognizeComment = ({ dx }) => {
        if (dx > 200) {
            return true
        }
        else {
            return false
        }
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add to Favorites ?',
                    'Are you sure you want to add' + dish.name + 'to favorites ? ',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'Ok',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()

                        }
                    ],
                    { cancelable: false }
                )
            }
            else if (recognizeComment(gestureState)) {
                props.toggleModal()
            }

            return true

        }
    })
    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        })
    }
    if (dish != null) {
        return (
            <Animatable.View animation='fadeInDown' duration={2000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card>
                    <Card.Title>{dish.name}</Card.Title>

                    <Card.Image source={{ uri: baseUrl + dish.image }} />

                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={styles.icons}>

                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                        />
                        <Icon raised reverse
                            name='pencil'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={props.toggleModal} />
                        <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                        />
                    </View>


                </Card>
            </Animatable.View>
        )
    }
    else {
        return (<View></View>)
    }
}
const RenderComments = (props) => {
    const comments = props.comments;

    const RenderCommentsItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }} >
                <Text style={{ fontSize: 14 }}>
                    {item.comment}
                </Text>
                <Text style={{ fontSize: 12 }} >{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }} >{'--' + item.author + ',' + item.date} </Text>

            </View>

        )

    }
    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card  >
                <Card.Title>Comments</Card.Title>
                <FlatList data={comments}
                    renderItem={RenderCommentsItem}
                    keyExtractor={item => item.id.toString()}
                />



            </Card>
        </Animatable.View>

    )
}






class DishComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            author: '',
            comment: '',
            rating: 0,
            favorites: []
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
    }

    static navigationOptions = {
        title: 'Dish Details'
    }
    markedFavorite(dishId) {
        this.props.postFavorite(dishId)
        this.setState({ favorites: this.state.favorites.concat(dishId) })

    }
    toggleModal() {
        this.setState({

            modal: !this.state.modal
        })
    }

    submitHandle() {
        const dishId = this.props.navigation.getParam('dishId', '')
        const Comment = {
            author: this.state.author,
            comment: this.state.comment,
            date: new Date(),
            dishId: dishId,
            id: 0,
            rating: this.state.rating
        }
        this.toggleModal()
        console.log(Comment)
        this.props.postComment(Comment)
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId', '')


        return (
            <ScrollView>
                <RenderDish

                    dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markedFavorite(dishId)}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    toggleModal={this.toggleModal}

                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.modal}
                    onDismiss={this.toggleModal}
                    onRequestClose={this.toggleModal}

                >
                    <View style={styles.modal}>
                        <Rating style={styles.rating} onFinishRating={(rating) => this.setState({ rating: rating })} showRating ratingCount={5} />
                        <View style={styles.user}>
                            <Icon
                                style={styles.icon}
                                name='user-o'
                                type='font-awesome'


                            />
                            <TextInput style={styles.modalTextInput} placeholder="Author" onChangeText={(text) => this.setState({ author: text })} />

                        </View>
                        <View style={styles.user}>
                            <Icon
                                style={styles.icon}
                                name='comment-o'
                                type='font-awesome'


                            />
                            <TextInput style={styles.modalTextInput} placeholder="Comment" onChangeText={(text) => this.setState({ comment: text })} />

                        </View>

                        <View style={styles.buttonView}>

                            <Button color="#512AD8" title='Submit' onPress={this.submitHandle} />
                        </View>
                        <View style={styles.buttonView}>

                            <Button style={styles.button} color="gray" title="Close" onPress={this.toggleModal} />
                        </View>
                    </View>
                </Modal>


            </ScrollView>
        )

    }


}

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (Comment) => dispatch(postComment(Comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(DishComponent)

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
    },
    modalTextInput: {

        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    user: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20
    },
    icon: {
        padding: 10
    },
    rating: {
        marginBottom: 40
    },
    button: {
        flex: 1,
        padding: 16
    },
    buttonView: {
        margin: 10
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

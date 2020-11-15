import React, { Component } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl';


const RenderDish = (props) => {


    const dish = props.dish;

    if (dish != null) {
        return (
            <Card>
                <Card.Title>{dish.name}</Card.Title>

                <Card.Image source={{ uri: baseUrl + dish.image }} />

                <Text style={{ margin: 10 }}>
                    {dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                />

            </Card>
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
        <Card  >
            <Card.Title>Comments</Card.Title>
            <FlatList data={comments}
                renderItem={RenderCommentsItem}
                keyExtractor={item => item.id.toString()}
            />



        </Card>

    )
}






class DishComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

            favorites: []
        }
    }
    static navigationOptions = {
        title: 'Dish Details'
    }
    markedFavorite(dishId) {
        this.setState({ favorites: this.state.favorites.concat(dishId) })

    }
    render() {
        const dishId = this.props.navigation.getParam('dishId', '')


        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.state.favorites.some(el => el === dishId)} onPress={() => this.markedFavorite(dishId)} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

            </ScrollView>
        )

    }


}

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments
})

export default connect(mapStateToProps)(DishComponent)

// const styles = StyleSheet.create({})

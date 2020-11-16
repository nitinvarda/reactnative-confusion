import React, { Component } from 'react';

import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements'
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const Histroy = () => {
    return (
        <Card>
            <Card.Title>Our Histroy</Card.Title>
            <Card.Divider />
            <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence
            in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys
            patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs
                       in the world, you never know what will arrive on your plate the next time you visit us.</Text>
            <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO,
                     Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
        </Card>

    )
}

class About extends Component {

    static navigationOptions = {
        title: 'About'
    }

    render() {

        const renderMenuItem = (item, index) => {


            return (
                <ListItem key={index}>
                    <Avatar rounded source={{ uri: baseUrl + item.item.image }} />
                    <ListItem.Title>{item.item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.item.description}</ListItem.Subtitle>
                </ListItem>

            )

        }
        if (this.props.leaders.isLoading) {
            return <Loading />
        }
        else {
            return (
                <ScrollView >
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Histroy />
                        <Card>
                            <Card.Title>Corporate Leadership</Card.Title>
                            <Card.Divider />
                            <FlatList data={this.props.leaders.leaders}
                                renderItem={renderMenuItem}
                                keyExtractor={item => item.id.toString()} />
                        </Card>
                    </Animatable.View>


                </ScrollView>


            )
        }
    }

}

const mapStateToProps = (state) => ({
    leaders: state.leaders

})

export default connect(mapStateToProps)(About)
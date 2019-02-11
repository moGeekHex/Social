import React, { Component } from 'react';
import { View , Text , StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

class Profile extends Component {
    render()
    {
        return(
            <View>
                <View style={styles.wrapper}>
                    <Avatar
                        large
                        rounded
                        source={{uri:this.props.profile.imageUrl}}
                    />
                </View>

                <View style={styles.wrapper}>
                    <Text>{this.props.profile.name}</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper : {
        marginTop : 10,
        alignItems : 'center',
        justifyContent : 'center'
    }
});

const mapStateToProps = state => {
    return {
        profile : state.auth.profile
    };
};

export default connect(mapStateToProps)(Profile);
import React, { Component } from 'react';
import { View , Text} from 'react-native';
import { FormInput , FormLabel , Button , Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { signup } from '../actions';

import Colors from '../constants/Colors';
import ImagePicker from 'react-native-image-picker';

class Signup extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            profileImage : null,
            email : '',
            name : '',
            password : '',
            disabled : true
        }
      
        if(this.props.signedup)
        {
            this.props.navigation.goBack();
        }
    }

    onSelectProfilePicture = () => {
        const options = {
            title : 'Select Profile Image',
            quality : 0.1,
            mediaType : 'photo'
        };
        
        ImagePicker.showImagePicker(options , (response) => {
            this.setState({
                profileImage : response.uri,
                disabled : false
            })
        });
    }

    onSignup = () => {
        const { name , email , profileImage , password } = this.state;

        this.props.signup({ name , email , profileImage , password });
    }
    
    showErrorMessage = () => {
        
        if(this.props.error)
        {
            return(
                <View style={{ flex:1 , alignItems:'center' , justifyContent:'center' , marginVertical : 10 }}>
                    <Text style={{ color : Colors.redColor , fontSize : 16 }}>{this.props.error}</Text>
                </View>
            )
        }
    
    }

    render()
    {
        return(
            <View>

                <View style={{ marginVertical : 10 , alignItems : 'center' , justifyContent : 'center'}}>
                    <Avatar
                        large
                        rounded
                        onPress={ this.onSelectProfilePicture }
                        source={{ uri : this.state.profileImage }}
                    />
                </View>

                <FormLabel>Name</FormLabel>
                <FormInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    autoFocus
                    onChangeText = {( name) => this.setState({ name : name })}
                />

                <FormLabel>Email</FormLabel>
                <FormInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    onChangeText = {( email ) => this.setState({ email : email })}

                />
                
                <FormLabel>Password</FormLabel>
                <FormInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry
                    onChangeText = {( password ) => this.setState({ password : password })}
                />

                { this.showErrorMessage() }

                <Button
                    title='Sign up'
                    backgroundColor={Colors.blue}
                    buttonStyle={{ marginTop : 20 }}
                    disabled={this.state.disabled}
                    onPress={this.onSignup}
                    loading={this.props.loading}
                />
            </View> 
        );
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        signedup : state.auth.signedup
    }
};

export default connect(mapStateToProps, { signup })(Signup);
import React,{ Component } from 'react';
import { View , Text , StyleSheet } from 'react-native';
import { FormInput , FormLabel , Button , Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import { addPost } from '../actions';

import Colors from '../constants/Colors';

class AddPost extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            title : '',
            ImageName : '',
            postImage : null,
            disabled : true
        };
    }

    componentDidUpdate()
    {
        if(this.props.added)
        {
            this.props.navigation.goBack();
        }
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

    onSelectPostImage = () => {
        const options = {
            title : 'Select Profile Image',
            quality : 0.1,
            mediaType : 'photo'
        };

        ImagePicker.showImagePicker(options , (response) => {
            if(response) {
                 const imageName = `${this.props.profile.id}-${response.fileName}-56`;
                
                this.setState({
                    postImage : response.uri,
                    ImageName : imageName,
                    disabled : false
                });
            }else{
                this.setState({ disabled : true });
            }
        })
    }

    onShareButtonPressed = () => {
        const { postImage , ImageName , title } = this.state;
        const { profile } = this.props;
        this.props.addPost(title,profile,postImage,ImageName);
    } 

    render(){
        return(
            <View>
                <View style={{ marginVertical : 10 , alignItems : 'center' , justifyContent : 'center'}}>
                    <Avatar
                        large
                        rounded
                        onPress={ this.onSelectPostImage }
                        source={{ uri : this.state.postImage }}
                    />
                </View>

                <FormLabel>Title</FormLabel>
                <FormInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    autoFocus
                    onChangeText = {(title) => this.setState({ title : title })}
                />

                { this.showErrorMessage() }

                <Button
                    title='Share'
                    backgroundColor={Colors.blue}
                    buttonStyle={{ marginTop : 20 }}
                    disabled={this.state.disabled}
                    onPress={this.onShareButtonPressed}
                    loading={this.props.loading}
                />
            </View> 
        )
    }
}
const mapStatetoProps = state => {
    return {
        profile : state.auth.profile,
        loading : state.posts.loading,
        error   : state.posts.error,
        added   : state.posts.added
    };
};

export default connect(mapStatetoProps ,{ addPost })(AddPost);
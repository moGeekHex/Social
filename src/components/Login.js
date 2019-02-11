import React, { Component } from 'react';
import { View , Text} from 'react-native';
import { FormInput , FormLabel , Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { login } from '../actions';
import Colors from '../constants/Colors';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }

    componentDidUpdate()
    {
        if(this.props.profile)
        {
            this.props.navigation.navigate('Home');
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

    onLogin = () => {
        const { email , password } = this.state;
        this.props.login({ email , password });
    }

    render()
    {
        return(
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    autoFocus
                    keyboardType='email-address'
                    onChangeText = {(email) => this.setState({email}) }
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry
                    onChangeText = {(password) => this.setState({password})}
                />
                {/* {this.showErrorMessage} */}
                <Button
                    title='Login'
                    backgroundColor={Colors.blue}
                    buttonStyle={{ marginTop : 20 }}
                    disabled = {this.props.loading}
                    onPress = {this.onLogin.bind(this)}
                />
                <Button
                    title='No Account ? Sign up now'
                    backgroundColor={Colors.redColor}
                    buttonStyle={{ marginTop : 30 }}
                    onPress={() => this.props.navigation.navigate('Singup')}
                    disabled = {this.props.loading}
                />
            </View> 
        );
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error   : state.auth.error,
        profile : state.auth.profile
    }
}

export default connect(mapStateToProps,{ login })(Login);
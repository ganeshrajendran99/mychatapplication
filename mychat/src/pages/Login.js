import React, {Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { userLogin } from '../actions/userAction';
import { connect } from 'react-redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: {} 
        };
        this.validateForm = this.validateForm.bind(this);
    }    
    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({password: text })
    }
    validateForm(){
        const { errors } = this.state;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        if (emailaddr === '') {
            errors.email="Email address cannot be empty.";
        } else if(emailaddr.length > 0 && !reg.test(emailaddr)){
            errors.email="Please provide correct email address.";
        } else {
            errors.email='';
        }

        if (pass ===''){
            errors.pass="Password cannot be empty.";
        } else if(pass && pass.length < 5) {
            errors.pass="Password should have more than 5 characters.";
        } else {
            errors.pass='';
        }
        this.setState({ errors })
        if(errors.email==='' && errors.pass===''){
          const userinfo={
            email:this.state.email,
            password:this.state.password
          }
           console.log(userinfo,"userinfo")
           this.props.onLogin(userinfo)
    }
}
    goToRegister = () => {
        this.props.navigation.navigate('Register');
    } 
componentDidUpdate(nextProps){
    if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess===true) {
        this.props.navigation.navigate('Home');
    }
}
    render() {
        const { errors} = this.state;
        return ( 
                <View style ={styles.container}>
                <ImageBackground source = {require('../images/back4.jpg')} style = {{flex:1, height:700, width:450}} >
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#ffffff"
                    autoCapitalize = "none"
                    onChangeText = {this.handleEmail} /> 
                <Text style={[styles.errorstyle]}> {errors.email}</Text>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#ffffff"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword} />
                <Text style={[styles.errorstyle]}>{errors.pass}</Text>
                <TouchableOpacity 
                    style = {styles.submitButton}
                    onPress = {this.validateForm}>
                    <Text style = {styles.submitButtonText }> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.RegisterButton}
                    onPress = {this.goToRegister}>
                    <Text style = {styles.RegisterButtonText }>Sign Up </Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>            
            );    
    }
}
function mapStateToProps(state) {
    console.log(state,"state")
    return{
        userReducer:state.userReducer
    };
}
function mapDispatchToProps(dispatch){
    return{
        onLogin:(userinfo) => dispatch(userLogin(userinfo))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Login);
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },   
    input: {
        width: "80%",
        height: 45,
        borderColor: '#000000',
        borderWidth: 2.0,
        padding: 10,
        fontSize: 15,
        lineHeight: 20,
        color: '#ffffff',
        right: 20,
        left: 50,
        top: 170,
        borderRadius:10
    },
    submitButton: {
        backgroundColor: '#e6ac00',
        padding: 10,
        margin: 40,
        height: 40,
        borderRadius: 5,
        width: 80,
        top:172,
        left:70        
    },
    submitButtonText:{
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 7
    },
    RegisterButton: {
        backgroundColor: '#e6ac00',
        padding: 10,
        margin: 10,
        height: 40,
        borderRadius:7,
        width: 100,
        left: 250,
        marginTop:70,
        top:20
    },
    RegisterButtonText:{
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 6
    },
    errorstyle: {
        color: 'red',
        top:170,
        left:50
    }
})
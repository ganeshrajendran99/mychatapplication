import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { userList } from '../actions/userAction';
import { connect } from 'react-redux';
class  Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    componentDidMount() {
        this.props.onUserList();
    }
    goToChat = (userid, name) => {
        this.props.navigation.navigate('Chat',{userid: userid, name:name});
    }
    componentDidUpdate(nextProps) {
        
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess === true){
           this.setState({users:this.props.userReducer.userList}); 
         }
    }
    render() {
        const { users } = this.state;
        return (
            <ImageBackground source = {require('../images/back2.jpg')} style = {{flex:1, height:700, width:450}} >
            <View style = {styles.container}>
                {users && users.length>0?
                <View>
                    {users.map((item,index) =>
                    {
                        return(<TouchableOpacity onPress={()=>this.goToChat(item._id,item.name)} key={index}>
                            <Text style={styles.item}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )})}
            </View>:null}
            </View>
            </ImageBackground>
        );
    }
}
function mapStateToProps(state) {
    console.log(state,"State")
    return{
      userReducer: state.userReducer
    };
  }
  function mapDispatchToToProps(dispatch) {
    return{
      onUserList:() => dispatch(userList())
    };  
  }
  export default connect(
    mapStateToProps,
    mapDispatchToToProps
  )(Home);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
    item: {
        width: "75%",
        height: 45,
        borderColor: '#000000',
        borderWidth: 2.0,
        padding: 10,
        fontSize: 18,
        lineHeight: 20,
        color: '#ffffff',
        right: 20,
        left: 40,
        top: -30,
        borderRadius:10,
        marginTop:20,
        color:'#ffffff' 
    }
});
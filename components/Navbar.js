import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const style=StyleSheet.create({
    fontFamily: {
        fontFamily: 'Ubuntu-Bold'
    },
    nav: {
        backgroundColor: '#000000',
        marginBottom: 5, 
        paddingVertical: 15, 
        flexDirection: 'row'
    },
    navText:{
        color: 'white', 
        fontSize: 20,  
        width: '40%',
        paddingHorizontal: 10,
        marginHorizontal: 5,
        alignSelf: 'center'
    },
    btn:{
        backgroundColor:'#32cd32', 
        width: '40%',
        borderRadius: 10
    },
    btnText:{
        fontSize: 18, 
        color: 'white',
        textAlign: 'center',
        padding: 8
    }
})

export default function Navbar(props) {


  return (
    <View style={style.nav}>
        <Text style={[style.navText,style.fontFamily]}>Incident List</Text>
        <TouchableOpacity style={style.btn} activeOpacity={0.9} onPress={()=>props.setModalVisible(true)}>
            <Text style={[style.btnText,style.fontFamily]}>Add Sender</Text>
        </TouchableOpacity>
    </View>
  )
}
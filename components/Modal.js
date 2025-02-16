import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'

import React, { useState } from 'react'

const style = StyleSheet.create({
    fontFamily: {
        fontFamily: 'Ubuntu-Bold'
    },
    container:{
        backgroundColor: '#E8EAED',
        marginBlockStart: '25%',
        marginHorizontal: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute'
    },
    text: {
        color: '#000000',
        fontWeight: '500',
        fontSize: 20,
        padding: 10, 
        margin: 10
    },
    input: {
        backgroundColor: '#ffffff',
        fontWeight: '500',
        fontSize: 15,
        margin: 15, padding: 15
    },
    btn:{
        backgroundColor:'#32cd32', 
        width: '40%',
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: 15,
        alignSelf: 'center'
    },
    btnText:{
        fontSize: 18, 
        color: 'white',
        textAlign: 'center',
        padding: 10
    }
})

export default function Modal(props) {

  const [num1, setNum1]= useState('Contact Number 1')
  const [num2, setNum2]= useState('Contact Number 2')
  const [num3, setNum3]= useState('Contact Number 3')

  const setContactNum = (target,num)=>{
    if (target==='num1') setNum1(num)
    else if (target==='num2') setNum2(num)
    else if (target==='num3') setNum3(num)
  }
    
  return (
    props.modalVisible?
    <View style={style.container}>
      <Text style={[style.text,style.fontFamily]}>
        Enter EverBridge Sender Contact
      </Text>
      <TextInput  keyboardType='numeric' style={[style.input,style.fontFamily]} placeholder={num1} onChangeText={(value)=>setContactNum('num1',value)}></TextInput>
      <TextInput  keyboardType='numeric' style={[style.input,style.fontFamily]} placeholder={num2} onChangeText={(value)=>setContactNum('num2',value)}></TextInput>
      <TextInput  keyboardType='numeric' style={[style.input,style.fontFamily]} placeholder={num3} onChangeText={(value)=>setContactNum('num3',value)}></TextInput>
      <TouchableOpacity style={style.btn} activeOpacity={0.8} onPress={()=>{
        props.setContactList([num1,num2,num3]);
        props.setModalVisible(false)
      }}>
            <Text style={[style.btnText,style.fontFamily]}>Save</Text>
      </TouchableOpacity>
    </View>:<></>
  )
}
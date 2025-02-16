import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  NativeModules,
  PermissionsAndroid,
  DeviceEventEmitter,
  TouchableWithoutFeedback,
} from 'react-native';

import axios from 'axios';
import Navbar from './components/Navbar';
import SmsList from './components/SmsList'
import Modal from './components/Modal';

const { SmsListenerModule } = NativeModules;

const style = {
  modalOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  }
}

const dataCheck = (date, time, inc, url) => {
  if (date == undefined || time == undefined || inc == undefined || url == undefined) return false

  if (inc.match('^(?!INC).*$')) return false

  return true
}

const App = () => {

  const [modalVisible, setModalVisible] = useState(false)
  const [contactList, setContactList] = useState([])
  const [receiveSmsPermission, setReceiveSmsPermission] = useState(false);
  const [queue, setQueue] = useState([])

  console.log('Contact List', contactList)
  console.log(`modalVisible ${modalVisible}`)

  const updateQueue = (senderPhoneNumber, messageBody) => {
    console.log(`senderPhoneNumber ${senderPhoneNumber} messageBody ${messageBody}`)

    if (contactList.includes(senderPhoneNumber)) {
      let data = messageBody.split(" ")

      const date = data[0]
      const time = data[2]
      const inc = data[12]
      const url = data[13]

      if (dataCheck(date, time, inc, url)) {

        axios.post('http://192.168.1.212:8000/', {
          'url': url
        })
          .then(function (response) {

            console.log(response.data)

            const short_desc = response.data?response.data:''

            data = [
              ...queue,
              { 'date': date, 'time': time, 'inc': inc, 'url': url, 'short_desc':short_desc }
            ]
            data = Array.from(new Set(data.map(item => item.inc))).map(
              (inc) => {
                return data.find(item => item.inc === inc)
              }
            )
            console.log('Unique DataRecords: ' + data)
            setQueue(data)
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    }
  }

  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
      setReceiveSmsPermission(permission);

      if (permission === true)
        SmsListenerModule.startListeningToSMS();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestSmsPermission();
    if (receiveSmsPermission === PermissionsAndroid.RESULTS.GRANTED) {
      let subscriber = DeviceEventEmitter.addListener(
        'onSMSReceived',
        message => {
          const { messageBody, senderPhoneNumber } = JSON.parse(message);
          updateQueue(senderPhoneNumber, messageBody)
        }
      );
      return () => {
        subscriber.remove();
      };
    }
  }, [receiveSmsPermission, contactList, queue]);

  return (

    <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={style.modalOverlay}></View>
      </TouchableWithoutFeedback>
      <Navbar setModalVisible={setModalVisible}></Navbar>
      {!modalVisible ? <SmsList queue={queue}></SmsList> : <></>}
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} setContactList={setContactList}></Modal>
    </SafeAreaView>
  );
};

export default App;

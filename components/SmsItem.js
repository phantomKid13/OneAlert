import { Linking } from 'react-native';
import { StyleSheet, View, Text } from 'react-native'

const style = StyleSheet.create({
    container: {
        backgroundColor: '#E8EAED',
        padding: 10,
        margin: 5
    },
    text: {
        fontFamily: 'Ubuntu-Bold',
        color: 'black',
        fontWeight: '500',
        fontSize: 15,
        paddingVertical: 2
    },
    url: {
        fontFamily: 'Ubuntu-Bold',
        color: 'blue',
        fontWeight: '500',
        fontSize: 15,
        paddingVertical: 2
    }

})

const SmsItem = ({ item }) => {

    return (
        <View style={style.container}>
            <Text style={style.text}>{item.inc} {item.date} {item.time} </Text>
            <Text style={style.text}>{item.short_desc} </Text>
            <Text style={style.url}
                onPress={() => Linking.openURL(item.url)}>
                {item.url}
            </Text>
        </View>
    );
}
export default SmsItem
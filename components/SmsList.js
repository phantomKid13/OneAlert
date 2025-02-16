import { View, FlatList } from 'react-native'
import SmsItem from './SmsItem';

const SmsList = ({ queue }) => {

    return (
        <View>
            <FlatList
                data={queue}
                renderItem={SmsItem}
                keyExtractor={item => item.inc}
            />
        </View>
    );
}
export default SmsList;
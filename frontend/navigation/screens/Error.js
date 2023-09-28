import {View, Text } from 'react-native';
import GreenButton from '../lib/Button';

export default function SuccessScreen({navigation}){
    return (
        <View className="p-4 w-full h-full">
            <Text className="flex jutify-center font-bold text-4xl text-center text-[#FF2400] mb-10">Fehler!</Text>
            <GreenButton
                title={"Nochmal probieren"}
                accessibilityLabel={"Nochmal probieren"}
                onPress={() => {
                    navigation.navigate('Leihen');
                }} />
            <GreenButton
                title={"Startseite"}
                accessibilityLabel={"Startseite"}
                onPress={() => {
                    navigation.navigate('Home');
                }} />
        </View>
    );
}
import {View, Text } from 'react-native';
import GreenButton from '../lib/Button';

export default function SuccessScreen({navigation}){
    return (
        <View className="p-4 w-full h-full">
            <Text className="flex jutify-center font-bold text-4xl text-center text-[#3EB489] mb-10">Erfolg!</Text>
            <GreenButton
                title={"Leihübersicht"}
                accessibilityLabel={"Leihübersicht"}
                onPress={() => {
                    navigation.navigate('Profil');
                }} />
            <GreenButton
                title={"Weiter ausleihen"}
                accessibilityLabel={"Weiter ausleihen"}
                onPress={() => {
                    navigation.navigate('Leihen');
                }} />
        </View>
    );
}
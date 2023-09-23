import React from 'react';
import { View } from 'react-native';
import GreenButton from '../lib/Button';

export default function LendScreen({navigation}){
    return (
        <View className="flex-1 p-4 bg-white">
            <GreenButton
                title={"QR Code scannen"}
                accessibilityLabel={"QR Code scannen"}
                onPress={() => {
                    navigation.navigate('QRScanner');
                }}
            />
            <GreenButton
                title={"Rückgabe"}
                accessibilityLabel={"Rückgabe"}
                onPress={() => {
                    navigation.navigate('Home');
                }}
            />
        </View>
    );
}

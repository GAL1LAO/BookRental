import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import GreenButton from '../lib/Button';
import { UserContext } from '../../App';

export default function ReturnType({navigation, route}) {
    let { itemId } = route.params;
    const { userToken } = useContext(UserContext);

    const handleNormalReturn = async () => {
        try {
            await fetch('http://'+ process.env.localIP +':3000/returnItem', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "id": itemId
                })
            });
            navigation.navigate('Success');
        } catch (error) {
            console.error("Error during normal return:", error);
        }
    };

    const handleFastReturn = async () => {
        try {
            let response = await fetch(`http://${process.env.localIP}:3000/getFastReturnPoints?user_short=${userToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("Unexpected response:", text);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let fastReturnPointsJson = await response.json();

            if (fastReturnPointsJson.fastReturnPoints && fastReturnPointsJson.fastReturnPoints !== 0) {
                await fetch('http://'+ process.env.localIP +':3000/returnItemFast', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "user_short": null,
                        "id": itemId
                    })
                });
                navigation.navigate('Success');
            }
        } catch (error) {
            console.error("Error during fast return:", error);
        }
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <GreenButton
                title={"normal"}
                accessibilityLabel={"normale Rückgabe"}
                onPress={handleNormalReturn}
            />
            <GreenButton
                title={"schnell"}
                accessibilityLabel={"Rückgabe über schnelles Regal"}
                onPress={handleFastReturn}
            />
        </View>
    );
}

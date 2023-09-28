import React from 'react';
import { Text, TouchableOpacity } from "react-native";

export default function GreenButton({title, accessibilityLabel, onPress, icon=null}) {
    return (
        <TouchableOpacity
        className="flex justify-between items-center rounded-lg flex-row px-4 my-1.5 py-4 w-full bg-[#3EB489]"
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
        >
            <Text className="font-bold text-white text-3xl">{title}</Text>
            {icon}
        </TouchableOpacity>
    );
}

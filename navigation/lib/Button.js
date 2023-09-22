import React from 'react';
import { Text, TouchableOpacity } from "react-native";

export default function GreenButton({title, accessibilityLabel, onPress}) {
    return (
        <TouchableOpacity
        className="rounded-lg flex-row px-4 items-center my-1.5 py-4 w-full bg-[#3EB489] justify-center items-center"
            accessibilityLabel={accessibilityLabel}
            onPress={onPress}
        >
            <Text className="font-bold text-white text-3xl">{title}</Text>
        </TouchableOpacity>
    );
}

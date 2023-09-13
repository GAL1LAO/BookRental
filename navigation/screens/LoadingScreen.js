import { ActivityIndicator, View, Text } from "react-native";

export default function LoadingScreen(){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Getting token...</Text>
            <ActivityIndicator size="large" />
        </View>
    );
}
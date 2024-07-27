import { View, Text } from "react-native";
import {Link} from 'expo-router';



const Challenges =()=> {
    return (
        <View>
            <Text>Home Page</Text>
            <Link href="./user/1">Go to user</Link>
        </View>
    )
}


export default Challenges;
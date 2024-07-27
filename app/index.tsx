import { Link } from "expo-router"
import { Text, View } from "react-native"

const SpashScreen =()=>{
    return (
        <View>
            <Text>app root index</Text>
            <Link href="(tabs)">Go to tabs</Link>
         </View>
    )
}


export default SpashScreen
import {Tabs} from 'expo-router';


const TabLayout = ()=>{
    <Tabs>
        <Tabs.Screen name="index" options={{ title: 'index' }}/>
        <Tabs.Screen name="homepage"/>
    </Tabs>
}

export default TabLayout;
import React from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainView from "../screen/main";
import { Setting } from "../screen/setting";



const Stack =  createNativeStackNavigator();





export const  Navigationroutes = (props)=>{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="main" component={MainView} options={{headerShown:false}} />
                <Stack.Screen name="Setting" component={Setting} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
// Setting
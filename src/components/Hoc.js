import React from "react";
import {View,Text,Image,Pressable} from "react-native";
import { style } from "./style";
import { Actionsheet,useDisclose,Divider,SearchIcon } from 'native-base';
import { useNavigation } from "@react-navigation/core";






export const Hoc = (props)=>{
    const { isOpen, onOpen, onClose } = useDisclose();
    const titlearr  = ["Browse","List of script","Update Script","Setting","Exit"];

 const navigation =  useNavigation();

 const routeNavigate =(index)=>{
      switch (index) {
        case 0:
          
          break;
          case 1:
          
            // return navigation.navigate("Setting");
            return;
            case 2:
          
              // return navigation.navigate("Setting");
              return;
          case 3:
               
           return navigation.navigate("Setting");
          case 4:
          
            // return navigation.navigate("Setting");
            return
        default:
          return 
      }
 }

      return(<View style={style.container}>
        <View style={style.cardContainer}>
            <View style={{width:"70%",paddingLeft:15}}>
            <Text>
        Header title
            </Text>
            </View>
            <View style={style.imageContainer}>
                <View pointerEvents={props.hideSearchicon?"none":"auto"} style={{width:"40%",justifyContent:"center",alignItems:"center"}} >
                { !props.hideSearchicon && <Pressable onPress={()=>{props.onCall()}} style={{width:"100%",justifyContent:"center",alignItems:"center"}}>
                <SearchIcon  size="4"/>
                </Pressable>}
                </View> 
             
            <Pressable style={{width:"60%",alignItems:"flex-end",justifyContent:"center",paddingRight:10}}  onPress={onOpen} >
              
           <Image source={require("../assets/dots.png")} style={{height:25,width:8,bottom:2}}/>
           </Pressable>
            </View>
           
            </View>
          {
              props.children
          }

<Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
           
          {titlearr.map((item,key)=>{
              return(
                <View  key={key} style={{width:"100%"}}>
                     <Actionsheet.Item onPress={()=>{
                       onClose();
                       routeNavigate(key);

                     }} >{item}</Actionsheet.Item>
                       {titlearr.length-1 !== key &&<Divider my="0.5" /> }
                </View>
              )
          })}
         
          
          
        </Actionsheet.Content>
      </Actionsheet>


    </View>)
}
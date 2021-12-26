import React from "react";
import {View,Text,Pressable} from "react-native";
import { AlertDialog ,Divider, Input, Radio} from 'native-base';





export const Setting = (props)=>{
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenIntervalAccount, setisOpenIntervalAccount] = React.useState(false);
    const [value, setValue] = React.useState("one")

  const onClose = () => setIsOpen(false);
  const oncloseSecondAlert =()=> setisOpenIntervalAccount(false);
  const radioButtontitles = ["Continue where you left off",
    "Blank page",
    "UserScript by developer",
    "UserScript at Greasy Fork"]

  const cancelRef = React.useRef(null);
  const cancelIntervalRef = React.useRef(null)
    return(
        <View style={{flex:1,backgroundColor:"#ffff"}}>

            <Pressable onPress={()=>{setIsOpen(!isOpen)}} style={{width:"100%",paddingVertical:10,paddingHorizontal:10}}>
                <Text style={{fontSize:16,fontWeight:"700"}}>On Startup</Text>
                <Text style={{fontSize:12,fontWeight:"500"}}>chosse home page ...</Text>
            </Pressable>
<Divider my="2"/>
            <Pressable onPress={()=>{setisOpenIntervalAccount(!isOpenIntervalAccount)}} style={{width:"100%",paddingVertical:10,paddingHorizontal:10}}>
            <Text style={{fontSize:16,fontWeight:"700"}}>Script Update Interval</Text>
            <Text style={{fontSize:12,fontWeight:"500"}}>days between checkes ...</Text>
            </Pressable>
            
            <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Startup Setting</AlertDialog.Header>
          <AlertDialog.Body>
          <Radio.Group
      name="myRadioGroup"
      accessibilityLabel="favorite number"
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue)
      }}
    >
        {radioButtontitles.map((item,key)=>{
            return(
                <Radio key={key} value={item} my={1}>
        {item}
      </Radio>
            )
        })}
    </Radio.Group>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>


      <AlertDialog
        leastDestructiveRef={cancelIntervalRef}
        isOpen={isOpenIntervalAccount}
        onClose={oncloseSecondAlert}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Update Interval</AlertDialog.Header>
          <AlertDialog.Body>
          <Input keyboardType="number-pad" size="lg" placeholder="Enter Interval" />        
 
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>


        </View>
    )
}
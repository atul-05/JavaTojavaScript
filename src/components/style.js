import {StyleSheet,Dimensions} from "react-native";

const {width,height} = Dimensions.get("window")

export const style = StyleSheet.create({
    container:{
        flex:1,
    },
  header:{
      width:width,
      maxHeight:80,
      minHeight:50,
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
  },
      
    get cardContainer(){
        return({
            ...this.header,
            
            backgroundColor:"#ffff",
      shadowColor:"#000",
      shadowOffset:{
          width:0,
          height:10
      },
      shadowOpacity:0.25,
      shadowRadius:2,
      elevation:14,
      
        })
    }
,
imageContainer:{
    width:"30%",
    height:"100%",
    alignSelf:"flex-end",
    // alignItems:"center",
    // justifyContent:"space-around",
    flexDirection:"row",
    // backgroundColor:"blue"
}
      
})
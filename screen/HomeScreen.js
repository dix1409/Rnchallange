import React, { useState,useRef, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Image, Text ,Dimensions,FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard,PanResponder,
  PanResponderInstance,
  Animated,} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist'
import {  TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {uid} from "uid"

const {width, height} =Dimensions.get("screen");
export default function HomeScreen({navigation}) {
    const [FoodList,setFoodList]=useState([])
    const [visible,setVisible]=useState(false)
    const [edit,setEdit]=useState(-1)
    const [FoodName,setFoodName]=useState("")
    const [FoodPrice,setFoodPrice]=useState("")
    const toggleBottomNavigationView=()=>{
      setVisible(!visible)
    }
    console.log(FoodList);
const renderItem=({item,index, move, moveEnd, isActive})=>(
  <TouchableOpacity    
style={{
height: 50,backgroundColor:isActive?"blue":"#f4f4f4",marginBottom:5,marginHorizontal:20,flexDirection: "row",alignItems: "center",borderRadius:10,

}} 
onLongPress={move}
        onPressOut={moveEnd}
>
  <View >

<MaterialCommunityIcons name="dots-grid" size={24} color="#aeaeae" />
  </View>

<Text style={{marginLeft:10}} >{item.FoodName}</Text>
<Text style={{marginLeft:"auto",fontWeight:"bold",color:"#aeaeae",marginRight:2}}>Price: </Text>
<Text>₹ {item.FoodPrice}</Text>
<TouchableOpacity style={{marginHorizontal:15}} onPress={()=>{

  setEdit(index)
  setVisible(!visible)
  setFoodName(item.FoodName)
  setFoodPrice(item.FoodPrice)
}}>
<AntDesign name="edit" size={21} color="black" />
</TouchableOpacity>
<TouchableOpacity style={{marginHorizontal:15}} onPress={()=>
{
  
 
  setFoodList(FoodList.filter(items=>items!==item))}}>
<MaterialIcons name="delete-outline" size={24} color="black" />
</TouchableOpacity>
</TouchableOpacity>
)

return (
 <SafeAreaView style={styles.container}>
 <View style={{width: '100%', height: height*0.8}}>

 <Text style={{textAlign: 'center',fontWeight:"bold",fontSize:24}}>Food List</Text>
  {
    FoodList.length>0?(
        <DraggableFlatList
            data={FoodList}
            keyExtractor={item=>item.key}
            renderItem={renderItem}
            style={{marginVertical:30}}
            // onDragEnd={(d)=>setFoodList(d)}
            scrollPercent={5}
          onMoveEnd={({ data }) => setFoodList(data)}
            ListFooterComponent={()=>(
                <TouchableOpacity style={{height: 50,backgroundColor:"#e1f6ec",marginBottom:5,marginHorizontal:20,flexDirection: "row",alignItems: "center",borderRadius:10,marginTop:15}} onPress={()=>setVisible(!visible)} >
 <Text style={{textAlign: "center",width: "100%",fontWeight:"bold"}}>Add Food</Text>
            </TouchableOpacity>
            )}
        />
    
    ):
    <View style={{alignItems: 'center',justifyContent:"center",flex:1}}>
            <Image source={{uri:"https://ouch-cdn2.icons8.com/FEnEhNwywDJuXt45DUVBBHpMrxUhh6TVclZdDDwqaK0/rs:fit:256:181/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjg3/LzAwMzAzMmQ2LWVh/MGQtNDM1Yy05MTAw/LTdmN2YxYTA1ZjZh/Ni5zdmc.png"}} style={{width:width*0.5,height:height*0.3}} resizeMode="contain"  />
            <Text style={{fontSize:17,fontWeight:"400"}}>Food List is empty</Text>
    </View>
  }
 </View>
  
 <View style={{alignItems: "center",justifyContent: "center"}}>
 <TouchableOpacity style={{width:"70%",height:50,backgroundColor:"#03b660",borderRadius:5,alignItems:"center",justifyContent: "center"}} onPress={()=>{
  FoodList.length>0?
  navigation.navigate("FinalFood",{data:FoodList}):
  setVisible(true)}} >

 <Text style={{fontWeight:"bold",color:"white"}}>{FoodList.length>0?"Final Food list":"Add Food list"}</Text>
 </TouchableOpacity>
 </View>
 <BottomSheet
                visible={visible}
                //setting the visibility state of the bottom shee
                onBackButtonPress={toggleBottomNavigationView}
                //Toggling the visibility state on the click of the back botton
                onBackdropPress={toggleBottomNavigationView}
                //Toggling the visibility state on the clicking out side of the sheet
              >
                {/*Bottom Sheet inner View*/}

    

                <View
                  style={{
                    backgroundColor: "rgba(252, 252, 252, 1)",
                    width: "100%",
                    // height: 350,
                    borderTopStartRadius: 70,
                    borderTopEndRadius: 70
                    ,
                  }}
                >
                <View style={styles.panel} >

                <Text style={{fontSize: 16,fontWeight: "bold",textAlign: "left",width:"90%"}}>{edit===-1?"Add":"Edit"} Food</Text>
                <Text style={{fontSize: 14,marginTop:20,marginBottom:10,textAlign: "left",width:"90%"}}>Food Name</Text>
                  <View style={{width:"90%",height:40,borderWidth:1,borderColor:"black"}}>
                    <TextInput onChangeText={(text)=>setFoodName(text)}  style={{width:"100%",height:"100%"}} value={FoodName} />
                  </View>
                  <Text style={{fontSize: 14,marginTop:20,marginBottom:10,textAlign: "left",width:"90%"}}>Food Price</Text>
                  <View style={{width:"90%",height:40,borderWidth:1,borderColor:"black"}}>
                    <TextInput  onChangeText={(text)=>setFoodPrice(text)}  style={{width:"100%",height:"100%"}} keyboardType="number-pad" value={FoodPrice} />
                  </View>
                  <TouchableOpacity style={{width:"70%",height:50,backgroundColor:"#03b660",borderRadius:5,alignItems:"center",justifyContent: "center",marginVertical:30}} onPress={()=>{
                    if(edit>=0){

                        FoodList[edit]={FoodName:FoodName,FoodPrice:FoodPrice,key:uid(5)}
                        setFoodList(FoodList)
                    }else{
                    setFoodList([...FoodList,{FoodName:FoodName,FoodPrice:FoodPrice,key:uid(5)}])
                    setFoodName("")
                    setFoodPrice("")
                    }
                    Keyboard.dismiss()
                    setVisible(!visible)
                    setEdit(-1)

                  }} >
                    <Text style={{fontWeight:"bold",color:"#fff"}} >{edit===0?"Add":"Edit"} Food List</Text>
                  </TouchableOpacity>
                </View>
                </View>
            
              </BottomSheet>

 </SafeAreaView>
  );
}
const styles= StyleSheet.create({
container: {
  paddingVertical:10,
  backgroundColor:"white",
  height:height
},
panel: {
    padding: 20,

    paddingVertical: 40,

    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
    marginBottom: "auto",
    alignItems:"center"
  },
});


import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FinalFood({navigation,route}) {
    const data=route.params.data;
    const renderItem=({item,index,})=>(
        <View    
      style={{
      height: 50,marginBottom:5,marginHorizontal:20,flexDirection: "row",alignItems: "center",borderRadius:10,
       backgroundColor:"#f4f4f4"
      }} 

      >
        <View >
      
      <MaterialCommunityIcons name="dots-grid" size={24} color="#aeaeae" />
        </View>
      
      <Text style={{marginLeft:10}} >{item.FoodName}</Text>
      <Text style={{marginLeft:"auto",fontWeight:"bold",color:"#aeaeae",marginRight:2}}>Price: </Text>
      <Text>₹ {item.FoodPrice}</Text>
    
      </View>
      )

return (
    <SafeAreaView style={styles.container}> 
    <FlatList
 data={data}
 keyExtractor={item=>item.key}
 renderItem={renderItem}
 style={{marginVertical:30}}
 // onDragEnd={(d)=>setFoodList(d)}
 ListFooterComponent={()=>(
                <TouchableOpacity style={{height: 50,backgroundColor:"#e1f6ec",marginBottom:5,marginHorizontal:20,flexDirection: "row",alignItems: "center",borderRadius:10,marginTop:15}} onPress={()=>navigation.goBack()} >
 <Text style={{textAlign: "center",width: "100%",fontWeight:"bold"}}>Back to Home Screen </Text>
            </TouchableOpacity>
            )}
 
/>
</SafeAreaView>
  );
}
const styles= StyleSheet.create({
container: {
    flex: 1,
    backgroundColor:"#fff",
    margin:10
}
});
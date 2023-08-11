import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg5NzM1NjQyYjQwZjcwYjU4YjQ0MWYiLCJpYXQiOjE2OTE3NDA1NzYsImV4cCI6MTY5MzkwMDU3Nn0._Rrl8lEJgaBE29qvOZubRRqu3_VY7tHnGQjFYqX2fJg";

const Home = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("1");

 
  useEffect(() => {
    console.log("useEffectcall");
    loadApiData();
  }, []);
  const loadApiData = async () => {
    console.log("loaddatacall");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   
    let apiUrl;
    console.log(id)
    if (id == '1') {
      apiUrl = "http://13.233.95.158:5000/api_get_my_events/-" + id;
      
    } else {
        console.log('inside else')
    
      apiUrl = "http://13.233.95.158:5000/api_get_my_events/" + id;
      console.log(apiUrl)
    }
    try{
    const response = await axios.get(apiUrl);

    // setNewData(response.data.data)
    const newData = response.data.data;

    setData((prevData) => [...prevData, ...newData]);
    if(response.data.data.length!==0){
        setId(newData[newData.length - 1]._id);

    }
    // if(newData){
    // }
    // }
    }
    catch(err){
        console.log(err)
    }

    // setData(response.item.item)

    //   console.log(data)
  };

  const renderItem = (item) => {
    let statusStyle=styles.offlineStatus
   if(item.item.event_type=="Online"){
    statusStyle=styles.onlinestatus
   }

    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            borderBlockColor: "black",
            borderWidth: 1,
            height: 100,
            width: "80%",
          }}
        >
          <Text>{`Name-${item.item.event_name}`}</Text>
          <Text>{`Description-${item.item.description}`}</Text>
          <View
            style={statusStyle}
          >
            <Text>{item.item.event_type}</Text>
          </View>
        </View>
      </View>
    );
  };
  //   const load = () => {
  //     console.log(moreData[moreData.length - 1]._id);
  //     setId(moreData[moreData.length - 1]._id);
  //   };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "gray",
          marginTop: 50,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home Page</Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        onEndReached={loadApiData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    onlinestatus:
        { borderWidth: 1, height: 20, width: 50, marginTop: 10,backgroundColor:'green' },
    offlineStatus:
    { borderWidth: 1, height: 20, width: 50, marginTop: 10,backgroundColor:'red' },
});

export default Home;

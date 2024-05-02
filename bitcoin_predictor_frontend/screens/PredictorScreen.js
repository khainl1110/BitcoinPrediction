import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList } from 'react-native';
//import { StyleSheet, Text, View, Button, Image, ScrollView, FlatList } from 'react-native-web';
import FilterButton from '../components/FilterButton';
import Result from '../components/Result';
import Header from '../components/Header';
import Table from '../components/Table';
import TableHeader from '../components/TableHeader';
import RefreshButton from '../components/RefreshButton';
import { create } from 'apisauce';

function PredictorScreen({ navigation }) {

    const [data, setData] = useState([]);
    const [allActualPrice, setAllActualPrice] = useState([]);
    const [allFeaturesDate, setDataAllFeaturesDate] = useState([]);
    const [allPredictedPrice, setAllPredictedPrice] = useState([]);
    const [setPredictedPrice, predictedPrice] = useState(null);
    const [loading, setLoading] = useState(true); // State variable to track loading state


    // Check if data has a value
    const hasData = allPredictedPrice !== null && allPredictedPrice !== undefined && allPredictedPrice !== '';



    const currentDate = new Date();
    // Add one day to the current date
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const tomorrowDay = String(tomorrowDate.getDate()).padStart(2, '0');
    const tomorrowMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const tomorrowYear = tomorrowDate.getFullYear();
    // Format the date as "YYYY-MM-DD"
    const tomorrowFormatted = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;

   // console.log(tomorrowFormatted)

    useEffect(() => {
        // Create an Apisauce client
        const api = create({
            baseURL: 'http://18.116.42.185/', // Replace with your API base URL
        });
        // Define a function to fetch data
        const fetchData = async () => {
            setLoading(true); // Set loading to true before making the request
            try {
                // Make a GET request using Apisauce
                const response = await api.get(`predict/${tomorrowFormatted}`);
                // Check if response is successful
                if (response.ok) {
                    // Extract the data from the response

                    setAllPredictedPrice(response.data.allPredictedPrice)
                    setAllActualPrice(response.data.allActualPrice)
                    setDataAllFeaturesDate(response.data.allFeatures.Date)


                } else {
                    // Handle unsuccessful response
                    console.error('Failed to fetch data:', response.problem);
                }
            } catch (error) {
                // Handle any errors that occur during the request
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after the request completes
            }
        };
        fetchData();

    }, []); // Empty dependency array means this effect runs only once, on mount

    /*const displayArrayAsRows = (allPredictedPrice) => {
        return allPredictedPrice.map((item, index) => (
            <Table key={index} label="Apr 1" predictedPrice={item} actualPrice={"$13,123"} difference="$3212" accuracy="80%" /?
        ));
    };*/

    const renderItem = ({ item }) => (
        <View style={{ padding: 10 }}>
            <Text>{item}</Text>
        </View>
    );
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
        return `${year}-${month}-${day}`;
      };

    let dataArrayPredicted = [];
    let dataArrayActual = [];
    let dataArrayDate = [];
    let formattedDatesArray = []
    if (allPredictedPrice.length != 0 && allPredictedPrice != undefined){
        console.log("============actual price===============")
        console.log(allPredictedPrice)
        if (allPredictedPrice != null || allPredictedPrice != undefined) {
            dataArrayPredicted = Object.entries(allPredictedPrice).map(([key, value]) => value);
        }
        if (allActualPrice != null || allActualPrice != undefined) {
            dataArrayActual = Object.entries(allActualPrice).map(([key, value]) => value);
        }
        if (allFeaturesDate != null || allFeaturesDate != undefined) {
            dataArrayDate = Object.entries(allFeaturesDate).map(([key, value]) => value);
        }
        formattedDatesArray = dataArrayDate.map(formatDate);
        console.log(dataArrayDate);
        //DO NOTHING
    }else{
        console.log("============actual price not null===============")
        console.log(allPredictedPrice.length)
    }
    //if (allPredictedPrice === null){
        //DO NOTHING
   // }
   // else{
    //    if (allPredictedPrice != null || allPredictedPrice != undefined) {
       //     dataArrayActual = Object.entries(allActualPrice).map(([key, value]) => value);
     //   }
    //}
   
    
     // If data is null, display a loading message
 
   //console.log("===========all predicted price array================")
    //console.log(dataArrayPredicted);
    //console.log("============actual price===============")
    //console.log(dataArrayActual)


    return (
        <View>
             <View style={styles.header}>
                <Text>Marchine Learning for Bitcoin Price Prediction</Text>
                <RefreshButton label="Refresh" />
            </View>
            <Header label="Prediction" caption="Predictions" image="Prediction" />
            <View style={{ flexDirection: 'row' }}>
                {dataArrayDate != null ? (
                    <FlatList
                        data={dataArrayDate}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text>Loading...</Text>
                )}
                {allPredictedPrice != null ? (
                    <FlatList
                        data={dataArrayPredicted}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text>Loading...</Text>
                )}
                {dataArrayActual != null ? (
                    <FlatList
                        data={dataArrayActual}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </View>

    );
}
const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        width: '100%',
        height: '15%',
        backgroundColor: '#FCCB00',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    titleFont: {
        fontSize: 30,
        top: 5
    },
    predictionContainer: {
        alignSelf: 'flex-start',
        width: '100%',
        borderWidth: 1,
        alignSelf: 'center',
    },

    labelFont: {
        fontSize: 18,
    },
    pageOrganizer: {
        height: '100%',
        width: '99%',
        alignItems: 'center',
    },
    correlationView: {
        height: '50%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    predictorView: {
        height: '99%',
        width: '39%',
        alignItems: 'center',
        borderWidth: 1,
    },
    correlation: {
        width: '100%',
        borderWidth: 1
    },
    grapOrganizer: {
        flexDirection: 'row',
        height: '90%',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
    },
    predictorBackground: {
        borderWidth: 1,
        width: '100%',
        height: '55%',
    },
    containerHeader: {
        width: '100%',
        alignItems: 'flex-start',
    },
    filter: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: "#419BFE"

    }
});

export default PredictorScreen;
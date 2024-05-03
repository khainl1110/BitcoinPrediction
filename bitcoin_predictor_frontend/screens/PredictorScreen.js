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
    const [featuresDate, setFeaturesDate] = useState([]);
    const [featuresHigh, setFeaturesHigh] = useState([]);
    const [featuresLow, setFeaturesLow] = useState([]);
    const [featuresOpen, setFeaturesOpen] = useState([]);
    const [featuresClose, setFeaturesClose] = useState([]);
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true); // State variable to track loading state


    // Check if data has a value
    const hasData = predictions !== null && predictions !== undefined && predictions !== '';



    const currentDate = new Date();
    // Add one day to the current date
    const tomorrowDate = new Date(currentDate);
    const twoDayDate = new Date(currentDate);
    const threeDayDate = new Date(currentDate);
    const fourthDayDate = new Date(currentDate);
    const fifthDayDate = new Date(currentDate);
    const sixthDayDate = new Date(currentDate);
    const seventhDayDate = new Date(currentDate);

    tomorrowDate.setDate(currentDate.getDate() + 1);
    twoDayDate.setDate(currentDate.getDate() + 2);
    threeDayDate.setDate(currentDate.getDate() + 3);
    fourthDayDate.setDate(currentDate.getDate() + 4);
    fifthDayDate.setDate(currentDate.getDate() + 5);
    sixthDayDate.setDate(currentDate.getDate() + 6);
    seventhDayDate.setDate(currentDate.getDate() + 7);

    const tomorrowDay = String(tomorrowDate.getDate()).padStart(2, '0');
    const tomorrowMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const tomorrowYear = tomorrowDate.getFullYear();

    const twoDayDay = String(tomorrowDate.getDate()).padStart(2, '0');
    const twoDayMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const twoDayYear = tomorrowDate.getFullYear();

    const threeDayDay = String(tomorrowDate.getDate()).padStart(2, '0');
    const threeDayMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const threeDayYear = tomorrowDate.getFullYear();

    const fourthDayDay = String(tomorrowDate.getDate()).padStart(2, '0');
    const fourthDayMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const fourthDayYear = tomorrowDate.getFullYear();

    const fifthDayDay = String(tomorrowDate.getDate()).padStart(2, '0');
    const fifthDayMonth = String(tomorrowDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const fifthDayear = tomorrowDate.getFullYear();

    // Format the date as "YYYY-MM-DD"
    const tomorrowFormatted = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;
    const towDayFormatted = `${twoDayYear}-${twoDayMonth}-${twoDayDay}`;

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
                    setFeaturesDate(response.data.features.Date)
                    setFeaturesHigh(response.data.features.btcHigh)
                    setFeaturesLow(response.data.features.btcLow)
                    setFeaturesOpen(response.data.features.btcOpen)
                    setFeaturesClose(response.data.features.btcClose)
                    setPredictions(response.data.predictions)

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
        //fetchData();

    }, []); // Empty dependency array means this effect runs only once, on mount

    /*const displayArrayAsRows = (allPredictedPrice) => {
        return allPredictedPrice.map((item, index) => (
            <Table key={index} label="Apr 1" predictedPrice={item} actualPrice={"$13,123"} difference="$3212" accuracy="80%" /?
        ));
    };*/

    let dataArrayOpen = [];
    let dataArrayClose = [];
    let dataArrayDate = [];
    let dataArrayHigh = [];
    let dataArrayLow = [];
    let dataArrayPredictions = [];

    if (predictions.length != 0 && predictions != undefined) {
        console.log("============actual price===============")
        console.log(featuresDate)
        if (featuresOpen != null || featuresOpen != undefined) {
            dataArrayOpen = Object.entries(featuresOpen).map(([key, value]) => value);
        }
        if (featuresClose != null || featuresClose != undefined) {
            dataArrayClose = Object.entries(featuresClose).map(([key, value]) => value);
        }
        if (featuresDate != null || featuresDate != undefined) {
            dataArrayDate = Object.entries(featuresDate).map(([key, value]) => value);
        }
        if (featuresHigh != null || featuresHigh != undefined) {
            dataArrayHigh = Object.entries(featuresHigh).map(([key, value]) => value);
        }
        if (featuresLow != null || featuresLow != undefined) {
            dataArrayLow = Object.entries(featuresLow).map(([key, value]) => value);
        }
        if (predictions != null || predictions != undefined) {
            dataArrayPredictions = Object.entries(predictions).map(([key, value]) => value);
        }

        dataArrayDate.push(tomorrowFormatted);
        let reverseDataArrayOpen = dataArrayOpen.reverse();
        let reverseDataArrayClose = dataArrayClose.reverse();
        let reverseDataArrayDate = dataArrayDate.reverse();
        let reverseDataArrayHigh = dataArrayHigh.reverse();
        let reverseDataArrayLow = dataArrayLow.reverse();
        let reverseDataArrayPredictions = dataArrayPredictions.reverse();
        console.log(dataArrayOpen);
        console.log(dataArrayClose);
        console.log(dataArrayDate);
        //DO NOTHING
    } else {
        console.log("============actual price not null===============")
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


    return (
        <View>
            <View style={styles.header}>
                <Text>Marchine Learning for Bitcoin Price Prediction</Text>
                <RefreshButton label="Refresh" />
            </View>

            <Header label="Prediction" caption="Predictions" image="Prediction" />
            <TableHeader />


            <View style={{ flexDirection: 'row', width:'90%', alignSelf: 'center', height: 300, backgroundColor: 'red'}}>


                {dataArrayDate != null ? (
                    <FlatList
                        data={dataArrayDate}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={{ fontSize: 32 }}>Loading...</Text>
                )}
                {dataArrayPredictions != null ? (
                    <FlatList
                        data={dataArrayPredictions}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (

                    <Text style={{ fontSize: 32 }}>Loading...</Text>
                )}
                {dataArrayClose != null ? (
                    <FlatList
                        data={dataArrayClose}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (

                    <Text style={{ fontSize: 32 }}>Loading...</Text>
                )}
                {dataArrayOpen != null ? (
                    <FlatList
                        data={dataArrayOpen}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={{ fontSize: 32 }}>Loading...</Text>
                )}
                {dataArrayHigh != null ? (
                    <FlatList
                        data={dataArrayHigh}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={{ fontSize: 32 }}>Loading...</Text>
                )}
                 {dataArrayLow != null ? (
                    <FlatList
                        data={dataArrayLow}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={{ fontSize: 32 }}>Loading...</Text>
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
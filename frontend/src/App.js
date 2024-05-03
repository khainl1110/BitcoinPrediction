import logo from './logo.svg';
import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { create } from 'apisauce';

function App() {

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

  console.log("here")

    const fetchData = async () => {
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await fetch(`http://18.116.42.185/predict/${tomorrowFormatted}`);
        // Check if response is successful
        if (response.ok) {
          console.log("In response ok")
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
    console.log(dataArrayOpen)
  }

  const renderItem = ({ item }) => (
    <div style={{ padding: '10px' }}>
      <p>{item.name}</p>
    </div>
  );
  return (
    <div className="App">
      <header className="App-header">
        <text>hello</text>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {dataArrayOpen.map(item => (
            <li key={item.id}>
              {renderItem({ item })}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => fetchData()}>Add Item</button>
    </div>
  );
}

export default App;

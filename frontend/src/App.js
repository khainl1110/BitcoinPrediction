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
    //https://api.coindesk.com/v1/bpi/currentprice.json
    //http://18.116.42.185/predict/${tomorrowFormatted}
    try {
      const response = await fetch(`http://18.116.42.185/predict/${tomorrowFormatted}`).then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json(); // Parse JSON response
      })
        .then(data => {
          setFeaturesDate(data.features.Date)
          setFeaturesHigh(data.features.btcHigh)
          setFeaturesLow(data.features.btcLow)
          setFeaturesOpen(data.features.btcOpen)
          setFeaturesClose(data.features.btcClose)
          setPredictions(data.predictions)
          console.log(data.features.Date)
          setData(data); // Set the data in state
        })
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

  // Check if data has a value
  const hasData = predictions !== null && predictions !== undefined && predictions !== '';


  if (predictions.length != 0 && predictions != undefined) {
    console.log("============actual price===============")
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
    <div style={{ padding: '10px', borderBottom: '1px solid black'}}>
      <p>{item}</p>
    </div>
  );
  const renderHeader = (header) => (
    <div style={{ padding: '10px', fontWeight: 'bold', borderBottom: '1px solid black' }}>
      <p>{header}</p>
    </div>
  );
  return (
    <div className="App">
      <div style={{ display: 'flex',}}>
        
        <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
        {renderHeader('Date')}
          {dataArrayDate.map(item => (
            <li key={item.id}>
              {renderItem({ item })}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
          {renderHeader('Open')}
          {dataArrayOpen.map(item => (
            <li key={item.id}>
              {renderItem({ item })}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: 'none', padding: 0, marginRight: '5px' }}>
          {renderHeader('Close')}
          {dataArrayClose.map(item => (
            <li key={item.id}>
              {renderItem({ item })}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {dataArrayDate.map(item => (
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

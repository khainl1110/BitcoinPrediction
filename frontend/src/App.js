import logo from './logo.svg';
import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { create } from 'apisauce';

function App() {

  // State to store the input value
  const [inputValue, setInputValue] = useState('');
  const [dateSevenDaysBefore, setDateSevenDaysBefore] = useState('');
  const [dateSixDaysBefore, setDateSixDaysBefore] = useState('');
  const [dateFiveDaysBefore, setDateFiveDaysBefore] = useState('');
  const [dateFourDaysBefore, setDateFourDaysBefore] = useState('');
  const [dateThreeDaysBefore, setDateThreeDaysBefore] = useState('');
  const [dateTwoDaysBefore, setDateTwoDaysBefore] = useState('');


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
      const response = await fetch(`http://18.116.42.185/predict/${dateSixDaysBefore}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json(); // Parse JSON response
      })
        .then(data => {
          setFeaturesDate(data.predictions.Date)
          setFeaturesHigh(data.predictions.btcHigh)
          setFeaturesLow(data.predictions.btcLow)
          setFeaturesOpen(data.predictions.btcOpen)
          setFeaturesClose(data.predictions.btcClose)
          console.log(data.predictions.Date)
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

  // Check if data has a value
  const hasData = predictions !== null && predictions !== undefined && predictions !== '';

  if (featuresDate.length != 0 && featuresDate != undefined) {
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
    dataArrayDate.push(tomorrowFormatted);
    let reverseDataArrayOpen = dataArrayOpen.reverse();
    let reverseDataArrayClose = dataArrayClose.reverse();
    let reverseDataArrayDate = dataArrayDate.reverse();
    let reverseDataArrayHigh = dataArrayHigh.reverse();
    let reverseDataArrayLow = dataArrayLow.reverse();
    console.log(dataArrayOpen);
    console.log(dataArrayClose);
    console.log(dataArrayDate);
    //DO NOTHING
  } else {
    console.log("============actual price not null===============")
    console.log(dataArrayOpen)
  }
  const renderItem = ({ item }) => (
    <div style={{ padding: '10px', borderBottom: '1px solid black' }}>
      <p>{item}</p>
    </div>
  );
  const renderHeader = (header) => (
    <div style={{ padding: '10px', fontWeight: 'bold', borderBottom: '1px solid black' }}>
      <p>{header}</p>
    </div>
  );
  // Event handler to update the input value
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    // Calculate the date 7 days before if the entered value is a valid date
    const enteredDate = new Date(value);
    if (!isNaN(enteredDate.getTime())) {

      const sevenDaysBefore = new Date(enteredDate);
      sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);
      setDateSevenDaysBefore(sevenDaysBefore.toISOString().split('T')[0]);

      const dateSixDaysBefore = new Date(enteredDate);
      dateSixDaysBefore.setDate(dateSixDaysBefore.getDate() - 6);
      setDateSixDaysBefore(dateSixDaysBefore.toISOString().split('T')[0]);

      const dateFiveDaysBefore = new Date(enteredDate);
      dateFiveDaysBefore.setDate(dateFiveDaysBefore.getDate() - 5);
      setDateFiveDaysBefore(dateFiveDaysBefore.toISOString().split('T')[0]);

      const dateFourDaysBefore = new Date(enteredDate);
      dateFourDaysBefore.setDate(dateFourDaysBefore.getDate() - 4);
      setDateFourDaysBefore(dateFourDaysBefore.toISOString().split('T')[0]);

      const dateThreeDaysBefore = new Date(enteredDate);
      dateThreeDaysBefore.setDate(dateThreeDaysBefore.getDate() - 3);
      setDateThreeDaysBefore(dateThreeDaysBefore.toISOString().split('T')[0]);

      const dateTwoDaysBefore = new Date(enteredDate);
      dateTwoDaysBefore.setDate(sevenDaysBefore.getDate() - 2);
      setDateTwoDaysBefore(dateTwoDaysBefore.toISOString().split('T')[0]);

    } else {
      // Clear the calculated date if the entered value is not a valid date
      setDateSevenDaysBefore('');
      setDateSixDaysBefore('');
      setDateFiveDaysBefore('');
      setDateFourDaysBefore('');
      setDateThreeDaysBefore('');
      setDateTwoDaysBefore('');
    }
  };
  return (
    <div className="App">
      <div>
        <h2>Bitcoin Price Predictor:</h2>

        {/* Input field with date type */}
        <input
          type="date"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="YYYY-MM-DD"
        />
        {/* Display the calculated date 7 days before */}
        {dateSevenDaysBefore && (
          <p>Date 7 days before: {dateSevenDaysBefore}</p>
        )}
          {dateSixDaysBefore && (
          <p>Date 6 days before: {dateSixDaysBefore}</p>
        )}
      </div>

      <div style={{ display: 'flex', }}>
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
          {renderHeader('High')}
          {dataArrayHigh.map(item => (
            <li key={item.id}>
              {renderItem({ item })}
            </li>
          ))}
        </ul>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {renderHeader('Low')}
          {dataArrayLow.map(item => (
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

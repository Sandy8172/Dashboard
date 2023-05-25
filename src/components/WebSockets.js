import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../store/dataSlice";

function WebSockets() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // Create a new WebSocket instance
    const ws = new WebSocket("ws://172.16.1.24:3500/");
    // WebSocket event handlers
    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      // console.log("Received message:", event.data);
      try {
        const keyValuePairs = event.data.match(/"([^"]+)":([^,"{}[\]]+)/g);
        const receivedData = {};
        keyValuePairs?.forEach((pair) => {
          const [key, value] = pair.split(":");
          const cleanedKey = key.slice(1, -1).replace(/\\/g, "");
          receivedData[cleanedKey] = value;
          // console.log(receivedData);
        });
        setData([receivedData]);
      } catch (error) {
        console.log(error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  // console.log(data[0]?.[72749]);

  const sortedData = {};

  data.forEach((item) => {
    const exchangeInstrumentId = item.ExchangeInstrumentID;

    if (!sortedData.hasOwnProperty(exchangeInstrumentId)) {
      sortedData[exchangeInstrumentId] = [];
    }

    sortedData[exchangeInstrumentId].push(item);
  });

  const specificData = sortedData[data[0]?.ExchangeInstrumentID];
  const lastTradedPrice = specificData ? specificData[0].LastTradedPrice : null;
  // console.log(lastTradedPrice);
  dispatch(dataSliceActions.PNLhandler(data[0]?.[72749]));

  return (
    <div style={{ height: "50vh" }}>
      Last Traded Price: {lastTradedPrice} <br />
      {data[0]?.[72749]}
    </div>
  );
}

export default WebSockets;




// useEffect(() => {
//   const ws = new WebSocket("ws://103.168.211.34:3000/apimarketdata/socket.io/?token=YOUR_TOKEN");

//   ws.onopen = () => {
//     console.log("WebSocket connection established");
//   };

//   ws.onmessage = (event) => {
//     try {
//       const receivedData = JSON.parse(event.data.replace(/\//g, ""));
//       setData([receivedData]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   ws.onclose = () => {
//     console.log("WebSocket connection closed");
//   };

//   return () => {
//     ws.close();
//   };
// }, []);


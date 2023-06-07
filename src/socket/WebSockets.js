// import React, { useEffect, useState } from "react";
// import { dataSliceActions } from "../store/dataSlice";
// import { useDispatch } from "react-redux";

// function WebSockets() {
//   const [data, setData] = useState({});
//   const [dataArray, setDataArray] = useState([]);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     let ws = null;
//     let heartbeatInterval = null;

//     const connectWebSocket = () => {
//       ws = new WebSocket(
//         "ws://14.99.241.31:3000/apimarketdata/socket.io/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJYNTAxXzIwYzgxOTBlM2YxOGU3NzFkYjEzMzMiLCJwdWJsaWNLZXkiOiIyMGM4MTkwZTNmMThlNzcxZGIxMzMzIiwiaWF0IjoxNjg2MDI2MDM1LCJleHAiOjE2ODYxMTI0MzV9.z_28mlH4nLvVQWPL8DSnmHGLqS12xT6RNzhmaORt6mQ&userID=X501&publishFormat=JSON&broadcastMode=Full&transport=websocket&EIO=3"
//       );

//       ws.addEventListener("open", () => {
//         console.log("WebSocket connection established");
//         startHeartbeat();
//       });

//       ws.onmessage = (event) => {
//         const receivedData = event.data;
//         const regex = /^42\["1501-json-full",(.+)\]$/;
//         const match = receivedData.match(regex);

//         if (match) {
//           try {
//             const keyValuePairs = event.data.match(/"([^"]+)":([^,"{}[\]]+)/g);
//             const receivedData = {};
//             keyValuePairs?.forEach((pair) => {
//               const [key, value] = pair.split(":");
//               const cleanedKey = key.slice(1, -1).replace(/\\/g, "");
//               receivedData[cleanedKey] = value;
//               dispatch(dataSliceActions.socketDataHandler(receivedData))
//               // setData(receivedData);
//             });
//           } catch (error) {
//             console.log("Error parsing extracted data:", error);
//           }
//         }
//       };

//       ws.addEventListener("close", (event) => {
//         const { code, reason } = event;
//         console.log(`WebSocket connection closed with code ${code}: ${reason}`);
//         stopHeartbeat();
//         reconnect();
//       });

//       ws.addEventListener("error", (error) => {
//         console.log("WebSocket error:", error);
//       });
//     };

//     const startHeartbeat = () => {
//       ws.send("ping");
//       heartbeatInterval = setInterval(() => {
//         if (ws.readyState === WebSocket.OPEN) {
//           ws.send("ping");
//         }
//       }, 100);
//     };

//     const stopHeartbeat = () => {
//       clearInterval(heartbeatInterval);
//     };

//     const reconnect = () => {
//       // Reconnect after a delay
//       setTimeout(connectWebSocket, 100);
//     };

//     connectWebSocket();

//     return () => {
//       if (ws) {
//         ws.close();
//       }
//       stopHeartbeat();
//     };
//   }, []);

//   // const exchangeInstrumentID = data.ExchangeInstrumentID;
//   // const existingObject = dataArray.find(
//   //   (obj) => obj.ExchangeInstrumentID === exchangeInstrumentID
//   // );

//   // if (existingObject) {
//   //   Object.assign(existingObject, data);
//   // } else {
//   //   setDataArray((prev) => [...prev, data]);
//   //   // dataArray.push(data);
//   // }
//   // console.log(dataArray);

//   return (
//     <div>
//       {/* {dataArray.map((ele, ind) => (
//         <div key={ind}>
//           <strong>{ele.ExchangeInstrumentID} :</strong> {ind} :{" "}
//           {ele.LastTradedPrice}
//         </div>
//       ))} */}
//     </div>
//   );
// }

// export default WebSockets;

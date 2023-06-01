import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CollapsibleTable from "./CollapsibleTable";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../../../store/dataSlice";

function MainTable() {
  const [data, setData] = useState([]);
  const [formetedData, setFormetedData] = useState([]);
  const [tickerArray, setTickerArray] = useState([]);
  const dispatch = useDispatch();

  const dataFechHandling = () => {
    axios
      .get("http://172.16.1.24:8000/")
      .then((res) => {
        const transformedData = Object.entries(res.data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setData(transformedData);
      })
      .catch((err) => console.log(err.message));

    const MtMsum = data.reduce((pre, curr) => {
      return pre + curr.MtM;
    }, 0);
    dispatch(dataSliceActions.MtMhandler(MtMsum));

    const objdata = data.map(
      ({
        Buying_Avg_Price,
        Exchange_InstrumentID,
        Exchange_Segment,
        Index_Num,
        LTP,
        MtM,
        Option_Type,
        Realized,
        Sell_Qty,
        Selling_Avg_Price,
        Stopl_Loss_Price,
        Strategy_Name,
        Strategy_Status,
        Ticker,
        UnRealized,
        Buy_Qty,
        Net_Qty,
      }) => {
        return {
          Index_Num,
          Selling_Avg_Price,
          Buying_Avg_Price,
          Option_Type,
          Net_Qty,
          Sell_Qty,
          Buy_Qty,
          Exchange_InstrumentID,
          Exchange_Segment,
          LTP,
          Stopl_Loss_Price,
          Strategy_Name,
          Strategy_Status,
          Ticker,
          Realized,
          UnRealized,
          MtM,
        };
      }
    );
    setFormetedData(objdata);
    const tickerArr = [...new Set(formetedData.map((item) => item.Ticker))];
    setTickerArray(tickerArr);

    const sort = formetedData.sort((a, b) => a.Index_Num - b.Index_Num);
    dispatch(dataSliceActions.rowsHandler(sort));
  };
  const headData = [
    "Index_Num",
    "Selling_Avg_Price",
    "Buying_Avg_Price",
    "Option_Type",
    "Net_Qty",
    "Sell_Qty",
    "Buy_Qty",
    "Exchange_InstrumentID",
    "Exchange_Segment",
    "LTP",
    "Stopl_Loss_Price",
    "Strategy_Name",
    "Strategy_Status",
    "Ticker",
    "Realized",
    "UnRealized",
    "MtM",
  ];

  useEffect(() => {
    dataFechHandling();
  }, [data]);

  useEffect(() => {
    dispatch(dataSliceActions.headersHandler(headData));
  }, []);

  return (
    <>
      <CollapsibleTable tickerArray={tickerArray} />
    </>
  );
}

export default MainTable;

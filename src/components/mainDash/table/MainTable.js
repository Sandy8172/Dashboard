import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CollapsibleTable from "./CollapsibleTable";
import { useDispatch } from "react-redux";
import { dataSliceActions } from "../../../store/dataSlice";

function MainTable() {
  const [data, setData] = useState([]);
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
  };
  useEffect(() => {
    dataFechHandling();
  }, [data]);

  const dataFormation = () => {
    const MtMsum = data.reduce((pre, curr) => {
      return pre + curr.MtM;
    }, 0);
    const mergeRows = data.reduce((acc, obj) => {
      const { Index_Num, ...rest } = obj;
      if (!acc[Index_Num]) {
        acc[Index_Num] = { Index_Num, ...rest };
      } else {
        Object.keys(rest).forEach((key) => {
          if (typeof rest[key] === "number") {
            acc[Index_Num][key] += rest[key];
          }
        });
      }
      return acc;
    }, {});
    const mergedRows = Object.values(mergeRows);
    const formetedData = data.map(
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
    const sort = formetedData.sort((a, b) => a.Index_Num - b.Index_Num);
    dispatch(dataSliceActions.dataHandler({ MtMsum, mergedRows, sort }));
    const tickerArr = [...new Set(formetedData.map((item) => item.Ticker))];
    setTickerArray(tickerArr);

  };
  useEffect(() => {
    dataFormation();
  }, [data]);

  return (
    <>
      <CollapsibleTable tickerArray={tickerArray} />
    </>
  );
}

export default MainTable;

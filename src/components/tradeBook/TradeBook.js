import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./TradeBook.css";
import { useSelector } from "react-redux";

export default function TradeBook() {
  const { headData, rowData } = useSelector((state) => ({
    headData: state.data.headers,
    rowData: state.data.rows.map((row, index) => ({ id: index, ...row })),
  }));

  const columns = headData.map((ele) => ({
    field: ele,
    headerName: ele,
    width: 109,
  }));

  const customComponents = {
    Toolbar: GridToolbar,
  };

  return (
    <div className="data-grid-container tradeBook_wrapper">
      <h3 className="tradeBook_text">COMPLETED TRADES</h3>
      <DataGrid
        rows={rowData}
        columns={columns}
        components={customComponents}
        sx={{
          color: "white",
          height: "90%",
          border: "none",
          "& .MuiDataGrid-columnHeaderTitle, .MuiDataGrid-iconSeparator": {
            color: "white",
          },
        }}
      />
    </div>
  );
}

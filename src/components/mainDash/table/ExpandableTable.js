import { CSVLink } from "react-csv";
import React, { useState, useCallback, useEffect } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Box,
  Collapse,
  IconButton,
  Checkbox,
  Modal,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { footerSliceActions } from "../../../store/footerSlice";
import "./ExpandableTable.css";
// import { CSVLink } from "react-csv";
import GetAppIcon from "@mui/icons-material/GetApp";

const ExpandableTable = React.memo((props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedIndexes = useSelector((state) => state.footer.indexValue);
  const dispatch = useDispatch();
  const rowData = useSelector((state) => state.data.rows);
  const headData = useSelector((state) => state.data.headers);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "+") {
        setOpenModal(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleCheckboxChange = useCallback(
    (e) => {
      const Idx_Num = row.Index_Num;
      dispatch(footerSliceActions.toggleIndex(Idx_Num));

      if (!selectedIndexes.includes(Idx_Num) && e.target.checked) {
        e.target.checked = false;
      }
    },
    [dispatch, row.Index_Num, selectedIndexes]
  );

  const handleSubmit = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleOptionClick = useCallback((value) => {
    setInputValue(value);
  }, []);

  const handleRowClick = useCallback((rowData) => {
    setSelectedRowData(rowData);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
  }, []);

  const csvHeaders = headData.map((header) => ({ label: header, key: header }));
  const csvData = rowData.map((row) => ({
    ...row,
    MtM: parseFloat(row.MtM), // Convert MtM value to a number if needed
  }));

  const csvReport = {
    filename: "table_data.csv",
    headers: csvHeaders,
    data: csvData,
  };

  return (
    <React.Fragment>
      <TableRow sx={{ borderBottom: "2px solid #7b7b7b" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ color: "white" }}
            onClick={() => setOpen((prevState) => !prevState)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Checkbox
            color="success"
            onChange={handleCheckboxChange}
            checked={selectedIndexes.includes(row.Index_Num)}
            sx={{ color: "white" }}
          />
        </TableCell>
        <TableCell
          sx={{ color: "white" }}
          component="th"
          scope="row"
          align="center"
        >
          {row.Index_Num}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.Strategy_Name}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.MtM}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.Net_Qty}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.Sell_Qty}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.Buy_Qty}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table
                size="small"
                sx={{ width: "100%", ml: "1%", border: "2px #7b7b7b solid" }}
                aria-label="purchases"
              >
                <TableHead>
                  <TableRow sx={{ borderBottom: "2px #7b7b7b solid" }}>
                    <TableCell>
                      {open && (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            align="center"
                            sx={{ borderBottom: "none" }}
                          >
                            <CSVLink
                              data={csvData}
                              filename={"selected_row_data.csv"}
                              target="_blank"
                              className="export-button"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<GetAppIcon />}
                              >
                                Export
                              </Button>
                            </CSVLink>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableCell>
                    {headData.map((ele, ind) => (
                      <TableCell
                        sx={{ color: "white" }}
                        key={ind}
                        align="center"
                      >
                        {ele}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.map((ele, ind) => {
                    const meetsCondition = ele.Index_Num === row.Index_Num;
                    const hasNonEmptyCells = headData.some((item) => ele[item]);
                    if (meetsCondition && hasNonEmptyCells) {
                      return (
                        <TableRow
                          sx={{
                            color: "white",
                            borderBottom: "2px solid #7b7b7b",
                          }}
                          key={ind}
                          onClick={() => handleRowClick(ele)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell></TableCell>
                          {headData.map((item, ind) => (
                            <TableCell
                              sx={{ color: "white" }}
                              component="th"
                              scope="row"
                              key={ind}
                              align="center"
                            >
                              {ele.Index_Num === row.Index_Num && ele[item]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {open && selectedRowData && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="custom-modal-title"
        >
          <div className="modalContent">
            <div className="container">
              <h2 className="popUp_heading">Derivates Buy Order</h2>
              <h2>Ticker: {selectedRowData?.Ticker}</h2>
              <h2>Option Type: {selectedRowData?.Option_Type}</h2>
            </div>

            <div className="wrapper">
              <TextField
                label="QTY"
                value={inputValue}
                onChange={handleInputChange}
                style={{ height: "40px" }}
                className="textFieldStyle"
                InputProps={{
                  style: {
                    borderColor: "white",
                    color: "white",
                    outlineColor: "white",
                  },
                  endAdornment: (
                    <Button
                      onClick={handleDropdownToggle}
                      endIcon={<ExpandMoreIcon />}
                    />
                  ),
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
              />
              {isDropdownOpen && (
                <div>
                  <MenuItem onClick={() => handleOptionClick("25%")}>
                    25%
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionClick("50%")}>
                    50%
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionClick("75%")}>
                    75%
                  </MenuItem>
                </div>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className="buttonStyle"
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
});

export default ExpandableTable;

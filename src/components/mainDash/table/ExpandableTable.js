import React, { useState,useCallback } from "react";
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
import { dataSliceActions } from "../../../store/dataSlice";
import "./ExpandableTable.css";

const ExpandableTable = React.memo((props) => {
  const { row, rowData, headData } = props;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedIndexes = useSelector((state) => state.indexValue);
  const dispatch = useDispatch();

  const handleCheckboxChange = useCallback((e) => {
    const Idx_Num = row.Index_Num;
    dispatch(dataSliceActions.toggleIndex(Idx_Num));

    if (!selectedIndexes.includes(Idx_Num) && e.target.checked) {
      e.target.checked = false;
    }
  }, [dispatch, row.Index_Num, selectedIndexes]);

  const handleSubmit = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleOptionClick = useCallback((value) => {
    setInputValue(value);
  }, []);

  const handleRowClick = useCallback(
    (rowData) => {
      setSelectedRowData(rowData);
      setOpenModal(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
  }, []);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
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
          />
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.Index_Num}
        </TableCell>
        <TableCell align="center">{row.Strategy_Name}</TableCell>
        <TableCell align="center">{row.MtM}</TableCell>
        <TableCell align="center">{row.Net_Qty}</TableCell>
        <TableCell align="center">{row.Sell_Qty}</TableCell>
        <TableCell align="center">{row.Buy_Qty}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {headData.map((ele, ind) => (
                      <TableCell key={ind} align="center">
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
                          key={ind}
                          onClick={() => handleRowClick(ele)}
                          style={{ cursor: "pointer" }}
                        >
                          {headData.map((item, ind) => (
                            <TableCell
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
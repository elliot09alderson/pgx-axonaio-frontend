import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PaymentMode, ReportsType, Status } from "../../dummy/Data";
import onFailure from "../../utils/error";
import DropdownbuiltList from "../molecules/DropdownbuiltList";
import TwoDatePick from "../molecules/TwoDatePick";
import { BASE_URL } from "../../utils/requestMethod";
import moment from "moment-timezone";
import { GrClose } from "react-icons/gr";

const GenerateReportPop = ({ onClose, onSetTableData, setIsOpen }) => {
  const tz = "Asia/Kolkata";
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  function handlePaymentSelect(item) {
    setSelectedPayment(item);
  }
  function handleStatusSelect(item) {
    setSelectedStatus(item);
  }
  function handleTypeSelect(item) {
    setSelectedType(item);
  }
  function handleStartDate(date) {
    setStartDate(date);
  }
  function handleEndDate(date) {
    setEndDate(date);
  }
  const currentDate = moment().tz(tz).toDate();
  const onHandleClick = async () => {
    try {
      if (selectedPayment && selectedStatus && selectedType) {
        axios({
          method: "post",
          url: `${BASE_URL}/reports/create`,
          data: {
            from: moment(startDate).tz(tz).startOf("day"),
            to: moment(endDate).tz(tz).endOf("day"),
            mode: String(selectedPayment).toLowerCase(),
            status: String(selectedStatus).toLowerCase(),
            type: String(selectedType).toLowerCase(),
            report_date: currentDate,
          },
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Accept:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
          },
        }).then(function (response) {
          console.log("Excel file received from server:", response);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("URL created for the Excel file:", url);
          const a = document.createElement("a");
          a.href = url;
          a.download = "data.xlsx";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          onSetTableData();
          onClose();
        });
      } else {
        enqueueSnackbar("please select all options!");
      }
    } catch (error) {
      console.log("hiiiii errrott", error);
      onFailure(error);
    }
  };

  return (
    <div
      className={`flex absolute top-0 left-0 sm:-top-2 sm:left-72 third-bg   rounded-xl px-4 mx-1`}
      style={{ filter: "none ", backdropFilter: "none" }}
    >
      <div className="absolute block  top-2 right-5 ">
        <GrClose
          size={24}
          onClick={(e) => {
            setIsOpen(false);
            
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-col mt-4 gap-2 ">
        <TwoDatePick
          startDate={startDate}
          endDate={endDate}
          handleStartDate={handleStartDate}
          handleEndDate={handleEndDate}
        />
        <div className="flex flex-wrap flex-col gap-4">
          <DropdownbuiltList
            items={PaymentMode}
            selectedItem={selectedPayment}
            onItemSelect={handlePaymentSelect}
            label="PaymentMode"
          />
          <DropdownbuiltList
            items={Status}
            selectedItem={selectedStatus}
            onItemSelect={handleStatusSelect}
            label="Status"
          />
          <DropdownbuiltList
            items={ReportsType}
            selectedItem={selectedType}
            onItemSelect={handleTypeSelect}
            label="Reports"
          />
        </div>
        <div className="flex items-center justify-between  my-3">
          <button
            className="py-1 px-3 border rounded-lg second-bg fourth-text "
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="py-1 px-3 border rounded-lg second-bg fourth-text "
            onClick={onHandleClick}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportPop;

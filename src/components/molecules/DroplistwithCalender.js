import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import onFailure from '../../utils/error';
import CalendarLayout from '../Layout/CalenderLayout';
import { getDateTimeRange } from '../../utils/formateDate';
import { BASE_URL } from "../../utils/requestMethod";
import axios from 'axios';
const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 20px auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 40%;
  padding: 10px;
  margin: 0;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  list-style: none;
  z-index: 100;
`;

const ListItem = styled.li`
  cursor: pointer;
  padding: 10px;
  &:hover{
    background: #26b24b;
  }
`;

const SearchWithDropdownAndCalendar = ({ onHandleCardValue }) => {
  const constantOptions = [
    "Today",
    "This Month",
    "Last Month",
    "Custom Data Range",
  ];
  const [selectedOption, setSelectedOption] = useState(constantOptions[0]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const fetchTransactiondata = async ({ from, to }) => {
    try {
      const res = await axios.get(`${BASE_URL}/transaction/dashboard/transactionstats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
        },
        params: {
          from: from,
          to: to,
        },
      });
      const res2 = await axios.get(`${BASE_URL}/transaction/dashboard/dashboardGraphData`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
        },
        params: {
          from: from,
          to: to,
        },
      });
      onHandleCalender(res.data, res2.data)
    } catch (error) {
      let status = onFailure(error);
      if (status) onHandleCalender([]);
      return null;
    }
  };
  const fetchTransactionByTime = async (time) => {
    try {
      // setOpenCalender(false);
      if (time === 0) {
        await fetchTransactiondata(
          getDateTimeRange('day')
        );
      } else if (time === 1) {
        await fetchTransactiondata(getDateTimeRange('month'));
      } else if (time === 2) {
        await fetchTransactiondata(getDateTimeRange('lastmonth'));
      }
    } catch (error) {
      let status = onFailure(error);
      if (status) onHandleCalender([]);
    }
  };
  const onChangeHandler = (item) => {
    switch (item) {
      case constantOptions[0]:
        fetchTransactionByTime(0);
        break;
      case constantOptions[1]:
        fetchTransactionByTime(1);
        break;
      case constantOptions[2]:
        fetchTransactionByTime(2);
        break;
      default:
      // setOpenCalender(true);
    }
  };
  const handleInputClick = () => {
    setShowCalendar(false);
    setShowDropdown(true);
  };

  const handleListItemClick = (value) => {
    setSelectedOption(value);
    if (value === constantOptions[3]) {
      setShowCalendar(value === constantOptions[3]);
      setShowDropdown(false);
    } else {
      setShowDropdown(false);
    }
    onChangeHandler(value)
  };
  const onHandleListData = async () => {
  }
  const onHandleCalender = async (data, data2) => {
    setShowCalendar(false);
    setShowDropdown(false)
    onHandleCardValue(data, data2)
  };
  useEffect(() => {
    onChangeHandler(constantOptions[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Container>
        <Input onClick={handleInputClick} value={selectedOption} onChange={onHandleListData} />
        {showDropdown && (
          <DropdownList>
            {
              constantOptions.map((item, index) => {
                return <ListItem onClick={() => handleListItemClick(item)} key={index}>{item}</ListItem>
              })
            }
          </DropdownList>
        )}
      </Container>
      {showCalendar && (
        <CalendarLayout onHandleCalender={onHandleCalender} mode='change' left='250px' top='200px' />
      )}
    </>
  );
};

export default SearchWithDropdownAndCalendar;

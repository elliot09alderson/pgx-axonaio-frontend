import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CheckoutLayOut from "../molecules/checkout/CheckoutLayOut";
import { paymentValidation } from "../../utils/paymentValidation";
import { areAllValuesNull } from "../../utils/objectKeyNullOrNot";
import axios from "axios";
import onFailure from "../../utils/error";
import { BASE_URL } from "../../utils/requestMethod";
import TextCard from "../molecules/TextCard";
import Search from "../molecules/Serach";
import moment from 'moment-timezone'
const StyledFormContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  /* background-image: url(${"https://pg.finxpay.in/assets/img/paylink-background.jpg"}); */
  background-size: cover;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  margin: 10px 0px;
  padding: 15px 25px;
  background-color: #178ddb;
  color: #fff;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: #005fa3;
  }
`;

const StyledPopupForm = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow-y: auto;
  width: 60%;
`;
const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: null,
    phoneNumber: "",
    fxLinkID: '',
    notes: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState({});
  const popupRef = useRef();
  const tz = 'Asia/Kolkata'
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let tempError = paymentValidation(formData);
      if (areAllValuesNull(tempError)) {
        setError({});
        await axios.patch(`${BASE_URL}/paylink/update`, null, {
          params: { name: formData?.name, email: formData?.email, fxLinkID: formData?.fxLinkID },
          headers: { Authorization: `Bearer ${localStorage.getItem("is_logged_in")}` },
        })
        const currentDate = moment().tz(tz).toDate()
        const res = await axios.post(
          `${BASE_URL}/order/create`,
          {
            "amount": formData?.amount,
            "createdAt": currentDate,
            "customerEmail": formData?.email,
            "customerName": formData?.name,
            "customerPhone": formData?.phoneNumber,
            "notes": formData?.notes,
            "paymentRequestId": formData?.fxLinkID,
            "paymentStatus": "Created"
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
            },
          }
        );
        setShowPopup(true);
        if (res.data) {
        }
      } else {
        setError(tempError);
      }

    } catch (error) {
      console.log(error);
      onFailure(error)
    }

  };
  const onHandleDataSet = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const handlePopupSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Popup form submitted");
  //   setShowPopup(false);
  // };
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };
  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  useEffect(() => {
    const fetchPayLinkData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/paylink/fetch/url`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
          },
          params: {
            shortUrl: localStorage.getItem("shortUrl")
          },
        });
        if (res.data) {
          console.log(res.data);
          let daata = res.data[0]
          setFormData({ ...formData, ...daata })
        }
      } catch (error) {
        console.log(error);
        onFailure(error);
      }
    };
    fetchPayLinkData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <StyledFormContainer>
        <TextCard description={formData?.notes} amount={formData?.amount} />
        <StyledForm onSubmit={handleSubmit}>
          <Search label="Name" value={formData?.name} onChange={onHandleDataSet} type="text" name="name" plcaeholder="Name" error={error} pd="15px" />
          <Search label="Email" value={formData?.email} onChange={onHandleDataSet} type="email" name="email" plcaeholder="Email" error={error} pd="15px" />
          <Search label="Mobile" value={formData?.phoneNumber} onChange={onHandleDataSet} type="text" plcaeholder="Phonenumber" error={error} pd="15px" />
          <Search label="Amount" value={formData?.amount} onChange={onHandleDataSet} type="number" plcaeholder="Amount" error={error} pd="15px" />
          <StyledButton type="submit">Proceed To Pay</StyledButton>
        </StyledForm>

        {showPopup && (
          <>
            <StyledBackground />
            <StyledPopupForm ref={popupRef}>
              <CheckoutLayOut />
            </StyledPopupForm>
          </>
        )}
      </StyledFormContainer>
    </>
  );
};

export default PaymentForm;

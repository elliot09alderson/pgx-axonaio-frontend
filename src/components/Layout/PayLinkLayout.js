import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import styled from "styled-components";
import { areTwoValueNull } from "../../utils/objectKeyNullOrNot";
import { validationForm } from "../../utils/validation";
import { ErrorPara } from "../OnboardingFormComponent/BusinessComponent";
import DropdownbuiltList from "../molecules/DropdownbuiltList";
import Search from "../molecules/Serach";
import TextareaWithLabel from "../molecules/TextareaWithLabel";
import LeftRightDropdown from "./DropdownWithRightSearch";
import { BASE_URL } from "../../utils/requestMethod";
import onFailure from "../../utils/error";
import { addDaysToCurrentDate } from "../../dummy/noOfHours";
import { setUpTableValue } from "../../utils/TableData";
import { Button, Modal, Select } from "flowbite-react";
import moment from "moment-timezone";

export const PhoneLabel = styled.label`
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
`;
const PayLinkLayout = ({
  onClick,
  onHandleTableValue,
  headers,
  setIsOpenPayment,
}) => {
  const [openModal, setOpenModal] = useState("placement");
  const [modalPlacement, setModalPlacement] = useState("center");
  const props = { modalPlacement, openModal, setModalPlacement, setOpenModal };

  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState({});
  const items = ["12 hours", "1 Day", "2 Days", "7 Days", "14 Days", "30 Days"];
  const [selecAllItem, setSelectAllItems] = useState({
    notes: "",
    amount: "",
    linkExpiry: items[5],
    phoneNo: "",
    emailID: "",
    name: "",
  });
  const onHandleItemSelect = (item) => {
    setSelectAllItems({ ...selecAllItem, linkExpiry: item });
  };
  const onHandleSelectAllItems = (e) => {
    setSelectAllItems({ ...selecAllItem, [e.target.name]: e.target.value });
  };

  const onHandlePayLink = async () => {
    let checkPayLinkValues = areTwoValueNull(selecAllItem);
    if (checkPayLinkValues) {
      let errorCheck = validationForm({ phoneNo: selecAllItem?.phoneNo });
      console.log(checkPayLinkValues, errorCheck);
      if (errorCheck === null) {
        setError({});
        let linkExpire;
        if (selecAllItem?.linkExpiry === "12 hours") {
          linkExpire = addDaysToCurrentDate(".5 Day");
        } else {
          linkExpire = addDaysToCurrentDate(selecAllItem?.linkExpiry);
        }
        // const currentDate = new Date().toISOString();
        const tz = "Asia/Kolkata";
        const currentDate = moment().tz(tz).toDate();
        // const currentDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        try {
          const res = await axios.post(
            `${BASE_URL}/paylink/create`,
            {
              createdAt: currentDate,
              amount: selecAllItem?.amount,
              name: selecAllItem?.name,
              phoneNo: selecAllItem?.phoneNo,
              emailID: selecAllItem?.emailID,
              linkExpire: linkExpire,
              description: selecAllItem?.notes,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
              },
            }
          );
          if (res.data) {
            onClick();
            console.log("inside paylink", res.data);
            let result = await setUpTableValue([res.data], headers);
            onHandleTableValue(result, 2);
          }
        } catch (error) {
          console.log(error);
          onFailure(error);
        }
      } else {
        setError({ ...error, phoneNo: errorCheck["phoneNo"] });
      }
    } else {
      enqueueSnackbar("Please fill up mandatory details!");
    }
  };
  return (
    <Modal
      show={props.openModal === "placement"}
      position={props.modalPlacement}
      onClose={() => {
        props.setOpenModal(undefined);
        setIsOpenPayment(false);
      }}
      className="cross focus:outline-none"
    >
      <Modal.Header className="first-bg fourth-text h-20">
        <h2 className="text-center fourth-text text-xl font-bold ">
          Create Payment Link{" "}
        </h2>
      </Modal.Header>
      <Modal.Body className="bg-white">
        <div className=" w-full ">
          <div className="flex flex-col px-4 justify-center  p-2 my-2 mb-4 gap-4">
            <TextareaWithLabel
              label="Payment For"
              name="notes"
              value={selecAllItem?.notes}
              onChange={onHandleSelectAllItems}
            />
            <Search
              label="Amount"
              value={selecAllItem?.amount}
              onChange={onHandleSelectAllItems}
              name="amount"
              type="text"
            />
            <DropdownbuiltList
              label="Link Expiry"
              selectedItem={selecAllItem?.linkExpiry}
              onItemSelect={onHandleItemSelect}
              items={items}
            />
            <div>
              <label className="text-xs font-bold first-text sm:text-sm focus:select-none sm:font-semibold ">
                Phone Number
              </label>
              <LeftRightDropdown
                name="phoneNo"
                searchText={selecAllItem?.phoneNo}
                onHandleSearchText={onHandleSelectAllItems}
              />
            </div>
            <ErrorPara>{error["phoneNo"] ? error["phoneNo"] : ""}</ErrorPara>
            <Search
              label="Email ID"
              optional
              name="emailID"
              value={selecAllItem?.emailID}
              onChange={onHandleSelectAllItems}
              type="email"
            />
            <Search
              label="Name"
              optional
              name="name"
              value={selecAllItem?.name}
              onChange={onHandleSelectAllItems}
              type="text"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-gray-400 border h-16 sm:h-20 bg-white">
        <div className="flex items-center justify-between w-full sm:px-5 px-0  ">
          <Button
            onClick={() => {
              props.setOpenModal(undefined);
              onClick();
            }}
            className="sm:px-3 px-1  sm:py-1  rounded-lg bg-red-500  text-white"
          >
            Cancel
          </Button>
          <Button
            className="sm:px-3 px-1  sm:py-1 rounded-lg  bg-green-500 text-white"
            onClick={() => {
              props.setOpenModal(undefined);
              onHandlePayLink();
            }}
          >
            Create
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default PayLinkLayout;

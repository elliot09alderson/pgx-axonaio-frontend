import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { margin } from "@mui/system";
import axios from "axios";

function FormSubmission(form) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({});
  const [step1Valid, setStep1Valid] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const checkStep1Form = () => {
    if (
      companyName === "" ||
      businessType === "" ||
      businessCategory === "" ||
      description === "" ||
      website === "" ||
      city === "" ||
      state === "" ||
      address === "" ||
      pincode === ""
    ) {
      console.log("1");
      console.log(
        companyName,
        businessType,
        businessCategory,
        description,
        website,
        city,
        state,
        address,
        pincode
      );

      return false;
    } else {
      console.log("2");
      console.log(
        companyName,
        businessType,
        businessCategory,
        description,
        website,
        city,
        state,
        address,
        pincode
      );
      return true;
    }
  };

  const { Option } = Select;
  const types = ["image/png", "image/jpeg", "image/gif"];
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailFormItemLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  console.log("tailFormItemLayout ->", tailFormItemLayout);

  const nextStep = (stepValues) => {
    setValues({ ...values, ...stepValues });
    setStep(step + 1);
  };

  const BusinessDetails = ({ nextStep }) => {
    const { getFieldDecorator } = form;
  };
  const handleClick3 = () => {
    setStep(3);
  };
  const handleClick2 = () => {
    setStep(2);
  };
  const handleClick1 = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form
      .validateFields((err, formValues) => {
        if (!err) {
          setFormValid(true);
          nextStep(formValues);
        } else {
          console.log("err", err);
        }
      })
      .catch((err) => console.error(err));
  };
  const handleSubmitStep1 = (e) => {
    // e.preventDefault()

    const step1 = {
      companyName,
      businessType,
      businessCategory,
      description,
      website,
      city,
      state,
      address,
      pincode,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/businessdetails`, step1)
      .then((res) => {
        "details successfully submitted";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange1 = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png, jpeg, gif).");
    }
  };
  const handleChange2 = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile1(selected);
      setError1("");
    } else {
      setFile1(null);
      setError1("Please select an image file (png, jpeg, gif).");
    }
  };
  const handleChange3 = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile2(selected);
      setError2("");
    } else {
      setFile2(null);
      setError2("Please select an image file (png, jpeg, gif).");
    }
  };

  const { getFieldDecorator } = form;

  return (
    <Form
      name="wrap"
      // labelCol={{ flex: '110px' }}
      // labelAlign="center"
      labelWrap
      // wrapperCol={{ flex: 1 }}
      // colon={false}
      // style={{ maxWidth: 600 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          // height: '100vh',
          // width: '100vw',
        }}
      >
        <div
          style={{
            width: "30vw",
            height: "100vh",
            borderRight: "1px solid lightgray",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          {/* <DatePicker /> */}
          <Button theme style={{ margin: "1em 0" }} onClick={handleClick1}>
            Business Details
          </Button>
          <Button style={{ margin: "1em 0" }} onClick={handleClick2}>
            Bank Details
          </Button>
          <Button style={{ margin: "1em 0" }} onClick={handleClick3}>
            Document Uploaded Details
          </Button>
        </div>

        {/* <div
        style={{
          width: '70%',
          // margin: '100px',
          // marginLeft: '100px',
          height: '100vh',
        }}
      > */}
        {step === 1 ? (
          <>
            <div
              style={{
                width: "70%",
                // margin: '100px',
                // marginLeft: '100px',
                height: "100vh",
                margin: "30px",
              }}
            >
              <Form.Item label="Company Name">
                <Input
                  value={companyName}
                  onChange={(event) => {
                    setCompanyName(event.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Business Type">
                <Select
                  onChange={(event) => {
                    setBusinessType(event);
                  }}
                  value={businessType}
                >
                  <Option value="soleProprietorship">
                    Sole Proprietorship
                  </Option>
                  <Option value="partnership">Partnership</Option>
                  <Option value="privateLimitedCompany">
                    Private Limited Company
                  </Option>
                  <Option value="publicLimitedCompany">
                    Public Limited Company
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="Business Category">
                <Select
                  value={businessCategory}
                  onChange={(event) => {
                    console.log(event);
                    setBusinessCategory(event);
                  }}
                >
                  <Option value="manufacturing">Manufacturing</Option>
                  <Option value="trading">Trading</Option>
                  <Option value="service">Service</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Description">
                <Input
                  required
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Website">
                <Input
                  required
                  value={website}
                  onChange={(event) => {
                    setWebsite(event.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="City">
                <Input
                  required
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="State">
                <Input
                  required
                  value={state}
                  onChange={(event) => {
                    setState(event.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Address">
                <Input
                  required
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Pincode">
                <Input
                  required
                  value={pincode}
                  onChange={(event) => {
                    setPincode(event.target.value);
                  }}
                />
                <Button
                  style={{ marginTop: "30px", margin: "10px" }}
                  onClick={() => {
                    handleSubmitStep1();
                    console.log("handleSubmitStep1 -> ", handleSubmitStep1());

                    if (checkStep1Form()) setStep(2);
                  }}
                >
                  Next
                </Button>
              </Form.Item>
              {/* <div class="form-group">
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Input class="form-control form-control"
                  value={companyName}
                  placeholder="companyName"
                  onChange={(event) => {
                    setCompanyName(event.target.value)
                  }}
                />
                <Button
                  style={{ marginTop: '30px', margin: '10px' }}
                  onClick={() => { handleSubmitStep1()
                    console.log('handleSubmitStep1 -> ', handleSubmitStep1())


                    if (checkStep1Form()) setStep(2)
                  }}
                >
                  Next
                </Button>
              </div> */}
            </div>
          </>
        ) : step === 2 ? (
          <>
            {/* <Form {...formItemLayout} onSubmit={handleSubmit}> */}
            <div
              style={{
                width: "70%",
                // margin: '100px',
                // marginLeft: '100px',
                height: "100vh",
                margin: "30px",
              }}
            >
              <Form.Item label="Account Holder Name">
                <Input />
              </Form.Item>
              <Form.Item label="Account type">
                <Select>
                  <Option value="soleProprietorship">Current Account</Option>
                  <Option value="partnership">Savings Account</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Account Number">
                <Input />
              </Form.Item>
              <Form.Item label="Confirm AN">
                <Input />
              </Form.Item>
              <Form.Item label="IFSC Code">
                <Input />
              </Form.Item>
              <Form.Item label="Branch Name">
                <Input />
                <Button
                  style={{ marginTop: "30px", margin: "10px" }}
                  onClick={() => {
                    setStep(3);
                  }}
                >
                  Next
                </Button>
                <Button
                  style={{ marginTop: "30px" }}
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Back
                </Button>
              </Form.Item>
            </div>
            {/* </Form> */}
          </>
        ) : (
          <>
            {/* <Form {...formItemLayout} > */}
            <div
              style={{
                width: "70%",
                // margin: '100px',
                // marginLeft: '100px',
                height: "100vh",
                margin: "30px",
                // wordBreak:'break-all'
                wordWrap: "break-word",
              }}
            >
              <Form.Item label="PAN Number">
                <Input />
                <input type="file" onChange={handleChange1} />
                <div className="output">
                  {error2 && <div className="error">{error2}</div>}
                  {file2 && <div>{file2.name2}</div>}
                </div>
              </Form.Item>

              <Form.Item label="Aadhar/ Voter Id/ Passport/ DL Number">
                <Input />
                <input type="file" onChange={handleChange2} />
              </Form.Item>
              <Form.Item label="GST Number(optional)">
                <Input />
              </Form.Item>
              <Form.Item label="Cancelled Cheque">
                <Input />
                <input type="file" onChange={handleChange3} />
                <div className="output">
                  {error2 && <div className="error">{error2}</div>}
                  {file2 && <div>{file2.name2}</div>}
                </div>
              </Form.Item>
              <Form.Item label="Company Pan">
                <Input />
              </Form.Item>
              <Form.Item label="Registration Certificate">
                <Input />
                <Button
                  style={{ marginTop: "30px", margin: "10px" }}
                  onClick={() => {
                    handleSubmit();
                    console.log("handleSubmit ->", handleSubmit);
                  }}
                >
                  Submit
                </Button>
                <Button
                  style={{ marginTop: "30px" }}
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Back
                </Button>
              </Form.Item>
              {/* </Form> */}
            </div>
          </>
        )}
      </div>
    </Form>
  );
}
export default FormSubmission;

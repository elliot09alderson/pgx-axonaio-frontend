import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/OnboardingFormComponent/BusinessComponent";
import axios from "axios";
import { useNavigate } from "react-router";

const Title = styled.h4``;

const EmailVerifyPage = () => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    if (isValid) {
      const newWindow = window.open("", "_self");
      window.close();
      newWindow.close();
      navigate("/merchants/login");
    } else {
      navigate("/merchants/signup");
    }
  };

  useEffect(() => {
    let token = window.location.search.substring(7);
    const checkEmail = async () => {
      const res = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/email-verify`,
        null,
        { params: { token: token } }
      );
      if (res.data) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    checkEmail();
  }, []);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Title>
        {isValid
          ? "Email has verified, please explore the platform!"
          : "Token has expired, please signup again!"}
      </Title>
      <Button onClick={handleClick}>{isValid ? "Login" : "Signup"}</Button>
    </div>
  );
};

export default EmailVerifyPage;

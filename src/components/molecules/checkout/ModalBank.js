import React from 'react'
import styled from 'styled-components'
import { NetBankingData } from '../../../utils/checkoutData'
import { CheckoutCardColBankIcon, CheckoutCardColBankImg, CheckoutCardColBankName, CheckoutCardColBankPara } from './NetBankingLayout'
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1055;
  display: none;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`
const ModalDialog = styled.div`
  max-width: 360px;
  transform: none;
  transition: transform .3s ease-out;
  margin: 1.75rem auto;
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
  display: flex;
  align-items: center;
`
const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 0.3rem;
  outline: 0;
  padding: 20px;
`
const ModalHeaderDiv = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid rgba(231, 234, 252, 0.75);
  background: #4B00D4;
  border-radius: 7px;
  color: #fff;
`
const ModalHeaderTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
`
const ModalHeaderButton = styled.button`
  background-color: #FF5B37;
  border-radius: 50%;
  border: 2px solid #FF5B37;
  color: #fff;
  font-size: 18px;
  height: 26px;
  margin: 0;
  opacity: 1;
  padding: 0;
  right: 10px;
  width: 26px;
  z-index: 99;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
`
const ModalHeaderSpan = styled.span`
  color: #fff;
  font-size: 18px;
`
const ModalBody = styled.div`
  padding: 30px;
  position: relative;
  flex: 1 1 auto;
`
const ModalBankSelection = styled.div`
  max-height: 400px;
  overflow-y: auto;
`
const ModalBankOptions = styled.div`
 align-items: center!important;
 display: flex!important;
`
const ModalBankOptionsLabel = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 27px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  user-select: none;
`
const ModalBankOptionsInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`
const ModalBankOptionsSpan = styled.span`
  position: absolute;
    top: 3px;
    left: 0;
    width: 18px;
    height: 18px;
    margin: 1px 0 0 0;
    border: 1px solid #4B00D4;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
`
const ModalButtonDiv = styled.div`
  pointer-events: auto;

`
const ModalButton = styled.button`
  font-size: 16px;
    font-weight: 700;
    color: #fff;
    background-color: #4B00D4;
    border: 1px solid #4B00D4;
    box-shadow: inset 0 0 0 0 #ffffff;
    border-radius: 4px;
    padding: 12px 30px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    -webkit-transition: 0.7s;
    -moz-transition: 0.7s;
    -o-transition: 0.7s;
    transition: 0.7s;
`
const ModalBank = () => {
  return (
    <ModalContainer>
      <ModalDialog>
        <ModalContent>
          <ModalHeaderDiv>
            <ModalHeaderTitle>
              Select Your Bank
            </ModalHeaderTitle>
            <ModalHeaderButton>
              <ModalHeaderSpan>×</ModalHeaderSpan>
            </ModalHeaderButton>
          </ModalHeaderDiv>
          <ModalBody>
            <ModalBankSelection>
              {NetBankingData.map((item, index) => {
                return (
                  <ModalBankOptions key={index}>
                    <ModalBankOptionsLabel>
                      <ModalBankOptionsInput type="radio" />
                      <ModalBankOptionsSpan></ModalBankOptionsSpan>
                    </ModalBankOptionsLabel>
                    <CheckoutCardColBankName>
                      <CheckoutCardColBankIcon>
                        <CheckoutCardColBankImg src={item?.icon} />
                      </CheckoutCardColBankIcon>
                      <CheckoutCardColBankPara>
                        {item?.name}
                      </CheckoutCardColBankPara>
                    </CheckoutCardColBankName>
                  </ModalBankOptions>
                )
              })}
            </ModalBankSelection>
            <ModalButtonDiv>
              <ModalButton>Proceed</ModalButton>
            </ModalButtonDiv>
          </ModalBody>
        </ModalContent>
      </ModalDialog>
    </ModalContainer>
  )
}

export default ModalBank
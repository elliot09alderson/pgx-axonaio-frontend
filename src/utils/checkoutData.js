import {
  axisIcon,
  cardLogo,
  emiPayLaterIcon,
  hdfcIcon,
  iciciIcon,
  kotakIcon,
  netBankingIcon,
  qrIcon,
  sbiIcon,
  upiIcon,
  walletsIcon,
  yesbankIcon,
} from "../assests";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const checkoutData = [
  {
    name: "Credit / Debit Card",
    logo: cardLogo,
  },
  {
    name: "Net Banking",
    logo: netBankingIcon,
  },
  {
    name: "UPI",
    logo: upiIcon,
  },
  {
    name: "Wallets",
    logo: walletsIcon,
  },
  {
    name: "EMI / Pay Later",
    logo: emiPayLaterIcon,
  },
  {
    name: "QR Code",
    logo: qrIcon,
  },
];

export const NetBankingData = [
  { name: "AXIS BANK", img: axisIcon, icon: faChevronRight },
  { name: "ICICI", img: iciciIcon, icon: faChevronRight },
  { name: "SBI", img: sbiIcon, icon: faChevronRight },
  { name: "KOTAK", img: kotakIcon, icon: faChevronRight },
  { name: "YES BANK", img: yesbankIcon, icon: faChevronRight },
  { name: "HDFC", img: hdfcIcon, icon: faChevronRight },
];

export const CheckoutHeading = [
  "Enter Card Details",
  "Enter Card Details",
  "Pay Using API",
  "Select your Wallet",
  "Select EMI options",
  "Scan this QR Code",
];

export const UpiData = [
  { name: "PAYTM", img: axisIcon, icon: faChevronRight },
  { name: "GPAY", img: iciciIcon, icon: faChevronRight },
  { name: "PHONE PE", img: sbiIcon, icon: faChevronRight },
  { name: "AMAZON PAY", img: kotakIcon, icon: faChevronRight },
];

export const WalletsData = [
  { name: "ICASH", img: axisIcon, icon: faChevronRight },
  { name: "PAYTM", img: iciciIcon, icon: faChevronRight },
  { name: "MOBIKWIK", img: sbiIcon, icon: faChevronRight },
  { name: "OXIGEN", img: kotakIcon, icon: faChevronRight },
];

export const EmiPayData = [
  { name: "CREDIT CARD", img: axisIcon, icon: faChevronRight },
  { name: "FLEXPAY BY HDFC", img: iciciIcon, icon: faChevronRight },
  { name: "CARDLESS EMI", img: sbiIcon, icon: faChevronRight },
];

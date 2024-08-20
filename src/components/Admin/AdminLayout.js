import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { logo } from "../../assests";
import { AdminPayData, Data } from "../../dummy/Data";
import { AdminTableData, MenuData } from "../../utils/AdminData";
import PieChart from "../graphComponent/PieChart";
import CardForAdmin from "../molecules/CardForAdmin";
import Dropdown from "../molecules/Dropdown";
import Table from "./TableLayout";
import Scrollbar from "react-scrollbar";
import SearchWithDropdownAndCalendar from "../molecules/DroplistwithCalender";
import BarChart from "../molecules/BarGraph";
import PopupMerchantForm from "../molecules/ChargesForm";

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow-x: hidden;
`;

const Menu = styled.div`
  position: fixed;
  flex-basis: 250px;
  background-color: #231f20;
  border-right: 1px solid #e0e0e0;
  /* overflow-y: auto; */
  z-index: 1200;
  height: 100%;
  float: left;
  width: 230px;
`;
const MenuSubDiv = styled.div`
  /* padding-left: 15px; */
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0px 12px 25px;
  cursor: pointer;
  &:hover {
    background-color: #26b24b;
    border-top: 1px solid #231f20;
  }
  &.active {
    background-color: #26b24b;
    font-weight: bold;
    color: #fff;
  }
  &.activate {
    background-color: rgb(76 30 149);
    /* font-weight: bold; */
    color: #26b24b;
  }
`;

const Menuspan = styled.span`
  color: #fff;
  /* padding-left: 5px; */
  line-height: 30px;
  font-size: 15px !important;
`;
const MenuHeading = styled.div`
  padding: 12px 0px 12px 25px;
  /* color: #0099ff; */
  background-color: #fff;
`;
const MenuImage = styled.img`
  width: auto;
`;
const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

// const Nav = styled.nav`
//   height: 50px;
//   background-color: #ffffff;
// `;
const Nav = styled.nav`
  background-color: #231f20;
  color: #fff;
  border-color: #d3e0e9;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;
`;
const NavContainer = styled.div`
  display: flex;
  padding-left: 250px;
  padding-right: 15px;
`;
const LeftNav = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
`;
const NavDivText = styled.div`
  color: #00a8e9;
  padding: 15px 0px;
`;
const RightNav = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
const ProfileDiv = styled.div`
  padding: 15px 0px;
`;
const Divwithspan = styled.span`
  color: #fff;
`;
const FontItem = styled.span`
  background-color: #231f20;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  padding-top: 2px;
  transition: all 0.3s;
  color: #fff;
  font-size: 14px;
  margin-left: ${(props) => (props.ml ? "10px" : "")};
`;
const Body = styled.div`
  background-color: #fff;
  padding-top: 100px;
  padding-left: 230px;
`;
const Wrapper = styled.div`
  /* position: relative;
  min-height: 1px; */
  padding-left: 5px;
  padding-right: 10px;
`;
const PanelDiv = styled.div`
  margin-bottom: 22px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-color: #d3e0e9;
`;
const PanelHeading = styled.div`
  color: #333;
  background-color: #fff;
  border-color: #d3e0e9;
  padding: 10px 15px;
  border-bottom: 1px solid rgb(211, 224, 233);
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  margin-bottom: 10px;
`;
const PanelHeadingUl = styled.ul`
  border-bottom: 1px solid #ddd;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
  padding-bottom: 8px;
`;
const PanelHeadingLi = styled.li`
  margin-bottom: ${(props) => (props.active ? "-1px" : "")};
  display: inline-block;
  border: 1px solid transparent;
  padding: 10px 10px 0px 0px;
  cursor: pointer;
  border-bottom: none;
`;
const PanelHeadingRef = styled.a`
  color: ${(props) => (props.active ? "#555" : "#85c442")};
  background-color: ${(props) => (props.active ? "#f5f8fa" : "")};
  border: ${(props) => (props.active ? "1px solid #ddd" : "")};
  border-bottom-color: ${(props) => (props.active ? "transparent" : "")};
  margin-right: 2px;
  line-height: 1.6;
  padding: 10px;
  border-radius: 4px 4px 0 0;
  &:hover {
    background-color: #eee;
  }
`;
const PanelBody = styled.div`
  padding: 15px;
`;
const TabContent = styled.div``;
const DashBoard = styled.div`
  display: block;
  opacity: 1;
`;
const AppCard = styled.div`
  border-left: 3px solid #15a362;
  border-radius: 3px;
  position: relative;
  background: #f5f6fe;
  border: 1px solid #c3c3c3;
  padding: 1rem 1rem;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  margin-bottom: 1.5rem !important;
`;
const AppCardInner = styled.div``;
const AppCardBody = styled.div``;
const AppCardBodyTitle = styled.h3`
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  margin: 0px;
`;
const RowNew = styled.div`
  display: flex;
  margin-bottom: 1.5rem !important;
  margin-left: -15px;
  margin-right: -15px;
`;
const ColForRow = styled.div`
  width: ${(props) => (props.width ? props.width : "50%")};
  padding-left: 15px;
  padding-right: 15px;
  padding-top: ${(props) => (props.mb ? props.mb : "")};
`;
const GraphCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  border: #f78ca0 1px solid;
  padding: 10px 5px 10px 5px;
`;
const CardRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const BodyGraph = styled.div`
  margin: 0px;
  font-size: 14px;
  padding: 12px 0px 12px 16px;
  border-radius: unset !important;
  background-color: rgb(255, 255, 255);
`;
const GreaterThan = styled.span`
  font-size: 14px;
  color: #fff;
  font-weight: 500;
  &:before {
    content: ">";
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
  }
`;

const SideMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SideMenuListItem = styled.li`
  margin-top: 3px;
`;

const SideMenuLink = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #26b24b;
    border-top: 1px solid #231f20;
    color: #fff;
  }
  &.active {
    background-color: #26b24b;
    /* font-weight: bold; */
    color: #fff;
  }
  &.activate {
    background-color: rgb(76 30 149);
    /* font-weight: bold; */
    color: #26b24b;
  }
`;

const SideSubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SideSubMenuListItem = styled.li`
  margin-bottom: 5px;
`;

const SideSubMenuLink = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #26b24b;
    border-top: 1px solid #231f20;
    color: #fff;
  }
`;
const MerchantButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ButtonMerchant = styled.button`
  align-self: flex-end;
  padding: 7px;
  border: none;
  margin: 10px;
  background: #367fa9;
  color: #fff;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;
const AdminLayout = () => {
  let obj = {
    labels: Data.map((data) => data.userGain),
    datasets: [
      {
        label: "status",
        data: Data.map((data) => data.year),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  const [selectOpton, setOptions] = useState("All");
  const [openModel, setOpenModel] = useState({ isOpenMerchant: false });
  const [selectCardValue, setCardValue] = useState({
    failed_transaction: "",
    gtv: "",
    successful_transaction: "",
    refund: "",
    total_transaction: "",
  });
  const [selectGraphData, setGraphData] = useState({
    barGraph: [],
    payMode: [],
  });
  const [selecMenu, setSelectMenu] = useState(0);
  const [selectCurrMenu, setSelectCurrMenu] = useState(0);
  const [tabData, setTabData] = useState(MenuData[0].subMenus[0].tabs);
  const [currentTab, setCurrentTab] = useState(tabData[0]);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleMenuClick = (index) => {
    if (activeSubmenu === index) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(index);
    }
    onHandleDrop(index);
  };
  const onHandleSelectOptions = (option) => {
    setOptions(option);
  };
  const onHandleDrop = (index, orderIndex) => {
    setSelectCurrMenu(index);
  };
  const onHandleCurrentTab = (item) => {
    setCurrentTab(item);
  };
  const onHandleSubmenuData = (data, mode = "submenu", index) => {
    if (mode === "menu") {
      setTabData(data);
      setCurrentTab(data[0]);
      setSelectMenu(index);
      setSelectCurrMenu(index);
    } else {
      setTabData(data);
      setCurrentTab(data[0]);
      setSelectMenu(index);
    }
    setActiveSubmenu(null);
  };
  const onHandleMessage = (data, data2) => {
    const { failed_transaction, gtv, refund, total_transaction } = data[0];
    setCardValue({
      ...selectCardValue,
      failed_transaction: failed_transaction[0]?.count,
      gtv: gtv[0]?.amount,
      successful_transaction: gtv[0]?.successful_transaction,
      refund: refund[0]?.amount,
      total_transaction: total_transaction[0]?.count,
    });
    const { bar_graph, pay_mode } = data2[0];
    setGraphData({
      ...selectGraphData,
      barGraph: bar_graph,
      payMode: pay_mode,
    });
  };

  const onHandleMerchantForm = () => {
    setOpenModel({ ...openModel, isOpenMerchant: true });
  };
  return (
    <Container>
      <Menu>
        <Scrollbar style={{ width: "100%", height: "100%" }}>
          <MenuSubDiv>
            <MenuHeading>
              <MenuImage src={logo} />
            </MenuHeading>
            <SideMenuList>
              {MenuData.map((menu, index) => (
                <SideMenuListItem key={menu.name}>
                  <SideMenuLink
                    className={selectCurrMenu === index ? "active" : ""}
                    href="#"
                    onClick={() =>
                      menu?.subMenus[0]?.title
                        ? handleMenuClick(index)
                        : onHandleSubmenuData(
                            menu?.subMenus[0]?.tabs,
                            "menu",
                            index
                          )
                    }
                  >
                    <FontItem ml>
                      <FontAwesomeIcon icon={menu.icon} />
                    </FontItem>
                    {menu.name}
                  </SideMenuLink>
                  {activeSubmenu === index && menu.subMenus && (
                    <SideSubMenuList>
                      {menu.subMenus.map((submenu) => (
                        <SideSubMenuListItem
                          key={submenu?.title}
                          onClick={() =>
                            onHandleSubmenuData(submenu?.tabs, "", index)
                          }
                        >
                          {submenu?.title && (
                            <SideSubMenuLink href="#">
                              <GreaterThan />
                              {submenu.title}
                            </SideSubMenuLink>
                          )}
                        </SideSubMenuListItem>
                      ))}
                    </SideSubMenuList>
                  )}
                </SideMenuListItem>
              ))}
            </SideMenuList>
          </MenuSubDiv>
        </Scrollbar>
      </Menu>
      <Content>
        <Nav>
          <NavContainer>
            <LeftNav>
              <NavDivText>
                Date: <Divwithspan> 16-04-2023 8:57:50 PM</Divwithspan>
              </NavDivText>
              <NavDivText>
                Login Ip: <Divwithspan>115.99.89.153</Divwithspan>
              </NavDivText>
            </LeftNav>
            <RightNav>
              <ProfileDiv>Swarup</ProfileDiv>
            </RightNav>
          </NavContainer>
        </Nav>
        <Body>
          <Wrapper>
            <PanelDiv>
              <PanelHeading>
                <PanelHeadingUl>
                  {tabData.map((item, index) => {
                    return (
                      <PanelHeadingLi 
                        key={index}
                        active={item === currentTab}
                        onClick={() => onHandleCurrentTab(item)}
                      >
                        <PanelHeadingRef active={item === currentTab}>
                          {item}
                        </PanelHeadingRef>
                      </PanelHeadingLi>
                    );
                  })}
                </PanelHeadingUl>
              </PanelHeading>
              <PanelBody>
                <TabContent>
                  {selecMenu === 0 && (
                    <DashBoard>
                      <AppCard>
                        <AppCardInner>
                          <AppCardBody>
                            <AppCardBodyTitle>
                              Welcome, Swarup Saha
                            </AppCardBodyTitle>
                          </AppCardBody>
                        </AppCardInner>
                      </AppCard>
                    </DashBoard>
                  )}
                  {selecMenu === 0 && (
                    <RowNew>
                      <ColForRow>
                        <SearchWithDropdownAndCalendar
                          onHandleCardValue={onHandleMessage}
                        />
                      </ColForRow>
                      <ColForRow mb="17px">
                        <Dropdown
                          width="100%"
                          options={["All", "item1"]}
                          onSelect={onHandleSelectOptions}
                        />
                      </ColForRow>
                    </RowNew>
                  )}
                  {selecMenu === 0 && (
                    <CardRow>
                      <CardForAdmin
                        title="Total GTV"
                        text={selectCardValue?.gtv}
                      />
                      <CardForAdmin
                        title="Successful Transactions"
                        text={selectCardValue?.successful_transaction}
                      />
                      <CardForAdmin
                        title="Amount Refunded"
                        text={selectCardValue?.refund}
                      />
                      <CardForAdmin
                        title="Total Transactions"
                        text={selectCardValue?.total_transaction}
                      />
                      <CardForAdmin
                        title="Failed Transactions"
                        text={selectCardValue?.failed_transaction}
                      />
                    </CardRow>
                  )}
                  {selecMenu === 0 && (
                    <RowNew>
                      <ColForRow width="100%" mb="20px">
                        <GraphCard>
                          <BodyGraph>
                            <BarChart barData={selectGraphData?.barGraph} />
                          </BodyGraph>
                        </GraphCard>
                      </ColForRow>
                    </RowNew>
                  )}
                  {selecMenu === 0 && (
                    <RowNew>
                      <ColForRow>
                        <GraphCard>
                          <AppCardBody>
                            <AppCardBodyTitle>
                              Payments Mode Distribution
                            </AppCardBodyTitle>
                            <BodyGraph>
                              <PieChart
                                chartData={AdminPayData(
                                  selectGraphData?.payMode,
                                  "Amount"
                                )}
                              />
                            </BodyGraph>
                          </AppCardBody>
                        </GraphCard>
                      </ColForRow>
                      <ColForRow>
                        <GraphCard>
                          <AppCardBody>
                            <AppCardBodyTitle>
                              Device Distribution
                            </AppCardBodyTitle>
                            <BodyGraph>
                              <PieChart chartData={obj} />
                            </BodyGraph>
                          </AppCardBody>
                        </GraphCard>
                      </ColForRow>
                    </RowNew>
                  )}
                  {selecMenu === 1 && (
                    <MerchantButtonDiv>
                      <ButtonMerchant onClick={onHandleMerchantForm}>
                        Add Merchant Charges
                      </ButtonMerchant>
                    </MerchantButtonDiv>
                  )}
                  {openModel?.isOpenMerchant && <PopupMerchantForm />}
                  {selecMenu !== 0 && <Table data={AdminTableData} />}
                  {/* {
                    selecMenu === 2 && <Table data={MerchantTableData} />
                  }
                  {
                    selecMenu === 3 && <Table data={employeeDetails} />
                  } */}
                </TabContent>
              </PanelBody>
            </PanelDiv>
          </Wrapper>
        </Body>
      </Content>
    </Container>
  );
};

export default AdminLayout;

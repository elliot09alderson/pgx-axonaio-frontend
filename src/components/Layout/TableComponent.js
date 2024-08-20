import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const TableComponent = ({ data, Headers, oneDown = false }) => {
  const navigate = useNavigate();

  const onHandleLink = (item) => {
    console.log(item);
    let linkSub = item["Link ID"].split("/")[4];
    navigate(`/merchants/pg/link/${linkSub}`);
    localStorage.setItem("shortUrl", linkSub);
  };

 

  return (
    <div className="flex flex-col select-none overflow-y-scroll min-h-[100vh] ">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  {Headers.map((item, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-xs sm:text-sm font-medium  text-gray-900 px-6 py-4 text-center"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item} className="bg-gray-100 border-b">
                    {Object.values(item).map((tableEachData, idx) =>
                      item["Link ID"] !== tableEachData ? (
                        <td
                          key={idx}
                          className="text-xs sm:text-sm text-gray-900 font-light  px-6 py-4 whitespace-nowrap text-center"
                        >
                          {tableEachData}{" "}
                        </td>
                      ) : (
                        <td
                          key={idx}
                          className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                          onClick={() => onHandleLink(item)}
                        >
                          {tableEachData}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;

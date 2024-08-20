import React from "react";

const TableTransaction = ({ data, oneDown = false, tableData = [] }) => {
  return (
    <div className="flex flex-col select-none overflow-y-scroll px-1">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  {data.map((item, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((item) => (
                    <tr key={item} className="bg-gray-100 border-b">
                      <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-8 py-4 whitespace-nowrap">
                        {item}
                      </td>
                      {!oneDown && <td>{item}</td>}
                    </tr>
                  ))
                ) : (
                  <tr className="w-full justify-center items-center">
                    <td className="text-center text-2xl"> No</td>
                    <td className="text-center text-2xl"> Data </td>
                    <td className="text-center text-2xl"> Available </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTransaction;

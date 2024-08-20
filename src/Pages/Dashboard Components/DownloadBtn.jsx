import React from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import { AiOutlineDownload } from "react-icons/ai";
import { Button } from "flowbite-react";
const DownloadBtn = ({ data = [], fileName }) => {
  return (
    <Button
      gradientDuoTone="purpleToBlue"
      className={`cursor-pointer flex justify-center rounded-md items-center px-5  bg-[#8b5cf6]  gap-2    hover:bg-[#8b5cf6]/50 duration-500   hover:shadow-md text-white`}
      onClick={() => {
        const datas = data?.length ? data : [];
        const sheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx");
      }}
    >
      <AiOutlineDownload className="text-white mr-2 h-5 w-5" />
      Export
    </Button>
  );
};

export default DownloadBtn;

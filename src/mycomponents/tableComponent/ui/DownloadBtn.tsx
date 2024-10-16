import { DownloadIcon } from "@radix-ui/react-icons";
/* import React from "react";

import * as XLSX from "xlsx/xlsx.mjs"; */

function DownloadBtn({ data = [] /* , fileName  */ }) {
  return (
    <button
      className="download-btn"
      onClick={() => {
        const datas = data?.length ? data : [];
        console.log(datas);
        /* const worksheet = XLSX.utils.json_to_sheet(datas);
        const workbook = XLXS.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "sheet1");
        XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : "data.xlsx"); */
      }}
    >
      <DownloadIcon />
      Download
    </button>
  );
}

export { DownloadBtn };

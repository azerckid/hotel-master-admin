import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import Data from "../components/ExcelData";

const ProductContainer = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 8px;
`;
const TableHeader = styled.div`
  width: 900px;
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  div {
    width: 80px;
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: yellowgreen;
  }
`;

const Excel = () => {
  const [excelFile, setExcelFile] = useState(null); // [file, setFile]
  const [excelFileError, setExcelFileError] = useState(null); // [error, setError
  const [excelData, setExcelData] = useState(null);

  const fileTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
    } else if (file) {
      console.log("fileType", file.type);
      if (fileTypes.includes(file.type)) {
        // console.log("file", file);
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => {
          setExcelFileError(null);
          setExcelFile(event.target.result);
          const data = event.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          workbook.SheetNames.forEach((sheet) => {
            const rowObject = XLSX.utils.sheet_to_row_object_array(
              workbook.Sheets[sheet]
            );
            // for (let i = 0; i < rowObject.length; i++) {
            //   rowObject[i].id = i + 1;
            // }
            // const test = rowObject[0];
            // console.log("test", test.__EMPTY_1.replace(/\s/g, ""));

            setExcelData(rowObject);
            console.log("rowObject", rowObject);
          });
        };
      } else if (!fileTypes.includes(file.type)) {
        console.log("Please select Excel format");
        setExcelFileError("Please select Excel format");
        alert("Please select Excel format");
        setExcelFile(null);
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, {
        type: "buffer",
      });
      const workSheetName = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data);
      console.log("data", data);
    } else {
      setExcelData(null);
      console.log("Please select Excel file");
      alert("Please select Excel file");
    }
  };

  return (
    <ProductContainer>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Upload Excel file</label>
          <br></br>
          <input type="file" onChange={handleFile}></input>
          {excelFileError && <div>{excelFileError}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
      <br></br>
      <hr></hr>
      <h5>View Excel file</h5>
      <div>
        {excelData === null && <>No file selected</>}
        {excelData !== null && (
          <div>
            <table>
              <TableHeader>
                <div>Date</div>
                <div>Day</div>
                <div>FADR</div>
                <div>FRatio</div>
                <div>FRatio2</div>
                <div>FRev</div>
                <div>FRms</div>
                <div>GADR</div>
                <div>GRatio</div>
                <div>GRat2</div>
                <div>GReve</div>
                <div>GRms</div>
                <div>ToDR</div>
                <div>TOCCP</div>
                <div>TotalRMS</div>
                <div>TotalPAR</div>
                <div>TotalRev</div>
              </TableHeader>
              <tbody>
                <Data excelData={excelData} />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ProductContainer>
  );
};

export default Excel;

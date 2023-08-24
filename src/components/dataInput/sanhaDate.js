import React from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";

import sanhaDateTransform from "../../utils/excelTransform/sanhaDateTransform";

const ChooseFileBox = styled.div`
  width: 600px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: aliceblue;
`;
const Title = styled.div`
  font-size: 16px;
`;

function sanhaDate({ sanhaDate, setSanhaDate, year, month, hotel }) {
  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];
  const handleFileSanhaDate = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
    } else if (fileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: "binary",
          codepage: 949,
        });
        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];
        delete firstSheet["A1"];
        delete firstSheet["B1"];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: "A" });
        const transformed = sanhaDateTransform(jsonData, year, month, hotel);
        console.log("sanhaDate transformed", transformed);
        setSanhaDate(transformed);
      };
      reader.readAsBinaryString(file);
    } else {
      console.log("Invalid file type");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.parentNode.id);
    window.confirm(
      "해당 자료가 정확한지 다시 확인 부탁드립니다. 업로드 하시겠습니까?"
    );
    const id = e.target.parentNode.id;

    if (id === "sanhaDate") {
      fetch("http://localhost:5000/api/import/sanhadate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanhaDate),
      }).then((res) => {
        if (res.status === 200) {
          window.alert("업로드 되었습니다.");
        }
      });
    }
  };
  return (
    <ChooseFileBox>
      <Title>sanhaDate</Title>
      <div id="sanhaDate">
        <input type="file" onChange={handleFileSanhaDate}></input>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </ChooseFileBox>
  );
}

export default sanhaDate;

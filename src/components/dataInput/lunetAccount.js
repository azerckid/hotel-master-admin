import React from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";

import lunetAccountTransform from "../../utils/excelTransform/lunetAccountTransform";

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

function lunetAccount({ lunetAccount, setLunetAccount, year, month, hotel }) {
  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];
  const handleFileLunetAccount = (e) => {
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
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: "A" });
        const transformed = lunetAccountTransform(jsonData, year, month, hotel);
        console.log("lunetAccount transformed", transformed);
        setLunetAccount(transformed);
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
    if (id === "lunetAccount") {
      fetch("http://localhost:5000/api/import/lunetaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lunetAccount),
      });
    }
  };

  return (
    <ChooseFileBox>
      <Title>lunetAccount</Title>
      <div id="lunetAccount">
        <input type="file" onChange={handleFileLunetAccount}></input>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </ChooseFileBox>
  );
}

export default lunetAccount;

import React from "react";
import * as XLSX from "xlsx";
import styled from "styled-components";
import iconv from "iconv-lite"; // 한글 인코딩 문제 해결 npm install buffer iconv-lite --save

import sanhaAccountTransform from "../../utils/excelTransform/sanhaAccountTransform";

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

function sanhaAccount({ sanhaAccount, setSanhaAccount, year, month, hotel }) {
  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];
  const handleFileSanhaAccount = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
    } else if (fileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const dataBuffer = e.target.result;
        const utf8Buffer = iconv.encode(
          iconv.decode(new Uint8Array(dataBuffer), "cp949"),
          "utf8"
        );
        const workbook = XLSX.read(utf8Buffer, { type: "buffer" });

        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: "A" });
        const transformed = sanhaAccountTransform(jsonData, year, month, hotel);
        console.log("sanhaAccount transformed", transformed);
        setSanhaAccount(transformed);
      };
      reader.readAsArrayBuffer(file);
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

    if (id === "sanhaAccount") {
      fetch("http://localhost:5000/api/import/sanhaaccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanhaAccount),
      });
    }
  };
  return (
    <ChooseFileBox>
      <Title>sanhaAccount</Title>
      <div id="sanhaAccount">
        <input type="file" onChange={handleFileSanhaAccount}></input>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </ChooseFileBox>
  );
}

export default sanhaAccount;

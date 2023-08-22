import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import iconv from "iconv-lite"; // 한글 인코딩 문제 해결 npm install buffer iconv-lite --save

import lunetDateTransform from "../utils/lunetDateTransform";
import lunetAccountTransform from "../utils/lunetAccountTransform";
import sanhaDateTransform from "../utils/sanhaDateTransform";
import sanhaAccountTransform from "../utils/sanhaAccountTransform";

const ProductContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 8px;
`;
const FormContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
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

const Excel = () => {
  const [lunetDate, setLunetDate] = useState([]);
  const [lunetAccount, setLunetAccount] = useState([]);
  const [sanhaDate, setSanhaDate] = useState([]);
  const [sanhaAccount, setSanhaAccount] = useState([]);

  const fileTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ]; // xlsx 파일 유형
  const handleFileLunetDate = (e) => {
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
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        const transformed = lunetDateTransform(jsonData);
        console.log("lunetDate transformed", transformed);
        setLunetAccount(transformed);
      };
      reader.readAsBinaryString(file);
    } else {
      console.log("Invalid file type");
    }
  };
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
        const transformed = lunetAccountTransform(jsonData);
        console.log("lunetAccount transformed", transformed);
        setLunetDate(transformed);
      };
      reader.readAsBinaryString(file);
    } else {
      console.log("Invalid file type");
    }
  };
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
        const transformed = sanhaDateTransform(jsonData);
        console.log("sanhaDate transformed", transformed);
        setSanhaDate(transformed);
      };
      reader.readAsBinaryString(file);
    } else {
      console.log("Invalid file type");
    }
  };
  const handleFileSanhaAccount = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
    } else if (fileTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = e.target.result;
        const utf8Buffer = iconv.encode(iconv.decode(data, "cp949"), "utf8");
        const workbook = XLSX.read(utf8Buffer, { type: "buffer" });

        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: "A" });
        const transformed = sanhaAccountTransform(jsonData);
        console.log("sanhaAccount transformed", transformed);
        setSanhaAccount(transformed);
      };
      reader.readAsBinaryString(file);
    } else {
      console.log("Invalid file type");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ProductContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <ChooseFileBox>
            <Title>lunetDate</Title>
            <div>
              <input type="file" onChange={handleFileLunetDate}></input>
              <button type="submit">Submit</button>
            </div>
          </ChooseFileBox>
          <ChooseFileBox>
            <Title>lunetAccount</Title>
            <div>
              <input type="file" onChange={handleFileLunetAccount}></input>
              <button type="submit">Submit</button>
            </div>
          </ChooseFileBox>
          <ChooseFileBox>
            <Title>sanhaDate</Title>
            <div>
              <input type="file" onChange={handleFileSanhaDate}></input>
              <button type="submit">Submit</button>
            </div>
          </ChooseFileBox>
          <ChooseFileBox>
            <Title>sanhaAccount</Title>
            <div>
              <input type="file" onChange={handleFileSanhaAccount}></input>
              <button type="submit">Submit</button>
            </div>
          </ChooseFileBox>
        </form>
      </FormContainer>
    </ProductContainer>
  );
};

export default Excel;

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import DateDropdown from "../components/DateDropdown";
import LunetDate from "../components/dataInput/lunetDate";
import LunetAccount from "../components/dataInput/lunetAccount";
import SanhaDate from "../components/dataInput/sanhaDate";
import SanhaAccount from "../components/dataInput/sanhaAccount";

const ProductContainer = styled.div`
  width: 100vw;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 8px;
`;
const DateContainer = styled.div`
  margin: 50px;
`;
const FormContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Excel = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [hotel, setHotel] = useState("");
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showHotelDropdown, setShowHotelDropdown] = useState(false);

  const [lunetDate, setLunetDate] = useState([]);
  const [lunetAccount, setLunetAccount] = useState([]);
  const [sanhaDate, setSanhaDate] = useState([]);
  const [sanhaAccount, setSanhaAccount] = useState([]);

  useEffect(() => {
    console.log("YEAR", year);
    console.log("MONTH", month);
    console.log("HOTEL", hotel);
  }, [year, month, hotel]);

  return (
    <ProductContainer>
      <DateContainer>
        <DateDropdown
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          hotel={hotel}
          setHotel={setHotel}
          showYearDropdown={showYearDropdown}
          setShowYearDropdown={setShowYearDropdown}
          showMonthDropdown={showMonthDropdown}
          setShowMonthDropdown={setShowMonthDropdown}
          showHotelDropdown={showHotelDropdown}
          setShowHotelDropdown={setShowHotelDropdown}
        />
      </DateContainer>
      {year && month && hotel ? (
        <>
          {year}-{month}
        </>
      ) : null}
      <FormContainer>
        <LunetDate
          setLunetDate={setLunetDate}
          lunetDate={lunetDate}
          year={year}
          month={month}
          hotel={hotel}
        />
        <LunetAccount
          setLunetAccount={setLunetAccount}
          lunetAccount={lunetAccount}
          year={year}
          month={month}
          hotel={hotel}
        />
        <SanhaDate
          sanhaDate={sanhaDate}
          setSanhaDate={setSanhaDate}
          year={year}
          month={month}
          hotel={hotel}
        />
        <SanhaAccount
          sanhaAccount={sanhaAccount}
          setSanhaAccount={setSanhaAccount}
          year={year}
          month={month}
          hotel={hotel}
        />
      </FormContainer>
    </ProductContainer>
  );
};

export default Excel;

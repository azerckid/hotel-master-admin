const lunetDateTransform = (lunet, year, month, hotel) => {
  const transformed = lunet.slice(2).map((item) => {
    return {
      Year: year,
      Month: month,
      Hotel: hotel,
      Date: item[0],
      Day: item[1],
      FIT: {
        Date: item[0],
        Day: item[1],
        Rms: item[2],
        Ratio: item[3],
        ADR: item[4],
        Revenue: item[5],
      },
      Group: {
        Date: item[0],
        Day: item[1],
        Rms: item[7],
        Ratio: item[8],
        ADR: item[9],
        Revenue: item[10],
      },
      Total: {
        Date: item[0],
        Day: item[1],
        Rms: item[14],
        Ratio: 100,
        ADR: item[16],
        RevPAR: item[17],
        Revenue: item[18],
      },
    };
  });
  return transformed;
};

export default lunetDateTransform;

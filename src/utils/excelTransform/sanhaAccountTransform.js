const sanhaAccountTransform = (data, year, month, hotel) => {
  const headers = data[2];
  return data.slice(3).map((row) => {
    let transformed = {};
    transformed["Year"] = year;
    transformed["Month"] = month;
    transformed["Hotel"] = hotel;
    console.log(transformed);
    for (let key in headers) {
      let newKey = headers[key];
      transformed[newKey] = row[key];
    }
    return transformed;
  });
};

export default sanhaAccountTransform;

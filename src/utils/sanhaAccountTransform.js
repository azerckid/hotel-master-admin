const sanhaAccountTransform = (data) => {
  const headers = data[2];
  return data.slice(3).map((row) => {
    let transformed = {};
    for (let key in headers) {
      let newKey = headers[key];
      transformed[newKey] = row[key];
    }
    return transformed;
  });
};

export default sanhaAccountTransform;

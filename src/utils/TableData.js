export const setUpTableValue = async (data, headers) => {
  let results = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    headers.forEach((element, index) => {
      switch (index) {
        case 0:
          obj[element] = data[i]["createdAt"];
          break;
        case 1:
          obj[element] =
            `${process.env.REACT_APP_SERVER_URL}` + data[i]["shortUrl"];
          break;
        case 2:
          obj[element] = data[i]["fxLinkID"];
          break;
        case 3:
          obj[element] = data[i]["amount"];
          break;
        case 4:
          obj[element] = data[i]["phoneNo"];
          break;
        case 5:
          obj[element] = data[i]["emailID"];
          break;
        case 6:
          obj[element] = data[i]["status"];
          break;
        default:
          break;
      }
    });
    results.push(obj);
  }
  return results;
};

export const setUpOrderTableValue = async (data, headers) => {
  let results = [];
  for (let i = 0; i < data.length; i++) {
    let obj = {};
    headers.forEach((element, index) => {
      switch (index) {
        case 0:
          obj[element] = data[i][element];
          break;
        case 1:
          obj[element] = data[i][element];
          break;
        case 2:
          obj[element] = data[i][element];
          break;
        case 3:
          obj[element] = data[i][element];
          break;
        case 4:
          obj[element] = data[i][element];
          break;
        case 5:
          obj[element] = data[i][element];
          break;
        case 6:
          obj[element] = data[i][element];
          break;
        case 7:
          obj[element] = data[i][element];
          break;
        case 8:
          obj[element] = data[i][element];
          break;
        case 9:
          obj[element] = data[i][element];
          break;
        case 10:
          obj[element] = data[i][element];
          break;
        default:
          break;
      }
    });
    results.push(obj);
  }
  return results;
};

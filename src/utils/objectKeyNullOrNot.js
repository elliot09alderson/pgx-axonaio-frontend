export const areAllValuesNull = (obj) => {
  for (const key in obj) {
    if (obj[key]) {
      return false;
    }
  }
  return true;
};

export const areTwoValueNull = (obj) => {
  for (const key in obj) {
    if (!(key === 'name' || key === 'emailID') && !obj[key]) {
      return false;
    }
  }
  return true;
};
const {
  FETCH_PAYIN_TRANSACTIONS_REQUEST,
  FETCH_PAYIN_TRANSACTIONS_SUCCESS,
  FETCH_PAYIN_TRANSACTIONS_FAILURE,
} = require("../constants");

const fetchPayInTransactionRequest = () => ({
  type: FETCH_PAYIN_TRANSACTIONS_REQUEST,
});

const fetchPayInTransactionSuccess = (data) => ({
  type: FETCH_PAYIN_TRANSACTIONS_SUCCESS,
  payload: data,
});

const fetchPayInTransactionFailure = (error) => ({
  type: FETCH_PAYIN_TRANSACTIONS_FAILURE,
  payload: error,
});

const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await fetch("https://api.example.com/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const fetch_payIn_transactions = (token) => {
  return {
    type: FETCH_PAYIN_TRANSACTIONS,
    payload: token,
  };
};

export const userLogoutAction = () => {
  return {
    type: USER_LOGGED_OUT,
    payload: true,
  };
};

const { USER_LOGGED_IN, USER_LOGGED_OUT } = require('../constants')

export const userLoggedInAction = (token) => {
  return {
    type: USER_LOGGED_IN,
    payload: token,
  }
}




export const userLogoutAction = () => {
  return {
    type: USER_LOGGED_OUT,
    payload: true,
  }
}

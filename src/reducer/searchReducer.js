import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  CLOSE_MESSAGE
} from '../actions/allActionTypes'

const INITAIL_STATE = {
  show: false,
  search: [],
  email: ''
}
const searchReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    default:
      return {
        state
      }
      break
  }
}
export default searchReducer

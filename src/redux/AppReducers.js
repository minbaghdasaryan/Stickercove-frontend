import { combineReducers } from "redux"

import order from "redux/Reducers/Order"

const appReducers = combineReducers({
  order,
})

export default appReducers

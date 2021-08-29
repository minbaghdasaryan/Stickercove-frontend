import { all } from "redux-saga/effects"

import order from "./Order"

const appSaga = function* () {
  yield all([order()])
}

export default appSaga

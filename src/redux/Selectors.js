import { get } from "lodash"

export const orderStateSelector = (state) => get(state, "order")

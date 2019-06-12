import { SELECT_HOST } from "../actions/types"

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_HOST:
      return action.host.id
    default:
      return state
  }
}

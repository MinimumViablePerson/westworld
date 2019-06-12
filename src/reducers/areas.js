import { FETCHED_AREAS_SUCCESS } from "../actions/types"

export default (areas = [], action) => {
  switch (action.type) {
    case FETCHED_AREAS_SUCCESS:
      return action.areas
    default:
      return areas
  }
}

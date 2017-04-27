import axios from 'axios';

// action
export const PARKS_REQUEST_START = 'PARKS_REQUEST_START';
export const PARKS_REQUEST_FAILURE = 'PARKS_REQUEST_FAILURE';
export const PARKS_REQUEST_SUCCESS = 'PARKS_REQUEST_SUCCESS';

// actions that govern the network request
export const parksRequestStart = (filters) => {
  return {
    type: PARKS_REQUEST_START,
  }
}

export const parksRequestFailure = (filters) => {
  return {
    type: PARKS_REQUEST_FAILURE,
    error: 'Could not fetch parks data!'
  }
}

export const parksRequestSuccess = (filters, parks) => {
  return {
    type: PARKS_REQUEST_SUCCESS,
    filters: filters,
    parks: parks
  }
}

// thunk to get updated parks
// invoke the thunk by dispatch(getParks(filters))
// filters should equal the whole filters property
export const getParks = (filters) => {
  return (dispatch) => { 
    dispatch(parksRequestStart(filters))
    return axios.get('/api/parks', {
        params: {
          filters: filters
        }
      })
      .then((res) => {
        dispatch(parksRequestSuccess(filters, res.data))
      })
      .catch(err => dispatch(parksRequestFailure(filters)))
  }
}



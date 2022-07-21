import {useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS  = {
    MAKE_REQUEST: 'make_request',
    GET_DATA: 'get-data',
    ERROR: 'error'
}
const BACKEND_API_URL = 'http://localhost:3000/api/analyze_candidates';

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, candidates: [] }
        case ACTIONS.GET_DATA:
            return { ...state, loading: false, candidates: action.payload.candidates }
        case ACTIONS.ERROR:
        return { ...state, loading: false, error: action.payload.error, candidates: [] }
        default:
            return state;
    }
}


export default function useFetchCandidates(params) {
    const [state, dispatch] = useReducer(reducer, {candidates: [], loading: false })

    useEffect(() => {
        dispatch({ type: ACTIONS.MAKE_REQUEST })
        axios.get(BACKEND_API_URL, {
            params: { ...params }
        }).then( res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { candidates: res.data} })
        }).catch(e => {
            dispatch({ type: ACTIONS.ERROR, payload: { error: e } })
        })
    }, [params])

    return state
}
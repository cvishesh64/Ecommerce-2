import axios from "axios"
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, CLEAR_ERRORS} from "../constants/productConstants"


export const getProduct=()=> async (dispatch)=>{
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })

        console.log("old data")
        const {data}=await axios.get(`/api/v1/products`)
        console.log("new data")
        
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message

        })
    }
}

//Clearin errors
export const clearErrors=()=> async (dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}
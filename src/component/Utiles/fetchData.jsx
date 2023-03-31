import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { url } from "../URL/url";
import axios from "axios";
import {FetchDataSlice} from "../Slices/data";

// import FetchCartImages from "./fetch_cart_images";

const FetchData = () => {

  const dataAction = FetchDataSlice.actions;
  const dispatch = useDispatch();


  useEffect(() => {
    fetchDatas();
    
  });

  const fetchDatas = () => {
    dispatch(dataAction.RemoveData);
    
    axios.get(`${url}api/view-main-catagories`).then(
        (response) => {
          if(response.data.result)
          {
            dispatch(dataAction.InsertData(response.data.result));  
          }  
        })
        axios.get(`${url}api/view-all-company`).then(
          (response) => {
         
            dispatch(dataAction.InsertCompany(JSON.stringify(response.data.result))); 
      
            
         
          }
          )
  };


 
  return <>
  
  </>;
};

export default FetchData;






// dispatch(cartActions.addCartItem(cartItem));
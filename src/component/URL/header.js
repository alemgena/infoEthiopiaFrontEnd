import {getCookie} from "../Authentication/auth"
export const config = {
    headers: {
       Authorization: "Bearer " + getCookie("token")
    //    Authorization: "Bearer " + 'kdkdkd'
    }
 }
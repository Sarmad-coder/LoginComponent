import { createStore, combineReducers } from "redux";

function userSection(oldData={cu:{}},newData){
if (newData.type=="LoginUser") {
    oldData.cu=newData.payload
}else{
    oldData.cu={}
}
return {...oldData}
}
let allSections= combineReducers({userSection});
let myStore=createStore(allSections);
export default myStore
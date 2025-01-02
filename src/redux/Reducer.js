
import { facilityList,roomList,blockList,floorList, specialties, doctors, availablityList } from './DataList'
const initialValues={
    facilityList:facilityList,
    roomList:roomList,
    blockList:blockList,
    floorList:floorList,
    specialtyList:specialties,
    doctorList:doctors,
    availablityList:availablityList
}
export const Reducer = (state=initialValues,action) => {
  
 switch(action?.type){
    case "Facility":return ({...state,facilityList:action?.payload});
    case "Room":return ({...state,roomList:action?.payload});
    case "Speciality":return ({...state,specialtyList:action?.payload});
    case "Doctor":return ({...state,doctorList:action?.payload});
    case "Availability":return ({...state,availablityList:action?.payload});
    default:return state
 }
}


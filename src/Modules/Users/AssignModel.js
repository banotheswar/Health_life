import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { UseFormValidations } from '../../validations/UseFormValidation'
import Select from "react-select"
import { GetListById } from '../../components/ShareComp'
import { url } from '../../services/Urls'
const AssignModel = (props) => {
    const [speciality,setSpeciality]=useState([])
    const submit=()=>{
        
       let arr= data?.userHospitals?.map((v)=>{
        return{ id:v?.hospitalId}
       })
       let arr2=data?.userSpecialities?.map((v)=>{
        return{ id:v?.specialityId}
       })
      
       let body={
        id:props?.show?.userId,
        hospitalIds:arr
       }
  let specia={
    id:props?.show?.userId,
    specialityIds:arr2
  }
       
        props?.submit(props?.speciality?specia:body)
    }
    const GetAllSpeciality=async()=>{
        let res=await GetListById(url.orderListspecilaity,{id:0});
        res?.map(v=>{
          v["label"]=v?.specialityName
          v["value"]=v?.specialityId
        })
        setSpeciality(res)
      }
    const {data,errors,handleChange,handleChangeSearch,handleMultiSelectDropdown,handleSubmit,setValues}=UseFormValidations({
        initialValues:{
    
        },
        validationSchema:{
    
        },
        submit:submit
    })
    const returnValue=(key)=>{
        return data?.[key]&&data?.[key]?data?.[key]:""
    }
    const ErrorValue=(key)=>{
    return errors?.[key]&&errors?.[key]?"  border border-danger ":""
    }
    useEffect(()=>{
      props?.speciality&&  GetAllSpeciality()
    },[props?.speciality])
    
    useEffect(()=>{
        if (props?.show?.userId){
            setValues(props?.show)
        }
    },[props?.show?.userId])
   
    console?.log(data,"data")
  return (
    <Modal  {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header >
      <Modal.Title>{props?.speciality?"Assign Specilaity":"Assign Hospital"}</Modal.Title>
    </Modal.Header>
   <form onSubmit={handleSubmit}>
   <Modal.Body>
     <div className='row'>
{!props?.speciality&&<div>
    <label>Assign Hospital</label>
    <Select className={ErrorValue("userHospitals")} isMulti options={props?.hospitalAll} placeholder='Hospital' value={returnValue("userHospitals")} onChange={handleMultiSelectDropdown("userHospitals")}/>

</div>}
{props?.speciality&&<div className='py-2'>
    <label>Select Speciality</label>
    <Select className={ErrorValue("userSpecialities")} isMulti placeholder='Speciality' options={speciality}  value={returnValue("userSpecialities")} onChange={handleMultiSelectDropdown("userSpecialities")}/>

</div>}
{/* <div>
    <label>Select User</label>
    <Select className={ErrorValue("userId")} placeholder='User' value={returnValue("userId")} onChange={handleChangeSearch("userId")}/>

</div> */}



     </div>
    </Modal.Body>
    <Modal.Footer>
      <button className='btn border px-5' onClick={()=>props?.onHide()} >
        Close
      </button>
      <button className='bg_btn btn text-white px-5'>
        Save 
      </button>
    </Modal.Footer>
   </form>
  </Modal>
  )
}

export default AssignModel
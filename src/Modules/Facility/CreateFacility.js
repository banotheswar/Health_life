import React, { useEffect } from 'react'
import { UseFormValidations } from '../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const CreateFacility = (props) => {
  const state=useSelector((state)=>state?.facilityList)
    const submit=()=>{
        data["id"]=props?.show?.id?props?.show?.id:state?.length+1
        data["item"]=props?.show?.id?"Exist":"New"
        props?.submit(data)
    }
    const {data,errors,handleChange,handleNumberChange,handleAlphabetChange,handleSubmit,setValues}=UseFormValidations({
      initialValues: {
        facilityName: "",
        shortName: "",
        address: "",
      },
      validationSchema: {
        facilityName: {
          required: {
            value: true,
            message: "Please enter your First Name",
          },
        },
        shortName: {
          required: {
            value: true,
            message: "Please enter your First Name",
          },
        },
        address: {
          required: {
            value: true,
            message: "Please enter your First Name",
          },
        },
      },
        submit:submit
    })
    const returnValue=(key)=>{
        return data?.[key]&&data?.[key]?data?.[key]:""
    }
    const ErrorValue=(key)=>{
    return errors?.[key]&&errors?.[key]?" form-control border border-danger py-2":"form-control py-2"
    }
    useEffect(()=>{
        if (props?.show?.id){
            setValues(props?.show)
        }
    },[props?.show?.id])
    console?.log(props,"props?.show")
  return (
    <Modal  {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header>
      <Modal.Title>{props?.show?.id?"Edit Facility":"Add Facility"}</Modal.Title>
    </Modal.Header>
   <form onSubmit={handleSubmit}>
   <Modal.Body>
     <div className='row'>
<div className='py-1'>
    <label>Facility Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("facilityName")} placeholder='Facility Name' value={returnValue("facilityName")} onChange={handleAlphabetChange("facilityName")}/>

</div>
<div className='py-1'>
    <label>Short Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("shortName")} placeholder='Short Name' value={returnValue("shortName")} onChange={handleAlphabetChange("shortName")}/>

</div>

<div className='py-1'>
    <label>Address <span className='text-danger'>*</span></label>
    <textarea className={ErrorValue("address")} placeholder='Address' value={returnValue("address")} onChange={handleChange("address")}/>

</div>


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

export default CreateFacility
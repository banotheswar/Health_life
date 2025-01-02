import React, { useEffect } from 'react'
import { UseFormValidations } from '../../validations/UseFormValidation'
import { Modal } from 'react-bootstrap'

const CreateSpeciality = (props) => {
    const submit=()=>{
        data["id"]=props?.show?.id?props?.show?.id:props?.state?.length+1
        data["item"]=props?.show?.id?"Exist":"New"
        props?.submit(data)
    }
    const {data,errors,handleAlphabetChange,handleSubmit,setValues}=UseFormValidations({
      initialValues:{
        name:""
  
      },
      validationSchema:{
        name: {
          required: {
            value: true,
            message: "Please select specialityName",
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
  return (
    <Modal  {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
    <Modal.Header >
      <Modal.Title>Add Speciality</Modal.Title>
    </Modal.Header>
   <form onSubmit={handleSubmit}>
   <Modal.Body>
     <div className='row'>
<div>
    <label>Speciality Name <span className='text-danger'>*</span></label>
    <input className={ErrorValue("specialityName")} placeholder='Speciality Name' value={returnValue("name")} onChange={handleAlphabetChange("name")}/>

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

export default CreateSpeciality
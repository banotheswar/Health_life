// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { showDeleteAction } from '../../Store/calender/action';
// import "../../App.css";
// import { useFormValidation } from '../../Validations/useFormValidations';

// const ConfirmDelete = (props) => {
//     const dispatch=useDispatch()

//     const submit = async () => {
//         props.parentCallback()
//     }

//     const callUpdate = () =>{
//         dispatch(showDeleteAction(false))
//         props.callUpdate()
//     }

//     const { data, errors, handleChange, handleSubmit, setValues } = useFormValidation({
//         submit: submit
//     });

//     return (
//         <div  style={{ width: "30%" }}>
//             <div className="card-body">
//                 <div className="custom-modal">
//                     <form onSubmit={handleSubmit}>
//                         <div className="custom-modal-content w-auto">
//                             <div className="custom-modal-body">
//                                 <div className="mb-2 p-2  ">
//                                     <h4 className="modal-title">Are you sure you want to Delete Schedule</h4>
//                                 </div>
//                                 <div className="p-2  d-flex justify-content-end gap-3">
//                                 <button className="btn btn-danger" onClick={()=>{callUpdate()}}>No</button>
//                                     <button className="btn btn-success" type='submit'>Yes</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default ConfirmDelete;

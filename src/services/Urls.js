//  export const Base_Url="https://bluhealthapi.lionorbit.com/api/";
//  export const imageUrl="https://bluhealthapi.lionorbit.com/assets/"
// https://bluhealth.lionorbit.com/
export const Base_Url="https://api.bluhealthapp.com/api/";
export const imageUrl="https://api.bluhealthapp.com/assets/"
// http://bluhealthapp.com/
export const QRCodeUrl="https://api.bluhealthapp.com/assets/Apk/"
export const url={
Login:"Authentication/Login",
AHMDataList:"User/VitalsDataPHM",
userVitalsAll:"Vitals/GetAll",
latestVitals:"Vitals/GetLatest",
userRisk:"UserRisk/GetLatest",
subscriptionSavePlan:"SubscriptionPlan/Save",
planPackage:"SubscriptionPlan/GetAll",
saveIndividual:"SubscriptionPlan/SavePackage",
individualPack:"SubscriptionPlan/GetPackages",
paymentForplan:"Subscription/Save",
saveHospital:"Hospital/Save",
getAllHospital:"Hospital/GetAll",
saveSpeciality:"Speciality/Save",
getAllSpeciality:"/Speciality/GetAll",
saveDoctors:"User/Save",
getAllDoctors:"User/GetAllDoctors",
getAllRoles:"User/GetRoles",
getAllUser:"User/GetAll",
userGetById:"User/GetById",
assignHospital:"User/AssignHospital",
assignspeciality:"User/AssignSpeciality",
getDoctorByHospital:"User/GetByHospitalId",


hospitalUpload:"Hospital/UploadImage",
userUpload:"User/UploadImage",

doctorAvailability:"Schedule/PhysicianScheduleAvailability",
getAlldoctorAvailability:"Schedule/GetAll",
doctorByIdAvailability:"Schedule/GetById",
getAllAppointment:"Appointment/GetAll",
getAllCount:"User/GetCounts",
getAllOrg:"Organization/GetAllOrganization",
orgSave:"Organization/Save",
orgGetById:"Organization/GetById",
orderListspecilaity:"Speciality/GetAllASC",
orderListHospital:"Hospital/GetAllASC",
payment:{
    planTransactionById:"Subscription/GetByIdPaid",
    getAllPayement:"Subscription/GetAll"
},
forgotPassword:{
    sentEmail:"Authentication/SendForgotPasswordMail",
    updatePassword:"Authentication/SetPassword"
},
phm:{
getAllOrgUser:"https://baithna.tribandtech.com:8086/items/"
}
}

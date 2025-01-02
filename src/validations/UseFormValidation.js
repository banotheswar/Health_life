import { useState } from "react";

import moment from "moment";


let isSubmitted = false;
let newErrors = {};
let hasErrors = false;
export const UseFormValidations = (metadata) => {
  const [data, setData] = useState(metadata.initialValues || {});
  const [errors, setErrors] = useState({});
  
 

  // const handleChange = (name) => (e) => {
  //   console?.log(name,"handleChange")
  //   e.preventDefault();
   
  //   if (name) {
  //     let str = e.target.value
  //       .replace(/(^\s*)|(\s*$)/, "")
  //       .replace(/[ ]{2,}/gi, " ")
  //       .replace(/\n +/, "\n");
  //     setData({
  //       ...data,
  //       [name]:str.charAt(0).toUpperCase() + str.slice(1),
  //     });
  //     submittingData(name, str);
  //   }
  // };
  const handleChange = (name) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value
        // .replace(/(^\s*)|(\s*$)/, "")
        // .replace(/[ ]{2,}/gi, " ")
        // .replace(/\n +/, "\n");
      setData({
        ...data,
        [name]: str,
      });

      submittingData(name, str);
    }
  };

  
  const handleChangeSearch = (name) => (selectedOption) => {
   
    if (name) {
      let str = selectedOption!=null?selectedOption:"0";
      setData({
        ...data,
        [name]: str,
      });

      submittingData(name, str);
    }
  };
  const handlecheckenTime=(name,startTime)=>(e)=>{
let startT=moment(startTime)?.format("HH:mm")
if (startTime&&startTime!=undefined&&startT>=e?.target?.value) {
  let str = e?.target?.value
    .replace(/(^\s*)|(\s*$)/, "")
    .replace(/[ ]{2,}/gi, " ")
    .replace(/\n +/, "\n");
  setData({
    ...data,
    [name]: str,
  });
  submittingData(name, str);
}
  }
  
  
  const handleChangePercentage = (name) => (e) => {
   
    if (name) {
      let str = e?.floatValue
     
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
  };
 

  const handleDynamicFieldChange = (index, name, array, key) => (e) => {
    let updatedDynamicFields = [...array];
    updatedDynamicFields[index][name] = e?.target?.value;
    setData({ ...data, [key]: updatedDynamicFields });
    submittingData(name, "");
  };
  const addMultiple = (key, obj) => {
    setData({ ...data, [key]: [...data?.[key], obj] });

  };

  const ClearAllData = (keys, setSelectedFile) => {
    setData(keys);
    setSelectedFile(null);
    
  };



  const handleChangeSearch2 = (name1, name2) => (selectedOption) => {
    if (name1) {
      let str = selectedOption.value;
      let str2 = selectedOption.price;

      setData({
        ...data,
        [name1]: str,
        [name2]: str2,
      });
    }
  };

  const handleChangeSearchTwo = (name) => (selectedOption) => {
    let obj = selectedOption.map((v) => v.value);

    if (name) {
      let str = obj.obj?.toString(",");
      setData({
        ...data,
        [name]: str,
      });

      submittingData(name, str);
    }
  };

  const handleMultiSelectDropdown = (name) => (selectedOption) => {
    if (name) {
      setData({
        ...data,
        [name]: selectedOption,
      });
      submittingData(name, selectedOption);
    }
  };

  const handleDataChange = (name, value) => {
    if (name) {
      setData({
        ...data,
        [name]: value,
      });

      submittingData(name, value);
    }
  };
  const handlePriceFormateChange = (name,amount) => (value) => {
   let str=Math.max(value.floatValue,0)!=0?Math.max(value.floatValue,0):"0" 
    if (name) {
      setData({
        ...data,
        [name]:str
      });
      submittingData(name, str,amount);
      
    }
   
   
  };
  const handleMultiSelect = (name) => (e) => {
    let str = e;
    if(name){
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
   
  };
  const handleMultiSelectComma = (name) => (e) => {
    let str = e.toString(",");
    setData({
      ...data,
      [name]: str,
    });
  };

  

  const handleCheckbox = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.checked ? e.target.value : "No",
     });
  };
  const handleCheckboxTwo = (name,otherKey) => (e) => {
    setData({
      ...data,
      [name]: e.target.checked ? e.target.value : "",
      [otherKey]: e.target.checked ? e.target.value : "",
      // [otherKey]:
      
    });
  };
  
  const writeDataCheckbox = (index, name, key) => (e) => {
    let fd = data[name];
    let present = fd[index];
    present[key] = e.target.checked ? e.target.value : "No";
    fd[index] = present;
    setData({ ...data, [name]: fd });
    submittingData(name, "");
  };
  const writehandleChecked=(array,index,key,value)=>{
return array?.[index]?.[key]&&array?.[index]?.[key]==value?true:false
  }
  const handleClear = (name, key) => (e) => {
    setData({ ...data, [name]: e.target.checked ? e.target.value : "" });
    if (data[name]) {
      setData({ ...data, [key]: "", [name]: "" });
    }
  };

  const handleAlphabetChange = (name) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value
        .replace(/(^\s*)|(\s*$)/, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\n +/, "\n")
        .replace(/[^a-zA-Z ]/g, "");
      setData({
        ...data,
        [name]: str.charAt(0).toUpperCase() + str.slice(1),
      });
      submittingData(name, str);
    }
  };

  const handleAlphanumaricChange = (name) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value
        .replace(/(^\s*)|(\s*$)/, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\n +/, "\n")
        .replace(/[^a-zA-Z0-9 ]/g, "");
      setData({
        ...data,
        [name]: str.charAt(0).toUpperCase() + str.slice(1),
      });
      submittingData(name, str);
    }
  };

  const handleMaxChange = (name,length) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value.replace(/[^0-9]/g, "");
      if(str?.length<=length){
        setData({
          ...data,
          [name]: str,
        });
      }
          
     
      submittingData(name, str);
    }
  };
  const phoneFormart=(value)=>{
  let phone= value?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  return phone
  }
  

  const handleNumberChange = (name) => (e) => {
    if (name&&!e.target.value?.includes('.')) {

    
      let str = e.target.value.replace(/[^0-9\.]/g, "");
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
  };
  const handleNumberquantity = (name,q,stq) => (e) => {
    
    if (name&&!e.target.value?.includes('.')&&q&&e.target.value!=0&& parseInt(e.target.value)<=parseInt(stq)) {

    
      let str = e.target.value.replace(/[^0-9\.]/g, "");
      setData({
        ...data,
        [name]: str,
        message:""
      });
      submittingData(name, str);
    }
    else{
      // data["message"]="dddddddd"
      setData({...data,[name]: "",message:"Please enter the  Quantity <= Stock Qty "});
    }
  };

  const handleCustomChange = (name, limit) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value.replace("/ [d]{1} /", "");
      str = str <= limit ? str : limit;
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
  };

  const handleCustom2Change = (name, limit) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value.replace("/ [d]{1} /", "");
      str = str >= limit ? str : limit;

      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
  };

  const handleminMaxChange = (key, name, limit) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value.replace("/ [d]{1} /", "");
      if (key == "min") {
        str = str <= limit ? str : limit;
      } else {
        str = str >= limit ? str : limit;
      }
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
  };

  const handlefeeChange = (name) => (e) => {
    let str = e.target.str;
    if (name) {
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
  };

  const handlefChange = (name) => (e) => {
    e.preventDefault();
    setData({});
    if (name) {
      setData({
        [name]: e.target.value
          .replace(/(^\s*)|(\s*$)/, "")
          .replace(/[ ]{2,}/gi, " ")
          .replace(/\n +/, "\n"),
      });
      if (isSubmitted) {
        validateFormControl(name, e.target.value);
        if (errors && errors[name] && !newErrors[name]) {
          setErrors({
            ...errors,
            [name]: "",
          });
        } else {
          setErrors({
            ...errors,
            ...newErrors,
          });
        }
        newErrors = {};
      }
    }
  };

  const handleMultiple = (name, keys) => (e) => {
    e.preventDefault();
    let idata;
    if (e.target.value != "") {
      idata = JSON.parse(e.target.value);
    }
    if (e.target.value == "") {
      setData({
        ...data,
        [keys[0] + "1"]: "",
        [keys[0]]: "",
        [keys[1]]: "",
        [keys[2]]: "",
      });
    } else {
      if (name == "cpt") {
        setData({
          ...data,
          [keys[0] + "1"]: JSON.stringify(idata),
          [keys[0]]: idata.cptCodesID,
          [keys[1]]: idata.cptDesc,
          [keys[2]]: idata.inNetworkRate,
        });
      }
      if (name == "otherProcedure") {
        setData({
          ...data,
          [keys[0] + "1"]: JSON.stringify(idata),
          [keys[0]]: idata.id,
          [keys[1]]: idata.description,
          [keys[2]]: idata.fee,
        });
      }
      if (name == "icd10") {
        setData({
          ...data,
          [keys[0] + "1"]: JSON.stringify(idata),
          [keys[0]]: idata.icdTenID,
          [keys[1]]: idata.icdDesc,
          [keys[2]]: idata.rate,
        });
      }
    }
  };

  const handleUChange = (name) => (e) => {
    if (name) {
      let str = e.target.value
        .replace(/(^\s*)|(\s*$)/, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\n +/, "\n");
      setData({
        ...data,
        [name]: str.charAt(0).toUpperCase() + str.slice(1),
      });
      submittingData(name, str);
    }
  };

  const handleUpperChange = (name) => (e) => {
    e.preventDefault();

    if (name) {
      let str = e.target.value
        .replace(/(^\s*)|(\s*$)/, "")
        .replace(/[ ]{2,}/gi, " ")
        .replace(/\n +/, "\n");
      setData({
        ...data,
        [name]: str.toUpperCase(),
      });
      submittingData(name, str);
    }
  };

  const handleEmailChange = (name) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value
        .replace(/(^\s*)|(\s*$)/, "")
        .replace(/[ ]{1,}/gi, "")
        .replace(/\n +/, "\n");
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
  };
  const handleDateChange = (e, name) => {
    let str;
    if (e &&e!= null) {
      if (e &&e!= null) {
        e?.setMinutes(0);
        e?.setHours(0);
        str = new Date(
          e?.setMinutes(
            e?.getTimezoneOffset() < 0
              ? -e?.getTimezoneOffset()
              : e?.getTimezoneOffset()
          )
        );
      }
       else {
        alert("l")
        str = "";
      } 
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
    else {
      // alert("l")
      str = "";
      setData({
        ...data,
        [name]: "",
      });
      submittingData(name, str);
    } 
  };

  const handleRateChange = (e, name) => {
    if (name) {
      setData({
        ...data,
        [name]: e,
      });
      submittingData(name, e);
    }
  };

  const handleTimeChange = (e, name) => {
   
    if (name) {
      setData({
        ...data,
        [name]: e,
      });
      submittingData(name, e);
    }
  };
  const handleEndTimeChange = (name,date) =>(e)=> {
 
    if (date) {
      setData({
        ...data,
        [name]: e,
      });
      submittingData(name, e);
    }
  };

  const setValues = (v) => {
    setData(v);
  };

  const setTwoValues = (u, v) => {
    setData(Object.assign(u, v));
  };

  const addObject = (u) => {
    setData({
      ...data,
      ...u,
    });
  };
  const addObjectTwo = (obj, u) => {
    setData({
      ...obj,
      ...u,
    });
  };
  const setMultipleValues = (array) => {
    setData(
      Object.assign(
        array.map((e) => {
          return e;
        })
      )
    );
  };

  const addValues = (v) => {
    setData({
      ...data,
      v,
    });
  };

  const handleToggleChange = (name, value) => {
    if (name) {
      setData({
        ...data,
        [name]: value,
      });
      submittingData(name, value);
    }
  };
  const handleStockQuantity=(name)=>(e)=>{
    if (name) {
      let str = e.target.value.replace(/[^0-9]/g, "");
      setData({
        ...data,
        [name]: str,
      });
      submittingData(name, str);
    }
  }

  const addItem = (key, item) => {
    if (data[key] && data[key]?.length > 0) {
      setData({ ...data, [key]: [...data?.[key], item || {}] });
    } else {
      setData({ ...data, [key]: [item || {}] });
    }
  };

  const removeItem = (name, index) => {
    setData({ ...data, [name]: data[name]?.filter((v, i) => i != index) });
  };

  const resetFormData = (name) => {
    setData({ ...data, [name]: [{}] });
  };

  const returningData = (value, type) => {
    if (value != undefined && value != null && value != "") {
      switch (type) {
        case "Alphabet":
          return (
            value
              ?.replace(/(^\s*)|(\s*$)/, "")
              .replace(/[ ]{2,}/gi, " ")
              .replace(/\n +/, "\n")
              .replace(/[^a-zA-Z ]/g, "")
              .charAt(0)
              .toUpperCase() + value.slice(1)
          );
        case "AlphaNumaric":
          return (
            value
              .replace(/(^\s*)|(\s*$)/, "")
              .replace(/[ ]{2,}/gi, " ")
              .replace(/\n +/, "\n")
              .replace(/[^a-zA-Z0-9 ]/g, "")
              .charAt(0)
              .toUpperCase() + value.slice(1)
          );
        case "Number":
          return parseInt(value?.replace(/[^0-9\.]/g, ""));
        case "NumberString":
          return value?.replace(/[^0-9\.]/g, "");
        case "Phone":
          let str = value.replace(/[^0-9]/g, "");
          if (str.length >= 10) {
            // return str.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            return str;
          } else {
            return str;
          }
        case "Email":
          return value
            ?.replace(/(^\s*)|(\s*$)/, "")
            .replace(/[ ]{1,}/gi, "")
            .replace(/\n +/, "\n");
        case "":
          return value
            ?.replace(/(^\s*)|(\s*$)/, "")
            .replace(/[ ]{2,}/gi, " ")
            .replace(/\n +/, "\n");
        default:
          return value
            ?.replace(/(^\s*)|(\s*$)/, "")
            .replace(/[ ]{2,}/gi, " ")
            .replace(/\n +/, "\n");
      }
    } else {
      return "";
    }
  };

  const formChange = (name, type) => (e) => {

    if(name){
      let d = returningData(e?.target?.value, type);
      setData({ ...data, [name]: d });
      submittingData(name, d);
    }
    console?.log(data,"")
  };
  
  const formChangeCheckbox = (name, type) => (e) => {

    if(name){
      // let d = returningData(e?.target?.checked, type);
      setData({ ...data, [name]: e?.target?.checked });
      submittingData(name, e?.target?.checked);
    }
    console?.log(data,"check",e?.target?.checked)
  };
  const writeMultiSelect = (index, name, key) => (selectedValues) => {
    if(name){
      let fd = data[name];
      let present = fd[index];
      present[key] = selectedValues;
      fd[index] = present;
      setData({ ...data, [name]: fd });
      submittingData(name, "");
    }
    console?.log(data,selectedValues )
  };
  const MultipleTags = (index,name,key,addTags,) =>(e)=> {
    
   let obj = e?.map(v => (v?.__isNew__))
   let obj4=obj?.slice(-1)
 if (name) {
      let fd = data[name];
      let present = fd[index];
      present[key] = e;
      fd[index] = present;
      setData({ ...data, [name]: fd });
    }
   submittingData(name, "");
   if (obj4?.includes(true)) {
      addTags(e.slice(-1)[0].label)
    }

}
  const singleHandleValues = (key,addTags,) =>(e)=> {
    if(key){
      let obj = e?.map(v => (v?.__isNew__))
      let obj4=obj?.slice(-1)
     let obj3= e?.map((v)=>{return ({label:v.label,value:v.value})})
      setData({ ...data, [key]:obj3 });
      submittingData(key, "");
     
      if (obj4?.includes(true)) {
         addTags(e.slice(-1)[0].label)
       }
    }
   
 }

  const writeData = (index, name, key, type) => (e) => {
    e.preventDefault();
    
   
    if (name) {
      let d = returningData(e?.target?.value, type);
      let fd = data[name];
      let present = fd[index];
      present[key] = d;
      fd[index] = present;
      setData({ ...data, [name]: fd });
    }
    
    submittingData(name, e.target.value);
  };
  const writeDataSelect = (index, name, key, type) => (e) => {
  if(name){
    let obj=data[name]
    obj[index][key]=e
    setData({ ...data, [name]:obj });
  }
    
   
  };

  const writeAddObject = (index, name, obj) => {
    if (name) {
      let fd = data[name];
      let present = fd[index];
      
      present = { ...present, ...obj };
      fd[index] = present;
      setData({ ...data, [name]: fd });
    }
  };
  

  const writeDate = (index, name, key) => (e) => {
    let str;
    if (name) {
      if (e != null) {
        e?.setMinutes(0);
        e?.setHours(0);
        str = new Date(
          e?.setMinutes(
            e?.getTimezoneOffset() < 0
              ? -e?.getTimezoneOffset()
              : e?.getTimezoneOffset() || 0
          )
        );
      } else {
        str = "";
      }
    }
    if (name) {
      let fd = data[name];
      let present = fd[index];
      present[key] = str;
      fd[index] = present;
      setData({ ...data, [name]: fd });
    }
    submittingData(name, "");
  };
  const handleImageUpload = (name) => (e) => {
   
    e.preventDefault();
    
    const file = e.target.files[0];
    const fileType = file["type"];
 const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];
    if (!validImageTypes.includes(fileType)) {
      // notify(false, "Please select image or pdf files!!!");
      
    } else {
      
      setData({
        ...data,
        [name]: file,
      });
      submittingData(name, file);
    
    }
  };

  const handleSubmit = (e) => {
    
   e.preventDefault();
   
    isSubmitted = true;
    validateForm();
    console.log("xxx123",hasErrors)
    if (!hasErrors) {
    console.log("xxx123345")
     
      metadata?.submit(e.nativeEvent.submitter.name);
     } else {
      if(!metadata?.initialValues?.notShowMsg){}
      // notify(false, "Please enter the mandatory fields");
    }
  };

  const handleCapitalChange = (name) => (e) => {
    e.preventDefault();
    if (name) {
      let str = e.target.value
      str = str.charAt(0).toUpperCase() + str.slice(1);
      
      setData({
        ...data,
        [name]: str,
      });
  
      submittingData(name, str);
    }
  };
  

  const validateForm = () => {
    for (const key in metadata.validationSchema) {
      validateFormControl(key, data?.[key]);
    }
    setErrors(newErrors);
    var size = Object.keys(newErrors).length;
    if (size) {
      hasErrors = true;
    } else {
      hasErrors = false;
    }
    newErrors = {};
  };

  const submittingData = (name, value) => {
    if (isSubmitted) {
      validateFormControl(name, value);

      if (errors && errors[name] && !newErrors[name]) {
        delete errors?.[name]
        setErrors({
          ...errors,
          [name]: "",
        });
      } else {
        setErrors({
          ...errors,
          ...newErrors,
        });
      }
      newErrors = {};
    }
  };

  
  const validateInnerSchema = (parentKey, key, value,array) => {
    const schema = metadata.validationSchema;
    const validationFormControl = schema?.[parentKey]?.innerSchema?.[key];
    let innerErrors = {};
    if (validationFormControl?.required && !value) {
      innerErrors = {
        ...innerErrors,
        [key]: validationFormControl?.required?.message,
      };
    } else if (value&&validationFormControl?.minlength &&value.length < validationFormControl?.minlength?.value
    ) {
      innerErrors = {
        ...innerErrors,
        [key]: validationFormControl?.minlength?.message,
      };
    } else if (
      validationFormControl?.maxlength &&
      value.length > validationFormControl?.maxlength?.value
    ) {
      innerErrors = {
        ...innerErrors,
        [key]: validationFormControl?.maxlength?.message,
      };
    } 
    
    else if (
      validationFormControl?.pattern &&
      !validationFormControl.pattern?.value?.test(value)
    ) {
      innerErrors = {
        ...innerErrors,
        [key]: validationFormControl?.pattern?.message,
      };
    }
    else if (validationFormControl?.estimate) {

     array?.filter((v)=>{
        v?.estimateItems?.filter((val)=>{
          if(val?.status=="No"){
            innerErrors = {
              ...innerErrors,
              [key]: validationFormControl?.pattern?.message,
            };
          }
        })
      })
     
    }
    return innerErrors;
  };

  const validateFormControl = (key, value,) => {
    
    const schema = metadata.validationSchema;
    const validationFormControl = schema?.[key];
    
        if (validationFormControl?.required && !value) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.required?.message,
      };
    } 
  else if (validationFormControl?.type==true && !value) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.type?.message,
      };
    } 
    else if ( validationFormControl?.minlength &&value?.length < validationFormControl?.minlength?.value
    ) {
     
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.minlength?.message,
      };
    } else if (validationFormControl?.maxlength &&value.length > validationFormControl?.maxlength?.value) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.maxlength?.message,
      };
    }
   
     else if (validationFormControl?.pattern &&!validationFormControl.pattern?.value?.test(value) ) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.pattern?.message,
      };
    } 
    
    else if (validationFormControl?.per&&(parseFloat(value) >= 0 && parseFloat(value) <= 100)==false) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.per?.message,
      };
    }
    else if (validationFormControl?.patientPayment&&!(parseFloat(value).toFixed(2)<=validationFormControl?.patientPayment?.value)) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.patientPayment?.message,
      };
    }
    else if (validationFormControl?.quantity&&!(value <=validationFormControl?.quantity?.value)) {
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.quantity?.message,
      };
    }
    else if (validationFormControl?.matchPassword&&!(data?.["Password"]==data?.["ConfirmPassword"])) {
     
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.matchPassword?.message,
      };
    }
    else if (validationFormControl?.days) {
     
      newErrors = {
        ...newErrors,
        [key]: validationFormControl?.days?.message,
      };
    }
    
    else if (validationFormControl?.isArray && validationFormControl?.isArray?.value) {
      if (data?.[key] && data?.[key]?.length > 0) {
        let res = data?.[key]?.map((e, i) => {
          let innerErrors = {};
          for (const innerkey in validationFormControl?.innerSchema) {
            let res = validateInnerSchema(key, innerkey, e?.[innerkey] || "",data?.[key]);
            innerErrors = { ...innerErrors, ...res };
          }
          return innerErrors;
        });
        const allEmptyObjects = res.every((o) => Object.keys(o).length === 0);
        
        if (!allEmptyObjects) {
          newErrors = {
            ...newErrors,
            [key]: res,
          };
        }
      }
    }
   
  };
const headerlink=(array)=>{
  
  
}





const singleHandleTags = (providerTags,createTags,) =>(e)=> {

  setData({ ...data,[providerTags]:e})
 let obj=e[e.length - 1]
 if(obj?.__isNew__){
  createTags(obj)
}

  
 
}
  return {
    data,
    errors,
    isSubmitted,
    addValues,
    addObject,
    addObjectTwo,
    handlefChange,
    handlefeeChange,
    handleMultiple,
    handleUChange,
    handleChange,
    handleCapitalChange,
    handleSubmit,
    setValues,
    handleDateChange,
    handleEmailChange,
    handleRateChange,
    handleUpperChange,
    handleTimeChange,
    handleMaxChange,
    handleAlphabetChange,
    handleNumberChange,
    handleToggleChange,
    handleAlphanumaricChange,
    handleCheckbox,
    handleClear,
    handleCustomChange,
    handleCustom2Change,
    handleDataChange,
    setMultipleValues,
    setTwoValues,
    handleChangeSearch,
    handleChangeSearch2,
    handleChangeSearchTwo,
    handleMultiSelect,
    handleminMaxChange,
    handleMultiSelectComma,
    handlePriceFormateChange,
    ClearAllData,
    handleMultiSelectDropdown,
    handleDynamicFieldChange,
    addMultiple,
    addItem,
    removeItem,
    resetFormData,
    formChange,
    formChangeCheckbox,
    writeMultiSelect,
    writeData,
    writeAddObject,
    writeDate,
    MultipleTags,
    singleHandleValues,
    handleImageUpload,
    handleChangePercentage,
    writeDataCheckbox,
    writehandleChecked,
    handleEndTimeChange,
    handlecheckenTime,
    handleNumberquantity,
    writeDataSelect,
    headerlink,
    singleHandleTags,
    handleCheckboxTwo,
    phoneFormart
    
   
  };
};

import React, { useEffect, useState } from 'react'
import ReactCustomeTable from "react-data-table-component"

const ReactTableShare = ({dataTable,columns,search1,search}) => {
  const [data1,setData1]=useState()
  useEffect(()=>{
    setData1(dataTable)
  },[dataTable])

  useEffect(()=>{
    if(search&&search!=""&&search!=undefined){
     
      let event=search
      const filtered =dataTable&&dataTable?.filter(row =>
       
             Object?.values(row)?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||
             row?.userSpecialities&&Object?.values( row?.userSpecialities?.map((v)=>v.specialityName))?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))||

             row?.userHospitals&&Object?.values( row?.userHospitals?.map((v)=>v.hospitalName))?.some(value =>value?.toString()?.toLowerCase()?.includes(event?.toLowerCase()))
             );

             setData1(filtered);
    }
    else{
      setData1(dataTable)
    }
      },[search])
  return (
    <div >
     
        <ReactCustomeTable  data={data1?data1:[]}
        columns={columns?columns:[]} 
        customStyles={customStyles}
        className=' border rounded '
        // defaultSortAsc
        fixedHeaderScrollHeight='auto'
        highlightOnHover
         pagination
        subHeader
         subHeaderComponent={search1&&search1!=undefined&&<div style={{backgroundColor:"#e0edfa", }} className='col-12  rounded px-1 mb-1 py-1' >{search1()||[]}</div>}
        
     
        />
    </div>
  )
}

export default ReactTableShare
export const customStyles = {
  title: {
    style: {
      fontColor: '#e0edfa',
      fontWeight: '900',
    }
  },
  rows: {
    style: {
     marginLeft:"0px",
    
      
    }
  },
  
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: '600',
      textTransform: 'uppercase',
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
      backgroundColor:"#91CAE0",
          color:"#000",
          marginLeft:"0px",
      //     background: "transparent linear-gradient(92deg, rgba(246, 245, 248, 1) 0%, rgba(226, 242, 240, 1) 42%, rgba(199, 238, 230, 1) 64%, rgba(228, 214, 240, 1) 100%) 0% 0% no-repeat padding-box",
      // opacity: 1,
      
    },
  },
  cells: {
    style: {
      fontSize: '14px',
     fontFamily:'-apple-system, BlinkMacSystemFont',
     fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
  fontWeight: 400,
  lineHeight: 1.5,
  color: "#212529",
 
  width:"8px",
  
  
    },
  },
  
};
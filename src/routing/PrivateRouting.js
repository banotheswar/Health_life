import React from 'react'

const PrivateRouting = (props) => {
    let token=sessionStorage.getItem("token")
  return token&&token?props?.children:window.location.pathname="/"
}

export default PrivateRouting

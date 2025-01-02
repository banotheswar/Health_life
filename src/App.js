import React, { Suspense } from "react";

import "./App.css";
import { BrowserRouter} from "react-router-dom";
import RoutingConfig from "./routing/RoutingConfig";
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
   
    
    <Suspense fallback={()=><div>Loading...</div>}>
 <BrowserRouter>
    <ToastContainer />
   <RoutingConfig/>
  
   </BrowserRouter>
    </Suspense>
   
   
   
  );
}

export default App;

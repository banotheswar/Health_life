import React, { useEffect } from "react";
import { imageUrl } from "../services/Urls";

const Razorpay = ({ parentCallback, amount ,setIsModalOpen}) => {
  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      // Check if the script has loaded
      if (window.Razorpay) {
        // Proceed to open the payment modal only after the script is loaded
        openPayModal();
      } else {
        console.error("Razorpay SDK failed to load.");
      }
    };

    script.onerror = () => {
      console.error("Failed to load the Razorpay script");
    };

    document.body.appendChild(script);
  }, []);
//LIVE:rzp_live_YkNslagNrHejS0;
//TEST:rzp_test_0Pmy6dBozgLBY0
console?.log(imageUrl+"Organization/logo.png")
  const openPayModal = () => {
    const options = {
      key: "rzp_live_YkNslagNrHejS0",
      amount: (amount * 100).toString(), // Convert to smallest currency unit
      name: "BluHealth",
      description: "BluHealth",
      image: imageUrl+"Organization/logo.png",
      handler: async (res) => {
       
        parentCallback(res);
       
         // Pass the response back to the parent component
      },
      // prefill: {
      //   name: "BluHealth",
      //   contact: "9863257854",
      //   email: "BluHealth@demo.com",
      // },
      notes: {
        address: "some address",
      },
      theme: {
        color: "#0000",
        hide_topbar: false,
      },
      modal: {
        ondismiss: function () {
          // Handle when the user clicks the close button
          console.log("Modal closed by the user.");
          setIsModalOpen(""); // Update state to close the modal
        },
      },
    };

    // Ensure Razorpay object is available
    if (window.Razorpay) {
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    
      
    } else {
      console.error("Razorpay is not available");
    }
  };

  return <></>;
};

export default Razorpay;

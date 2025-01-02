import React, { useEffect, useState } from "react";


import Login_logo from "../assets/images/hmslogo.jpg";
import { UseFormValidations } from "../validations/UseFormValidation";
import { useNavigate } from "react-router-dom";
import { icons } from "./ShareComp";

const Login = () => {
  const [fgt, setFgt] = useState(true);
  const navigateTo = useNavigate();
  const [password, setPassword] = useState(true);

  const submit = async () => {
    let payload = data;
    sessionStorage.setItem("token", payload);
    navigateTo("/healthlife/dashboard/all");
  };

  const { data, errors, addObject, handleEmailChange, handleSubmit } =
    UseFormValidations({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: {
        email: {
          required: {
            value: true,
            message: "Please enter a valid e-mail",
          },
          pattern: {
            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
            message: "Please enter a valid E-mail",
          },
        },
        password: {
          required: {
            value: true,
            message: "Please enter the correct password",
          },
        },
      },
      submit: submit,
    });

  const handlePass = () => {
    setPassword(!password);
  };

  const errorsColor = (key) => {
    return errors && errors?.[key]
      ? "form-control  py-3 border border-danger"
      : "form-control  py-3";
  };
  useEffect(() => {
    if (fgt == false) {
      data["password"] = "123456";
    } else {
      addObject({ password: "" });
    }
  }, [fgt]);

  return (
    <div className="">
      <div>
        <div className="col-md-12">
          <div className="your-container col-md-12">
            <form
              onSubmit={handleSubmit}
              className="d-flex justify-content-center  align-items-center"
              style={{ height: "100vh",overflowY:"hidden" }}
            >
              <div className="col-md-4  bg-white row  d-flex flex-wrap justify-content-center align-items-center p-4 rounded">
                <div className="col-md-12 text-center ">
                
                  <img
                    src={Login_logo}
                    className="img-fluid "
                    style={{height:"10rem",}}
                  />
                </div>

                <p className="col-md-12 text-center py-2">Glad to have you back!</p>
                <div className="col-md-12 py-1">
                  <label>Email</label>
                  <input
                    className={errorsColor("email")}
                    placeholder="Enter Email"
                    onChange={handleEmailChange("email")}
                  />
                </div>
                {fgt && (
                  <div className="col-md-12 py-1 ">
                    <label className="col-md-10 ">Password</label>
                    <div className="password-container ">
                      <input
                        type={password ? "password" : "text"}
                        className={`${errorsColor("password")} password-input`}
                        name="password"
                        placeholder="Enter Password"
                        value={data?.password}
                        onChange={handleEmailChange("password")}
                      />
                      <span onClick={handlePass} className="eye-icon">
                        {password ? icons.eyeClose : icons.eyeOpen}
                      </span>
                    </div>
                    {/* <div className="text-danger">{errorsMsg("password")}</div> */}
                  </div>
                )}
                <p className="text-end py-1 text-primary col-12">
                  <span className="ptr" onClick={() => setFgt(!fgt)}>
                    {fgt ? "Forgot Password?" : "Login"}
                  </span>
                </p>

                <div className="col-12 py-1">
                  <button
                    type="submit"
                    className="btn bg_btn col-12 text-white "
                  >
                    {fgt ? "Login" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

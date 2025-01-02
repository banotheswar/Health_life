import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { icons, notify, save } from "./ShareComp";
import { UseFormValidations } from "../validations/UseFormValidation";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { url } from "../services/Urls";
import logo from "../assets/images/loginbanner.jpg";
const ChangePassword = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState(true);
  const [show, setShow] = useState({ new: true, conform: true });

  const submit = async () => {
    if (data?.Password && data?.Password == data?.ConfirmPassword) {
      data["token"] = userId;
      let body = {
        token: userId,
        password: data?.Password,
      };
      let res = await save(url?.forgotPassword.updatePassword, body);
      if (res?.status) {
        navigate("/");
      }
    } else {
      notify(false, "Password and Confirm Password should be same!!");
    }
  };
  useEffect(() => {
    sessionStorage?.clear();
  }, []);
  const {
    data,
    errors,
    setValues,
    handleChange,
    handleSubmit,
    handleEmailChange,
  } = UseFormValidations({
    initialValues: {
      Password: "",
      ConfirmPassword: "",
      notShowMsg: true,
    },
    validationSchema: {
      ConfirmPassword: {
        required: {
          value: true,
          message: "Please enter confirm password",
        },
      },
      Password: {
        required: {
          value: true,
          message: "Please enter new password",
        },
        minlength: {
          value: 8,
        //   message:"Password should contain one uppercase,one lowercase, one special character, one number and should be greater than 8 characters",
        },
        pattern: {
          value:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        //   message: "Password should contain one uppercase,one lowercase, one special character, one number and should be greater than 8 characters",
        },
      },
    },
    submit: submit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        <div className="col-md-4 p-3 rounded  border my-4 ">
          <div className="d-flex flex-wrap justify-content-center">
            <img src={logo} className=" img-fluid " />
          </div>
          <div className="col-12">
            <label>New Password</label>
            <input
              className="form-control py-3"
              autoComplete="off"
              placeholder="New Password"
              onChange={handleChange("Password")}
            />
            <div className="">
              {errors && errors?.Password && (
                <div className=" text-danger">{errors?.Password}</div>
              )}
            </div>
          </div>

          <div className="col-12 py-2">
          <label>Confirm Password</label>
          <div className="password-container ">
            <input
              type={password ? "password" : "text"}
              className="form-control py-3 password-input "
              name="password"
              placeholder="Confirm Password"
              autoComplete="off"
              value={data?.ConfirmPassword}
              onChange={handleEmailChange("ConfirmPassword")}
            />
            <span onClick={() => setPassword(!password)} className="eye-icon">
              {password ? icons.eyeClose : icons.eyeOpen}
            </span>
          </div>
          </div>
          <div className="d-flex mr_25">
            {errors && errors?.ConfirmPassword && (
              <p className=" text-danger">{errors?.ConfirmPassword}</p>
            )}
          </div>
          <label className="fornt-weight-bold py-2">Note</label>
          <div className="text-danger bg-white p-1">
            Password should contain one uppercase,one lowercase, one special
            character, one number and should be greater than 8 characters
          </div>
          <div className="col-12 py-4">
            <button className="btn col-12 border bg_btn text-white">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;

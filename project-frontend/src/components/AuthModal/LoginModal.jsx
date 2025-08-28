import React from "react";
import { useContext, useState } from "react";
import { Grid, Button, InputAdornment, IconButton, } from "@mui/material";
import classes from "./LoginModal.module.scss";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import Captcha from "../../commoncomponents/Captcha/Captcha";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import JWTContext from "../../contexts/JWTContext";
import * as yup from "yup";
import { encodeData } from "../../utils/commonEnum";
import { Link } from "react-router-dom";


const LoginModal = () => {
  const [isValidCaptcha, setIsValidCaptcha] = useState(false);
  const [generateCaptcha, setGenerateCaptcha] = useState(false);
  const userType = location.pathname.split("/")[1] || "agent";

  const { login } = useContext(JWTContext);

  const [passwordVisibility, setPasswordVisibility] = useState({
    vendorPassword: false,
  });

  const handlePasswordToggle = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const formik = useFormik({
    initialValues: {
        email: "",
        password: "",
    },

    validationSchema: yup.object({
        email: yup.string().email("Invalid email address").required("This Field is Required"),
        password: yup.string().required("Password is required")
    }),
    onSubmit: (values) => {
        submit(values);
    },
  });

  //Login Submit for login
  const submit = async (values) => {
    try {
      await login(
        values?.email,
        values?.password,
      );
    } catch (error) {
      console.log('error',error);
      
    }
  }

  return (
      <Grid container className="my-8 !justify-center">
        <Grid item xs={12} sm={8} md={6} lg={5}>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          className={`${classes.registerGrid}`}
        >
          <h1 className={`${classes.registerTitle} !text-primary-Color1`}>
             Login
          </h1>
        </Grid>        
        <div className={`${classes.loginBox}`}>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3} className="!-mt-3">
                <Grid item xs={12}>
                    <InputBox
                    label={
                        <span>
                        Email Address<span className="lableStar">*</span>
                        </span>
                    }
                    size="small"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.email && Boolean(formik.errors.email)
                    }
                    helperText={
                        formik.touched.email && formik.errors.email
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <InputBox
                    size="small"
                    type={
                        passwordVisibility.vendorPassword ? "text" : "password"
                    }
                    label={
                        <span>
                        Password<span className="lableStar">*</span>
                        </span>
                    }
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            onClick={() =>
                            handlePasswordToggle("vendorPassword")
                            }
                            onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                        >
                            {passwordVisibility.vendorPassword ? (
                            <EyeFilled className={`${classes.eyeIcon}`} />
                            ) : (
                            <EyeInvisibleFilled
                                className={`${classes.eyeIcon}`}
                            />
                            )}
                        </IconButton>
                        </InputAdornment>
                    }
                    />
                </Grid>

                <Grid item xs={12}>
                    <span className={`${classes.captchaText}`}>
                    Enter the Captcha Below
                    </span>
                    <Captcha
                    isValidCaptcha={isValidCaptcha}
                    setIsValidCaptcha={setIsValidCaptcha}
                    isGenerate={generateCaptcha}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    size="medium"
                    className="btnCapital"
                    type="submit"
                    value="vendor"
                    disabled={!isValidCaptcha}
                    >
                    LOGIN
                    </Button>
                </Grid>
                </Grid>
            </form>
            </div>
          </div>
        </Grid>
      </Grid>
  );
};

export default LoginModal;

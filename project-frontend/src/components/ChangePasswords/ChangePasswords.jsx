import { CloseOutlined, EyeFilled, EyeInvisibleFilled, SaveOutlined } from "@ant-design/icons";
import { Button, Card, CardContent, Grid, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import Breadcrumb from "../../commoncomponents/Breadcrumb/Breadcrumb";
import { useSnackbar } from "../../utils/SnackbarProvider";
import useAuth from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as yup from "yup";
import { commonLoader, encodeData, StatusCode } from "../../utils/commonEnum";
import { updatePassword } from "../../api/auth";
// import { updateNewPassword } from "../../api/common";

const ChangePasswords = () => {
  const { showSnackbar } = useSnackbar();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handlePasswordToggle = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogout = async () => {
    
    try {
      await logout();
      navigate(`/login`, {
        state: {
          from: ''
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  //otp validation
  const validationSchema = yup.object({
    oldPassword: yup
      .string()
      .required("Old Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    ),
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)"
    ),
    confirmnewpassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm New Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmnewpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = async (values) => {
    const encodeOldPassword = await encodeData(values.oldPassword);
    const encodeNewPassword = await encodeData(values.newPassword);
    const encodeConfirmNewPassword = await encodeData(values.confirmnewpassword);

    const response = await updatePassword({
        current_password: encodeOldPassword,
        new_password: encodeNewPassword,
        confirm_new_passowrd: encodeConfirmNewPassword,
    });

    if (response.statusCode == StatusCode.success) {
      showSnackbar(response.message, "success");
      handleLogout();
    } else {
      commonLoader("hide");
      showSnackbar(response.message, "error");
    }
  };

  const empListingdata = { title: "Change Password" };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* page heading */}
      <Grid item xs={12} className="addCardHeadingSeparate !mb-3">
        <Breadcrumb {...empListingdata} />
      </Grid>

      {/* Form */}
      <Grid item xs={12}>
        <Card variant="outlined" className="addCardMain">
          <CardContent className="addCardContents">
            <Grid container justifyContent={"center"} className="gridMargin mt-3">
              <Grid item xs={12} sm={8} md={8} lg={5}>
                <InputBox
                  label={
                    <span>
                      Old Password<span className="lableStar">*</span>
                    </span>
                  }
                  size="small"
                  type={
                    passwordVisibility.oldPassword ? "text" : "password"
                  }
                  name="oldPassword"
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
                  }
                  helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          onClick={() =>
                          handlePasswordToggle("oldPassword")
                          }
                          onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                      >
                          {passwordVisibility.oldPassword ? (
                          <EyeFilled className="text-lg text-other-Gray6" />
                          ) : (
                          <EyeInvisibleFilled className="text-lg text-other-Gray6" />
                          )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

            <Grid container justifyContent={"center"} className="gridMargin">
              <Grid item xs={12} sm={8} md={8} lg={5}>
                <InputBox
                  label={
                    <span>
                      New Password<span className="lableStar">*</span>
                    </span>
                  }
                  size="small"
                  type={
                    passwordVisibility.newPassword ? "text" : "password"
                  }
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.newPassword && Boolean(formik.errors.newPassword)
                  }
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          onClick={() =>
                          handlePasswordToggle("newPassword")
                          }
                          onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                      >
                          {passwordVisibility.newPassword ? (
                          <EyeFilled className="text-lg text-other-Gray6" />
                          ) : (
                          <EyeInvisibleFilled className="text-lg text-other-Gray6" />
                          )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>

            <Grid container justifyContent={"center"} className="gridMargin">
              <Grid item xs={12} sm={8} md={8} lg={5}>
                <InputBox
                  label={
                    <span>
                      Confirm New Password<span className="lableStar">*</span>
                    </span>
                  }
                  size="small"
                  type={
                    passwordVisibility.confirmPassword ? "text" : "password"
                  }
                  name="confirmnewpassword"
                  value={formik.values.confirmnewpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmnewpassword &&
                    Boolean(formik.errors.confirmnewpassword)
                  }
                  helperText={
                    formik.touched.confirmnewpassword &&
                    formik.errors.confirmnewpassword
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          onClick={() =>
                          handlePasswordToggle("confirmPassword")
                          }
                          onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                      >
                          {passwordVisibility.confirmPassword ? (
                          <EyeFilled className="text-lg text-other-Gray6" />
                          ) : (
                          <EyeInvisibleFilled className="text-lg text-other-Gray6" />
                          )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* form action */}
      <Grid item xs={12} className="btnSeparate">
        <Button
          variant="contained"
          color="success"
          size="small"
          className="btnStyle"
          type="submit"
        >
          <SaveOutlined className="mr-1" />
          Update
        </Button>

        <Link to={"/dashboard"}>
          <Button
            variant="contained"
            color="info"
            size="small"
            className="btnStyle"
          >
            <CloseOutlined className="mr-1" />
            Cancel
          </Button>
        </Link>
      </Grid>
    </form>
  );
};

export default ChangePasswords;

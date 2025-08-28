import {
  BackwardOutlined,
  CloseOutlined,
  EyeFilled,
  EyeInvisibleFilled,
  EyeOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import InputBox from "../../commoncomponents/InputBox/InputBox";
import Breadcrumb from "../../commoncomponents/Breadcrumb/Breadcrumb";
import FileUpload from "../../commoncomponents/FileUpload/FileUpload";
//   import { createBrandModels, getBrands } from "../../api/adminApplication";
import {
  acceptFileType,
  commonLoader,
  commonPatchValueForFile,
  filesTypes,
  maxFileSize,
  pdfFileFormatMessage,
  pdfFileSizeMessage,
  pdfUploadFileSize,
  regexChar,
  StatusCode,
} from "../../utils/commonEnum";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "../../utils/SnackbarProvider";
import { oilsdetails } from "../../api/common";

const UsersMaster = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const brandModalList = location.state?.row;
  const [dataList, setDataList] = useState(null);
  const [resumeView, setResumeView] = useState(null);
  const [passwordVisibility, setPasswordVisibility] = useState({
      oldPassword: false,
      newPassword: false,
  });

  const handlePasswordToggle = (field) => {
      setPasswordVisibility((prev) => ({
          ...prev,
          [field]: !prev[field],
      }));
  };
  
  // Validation schema using Yup
  const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      type: Yup.string().required("type is required"),
      image: Yup.string().required("image url required"),
      status: Yup.string(),
  });
  
  const formik = useFormik({
      initialValues: {
      name: "",
      type: "",
      image: "",
      status: 0,
      },
      validationSchema,
      onSubmit: (values) => {
      submitForm(values);
      },
  });
  
  const resetFun = () => {
      formik.setFieldValue("name", "");
      formik.setFieldValue("type", "");
      formik.setFieldValue("image", "");
      formik.setFieldValue("status", 1);
  }
  
  
  const submitForm = async (values) => {
      const formData = new FormData();
  
  
  
      formData.append("name", values.name);
      formData.append("type", values.type);
      formData.append("image", values.image);
      formData.append("status", values.status ? 1 : 0);
  
      // // Make the API call
      const response = await oilsdetails(formData);
  
      // Handle the response
      if (response.statusCode == StatusCode.success) {
      showSnackbar(response.message, "success");
      resetFun()
    //   navigate("/user-master");
      } else {
      commonLoader("hide");
      showSnackbar(response.message, "error");
      }
  };
  
  const empListingdata = {
      title: "Engine Oil",
      links: "/engineoil-list",
      items: [
      {
          label: "Add Engine Oil",
          // link: "/brand-add"
      },
      ],
  };
  
  // brand list API
  const getBrandDetails = async () => {
      // const response = await getBrands({});
      // if (response.statusCode == StatusCode.success) {
      // setDataList(response.data.list);
      // }
  };
  
  const fileShow = async (file_name) => {
      let file = await commonPatchValueForFile(file_name);
      if (file) {
      setResumeView(file);
      const fileURL = URL.createObjectURL(file);
      if (resumeView || fileURL) {
          window.open(fileURL, "_blank", "noopener,noreferrer");
      }
      }
  };
  
  useEffect(() => {
      getBrandDetails();
  }, []);
  
  useEffect(() => {
      if (brandModalList) {
      formik.setFieldValue("name", brandModalList.name || "");
      formik.setFieldValue("email", brandModalList.type || "");
      formik.setFieldValue("mobile_no", brandModalList.image || "");
      formik.setFieldValue("status", brandModalList.status || "");
      }
  }, [brandModalList]);
  
  return (
      <>
      {/* page heading */}
      <Grid item xs={12} className="addCardHeadingSeparate !mb-3">
          <Breadcrumb {...empListingdata} />
  
          <Link  to="/engineoil-list">
          <Tooltip title="Back" placement="bottom" arrow>
              <Button
              variant="contained"
              color="info"
              size="small"
              className="buttonStyle"
              >
              <BackwardOutlined className="mr-0" />
              </Button>
          </Tooltip>
          </Link>
      </Grid>
  
      {/* Brand Details */}
      <form onSubmit={formik.handleSubmit}>
          <Grid item xs={12}>
          {/* basic details */}
          <Card variant="outlined" className="addCardMain">
              <h2 className="addPageTitle">Engine Oil Details</h2>
              <CardContent className="addCardContents">
              <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  className="gridMargin"
              >
                  <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  lg={5}
                  className="columnSeparate"
                  >

  
                  <InputBox
                      label={
                      <span>
                         Engine oil Name<span className="lableStar">*</span>
                      </span>
                      }
                      size="small"
                      type="text"
                      placeholder=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                      name="name"
                      value={formik.values.name}
                      onChange={(e) => {
                      const value = e.target.value;
  
                      if (regexChar.test(value)) {
                          formik.setFieldValue('name', value);
                      }
                      }}
                      onBlur={formik.handleBlur}
                      error={
                      formik.touched.name &&
                      Boolean(formik.errors.name)
                      }
                      helperText={
                      formik.touched.name && formik.errors.name
                      }
                  />
                   <InputBox
                      label={
                      <span>
                         Bike/Activa<span className="lableStar">*</span>
                      </span>
                      }
                      size="small"
                      type="text"
                      placeholder=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                      name="type"
                      value={formik.values.type}
                      onChange={(e) => {
                      const value = e.target.value;                     
                    formik.setFieldValue('type', value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                      formik.touched.type &&
                      Boolean(formik.errors.type)
                      }
                      helperText={
                      formik.touched.type && formik.errors.type
                      }
                  />
                  </Grid>
  
                  <Grid
                  item
                  xs={12}
                  sm={7}
                  md={5}
                  lg={5}
                  className="columnSeparate"
                  >
                   <InputBox
                    label={
                      <span>
                        Image Url<span className="lableStar">*</span>
                      </span>
                    }
                    size="small"
                    type="text"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    name="image"
                    value={formik.values.image}
                    onChange={(e) => {
                      const value = e.target.value;
                        formik.setFieldValue("image", value);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                  />
  
                  <FormControlLabel
                      className="checkboxLabel checkSpacing"
                      name="status"
                      control={
                      <Checkbox
                          checked={formik.values.status === 1}
                          onChange={(e) =>
                          formik.setFieldValue(
                              "status",
                              e.target.checked ? 1 : 0
                          )
                          }
                          size="medium"
                          color="success"
                      />
                      }
                      label="Active"
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
              className="buttonStyle"
              type="submit"
          >
              <SaveOutlined className="mr-1" />
              Save
          </Button>
  
          <Link  to="/engineoil-list">
              <Button
              variant="contained"
              color="info"
              size="small"
              className="buttonStyle"
              >
              <CloseOutlined className="mr-1" />
              Cancel
              </Button>
          </Link>
          </Grid>
      </form>
      </>
  );
};

export default UsersMaster

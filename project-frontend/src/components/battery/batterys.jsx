import {
  BackwardOutlined,
  CloseOutlined,
  DeleteOutlined,
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
import { batterysdetails } from "../../api/common";
// import FileUpload from "../../commoncomponents/FileUpload/FileUpload";

const Batterys = () => {
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [options, setOptions] = useState([]);
  const categoryData = location.state?.row; // Update to match your data structure
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [errorMessage1, setErrorMessage1] = useState("");

  // Handle File Select
  const handleFileSelect = (file, index) => {
    const updatedValues = [...formik.values.plant_image];
    updatedValues[index] = file;
    formik.setFieldValue("plant_image", updatedValues);
  };

  const handlePasswordToggle = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    size: Yup.string().required("Name is required"),
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

  // upload specification
  const handleFileSelect1 = (event) => {
    const file = event;
    // if (file) {
    //   if (!filesTypes.includes(file.type)) {
    //     setErrorMessage1(pdfFileFormatMessage);
    //     setSelectedFile1(null);
    //   } else if (file.size > maxFileSize) {
    //     setErrorMessage1(pdfFileSizeMessage);
    //     setSelectedFile1(null);
    //   } else {
    //     setSelectedFile1(file);
    //     setErrorMessage1("");
    //     formik.setFieldValue("file", file); // Set the file in Formik's values
    //   }
    // }
  };

  const resetFun = () => {
    formik.setFieldValue("name", "");
    formik.setFieldValue("type", "");
    formik.setFieldValue("size", "");
    formik.setFieldValue("image", "");
    formik.setFieldValue("status", 1);
  };

  const submitForm = async (values) => {
    // API Call placeholder
    const response = await batterysdetails(values); // Your API call
    if (response) {
      showSnackbar(response.message, "success");
      resetFun();
    } else {
      showSnackbar("An error occurred", "error");
    }
  };

  const empListingdata = {
    title: "Battery",
    links: "/battery-list",
    items: [
      {
        label: "Add Battery",
        // link: "/category-add"
      },
    ],
  };

  useEffect(() => {
    if (categoryData) {
      formik.setFieldValue("name", categoryData.name || "");
      formik.setFieldValue("type", categoryData.type || "");
      formik.setFieldValue("size", categoryData.size || "");
      formik.setFieldValue("status", categoryData.status || "");
      // Add other fields from categoryData here as necessary
    }
  }, [categoryData]);

  return (
    <React.Fragment>
      {/* page heading */}
      <Grid item xs={12} className="addCardHeadingSeparate !mb-3">
        <Breadcrumb {...empListingdata} />

        <Link to={"/battery-list"}>
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

      {/* Category Details */}
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
                         Battery Name<span className="lableStar">*</span>
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
                         Battery Size<span className="lableStar">*</span>
                      </span>
                      }
                      size="small"
                      type="text"
                      placeholder=""
                      InputLabelProps={{
                      shrink: true,
                      }}
                      name="size"
                      value={formik.values.size}
                      onChange={(e) => {
                      const value = e.target.value;
                          formik.setFieldValue('size', value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                      formik.touched.size &&
                      Boolean(formik.errors.size)
                      }
                      helperText={
                      formik.touched.size && formik.errors.size
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
    </React.Fragment>
  );
};

export default Batterys;

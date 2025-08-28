import React, { useState } from "react";
import { Autocomplete, Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import classes from "./Dashboards.module.scss";
import TotalUserGraph from "./TotalUserGraph";
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import Breadcrumb from "../../commoncomponents/Breadcrumb/Breadcrumb";

// Function to generate a random color
const colors = ["#27A4CA", "#832481", "#FBCE2B", "#3AB678", "#DF8169"];


const Dashboards = () => {
  const [values, setValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State to control date picker dialog


  const handleDateClick = () => {
        setIsOpen(true); // Open the date picker dialog when the icon is clicked
      };
      
  const dashboardData = [
    {
      id: 1,
      value: "24,870 kWh",
      bgcolor: "#ffffff",
      title: "Total Tyres",
      icon: <img src="/assets/dashboardIcons/bluethunder.svg" size={24} color="white" />,
    },
    {
      id: 2,
      value: "₹789.19",
      bgcolor: "#ffffff",
      title: "Total Engine oils",
      icon: <img src="/assets/dashboardIcons/rupeeround.svg" size={24} color="white" />,
    },
    {
      id: 3,
      value: "7 kW",
      bgcolor: "#ffffff",
      title: "Total Battery",
      icon: <img src="/assets/dashboardIcons/booksolar.svg" size={24} color="white" />,
    },
    // {
    //   id: 4,
    //   value: "7 T/W",
    //   bgcolor: "#ffffff",
    //   title: "Carbon Avoided",
    //   icon: <img src="/assets/dashboardIcons/carbonicon.svg" size={24} color="white" />,
    // },
    // {
    //   id: 5,
    //   value: "About more info",
    //   bgcolor: "#ffffff",
    //   title: "Service Name",
    //   icon: <img src="/assets/dashboardIcons/serviceicon.svg" size={24} color="white" />,
    // },
  ];

  const solarProjects = [
    {
      id: 1,
      projectName: "Project Name",
      projectManager: "Project Manager",
      capacity: "17 W",
      status: "Photons Up, Network down",
      description:
        "Due to a network hiccup, Energy data isn’t reflecting here. Rest assured, the plant is up and credits are getting metered. We’ll be back soon!",
      image: "/assets/sol1.jpeg", // Replace with the actual image
      bgColor: "#EFF6FF", // Light blue background
    },
    {
      id: 2,
      projectName: "Project Name",
      projectManager: "Project Manager",
      capacity: "17 W",
      status: "Photons Up, Network down",
      description:
        "Due to a network hiccup, Energy data isn’t reflecting here. Rest assured, the plant is up and credits are getting metered. We’ll be back soon!",
      image: "/assets/sol2.jpeg", // Replace with the actual image
      bgColor: "#FEF7DC", // Light yellow background
    },
    {
      id: 2,
      projectName: "Project Name",
      projectManager: "Project Manager",
      capacity: "17 W",
      status: "Photons Up, Network down",
      description:
        "Due to a network hiccup, Energy data isn’t reflecting here. Rest assured, the plant is up and credits are getting metered. We’ll be back soon!",
      image: "/assets/sol2.jpeg", // Replace with the actual image
      bgColor: "#FEF7DC", // Light yellow background
    },
    {
      id: 3,
      projectName: "Project Name",
      projectManager: "Project Manager",
      capacity: "17 W",
      status: "Photons Up, Network down",
      description:
        "Due to a network hiccup, Energy data isn’t reflecting here. Rest assured, the plant is up and credits are getting metered. We’ll be back soon!",
      image: "/assets/sol2.jpeg", // Replace with the actual image
      bgColor: "#FEF7DC", // Light yellow background
    },
    {
      id: 4,
      projectName: "Project Name",
      projectManager: "Project Manager",
      capacity: "17 W",
      status: "Photons Up, Network down",
      description:
        "Due to a network hiccup, Energy data isn’t reflecting here. Rest assured, the plant is up and credits are getting metered. We’ll be back soon!",
      image: "/assets/sol2.jpeg", // Replace with the actual image
      bgColor: "#FEF7DC", // Light yellow background
    },
  ];

  const stagesData = [
    { key_id: 1, value: " Application" },
    { key_id: 1, value: " Application" },
    { key_id: 1, value: " Application" },
  ];



  const empListingdata = {
    title: "Dashboard",
  };

  return (
    <Grid container>
      <Grid container item xs={12} className="headingSeparate">
        <Grid item xs={12} sm={4} md={3} lg={1.5}>
          <Breadcrumb {...empListingdata} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ padding: 2 }}>
        {dashboardData.map((item, index) => {
          const uniqueColor = colors[index % colors.length]; // Assign a new random color
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} key={item.id}>
              <div className="flex gap-10 rounded-lg p-5 bg-white shadow-md">
                <div>
                  <p className="font-bold text-mediumtext">{item.title}</p>
                  <p className="font-bold text-mediumtext" style={{ color: uniqueColor }}>
                    {item.value}
                  </p>
                </div>
                <div className="w-16 h-16">{item.icon}</div>
              </div>
            </Grid>
          );
        })}
      </Grid>
      <Grid item className={`${classes.horizontalDivider}`}></Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
          <div className={`${classes.graphBox}`}>
            {/* graph heading */}
            <div className={`${classes.graphHeader}`}>
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={4} md={4} lg={3.7}>
                  <div className={`${classes.totalUser}`}>
                    <p className={`${classes.graphHeading}`}>Total Users</p>
                    <p className={`${classes.graphHeading}`}>
                      Total 
                    </p>
                  </div>
                </Grid>

                <Grid item xs={12} sm={2} md={2} lg={3.6}>
                  <div className={`${classes.dotsGaps}`}>
                    <span className={`${classes.dots} bg-[#3DF210]`} />
                    <Autocomplete
                      fullWidth
                      disableClearable
                      size="small"
                      className="searchAutoBox graphDropdown"
                      options={stagesData}
                      getOptionLabel={(option) => option.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          size="small"
                          placeholder="Select Stage"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={4} sm={2} md={2} lg={1.7}>
                  <div className={`${classes.dotsGaps}`}>
                       <span className={`${classes.dots} bg-[#A8C5DA]`} />
                       <p className={`${classes.graphHeading}`}>Last Year</p>
                     </div>
                   </Grid>
                   <Grid item xs={4} sm={2} md={2} lg={1.7}>
                   <div className={`${classes.dotsGaps}`}>
                      <span className={`${classes.dots} bg-primary-Color1`} />
                      <p className={`${classes.graphHeading}`}>This Year</p>
                    </div>
                  </Grid>

                  <Grid item xs={4} sm={2} md={2} lg={1.3}>
                  <div
                      className={`${classes.dotsGaps} cursor-pointer`}
                      onClick={handleDateClick}
                    >
                      <p className={`${classes.graphHeading}`}>Date</p>

                      <DatePicker
                        value={values}
                        onChange={setValues}
                        range
                        render={<Icon width={18} height={18} />}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="px-4">
                 <TotalUserGraph />
              </div>
            </div>
          </Grid>
      <Grid item className={`${classes.horizontalDivider}`}></Grid>
    </Grid>
  );
};

export default Dashboards;

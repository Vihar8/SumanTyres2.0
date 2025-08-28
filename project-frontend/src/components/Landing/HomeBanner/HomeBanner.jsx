import React from 'react'
import SolarImg from '/assets/home_img/home_banner.png';
import charger from '/assets/home_img/charger.svg';
import classes from "../../Landing/Landing.module.scss";
import { Button, Grid } from '@mui/material';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
    "/assets/slider2.jpg",
    "/assets/slider3.jpg",
    "/assets/slider4.jpg",
    "/assets/slider5.jpg",
    "/assets/slider6.jpg",
    "/assets/slider7.jpg",
  ];

const HomeBanner = () => {
  return (
    <>
        <Grid container className='pb-8'>
        <Grid item xs={12} padding={2}>
            <Swiper
            modules={[Pagination, Autoplay]} 
            pagination={{ clickable: true }} 
            autoplay={{ delay: 3000 }} 
            loop   
            >
              {images.map((src, index) => (
                <SwiperSlide key={index} className={`${classes.sliderbtn}`}>
                  <img src={src} alt={`Slide ${index + 1}`} className={`${classes.imgggg}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
    </>
  )
}

export default HomeBanner
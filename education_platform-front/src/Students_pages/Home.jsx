import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import Navbar from '../Students_component/Navbar'
import Sidenav from '../Students_component/Sidenav'
import CustomCard from '../Students_component/CustomCard';
import LinearBuffer from '../Students_component/Progressbar'

import { getCourse } from '../actions/course';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import "@fontsource/poppins/400-italic.css";

import { Box, Divider, Stack } from '@mui/material'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import image_1 from '../assests/images/image_1.jpg'



import statistics from './../assests/Courses/statistics.png'
import matlab from './../assests/Courses/matlab.png'
import c_plus from './../assests/Courses/c_plus.png'
import algebra from './../assests/Courses/algebra.png'
import analysis from './../assests/Courses/analysis.png'

const courses = [
   {cours : statistics , name :"Statistics"},
   {cours : matlab, name :"Matlab"},
   {cours : c_plus, name :"C++"},
   {cours : algebra, name :"Algebra"},
   {cours : analysis, name :"Analysis"},
  ];

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function Home() {

  const nav = useNavigate();
  
  const subject = useSelector(state => state.subject);

  console.log(subject.subject.subject)
  const dispatch = useDispatch();
  const handleCourseClick = (index) => {
    // Dispatch an action with the index before navigating
    dispatch(getCourse(index));

    // Navigate to the course page
    nav(`/course/${index}`);
  };
  return (
    <>
    <Navbar/>
    <Box height={70} />
      <Box sx={{ display: "flex" }}> 
        <Sidenav/>

      <Box component="main" sx={{flexGrow: 1,p: 3}}>
      <Stack direction='row'>
        <Grid container spacing={2} >
          
          <Grid item xs={6} md={8} lg={12} >
            <Card sx={{ width: 500, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px' }}>
                <div>
                  <Link href="/" sx={{ p: 0, color: '#35bbe3', fontSize: '.9rem', fontWeight: 'bold',}}>
                    Last uploaded videos
                  </Link>
                </div>
                <div>
                  {/* Add your additional link here */}
                  <Link href="/Students" sx={{ p: 2, color: '#35bbe3', fontSize: '.9rem',fontWeight: 'bold',}}>
                    Courses
                  </Link>
                </div>
              </div>
              <CustomCard
                title="Last uploaded videos"
                description="lorem ..."
                imageSource={image_1}
                linkText="linear aggression"
              />
              <Divider sx={{ p: 1 }} variant="fullWidth" />
              <CustomCard
                title="Last uploaded videos"
                description="lorem ..."
                imageSource={image_1}
                linkText="linear aggression"
              />
              <Divider sx={{ p: 1 }} variant="fullWidth" />
              <CustomCard
                title="Last uploaded videos"
                description="lorem ..."
                imageSource={image_1}
                linkText="linear aggression"
              />
            </Card>
          </Grid>

          <Grid item xs={6} md={8} lg={12}>
            <Card sx={{ width: 500, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px' }}>
                    <div>
                      <Link href="/" sx={{ p: 0, color: '#35bbe3', fontSize: '.9rem', fontWeight: 'bold',}}>
                        Free Videos
                      </Link>
                    </div>
                    <div>
                      {/* Add your additional link here */}
                      <Link href="/Students" sx={{ p: 2 , color: '#35bbe3', fontSize: '.9rem',fontWeight: 'bold',}}>
                        Courses
                      </Link>
                    </div>
                </div>
                <CustomCard title='Last uploaded videos' description="lorem ..." imageSource={image_1} linkText="linear aggression"/>
                <Divider sx={{  p:1 }} variant='fullWidth' />
                <CustomCard title='Last uploaded videos' description="lorem ..." imageSource={image_1} linkText="linear aggression"/>
                <Divider sx={{  p:1 }} variant='fullWidth'/>
                <CustomCard title='Last uploaded videos' description="lorem ..." imageSource={image_1} linkText="linear aggression"/>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} >
          
        <Grid item xs={12} md={12} lg={6} sx={{ p:5 }}>
          <Card sx={{ width: 300, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)'}}>
            <Typography sx={{ p: 2, color: '#35bbe3', fontWeight: 'bold' }}>
              My progress
            </Typography>
            {courses.map((item, index) => (
                <div
                  className="custom-link"
                  onClick={() => handleCourseClick(index)}
                >
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      backgroundColor: '#c9f3ff',
                    },
                    p: 2,
                  }}
                >
                  <div style={{display: 'grid', alignItems: 'center' }}>
                    <img
                      src={item.cours}
                      alt={item.name}
                      style={{ width: '30px', height: '30px', marginRight: '8px' }}
                    />
                    <div>
                      <Typography
                        sx={{
                          color: '#35bbe3',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                        }}
                        style={{fontFamily: 'Poppins, sans-serif'}}
                      >
                        {item.name}
                      </Typography>
                      <LinearBuffer />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
            <Button
              variant="outlined"
              sx={{
                
                color: '#35bbe3',
                fontSize: '.8rem',
                fontWeight: 'bold',
              }}
              onClick={() => {nav("/Students")}}
            >
              View More
            </Button>
          </div>
          </Card>
        </Grid>


        </Grid>
        </Stack>
      </Box>

      </Box>
    </>
  )
}
import * as React from 'react';
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import Box from '@mui/material/Box';
import {  Button, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';


import { useDispatch } from 'react-redux';
import { updatedUser } from '../actions/user';

import CountrySelect from '../Visitors_components/Signup/Country'
import {countries} from '../Visitors_components/Signup/countries'



interface FormValues {
  name: string;
  email: string;
  password : string;
  confirmPassword: string;
  birthday: string;
  country: string;
  gender: string;
}


export default function InputAdornments() {

  const [user,setUser] = useState ({
    username: "",
    Email: "",
    password: "",
    birthday:"",
    country: "",
  })
  const [error, setError] = useState(""); 

  // ******remove {} to use full mern stack code *******

  {/*const profileData = localStorage.getItem('profile');
  let userdata = null;

  if (profileData !== null) {
    
    userdata = JSON.parse(profileData);
  }
  
  const id = userdata.result._id;
  const picture = userdata.result.pictureName;

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();*/
  
}


  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword:"",
      birthday:"",
      country: "",
      gender:""
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be 20 characters or less."),
      email: Yup.string()
        .email("Invalid email address"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"),""], "Passwords must match"),
        birthday: Yup.date()
        .test('is-at-least-15', 'You must be at least 15 years old', (value) => {
          const minAgeDate = new Date();
          minAgeDate.setFullYear(minAgeDate.getFullYear() - 15);
          return value && value <= minAgeDate;
        }),
    }),

    onSubmit: async (values) => {
        
      try{

        const birthdayDate = new Date(values.birthday);

        // Check if the Date is valid
        if (isNaN(birthdayDate.getTime())) {
          // Handle invalid date here, e.g., show an error message
          setError("Invalid birthday date");
          return;
        }

        // Format the birthday date as "27-9-2000"
        const formattedBirthday =
          birthdayDate.getDate() +
          "-" +
          (birthdayDate.getMonth() + 1) + // Months are zero-based, so add 1
          "-" +
          birthdayDate.getFullYear();

        console.log("Form submitted");
        console.log("Form values: ", values);
      
        // Update the user state with form values including the formatted birthday
        setUser({
          username: values.name,
          Email: values.email,
          password: values.password,
          birthday: formattedBirthday,
          country: values.country,
        });
      
        console.log(user);
        if(user.Email !== ''){
            // ******remove {} to use full mern stack code *******
            {/*dispatch(updatedUser(id,user));*/}
            setError("Sign up was successful"); 
          }
          else{
            setError("Sign up was not successful , try again");          
          }

    }catch(e){ 

      console.log(e)
      setError("An error occurred during sign-up. Please try again.");
    }
    },
  })


  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' , mt:4 , mb: 4 }}>
      <form
            onSubmit={formik.handleSubmit}
          >    
            <Grid item xs={12} sm={6} sx={{display:'flex', alignContent:'center', justifyContent:'center'}}>
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<div style={{ width: 20, height: 20, backgroundColor: '#46d008', borderRadius: '50%', marginTop:2 }} />}
              >
                <Avatar sx={{width: 100, height: 100,}} src={`${process.env.PUBLIC_URL}/assests/logos/bird.png`}  />
              </Badge>
              
            </Grid>
        <Grid container spacing={2} sx={{mt:3}}>
          <Typography variant="h6">Personal Information</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Username"
                sx={{ width: '60%' , m:2 }}
                InputProps={{
                  className: 'outlined-start-adornment',
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
                name="name"
              />
            </Grid>
            <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                
                  sx={{ width: '60%', m:2 }}
                  label="Your birthday date"
                  onChange={(date) => {
                    // Convert the Date object to a string in your preferred format
                    // Update the birthdate property in userData
                    formik.setFieldValue('birthday',date);
                  }}
                  value={formik.values.birthday} 
                />
              </LocalizationProvider>
          </Grid>
              <Grid item xs={2} sx={{p:1}}>
                <CountrySelect
                 value={formik.values.country ? countries.find(country => country.label === formik.values.country) || null : null}
                 onChange={(selectedCountry) => {
                  // Update the "country" field in the Formik state
                  if (selectedCountry) {
                    formik.setFieldValue('country', selectedCountry.label);
                  } else {
                    formik.setFieldValue('country', ''); // Initialize with an empty string if it's null or undefined
                  }
                }}/>
              </Grid>
            </Grid>
        </Grid>
        <Grid container spacing={2} className='pt-5 mt-5'>
          <Typography variant="h6">User Information</Typography>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                    <TextField
                      label="Email"
                      sx={{ width: '60%' , m:2 }}
                      InputProps={{
                        className: 'outlined-start-adornment',
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      name="email"
                    />
                  </Grid>
              </Grid>
          <Grid container spacing={2}>
              <Grid item xs={6}>
                  <TextField
                    label="Password"
                    sx={{ width: '60%', m:2 }}
                    type={"password"}
                    onChange={formik.handleChange}
                   value={formik.values.password}
                   onBlur={formik.handleBlur}
                   name="password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Comfirme Password"
                    sx={{ width: '60%', m:2 }}
                    type={"password"}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    name="confirmPassword"
                  />
                </Grid>
            </Grid>
          </Grid>
        <Grid container >
          <Grid item xs={7} >
            <Button
              type="submit" 
              variant="outlined"
              sx={{
              width: '6rem',
              mt: 3,
              backgroundColor: '#35bbe3', 
              color:'white',
              '&:hover': {
                color: '#35bbe3', 
              },
              }}
              >
                Modify
            </Button>
          </Grid> 
      </Grid>
    </form>
    </Box>
  );
}

const express = require("express");
const mul = require("multer");
const upload = mul()


const routes = express.Router();
const {signUp, logIn, sendOtp} = require("../Controllers/authentication");
const { auth, isStudent, isInstructor, isAdmin } = require("../Middleware/authorization");
const { forgetPass, resetPass } = require("../Controllers/ForgetPass");
const { createCourse, viewSingleCourse, showAllCourse } = require("../Controllers/course");
const multer = require("multer");
const { createcategory, viewCategories } = require("../Controllers/category");
const { createSection, updateSection, deleteSection } = require("../Controllers/section");
const { AddToCart, DeleteFromCart } = require("../Controllers/cartCrud");
const { getUserDetails } = require("../Controllers/userDetails");
const { createSubsection, updateSubsection, deleteSubsection, getSubSectionData } = require("../Controllers/subSection");
const { updateUserProfile } = require("../Controllers/userProfile");

routes.post('/api/v1/signUp',signUp);
routes.post('/api/v1/login',logIn);

routes.get('/api/v1/dashboard/student',auth,isStudent,(req,res) =>{
    console.log('welcome to student dashboard');
})

routes.get('/api/v1/dashboard/instructor',auth,isInstructor,(req,res) =>{
    console.log('welcome to instructor dashboard');
})

routes.get('/api/v1/dashboard/admin',auth,isAdmin,(req,res) =>{
    console.log('welcome to admin dashboard');
})

routes.post('/api/v1/forgetPassword',forgetPass);
routes.put('/api/v1/resetPass',resetPass);
routes.post('/api/v1/sendOTP',sendOtp);

routes.post('/api/v1/createCourse',createCourse);

routes.post('/api/v1/createCategory',createcategory);

routes.post('/api/v1/createSection',createSection);
routes.post('/api/v1/createSubSection',createSubsection);
routes.get('/api/v1/getCourse/:courseId',viewSingleCourse);
routes.get('/api/v1/getAllCourses',showAllCourse);
routes.get('/api/v1/getAllCategories',viewCategories);

routes.put('/api/v1/addToCart',AddToCart);
routes.put('/api/v1/deleteFromCart',DeleteFromCart);
routes.post('/api/v1/getUserDetails',getUserDetails);

routes.put('/api/v1/updateSection',updateSection);
routes.put('/api/v1/updateSubSection',updateSubsection);

routes.put('/api/v1/deleteSection',deleteSection);
routes.put('/api/v1/deleteSubSection',deleteSubsection);
routes.put('/api/v1/updateProfile',updateUserProfile);
routes.post('/api/v1/getVideoData',getSubSectionData);









module.exports = routes;
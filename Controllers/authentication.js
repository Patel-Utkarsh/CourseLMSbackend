const user = require("../Models/User");
const otp = require("../Models/otp");
const profile = require("../Models/Profile");
const dbConnect = require("../Config/dbConnect");

const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { nodeMailer } = require('../Utils/nodeMailer');
const { getUserDetails } = require("./userDetails");
exports.signUp = async (req, res) => {
    const { name, email, password, account_type, otpInput } = req.body;

    try {
  

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(500).json({
                success: false,
                message: 'Account already exits'
            })
        }



        const validOTP = await otp.findOne({ email }).sort({ createdAt: -1 });
        //console.log(validOTP)
       

            if (validOTP.otp != otpInput) {
                return res.status(500).json({
                    success: false,
                    message: 'Invalid OTP'

                })
            }


            const profilePayload = {
                gender: null,
                dob: null,
                contactNo: null,
                about: null

            }

          //  const secured_password = await brcypt.hash(password, 10);

            const userProfile = await profile.create({ gender: profilePayload.gender, dob: profilePayload.dob, contactNo: profilePayload.contactNo, about: profilePayload.about });








            const newUser = await user.create({ name, email, password: password, account_type, profile: userProfile._id });

            res.status(200).json({
                success: true,
                message: 'data entered in db'
            })

        }

    catch (error) {
            console.log('error in creating uswer ', error);
        }

    }

exports.sendOtp = async (req, res) => {
        const { email } = req.body;
        try {

            const otpGenerator = require("otp-generator");
            const otpGenerate = 1111 /* otpGenerator.generate(4,{
            upperCaseAlphabets: false, 
            specialChars: false,
            lowerCaseAlphabets : false
        })*/

            //console.log(otpGenerate);
            await nodeMailer(email, 'OTP', `Your OTP For sign up is ${otpGenerate}`);

            const otpModel = await otp.create({ email, otp: otpGenerate });
            res.status(200).json({
                success: true,
                message: 'otp sent successfully'
            })
        }

        catch {
            res.status(500).json({
                success: false,
                message: 'error in sending otp'
            })

        }

    }

    exports.logIn = async (req, res) => {
        const { email, password } = req.body;


        try {
            let validUser = await User.findOne({ email });


            if (!validUser) {
                return res.status(500).json({
                    success: false,
                    message: 'Account doesnt Exist'

                })
            }



            /*const verifyPass = await brcypt.compare(password,validUser.password);
            if(!verifyPass) {
                return res.status(500).json({
                    success  : false,
                    message : 'Invalid Password'
    
                })
    
            }*/

            const payload = {
                email: validUser.email,
                id: validUser._id,
                role: validUser.account_type

            }



            const token = jwt.sign(payload, 'secret', {
                expiresIn: '2h'
            })

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 1000)
            }

            validUser.password = null;
            validUser.token = token;






            res.cookie("tokenCookie", token, options).status(200).json({
                success: 'true',
                message: 'logged in Successfully',
                token,
                user: validUser

            })







        }

        catch (err) {
            res.status(500).json({
                success: 'false',
                message: 'error in fetching details',


            })

        }


    }

import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import winston from "winston";
// const winston = require("winston")
// Define a logger that logs messages to a file.
const logger = winston.createLogger({
	format: winston.format.combine(
	  winston.format.timestamp(),
	  winston.format.json()	
	),
	transports: [
	  new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
	  new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
	  new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
	  new winston.transports.File({ filename: 'logs/combined.log' }),
	],
  });

const router = express.Router();

/* User Registration */
router.post("/register", async (req, res) => {
  try {
    /* Salting and Hashing the Password */
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    /* Create a new user */
    const newuser = new User({
      userType: req.body.userType,
      userFullName: req.body.userFullName,
      admissionId: req.body.admissionId,
      employeeId: req.body.employeeId,
      age: req.body.age,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    /* Save User and Return */
    const user = await newuser.save();
    res.status(200).json(user);
    logger.info("Found user!");
  } catch (err) {
    logger.error("Error finding user");
    console.log(err);
  }
});

/* User Login */
router.post("/signin", async (req, res) => {
  console.log("hello_back_end");
  try {
    console.log(req.body, "req");
    const user = req.body.admissionId
      ? await User.findOne({
          admissionId: req.body.admissionId,
        })
      : await User.findOne({
          employeeId: req.body.employeeId,
        });
    console.log(user, "user");
    console.log("hello");
    if(!user && res.status(404).json("User not found")){
      logger.error('Username doesn\'t exist');
    }
    const validPass =user.password===req.body.password;
    if(!validPass && res.status(400).json({message: "Wrong Password"})){
      logger.warn("Invalid Credentials");
    }
    console.log("login done");
    logger.info("Login successful");
    
    res.status(200).json(user);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
		logger.error('Username doesn\'t exist');
  }
});

export default router;

import express from "express";
import BookCategory from "../models/BookCategory.js";
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
  router.get("/allcategories", async (req, res) => {
  try {
    const categories = await BookCategory.find({});
    res.status(200).json(categories);
  } catch (err) {
    return res.status(504).json(err);
  }
});

router.post("/addcategory", async (req, res) => {
  try {
    const newcategory = await new BookCategory({
      categoryName: req.body.categoryName,
    });
    const category = await newcategory.save();
    res.status(200).json(category);
  } catch (err) {
    return res.status(504).json(err);
  }
});

export default router;

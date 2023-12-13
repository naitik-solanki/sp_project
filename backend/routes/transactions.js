import express from "express"
import Book from "../models/Book.js"
import BookTransaction from "../models/BookTransaction.js"
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
    const router = express.Router()
    router.post("/add-transaction", async (req, res) => {
    try {
        if (true) {
            const newtransaction = new BookTransaction({
                bookId: req.body.bookId,
                borrowerId: req.body.borrowerId,
                bookName: req.body.bookName,
                borrowerName: req.body.borrowerName,
                transactionType: req.body.transactionType,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate
            })
            const transaction = await newtransaction.save()
            const book = Book.findById(req.body.bookId)
            await book.updateOne({ $push: { transactions: transaction._id } })
            res.status(200).json(transaction)
            logger.info("Transaction added successfully");
        }
        else if (req.body.isAdmin === false) {
            res.status(500).json("You are not allowed to add a Transaction")
        }
    }
    catch (err) {
        res.status(504).json('Book not found!')
    }
})

router.get("/all-transactions", async (req, res) => {
    try {
        const transactions = await BookTransaction.find({}).sort({ _id: -1 })
        res.status(200).json(transactions)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

router.put("/update-transaction/:id", async (req, res) => {
    try {
        if (true) {
            await BookTransaction.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Transaction details updated successfully");
        }
    }
    catch (err) {
        res.status(504).json(err)
    }
})

router.delete("/remove-transaction/:id", async (req, res) => {
    if (true) {
        try {
            const data = await BookTransaction.findByIdAndDelete(req.params.id);
            const book = Book.findById(data.bookId)
            console.log(book)
            await book.updateOne({ $pull: { transactions: req.params.id } })
            res.status(200).json("Transaction deleted successfully");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

export default router
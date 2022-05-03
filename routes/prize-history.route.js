const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");
const verifyToken = require("../validation/verifyToken");

const {
    getHistoryController,
    addHistoryController,
} = require("../controller/prize-history.controller");

router.get("/get/history", apiValidation, verifyToken, getHistoryController);

router.post("/history", [body("prize_id").notEmpty()], apiValidation, verifyToken, addHistoryController);

module.exports = router;

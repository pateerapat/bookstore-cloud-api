const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");
const verifyToken = require("../validation/verifyToken");

const {
    getOrdersController,
    getAllOrdersController,
    statusController,
    addOrderController,
} = require("../controller/orders.controller");

router.get("/get/all", apiValidation, verifyToken, getOrdersController);

router.post("/get/all", apiValidation, verifyToken, getAllOrdersController);

router.post("/add", apiValidation, verifyToken, addOrderController);

router.post("/status", [body("order_id").notEmpty(), body("status").notEmpty()], apiValidation, verifyToken, statusController);

module.exports = router;

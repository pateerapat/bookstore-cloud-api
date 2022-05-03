const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");
const verifyToken = require("../validation/verifyToken");

const {
    getOrderItemsController,
    addOrderItemsController,
    getOrderItemsAdminController,
} = require("../controller/order-items.controller");

router.get("/get/:id", [param("id").notEmpty()], apiValidation, verifyToken, getOrderItemsController);

router.post("/get/:id", apiValidation, getOrderItemsAdminController);

router.post("/add", [body("book_id").notEmpty(), body("order_id").notEmpty(), body("quantity").notEmpty()], apiValidation, verifyToken, addOrderItemsController);

module.exports = router;

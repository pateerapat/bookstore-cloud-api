const express = require("express");
const router = express.Router();
const { body, query } = require("express-validator");
const apiValidation = require("../validation/apiValidation");
const verifyToken = require("../validation/verifyToken");

const {
    getCartController,
    addToCartController,
    clearCartController,
} = require("../controller/carts.controller");

router.get("/get/all", apiValidation, verifyToken, getCartController);

router.post("/add", [body("book_id").notEmpty()], apiValidation, verifyToken, addToCartController);

router.post("/clear", apiValidation, verifyToken, clearCartController);

module.exports = router;

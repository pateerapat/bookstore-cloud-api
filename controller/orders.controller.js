const { query } = require("../core/connect");

const jwt = require("jsonwebtoken");

module.exports = {
    getOrdersController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const sql = "SELECT * FROM `orders` WHERE `user_id` = ?";
            const values = [userData.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    getAllOrdersController: async (req, res, next) => { 
        try {
            const sql = "SELECT * FROM `orders`";
            const response = await query(sql);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    addOrderController: async (req, res, next) => {
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const sql = "INSERT INTO `orders` (`user_id`, `status`) VALUES (?, ?)";
            const values = [userData.id, "ongoing"];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    statusController: async (req, res, next) => {
        try {
            const sql = "UPDATE `orders` SET `status` = ? WHERE `id` = ?";
            const values = [req.body.status, req.body.order_id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};
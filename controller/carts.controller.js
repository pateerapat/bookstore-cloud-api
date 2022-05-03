const { query } = require("../core/connect");

const jwt = require("jsonwebtoken");

module.exports = {
    getCartController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const sql = "SELECT c.`id`, c.`quantity`, b.`id`, b.`title`, b.`price`, b.`cover` FROM `carts` AS `c` JOIN `books` AS `b` ON `c`.`book_id` = `b`.`id` WHERE c.`user_id` = ?";
            const values = [userData.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    addToCartController: async (req, res, next) => {
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const sqlDataCheck = "SELECT * FROM `carts` WHERE `user_id` = ? AND `book_id` = ?";
            const valuesDataCheck = [userData.id, req.body.book_id];
            const responseDataCheck = await query(sqlDataCheck, valuesDataCheck);

            if (responseDataCheck.payload.data.length > 0) {
                const sql = "UPDATE `carts` SET `quantity` = `quantity`+1 WHERE `user_id` = ? AND `book_id` = ?";
                const values = [userData.id, req.body.book_id];
                const response = await query(sql, values);
                res.status(200).json(response);
                res.end();
                return;
            }

            const sql = "INSERT INTO `carts` (`book_id`, `user_id`, `quantity`) VALUES (?, ?, 1)";
            const values = [req.body.book_id, userData.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    clearCartController: async (req, res, next) => { 
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );

            const sql = "DELETE FROM `carts` WHERE `user_id` = ?";
            const values = [userData.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};
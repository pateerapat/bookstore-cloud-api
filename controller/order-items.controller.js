const { query } = require("../core/connect");

const jwt = require("jsonwebtoken");

module.exports = {
    getOrderItemsController: async (req, res, next) => {
        try {
            const userData = jwt.verify(
                req.token,
                process.env.SECRET,
                (err, authData) => {
                    return authData.result;
                },
            );
            const sql = "SELECT `oi`.`order_id`, `o`.`order_date`, `o`.`user_id`, `o`.`status`, `oi`.`quantity`, `b`.`title`, `b`.`price`, `b`.`cover` FROM `orders` AS `o` JOIN `order_items` AS `oi` ON `o`.id = `oi`.`order_id` JOIN `books` AS `b` ON `oi`.`book_id` = `b`.id WHERE `oi`.`order_id` = ? AND `o`.`user_id` = ?";
            const values = [req.params.id, userData.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    getOrderItemsAdminController: async (req, res, next) => {
        try {
            const sql = "SELECT `oi`.`order_id`, `o`.`order_date`, `o`.`user_id`, `o`.`status`, `oi`.`quantity`, `b`.`title`, `b`.`price`, `b`.`cover` FROM `orders` AS `o` JOIN `order_items` AS `oi` ON `o`.id = `oi`.`order_id` JOIN `books` AS `b` ON `oi`.`book_id` = `b`.id WHERE `oi`.`order_id` = ?";
            const values = [req.params.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    addOrderItemsController: async (req, res, next) => {
        try {
            const sql = "INSERT INTO `order_items` (`book_id`, `order_id`, `quantity`) VALUES (?, ?, ?)";
            const values = [req.body.book_id, req.body.order_id, req.body.quantity];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};
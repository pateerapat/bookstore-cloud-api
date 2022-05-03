const { query } = require("../core/connect");

module.exports = {
    getAllBooksController: async (req, res, next) => { 
        try {
            const sql = "SELECT `id`, `title`, `price`, `quantity`, `cover` FROM `books` WHERE `title` NOT LIKE '%\\\"%' ORDER BY `quantity` LIMIT 300";
            const response = await query(sql);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    searchController: async (req, res, next) => { 
        try {
            const sql = "SELECT `id`, `title`, `price`, `quantity`, `cover` FROM `books` WHERE `title` NOT LIKE '%\\\"%' AND `title` LIKE '%"+req.params.search+"%' ORDER BY `quantity` LIMIT 300";
            const response = await query(sql);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    getBookController: async (req, res, next) => { 
        try {
            const sql = "SELECT * FROM `books` WHERE `id` = ?";
            const values = [req.params.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
    quantityController: async (req, res, next) => {
        try {
            const sql = "UPDATE `books` SET `quantity` = `quantity`-? WHERE `id` = ?";
            const values = [req.body.quantity, req.body.id];
            const response = await query(sql, values);
            res.status(200).json(response);
            res.end();
        } catch (err) {
            next(err);
        };
    },
};
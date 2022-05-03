const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "ec2-52-90-188-92.compute-1.amazonaws.com",
  user: "admin",
  password: "pkcg2032Z1",
  database: "cloudject-db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const query = async (sql, values) => {
    const transaction = await pool.getConnection();
    await transaction.beginTransaction();

    let response = {
        success: true,
        payload: {
            data: null,
        }
    }

    try {
        const [ rows, fields ] = await transaction.query(sql, values);
        transaction.commit();
        response.payload.data = rows;
    } catch (err) {
        await transaction.rollback();
        response.success = false;
        response.payload.data = "Error has occurred on a transaction.";
        return response;
    } finally {
        transaction.release();
        return response;
    }
};

module.exports = {
    query,
};

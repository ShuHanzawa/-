
const mysql = require("mysql2/promise");
const config = require("../config.js");

/**
 * 　タスクを一覧取得する　
 * 
 * @returns レスポンス　JSON
 */
 getResults = async function () {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    //
    const sql = "SELECT * FROM tarot";
      const [rows, fields] = await connection.query(sql);
      return rows;
  } catch(err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

/**  タスクを一件取得する　API
 * 
 * @returns レスポンス　JSON
 */
 getResultId = async function (id) {
  let connection = null;
  try {
    connection = await mysql.createConnection(config.dbSetting);
    //
    const sql =
      "SELECT * FROM tarot WHERE id = ?";
      let d = [id];
      const [rows, fields] = await connection.query(sql, d);
      return rows;
  } catch(err) {
    console.log(err);
  } finally {
    connection.end();

  }
};





exports.getResults = getResults;
exports.getResultId = getResultId;


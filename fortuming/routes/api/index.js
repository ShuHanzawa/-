var express = require("express");
var router = express.Router();

const results = require("../../src/results.js");


//　結果一覧を取得するルーティング
router.get("/results" , async function (req, res, next) {
  const getResults = await results.getResults();
  res.send(JSON.stringify(getResults));
});

//　結果を1つ取得するルーティング
router.get('/results/:id' , async function (req, res, next) {
  const getResultId = await results.getResultId(req.params.id); //ここが抜けてた！！！！
  res.send(JSON.stringify(getResultId));
});

module.exports = router;
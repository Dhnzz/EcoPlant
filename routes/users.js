var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello World");
});

router.get("/me", (req, res, next) => {
  res.json({
    message: "Hai nama saya Dhani",
  });
});

module.exports = router;

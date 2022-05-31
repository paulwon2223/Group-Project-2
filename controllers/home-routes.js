const router = require("express").Router();
// const {} = require(../models);
const authMiddleware = require("../utils/auth");

// NOT SURE WHAT TO ADD HERE
router.get("/", async(req, res) => {
    try {
        res.render("login");
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
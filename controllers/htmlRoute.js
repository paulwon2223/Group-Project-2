const router = require("express").Router();
// const {} = require(../models);
const authMiddleware = require("../utils/auth");


router.get("/", async (req, res) => {
    try {
        res.render("homepage");
    } catch (error) {
        res.json(error);
    }
});

router.get("/login", async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        res.json(error);
    }
});

router.get("/dashboard", async (req, res) => {
    try {
        res.render("dashboard");
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
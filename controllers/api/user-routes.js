const router = require("express").Router();
const { User } = require("../../models");

//CREATES A NEW USER
router.post("/", async(req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(201).json(dbUserData);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

//LOGIN
router.post("login", async(req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!dbUserData) {
            res
                .status(400)
                .json({ message: "Unable to locate your login information." });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: "Unable to locate your login information." });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({
                user: dbUserData,
                message: `${user.username} is now logged in!`,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// LOGOUT
router.post("logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
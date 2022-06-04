const router = require("express").Router();
// const {} = require(../models);
const withAuth = require("../utils/auth");
const { Post, User } = require('../models');


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
        const postData = await Post.findAll({
            attributes: ['id', 'user_id', 'post'],
            include: [
                {
                    model: User,
                    attributes: ['first_name']
                },
            ],
        });

        const dbPost = postData.map((userpost) =>  userpost.get({ plain: true }))
        
        console.log(dbPost);
        res.render("dashboard", {
            dbPost,
        })
    } catch (err) {
        res.status(500).json(err);
    }
    // try {
    //     res.render("dashboard", { posts: [{
    //         id: 1,
    //         user_id: 1,
    //         post: 'Example'
    //     }]});
    // } catch (error) {
    //     res.json(error);
    // }
});

module.exports = router;
const router = require("express").Router();
// const {} = require(../models);
const withAuth = require("../utils/auth");
const { Post, User } = require("../models");

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
      attributes: ["id", "user_id", "post"],
      include: [
        {
          model: User,
          attributes: ["first_name", "image",],
        },
      ],
    });

    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    console.log(user);

    const dbPost = postData
      .map((userpost) => userpost.get({ plain: true }))
      .map((post) => {
        return {
          ...post,
          isOwned: req.session.user_id === post.user_id,
        };
      });

    console.log(dbPost);
    res.render("dashboard", {
      dbPost,
      user: user.get({ plain: true }),
    });
  } catch (err) {
    console.log(err);
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

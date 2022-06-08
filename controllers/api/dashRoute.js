const router = require("express").Router();
const { Post } = require("../../models");

router.get("/", async (req, res) => {
  try {
    res.render();
  } catch (err) { }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.session);
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postdb = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (postdb.user_id === req.session.user_id) {
      const deletePost = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log("post was deleted");
      res.status(200).json(deletePost);
    } else {
      res.status(402).json({ message: "no post found" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

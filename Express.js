var Post = require("./models/Post");
var router = express.Router();

router.route("/create").post((req, res) => {
  var post = new Post(req.body);
  post
    .save()
    .then((post) => {
      res.status(200).json({ message: "Post successfully added " });
    })
    .catch((err) => {
      res.status(400).send("Error when saving to database");
    });
});

router.route("/posts").get((req, res) => {
  Post.find((err, posts) => {
    if (err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  });
});

router.route("/posts/:id").get((req, res) => {
  var id = req.params.id;
  Post.findById(id, (err, post) => {
    res.json(post);
  });
});

router.route("/posts/:id").put((req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (!post) return next(new Error("Error getting the post!"));
    else {
      post.name = req.body.name;
      post
        .save()
        .then((post) => {
          res.json("Post updated successfully");
        })
        .catch((err) => {
          res.status(400).send("Error when updating the post");
        });
    }
  });
});

router.route("/posts/:id").get((req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id }, (err, post) => {
    if (err) res.json(err);
    else res.json("Post successfully removed");
  });
});

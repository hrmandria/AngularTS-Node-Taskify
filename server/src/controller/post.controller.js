import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import fs from "fs";

class PostController {
  async create(req, res) {
    try {
      let payload = req["x-payload"];
      let post = new Post(req.body);
      post.user = payload._id;
      await post.save();
      res.json(post);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Error!" });
    }
  }

  async update(req, res) {
    try {
      await Post.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.json(req.body);
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async remove(req, res) {
    try {
      await Post.deleteOne({ _id: req.params.id });
      res.json({ message: "Post Deleted!" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async findByUser(req, res) {
    try {
      let payload = req["x-payload"];
      let post = await Post.find({ user: payload._id });
      res.json(post);
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async findOne(req, res) {
    try {
      let post = await Post.findOne({ _id: req.params.id });
      res.json(post);
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async findAll(req, res) {
    try {
      let posts = await Post.find();
      res.json(posts);
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async search(req, res) {
    try {
      let posts = await Post.find();
      let query = req.params.q.toLowerCase();
      const result = posts.filter((p) => {
        if (
          p.title.toLowerCase().includes(query) ||
          p.details.toLowerCase().includes(query)
        )
          return p;
      });
      res.json(result);
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async like(req, res) {
    try {
      let payload = req["x-payload"];
      let post = await Post.findOne({ _id: req.params.id });
      if (post.likes.includes(payload._id)) {
        post.likes = post.likes.filter((l) => {
          if (l != payload._id) return l;
        });
      } else post.likes.push(payload._id);
      await post.save();
      res.json({ message: "Post Liked!" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async comment(req, res) {
    try {
      let payload = req["x-payload"];
      let user = await User.findOne({ _id: payload._id });
      user.password = undefined;
      req.body.user = user;
      await Post.updateOne(
        { _id: req.params.id },
        {
          $push: { comments: req.body },
        }
      );
      res.json({ message: "Comment Posted" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async removeComment(req, res) {
    try {
      let payload = req["x-payload"];
      let post = await Post.findOne({ _id: req.params.id });
      post.comments = post.comments.filter((c) => {
        if (c.user != payload._id && c._id != req.params.id_comment) return c;
      });
      await post.save();
      res.json({ message: "Comment Deleted" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async importSong(req, res) {
    try {
      let post = await Post.findOne({ _id: req.params.id });
      if (post.song) fs.unlinkSync(post.song);
      post.song = req.body.song;
      await post.save();
      res.json({ message: "Song uploaded!" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async importPictures(req, res) {
    try {
      let post = await Post.findOne({ _id: req.params.id });
      for (let i = 0; i < post.photos.length; i++) {
        fs.unlinkSync(post.photos[i]);
      }
      post.photos = req.body.pictures;
      await post.save();
      res.json({ message: "Pictures Uploaded!" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }
}

export default new PostController();

import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { Sign } from "../modules/auth.module.js";
import fs from "fs";

class UserController {
  async create(req, res) {
    try {
      let user = new User(req.body);
      user.password = bcrypt.hashSync(user.password, 7);
      await user.save();
      user.password = undefined;
      res.json(user);
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async login(req, res) {
    try {
      let user = await User.findOne({ username: req.body.username });
      if (!user || !bcrypt.compareSync(req.body.password, user.password))
        throw null;
      user.password = undefined;
      let token = Sign({ _id: user._id });
      res.json({ token });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async findOneByToken(req, res) {
    try {
      let payload = req["x-payload"];
      let user = await User.findOne({ _id: payload._id });
      if (!user) throw null;
      user.password = undefined;
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async findOneById(req, res) {
    try {
      let user = await User.findOne({ _id: req.params.id });
      if (!user) throw null;
      user.password = undefined;
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async remove(req, res) {
    try {
      let payload = req["x-payload"];
      let user = await User.findOne({ _id: payload._id });
      if (user.photo) fs.unlinkSync(user.photo);
      await User.deleteOne({ _id: payload._id });
      res.json({ message: "Delete Success!" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async updatePassword(req, res) {
    try {
      let payload = req["x-payload"];
      let user = await User.findOne({ _id: payload._id });
      if (!user || !bcrypt.compareSync(req.body.oldPassword, user.password))
        throw null;
      user.password = bcrypt.hashSync(req.body.password, 7);
      await user.save();
      res.json({ message: "Update Success!" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async updateUsername(req, res) {
    try {
      let payload = req["x-payload"];
      let user = await User.findOne({ _id: payload._id });
      user.username = req.body.username;
      await user.save();
      res.json({ message: "Update Success!" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }

  async updatePicture(req, res) {
    try {
      let payload = req["x-payload"];
      let user = await User.findOne({ _id: payload._id });
      if (!user) throw null;
      if (user.photo) fs.unlinkSync(user.photo);
      user.photo = req.body.photo;
      await user.save();
      res.json({ message: "Image Updated!" });
    } catch (e) {
      res.status(400).json({ message: "Error!" });
    }
  }
}

export default new UserController();

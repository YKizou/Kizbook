const router = require("express").Router();
const User = require("../models/User");
// const bcrypt = require("bcrypt");

//Signup

router.post("/signup", async (req, res) => {
  try {
    //Generate new password for security
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // !user && res.status(404).json("user not found");
    // const validPassword = await bcrypt.compare(req.body.passsword, user.passsword);
    // !validPassword && res.status(400).json("wrong password")
    // res.status(200).json(user)
    if (!user) {
      res.status(404).json("user not found");
    } else {
      // const validPassword = await bcrypt.compare(
      //   req.body.password,
      //   user.password
      // );
      if (user.password !== req.body.password) {
        res.status(400).json("wrong password");
      } else {
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

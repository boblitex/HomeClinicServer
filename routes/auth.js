const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../Model/Users");
const verify = require("../verify");
const { validate, loginValidate } = require("../validation");

router.get("/", (req, res) => {
  res.send("home");
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const emailExist = await Users.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ error: "Email already exists" });

  const salt = await bcrypt.genSalt();
  const hashedP = await bcrypt.hash(req.body.password, salt);

  const user = new Users({
    name: req.body.name,
    idno: req.body.idno,
    email: req.body.email,
    password: hashedP
  });

  try {
    const saved = await user.save();
    res.json({ success: saved });
  } catch (err) {
    console.error(err);
  }
});

router.post("/signin", async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const userfound = await Users.findOne({ email: req.body.email });
  if (!userfound)
    return res
      .status(400)
      .json({ error: "Email not found, please Create account" });

  const validP = await bcrypt.compare(req.body.password, userfound.password);
  if (!validP) return res.status(400).json({ error: "password invalid" });

  jwt.sign(
    { userfound },
    process.env.SECRET_TOKEN,
    { expiresIn: "1200s" },
    (err, token) => {
      res.header("auth", token).json({success: userfound, token:token});
    }
  );
});

router.get("/dashboard", verify, (req, res) => {
  res.send(req.user);
});

router.get("/signout", (req, res) => {
  res.send(`signed out`);
});

module.exports = router;

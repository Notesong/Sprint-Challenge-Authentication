const bcrypt = require("bcryptjs");

const router = require("express").Router();
const Users = require("./auth-model.js");

router.post("/register", (req, res) => {
  const user = req.body;

  if (user.username === 0 || user.password === "") {
    res.status(400).json({ message: "missing login info" })
  } else {
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
      .then((saved) => {
        res.status(201).json({ saved });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }


});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = username;
        res.status(200).json({ message: "welcome!" });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "unable to logout" });
    } else {
      res.status(200).json({ message: "logged out" });
    }
  });
});

module.exports = router;

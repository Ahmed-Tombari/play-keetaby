const router = require("express").Router();

const {
  signup,
  login,
  forgotPassword,
  resetPassword
} = require("../controllers/userAuthController");

const authMiddleware =
  require("../middlewares/authMiddleware");

router.post("/signup", signup);

router.post("/login", login);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);

router.post(
  "/logout",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Déconnexion réussie"
    });
  }
);

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Profil utilisateur",
      user: req.user
    });
  }
);

module.exports = router;
const router = require("express").Router();

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getPendingUsers,
  approveUser,
  rejectUser,
} = require("../controllers/adminAuthController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Auth Admin

router.post("/signup", signup);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post(
  "/logout",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Déconnexion admin réussie",
    });
  }
);

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Bienvenue Admin",
      user: req.user,
    });
  }
);

// Gestion utilisateurs

router.get(
  "/pending-users",
  authMiddleware,
  adminMiddleware,
  getPendingUsers
);

router.put(
  "/users/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveUser
);

router.delete(
  "/users/:id/reject",
  authMiddleware,
  adminMiddleware,
  rejectUser
);

module.exports = router;

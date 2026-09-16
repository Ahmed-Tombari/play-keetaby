const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Accès refusé"
    });
  }

  next();
};

module.exports = adminMiddleware;
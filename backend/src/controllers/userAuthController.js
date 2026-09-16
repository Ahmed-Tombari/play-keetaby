const service = require("../services/userAuthService");
const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Nom complet, email et mot de passe requis",
      });
    }

    const user = await service.signupUser(fullName, email, password);

    res.status(201).json({
      message:
        "Compte créé avec succès. En attente de validation par l'administrateur.",
      user,
    });
  } catch (error) {
    const status = error.message.includes("déjà utilisé") ? 409 : 500;
    res.status(status).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe requis",
      });
    }

    const token = await service.loginUser(email, password);

    res.json({ token });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email requis" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await pool.query(
      `
      INSERT INTO password_resets
      (email, reset_code, expires_at)
      VALUES (
        $1,
        $2,
        NOW() + INTERVAL '15 minutes'
      )
      `,
      [email, code]
    );

    // ⚠️ Même remarque que pour l'admin : ne pas renvoyer "code" en prod,
    // il doit être envoyé par email/SMS, pas exposé dans la réponse JSON.
    res.json({
      message: "Code généré et envoyé par email",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({
        message: "Email, code et nouveau mot de passe requis",
      });
    }

    const result = await pool.query(
      `
      SELECT *
      FROM password_resets
      WHERE email=$1
      AND reset_code=$2
      AND expires_at > NOW()
      `,
      [email, code]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Code invalide ou expiré",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `
      UPDATE users
      SET password_hash=$1
      WHERE email=$2
      `,
      [hashedPassword, email]
    );

    await pool.query(
      `
      DELETE
      FROM password_resets
      WHERE email=$1
      `,
      [email]
    );

    res.json({
      message: "Mot de passe modifié",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
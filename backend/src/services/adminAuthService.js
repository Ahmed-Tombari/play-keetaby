const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

const signupAdmin = async (fullName, email, password) => {
  // Vérifier si l'email existe déjà
  const existing = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (existing.rows.length > 0) {
    throw new Error("Cet email est déjà utilisé");
  }

  const hashedPassword = await hashPassword(password);

  const result = await pool.query(
    `
    INSERT INTO users
    (
      full_name,
      email,
      password_hash,
      role,
      is_verified
    )
    VALUES
    (
      $1,
      $2,
      $3,
      'ADMIN',
      TRUE
    )
    RETURNING *
    `,
    [fullName, email, hashedPassword]
  );

  return result.rows[0];
};

const loginAdmin = async (email, password) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const admin = result.rows[0];

  if (!admin) {
    throw new Error("Admin introuvable");
  }

  if (admin.role !== "ADMIN") {
    throw new Error("Accès réservé aux administrateurs");
  }

  const valid = await bcrypt.compare(password, admin.password_hash);

  if (!valid) {
    throw new Error("Mot de passe incorrect");
  }

  if (admin.is_verified === false) {
    throw new Error("Compte non vérifié");
  }

  return generateToken(admin);
};

module.exports = {
  signupAdmin,
  loginAdmin,
};
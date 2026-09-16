const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

const signupUser = async (fullName, email, password) => {

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
      'USER',
      FALSE
    )
    RETURNING *
    `,
    [fullName, email, hashedPassword]
  );

  return result.rows[0];
};

const loginUser = async (email, password) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  if (user.role !== "USER") {
    throw new Error("Compte utilisateur invalide");
  }

  if (!user.is_verified) {
    throw new Error(
      "Votre compte est en attente de validation par l'administrateur"
    );
  }

  if (!user.is_active) {
    throw new Error(
      "Votre compte est désactivé"
    );
  }

  const valid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!valid) {
    throw new Error("Mot de passe incorrect");
  }

  return generateToken(user);
};

module.exports = {
  signupUser,
  loginUser,
};
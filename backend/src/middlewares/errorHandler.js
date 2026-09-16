const { ZodError } = require('zod');
const { Prisma } = require('@prisma/client');

function errorHandler(err, req, res, next) {
  // Erreurs de validation Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Données invalides',
      details: err.errors.map((e) => ({ path: e.path.join('.'), message: e.message })),
    });
  }

  // Erreurs Prisma connues (contrainte unique, FK, not found...)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: `Valeur déjà utilisée (${err.meta?.target})` });
    }
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Ressource introuvable' });
    }
    if (err.code === 'P2003') {
      return res.status(400).json({ error: `Référence invalide (${err.meta?.field_name})` });
    }
  }

  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
}

module.exports = errorHandler;

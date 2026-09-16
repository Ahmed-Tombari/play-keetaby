const slugify = require('slugify');
const prisma = require('../lib/prisma');
const {
  createGameSchema,
  updateGameSchema,
  createLevelSchema,
  updateLevelSchema,
} = require('../validators/game.validator');

const VALID_DIFFICULTIES = ['easy', 'med', 'hard'];

// GET /api/games?categoryId=&published=&difficulty=&search=
async function listGames(req, res, next) {
  try {
    const { categoryId, published, difficulty, search } = req.query;

    if (difficulty && !VALID_DIFFICULTIES.includes(difficulty)) {
      return res.status(400).json({
        error: `Paramètre "difficulty" invalide. Valeurs acceptées : ${VALID_DIFFICULTIES.join(', ')}`,
      });
    }

    const where = {};
    if (categoryId) where.categoryId = categoryId;
    if (published !== undefined) where.isPublished = published === 'true';
    if (difficulty) where.difficulty = difficulty;
    if (search) where.title = { contains: search, mode: 'insensitive' };

    const games = await prisma.game.findMany({
      where,
      include: {
        category: { select: { id: true, name: true, slug: true, icon: true } },
        _count: { select: { levels: true} },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(games);
  } catch (err) {
    next(err);
  }
}

// GET /api/games/:id
async function getGame(req, res, next) {
  try {
    const game = await prisma.game.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
        levels: { orderBy: { levelOrder: 'asc' } },
      },
    });
    if (!game) return res.status(404).json({ error: 'Jeu introuvable' });
    res.json(game);
  } catch (err) {
    next(err);
  }
}

// POST /api/games
async function createGame(req, res, next) {
  try {
    const data = createGameSchema.parse(req.body);
    const slug = data.slug ? slugify(data.slug, { lower: true }) : slugify(data.title, { lower: true });

    const game = await prisma.game.create({
      data: { ...data, slug },
    });
    res.status(201).json(game);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/games/:id
async function updateGame(req, res, next) {
  try {
    const data = updateGameSchema.parse(req.body);
    if (data.slug) data.slug = slugify(data.slug, { lower: true });

    const game = await prisma.game.update({
      where: { id: req.params.id },
      data,
    });
    res.json(game);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/games/:id
async function deleteGame(req, res, next) {
  try {
    await prisma.game.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// PATCH /api/games/:id/publish  (bascule is_published)
async function togglePublish(req, res, next) {
  try {
    const game = await prisma.game.findUnique({ where: { id: req.params.id } });
    if (!game) return res.status(404).json({ error: 'Jeu introuvable' });

    const updated = await prisma.game.update({
      where: { id: req.params.id },
      data: { isPublished: !game.isPublished },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// GET /api/games/:id/levels
async function listLevels(req, res, next) {
  try {
    const game = await prisma.game.findUnique({ where: { id: req.params.id } });
    if (!game) return res.status(404).json({ error: 'Jeu introuvable' });

    const levels = await prisma.gameLevel.findMany({
      where: { gameId: req.params.id },
      orderBy: { levelOrder: 'asc' },
    });
    res.json(levels);
  } catch (err) {
    next(err);
  }
}

// POST /api/games/:id/levels
async function createLevel(req, res, next) {
  try {
    const game = await prisma.game.findUnique({ where: { id: req.params.id } });
    if (!game) return res.status(404).json({ error: 'Jeu introuvable' });

    const data = createLevelSchema.parse(req.body);
    const level = await prisma.gameLevel.create({
      data: { ...data, gameId: req.params.id },
    });
    res.status(201).json(level);
  } catch (err) {
    next(err);
  }
}

// Vérifie que le niveau :levelId appartient bien au jeu :id de l'URL
async function findLevelOrFail(gameId, levelId) {
  const level = await prisma.gameLevel.findUnique({ where: { id: levelId } });
  if (!level || level.gameId !== gameId) return null;
  return level;
}

// PATCH /api/games/:id/levels/:levelId
async function updateLevel(req, res, next) {
  try {
    const existing = await findLevelOrFail(req.params.id, req.params.levelId);
    if (!existing) return res.status(404).json({ error: 'Niveau introuvable pour ce jeu' });

    const data = updateLevelSchema.parse(req.body);
    const level = await prisma.gameLevel.update({
      where: { id: req.params.levelId },
      data,
    });
    res.json(level);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/games/:id/levels/:levelId
async function deleteLevel(req, res, next) {
  try {
    const existing = await findLevelOrFail(req.params.id, req.params.levelId);
    if (!existing) return res.status(404).json({ error: 'Niveau introuvable pour ce jeu' });

    await prisma.gameLevel.delete({ where: { id: req.params.levelId } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
  togglePublish,
  listLevels,
  createLevel,
  updateLevel,
  deleteLevel,
};

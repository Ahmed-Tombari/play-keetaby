const express = require('express');
const ctrl = require('../controllers/games.controller');

const router = express.Router();

router.get('/', ctrl.listGames);
router.get('/:id', ctrl.getGame);
router.post('/', ctrl.createGame);
router.patch('/:id', ctrl.updateGame);
router.delete('/:id', ctrl.deleteGame);
router.patch('/:id/publish', ctrl.togglePublish);

// Niveaux imbriqués (game_levels)
router.get('/:id/levels', ctrl.listLevels);
router.post('/:id/levels', ctrl.createLevel);
router.patch('/:id/levels/:levelId', ctrl.updateLevel);
router.delete('/:id/levels/:levelId', ctrl.deleteLevel);

module.exports = router;

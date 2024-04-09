const express = require('express');
const playerController = require('../controllers/player');

const router = express.Router();

router.get('/',playerController.getPlayer);
router.post('/', playerController.addPlayer);
router.get('/:name', playerController.getPlayerByName);
router.get('/:id', playerController.editPlayer);
router.put('/:id',playerController.updatePlayer);

module.exports = router;
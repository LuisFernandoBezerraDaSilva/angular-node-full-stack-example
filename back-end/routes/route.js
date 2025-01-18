const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');
const authController = require('../controllers/authController');
const valueController = require('../controllers/valueController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

router.get('/protected', authenticateToken, (req, res) => {
  res.send('Esta é uma rota protegida');
});

router.post('/login', (req, res) => authController.login(req, res));

router.get('/value', authenticateToken, (req, res) => valueController.getAll(req, res));
router.get('/value/:id', authenticateToken, (req, res) => valueController.getOne(req, res));
router.post('/value', authenticateToken, (req, res) => valueController.create(req, res));
router.put('/value/:id', authenticateToken, (req, res) => valueController.update(req, res));
router.delete('/value/:id', authenticateToken, (req, res) => valueController.delete(req, res));

module.exports = router;
// filepath: /e:/projects/angular-node-full-stack-example/back-end/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const BaseController = require('./baseController');
const prisma = new PrismaClient();

class AuthController extends BaseController {
  constructor(service) {
    super(service);
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController(prisma.user);
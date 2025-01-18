const BaseService = require('./baseService');
const { PrismaClient } = require('@prisma/client');
const valueSchema = require('../schemas/valueSchema');
const prisma = new PrismaClient();

class ValueService extends BaseService {
  constructor() {
    super(prisma.monthlyValue, valueSchema);
  }
}

module.exports = ValueService;
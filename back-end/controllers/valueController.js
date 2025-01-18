const BaseController = require('./baseController');
const ValueService = require('../services/valueService');

class ValueController extends BaseController {
  constructor(service) {
    super(service);
  }
}

const valueService = new ValueService();
module.exports = new ValueController(valueService);
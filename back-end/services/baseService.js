const Joi = require('joi');

class BaseService {
  constructor(model, schema) {
    this.model = model;
    this.schema = schema;
  }

  async create(data, schema, model) {
    this.validate(data, schema ? schema : this.schema);
    const modelToUse = model ? model : this.model;
    return await modelToUse.create({ data });
  }

  async getAll() {
    return await this.model.findMany();
  }

  async getOne(id) {
    const item = await this.model.findUnique({ where: { id: Number(id) } });
    if (!item) throw new Error('Item not found');
    return item;
  }

  async update(id, data) {
    this.validate(data, this.schema);
    return await this.model.update({
      where: { id: Number(id) },
      data,
    });
  }

  async delete(id) {
    return await this.model.delete({ where: { id: Number(id) } });
  }

  validate(data, schema) {
    const { error } = schema.validate(data);
    if (error) {
      throw new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
  }
}

module.exports = BaseService;
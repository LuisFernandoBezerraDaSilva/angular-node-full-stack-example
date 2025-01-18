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
      for (const key in schema) {
        const isOptional = schema[key].endsWith('?');
        const type = isOptional ? schema[key].slice(0, -1) : schema[key];
  
        if (data[key] === undefined) {
          if (!isOptional) {
            throw new Error(`Missing required field: ${key}`);
          }
        } else if (typeof data[key] !== type) {
          throw new Error(`Invalid type for ${key}. Expected ${type}. Received ${typeof data[key]}`);
        }
      }
    }
  }
  
  module.exports = BaseService;
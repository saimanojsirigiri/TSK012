exports.generateCrudOperations = (Model) => {
  return {
    getAll: () => Model.find(),
    getByTopic: (topic) => Model.find({ topic }),
    create: (record) => Model.create(record),
    insertMany: (record) => Model.insertMany(record),
  };
};

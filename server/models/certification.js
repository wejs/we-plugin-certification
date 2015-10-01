/**
 * Certification
 *
 * @module      :: Model
 * @description :: Certification model
 *
 */
module.exports = function Model(we) {
  var model = {
    definition: {
      name: { type: we.db.Sequelize.STRING, allowNull: false },
      text: { type: we.db.Sequelize.TEXT, allowNull: false },
      identifier: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      }
    },
    associations: {
      user: { type: 'belongsTo',  model: 'user' },
      template: { type: 'belongsTo', model: 'certificationTemplate' }
    },
    options: {
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  }

  return model;
}
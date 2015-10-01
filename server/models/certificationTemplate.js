/**
 * Certification template
 *
 * @module      :: Model
 * @description :: Certification template model
 *
 */
module.exports = function Model(we) {
  var model = {
    definition: {
      name: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      // i18n text value
      text: { type: we.db.Sequelize.TEXT, allowNull: false },

      textPosition: {
        type: we.db.Sequelize.STRING,
        formfieldType: 'select',
        fieldOptions: ['middle', 'left', 'right' ],
        defaultValue: 'middle'
      },
      identifier: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      }
    },
    associations: {
      creator: { type: 'belongsTo', model: 'user' }
    },
    options: {
      imageFields: {
        image: { formFieldMultiple: false }
      },
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  }

  return model;
}
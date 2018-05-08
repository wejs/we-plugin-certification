/**
 * Certification template
 *
 * @module      :: Model
 * @description :: Certification template model
 *
 */
module.exports = function Model(we) {
  const model = {
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
      },
      published: {
        type: we.db.Sequelize.BOOLEAN,
        formfieldType: 'boolean',
        defaultValue: false
      }
    },
    associations: {
      creator: { type: 'belongsTo', model: 'user' }
    },
    options: {
      tableName: 'certificationTemplate',
      enableAlias: false,

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
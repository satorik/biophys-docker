const textDescription = (sequelize, DataTypes ) => {
  return sequelize.define('textDescription', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false
  }
  }, {
    freezeTableName: true
  })
}

export default textDescription
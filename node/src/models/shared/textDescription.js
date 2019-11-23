const textDescription = (sequelize, DataTypes ) => {
  return sequelize.define('textDescription', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Content required"
      },
      len:{
          args:[50],
          msg:"Minimum 50 characters"
      }
    }
  },
  section: {type: DataTypes.ENUM('HISTORY', 'ADMISSION')},
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }
  }, {
    freezeTableName: true
  })
}

export default textDescription
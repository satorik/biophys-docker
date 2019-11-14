const scienceRoute = (sequelize, DataTypes ) => {
  return sequelize.define('scienceRoute', {
  title: {
    type: DataTypes.STRING(100), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Title required"
      },
      len:{
          args:[5, 100],
          msg:"Title 100 characters"
      }
    }
  },
  description: {
    type: DataTypes.TEXT, 
    allowNull: true
    }
  }
  )
}

export default scienceRoute
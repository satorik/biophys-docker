const scienceArticle = (sequelize, DataTypes ) => {
  return sequelize.define('scienceArticle', {
  author: {
    type: DataTypes.TEXT, 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Author required"
      },
      len:{
          args:[5],
          msg:"Minimum 5 characters"
      }
    }
  },
  title: {
    type: DataTypes.TEXT, 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Title required"
      },
      len:{
          args:[5],
          msg:"Minimum 5 characters"
      }
    }
  },
  journal: {
    type: DataTypes.TEXT, 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Journal required"
      },
      len:{
          args:[5],
          msg:"Minimum 5 characters"
      }
    }
  },
  }
  )
}

export default scienceArticle
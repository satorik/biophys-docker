const scienceGroup = (sequelize, DataTypes ) => {
  return sequelize.define('scienceGroup', {
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
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Description required"
      }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { 
      notEmpty:{
        args:true,
        msg:"Url required"
      }
    }
  },
  tel: {
    type: DataTypes.STRING(25), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Phone required"
      },
      len:{
          args:[5, 25],
          msg:"Minimum 5 Maximum 25 characters"
      }
    }
  },
  mail: {
    type: DataTypes.STRING(100), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Email required"
      },
      isEmail:{
          args:true,
          msg:"Should be right email format"
      }
    }
  },
  room: {
    type: DataTypes.STRING(50), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Room required"
      },
      len:{
        args:[2, 50],
        msg:"Minimum 2 Maximum 50 characters"
     } 
    }
  }
  }
  )
}

export default scienceGroup
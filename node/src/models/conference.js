const Conference = (sequelize, DataTypes ) => {
  return sequelize.define('conference', {
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
          msg:"Minimum 5 Maximum 100 characters"
      }
    }
  },
  description: {
    type: DataTypes.STRING(255), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Description required"
      },
      len:{
          args:[5, 255],
          msg:"Minimum 5 Maximum 255 characters"
      }
    }
  },
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
  dateFrom: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: { isDate: { msg: 'Invalid DateFrom' } }
  },
  dateTo: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: { isDate: { msg: 'Invalid DateTo' } }
  },
  location: { 
    type: DataTypes.STRING(255), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Location required"
      },
      len:{
          args:[1, 255],
          msg:"Maximum 255 characters"
      }
    }
  }
  }, {
   
  })}

export default Conference
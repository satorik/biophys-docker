const Seminar = (sequelize, DataTypes ) => {
  return sequelize.define('seminar', {
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
          msg:"Maximum 100 characters"
      }
    }
  },
  new: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
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
          msg:"Maximum 255 characters"
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
  speaker: {
    type: DataTypes.STRING(100), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Speaker required"
      },
      len:{
          args:[3, 100],
          msg:"Maximum 100 characters"
      }
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: { isDate: { msg: 'Invalid Date' } }
  },
  onCampus: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
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

export default Seminar
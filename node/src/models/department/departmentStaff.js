const departmentStaff = (sequelize, DataTypes ) => {
  return sequelize.define('departmentStaff', {
    firstname: {
      type: DataTypes.STRING(100), 
      allowNull: false,
      validate:{
        notEmpty:{
            args:true,
            msg:"Firstname required"
        },
        len:{
            args:[2, 100],
            msg:"Firstname 100 characters"
        }
      }
    },
    middlename: {
      type: DataTypes.STRING(100), 
      allowNull: false,
      validate:{
        notEmpty:{
            args:true,
            msg:"Middlename required"
        },
        len:{
            args:[2, 100],
            msg:"Middlename 100 characters"
        }
      }
    },
    lastname: {
      type: DataTypes.STRING(100), 
      allowNull: false,
      validate:{
        notEmpty:{
            args:true,
            msg:"Lastname required"
        },
        len:{
            args:[2, 100],
            msg:"Lastname 100 characters"
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
  jobTitle: {
    type: DataTypes.STRING(255), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"jobTitle required"
      },
      len:{
          args:[5, 255],
          msg:"jobTitle max 255 characters"
      }
    }
  },
  position: {
    type: DataTypes.INTEGER, 
    allowNull: false
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
          msg:"Maximum 255 characters"
      }
    }
  },
  tel: {type: DataTypes.STRING, allowNull: false},
  mail: {type: DataTypes.STRING, allowNull: false},
  }, {
    freezeTableName: true
  })
}

export default departmentStaff
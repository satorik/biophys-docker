const departmentPrint = (sequelize, DataTypes ) => {
  return sequelize.define('departmentPrint', {
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty:{
          args:true,
          msg:"link required"
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
          msg:"Minimem 5 characters, Maximum 100 characters"
      }
    }
  },
  description: {
    type: DataTypes.STRING(1200), 
    allowNull: false,
    validate:{
      notEmpty:{
          args:true,
          msg:"Description required"
      },
      len:{
          args:[5, 1200],
          msg:"Maximum 1200 characters"
      }
    }
  }}
  )
}

export default departmentPrint
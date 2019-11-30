const departmentPrint = (sequelize, DataTypes ) => {
  return sequelize.define('departmentPrint', {
    fileLink: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        notEmpty:{
          args:true,
          msg:"link required"
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
  image : {
    type: DataTypes.TEXT
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
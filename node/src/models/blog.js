const Blogpost = (sequelize, DataTypes ) => {
  return sequelize.define('blogpost', {
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
  },     
  )}

export default Blogpost
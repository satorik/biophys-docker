const Note = (sequelize, DataTypes ) => {
  return sequelize.define('note', {
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
    allowNull: true,
  },
  onTop: {
    type: DataTypes.BOOLEAN, 
    allowNull: false,
    defaultValue: false
  }
  }, {
    hooks: {
      beforeUpdate: (note, options) => {
        if (note.onTop === true) {
          console.log('becoming true')
        }
      }
    }
  })}

export default Note
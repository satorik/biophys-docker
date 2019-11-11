const sciencePeople = (sequelize, DataTypes ) => {
  return sequelize.define('sciencePeople', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middlename: { type: DataTypes.STRING},
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {type: DataTypes.TEXT },
  tel: {type: DataTypes.STRING },
  mail: {type: DataTypes.STRING},
  birthday: {type: DataTypes.DATE},
  url:{type:DataTypes.STRING},
  type:{type:DataTypes.STRING} 
  }, 
  {
    freezeTableName: true
  })
}

export default sciencePeople
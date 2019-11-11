const departmentPartnership = (sequelize, DataTypes ) => {
  return sequelize.define('departmentPartnership', {
  link: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: { type: DataTypes.TEXT}
  }, 
  {
    freezeTableName: true
  })
}

export default departmentPartnership
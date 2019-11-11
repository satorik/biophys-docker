const departmentPrint = (sequelize, DataTypes ) => {
  return sequelize.define('departmentPrint', {
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: { type: DataTypes.STRING },
  desc: { type: DataTypes.TEXT},
  title: {type: DataTypes.STRING}
  }
  )
}

export default departmentPrint
const departmentQuery = {
  staff(parent, args, {models}) {
    return models.DepartmentStaff.findAll({raw: true})
  },
  prints(parent, args, {models}) {
    return models.DepartmentPrint.findAll({raw: true})
  },
  partnership(parent, args, {models}) {
    return models.DepartmentPartnership.findAll({raw: true})
  },
  history(parent, {section}, {models}){
    return models.TextDescription.findOne({where: {section}, raw: true})
  }

}

export default departmentQuery
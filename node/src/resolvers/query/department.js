const departmentQuery = {
  staff(parent, args, {models}, info) {
    return models.DepartmentStaff.findAll({raw: true})
  },
  prints(parent, args, {models}, info) {
    return models.DepartmentPrint.findAll({raw: true})
  },
  partnership(parent, args, {models}, info) {
    return models.DepartmentPartnership.findAll({raw: true})
  }
}

export default departmentQuery
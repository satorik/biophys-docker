const educationForms = [
  {
    title: 'Учебник', 
    type: 'SINGLE', 
    filetype: 'PDF'
  },
  {
    title: 'Программа', 
    type: 'SINGLE', 
    filetype: 'PDF'
  },
  {
    title: 'Презентации', 
    type: 'MULTY', 
    filetype: 'PDF'
  },
  {
    title: 'Видеозаписи', 
    type: 'MULTY', 
    filetype: 'URL'
  },
  {
    title: 'Практикум', 
    type: 'MULTY', 
    filetype: 'PDF'
  }
]

const createBasicLayout = async (models) => {
  const formCnt = models.educationForm.count()
  if (formCnt === 0) {
    await models.educationForm.bulkCreate(educationForms)
  } 
}

export default createBasicLayout
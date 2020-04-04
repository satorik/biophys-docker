import React from 'react'

export const EmptyData = ({instance, secondary}) => {

  const paragpragh = {
    educationCourse: 'ни одного курса',
    schedule: 'ни одного расписания',
    scienceRoute: 'ни одного научного направления',
    scienceGroup: 'ни одной научной группы',
    sciencePeople: 'ни одного научного сотрудника',
    scienceArticle: 'ни одной публикации',
    staff: 'ни одного сотрудника кафедры',
    admission: 'раздела прием на кафедру',
    educationYear: 'ни одного направления',
    educationResourse: 'ни одного материала',
    history: 'истории кафедры',
    partnership: 'ни одного сотрудничества',
    print: 'ни одной печатной продукции',
    note: 'ни одной новости',
    blogpost: 'ни одного поста в блоге',
    conference: 'одной конференции',
    seminar: 'ни одного семинара'
  }

  const mutedText = !secondary ? '(красный круг с плюсиком в правом нижнем углу)' :
  '(в соответсвующем разделе)'

  return (
    <div className="container card mt-5 p-2">
      <p className="h5 text-center">{`Пока нет ${paragpragh[instance]}. Создайте.`}</p>
      <p className="text-center text-muted">{mutedText}</p>
    </div>
  )
}

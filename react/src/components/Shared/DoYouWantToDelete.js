import React from 'react'

export default ({onDelete}) => <div>
<p>Вы уверены, что хотите удалить эту запись?</p>
<button className="btn btn-primary" onClick={onDelete}>Да</button>
</div>
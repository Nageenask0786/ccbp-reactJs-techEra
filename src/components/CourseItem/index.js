import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {name, logoUrl, id} = courseDetails
  return (
    <Link to={`/courses/${id}`} className="nav-link">
      <li className="course-item">
        <img src={logoUrl} alt={name} className="image" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem

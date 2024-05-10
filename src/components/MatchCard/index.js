import './index.css'
import {Link} from 'react-router-dom'

const MathCard = props => {
  const {details} = props
  const {id, name, teamImageUrl} = details

  return (
    <Link to={`/team-matches/${id}`} className="match-card-links">
      <li className="match-card-item">
        <img src={teamImageUrl} alt={name} className="match-card-image" />
        <p className="match-card-name">{name}</p>
      </li>
    </Link>
  )
}

export default MathCard

import './index.css'

const TeamCard = props => {
  const {details} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = details
  const statsClass = matchStatus === 'Lost' ? 'lost-class' : 'win-class'

  return (
    <li className="team-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-card-image"
      />
      <p className="competing-team-heading">{competingTeam}</p>
      <p>{result}</p>
      <p className={statsClass}>{matchStatus}</p>
    </li>
  )
}

export default TeamCard

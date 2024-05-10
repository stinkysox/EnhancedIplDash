import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import TeamCard from '../TeamCard'
import PieDataRoute from '../PieDataRoute'

class TeamMatches extends Component {
  state = {
    latestMatchDetails: {},
    recentMatches: [],
    imageUrl: '',
    apiStatus: 'Loading',
  }

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  convertToCamelCase = item => ({
    competingTeam: item.competing_team,
    competingTeamLogo: item.competing_team_logo,
    date: item.date,
    firstInnings: item.first_innings,
    id: item.id,
    manOfTheMatch: item.man_of_the_match,
    matchStatus: item.match_status,
    result: item.result,
    secondInnings: item.second_innings,
    umpires: item.umpires,
    venue: item.venue,
  })

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await response.json()
      const {
        latest_match_details: latestMatchDetails,
        recent_matches: recentMatches,
        team_banner_url: imageUrl,
      } = data
      const camelCaseDetails = this.convertToCamelCase(latestMatchDetails)
      const camelCaseRecentMatches = recentMatches.map(eachItem =>
        this.convertToCamelCase(eachItem),
      )

      this.setState({
        latestMatchDetails: camelCaseDetails,
        recentMatches: camelCaseRecentMatches,
        imageUrl,
        apiStatus: 'Success',
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({apiStatus: 'Failed'})
    }
  }

  getBgDetails = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb-bg'
      case 'KKR':
        return 'kkr-bg'
      case 'CSK':
        return 'csk-bg'
      case 'SH':
        return 'sh-bg'
      case 'KXP':
        return 'kxp-bg'
      case 'RR':
        return 'rr-bg'
      case 'MI':
        return 'mi-bg'
      case 'DC':
        return 'dc-bg'
      default:
        return null
    }
  }

  renderResultsBasedOnApi = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'Success':
        return this.renderSuccessView()
      case 'Loading':
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {latestMatchDetails, recentMatches, imageUrl} = this.state
    const bgClass = this.getBgDetails()
    return (
      <div className={`team-matches-bg-container ${bgClass}`} testid="loader">
        <img src={imageUrl} alt="team banner" />
        <h1 className="latest-heading">Latest Matches</h1>
        <LatestMatch details={latestMatchDetails} />
        <ul className="cards-container">
          {recentMatches.map(eachItem => (
            <TeamCard key={eachItem.id} details={eachItem} />
          ))}
        </ul>
        <PieDataRoute />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    return <>{this.renderResultsBasedOnApi()}</>
  }
}

export default TeamMatches

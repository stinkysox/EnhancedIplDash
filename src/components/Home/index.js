import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import MathCard from '../MatchCard'

class Home extends Component {
  state = {
    matchCardArray: [],
    apiStatus: 'Loading',
  }

  componentDidMount() {
    this.getTeamCardDetails()
  }

  getTeamCardDetails = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/ipl')
      const data = await response.json()
      const {teams} = data
      const updateData = teams.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        teamImageUrl: eachItem.team_image_url,
      }))

      this.setState({matchCardArray: updateData, apiStatus: 'Success'})
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({apiStatus: 'Failed'})
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
    const {matchCardArray} = this.state

    return (
      <div className="bg-container">
        <div className="container">
          <div className="home-logo-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="home-logo-heading">IPL Dashboard</h1>
          </div>
          <ul className="team-card-container">
            {matchCardArray.map(eachItem => (
              <MathCard key={eachItem.id} details={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    return <>{this.renderResultsBasedOnApi()}</>
  }
}

export default Home

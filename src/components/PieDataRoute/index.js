import { useState, useEffect } from 'react'
import './index.css'
import { useParams, useHistory } from 'react-router-dom'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'

const PieDataRoute = () => {
  const [matchDetails, setMatchDetails] = useState([])
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getPieChartDetails = async () => {
      try {
        const apiUrl = `https://apis.ccbp.in/ipl/${id}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        const { recent_matches: recentMatches } = data
        setMatchDetails(recentMatches)
      } catch (error) {
        console.error('Error fetching match details:', error)
      }
    }
    getPieChartDetails()
  }, [id])

  const calculateMatchStatusCount = () => {
    let wonCount = 0
    let lostCount = 0
    let drawCount = 0

    matchDetails.forEach(match => {
      if (match.match_status === 'Won') {
        wonCount += 1
      } else if (match.match_status === 'Lost') {
        lostCount += 1
      } else if (match.match_status === 'Draw') {
        drawCount += 1
      }
    })

    return [
      { name: 'Won', value: wonCount },
      { name: 'Lost', value: lostCount },
      { name: 'Draw', value: drawCount },
    ]
  }

  const data = calculateMatchStatusCount()

  const COLORS = ['#0088FE', '#FF8042', '#00C49F']

  const handleBackButtonClick = () => {
    history.push('/')
  }

  return (
    <div style={{ width: '100%', height: 500 }} className="pie-w-container">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <button className="back-btn" onClick={handleBackButtonClick}>
        Back
      </button>
    </div>
  )
}

export default PieDataRoute

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import './index.css'
import CourseItem from '../CourseItem'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {coursesData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = data.courses.map(each => ({
        name: each.name,
        id: each.id,
        logoUrl: each.logo_url,
      }))

      this.setState({
        coursesData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getCourseData()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4656a1" width="50" height="50" />
    </div>
  )

  renderSuccessView = () => {
    const {coursesData} = this.state
    return (
      <div className="success-view">
        <h1 className="heading">Courses</h1>
        <ul className="courses-data-list">
          {coursesData.map(each => (
            <CourseItem courseDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderHomeFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderHomeView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderHomeFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-route">
        <Header />
        {this.renderHomeView()}
      </div>
    )
  }
}

export default Home

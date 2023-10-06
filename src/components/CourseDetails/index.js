import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {
    CourseData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseDetailView()
  }

  getCourseDetailView = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const courseDetails = data.course_details
      const formattedCourseDetails = {
        description: courseDetails.description,
        id: courseDetails.id,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
      }

      this.setState({
        CourseData: formattedCourseDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getCourseDetailView()
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4656a1" width="50" height="50" />
    </div>
  )

  renderFailureView = () => (
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

  renderSuccessView = () => {
    const {CourseData} = this.state
    const {imageUrl, name, description} = CourseData
    return (
      <div className="course-details-route">
        <div className="course-details">
          <div className="image-container">
            <img src={imageUrl} width="100%" height="100%" alt={name} />
          </div>
          <div className="details">
            <h1 className="course-name">{name}</h1>
            <p className="course-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderFinalView()}
      </>
    )
  }
}

export default CourseDetails

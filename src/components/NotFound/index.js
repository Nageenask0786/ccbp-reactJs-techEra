import './index.css'

import Header from '../Header'

const NotFound = () => (
  <div className="not-found-route">
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      className="image"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-route-description">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound

// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const onClickFavorite = () => {
    const {onToggleFavorite} = props
    onToggleFavorite(id)
  }

  const toggleFavorite = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const appointmentTime = format(new Date(date), 'dd MMMM yyyy, EEEE')
  return (
    <li className="list-container">
      <div className="title-favorite">
        <p className="title">{title}</p>
        <button
          className="favorite-btn"
          onClick={onClickFavorite}
          type="button"
          data-testid="star"
        >
          <img src={toggleFavorite} alt="star" className="favorite-icon" />
        </button>
      </div>
      <p className="date">{appointmentTime}</p>
    </li>
  )
}

export default AppointmentItem

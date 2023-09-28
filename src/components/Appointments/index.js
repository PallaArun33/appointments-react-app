// Write your code here
import {Component} from 'react'
import {v4 as v4uuid} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {titleInput: '', dateInput: '', appointmentsList: []}

  onClickStarred = () => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.filter(
        eachItem => eachItem.isFavorite === true,
      ),
    }))
  }

  onToggleFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  renderAppointmentsList = () => {
    const {appointmentsList} = this.state

    return appointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        onToggleFavorite={this.onToggleFavorite}
      />
    ))
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: v4uuid(),
      title: titleInput,
      date: dateInput,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onchangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  render() {
    const {appointmentsList, titleInput, dateInput} = this.state
    console.log(appointmentsList)

    return (
      <div className="appointment-container">
        <div className="appointment-card">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitForm}>
              <label htmlFor="title" className="title-label">
                TITLE
              </label>
              <input
                className="input-title form-control"
                type="text"
                id="title"
                value={titleInput}
                placeholder="Title"
                onChange={this.onChangeTitleInput}
              />
              <label className="date" htmlFor="date">
                DATE
              </label>
              <input
                className="input-date from-control"
                type="date"
                id="date"
                value={dateInput}
                placeholder="dd/mm/yyyy"
                onChange={this.onchangeDateInput}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="hr-line" />
          <div className="list-appointments">
            <div className="appointment-starred">
              <h1 className="appointments">Appointments</h1>
              <button
                className="btn"
                type="button"
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>
            <ul className="ul-items">{this.renderAppointmentsList()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

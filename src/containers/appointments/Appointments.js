import React, { Component } from 'react';
import './Appointments.css';

// images
import apptIcon from '../../appt-icon.png';

// plugins
import moment from 'moment';

class Appointments extends Component {

    listAppointments = () => {
        return this.props.appointments.map(appt => {
            return (
                <div className="appointment" key={appt.start.timestamp}>
                    <img className="appt-icon" src={ apptIcon } alt="appointment icon" />
                    <div>
                        <p><span className="type">When:</span> { moment(appt.start.timestamp).format('dddd, MMMM Do, YYYY') }</p>
                        <p><span className="type">Start Time:</span> { appt.start.displayTime }</p>
                        <p><span className="type">End Time:</span> { appt.end.displayTime }</p>
                    </div>
                    <div className="remove" onClick={() => this.props.deleteAppointment(appt.start.timestamp)}>Remove</div>
                </div>
            )
        })
    }
    
    render () {
        const { listAppointments } = this;

        return (
            <div className="appointments">
                <h2>Your Appointments</h2>
                { listAppointments() }
            </div>
        )
    }
}

export default Appointments;
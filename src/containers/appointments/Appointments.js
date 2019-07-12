import React, { Component } from 'react';
import './Appointments.css';

// plugins
import moment from 'moment';

class Appointments extends Component {

    listAppointments = () => {
        return this.props.appointments.map(appt => {
            return (
                <div className="appointment" key={appt.start.timestamp}>
                    <p>When: { moment(appt.start.timestamp).format('dddd, MMMM Do, YYYY') }</p>
                    <p>Start Time: { appt.start.displayTime }</p>
                    <p>End Time: { appt.end.displayTime }</p>
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
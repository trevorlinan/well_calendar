import React, { Component, Fragment } from 'react';
import './Appointments.css';

// images
import apptIcon from '../../appt-icon.png';

// plugins
import moment from 'moment';

class Appointments extends Component {

    listAppointments = () => {
        const sortedAppointments = this.props.appointments.sort((apptA, apptB) =>{
            return apptA.start.timestamp - apptB.start.timestamp;
        })

        let day = null;
        return sortedAppointments.map((appt) => {
            let apptDay = moment(appt.start.timestamp).date();
            let date = null;
            if (apptDay !== day) {
                date = <h3 className="date-heading">{ moment(appt.start.timestamp).format('dddd, MMMM Do, YYYY') }</h3>;
                day = apptDay;
            }
            
            return (
                <Fragment key={appt.start.timestamp}>
                    { date }
                    <div className="appointment" key={appt.start.timestamp}>
                        <img className="appt-icon" src={ apptIcon } alt="appointment icon" />
                        <div>
                            <p><span className="type">Start Time:</span> { appt.start.displayTime }</p>
                            <p><span className="type">End Time:</span> { appt.end.displayTime }</p>
                        </div>
                        <div className="remove" onClick={() => this.props.deleteAppointment(appt.start.timestamp)}>Remove</div>
                    </div>
                </Fragment>
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
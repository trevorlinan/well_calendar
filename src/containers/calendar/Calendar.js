import React, { Component } from 'react';
import './Calendar.css';

//containers
import Header from '../header/Header';
import Appointments from '../appointments/Appointments';

// components
import TimeSlot from '../../components/timeslot/TimeSlot';
import InfiniteCalendar from '../../components/infiniteCalendar/InfiniteCalendar';


// helpers
import { getSelectionTimesByMinutes } from '../../utils';
import config from '../../config';

// plugins
import moment from 'moment';

class Calendar extends Component {
    constructor () {
        super();
        this.state = {
            appointments: [],
            selectionTimes: [],
            selectedDate: new Date()
        }
    }

    componentDidMount = () => {
        this.updateSelectionTimes(this.state.selectedDate);
    }

    getSelectionTimes = date => {
        const { range: { start, end } } = config;
        const isToday = moment(new Date()).isSame(moment(date), 'days');
        const unixTimestamp = moment(isToday ? new Date() : date).unix() * 1000;
        const unixRangeTimestamp = isToday ? moment(moment(unixTimestamp).startOf("day")).unix() * 1000 : unixTimestamp;
        const range = { start: unixRangeTimestamp + start, end: unixRangeTimestamp + end }; // start and end times for selection list
        const existingTimes = this.state.appointments.map(appt => {
            return {
                start: appt.start.timestamp,
                end: appt.end.timestamp
            }
        })
        return getSelectionTimesByMinutes(15, unixTimestamp, range, existingTimes);
    }

    updateSelectionTimes = date => {
        const times = !moment(date).isBefore(new Date(), 'days') ? this.getSelectionTimes(date) : []; // verifys date is current or in future
        this.setState({ selectionTimes: times, selectedDate: date })
    }

    addAppointment = appt => {
        this.setState(state => {
            state.appointments = [...this.state.appointments, appt];
            state.selectionTimes = this.getSelectionTimes(this.state.selectedDate);
            return state;
        })
    }

    deleteAppointment = timestamp => {
        const appointments = this.state.appointments.filter(appt => appt.start.timestamp !== timestamp);
        this.setState(state => {
            state.appointments = appointments;
            state.selectionTimes = this.getSelectionTimes(this.state.selectedDate);
            return state;
        })
    }

    render () {
        const { selectionTimes: times, appointments } = this.state;
        const { updateSelectionTimes, addAppointment, deleteAppointment } = this;

        return (
            <div className="calendar">
                <Header />
                <InfiniteCalendar { ...{ updateSelectionTimes } } />
                <TimeSlot { ...{ times, addAppointment, updateSelectionTimes } } />
                <Appointments { ...{ appointments, deleteAppointment } } />
            </div>
        )
    }
}

export default Calendar;
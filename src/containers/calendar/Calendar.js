import React, { Component } from 'react';
import './Calendar.css';

// plugins
import moment from 'moment';

// components
import Header from '../header/Header';
import TimeSlot from '../../components/timeslot/TimeSlot';

// helpers
import { getSelectionTimesByMinutes } from '../../utils'

// Plugins
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

class Calendar extends Component {
    constructor () {
        super();
        this.state = {
            appointments: [],
            selectedDate: new Date().getTime(),
            selectionTimes: []
        }
    }

    componentDidMount = () => {
        this.updateSelectedDate(moment(new Date()))
    }

    updateSelectedDate = date => {
        var unixTimestamp = moment(date).unix() * 1000;
        var selectionTimes = getSelectionTimesByMinutes(15, unixTimestamp);
        this.setState({ selectionTimes })
    }

    render () {
        const { selectionTimes: times } = this.state;

        return (
            <div className="calendar">
                <Header />
                <InfiniteCalendar 
                    className="infinite-calendar"
                    today={ new Date() }
                    onSelect={ this.updateSelectedDate }
                />
                <TimeSlot { ...{ times }} />
            </div>
        )
    }
}

export default Calendar;
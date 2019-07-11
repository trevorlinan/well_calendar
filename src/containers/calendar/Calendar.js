import React, { Component } from 'react';
import './Calendar.css';

// components
import Header from '../header/Header';
import TimeSlot from '../../components/timeslot/TimeSlot';

// helpers
import { getSelectionTimesByMinutes } from '../../utils';
import config from '../../config';

// plugins
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import moment from 'moment';

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
        this.updateSelectedDate(moment(new Date()), true)
    }

    updateSelectedDate = (date, today) => {
        const { range: { start, end } } = config;
        var unixTimestamp = moment(date).unix() * 1000;
        var unixRangeTimestamp = today ? moment(moment(unixTimestamp).startOf("day")).unix() * 1000 : unixTimestamp;
        var range = { start: unixRangeTimestamp + start, end: unixRangeTimestamp + end };
        var selectionTimes = getSelectionTimesByMinutes(15, unixTimestamp, range);
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
import React from 'react';
import './InfiniteCalendar.css';

// plugins
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

const InfiniteCalendarWrapper = props => {
    return (
        <div className="infinite-calendar-wrapper">
            <InfiniteCalendar 
                className="infinite-calendar"
                today={ new Date() }
                onSelect={ props.updateSelectionTimes }
            />
        </div>
    )
}

export default InfiniteCalendarWrapper;
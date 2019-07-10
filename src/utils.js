import moment from 'moment';

export const formatHourMinutePeriod = timestamp => {
    return moment(timestamp).format("h:mm a");
}

export const getSelectionTimesByMinutes = (increment, timestamp) => {
    var timesCount = Math.round(1440 / increment);

    return [ ...new Array(timesCount) ].map(() => ({ 
        timestamp: timestamp += increment * 60 * 1000, 
        displayTime: formatHourMinutePeriod(timestamp)
    }))
   
}

// timestamp + increment * 60 * 1000;
// displayTime = formatHourMinutePeriod(timestamp);
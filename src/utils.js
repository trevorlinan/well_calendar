import moment from 'moment';

export const formatHourMinutePeriod = timestamp => {
    return moment(timestamp).format("h:mm a");
}

export const getSelectionTimesByMinutes = (increment, timestamp, { start, end }) => {
    var timesCount = Math.round(1440 / increment);
    var mod = moment(timestamp).minute() % increment;
    if (mod !== 0) timestamp += (increment - mod) * 60 * 1000;

    return [ ...new Array(timesCount) ].reduce((times) => {
        timestamp += increment * 60 * 1000
        if (timestamp >= start && timestamp <= end) {
            times.push({
                timestamp: timestamp, 
                displayTime: formatHourMinutePeriod(timestamp)
            })
        }
        return times;
    }, [])
}

export const getAvailableEndTimes = (startTime, times) => {
    return times.filter(obj => {
        return obj.timestamp > startTime;
    })
}
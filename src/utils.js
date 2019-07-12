import moment from 'moment';

export const formatHourMinutePeriod = timestamp => {
    return moment(timestamp).format("h:mm a");
}

export const getSelectionTimesByMinutes = (increment, timestamp, { start, end }, existingTimes) => {
    let timesCount = Math.round(1440 / increment);
    let mod = moment(timestamp).minute() % increment;
    if (mod !== 0) timestamp += (increment - mod) * 60 * 1000; // offset to select next time incrememnt if current time is in between

    return [ ...new Array(timesCount) ].reduce((times) => {
        timestamp += increment * 60 * 1000
        if (timestamp >= start && timestamp <= end) {

            let timeNotAvailable = existingTimes.find(time => {
                return timestamp === time.start || timestamp === time.end || (timestamp > time.start && timestamp < time.end)
            });

            times.push({
                timestamp: timestamp, 
                displayTime: formatHourMinutePeriod(timestamp),
                available: !timeNotAvailable
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
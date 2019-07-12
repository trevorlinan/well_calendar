import moment from 'moment';

export const formatHourMinutePeriod = timestamp => {
    return moment(timestamp).format("h:mm a");
}

// increment = time interval to create times with e.g. 15, 30, 60
// timestamp = unix date 
// start, end = times of day to start and end the available selections
// existing times = existing appointments [{ start: ttimestamp, end: timestamp }]
export const getSelectionTimesByMinutes = (increment, timestamp, { start, end }, existingTimes) => {
    const timesCount = Math.round(1440 / increment); 
    const mod = moment(timestamp).minute() % increment; // get remaning minutes to next increment
    if (mod !== 0) timestamp += (increment - mod) * 60 * 1000; // offset to select next time incrememnt if current time is in between

    return [ ...new Array(timesCount) ].reduce((times) => {
        timestamp += increment * 60 * 1000
        if (timestamp >= start && timestamp <= end) {

            const timeNotAvailable = existingTimes.find(time => {
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

// startTime = unix date
// times = all selection times generated
export const getAvailableEndTimes = (startTime, times) => {
    let exit = false;
    return times.filter((obj, ind) => {
        if (obj.timestamp < startTime) return false;
        if ((ind + 1 < times.length && !times[ind + 1].available) || exit) {
            if (!exit) {
                exit = true;
                return obj.timestamp > startTime;
            }
            exit = true;
            return false
        }
        return obj.timestamp > startTime;
    })
}
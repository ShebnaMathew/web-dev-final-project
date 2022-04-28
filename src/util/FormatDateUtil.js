export const determineMonth = (month) => {
    const numericMonth = parseInt(month);
    switch (numericMonth) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 12:
            return "December";
        default:
            return "";
    }
}

export const formatDOB = (date) => {
    if (date === undefined) {
        return '';
    }
    const dateVals = date.split("-");
    const month = determineMonth(dateVals[1]);

    if (!month) {
        return `${dateVals[0]}`
    }

    return `${month} ${dateVals[2]}, ${dateVals[0]}`
}

export const formatJoinedDate = (date) => {
    if (date === undefined) {
        return '';
    }
    const dateVals = date.split("-");
    const month = determineMonth(dateVals[1]);
    return `${month} ${dateVals[0]}`
}
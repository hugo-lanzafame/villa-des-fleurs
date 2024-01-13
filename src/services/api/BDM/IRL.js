import axios from "axios";
import config from "./config"

/**
 * Returns the quarter based on the provided month.
 *
 * @param {number} month - The month (0-indexed) for which to determine the trimestre.
 * @returns {string} The corresponding trimestre (e.g., 'Q1', 'Q2', 'Q3', 'Q4').
 * @throws {Error} Throws an error if the month is not within the valid range (0-11).
 */
const getQuarter = (month) => {
    switch (month) {
        case 0:
        case 1:
        case 2:
            return 'Q1';
        case 3:
        case 4:
        case 5:
            return 'Q2';
        case 6:
        case 7:
        case 8:
            return 'Q3';
        case 9:
        case 10:
        case 11:
            return 'Q4';
        default:
            throw new Error('BDM API (IRL): UNKNOWN MONTH (0-11)');
    }
};

/**
 * Returns the time period formatted as 'YYYY-QX' based on the provided date.
 *
 * @param {Date} date - The date for which to determine the time period.
 * @returns {string} A promise that resolves to the formatted time period string.
 */
const getTimePeriod = (date) => {
    const year = date.getFullYear();

    const month = date.getMonth();
    const quarter = getQuarter(month);

    return year + '-' + quarter;
}

/**
 * Fetches Indice de référence des loyers (IRL) data from the BDM API based on the provided date.
 *
 * @param {Date} date - The date for which to fetch IRL data.
 * @returns {Promise<string>} A promise that resolves to the OBS_VALUE retrieved from the API.
 * @throws {Error} Throws an error if the API request fails or if an unknown month is encountered.
 */
const getIRL = async (date) => {
    try {
        const timePeriod = getTimePeriod(date);
        const response = await axios.get(
            `${config.baseURL}/data/SERIES_BDM/001515333?startPeriod=${timePeriod}&detail=dataonly`,
            {
                headers: {
                    'Authorization': `Bearer ${config.apiKey}`,
                },
            }
        );

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'application/xml');
        const targetObs = xmlDoc.querySelector(`Obs[TIME_PERIOD="${timePeriod}"]`);

        return targetObs.getAttribute('OBS_VALUE');
    } catch (error) {
        throw error;
    }
};

export {getIRL};
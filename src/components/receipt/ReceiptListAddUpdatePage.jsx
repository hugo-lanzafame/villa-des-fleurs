import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    MenuItem,
    Typography,
    TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { getRentalById } from "../../services/api/firebase/rentals";
import { useLanguage } from "../../contexts/LanguageProvider";
import { useNotification } from "../../contexts/NotificationProvider";
import CustomPageTop from "../common/CustomPageTop";
import { PATHS } from "../../constants/routing";
import { NOTIFICATION_TYPES } from "../../constants/notification";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../../styles/receiptStyle.scss";

/**
 * Component for the receipt page.
 *
 * @returns {JSX.Element} The ReceiptPage component.
 */
function ReceiptPage() {
    const { translate } = useLanguage();
    const { addNotification } = useNotification();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const rentalId = searchParams.get('id');
    const [monthsData, setMonthsData] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);
    const [availableYears, setAvailableYears] = useState([]);

    /**
     * @type {BreadcrumbLink[]}
     */
    const breadcrumbLinks = [
        { label: translate({ section: "BREADCRUMB", key: "HOME" }), to: PATHS.HOME },
        { label: translate({ section: "BREADCRUMB", key: "TOOLS" }), to: PATHS.TOOLS },
        { label: translate({ section: "BREADCRUMB", key: "RECEIPTS" }), to: PATHS.RECEIPTS },
        { label: translate({ section: "BREADCRUMB", key: "EDITION" }), to: '' },
    ];

    let title = translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "PAGE_TITLE_EDITION" });

    useEffect(() => {
        /**
         * Fetch rental data and initialize the component state.
         * Sets up available years, default selected year, and initializes monthly data.
         */
        async function fetchRental() {
            try {
                setLoading(true);
                
                if (!rentalId) {
                    console.error("No rental ID found in URL parameters");
                    setLoading(false);
                    return;
                }
                
                let rentalData = await getRentalById(rentalId);
                setRental(rentalData);

                // Generate years from rental start year to end year (or current year if no end date)
                if (rentalData && rentalData.startDate) {
                    const [startDay, startMonth, startYear] = rentalData.startDate.split('/');
                    const currentYear = new Date().getFullYear();
                    const startYearInt = parseInt(startYear);

                    let endYearInt = currentYear;
                    if (rentalData.endDate) {
                        const [endDay, endMonth, endYear] = rentalData.endDate.split('/');
                        endYearInt = parseInt(endYear);
                    }

                    const yearCount = endYearInt - startYearInt + 1;
                    const years = Array.from({ length: yearCount }, (_, i) => startYearInt + i);
                    setAvailableYears(years);

                    // Set default selected year to current year if available, otherwise the last available year
                    const defaultYear = years.includes(currentYear) ? currentYear : years[years.length - 1];
                    setSelectedYear(defaultYear);
                    
                    initializeData(rentalData, defaultYear);
                } else {
                    // If no start date, use current year as default
                    const fallbackYear = new Date().getFullYear();
                    setSelectedYear(fallbackYear);
                    setAvailableYears([fallbackYear]);
                    initializeData(rentalData, fallbackYear);
                }
            } catch (error) {
                console.error("Error fetching rental:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRental();
        // eslint-disable-next-line
    }, [rentalId]);

    /**
     * Handle year change event.
     * 
     * @param {Event} event - The change event from the year selector.
     */
    const handleYearChange = (event) => {
        const newYear = parseInt(event.target.value);
        setSelectedYear(newYear);
        if (rental) {
            initializeData(rental, newYear);
        }
    };

    /**
     * Initialize the monthly data for a specific rental and year.
     * 
     * @param {Object} rental - The rental object containing all rental information.
     * @param {number} year - The year for which to initialize the data.
     */
    function initializeData(rental, year) {
        const months = [
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_JANUARY" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_FEBRUARY" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_MARCH" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_APRIL" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_MAY" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_JUNE" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_JULY" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_AUGUST" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_SEPTEMBER" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_OCTOBER" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_NOVEMBER" }),
            translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_DECEMBER" })
        ];

        const [startDay, startMonth, startYear] = rental.startDate.split('/');
        let endDay, endMonth, endYear;
        let hasEndDate = false;

        if (rental.endDate) {
            [endDay, endMonth, endYear] = rental.endDate.split('/');
            hasEndDate = true;
        }

        const initData = months.map((month, index) => {
            const currentMonth = index + 1;
            const isRentChanged = currentMonth === parseInt(startMonth) && year === parseInt(startYear);
            const isRentalStartMonth = currentMonth === parseInt(startMonth); // Pour toutes les années

            // Check if this month is within the rental period
            const isBeforeRentalStart = year < parseInt(startYear) || (year === parseInt(startYear) && currentMonth < parseInt(startMonth));
            const isAfterRentalEnd = hasEndDate && (year > parseInt(endYear) || (year === parseInt(endYear) && currentMonth > parseInt(endMonth)));
            const isWithinRentalPeriod = !isBeforeRentalStart && !isAfterRentalEnd;

            let rent = 0;
            let charges = 0;
            let miscellaneousFees = 0;
            let total = 0;

            if (isWithinRentalPeriod) {
                rent = getApplicablePrice(rental.rentPrices, currentMonth, year);
                charges = getApplicablePrice(rental.chargesPrices, currentMonth, year);
                miscellaneousFees = 0;
                total = rent + charges + miscellaneousFees;
            }

            return {
                month: month,
                isRentChanged: isRentChanged,
                isRentalStartMonth: isRentalStartMonth,
                isWithinRentalPeriod: isWithinRentalPeriod,
                rent: rent,
                charges: charges,
                miscellaneousFees: miscellaneousFees, // Ensure it's always defined
                paymentLines: [{
                    miscellaneousFees: 0,
                    previousBalance: 0,
                    total: total,
                    payment: null,
                    date: '',
                    commentary: '',
                    balance: NaN,
                }],
            };
        });
        recalculateValues(initData);
        setMonthsData(initData);
    }

    /**
     * Get the applicable price for a specific month and year based on price array with dates.
     * 
     * @param {Array} priceArray - Array of price objects with amount and date properties.
     * @param {number} currentMonth - The month for which to get the price (1-12).
     * @param {number} targetYear - The year for which to get the price.
     * @returns {number} The applicable price for the given month and year.
     */
    function getApplicablePrice(priceArray, currentMonth, targetYear) {
        if (!priceArray || priceArray.length === 0) return 0;

        const parsedPrices = priceArray.map(({ amount, date }) => {
            const [month, year] = date.split('/');
            return {
                month: parseInt(month),
                year: parseInt(year),
                price: parseFloat(amount)
            };
        });

        const sortedPrices = parsedPrices.sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
        });

        let applicable = 0;
        for (let i = 0; i < sortedPrices.length; i++) {
            const { month, year, price } = sortedPrices[i];

            if (year < targetYear || (year === targetYear && month <= currentMonth)) {
                applicable = price;
            } else {
                break;
            }
        }

        return applicable;
    }

    /**
     * Add a new payment line to a specific month for handling multiple payments per month.
     * 
     * @param {number} monthIndex - The index of the month (0-11) to add the payment line to.
     */
    const addPaymentLine = (monthIndex) => {
        const updatedData = [...monthsData];
        const currentMonthData = updatedData[monthIndex];
        const lastLine = currentMonthData.paymentLines.slice(-1)[0];

        // Le nouveau paiement doit correspondre au solde restant du paiement précédent
        const newLine = {
            previousBalance: lastLine.balance || 0,
            total: lastLine.balance || 0, // Le total correspond au solde restant
            payment: null,
            miscellaneousFees: 0,
            date: '',
            commentary: '',
            balance: NaN,
            isAdditionalLine: true
        };

        currentMonthData.paymentLines.push(newLine);
        recalculateValues(updatedData);
    };

    /**
     * Delete a payment line from a specific month and line index.
     * 
     * @param {number} monthIndex - The index of the month (0-11) containing the payment line.
     * @param {number} lineIndex - The index of the payment line to delete.
     */
    const deletePaymentLine = (monthIndex, lineIndex) => {
        const updatedData = [...monthsData];
        const currentMonthData = updatedData[monthIndex];

        if (currentMonthData.paymentLines[lineIndex].isAdditionalLine) {
            currentMonthData.paymentLines.splice(lineIndex, 1);
            recalculateValues(updatedData);
        }
    };

    /**
     * Recalculate all values (previous balance, total, balance) for all months and payment lines.
     * 
     * @param {Array} updatedData - Array of monthly data objects to recalculate.
     */
    const recalculateValues = (updatedData) => {
        updatedData.forEach((dataLine, index) => {
            dataLine.paymentLines.forEach((paymentLine, paymentIndex) => {
                // Only calculate for months within rental period
                if (!dataLine.isWithinRentalPeriod) {
                    paymentLine.previousBalance = 0;
                    paymentLine.total = 0;
                    paymentLine.balance = 0;
                    return;
                }

                let previousBalance = 0;
                let hasPreviousPayment = true;

                if (paymentIndex > 0) {
                    // If it's not the first payment line, check the previous payment line in the same month
                    const prevLineInSameMonth = dataLine.paymentLines[paymentIndex - 1];
                    if (prevLineInSameMonth.payment === null || prevLineInSameMonth.payment === '' || prevLineInSameMonth.payment === undefined) {
                        hasPreviousPayment = false;
                    } else {
                        previousBalance = prevLineInSameMonth.balance || 0;
                    }
                } else if (index > 0) {
                    // If it's the first payment line of the month, check previous month
                    const prevMonthBalance = getPreviousBalance(updatedData, index);
                    if (prevMonthBalance === null) {
                        hasPreviousPayment = false;
                    } else {
                        previousBalance = prevMonthBalance;
                    }
                } else if (index === 0) {
                    // If it's the first month and no previous payment exists, set previous balance to 0
                    // TODO: Handle case where first month has a previous balance
                    previousBalance = 0;
                }

                if (!hasPreviousPayment) {
                    paymentLine.previousBalance = null;
                    paymentLine.total = null;
                    paymentLine.balance = null;
                } else {
                    let total;
                    if (paymentIndex === 0) {
                        // First line: total = rent + charges + miscellaneous fees + previous balance
                        total = parseFloat(dataLine.rent) + parseFloat(dataLine.charges) + parseFloat(dataLine.miscellaneousFees || 0) + previousBalance;
                    } else {
                        // Subsequent lines: total = remaining balance from previous line
                        total = previousBalance;
                    }

                    const balance = (paymentLine.payment !== null && paymentLine.payment !== '') ?
                        total - parseFloat(paymentLine.payment) : NaN;

                    paymentLine.previousBalance = previousBalance;
                    paymentLine.total = total;
                    paymentLine.balance = balance;
                }
            });
        });

        setMonthsData([...updatedData]);
    };

    /**
     * Helper function to get the previous balance from the last rental period month.
     * 
     * @param {Array} data - Array of monthly data objects.
     * @param {number} currentIndex - The current month index to search backwards from.
     * @returns {number|null} The previous balance or null if no previous payment found.
     */
    const getPreviousBalance = (data, currentIndex) => {
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (data[i].isWithinRentalPeriod) {
                const lastPaymentLine = data[i].paymentLines.slice(-1)[0];

                // If the last payment line has no payment, return null
                if (lastPaymentLine.payment === null || lastPaymentLine.payment === '' || lastPaymentLine.payment === undefined) {
                    return null;
                }

                return lastPaymentLine.balance || 0;
            }
        }

        return 0;
    };



    /**
     * Handle input changes for form fields in the payment table.
     * 
     * @param {Event} event - The input change event.
     * @param {number} monthIndex - The index of the month (0-11) containing the field.
     * @param {string} field - The name of the field being changed.
     * @param {number} [paymentIndex=0] - The index of the payment line within the month.
     */
    const handleInputChange = (event, monthIndex, field, paymentIndex = 0) => {
        const updatedData = [...monthsData];
        const lineData = updatedData[monthIndex];

        // Don't allow editing for months outside rental period
        if (!lineData.isWithinRentalPeriod) {
            return;
        }

        let value = event.target.value;

        switch (field) {
            case "miscellaneousFees":
                value = value === '' ? 0 : (parseFloat(value) || 0);
                updatedData[monthIndex][field] = value;
                break;
            case "payment":
                value = value === '' ? null : parseFloat(value);
                if (value !== null && value < 0) {
                    alert("Le montant ne peut pas être négatif.");
                    return;
                }
                updatedData[monthIndex].paymentLines[paymentIndex][field] = value;
                break;
            case "commentary":
            case "date":
                updatedData[monthIndex].paymentLines[paymentIndex][field] = value;
                break;
            default:
                return;
        }

        recalculateValues(updatedData);
    };

    /**
     * Handle save button click to save all receipt data.
     */
    const handleSave = () => {
        // TODO: Implement save functionality to Firebase
        // This would save all the monthsData for the current year
        console.log("Saving receipt data:", { rentalId, selectedYear, monthsData });
        
        addNotification({
            message: "Données sauvegardées avec succès", // TODO: Use translate when key exists
            type: NOTIFICATION_TYPES.SUCCESS
        });
    };

    /**
     * Handle cancel/back button click to return to receipts list.
     */
    const handleCancel = () => {
        navigate(PATHS.RECEIPTS);
    };

    return (
        <Box className="receipt-add-update-page basic-page">
            <CustomPageTop breadcrumbLinks={breadcrumbLinks} title={title} />

            <Box className="dark-light-box">
                <TextField
                    className='field'
                    size="small"
                    select
                    value={selectedYear}
                    label="Année"
                    onChange={handleYearChange}
                    disabled={availableYears.length === 0}
                >
                    {availableYears.map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            {loading ? (
                <Box className="dark-light-box loading-container">
                    <Typography>Chargement...</Typography>
                </Box>
            ) : !rentalId ? (
                <Box className="dark-light-box loading-container">
                    <Typography>ID de location manquant dans l'URL</Typography>
                </Box>
            ) : selectedYear === '' ? (
                <Box className="dark-light-box loading-container">
                    <Typography>Aucune année disponible</Typography>
                </Box>
            ) : (
                <Box className="table-container">
                    <Table className="table dark-light-box">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_MONTH" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_RENT" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_CHARGES" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_MISCELLANEOUS_FEES" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_PREVIOUS_BALANCE" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_TOTAL" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_PAYMENT" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_DATE" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_BALANCE" })}
                                </TableCell>
                                <TableCell className="table__column">
                                    {translate({ section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_COMMENTARY" })}
                                </TableCell>
                                <TableCell className="table__column__action">
                                    {translate({ section: "CUSTOM_TABLE", key: "COLUMN_ACTIONS" })}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {monthsData.map((lineData, monthIndex) => (
                                lineData.paymentLines.map((paymentLine, paymentIndex) => {
                                    const isFirstPayment = paymentIndex === 0;
                                    const isWithinPeriod = lineData.isWithinRentalPeriod;

                                    // Déterminer les classes CSS spéciales
                                    const currentDate = new Date();
                                    const currentMonth = currentDate.getMonth() + 1; // getMonth() retourne 0-11
                                    const currentYear = currentDate.getFullYear();
                                    const monthIndex1Based = monthIndex + 1;

                                    const isCurrentMonth = monthIndex1Based === currentMonth && selectedYear === currentYear;
                                    const isRentalStartMonth = lineData.isRentalStartMonth;

                                    let rowClass = `table__row`;

                                    // Priorité : mois actuel > mois de création > état normal
                                    if (isCurrentMonth) {
                                        rowClass += ' table__row_current-month';
                                    } else if (isRentalStartMonth) {
                                        rowClass += ' table__row_rent-change';
                                    }

                                    if (!isWithinPeriod) {
                                        rowClass += ' table__row_outside-period';
                                    }

                                    return (
                                        <TableRow key={`${monthIndex}-${paymentIndex}`}
                                            className={rowClass}>
                                            <TableCell className="table__cell">
                                                {isFirstPayment ? lineData.month : ""}
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                {isFirstPayment && isWithinPeriod ? `${lineData.rent}€` : ""}
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                {isFirstPayment && isWithinPeriod ? `${lineData.charges}€` : ""}
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                {isFirstPayment && isWithinPeriod
                                                    ? <TextField
                                                        className="field"
                                                        type="number"
                                                        value={lineData.miscellaneousFees || 0}
                                                        onChange={(e) => handleInputChange(e, monthIndex, "miscellaneousFees")}
                                                        size="small"
                                                    />
                                                    : ""}
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                <div key={paymentIndex} className="payment-row">
                                                    {isWithinPeriod ?
                                                        (paymentLine.previousBalance === null ? '-' : `${paymentLine.previousBalance.toFixed(2)}€`)
                                                        : ""}
                                                </div>
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                <div key={paymentIndex} className="payment-row">
                                                    {isWithinPeriod ?
                                                        (paymentLine.total === null ? '-' : `${paymentLine.total.toFixed(2)}€`)
                                                        : ""}
                                                </div>
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                <div key={paymentIndex} className="payment-row">
                                                    {isWithinPeriod ? (
                                                        <TextField
                                                            className="field"
                                                            type="number"
                                                            value={paymentLine.payment || ''}
                                                            onChange={(e) => handleInputChange(e, monthIndex, "payment", paymentIndex)}
                                                            size="small"
                                                        />
                                                    ) : ""}
                                                </div>
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                <div key={paymentIndex} className="payment-row">
                                                    {isWithinPeriod ? (
                                                        <TextField
                                                            className="field"
                                                            type="date"
                                                            value={paymentLine.date}
                                                            onChange={(e) => handleInputChange(e, monthIndex, "date", paymentIndex)}
                                                            size="small"
                                                        />
                                                    ) : ""}
                                                </div>
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                <div key={paymentIndex} className="payment-row">
                                                    {isWithinPeriod ? (paymentLine.balance === null || isNaN(paymentLine.balance) ? '-' : `${paymentLine.balance.toFixed(2)}€`) : ""}
                                                </div>
                                            </TableCell>
                                            <TableCell className="table__cell">
                                                <div key={paymentIndex} className="payment-row">
                                                    {isWithinPeriod ? (
                                                        <TextField
                                                            className="field"
                                                            type="text"
                                                            value={paymentLine.commentary}
                                                            onChange={(e) => handleInputChange(e, monthIndex, "commentary", paymentIndex)}
                                                            size="small"
                                                            multiline
                                                            maxRows={2}
                                                        />
                                                    ) : ""}
                                                </div>
                                            </TableCell>
                                            <TableCell className="table__cell__action">
                                                <div key={paymentIndex} className="payment-row">
                                                    {isWithinPeriod ? (
                                                        !paymentLine.isAdditionalLine
                                                            ? <Button className="white-button"
                                                                onClick={() => addPaymentLine(monthIndex)}>+</Button>
                                                            : <Button className="red-button"
                                                                onClick={() => deletePaymentLine(monthIndex, paymentIndex)}>-</Button>
                                                    ) : ""}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ))}

                            {/* Total Row */}
                            {monthsData.length > 0 && (
                                <TableRow className="totals-row">
                                    <TableCell className="table__cell">
                                        TOTAL
                                    </TableCell>
                                    <TableCell className="table__cell">
                                        {monthsData
                                            .filter(month => month.isWithinRentalPeriod)
                                            .reduce((sum, month) => sum + month.rent, 0)
                                            .toFixed(2)}€
                                    </TableCell>
                                    <TableCell className="table__cell">
                                        {monthsData
                                            .filter(month => month.isWithinRentalPeriod)
                                            .reduce((sum, month) => sum + month.charges, 0)
                                            .toFixed(2)}€
                                    </TableCell>
                                    <TableCell className="table__cell">
                                        {monthsData
                                            .filter(month => month.isWithinRentalPeriod)
                                            .reduce((sum, month) => sum + (month.miscellaneousFees || 0), 0)
                                            .toFixed(2)}€
                                    </TableCell>
                                    <TableCell className="table__cell">
                                        -
                                    </TableCell>
                                    <TableCell id="cell-total-due" className="table__cell">
                                        {monthsData
                                            .filter(month => month.isWithinRentalPeriod)
                                            .reduce((sum, month) =>
                                                sum + month.paymentLines.reduce((lineSum, line) =>
                                                    lineSum + (line.total && line.total !== null ? line.total : 0), 0
                                                ), 0
                                            ).toFixed(2)}€
                                    </TableCell>
                                    <TableCell id="cell-total-paid" className="table__cell">
                                        {monthsData
                                            .filter(month => month.isWithinRentalPeriod)
                                            .reduce((sum, month) =>
                                                sum + month.paymentLines.reduce((lineSum, line) =>
                                                    lineSum + (line.payment && line.payment !== null ? line.payment : 0), 0
                                                ), 0
                                            ).toFixed(2)}€
                                    </TableCell>
                                    <TableCell className="table__cell">
                                        -
                                    </TableCell>
                                    <TableCell id="cell-remaining-due" className="table__cell">
                                        {(monthsData
                                            .filter(month => month.isWithinRentalPeriod)
                                            .reduce((sum, month) =>
                                                sum + month.paymentLines.reduce((lineSum, line) =>
                                                    lineSum + (line.total && line.total !== null ? line.total : 0), 0
                                                ), 0
                                            ) - monthsData
                                                .filter(month => month.isWithinRentalPeriod)
                                                .reduce((sum, month) =>
                                                    sum + month.paymentLines.reduce((lineSum, line) =>
                                                        lineSum + (line.payment && line.payment !== null ? line.payment : 0), 0
                                                    ), 0
                                                )).toFixed(2)}€
                                    </TableCell>
                                    <TableCell className="table__cell">
                                        -
                                    </TableCell>
                                    <TableCell className="table__cell">
                                        -
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            )}

            {/* Action Buttons */}
            <Box className="form__button-container">
                <Button className="white-button" onClick={handleCancel}>
                    <KeyboardReturnIcon/>
                </Button>
                <Button 
                    className="green-button" 
                    onClick={handleSave}
                    disabled={loading || selectedYear === '' || !rentalId}
                >
                    <EditIcon/>
                </Button>
            </Box>
        </Box>
    );
}

export default ReceiptPage;

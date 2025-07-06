import {useEffect, useState} from 'react';
import {getRentalById} from "../../services/api/firebase/rentals";
import {useLanguage} from "../../contexts/LanguageProvider";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

/**
 * Component for the receipt page.
 *
 * @returns {JSX.Element} The ReceiptPage component.
 */
function ReceiptPage() {
    const {translate} = useLanguage();
    const [monthsData, setMonthsData] = useState([]);

    // TODO: Get rental ID from Page URL
    const rentalId = "-O4T6ZrjjA8aSOA5gWXt";

    useEffect(() => {
        async function fetchRental() {
            try {
                initializeData(await getRentalById(rentalId));
            } catch (error) {
                console.error("Error fetching rental:", error);
            }
        }

        fetchRental();
        // eslint-disable-next-line
    }, []);

    function initializeData(rental) {
        const months = [
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_JANUARY"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_FEBRUARY"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_MARCH"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_APRIL"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_MAY"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_JUNE"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_JULY"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_AUGUST"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_SEPTEMBER"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_OCTOBER"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_NOVEMBER"}),
            translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "MONTH_DECEMBER"})
        ];

        const startDate = new Date(rental.startDate);
        const startMonth = startDate.getMonth();
        const startYear = startDate.getFullYear();

        const initData = months.map((month, index) => {
            const isRentChanged = index === startMonth;
            const isAfterRentPeriod = (index > startMonth - 1 && new Date().getFullYear() === startYear) || (new Date().getFullYear() > startYear);
            const rent = isAfterRentPeriod ? 0 : parseFloat(rental.rentPrice) || 0;
            const charges = isAfterRentPeriod ? 0 : parseFloat(rental.chargesPrice) || 0;
            const miscellaneousFees = isAfterRentPeriod ? 0 : parseFloat(rental.miscellaneousFees) || 0;
            const total = parseFloat(rent + charges + miscellaneousFees);

            return {
                month: month,
                isRentChanged: isRentChanged,
                isAfterRentPeriod: isAfterRentPeriod,
                rent: rent,
                charges: charges,
                miscellaneousFees: miscellaneousFees,
                paymentLines: [{
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

        return initData;
    }

    const addPaymentLine = (monthIndex) => {
        const updatedData = [...monthsData];
        const currentMonthData = updatedData[monthIndex];

        const newLine = {
            previousBalance: currentMonthData.paymentLines.slice(-1)[0].balance,
            total: currentMonthData.paymentLines.slice(-1)[0].balance,
            payment: null,
            date: '',
            commentary: '',
            balance: NaN,
            isAdditionalLine: true
        };

        currentMonthData.paymentLines.push(newLine);
        recalculateValues(updatedData);
    };

    const deletePaymentLine = (monthIndex, lineIndex) => {
        const updatedData = [...monthsData];
        const currentMonthData = updatedData[monthIndex];

        // Vérifie si la ligne sélectionnée est bien marquée comme une ligne supplémentaire
        if (currentMonthData.paymentLines[lineIndex].isAdditionalLine) {
            // Supprime la ligne sélectionnée
            currentMonthData.paymentLines.splice(lineIndex, 1);
            recalculateValues(updatedData);
        }
    };


    const recalculateValues = (updatedData) => {
        updatedData.forEach((dataLine, index) => {
            dataLine.paymentLines.forEach((paymentLine, paymentIndex) => {
                const previousBalance = paymentIndex > 0
                    ? dataLine.paymentLines[paymentIndex - 1].balance
                    : (index > 0 ? updatedData[index - 1].paymentLines.slice(-1)[0].balance : 0);
                const total = parseFloat(dataLine.rent) + parseFloat(dataLine.charges) + parseFloat(dataLine.miscellaneousFees) + previousBalance;
                const balance = paymentLine.payment ? total - (paymentLine.payment || 0) : NaN;

                paymentLine.previousBalance = previousBalance;
                paymentLine.total = total;
                paymentLine.balance = balance;
            });
        });

        setMonthsData([...updatedData]);
    };

    const handleInputChange = (event, monthIndex, field, paymentIndex = 0) => {
        const updatedData = [...monthsData];
        const value = field === "payment" ? parseFloat(event.target.value) || 0 : event.target.value;

        switch (field) {
            case "miscellaneousFees":
                updatedData[monthIndex][field] = value;
                break;
            case "payment":
                if (value < 0) {
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
                alert("Le montant ne peut pas être négatif.");
                return;
        }

        recalculateValues(updatedData);
    };

    return (
        <Table className="table dark-light-box">
            <TableHead>
                <TableRow>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_MONTH"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_RENT"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_CHARGES"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_MISCELLANEOUS_FEES"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_PREVIOUS_BALANCE"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_TOTAL"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_PAYMENT"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_DATE"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_BALANCE"})}
                    </TableCell>
                    <TableCell className="table__column">
                        {translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_COMMENTARY"})}
                    </TableCell>
                    <TableCell className="table__column__action">
                        {translate({section: "CUSTOM_TABLE", key: "COLUMN_ACTIONS"})}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {monthsData.map((lineData, monthIndex) => (
                    lineData.paymentLines.map((paymentLine, paymentIndex) => {
                        const isFirstPayment = paymentIndex === 0;

                        return (
                            <TableRow key={monthIndex}
                                      className={`table__row ${lineData.isRentChanged ? 'table__row_rent-change' : ''}`}>
                                <TableCell className="table__cell">
                                    {isFirstPayment ? lineData.month : ""}
                                </TableCell>
                                <TableCell className="table__cell">
                                    {isFirstPayment ? (lineData.isAfterRentPeriod ? "0" : lineData.rent.toFixed(2)) : ""}
                                </TableCell>
                                <TableCell className="table__cell">
                                    {isFirstPayment ? (lineData.isAfterRentPeriod ? "0" : lineData.charges.toFixed(2)) : ""}
                                </TableCell>
                                <TableCell className="table__cell">
                                    {isFirstPayment
                                        ? <input type="number" value={lineData.miscellaneousFees}
                                                 onChange={(e) => handleInputChange(e, monthIndex, "miscellaneousFees")}/>
                                        : ""}
                                </TableCell>
                                <TableCell className="table__cell">
                                    <div key={paymentIndex} className="payment-row">
                                        {paymentLine.previousBalance.toFixed(2)}
                                    </div>
                                </TableCell>
                                <TableCell className="table__cell">
                                    <div key={paymentIndex} className="payment-row">
                                        {paymentLine.total.toFixed(2)}
                                    </div>
                                </TableCell>
                                <TableCell className="table__cell">
                                    <div key={paymentIndex} className="payment-row">
                                        <input type="number" value={paymentLine.payment || ''}
                                               onChange={(e) => handleInputChange(e, monthIndex, "payment", paymentIndex)}/>
                                    </div>
                                </TableCell>
                                <TableCell className="table__cell">
                                    <div key={paymentIndex} className="payment-row">
                                        <input type="date" value={paymentLine.date}
                                               onChange={(e) => handleInputChange(e, monthIndex, "date", paymentIndex)}/>
                                    </div>
                                </TableCell>
                                <TableCell className="table__cell">
                                    <div key={paymentIndex} className="payment-row">
                                        {paymentLine.balance.toFixed(2)}
                                    </div>
                                </TableCell>
                                <TableCell className="table__cell">
                                    <div key={paymentIndex} className="payment-row">
                                        <input type="text" value={paymentLine.commentary}
                                               onChange={(e) => handleInputChange(e, monthIndex, "commentary", paymentIndex)}/>
                                    </div>
                                </TableCell>
                                <TableCell className="table__cell__action">
                                    <div key={paymentIndex} className="payment-row">
                                        {!paymentLine.isAdditionalLine
                                            ? <Button className="white-button"
                                                      onClick={() => addPaymentLine(monthIndex)}>+</Button>
                                            : <Button className="red-button"
                                                      onClick={() => deletePaymentLine(monthIndex, paymentIndex)}>-</Button>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })
                ))}
            </TableBody>
        </Table>
    );
}

export default ReceiptPage;

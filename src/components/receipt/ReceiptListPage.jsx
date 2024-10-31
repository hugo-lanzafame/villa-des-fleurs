import React, {useEffect, useState} from 'react';
import {getRentalById} from "../../services/api/firebase/rentals";
import {useLanguage} from "../../contexts/LanguageProvider";

/**
 * Component for the receipt page.
 *
 * @returns {JSX.Element} The ReceiptPage component.
 */
function ReceiptPage() {
    const {translate} = useLanguage();
    const [data, setData] = useState([]);

    // TODO: Get rental ID from Page URL
    const rentalId = "-O4T6ZrjjA8aSOA5gWXt";

    useEffect(() => {
        async function fetchRental() {
            const rental  = await getRentalById(rentalId);
            setData(initializeData(rental));
        }

        fetchRental();
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

        // Initiate the data array foreach month (lines in the table
        return months.map((month, index) => {
            const isRentChanged = index === startMonth;
            const isAfterRentPeriod = index > startMonth - 1 ||startYear === new Date().getFullYear();
            const rent = isAfterRentPeriod ? 0 : parseFloat(rental.rentPrice) || 0;
            const charges = isAfterRentPeriod ? 0 : parseFloat(rental.chargesPrice) || 0;
            const miscellaneousFees = isAfterRentPeriod ? 0 : parseFloat(rental.miscellaneousFees) || 0;
            const total = rent + charges + miscellaneousFees;

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
                    balance: total,
                }],
            };
        });
    }

    const addNewPaymentLine = (monthIndex) => {
        setData(prevData => {
            const updatedData = [...prevData];
            const currentMonth = updatedData[monthIndex];

            // Créer une nouvelle ligne de paiement
            const newLine = {
                previousBalance: (parseFloat(currentMonth.rent) || 0) + (parseFloat(currentMonth.charges) || 0),
                total: currentMonth.balance, // Total initialisé au solde antérieur
                payment: null,
                date: '',
                commentary: '',
                balance: (parseFloat(currentMonth.rent) || 0) + (parseFloat(currentMonth.charges) || 0),
            };

            // Ajouter la nouvelle ligne au tableau des paiements
            currentMonth.paymentLines.push(newLine);
            // recalculateValues(updatedData); // Recalculer les valeurs
            return updatedData;
        });
    };


    const recalculateValues = (updatedData) => {
        // updatedData.forEach((dataLine, index) => {
        //     dataLine.paymentLines.forEach((paymentLine) => {
        //         let runningSolde = dataLine.total;
        //         paymentLine.previousBalance = index > 0 ? updatedData[index - 1].paymentLines.slice(-1)[0].balance : 0;
        //         paymentLine.total = parseFloat(dataLine.rent) + parseFloat(dataLine.charges) + parseFloat(dataLine.miscellaneousFees) + parseFloat(paymentLine.previousBalance);
        //         runningSolde -= paymentLine.payment ?? 0;
        //         paymentLine.solde = runningSolde;
        //     });
        // });
        //
        // setData(updatedData);
    };

    const handleInputChange = (event, monthIndex, field, paymentIndex = 0) => {
        const updatedData = [...data];
        const value = field === "montant" ? parseFloat(event.target.value) || 0 : event.target.value;

        if (field === "montant") {
            // Validation : Vérifie que le montant est positif
            if (value < 0) {
                alert("Le montant ne peut pas être négatif.");
                return;
            }
            updatedData[monthIndex].paymentLines[paymentIndex][field] = value;
        } else if (field === "date") {
            updatedData[monthIndex].paymentLines[paymentIndex][field] = value; // Ajoute une validation de format si nécessaire
        } else {
            updatedData[monthIndex][field] = value;
        }

        recalculateValues(updatedData);
    };

    return (
        <table className="receipt-table">
            <thead>
            <tr>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_MONTH"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_RENT"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_CHARGES"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_MISCELLANEOUS_FEES"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_PREVIOUS_BALANCE"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_TOTAL"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_PAYMENT"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_DATE"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_BALANCE"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_COMMENTARY"})}</th>
                <th>{translate({section: "RECEIPT_ADD_UPDATE_PAGE", key: "COLUMN_ACTION"})}</th>
            </tr>
            </thead>
            <tbody>
            {data.map((lineData, monthIndex) => (
                <React.Fragment key={monthIndex}>
                    <tr style={{backgroundColor: lineData.isRentChanged ? 'red' : ''}}>
                        <td>{lineData.month}</td>
                        <td>{lineData.isAfterRentPeriod ? "" : lineData.rent.toFixed(2)}</td>
                        <td>{lineData.isAfterRentPeriod ? "" : lineData.charges.toFixed(2)}</td>
                        <td>
                            <input
                                type="number"
                                value={lineData.miscellaneousFees}
                                onChange={(e) => handleInputChange(e, monthIndex, "divers")}
                                disabled={lineData.isAfterRentPeriod}
                            />
                        </td>
                        <td>
                            {lineData.paymentLines.map((paymentLine, paymentIndex) => (
                                <div key={paymentIndex} className="payment-row">
                                    {paymentLine.previousBalance.toFixed(2)}
                                </div>
                            ))}
                        </td>
                        <td>
                            {lineData.paymentLines.map((paymentLine, paymentIndex) => (
                                <div key={paymentIndex} className="payment-row">
                                    {paymentLine.total.toFixed(2)}
                                </div>
                            ))}
                        </td>
                        <td>
                            {lineData.paymentLines.map((paymentLine, paymentIndex) => (
                                <div key={paymentIndex} className="payment-row">
                                    <input
                                        type="number"
                                        value={paymentLine.payment || ''}
                                        onChange={(e) => handleInputChange(e, monthIndex, "montant", paymentIndex)}
                                        disabled={lineData.isAfterRentPeriod}
                                    />
                                </div>
                            ))}
                        </td>
                        <td>
                            {lineData.paymentLines.map((paymentLine, paymentIndex) => (
                                <div key={paymentIndex} className="payment-row">
                                    <input
                                        type="date"
                                        value={paymentLine.date}
                                        onChange={(e) => handleInputChange(e, monthIndex, "date", paymentIndex)}
                                        disabled={lineData.isAfterRentPeriod}
                                    />
                                </div>
                            ))}
                        </td>
                        <td>
                            {lineData.paymentLines.map((paymentLine, paymentIndex) => (
                                <div key={paymentIndex} className="payment-row">
                                    {paymentLine.balance.toFixed(2)}
                                </div>
                            ))}
                        </td>
                        <td>
                            {lineData.paymentLines.map((paymentLine, paymentIndex) => (
                                <div key={paymentIndex} className="payment-row">
                                    <input
                                        type="text"
                                        value={paymentLine.commentary}
                                        onChange={(e) => handleInputChange(e, monthIndex, "commentaire", paymentIndex)}
                                        disabled={lineData.isAfterRentPeriod}
                                    />
                                </div>
                            ))}
                        </td>
                        <td>
                            {!lineData.isAfterRentPeriod && (
                                <button onClick={() => addNewPaymentLine(monthIndex)}>+</button>
                            )}
                        </td>
                    </tr>
                </React.Fragment>
            ))}
            </tbody>
        </table>
    );
}

export default ReceiptPage;

import React, {useEffect, useState} from 'react';
import {Box, Button, MenuItem, TextField, Typography} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageProvider";
import {useNotification} from "../../contexts/NotificationProvider";
import {addRental, updateRental} from "../../services/api/firebase/rentals";
import {getAllTenants, getTenantById} from "../../services/api/firebase/tenants";
import {getAllProperties, getPropertyById} from "../../services/api/firebase/properties";
import {NOTIFICATION_TYPES} from "../../constants/notification";
import {PATHS} from "../../constants/routing";

/**
 * Component for the Rental Add/Update form.
 *
 * @param {Rental} rental - Rental data.
 * @returns {JSX.Element} The RentalAddUpdateForm component.
 */
function RentalAddUpdateForm({rental}) {
    const navigate = useNavigate();
    const {addNotification} = useNotification();
    const {translate} = useLanguage();

    const [allProperties, setAllProperties] = useState([]);
    const [allTenants, setAllTenants] = useState([]);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [propertyIdError, setPropertyIdError] = useState('');
    const [tenantIds, setTenantIds] = useState([]);
    const [tenantIdsError, setTenantIdsError] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [rentPrices, setRentPrices] = useState([]);
    const [rentPricesDateErrors, setRentPricesDateErrors] = useState([]);
    const [rentPricesAmountErrors, setRentPricesAmountErrors] = useState([]);
    const [chargesPrices, setChargesPrices] = useState([]);
    const [chargesPricesDateErrors, setChargesPricesDateErrors] = useState([]);
    const [chargesPricesAmountErrors, setChargesPricesAmountErrors] = useState([]);

    /**
     * Handles the change event for input fields.
     *
     * @param {string} key - The key of the input field.
     * @param {string} value - The new value of the input field.
     * @param {?string} [index] - The index of the input for array object only.
     */
    const handleChange = (key, value, index = 0) => {
        let updatedRentPrices = [...rentPrices];
        let updatedChargesPrices = [...chargesPrices];

        switch (key) {
            case 'name':
                setName(value);
                setNameError('')
                break;
            case 'property':
                setPropertyId(value);
                setPropertyIdError('');
                break;
            case 'tenants':
                setTenantIds(value);
                setTenantIdsError('');
                break;
            case 'startDate':
                setStartDate(value);
                setStartDateError('');
                break;
            case 'endDate':
                setEndDate(value);
                setEndDateError('');
                break;
            case 'rentPricesAmount':
                updatedRentPrices[index] = {...updatedRentPrices[index], 'amount': value};
                setRentPrices(updatedRentPrices);
                setRentPricesAmountErrors([]);
                break;
            case 'rentPricesDate':
                updatedRentPrices[index] = {...updatedRentPrices[index], 'date': value};
                setRentPrices(updatedRentPrices);
                setRentPricesDateErrors([]);
                break;
            case 'chargesPricesAmount':
                updatedChargesPrices[index] = {...updatedChargesPrices[index], 'amount': value};
                setChargesPrices(updatedChargesPrices);
                setChargesPricesAmountErrors([]);
                break;
            case 'chargesPricesDate':
                updatedChargesPrices[index] = {...updatedChargesPrices[index], 'date': value};
                setChargesPrices(updatedChargesPrices);
                setChargesPricesDateErrors([]);
                break;
            default:
                break;
        }
    };

    /**
     * Checks if a string is a valid date using simple regex for dd/mm/yyyy.
     *
     * @param date - Date to verify
     * @returns {boolean} Returns true if the string is a valide date, otherwise false.
     */
    const isDateFormatValid = (date) => {
        return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    };

    /**
     * Checks if a string is a valid date using simple regex for dd/mm/yyyy.
     *
     * @param date - Date to verify
     * @returns {boolean} Returns true if the string is a valide date, otherwise false.
     */
    const isDateMonthFormatValid = (date) => {
        return /^(0[1-9]|1[0-2])\/\d{4}$/.test(date);
    };


    /**
     * Converts a string with commas to a number and checks if it is a valid number.
     *
     * @param {string} number - The string to check.
     * @returns {boolean} - Returns true if the string is a valid number, otherwise false.
     */
    const isNumberFormatValid = (number) => {
        const normalizedValue = number.replace(',', '.');
        const numberValue = Number(normalizedValue);

        return Number.isFinite(numberValue);
    };

    /**
     * Handles the form submission.
     */
    const handleSubmit = async () => {
        const formatToMonthYear = (dateStr) => {
            const [day, month, year] = dateStr.split('/');
            return `${month}/${year}`;
        };

        rental = rental ?? {};
        rental.name = name;
        rental.propertyId = propertyId;
        rental.tenantIds = tenantIds;
        rental.startDate = startDate;
        rental.endDate = endDate;
        rentPrices[0] = {...(rentPrices[0] || {}), date: formatToMonthYear(startDate)};
        rental.rentPrices = rentPrices;
        chargesPrices[0] = {...(chargesPrices[0] || {}) , date: formatToMonthYear(startDate)};
        rental.chargesPrices = chargesPrices;

        const isError = handleFormErrors();

        if (!isError) {
            if (!rental.id) {
                // Autogenerate rental name
                const property = await getPropertyById(rental.propertyId);
                const propertyName = property.name;
                const tenantNames = (await Promise.all(
                    rental.tenantIds.map(async tenantId => {
                        const tenant = await getTenantById(tenantId);
                        return tenant.name;
                    })
                )).join(", ");
                rental.name = `${propertyName} - ${tenantNames}`;

                rental.id = await addRental(rental);
                addNotification(NOTIFICATION_TYPES.SUCCESS, translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "NOTIFICATION_CREATE"
                }) + (rental.name !== "" ? " (" + rental.name + ")" : ""))
            } else {
                console.log(rental)
                await updateRental(rental);
                addNotification(NOTIFICATION_TYPES.SUCCESS, translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "NOTIFICATION_EDIT"
                }) + (rental.name !== "" ? " (" + rental.name + ")" : ""))
            }

            navigate(PATHS.RENTALS_EDITION + "?id=" + rental.id);
        } else {
            addNotification(NOTIFICATION_TYPES.ERROR, translate({
                section: "RENTAL_ADD_UPDATE_PAGE",
                key: "NOTIFICATION_ERROR"
            }) + (rental.name !== "" ? " (" + rental.name + ")" : ""))
        }
    };


    /**
     * Handles form errors.
     *
     * @returns {boolean} True if there are errors, false otherwise.
     */
    const handleFormErrors = () => {
        setNameError('');
        setPropertyIdError('');
        setTenantIdsError('');
        setStartDateError('');
        setEndDateError('');
        setRentPricesDateErrors([]);
        setRentPricesAmountErrors([]);
        setChargesPricesDateErrors([]);
        setChargesPricesAmountErrors([]);

        let isError = false;

        if (rental.id && name === "") {
            setNameError(translate({
                section: "RENTAL_ADD_UPDATE_PAGE",
                key: "ERROR_REQUIRED_FIELD"
            }));
            isError = true;
        }

        if (propertyId === "") {
            setPropertyIdError(translate({
                section: "RENTAL_ADD_UPDATE_PAGE",
                key: "ERROR_REQUIRED_FIELD"
            }));
            isError = true;
        }

        if (tenantIds.length === 0) {
            setTenantIdsError(translate({
                section: "RENTAL_ADD_UPDATE_PAGE",
                key: "ERROR_REQUIRED_FIELD"
            }));
            isError = true;
        }

        if (startDate === '') {
            setStartDateError(translate({
                section: "RENTAL_ADD_UPDATE_PAGE",
                key: "ERROR_REQUIRED_FIELD"
            }));
            isError = true;
        } else if (!isDateFormatValid(startDate)) {
            setStartDateError(translate({
                section: "RENTAL_ADD_UPDATE_PAGE",
                key: "ERROR_DATE_FORMAT"
            }));
            isError = true;
        }

        if (endDate !== '' && !isDateFormatValid(endDate)) {
            setEndDateError(translate({
                section: "RENTAL_ADD_UPDATE_PAGE",
                key: "ERROR_DATE_FORMAT"
            }));
            isError = true;
        }

        let rentPricesAmountErrors = [];
        let rentPricesDateErrors = [];
        let previousRentDate = null;

        rentPrices.forEach((rentPrice, index) => {
            if (index === 0) {
                return;
            }

            let currentDate = new Date(rentPrice.date.split('/').reverse().join('-'));

            if (rentPrice.date === '') {
                rentPricesDateErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_REQUIRED_FIELD"
                });
                isError = true;
            } else if (!isDateMonthFormatValid(rentPrice.date)) {
                rentPricesDateErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_DATE_FORMAT"
                });
                isError = true;
            } else if (previousRentDate && currentDate <= previousRentDate) {
                rentPricesDateErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_DATE_ORDER"
                });
                isError = true;
            }

            previousRentDate = currentDate;

            if (rentPrice.amount === '') {
                rentPricesAmountErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_REQUIRED_FIELD"
                });
                isError = true;
            } else if (!isNumberFormatValid(rentPrice.amount)) {
                rentPricesAmountErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_NUMBER_FORMAT"
                });
                isError = true;
            }
        });

        setRentPricesAmountErrors(rentPricesAmountErrors);
        setRentPricesDateErrors(rentPricesDateErrors);

        let chargesPricesAmountErrors = [];
        let chargesPricesDateErrors = [];
        let previousChargesDate = null;

        chargesPrices.forEach((chargesPrice, index) => {
            if (index === 0) {
                return;
            }

            let currentDate = new Date(chargesPrice.date.split('/').reverse().join('-'));

            if (chargesPrice.date === '') {
                chargesPricesDateErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_REQUIRED_FIELD"
                });
                isError = true;
            } else if (!isDateMonthFormatValid(chargesPrice.date)) {
                chargesPricesDateErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_DATE_FORMAT"
                });
                isError = true;
            } else if (previousChargesDate && currentDate <= previousChargesDate) {
                chargesPricesDateErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_DATE_ORDER"
                });
                isError = true;
            }

            previousChargesDate = currentDate;

            if (chargesPrice.amount === '') {
                chargesPricesAmountErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_REQUIRED_FIELD"
                });
                isError = true;
            } else if (!isNumberFormatValid(chargesPrice.amount)) {
                chargesPricesAmountErrors[index] = translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "ERROR_NUMBER_FORMAT"
                });
                isError = true;
            }
        });

        setChargesPricesAmountErrors(chargesPricesAmountErrors);
        setChargesPricesDateErrors(chargesPricesDateErrors);

        return isError;
    };

    /**
     * Handles the cancel action.
     */
    const handleCancel = () => {
        navigate(PATHS.RENTALS);
    };

    useEffect(() => {
        const fetchData = async () => {
            const currentRental = rental ?? {};
            setName(currentRental.name ?? '');
            setStartDate(currentRental.startDate ?? '');
            setEndDate(currentRental.endDate ?? '');
            setPropertyId(currentRental.propertyId ?? '');
            setTenantIds(currentRental.tenantIds ?? []);
            setAllProperties(await getAllProperties());
            setAllTenants(await getAllTenants());

            // Ensures that there is always a first line
            let rents = currentRental.rentPrices ?? [];
            if (rents.length === 0) {
                rents = [{ date: '', amount: '' }];
            }
            setRentPrices(rents);

            let charges = currentRental.chargesPrices ?? [];
            if (charges.length === 0) {
                charges = [{ date: '', amount: '' }];
            }
            setChargesPrices(charges);

            // Init errors at the same time
            setRentPricesDateErrors(rents.map(() => ''));
            setRentPricesAmountErrors(rents.map(() => ''));
            setChargesPricesDateErrors(charges.map(() => ''));
            setChargesPricesAmountErrors(charges.map(() => ''));
        }

        fetchData();
        // eslint-disable-next-line
    }, [rental]);

    /**
     * Add a line for rent or charges
     *
     * @param key
     */
    const addNewPrice = (key) => {
        const newPrice = {date: '', amount: ''};

        switch (key) {
            case 'rentPrices':
                setRentPrices(prev => [...prev, newPrice]);
                setRentPricesDateErrors(prev => [...prev, '']);
                setRentPricesAmountErrors(prev => [...prev, '']);
                break;
            case 'chargesPrices':
                setChargesPrices(prev => [...prev, newPrice]);
                setChargesPricesDateErrors(prev => [...prev, '']);
                setChargesPricesAmountErrors(prev => [...prev, '']);
                break;
            default:
                break;
        }
    };

    /**
     * Remove a line for rent or charges
     *
     * @param index
     * @param key
     */
    const removePrice = (index, key) => {
        switch (key) {
            case 'rentPrices':
                setRentPrices(prev => prev.filter((_, i) => i !== index));
                setRentPricesDateErrors(prev => prev.filter((_, i) => i !== index));
                setRentPricesAmountErrors(prev => prev.filter((_, i) => i !== index));
                break;
            case 'chargesPrices':
                setChargesPrices(prev => prev.filter((_, i) => i !== index));
                setChargesPricesDateErrors(prev => prev.filter((_, i) => i !== index));
                setChargesPricesAmountErrors(prev => prev.filter((_, i) => i !== index));
                break;
            default:
                break;
        }
    };

    return (
        <Box className="rental-add-update-form form">
            <Box className="dark-light-box">
                <Typography>
                    {translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "GENERAL_INFORMATION_SECTION"})}
                </Typography>
                <Box className="form__field-container">
                    <Box className="form__field-container-line">
                        <TextField
                            className="field"
                            select
                            label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "PROPERTY_LABEL"})}
                            size="small"
                            value={propertyId}
                            helperText={propertyIdError}
                            error={propertyIdError !== ''}
                            onChange={(e) => handleChange('property', e.target.value)}>
                            <MenuItem value=''>none</MenuItem>
                            {allProperties.length !== 0 &&
                                allProperties.map((property) => (
                                    <MenuItem key={property.id} value={property.id}>
                                        {property.name}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        <TextField
                            className="field"
                            select
                            SelectProps={{
                                multiple: true,
                                renderValue: (selected) =>
                                    selected
                                        .map(id => allTenants.find(tenant => tenant.id === id)?.name || '')
                                        .filter(name => name)
                                        .join(', ')
                            }}
                            label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "TENANTS_LABEL"})}
                            size="small"
                            value={tenantIds}
                            helperText={tenantIdsError}
                            error={tenantIdsError !== ''}
                            onChange={(e) => handleChange('tenants', e.target.value)}>
                            {allTenants.length !== 0 ?
                                allTenants.map((tenant) => (
                                    <MenuItem key={tenant.id} value={tenant.id}>
                                        {tenant.name}
                                    </MenuItem>
                                )) : <MenuItem value=''>none</MenuItem>
                            }
                        </TextField>
                    </Box>
                    {rental && rental.id ?
                        <Box className="form__field-container-line">
                            <TextField
                                className="field"
                                label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "NAME_LABEL"})}
                                size="small"
                                value={name}
                                helperText={nameError}
                                error={nameError !== ''}
                                onChange={(e) => handleChange('name', e.target.value)}/>
                        </Box> : ''
                    }
                </Box>
                <Box className="form__field-container">
                    <Typography>
                        {translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "PERIOD_SECTION"})}
                    </Typography>
                    <Box className="form__field-container-line">
                        <TextField
                            className="field"
                            label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "START_DATE_LABEL"})}
                            size="small"
                            value={startDate}
                            helperText={startDateError}
                            error={startDateError !== ''}
                            type="text"
                            placeholder="dd/mm/yyyy"
                            onChange={(e) => handleChange('startDate', e.target.value)}/>
                        <TextField
                            className="field"
                            label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "END_DATE_LABEL"})}
                            size="small"
                            value={endDate}
                            helperText={endDateError}
                            error={endDateError !== ''}
                            type="text"
                            placeholder="dd/mm/yyyy"
                            onChange={(e) => handleChange('endDate', e.target.value)}/>
                    </Box>
                </Box>
                <Box className="form__field-container">
                    <Typography>
                        {translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "RENT_PRICES_SECTION"})}
                    </Typography>

                    {rentPrices.map((rentPrice, index) => (
                        <Box key={index} className="form__field-container-line">
                            {index > 0 ? (
                                <TextField
                                    className="field"
                                    label={translate({
                                        section: "RENTAL_ADD_UPDATE_PAGE",
                                        key: "RENT_PRICES_DATE_LABEL"
                                    })}
                                    size="small"
                                    value={rentPrice.date || ''}
                                    helperText={rentPricesDateErrors[index] || ''}
                                    error={Boolean(rentPricesDateErrors[index])}
                                    type="text"
                                    placeholder="mm/yyyy"
                                    onChange={(e) => handleChange('rentPricesDate', e.target.value, index)}
                                />
                            ) : (
                                <Box className="field-false">
                                    <Typography>
                                        {translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "RENT_PRICES_FIRST_DATE"})}
                                    </Typography>
                                </Box>
                            )}

                            <TextField
                                className="field"
                                label={translate({
                                    section: "RENTAL_ADD_UPDATE_PAGE",
                                    key: "RENT_PRICES_AMOUNT_LABEL"
                                })}
                                size="small"
                                value={rentPrice.amount || ''}
                                helperText={rentPricesAmountErrors[index] || ''}
                                error={Boolean(rentPricesAmountErrors[index])}
                                type="text"
                                onChange={(e) => handleChange('rentPricesAmount', e.target.value, index)}
                            />

                            {index === 0 ? (
                                <Button className="white-button"
                                        onClick={() => addNewPrice('rentPrices')}>+</Button>
                            ) : (
                                <Button className="red-button"
                                        onClick={() => removePrice(index, 'rentPrices')}>-</Button>
                            )}
                        </Box>
                    ))}

                    <Typography>
                        {translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "CHARGES_PRICES_SECTION"})}
                    </Typography>

                    {chargesPrices.map((chargesPrice, index) => (
                        <Box key={index} className="form__field-container-line">
                            {index > 0 ? (
                                <TextField
                                    className="field"
                                    label={translate({
                                        section: "RENTAL_ADD_UPDATE_PAGE",
                                        key: "RENT_PRICES_DATE_LABEL"
                                    })}
                                    size="small"
                                    value={chargesPrice.date || ''}
                                    helperText={chargesPricesDateErrors[index] || ''}
                                    error={Boolean(chargesPricesDateErrors[index])}
                                    type="text"
                                    placeholder="mm/yyyy"
                                    onChange={(e) => handleChange('chargesPricesDate', e.target.value, index)}/>
                            ) : (
                                <Box className="field-false">
                                    <Typography>
                                        {translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "CHARGES_PRICES_FIRST_DATE"})}
                                    </Typography>
                                </Box>
                            )}

                            <TextField
                                className="field"
                                label={translate({
                                    section: "RENTAL_ADD_UPDATE_PAGE",
                                    key: "CHARGES_PRICES_AMOUNT_LABEL"
                                })}
                                size="small"
                                value={chargesPrice.amount}
                                helperText={chargesPricesAmountErrors[index] || ''}
                                error={Boolean(chargesPricesAmountErrors[index])}
                                type="text"
                                onChange={(e) => handleChange('chargesPricesAmount', e.target.value, index)}/>

                            {index === 0 ? (
                                <Button className="white-button"
                                        onClick={() => addNewPrice('chargesPrices')}>+</Button>
                            ) : (
                                <Button className="red-button"
                                        onClick={() => removePrice(index, 'chargesPrices')}>-</Button>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box className="form__button-container">
                <Button className="white-button" onClick={handleCancel}>
                    <KeyboardReturnIcon/>
                </Button>
                <Button className="green-button" onClick={handleSubmit}>
                    {rental && rental.id ? <EditIcon/> : <AddIcon/>}
                </Button>
            </Box>
        </Box>
    );
}

RentalAddUpdateForm.propTypes = {
    rental: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string,
        rentPrices: PropTypes.arrayOf(PropTypes.string).isRequired,
        chargesPrices: PropTypes.arrayOf(PropTypes.string).isRequired,
        propertyId: PropTypes.string.isRequired,
        tenantIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
};

export default RentalAddUpdateForm;
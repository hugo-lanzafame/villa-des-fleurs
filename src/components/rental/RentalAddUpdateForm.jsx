import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageProvider";
import {useNotification} from "../../contexts/NotificationProvider";
import {addRental, updateRental} from "../../services/api/firebase/rentals";
import {getAllTenants} from "../../services/api/firebase/tenants";
import {getAllProperties} from "../../services/api/firebase/properties";
import {NOTIFICATION_TYPES} from "../../constants/notification";
import {PATHS} from "../../constants/routing";
import MenuItem from "@mui/material/MenuItem";

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

    const [name, setName] = useState(rental.name || '');
    const [nameError, setNameError] = useState('');
    const [propertyId, setPropertyId] = useState(rental.property || '');
    const [propertyIdError, setPropertyIdError] = useState('');
    const [tenantsId, setTenantsId] = useState(rental.tenants || []);
    const [tenantsIdError, setTenantsIdError] = useState('');
    const [startDate, setStartDate] = useState(rental.startDate || '');
    const [startDateError, setStartDateError] = useState('');
    const [endDate, setEndDate] = useState(rental.endDate || '');
    const [endDateError, setEndDateError] = useState('');
    const [rentPrice, setRentPrice] = useState(rental.rentPrice || '');
    const [rentPriceError, setRentPriceError] = useState('');
    const [chargesPrice, setChargesPrice] = useState(rental.chargesPrice || '');
    const [chargesPriceError, setChargesPriceError] = useState('');

    /**
     * Handles the change event for input fields.
     *
     * @param {string} key - The key of the input field.
     * @param {string} value - The new value of the input field.
     */
    const handleChange = (key, value) => {
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
                setTenantsId(value);
                setTenantsIdError('');
                break;
            case 'startDate':
                setStartDate(value);
                setStartDateError('');
                break;
            case 'endDate':
                setEndDate(value);
                setEndDateError('');
                break;
            case 'rentPrice':
                setRentPrice(value);
                setRentPriceError('');
                break;
            case 'chargesPrice':
                setChargesPrice(value);
                setChargesPriceError('');
                break;
            default:
                break;
        }
    };

    /**
     * Check if date is valid using simple regex for dd/MM/yyyy
     *
     * @param date - Date to verify
     * @returns {boolean} True if format valide, false otherwise.
     */
    const isDateFormatValide = (date) => {
        return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
    };

    /**
     * Handles the form submission.
     */
    const handleSubmit = async () => {
        rental.name = name;
        rental.property = propertyId;
        rental.tenants = tenantsId;
        rental.startDate = startDate;
        rental.endDate = endDate;

        const isError = handleFormErrors();

        if (!isError) {
            if (!rental.id) {
                rental.id = await addRental(rental);
                addNotification(NOTIFICATION_TYPES.SUCCESS, translate({
                    section: "RENTAL_ADD_UPDATE_PAGE",
                    key: "NOTIFICATION_CREATE"
                }) + (rental.name !== "" ? " (" + rental.name + ")" : ""))
            } else {
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
    const handleFormErrors = (): boolean => {
        setNameError('');
        setPropertyIdError('');
        setTenantsIdError('');
        setStartDateError('');
        setEndDateError('');
        setRentPriceError('');
        setChargesPriceError('');
        let isError = false;

        if (name === "") {
            setNameError(translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        }

        if (propertyId === "") {
            setPropertyIdError(translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        }

        if (tenantsId.length === 0) {
            setTenantsIdError(translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        }

        if (startDate === '') {
            setStartDateError(translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        } else if (!isDateFormatValide(startDate)) {
            setStartDateError(translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_DATE_FORMAT"}))
            isError = true;
        }

        if (endDate !== '' && !isDateFormatValide(endDate)) {
            setEndDateError(translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_DATE_FORMAT"}))
            isError = true;
        }

        if (rentPrice === '') {
            setRentPriceError(translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        }

        if (chargesPrice === '') {
            setChargesPriceError(translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        }

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
            setName(rental.name ?? '');
            setPropertyId(rental.property ?? '')
            setTenantsId(rental.tenants ?? [])

            setAllProperties(await getAllProperties());
            setAllTenants(await getAllTenants());
        }

        fetchData();
        // eslint-disable-next-line
    }, [rental]);

    return (
        <Box className="rental-add-update-form form dark-light-box">
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
                        SelectProps={{multiple: true, renderValue: (selected) => selected.join(', ')}}
                        label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "TENANTS_LABEL"})}
                        size="small"
                        value={tenantsId}
                        helperText={tenantsIdError}
                        error={tenantsIdError !== ''}
                        onChange={(e) => handleChange('tenants', e.target.value)}>
                        {allTenants.length !== 0 ?
                            allTenants.map((tenant) => (
                                <MenuItem key={tenant.id} value={tenant.name}>
                                    {tenant.name}
                                </MenuItem>
                            )) : <MenuItem value=''>none</MenuItem>
                        }
                    </TextField>
                </Box>
                <Box className="form__field-container-line">
                    <TextField
                        className="field"
                        label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "NAME_LABEL"})}
                        size="small"
                        value={name}
                        helperText={nameError}
                        error={nameError !== ''}
                        onChange={(e) => handleChange('name', e.target.value)}/>
                </Box>
            </Box>
            <Box className="form__field-container">
                <Typography>
                    {translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "PERIOD_SECTION"})}
                </Typography>
                <Box className="form__field-container-line">
                    <TextField
                        className="field"
                        label={translate({ section: "RENTAL_ADD_UPDATE_PAGE", key: "START_DATE_LABEL" })}
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
                    {translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "PRICE_SECTION"})}
                </Typography>
                <Box className="form__field-container-line">
                    <TextField
                        className="field"
                        label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "RENT_PRICE_LABEL"})}
                        size="small"
                        value={rentPrice}
                        helperText={rentPriceError}
                        error={rentPriceError !== ''}
                        onChange={(e) => handleChange('rentPrice', e.target.value)}/>
                    <TextField
                        className="field"
                        label={translate({section: "RENTAL_ADD_UPDATE_PAGE", key: "CHARGES_PRICE_LABEL"})}
                        size="small"
                        value={chargesPrice}
                        helperText={chargesPriceError}
                        error={chargesPriceError !== ''}
                        onChange={(e) => handleChange('chargesPrice', e.target.value)}/>
                </Box>
            </Box>
            <Box className="form__button-container">
                <Button className="white-button" onClick={handleCancel}>
                    <KeyboardReturnIcon/>
                </Button>
                <Button className="green-button" onClick={handleSubmit}>
                    {rental.id ?
                        <EditIcon/> : <AddIcon/>
                    }
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
        property: PropTypes.string.isRequired,
        tenants: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
};

export default RentalAddUpdateForm;
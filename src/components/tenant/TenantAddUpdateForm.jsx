import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageProvider";
import {useNotification} from "../../contexts/NotificationProvider";
import {addTenant, updateTenant} from "../../services/api/firebase/tenants";
import {NOTIFICATION_TYPES} from "../../constants/notification";
import {PATHS} from "../../constants/routing";

/**
 * Component for the Tenant Add/Update form.
 *
 * @param {Tenant} tenant - Tenant data.
 * @returns {JSX.Element} The TenantAddUpdateForm component.
 */
function TenantAddUpdateForm({tenant}) {
    const navigate = useNavigate();
    const {addNotification} = useNotification();
    const {translate} = useLanguage();
    const [name, setName] = useState(tenant.name || '');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState(tenant.email || '');
    const [emailError, setEmailError] = useState('');
    const [phone, setPhone] = useState(tenant.phone || '');
    const [phoneError, setPhoneError] = useState('');

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
                setNameError('');
                break;
            case 'email':
                setEmail(value);
                setEmailError('');
                break;
            case 'phone':
                setPhone(value);
                setPhoneError('');
                break;
            default:
                break;
        }
    };

    /**
     * Handles the form submission.
     */
    const handleSubmit = async () => {
        tenant.name = name;
        tenant.email = email;
        tenant.phone = phone;

        const isError = handleFormErrors();

        if (!isError) {
            if (!tenant.id) {
                tenant.id = await addTenant(tenant);
                addNotification(NOTIFICATION_TYPES.SUCCESS, translate({
                    section: "TENANT_ADD_UPDATE_PAGE",
                    key: "NOTIFICATION_CREATE"
                }) + (tenant.name !== "" ? " (" + tenant.name + ")" : ""))
            } else {
                await updateTenant(tenant);
                addNotification(NOTIFICATION_TYPES.SUCCESS, translate({
                    section: "TENANT_ADD_UPDATE_PAGE",
                    key: "NOTIFICATION_EDIT"
                }) + (tenant.name !== "" ? " (" + tenant.name + ")" : ""))
            }


            navigate(PATHS.TENANTS_EDITION + "?id=" + tenant.id);
        } else {
            addNotification(NOTIFICATION_TYPES.ERROR, translate({
                section: "TENANT_ADD_UPDATE_PAGE",
                key: "NOTIFICATION_ERROR"
            }) + (tenant.name !== "" ? " (" + tenant.name + ")" : ""))
        }
    };


    /**
     * Handles form errors.
     *
     * @returns {boolean} True if there are errors, false otherwise.
     */
    const handleFormErrors = () => {
        setNameError('');
        setEmailError('');
        setPhoneError('');
        let isError = false;

        if (name === "") {
            setNameError(translate({section: "TENANT_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            setEmailError(translate({section: "TENANT_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        } else if (!emailRegex.test(email)) {
            setEmailError(translate({section: "TENANT_ADD_UPDATE_PAGE", key: "ERROR_EMAIL_FIELD"}))
            isError = true;
        }

        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

        if (phone !== "" && !phoneRegex.test(phone)) {
            setPhoneError(translate({section: "TENANT_ADD_UPDATE_PAGE", key: "ERROR_PHONE_FIELD"}))
            isError = true;
        }

        return isError;
    };

    /**
     * Handles the cancel action.
     */
    const handleCancel = () => {
        navigate(PATHS.TENANTS);
    };

    useEffect(() => {
        const fetchData = async () => {
            setName(tenant.name ?? '');
            setEmail(tenant.email ?? '');
            setPhone(tenant.phone ?? '');
        }

        fetchData();
        // eslint-disable-next-line
    }, [tenant]);

    return (
        <Box className="tenant-add-update-form form dark-light-box">
            <Typography>
                {translate({section: "TENANT_ADD_UPDATE_PAGE", key: "GENERAL_INFORMATION"})}
            </Typography>
            <Box className="form__field-container">
                <TextField
                    key="name"
                    className="field"
                    label={translate({section: "TENANT_ADD_UPDATE_PAGE", key: "NAME_LABEL"})}
                    size="small"
                    value={name}
                    helperText={nameError}
                    error={nameError !== ''}
                    onChange={(e) => handleChange('name', e.target.value)}/>
                <TextField
                    key="email"
                    className="field"
                    label={translate({section: "TENANT_ADD_UPDATE_PAGE", key: "EMAIL_LABEL"})}
                    size="small"
                    value={email}
                    helperText={emailError}
                    error={emailError !== ''}
                    onChange={(e) => handleChange('email', e.target.value)}/>
                <TextField
                    key="phone"
                    className="field"
                    label={translate({section: "TENANT_ADD_UPDATE_PAGE", key: "PHONE_LABEL"})}
                    size="small"
                    value={phone}
                    helperText={phoneError}
                    error={phoneError !== ''}
                    onChange={(e) => handleChange('phone', e.target.value)}/>
            </Box>
            <Box className="form__button-container">
                <Button className="white-button" onClick={handleCancel}>
                    <KeyboardReturnIcon/>
                </Button>
                <Button className="green-button" onClick={handleSubmit}>
                    {
                        tenant.id ? <EditIcon/> : <AddIcon/>
                    }
                </Button>
            </Box>
        </Box>
    );
}

TenantAddUpdateForm.propTypes = {
    tenant: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
    }),
};

export default TenantAddUpdateForm;
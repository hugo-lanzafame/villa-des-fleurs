import {useEffect, useState} from 'react';
import {Box, Button, MenuItem, TextField, Typography} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageProvider";
import {useNotification} from "../../contexts/NotificationProvider";
import {addProperty, updateProperty} from "../../services/api/firebase/properties";
import {NOTIFICATION_TYPES} from "../../constants/notification";
import {PATHS} from "../../constants/routing";

/**
 * Component for the Property Add/Update form.
 *
 * @param {Property} property - Property data.
 * @returns {JSX.Element} The PropertyAddUpdateForm component.
 */
function PropertyAddUpdateForm({property}) {
    const navigate = useNavigate();
    const {addNotification} = useNotification();
    const {translate} = useLanguage();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [type, setType] = useState('');
    const [typeError, setTypeError] = useState('');

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
            case 'type':
                setType(value);
                setTypeError('');
                break;
            default:
                break;
        }
    };

    /**
     * Handles the form submission.
     */
    const handleSubmit = async () => {
        property = property ?? {};
        property.name = name;
        property.type = type;

        const isError = handleFormErrors();

        if (!isError) {
            if (!property.id) {
                property.id = await addProperty(property);
                addNotification(NOTIFICATION_TYPES.SUCCESS, translate({
                    section: "PROPERTY_ADD_UPDATE_PAGE",
                    key: "NOTIFICATION_CREATE"
                }) + (property.name !== "" ? " (" + property.name + ")" : ""))
            } else {
                await updateProperty(property);
                addNotification(NOTIFICATION_TYPES.SUCCESS, translate({
                    section: "PROPERTY_ADD_UPDATE_PAGE",
                    key: "NOTIFICATION_EDIT"
                }) + (property.name !== "" ? " (" + property.name + ")" : ""))
            }


            navigate(PATHS.PROPERTIES_EDITION + "?id=" + property.id);
        } else {
            addNotification(NOTIFICATION_TYPES.ERROR, translate({
                section: "PROPERTY_ADD_UPDATE_PAGE",
                key: "NOTIFICATION_ERROR"
            }) + (property.name !== "" ? " (" + property.name + ")" : ""))
        }
    };


    /**
     * Handles form errors.
     *
     * @returns {boolean} True if there are errors, false otherwise.
     */
    const handleFormErrors = () => {
        setNameError('');
        setTypeError('');
        let isError = false;

        if (name === "") {
            setNameError(translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        }

        if (type === "") {
            setTypeError(translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "ERROR_REQUIRED_FIELD"}))
            isError = true;
        }

        return isError;
    };

    /**
     * Handles the cancel action.
     */
    const handleCancel = () => {
        navigate(PATHS.PROPERTIES);
    };

    useEffect(() => {
        const fetchData = async () => {
            const currentProperty = property ?? {};
            setName(currentProperty.name ?? '');
            setType(currentProperty.type ?? '');
        }

        fetchData();
        // eslint-disable-next-line
    }, [property]);

    return (
        <Box className="property-add-update-form form">
            <Box className="dark-light-box">
                <Typography>
                    {translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "GENERAL_INFORMATION"})}
                </Typography>
                <Box className="form__field-container">
                    <Box className="form__field-container-line">
                        <TextField
                            key="name"
                            className="field"
                            label={translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "NAME_LABEL"})}
                            size="small"
                            value={name}
                            helperText={nameError}
                            error={nameError !== ''}
                            onChange={(e) => handleChange('name', e.target.value)}/>
                        <TextField
                            key="type"
                            select
                            className="field"
                            label={translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "TYPE_LABEL"})}
                            size="small"
                            value={type}
                            helperText={typeError}
                            error={typeError !== ''}
                            onChange={(e) => handleChange('type', e.target.value)}>
                            <MenuItem value="">none</MenuItem>
                            <MenuItem key="apartment" value="apartment">
                                {translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "TYPE_APARTMENT"})}
                            </MenuItem>
                        </TextField>
                    </Box>
                </Box>
            </Box>
            <Box className="form__button-container">
                <Button className="white-button" onClick={handleCancel}>
                    <KeyboardReturnIcon/>
                </Button>
                <Button className="green-button" onClick={handleSubmit}>
                    {property && property.id ? <EditIcon/> : <AddIcon/>}
                </Button>
            </Box>
        </Box>
    );
}

PropertyAddUpdateForm.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }),
};

export default PropertyAddUpdateForm;
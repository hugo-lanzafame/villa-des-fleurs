import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {useNavigate} from "react-router-dom";
import {useLanguage} from "../../contexts/LanguageProvider";
import {addProperty, updateProperty} from "../../services/api/firebase/properties";
import {PATHS} from "../../constants/routing";
import {useNotification} from "../../contexts/NotificationProvider";
import {NOTIFICATION_TYPES} from "../../constants/notification";

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
    const [name, setName] = useState(property.name || '');
    const [type, setType] = useState(property.type || '');

    const handleChange = (key, value) => {
        if (key === 'name') {
            setName(value);
        } else if (key === 'type') {
            setType(value);
        }
    };

    const handleSubmit = async () => {
        property.name = name;
        property.type = type;

        if (!property.id) {
            property.id = await addProperty(property);
            addNotification(NOTIFICATION_TYPES.SUCCESS, translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "NOTIFICATION_CREATE"}) + " (" + property.name + ")")
        } else {
            await updateProperty(property);
            addNotification(NOTIFICATION_TYPES.SUCCESS, translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "NOTIFICATION_EDIT"}) + " (" + property.name + ")")
        }

        navigate(PATHS.PROPERTIES_EDITION + "?id=" + property.id);
    };

    const handleCancel = () => {
        navigate(PATHS.PROPERTIES);
    };

    useEffect(() => {
        const fetchData = async () => {
            setName(property.name ?? '');
            setType(property.type ?? '');
        }

        fetchData();
        // eslint-disable-next-line
    }, [property]);

    return (
        <Box className="property-add-update-form dark-light-box">
            <Typography>
                {translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "GENERAL_INFORMATION"})}
            </Typography>
            <Box className="property-add-update-form__field-container">
                <TextField
                    key="name"
                    className="field"
                    label={translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "NAME_LABEL"})}
                    size="small"
                    value={name}
                    onChange={(e) => handleChange('name', e.target.value)}/>
                <TextField
                    key="type"
                    className="field"
                    label={translate({section: "PROPERTY_ADD_UPDATE_PAGE", key: "TYPE_LABEL"})}
                    size="small"
                    value={type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    select
                    SelectProps={{native: true}}>
                    <option key="" value=""></option>
                    <option key="apartment" value="apartment">
                        Apartment
                    </option>
                </TextField>
            </Box>
            <Box className="property-add-update-form__button-container">
                <Button className="white-button" onClick={handleCancel}>
                    <KeyboardReturnIcon/>
                </Button>
                <Button className="green-button" onClick={handleSubmit}>
                    {
                        property.id ? <EditIcon/> : <AddIcon/>
                    }
                </Button>
            </Box>
        </Box>
    );
}

export default PropertyAddUpdateForm;
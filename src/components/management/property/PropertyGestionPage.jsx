import React, {useState} from 'react';
import {createBuilding} from '../../../firebase/database';
import {Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {PATH, PROPERTY_TYPE} from '../../../constants'
//Components
import CustomForm from "../../global/CustomForm";
import CustomInput from "../../global/CustomInput";
import CustomSelect from "../../global/CustomSelect";

/**
 * Component for the Building Creation page.
 *
 * @returns {JSX.Element} The PropertyGestionPage component.
 */
function PropertyGestionPage(id) {
    const [type, setType] = useState(PROPERTY_TYPE.APARTMENT);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the change event of the property name input.
     *
     * @param {Object} e - The change event.
     */
    const handleChange = (e) => {
        switch (e.target.name) {
            case 'type':
                setType(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
            default:
                break;
        }
    };

    /**
     * Handles the form submission.
     *
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        switch (type) {
            case PROPERTY_TYPE.APARTMENT:
                createBuilding(name)
                    .then((buildingId) => {
                        navigate(`${PATH.PROPERTIES_GESTION}?id=${buildingId}`);
                    })
                    .catch(error => {
                        console.error('Error adding building: ', error);
                    });
                break;
            case PROPERTY_TYPE.BUILDING:
                setName(e.target.value);
                break;
            default:
                break;
        }
    };

    const propertyTypeOptions = Object.keys(PROPERTY_TYPE).map((key) => ({
        value: PROPERTY_TYPE[key],
        label: PROPERTY_TYPE[key],
    }));

    const fieldArray = [
        <CustomSelect
            label="Type de propriété"
            name="type"
            value={type}
            onChange={handleChange}
            options={propertyTypeOptions}/>,
        <CustomInput
            label="Nom de la propriété"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
        />
    ]

    return (
        <Box className='property-gestion-page'>
            <CustomForm
                titleText="Ajouter une propriété"
                handleSubmit={handleSubmit}
                buttonText="Submit"
                fieldArray={fieldArray}
            />
        </Box>
    );
}

export default PropertyGestionPage;

import React, { useState } from 'react';
import {createBuilding} from '../../../firebase/database';
import {Box} from "@mui/material";
//Components
import CustomForm from "../../custom/CustomForm";
import CustomInput from "../../custom/CustomInput";

/**
 * Component for the Building Creation page.
 *
 * @returns {JSX.Element} The BuildingCreationPage component.
 */
function BuildingCreationPage() {
    const [buildingName, setBuildingName] = useState('');

    /**
     * Handles the change event of the building name input.
     *
     * @param {Object} e - The change event.
     */
    const handleBuildingNameChange = (e) => {
        setBuildingName(e.target.value);
    };

    /**
     * Handles the form submission.
     *
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        createBuilding(buildingName)
            .then(() => {
                console.log('Building added');
            })
            .catch(error => {
                console.error('Error adding building: ', error);
            });
    };

    const fieldArray = [
        <CustomInput
            key="buildingName"
            label="Building Name"
            type="text"
            name="buildingName"
            value={buildingName}
            handleChange={handleBuildingNameChange}
        />
    ]

    return (
        <Box className='management-page'>
            <CustomForm
                titleText="Add Building"
                handleSubmit={handleSubmit}
                buttonText="Submit"
                fieldArray={fieldArray}
            />
        </Box>
    );
}

export default BuildingCreationPage;

import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../../../firebase/database';
import CustomForm from "../../custom/CustomForm";
import CustomInput from "../../custom/CustomInput";
import {Box} from "@mui/material";

function BuildingCreationPage() {
    const [buildingName, setBuildingName] = useState('');
    const [apartments, setApartments] = useState([{ name: '' }]);

    const handleBuildingNameChange = (e) => {
        setBuildingName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            // Ajouter le bâtiment à la base de données Firebase
            const buildingRef = push(ref(database, 'buildings'));
            const buildingId = buildingRef.key;

            set(buildingRef, {
                buildingName: buildingName,
                apartments: apartments.map((apartment) => ({ apartmentName: apartment.name })),
            });

            console.log('Building added with ID: ', buildingId);

            // Réinitialiser les champs du formulaire
            setBuildingName('');
            setApartments([{ name: '' }]);
        } catch (error) {
            console.error('Error adding building: ', error);
        }
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

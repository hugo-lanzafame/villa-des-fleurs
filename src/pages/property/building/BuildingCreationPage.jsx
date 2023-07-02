import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../../../firebase/database';
import CustomForm from "../../custom/CustomForm";
import CustomInput from "../../custom/CustomInput";

function BuildingCreationForm() {
    const [buildingName, setBuildingName] = useState('');
    const [apartments, setApartments] = useState([{ name: '' }]);

    const handleBuildingNameChange = (e) => {
        setBuildingName(e.target.value);
    };

    const handleApartmentNameChange = (index, e) => {
        const updatedApartments = [...apartments];
        updatedApartments[index].name = e.target.value;
        setApartments(updatedApartments);
    };

    const handleAddApartment = () => {
        const newApartment = { name: '' };
        setApartments([...apartments, newApartment]);
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

    return (
        <CustomForm
            titleText="Add Building"
            handleSubmit={handleSubmit}
            buttonText="Submit"
            contentArray={[
                <CustomInput
                    key="buildingName"
                    label="Building Name"
                    type="text"
                    name="buildingName"
                    value={buildingName}
                    handleChange={handleBuildingNameChange}
                />,
                apartments.map((apartment, index) => (
                    <CustomInput
                        key={index}
                        label={`Apartment ${index + 1}`}
                        type="text"
                        name={`apartment-${index}`}
                        value={apartment.name}
                        handleChange={(e) => handleApartmentNameChange(index, e)}
                    />
                )),
                <button key="addApartment" type="button" onClick={handleAddApartment}>
                    Add Apartment
                </button>,
            ]}
        />
    );
}

function BuildingCreationPage() {
    return (
        <div>
            <h1>Add Building</h1>
            <BuildingCreationForm />
        </div>
    );
}

export default BuildingCreationPage;

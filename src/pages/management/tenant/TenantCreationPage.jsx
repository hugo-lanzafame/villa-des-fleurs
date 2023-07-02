import React, {useState} from 'react';

const CreateTenantPage = () => {
    const [building, setBuilding] = useState('');
    const [floor, setFloor] = useState('');
    const [name, setName] = useState('');
    const [moveInDate, setMoveInDate] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div>
            <h2>Créer un locataire</h2>
            <form>
                <div>
                    <label>Bâtiment:</label>
                    <select value={building} onChange={(e) => setBuilding(e.target.value)}>
                        <option value="">Sélectionnez un bâtiment</option>
                        <option value="Batiment A">Bâtiment A</option>
                        <option value="Batiment B">Bâtiment B</option>
                        <option value="Batiment C">Bâtiment C</option>
                        {/* Ajoute ici les autres options en fonction des bâtiments disponibles */}
                    </select>
                </div>
                <div>
                    <label>Étage:</label>
                    <select value={floor} onChange={(e) => setFloor(e.target.value)}>
                        <option value="">Sélectionnez un étage</option>
                        <option value="1">1er étage</option>
                        <option value="2">2e étage</option>
                        <option value="3">3e étage</option>
                        {/* Ajoute ici les autres options en fonction du nombre d'étages */}
                    </select>
                </div>
                <div>
                    <label>Nom:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Date d'emménagement:</label>
                    <input type="date" value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)}/>
                </div>
                <div>
                    <label>Date de départ:</label>
                    <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)}/>
                </div>
                <div>
                    <label>Numéro de téléphone:</label>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div>
                    <label>E-mail:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button type="button">Créer</button>
            </form>
        </div>
    );
};

export default CreateTenantPage;

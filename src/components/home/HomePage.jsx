import React, { useEffect, useState } from 'react';
import { getIRL } from "../../services/api/BDM/IRL.js";

/**
 * Component for the home page.
 *
 * @returns {JSX.Element} The HomePage component.
 */
function HomePage() {
    const [date, setDate] = useState('');
    const [IRL, setIRL] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getIRL(new Date(date));
                setIRL(response);
            } catch (error) {
                console.error('Erreur :', error);
            }
        };

        if (date) {
            fetchData();
        }
    }, [date]);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <div>
            <label htmlFor="dateInput">Select a date:</label>
            <input
                type="date"
                id="dateInput"
                value={date}
                onChange={handleDateChange}
            />
            {IRL && <p>{IRL}</p>}
        </div>
    );
}

export default HomePage;

import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../../../firebase/database';

/**
 * Component for displaying a list of buildings.
 *
 * @returns {JSX.Element} The PropertyListPage component.
 */
function PropertyListPage() {
    const [buildings, setBuildings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Listen for changes to buildings in the Firebase database
        const buildingsRef = ref(database, 'buildings');
        const unsubscribe = onValue(buildingsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert the buildings object into an array for iteration
                const buildingsArray = Object.keys(data).map((key) => ({
                    id: key,
                    name: data[key].buildingName,
                }));
                setBuildings(buildingsArray);
            } else {
                setBuildings([]);
            }
        });

        // Clean up the listener when the component is unmounted
        return () => {
            off(buildingsRef);
            unsubscribe();
        };
    }, []);

    // Filter the buildings based on the search query
    const filteredBuildings = buildings.filter((building) =>
        building.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box>
            <h1>Building List</h1>
            <TextField
                label="Search Building"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredBuildings.map((building) => (
                        <TableRow key={building.id}>
                            <TableCell>{building.name}</TableCell>
                            <TableCell>
                                <Button>
                                    View
                                </Button>
                                <Button>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

export default PropertyListPage;

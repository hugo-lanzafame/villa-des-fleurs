import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField } from '@mui/material';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../../../firebase/database';

function BuildingListPage() {
    const [buildings, setBuildings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Écoute des modifications des bâtiments dans la base de données Firebase
        const buildingsRef = ref(database, 'buildings');
        const unsubscribe = onValue(buildingsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Conversion de l'objet des bâtiments en un tableau pour le rendre itérable
                const buildingsArray = Object.keys(data).map((key) => ({
                    id: key,
                    name: data[key].buildingName,
                }));
                setBuildings(buildingsArray);
            } else {
                setBuildings([]);
            }
        });

        // Nettoyage de l'écouteur lors du démontage du composant
        return () => {
            off(buildingsRef);
            unsubscribe();
        };
    }, []);

    // Filtrer les bâtiments en fonction de la valeur de recherche
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

export default BuildingListPage;


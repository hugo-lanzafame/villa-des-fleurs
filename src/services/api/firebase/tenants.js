import app from './config';
import {get, getDatabase, push, ref, remove, set} from 'firebase/database';
import PropTypes from 'prop-types';
import {getCurrentUser} from "./auth";
import {DATABASE} from "../../../constants/database";
import {convertTableToEntity} from "../../../utils/global";

const database = getDatabase(app);

/**
 * Add a new tenant.
 *
 * @param {Tenant} tenant - The tenant object to create.
 * @returns {Promise<string>} A promise indicating the key of the tenant.
 * @throws {Error} If there is an error during the creation process.
 */
const addTenant = async (tenant) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.TENANTS.TABLE;
        const tenantThenableRef = push(ref(database, tablePath));

        await set(tenantThenableRef, {
            [DATABASE.TENANTS.COLUMN_NAME]: tenant.name,
            [DATABASE.TENANTS.COLUMN_EMAIL]: tenant.email,
            [DATABASE.TENANTS.COLUMN_PHONE]: tenant.phone,
        })

        return tenantThenableRef.key;
    } catch (error) {
        throw error;
    }
}
addTenant.propTypes = {
    tenant: PropTypes.object.isRequired,
};

/**
 * Update a tenant.
 *
 * @param {Tenant} tenant - The updated tenant object (with ID).
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} If there is an error during the update process.
 */
const updateTenant = async (tenant) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.TENANTS.TABLE;
        const tenantRef = ref(database, tablePath + "/" + tenant.id);

        await set(tenantRef, {
            [DATABASE.TENANTS.COLUMN_NAME]: tenant.name,
            [DATABASE.TENANTS.COLUMN_EMAIL]: tenant.email,
            [DATABASE.TENANTS.COLUMN_PHONE]: tenant.phone,
        })
    } catch (error) {
        throw error;
    }
};
updateTenant.propTypes = {
    tenant: PropTypes.object.isRequired,
};

/**
 * Get a tenant by ID.
 *
 * @param {string} tenantId - The ID of the tenant to retrieve.
 * @returns {Promise<Tenant>} A promise that resolves to the tenant.
 * @throws {Error} If there is an error during the getting process.
 */
const getTenantById = async (tenantId) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.TENANTS.TABLE;
        const tenantRef = ref(database, tablePath + "/" + tenantId);
        const snapshot = await get(tenantRef);

        if (snapshot.exists()) {
            return {
                id: snapshot.key,
                ...convertTableToEntity(snapshot.val()),
            };
        } else {
            new Error(`Tenant with ID ${tenantId} not found`);
        }
    } catch (error) {
        throw error;
    }
};
getTenantById.propTypes = {
    tenantId: PropTypes.string.isRequired,
};

/**
 * Get all tenants.
 *
 * @returns {Promise<Tenant[]>} A promise that resolves to an array of tenants.
 * @throws {Error} If there is an error during the getting process.
 */
const getAllTenants = async () => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.TENANTS.TABLE;
        const tenantRef = ref(database, tablePath);
        let tenants = [];

        const snapshot = await get(tenantRef);
        snapshot.forEach((childSnapshot) => {
            tenants.push({
                id: childSnapshot.key,
                ...convertTableToEntity(childSnapshot.val()),
            });
        });
        tenants.sort((a, b) => (a.name < b.name ? -1 : 1));

        return tenants;
    } catch (error) {
        throw error;
    }
};


/**
 * Delete a tenant by its ID.
 *
 * @param {string} tenantId - The ID of the tenant to be deleted.
 * @returns {Promise<void>} A promise indicating the success or failure of the deletion.
 * @throws {Error} If there is an error during the deletion process.
 */
const deleteTenantById = async (tenantId) => {
    try {
        const tablePath = "users/" + getCurrentUser().uid + "/" + DATABASE.TENANTS.TABLE;
        const tenantRef = ref(database, tablePath + "/" + tenantId);

        await remove(tenantRef);
    } catch (error) {
        throw error;
    }
};
deleteTenantById.propTypes = {
    tenantId: PropTypes.string.isRequired,
};

export {addTenant, updateTenant, getTenantById, getAllTenants, deleteTenantById}

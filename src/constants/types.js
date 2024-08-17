// ENTITY
/**
 * Represents a property entity.
 *
 * @typedef {Object} Property
 * @property {string} id - The unique identifier of the property.
 * @property {string} name - The name of the property.
 * @property {string} type - The type of the property (e.g., "apartment").
 */

/**
 * Represents a tenant entity.
 *
 * @typedef {Object} Tenant
 * @property {string} id - The unique identifier of the tenant.
 * @property {string} name - The name of the tenant.
 * @property {string} email - The email of the tenant.
 * @property {string} phone - The phone number of the tenant.
 */

/**
 * Represents a rental entity.
 *
 * @typedef {Object} Rental
 * @property {string} id - The unique identifier of the rental.
 * @property {string} name - The name of the rental.
 * @property {string} startDate - The email of the rental.
 * @property {string} [endDate] - The phone number of the rental.
 * @property {number} rentPrice - The price of the rent.
 * @property {number} chargesPrice - The price of the charges.
 * @property {string} propertyId - The property ID associated with the rental.
 * @property {string[]} tenantIds - An array of tenant IDs associated with the rental.
 */
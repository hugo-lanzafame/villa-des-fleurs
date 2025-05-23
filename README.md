# Villa des Fleurs - Rental Management Platform

Discover Villa des Fleurs, a robust rental management platform developed with Firebase, React, and SCSS. Designed for efficiency, the platform offers practical features to simplify property, tenant, and rental management.

## Key Features

### Rental Management
* CRUD Operation : Effortlessly add, update, view and delete properties, tenants and rentals

### Financial Insights
* Receipt Generation: Create professional receipts and detailed financial reports.
* Late Payment Alerts: Receive timely notifications for overdue payments.

### Overview and Analytics
* Comprehensive Statistics: Gain insights into your real estate portfolio with detailed analytics.

### Multilingual Interface
* English and French Support: User-friendly interface available in two languages.

These features collectively create a powerful and versatile property management solution, simplifying tasks and enhancing the overall property management experience.

## Technologies Used

The Villa des Fleurs website utilizes the following technologies:

* Firebase: A web and mobile application development platform that provides authentication services, data storage, real-time databases, and more.
* React: A JavaScript library for building interactive and responsive user interfaces.
* SCSS: A Cascading Style Sheets (CSS) preprocessor with extended features like variables, mixins, and modules.
* Other Dependencies: The project also incorporates other dependencies and libraries such as React Routing for route management, Axios for HTTP requests, etc.

These combined technologies provide a robust foundation for creating a scalable and responsive property management website with advanced data management features.

## Prerequisites

For projet dependencies:
- [nvm](https://github.com/nvm-sh/nvm)
- [npm](https://github.com/npm/cli)
- [Node.js](https://github.com/nodejs)
- python3
- [node-gyp](https://github.com/nodejs/node-gyp)

For config in `.env`:
- [Firebase projet](https://firebase.google.com/)
- [Insee BDM API access URL](https://portail-api.insee.fr/catalog/api/eebab65a-9aef-4da5-bab6-5a9aefeda552)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hugolanzafameynov/villa-des-fleurs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd villa-des-fleurs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Next, edit the `.env` file to insert your own API keys and other sensitive data.


5. Run the application:
   ```bash
   npm start
   ```

The application will be accessible at http://localhost:5173.

## Author

[Hugo Lanzafame](https://github.com/hugolanzafameynov)

# Villa des Fleurs - Rental Management Platform

Discover Villa des Fleurs, a robust rental management platform. Designed for efficiency, the platform offers practical features to simplify property, tenant, and rental management.

## Table of Contents
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Local Development Setup](#option-1-local-development-setup)
  - [Docker Deployment](#option-2-docker-deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [Author](#author)

## Key Features

### Rental Management
* CRUD Operation : Effortlessly add, update, view and delete properties, tenants and rentals

### Financial Insights (TODO)
* Receipt Generation: Create professional receipts and detailed financial reports.
* Late Payment Alerts: Receive timely notifications for overdue payments.

### Overview and Analytics (TODO)
* Comprehensive Statistics: Gain insights into your real estate portfolio with detailed analytics.

### Multilingual Interface
* English and French Support: User-friendly interface available in two languages.

### Responsive Design
* Mobile-Friendly Interface: Optimized layout that adapts to various screen sizes, including a mobile sidebar navigation system.
* Consistent UI: Standardized design elements across all pages, including account management and error pages.

These features collectively create a powerful and versatile property management solution, simplifying tasks and enhancing the overall property management experience.

## Technologies Used

The Villa des Fleurs website utilizes the following technologies:

* **Frontend Framework**:
  * React v19: A modern JavaScript library for building interactive and responsive user interfaces
  * React DOM v19: For rendering React components in the browser
  * Material UI v7: A popular React UI framework implementing Google's Material Design principles
  * Material UI Icons v7: Icon library for the application

* **State Management & Routing**:
  * React Router v7: For handling navigation and routing within the application
  * React Context API: For managing application state across components
  * Prop-Types: For type checking component props

* **Styling**:
  * SCSS/Sass v1.77: A CSS preprocessor with advanced features like variables, mixins, and modules
  * Emotion v11: CSS-in-JS library for component styling
  * Material UI theming: For consistent design language throughout the application

* **Backend & Data Storage**:
  * Firebase v11.7: For authentication, real-time database, and cloud functions
  * Axios v1.6: Promise-based HTTP client for making API requests

* **Build Tools**:
  * Vite v6.3: A modern frontend build tool providing faster and leaner development experience
  * Docker & Nginx: For containerized deployment and optimized serving of static content

* **Testing**:
  * Jest & React Testing Library v16.3: For unit and integration testing
  * User Event v14.6: For simulating user interactions in tests
  * Jest-DOM v6.6: For custom DOM element matchers

* **Performance Monitoring**:
  * Web Vitals v5.0: For measuring and monitoring key performance metrics

These combined technologies provide a robust foundation for creating a scalable and responsive property management website with advanced data management features.

## Project Structure

The Villa des Fleurs project follows a structured organization to maintain clean code separation and maintainability:

```
villa-des-fleurs/
├── .github/                # GitHub workflows and CI/CD configurations
├── coverage/               # Test coverage reports (not tracked in git)
├── node_modules/           # Node.js dependencies (not tracked in git)
├── public/                 # Public assets
├── src/                    # Source code
│   ├── assets/             # Images and static assets
│   ├── components/         # React components organized by feature
│   ├── constants/          # Application constants
│   ├── contexts/           # React context providers
│   ├── services/           # API services and external integrations
│   ├── styles/             # SCSS stylesheets
│   ├── translations/       # Internationalization files
│   └── utils/              # Utility functions
├── .dockerignore           # Files/folders to exclude from Docker build
├── .env                    # Environment variables (not tracked in git)
├── .env.exemple            # Example environment variables template
├── .gitignore              # Git ignore configuration
├── Dockerfile              # Docker build instructions
├── README.md               # Project documentation
├── docker-compose.yml      # Docker Compose configuration
├── firebase.json           # Firebase configuration
├── index.html              # Main HTML entry point
├── nginx.conf              # Nginx configuration for production
├── package-lock.json       # Dependency lock file
├── package.json            # NPM package configuration
└── vite.config.js          # Vite build configuration
```

## Getting Started

Villa des Fleurs offers two methods of installation and deployment:

1. **Local Development Setup**: Install all dependencies locally and use Vite for development
2. **Docker Deployment**: Use containerization for a production-ready environment

### Option 1: Local Development Setup

#### Prerequisites

For local development, you will need to install:

- [Node.js](https://github.com/nodejs) (v18 or higher recommended)
- [npm](https://github.com/npm/cli) (comes with Node.js)
- [nvm](https://github.com/nvm-sh/nvm) (recommended for Node.js version management)
- python3
- [node-gyp](https://github.com/nodejs/node-gyp)

For environment configuration in `.env`:
- [Firebase project](https://firebase.google.com/) credentials
- [Insee BDM API access URL](https://portail-api.insee.fr/catalog/api/eebab65a-9aef-4da5-bab6-5a9aefeda552) if needed

#### Installation Steps

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

5. Start the development server:
   ```bash
   npm start
   ```

The development server will be accessible at http://localhost:5173, with hot-reloading for an optimal development experience.

### Option 2: Docker Deployment

#### Prerequisites

For Docker deployment, you only need:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

For environment configuration in `.env`:
- [Firebase project](https://firebase.google.com/) credentials
- [Insee BDM API access URL](https://portail-api.insee.fr/catalog/api/eebab65a-9aef-4da5-bab6-5a9aefeda552) if needed

All other dependencies (Node.js, npm, python, etc.) will be handled within the Docker container.

#### Deployment Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/hugolanzafameynov/villa-des-fleurs.git
   ```

2. Navigate to the project directory:
   ```bash
   cd villa-des-fleurs
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Next, edit the `.env` file to insert your own API keys and other sensitive data.

4. Build and start the containerized application:
   ```bash
   # Using docker-compose directly
   docker-compose up -d
   
   # Or using npm scripts
   npm run prod
   
   # To rebuild containers
   npm run prod-build
   
   # To stop containers
   npm run prod-down
   ```

The application will be accessible at http://localhost:8080, running in a production-optimized environment.

## Testing

Villa des Fleurs includes testing capabilities powered by Jest and React Testing Library:

```bash
# Run tests
npm test

# Generate test coverage report
npm run coverage
```

The test coverage report is available in the `/coverage` directory and contains detailed information about code coverage across the application.

## Contributing

Contributions to Villa des Fleurs are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please make sure to update tests as appropriate and follow the existing code style.

## Author

[Hugo Lanzafame](https://github.com/hugolanzafameynov)

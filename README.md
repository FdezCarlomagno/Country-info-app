
# Country Information Dashboard - 

A **React-based** web application that provides an interactive interface for users to explore detailed information about countries, including their borders, population trends, flags, and more.

---

## **Features**

- **Country List**: Browse a comprehensive list of available countries with details on population, borders, and flags.
- **Detailed Country Information**:
  - Displays country name, flag, and detailed population trends over time.
  - Interactive population chart for better visualization of historical data.
  - Quick navigation to neighboring countries (border countries) with clickable links.
- **Responsive Design**: The app is mobile-friendly and works seamlessly across various screen sizes.
- **User-Friendly UI**: Simple and intuitive interface built with React and styled using Tailwind CSS.

---

## **Tech Stack**

- **Frontend**:
  - **React**: A powerful library for building user interfaces.
  - **React Router DOM**: For routing between pages and handling navigation.
  - **Recharts**: For visualizing population trends using line charts.
  - **Axios**: For API calls to retrieve country information.
  - **Tailwind CSS**: For responsive and clean UI styling.
  
- **Backend**:
  - **Node.js**: JavaScript runtime for building the backend server.
  - **Express.js**: Web framework for Node.js, handling HTTP requests.
  - **CORS**: Middleware for enabling cross-origin requests.
  - **Nodemon**: For automatically restarting the server during development.
  - **dotenv**: For managing environment variables.

- **Development Tools**:
  - **Vite 5.4**: A modern build tool that offers fast builds and hot module replacement.
  - **ESLint 9.9**: For linting and ensuring consistent code style.
  - **PostCSS 8.4**: For processing and optimizing CSS.
  - **Autoprefixer 10.4**: For adding necessary vendor prefixes in CSS.

---

## **Prerequisites**

- **Node.js (v18 or higher recommended)**
- **npm**: Comes preinstalled with Node.js.

---

## **Installation**

Follow these steps to set up the application locally:

### Frontend:
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd country-information-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the backend folder with the following variables:
   ```env
   AVAILABLE_COUNTRIES_URL=https://date.nager.at/api/v3/AvailableCountries
   COUNTRY_INFO_URL=https://date.nager.at/api/v3/CountryInfo
   POPULATION_DATA_URL=https://countriesnow.space/api/v0.1/countries/population
   FLAG_URL=https://countriesnow.space/api/v0.1/countries/flag/images
   PORT=3000
   ```

---

### **Running the Application**

1. **Start the frontend**:
   - Navigate to the frontend folder:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Start the backend**:
   - Navigate to the backend folder:
   ```bash
   cd backend
   npm start
   ```

3. **Open your browser** and go to the following URL:
   ```
   http://localhost:5173
   ```

---

## **Building for Production**

1. **Create a production build**:
   ```bash
   npm run build
   ```

2. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## **Project Structure**

Here's an overview of the project structure:

```
src/
├── api/
│   └── countryApi.js         # API functions for fetching data (Available countries, country info, population data, flags)
├── components/
│   ├── CountryList.jsx       # Component for displaying the list of countries
│   └── CountryInfo.jsx       # Component for displaying detailed information for a single country
├── App.jsx                   # Main application component where routes and layout are defined
├── main.jsx                  # Application entry point, used to render App.jsx
└── index.css                 # Global styles and Tailwind CSS setup
```

---

## **API Endpoints**

The backend serves the following endpoints:

- **`GET /api/available-countries`**: Retrieves a list of available countries.
- **`GET /api/country-info/:countryCode`**: Retrieves detailed information about a specific country, including population trends, borders, and flags.

---

## **Contributing**

We welcome contributions to this project. If you'd like to contribute, please follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top-right of this repository.
2. **Create a feature branch**:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add feature'
   ```
4. **Push to your branch**:
   ```bash
   git push origin feature-name
   ```
5. **Submit a pull request**: Go to your forked repository and click on "Compare & pull request".

---

## **Contact**

 **E-mail**: valentinfcarlomagno@gmail.com

---


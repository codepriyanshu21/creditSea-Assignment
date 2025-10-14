# CreditSea Fullstack Engineer Assignment

A MERN stack application for processing Experian XML credit pull data.

## Features

- **XML Upload**: RESTful API endpoint for uploading XML files containing credit data.
- **Data Extraction**: Parses XML and extracts key information including basic details, report summary, and credit accounts.
- **Data Persistence**: Stores extracted data in MongoDB with a well-designed schema.
- **Frontend Interface**: React-based UI for uploading files and viewing comprehensive credit reports.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Multer, fast-xml-parser
- **Frontend**: React, Vite, Tailwind CSS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/creditsea
   PORT=5000
   ```
   Adjust the MongoDB URI if using a different setup (e.g., MongoDB Atlas).

4. Start the backend server:
   ```
   npm start
   ```
   Or for development with auto-restart:
   ```
   npx nodemon index.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

1. **Start the Application**:
   - Backend: `cd backend && npm start`
   - Frontend: `cd frontend && npm run dev`
   - Open http://localhost:5173 in your browser

2. **Upload XML File**: Use the upload form on the frontend to select and upload an XML file containing credit data.

3. **View Reports**: After uploading, the report will be processed and stored. Click on any report card to view detailed information including:
   - Basic Details (Name, Mobile Phone, PAN, Credit Score)
   - Report Summary (Account counts, balances, enquiries)
   - Credit Accounts Information (Cards, banks, addresses, balances)

## API Endpoints

- `POST /api/upload`: Upload XML file for processing
- `GET /api/reports`: Retrieve all stored credit reports

## Data Extraction

The application extracts the following information from uploaded XML files:

### Basic Details
- Name
- Mobile Phone
- PAN
- Credit Score

### Report Summary
- Total number of accounts
- Active accounts
- Closed accounts
- Current balance amount
- Secured accounts amount
- Unsecured accounts amount
- Last 7 days credit enquiries

### Credit Accounts Information
- Credit Cards
- Banks of Credit Cards
- Addresses
- Account Numbers
- Amount Overdue
- Current Balance

## Schema Design

The MongoDB schema (`CreditReport`) includes:
- Basic user information fields
- Nested `reportSummary` object for aggregate data
- Array of `creditAccounts` for detailed account information
- Timestamp for upload date

## Testing

- Unit tests can be added using Jest for backend functions.
- Integration tests for API endpoints.
- Frontend can be tested with React Testing Library.

## Deployment

- Backend can be deployed to services like Heroku, Vercel, or AWS.
- Frontend can be built with `npm run build` and deployed to Netlify, Vercel, or similar.
- Ensure MongoDB is accessible from the deployed environment.

## Notes

- The XML parsing logic assumes a specific structure. Adjust the `extractCreditData` function in `backend/index.js` based on the actual XML format provided.
- Error handling is implemented for file uploads and data processing.
- The frontend is responsive and uses Tailwind CSS for styling.

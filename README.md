# CreditSea Fullstack Engineer Assignment

A modern MERN stack application for processing Experian XML credit pull data with a beautiful, responsive interface.

## 🚀 Features

- **XML Upload**: RESTful API endpoint for uploading XML files containing credit data with drag-and-drop support
- **Data Extraction**: Parses XML and extracts key information including basic details, report summary, and credit accounts
- **Data Persistence**: Stores extracted data in MongoDB with a well-designed schema
- **Frontend Interface**: React-based UI with modern design for uploading files and viewing comprehensive credit reports
- **Responsive Design**: Mobile-first approach with Tailwind CSS styling
- **Real-time Processing**: Instant feedback and processing status updates

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Multer** - File upload middleware
- **fast-xml-parser** - XML parsing library
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **ESLint** - Code linting

## 📁 Project Structure

```
creditsea/
├── backend/
│   ├── controllers/
│   │   └── creditReportController.js
│   ├── database/
│   │   └── connection.js
│   ├── models/
│   │   └── CreditReport.js
│   ├── routes/
│   │   └── creditReportRoutes.js
│   ├── uploads/
│   │   └── .gitkeep
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadForm.jsx
│   │   │   └── ReportDisplay.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── assets/
│   │       └── react.svg
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🏗️ Architecture

### Backend Architecture (MVC Pattern)
- **Models**: MongoDB schemas for data structure
- **Controllers**: Business logic for data processing
- **Routes**: API endpoint definitions
- **Database**: Connection and configuration management

### Frontend Architecture
- **Components**: Modular React components
- **State Management**: React hooks for local state
- **Styling**: Tailwind CSS for responsive design

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=
   PORT=5000
   ```
   > **Note:** Adjust MongoDB URI for Atlas: `mongodb+srv://username:password@cluster.mongodb.net/creditsea`

4. **Start the backend server:**
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npx nodemon index.js
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## 🎯 Usage

### Application Workflow

1. **Access the Application:**
   - Open `http://localhost:5173` in your browser
   - Ensure both backend and frontend servers are running

2. **Upload XML File:**
   - Use drag-and-drop or click to select Experian XML file
   - File validation ensures only XML format is accepted
   - Real-time feedback during upload and processing

3. **View Reports:**
   - Browse available reports in the grid layout
   - Click any report card to view detailed analysis
   - Reports display:
     - **Basic Details**: Name, phone, PAN, credit score with color coding
     - **Report Summary**: Account statistics with visual metrics
     - **Credit Accounts**: Detailed table of all credit accounts

### Sample XML Structure Expected

The application expects Experian XML files with structure similar to:
```xml
<INProfileResponse>
  <CAIS_Account>
    <!-- Account details -->
  </CAIS_Account>
  <CreditReport>
    <!-- Report data -->
  </CreditReport>
</INProfileResponse>
```

## 🔌 API Endpoints

### Upload Endpoint
```http
POST /api/upload
Content-Type: multipart/form-data

FormData: { xmlFile: File }
```

**Response:**
```json
{
  "message": "File processed successfully",
  "id": "report_id"
}
```

### Get Reports Endpoint
```http
GET /api/reports
```

**Response:**
```json
[
  {
    "_id": "report_id",
    "name": "John Doe",
    "mobilePhone": "9876543210",
    "pan": "ABCDE1234F",
    "creditScore": 750,
    "reportSummary": {
      "totalAccounts": 5,
      "activeAccounts": 3,
      "closedAccounts": 2,
      "currentBalance": 150000,
      "securedAccountsAmount": 100000,
      "unsecuredAccountsAmount": 50000,
      "last7DaysEnquiries": 2
    },
    "creditAccounts": [...],
    "uploadedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

## 📊 Data Extraction

### Basic Details Extracted
- Name
- Mobile Phone
- PAN (Permanent Account Number)
- Credit Score

### Report Summary Extracted
- Total number of accounts
- Active accounts count
- Closed accounts count
- Current balance amount
- Secured accounts total amount
- Unsecured accounts total amount
- Last 7 days credit enquiries

### Credit Accounts Information
- Credit Card details
- Bank names
- Account addresses
- Account numbers
- Amount overdue
- Current balance

## 🗄️ Database Schema

### CreditReport Model
```javascript
{
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    last7DaysEnquiries: Number,
  },
  creditAccounts: [{
    creditCard: String,
    bank: String,
    address: String,
    accountNumber: String,
    amountOverdue: Number,
    currentBalance: Number,
  }],
  uploadedAt: { type: Date, default: Date.now },
}
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test  # Add test scripts as needed
```

### Frontend Testing
```bash
cd frontend
npm run test  # Add test scripts as needed
```

### Manual Testing Checklist
- [ ] XML file upload (drag & drop and click)
- [ ] File validation (XML only)
- [ ] Data extraction accuracy
- [ ] Report display functionality
- [ ] Responsive design on mobile/tablet
- [ ] Error handling for invalid files
- [ ] API endpoint responses

## 🚀 Deployment

### Backend Deployment
1. **Environment Variables:** Set production MongoDB URI
2. **Build:** No build step required for Node.js
3. **Deploy:** Use Heroku, Vercel, Railway, or AWS

### Frontend Deployment
1. **Build the application:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy dist folder** to:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

### Production Environment Setup
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/creditsea_prod
NODE_ENV=production
PORT=5000
```

## 🔧 Development Notes

### XML Parsing
- The `extractCreditData` function in `creditReportController.js` handles XML parsing
- Adjust parsing logic based on actual Experian XML structure
- Error handling implemented for malformed XML files

### File Upload
- Files temporarily stored in `backend/uploads/` directory
- Automatic cleanup after processing
- File size limits can be configured in Multer settings

### Security Considerations
- Input validation for file uploads
- CORS configuration for cross-origin requests
- Environment variables for sensitive data
- File type validation

### Performance Optimizations
- Efficient XML parsing with fast-xml-parser
- Database indexing on frequently queried fields
- Lazy loading for large datasets (future enhancement)







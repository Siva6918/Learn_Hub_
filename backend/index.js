const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBConnection = require('./config/connect');
const path = require("path");
const fs = require('fs');

const app = express();
dotenv.config();

////// Connect MongoDB ///////
DBConnection();

const PORT = process.env.PORT || 8000; // fallback to 8000 if not set

////// CORS Setup BEFORE routes ///////
app.use(cors({
  origin: ['http://localhost:5173', 'https://Siva6918.github.io'],
  credentials: true
}));

////// Middleware ///////
app.use(express.json());

////// Static Uploads Directory ///////
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/uploads", express.static(uploadsDir));

////// Routes ///////
app.use('/api/admin', require('./routers/adminRoutes'));
app.use('/api/user', require('./routers/userRoutes'));

////// Start Server ///////
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

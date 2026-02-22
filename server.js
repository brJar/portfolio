
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS so the frontend (e.g., localhost:5173) can talk to this server
app.use(cors());

// Ensure uploads directory exists inside 'public' so the frontend can access them directly
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Generate unique filename: timestamp-random.ext
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Serve static files from public folder
app.use(express.static('public'));

// Upload Endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    // Return the URL path relative to the public folder
    // Since we save to public/uploads, the URL is /uploads/filename
    const fileUrl = `/uploads/${req.file.filename}`;
    
    console.log(`File uploaded: ${fileUrl}`);
    res.json({ url: fileUrl });
});

// List Files Endpoint
app.get('/api/files', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error("Error reading uploads directory", err);
            return res.status(500).json([]);
        }

        // Filter for image files and map to their web paths
        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
            .map(file => `/uploads/${file}`)
            .reverse(); // Newest first (roughly, based on filename timestamp usually)

        res.json(images);
    });
});

app.listen(PORT, () => {
    console.log(`API Server running at http://localhost:${PORT}`);
    console.log(`Uploads will be saved to: ${uploadDir}`);
});

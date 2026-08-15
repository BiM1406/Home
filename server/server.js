const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const db = require('./data/db');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', apiRoutes);

// SEO: Pre-render Meta / OpenGraph endpoints & Sitemap (NFR-06)
app.get('/sitemap.xml', (req, res) => {
  const properties = db.getProperties({ status: 'Active' });
  const urls = properties.map(p => `
  <url>
    <loc>http://localhost:${PORT}/detail.html?id=${p.id}</loc>
    <lastmod>${p.createdAt.split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:${PORT}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>http://localhost:${PORT}/search.html</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>${urls}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Socket.io Realtime Chat (FR-05)
io.on('connection', (socket) => {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send_message', (data) => {
    // Lưu vào db store
    const savedMsg = db.createChatMessage(data);
    io.to(`room_${data.propertyId}`).emit('receive_message', savedMsg);
  });
});

// Fallback to index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 RoomRent Server is running at http://localhost:${PORT}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, '../public')}`);
  console.log(`====================================================`);
});

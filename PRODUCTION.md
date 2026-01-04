# 🚀 Production Deployment Guide

## Prerequisites

Before deploying to production, ensure you have:

- ✅ Vercel Blob Storage configured
- ✅ YooKassa merchant account and credentials
- ✅ Domain name configured
- ✅ SSL certificate (handled by Vercel automatically)

## Environment Variables

### Required Variables

\`\`\`env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXXX
YOOKASSA_SHOP_ID=123456
YOOKASSA_SECRET_KEY=live_XXXXXXXXXXXXXXX
NEXT_PUBLIC_BASE_URL=https://angel-help.org
SESSION_SECRET=generate_32_character_random_string
\`\`\`

### How to Generate SESSION_SECRET

\`\`\`bash
openssl rand -base64 32
\`\`\`

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   \`\`\`bash
   npm i -g vercel
   vercel login
   vercel
   \`\`\`

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all required variables from `.env.example`

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

### Option 2: Docker Deployment

1. **Build Docker Image**
   \`\`\`bash
   docker build -t angel-help:latest .
   \`\`\`

2. **Run Container**
   \`\`\`bash
   docker run -d \
     -p 3000:3000 \
     -e BLOB_READ_WRITE_TOKEN=your_token \
     -e YOOKASSA_SHOP_ID=your_shop_id \
     -e YOOKASSA_SECRET_KEY=your_key \
     -e SESSION_SECRET=your_secret \
     -e NEXT_PUBLIC_BASE_URL=https://your-domain.com \
     --name angel-help \
     angel-help:latest
   \`\`\`

3. **Or use Docker Compose**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

### Option 3: VPS/Server Deployment

1. **Install Node.js 22+**
   \`\`\`bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   \`\`\`

2. **Clone and Build**
   \`\`\`bash
   git clone <your-repo>
   cd angel-help
   npm install
   npm run build
   \`\`\`

3. **Setup PM2 (Process Manager)**
   \`\`\`bash
   npm install -g pm2
   pm2 start npm --name "angel-help" -- start
   pm2 save
   pm2 startup
   \`\`\`

4. **Setup Nginx Reverse Proxy**
   \`\`\`nginx
   server {
       listen 80;
       server_name angel-help.org www.angel-help.org;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

5. **Setup SSL with Let's Encrypt**
   \`\`\`bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d angel-help.org -d www.angel-help.org
   \`\`\`

## Post-Deployment Steps

### 1. Create Admin User

Access the admin panel at `/admin/login` with default credentials:
- Username: `admin`
- Password: `admin123`

**⚠️ IMPORTANT: Change this password immediately!**

### 2. Configure Site Settings

1. Go to `/admin/settings`
2. Update contact information
3. Configure bank requisites
4. Set payment settings

### 3. Add Initial Content

1. Add children profiles at `/admin/children`
2. Create news articles at `/admin/news`
3. Configure programs at `/admin/programs`

### 4. Test Payment System

1. Make a test donation
2. Check payment confirmation
3. Verify donation appears in admin panel

## Monitoring & Maintenance

### Health Check Endpoint

Monitor application health:
\`\`\`bash
curl https://angel-help.org/api/health
\`\`\`

Expected response:
\`\`\`json
{
  "status": "ok",
  "timestamp": "2025-01-08T...",
  "data": {
    "children": 10,
    "news": 5,
    "programs": 8
  }
}
\`\`\`

### Backup Data

Regular backups are crucial:

1. **Via Admin Panel**
   - Go to `/admin/backup`
   - Click "Create Backup"
   - Download JSON file

2. **Automated Backups** (recommended)
   \`\`\`bash
   # Add to crontab
   0 2 * * * curl -X GET https://angel-help.org/api/backup > /backups/backup-$(date +\%Y\%m\%d).json
   \`\`\`

### Restore Data

If needed, restore from backup:
\`\`\`bash
curl -X POST https://angel-help.org/api/backup \
  -H "Content-Type: application/json" \
  -d @backup-20250108.json
\`\`\`

## Security Checklist

- [ ] Changed default admin password
- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured
- [ ] SESSION_SECRET is random and strong
- [ ] Backup strategy implemented
- [ ] Monitoring configured
- [ ] YooKassa in production mode
- [ ] CORS configured properly

## Troubleshooting

### Images Not Loading

Check Vercel Blob token:
\`\`\`bash
# Test blob access
curl https://angel-help.org/api/health
\`\`\`

### Payments Failing

1. Verify YooKassa credentials
2. Check that `YOOKASSA_SHOP_ID` and `YOOKASSA_SECRET_KEY` are for production
3. Ensure `NEXT_PUBLIC_BASE_URL` is correct

### Admin Panel Not Accessible

1. Clear browser cache
2. Check if `/admin/login` redirects correctly
3. Verify SESSION_SECRET is set

## Performance Optimization

### Enable Caching

Add to `next.config.mjs`:
\`\`\`js
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    }
  ]
}
\`\`\`

### CDN Configuration

Images are served via Vercel Blob which includes CDN automatically.

## Support

For issues or questions:
- Email: info@angel-help.org
- Phone: +7 495 108 08 41

---

**Last Updated:** January 2025

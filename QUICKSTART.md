# 🚀 Quick Start Guide - Profit Leak Hunter

## Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- Git

---

## Step 1: Clone the Repository (if needed)

```bash
git clone <your-repo-url>
cd LeakLogicAI
```

---

## Step 2: Backend Setup

### Navigate to backend folder

```bash
cd backend
```

### Create Python virtual environment

```bash
python -m venv .venv
```

### Activate virtual environment

**Windows PowerShell:**
```bash
.venv\Scripts\activate
```

**Windows CMD:**
```bash
.venv\Scripts\activate.bat
```

**Mac/Linux:**
```bash
source .venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### (Optional) Set up environment variables

If you want to enable LLM narrative generation:

```bash
# Copy example env file
copy .env.example .env

# Edit .env and add your API keys
# OPENROUTER_API_KEY=your_key_here
# or
# FIREWORKS_API_KEY=your_key_here
```

Note: The app works without API keys (uses fallback narrative).

### Start the backend server

```bash
python -m uvicorn app.main:app --reload
```

✅ Backend is now running at `http://127.0.0.1:8000`

Test it: `http://127.0.0.1:8000/health`

---

## Step 3: Frontend Setup (New Terminal Window)

### Navigate to frontend folder

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### (Optional) Configure API URL

The frontend is already configured to connect to `http://127.0.0.1:8000`

If you need to change it:

```bash
# Copy example env file
copy .env.local.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Start the frontend dev server

```bash
npm run dev
```

✅ Frontend is now running at `http://localhost:3000`

---

## Step 4: Test the App

1. **Open browser**: Navigate to `http://localhost:3000`

2. **Try sample data**:
   - Click the "Use Sample Data (1000 orders)" button
   - Wait for analysis (should take 1-3 seconds)
   - View the results dashboard

3. **Upload your own data**:
   - Prepare CSV files with these formats:
     - **sales.csv** (required): date, order_id, product, sku, quantity, unit_price, revenue
     - **refunds.csv** (optional): date, order_id, product, sku, refund_amount
     - **suppliers.csv** (optional): date, supplier_name, product, sku, unit_cost
     - **inventory.csv** (optional): date, sku, product, stock_level
   - Upload files through the form
   - Click "Analyze Data"

---

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Use a different port
python -m uvicorn app.main:app --reload --port 8001
```

Then update frontend `.env.local`:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
```

**ModuleNotFoundError:**
```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Next.js will automatically ask to use port 3001
# Or specify port manually:
npm run dev -- -p 3001
```

**"Cannot connect to backend":**
- Ensure backend is running on `http://127.0.0.1:8000`
- Check backend terminal for errors
- Try visiting `http://127.0.0.1:8000/health` directly

**CORS errors:**
- Backend already has CORS configured for localhost:3000
- If using different port, update `backend/app/main.py` CORS origins

---

## API Endpoints

### Health Check
```
GET http://127.0.0.1:8000/health
```

### Sample Data
```
GET http://127.0.0.1:8000/sample-data/{filename}
```
Example: `http://127.0.0.1:8000/sample-data/sales.csv`

### Analyze Data
```
POST http://127.0.0.1:8000/analyze
Content-Type: multipart/form-data

Form fields:
- sales (file, required)
- refunds (file, optional)
- suppliers (file, optional)
- inventory (file, optional)
```

### Interactive API Docs
```
http://127.0.0.1:8000/docs
```

---

## Sample CSV Data

Sample files are located in `backend/app/sample_data/`:

- `sales.csv` - 1000 synthetic sales records
- `refunds.csv` - Product returns with seeded anomalies
- `suppliers.csv` - Supplier cost data with margin erosion
- `inventory.csv` - Stock levels with slow-moving items

These files contain intentional profit leaks for demonstration.

---

## Next Steps

- Add your own LLM API keys in `backend/.env` for AI narratives
- Customize detector thresholds in `backend/app/services/detectors/`
- Upload real business data
- Modify frontend styling in `frontend/tailwind.config.ts`

---

## Need Help?

Check the main README.md for:
- Detailed architecture documentation
- CSV format specifications
- Development workflow
- Deployment instructions

---

**You're all set! 🎉**

Visit `http://localhost:3000` to start detecting profit leaks!

# 💻 LeakLogic AI - Frontend Documentation

Welcome to the **LeakLogic AI** frontend documentation. The frontend is built as a high-performance, visually stunning Next.js web application utilizing Tailwind CSS v3 for styling, Recharts for data visualization, and Spline 3D for interactive background scenes.

---

## 🛠️ Technology Stack

1. **Framework**: Next.js 16.2 (App Router)
2. **Language**: TypeScript (Strict typing for robust component development)
3. **Styling**: Tailwind CSS v3 (Curated dark mode theme, glassmorphism, transitions, and micro-animations)
4. **Data Visualization**: Recharts (Custom responsive interactive chart components)
5. **3D Assets**: Spline (`@splinetool/react-spline` for interactive 3D particle waves)
6. **Icons**: Lucide React (Clean, modern icons matching states and metric types)

---

## 📂 Project Structure

```
frontend/
├── app/                       # Next.js App Router (Layouts & Routes)
│   ├── favicon.ico            # Brand favicon
│   ├── globals.css            # Global CSS, animations, and Tailwind imports
│   ├── layout.tsx             # Root layout with font injection and theme container
│   ├── page.tsx               # Main application controller page (switches views)
│   └── test-connection/       # Connection test route
├── components/                # Modular Reusable React UI Components
│   ├── AnalyticsCharts.tsx    # Leak statistics, trend-lines, and category charts
│   ├── ChartsClientOnly.tsx   # SSR safe wrapper for Recharts
│   ├── FeaturesSection.tsx    # Technical capabilities grid with hover glow effects
│   ├── HeroSection.tsx        # High-impact landing page with floating stats
│   ├── LeakCard.tsx           # Detailed card with accordions for leak categories
│   ├── Navbar.tsx             # Responsive blur navigation bar
│   ├── ResultsDashboard.tsx   # Aggregations, summaries, and finding listings
│   ├── SplineBackground.tsx   # Interactive Spline 3D canvas loader
│   └── UploadSection.tsx      # Multi-file drag & drop / CSV simulation zone
├── lib/                       # Utility and Service Layers
│   └── api.ts                 # API Client (analyzers, sample data generators)
├── types/                     # TypeScript Interfaces
│   └── index.ts               # Core model interfaces (Finding, AnalysisResult, etc.)
├── tailwind.config.ts         # Custom Tailwind color palette & animations configuration
├── tsconfig.json              # TypeScript compilation setup
└── package.json               # Package manifests and dependency manager
```

---

## 🎨 Theme & Color Palette

We utilize a custom-curated **Spline-Inspired Dark Palette** configured inside `tailwind.config.ts`:

- **Background & Canvas**:
  - Deep Indigo (Base): `#001031`
  - Deep Dark (Surface): `#07111F`
  - Dark Secondary (Elevated cards): `#111C2E`
  - Dark Tertiary (Nested components): `#18263D`
- **Branding & Gradients**:
  - Violet/Purple (Primary): `#7B2FF7`
  - Magenta (Accent/Mid): `#E8299C`
  - Hot Pink (Alerts/High Priority): `#FF4D8D`
  - Orange (Warning/Medium Priority): `#FF7A3D`
  - Peach (Success/Low Priority): `#FFA85C`

---

## 🚀 Key Client Components

### 1. `HeroSection.tsx`
- Renders an epic visual introduction to LeakLogic AI.
- Leverages staggered CSS animations (`animate-fade-in`, `animate-slide-up`, etc.).
- Showcases top-level value propositions (e.g. 7+ Leak Types, 95% Accuracy, $193K Avg Leak found).

### 2. `UploadSection.tsx`
- Handles multi-file ingestion for:
  1. **Sales CSV**
  2. **Refunds CSV**
  3. **Suppliers CSV**
  4. **Inventory CSV**
- Provides visual file status verification and simulated validation states.
- Includes a **Simulate Sample Data** action that fetches mock transaction documents from the backend.

### 3. `ResultsDashboard.tsx` & `LeakCard.tsx`
- Displays overall results, executive narrative, and AI recommendations.
- Implements expandable leak cards with color-coded severity levels:
  - **Refund Leaks**: Coral Red / Magenta
  - **Discount Leaks**: Amber / Orange
  - **Supplier Leaks**: Gold / Accent
  - **Inventory Leaks**: Sky Blue / Blue
- Exposes detailed root-causes, financial impacts, confidence ratings, and actionable recommendations.

### 4. `AnalyticsCharts.tsx`
- Renders visual breakdowns of leaks by category.
- Plots timeline trends of financial impacts over windows.
- Automatically transitions and formats data for optimal rendering.

---

## 🔌 API Client Integration (`lib/api.ts`)

Encapsulates standard communication with the FastAPI backend:

- **Base URL**: Defaults to `http://127.0.0.1:8000` (can be configured via `NEXT_PUBLIC_API_URL`).
- **Endpoints**:
  - `GET /health`: Health metrics verification.
  - `GET /sample-data/{filename}`: Download mock transaction data files.
  - `POST /analyze`: Send `multipart/form-data` with CSV files for AI-driven logic processing.

---

## 🛠️ Developing Locally

To start the frontend developer server locally:

```bash
# Navigate to the frontend directory
cd frontend

# Install package dependencies
npm install

# Run the Next.js development server
npm run dev
```

The application will run locally on [http://localhost:3000](http://localhost:3000).

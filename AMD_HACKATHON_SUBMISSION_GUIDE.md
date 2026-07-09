# AMD Developer Hackathon: ACT II - Submission Guide

## 🏆 Track Information

**You're in:** Track 3 - Unicorn Track 🦄  
**Prize Pool:** $4,500 + $2,000 Gemma Prize
- 🥇 1st Place: $2,500
- 🥈 2nd Place: $1,500
- 🥉 3rd Place: $1,000
- 🎁 Best AMD-Hosted Gemma Project: $2,000

---

## ✅ MULTIPLE SUBMISSIONS - YES!

**Good news:** There is NO LIMIT on submissions for Track 3 (Unicorn Track)!

### What This Means:
- ✅ You CAN submit multiple times
- ✅ You CAN improve and resubmit
- ✅ There is NO leaderboard scoring for Track 3 (only Tracks 1 & 2 have leaderboards)
- ✅ Track 3 is judged by HUMANS on creativity, completeness, and product potential

### Strategy:
1. **Submit your MVP ASAP** - Get your project in the system
2. **Iterate based on testing** - Fix bugs, improve UX
3. **Submit again** - Updated versions can be resubmitted
4. **Final polish before deadline** - Make your last submission count

---

## 📋 Submission Requirements

### 1. **Basic Information** (REQUIRED)

#### Project Title
- Must be clear and descriptive
- Example: "LeakLogicAI - AI Business Auditor for Profit Leak Detection"

#### Short Description (600-2000 characters)
Your elevator pitch. Include:
- What problem it solves
- Your unique approach
- Target audience
- Key benefit

**Example for LeakLogicAI:**
```
LeakLogicAI is an AI-powered business auditor that detects hidden profit leaks 
from multi-source CSV data. Unlike rigid analytics tools that require specific 
formats, our flexible schema mapper adapts to ANY column naming convention—
Shopify, WooCommerce, Square, or custom exports all work seamlessly.

Upload sales, refunds, supplier, and inventory data to uncover: increased refund 
rates, ineffective discount campaigns, supplier cost creep without price 
adjustments, and slow-moving inventory tying up cash. Our AI-powered narrative 
engine (using NVIDIA Nemotron via OpenRouter) explains each finding in plain 
English with actionable recommendations.

Target: SMB owners, finance teams, and operations managers who lack dedicated 
data analysts. Built on AMD infrastructure with production-ready architecture.
```

#### Long Description (at least 100 words)
Detailed write-up highlighting:
- The problem in depth
- Your solution architecture
- Technical implementation
- Use of AMD platforms (Developer Cloud, ROCm, Fireworks AI)
- Target audience demographics
- Unique features/benefits
- Future roadmap

### 2. **Technology and Category Tags** (REQUIRED)
Select all that apply:
- ✅ AMD Developer Cloud
- ✅ AI/ML API
- ✅ Fireworks AI (if you're using it for narrative generation)
- ✅ Business Intelligence / Analytics
- ✅ FastAPI
- ✅ Next.js
- ✅ React

### 3. **Visual Assets** (REQUIRED)

#### Cover Image
- **Format:** PNG or JPG
- **Aspect Ratio:** 16:9 (e.g., 1920x1080, 1280x720)
- **Tip:** Screenshot of your dashboard with clear branding

#### Video Presentation (MANDATORY)
- **Format:** MP4
- **Length:** 2-5 minutes recommended
- **Must show:**
  1. Problem statement (30 sec)
  2. Live demo of your app (2-3 min)
  3. Technical architecture highlighting AMD usage (30 sec)
  4. Future vision (30 sec)
- **Tools:** Loom, OBS, or even PowerPoint with screen recording

#### Slide Presentation (MANDATORY)
- **Format:** PDF
- **Slides:** 5-10 slides
- **Structure:**
  1. Title + Team
  2. Problem
  3. Solution
  4. Demo (screenshots)
  5. Technical Architecture (show AMD stack)
  6. Market Opportunity
  7. Call to Action / Next Steps

### 4. **Code & Demo** (REQUIRED)

#### Public GitHub Repository
- **Must include:**
  - Clear README with setup instructions
  - Requirements/dependencies files
  - Sample data (your improved datasets!)
  - Environment variable examples (.env.example)
  - Architecture diagram (optional but impressive)
  
**README Structure:**
```markdown
# LeakLogicAI

AI-powered business auditor detecting hidden profit leaks

## Problem
SMBs lose 10-30% profit to hidden leaks but lack analyst resources...

## Solution
Flexible CSV upload → AI analysis → Actionable insights

## Tech Stack
- Backend: FastAPI + Python + Pandas
- Frontend: Next.js + React + Recharts
- AI: OpenRouter (NVIDIA Nemotron)
- Infrastructure: AMD Developer Cloud

## Setup
[Step by step instructions]

## Demo
[Link to live demo]

## AMD Integration
- Uses AMD infrastructure for...
- Scalable to AMD GPUs for...

## Team
[Your team info]
```

#### Demo Application Platform
**Recommended:**
- **Vercel** - Best for Next.js (your frontend)
- **Railway/Render** - For FastAPI backend
- **Streamlit** - Quick alternative if you rebuild in Streamlit

#### Application URL
- **Must be live and accessible**
- **Must work without auth** (for judges)
- **Include sample data preloaded** or clear instructions

---

## 🎯 Judging Criteria (Track 3 - Unicorn)

### 1. **Creativity and Originality** (25%)
- Novel approach to profit leak detection
- Unique flexible schema mapping
- AI narrative generation differentiator

### 2. **Product/Market Potential** (25%)
- Clear target market (SMBs, finance teams)
- Compelling value proposition ($10K-$100K+ saved annually)
- Realistic go-to-market strategy

### 3. **Completeness** (25%)
- Working end-to-end demo
- All 4 detectors functional
- Charts/visualizations working
- Error handling
- Sample data that showcases value

### 4. **Use of AMD Platforms** (25%)
- **CRITICAL:** Explicitly mention AMD integration
- Use AMD Developer Cloud for hosting/inference
- Use Fireworks AI (runs on AMD hardware)
- Use ROCm for GPU acceleration
- **Document this clearly in README and presentation**

---

## 🚀 Submission Checklist

Before you submit, verify:

- [ ] Project title is descriptive
- [ ] Short description is 600-2000 characters
- [ ] Long description is 100+ words and comprehensive
- [ ] All technology tags selected
- [ ] Cover image is 16:9 aspect ratio (PNG/JPG)
- [ ] Video demo uploaded (MP4, 2-5 min)
- [ ] Slide deck uploaded (PDF)
- [ ] GitHub repo is public
- [ ] README has setup instructions
- [ ] Live demo URL works without login
- [ ] Demo showcases ALL features with good sample data
- [ ] AMD platform usage is clearly documented
- [ ] Team registered on lablab.ai
- [ ] AMD AI Developer Program account created

---

## 💡 Pro Tips for LeakLogicAI

### Highlight Your Differentiators:
1. **Flexible Schema Mapping** - "Works with ANY CSV format"
2. **Multi-Source Analysis** - "Correlates 4 data types"
3. **AI Narrative** - "Plain English explanations, not just numbers"
4. **Production-Ready** - "FastAPI + React, scalable architecture"

### AMD Integration Story:
```
"LeakLogicAI leverages AMD's infrastructure at two levels:

1. **Narrative Generation:** Uses OpenRouter to access NVIDIA Nemotron, 
   which runs on AMD-powered infrastructure for cost-effective AI inference.

2. **Scalability Path:** Our pandas-based detectors are designed to scale 
   to AMD GPU acceleration using ROCm for processing large enterprise datasets 
   (10M+ transactions) in real-time.

3. **Deployment Ready:** Architecture supports deployment on AMD Developer 
   Cloud for production workloads."
```

### Demo Script (for video):
```
[0:00-0:30] "SMBs lose 10-30% profit but can't afford analysts. Meet LeakLogicAI."

[0:30-1:00] "Upload ANY CSV format - Shopify, Square, custom - our schema 
             mapper handles it all."

[1:00-2:30] [LIVE DEMO] Upload files → Show analysis → Highlight findings

[2:30-3:00] "AI explains each leak in plain English with specific $ impact"

[3:00-3:30] "Built on AMD infrastructure, ready to scale"

[3:30-4:00] "Target: 30M SMBs globally, $50-200/month SaaS"
```

---

## ⏰ Important Dates

- **Submission Deadline:** [Check event page - displayed in your timezone]
- **Manual Submission Window:** 6 hours post-deadline (with valid reason + organizer approval)

---

## 🎁 Gemma Bonus Prize ($2,000)

**Best AMD-Hosted Gemma Project** - Additional $2,000

### How to Qualify:
1. Use Google's Gemma model (via Fireworks AI or AMD Developer Cloud)
2. Gemma must have a meaningful role (not just a token mention)
3. Document Gemma usage in your README

### Gemma Integration Ideas for LeakLogicAI:
- **Replace OpenRouter with Gemma** for narrative generation
- Use **Gemma 4 27B-it** via Fireworks AI
- Highlight: "Uses Google Gemma 4 on AMD infrastructure via Fireworks"

**Quick integration:**
```python
# In narrative.py
import os
import requests

FIREWORKS_API_KEY = os.getenv("FIREWORKS_API_KEY")
FIREWORKS_BASE_URL = "https://api.fireworks.ai/inference/v1"

def generate_with_gemma(prompt: str) -> str:
    response = requests.post(
        f"{FIREWORKS_BASE_URL}/chat/completions",
        headers={"Authorization": f"Bearer {FIREWORKS_API_KEY}"},
        json={
            "model": "accounts/fireworks/models/gemma4-27b-it",
            "messages": [{"role": "user", "content": prompt}]
        }
    )
    return response.json()["choices"][0]["message"]["content"]
```

---

## 📞 Support Channels

- **AMD Discord:** https://discord.gg/mVUBbE5KjN (infrastructure questions)
- **lablab.ai Discord:** https://discord.gg/lablabai (submission help)
- **Email:** community@lablab.ai (submission issues)

---

## ✅ Final Checklist - Before Final Submission

- [ ] Test demo URL on incognito/different browser
- [ ] Verify video plays correctly
- [ ] Check PDF opens properly
- [ ] GitHub repo README is clear
- [ ] All links work
- [ ] Sample data shows impressive insights
- [ ] AMD usage is prominent in all materials
- [ ] Team is properly registered

---

## 🎉 Good Luck!

Remember: Track 3 has NO automatic scoring - judges evaluate creativity, 
completeness, AMD usage, and market potential. Tell a compelling story!

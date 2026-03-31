# 🏌️ Golf Charity Subscription Platform

A subscription-based web application that combines golf performance tracking, monthly reward draws, and charitable contributions.

> Play golf → Enter scores → Win rewards → Support charity ❤️

---

## 🚀 Features

### 👤 User Features
- 🔐 Authentication (Signup/Login)
- 💳 Subscription system (Monthly / Yearly)
- 📝 Enter and manage last 5 golf scores
- 🎲 Automatic entry into monthly draw
- 💰 View winnings and participation
- ❤️ Select charity and contribution percentage

---

### 🎯 Draw & Reward System
- Monthly draw with 5 generated numbers
- Match-based rewards:
  - 🏆 5 matches → Jackpot
  - 💰 4 matches → Mid-tier reward
  - 💸 3 matches → Small reward
- Jackpot rollover if no winner
- Prize pool auto-calculated from subscriptions

---

### ❤️ Charity System
- Minimum 10% contribution from subscription
- User selects preferred charity
- Track total donations

---

### 🛠 Admin Features
- Manage users & subscriptions
- Run and publish monthly draws
- Verify winners (proof upload)
- Manage charities
- View analytics (users, prize pool, donations)

---

## 🧠 How It Works

1. User subscribes to the platform
2. Enters last 5 golf scores
3. Each month:
   - System generates 5 numbers
   - Scores are matched
   - Winners are determined
4. Prize pool is distributed
5. Charity contribution is processed

---

## 🧱 Tech Stack

- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Node.js / Next API Routes
- **Database:** PostgreSQL / MongoDB / Supabase
- **Auth:** JWT / Session-based
- **Payments:** Stripe
- **Deployment:** Vercel

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/patel-tejas/GolfElite.git
cd GolfElite
npm i
npm run dev

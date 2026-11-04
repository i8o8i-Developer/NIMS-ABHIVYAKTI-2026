# Antigravity Agent Coding Standards & Architecture Guidelines

> **Mandatory Rule For All AI Agents Working On The Abhivyakti Platform**  
> Every automated agent, pair programmer, subagent, and developer contributing to this repository must strictly adhere to the case conventions, styling rules, and architectural patterns defined below.

---

## 1. File & Directory Casing Conventions

### **PascalCase For All Files & Folders**
All newly created or renamed files and folders must use **PascalCase**.

- **Folder Structure Examples:**
  - `Frontend/`
  - `Frontend/Src/`
  - `Frontend/Src/Components/`
  - `Frontend/Src/Components/Leaderboard/`
  - `Frontend/Src/Components/Admin/`
  - `Frontend/Src/Components/Ui/`
  - `Backend/`
  - `Backend/App/`
  - `Backend/App/Routers/`
  - `Backend/App/Models/`
  - `Backend/App/Schemas/`

- **File Name Examples:**
  - `App.tsx`
  - `LeaderboardTable.tsx`
  - `Podium.tsx`
  - `RulebookPdfModal.tsx`
  - `CompetitionRouter.py`
  - `Database.py`
  - `CodingStandards.md`

- **Permitted Ecosystem Exceptions:**
  Only standard tooling configuration files that mandate exact lowercase names by their respective compilers, bundlers, or runtimes are exempt:
  - `.gitignore`, `.dockerignore`, `.env`, `.env.example`
  - `package.json`, `package-lock.json`, `tsconfig.json`, `tsconfig.node.json`
  - `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`
  - `docker-compose.yml`, `Dockerfile`
  - `requirements.txt`

---

## 2. Text, Comments, Logs & Error Formatting

### **Title Case Everywhere In Code & Interfaces**
To maintain executive polish and uniformity across all user interfaces, developer consoles, and codebase documentation, **Title Case** formatting is mandatory for:

#### **A. User-Visible UI Text**
- **Headings & Subheadings:**
  - `Celebrating Cultural Majesty & Excellence`
  - `Colleges & Contingents Management`
  - `Abhivyakti 2026 Official Festival Rulebook`
- **Buttons & Action Triggers:**
  - `Explore Competitions`
  - `View Leaderboard`
  - `View Full Rulebook (PDF)`
  - `Open In New Tab`
  - `Direct Download`
  - `Authenticate & Access Deck`
- **Form Labels & Placeholders:**
  - `Search College Or Code...`
  - `Directorate Email Address`
  - `Secure Staff Password`
- **Table Column Headers:**
  - `Rank` | `Institute & Faculty` | `Gold 🥇` | `Silver 🥈` | `Bronze 🥉` | `Events` | `Championship Points`
- **Toast Notifications & Alerts:**
  - `Score Updated Successfully`
  - `Rulebook Download Initialized`
  - `Authentication Failed: Invalid Credentials Provided`

#### **B. Code Comments (Single-Line & Multi-Line)**
All comments written inside TypeScript, JavaScript, Python, CSS, and HTML files must be in **Title Case**.
- **Correct Single-Line Comment:**
  ```typescript
  // Harmonious Search Header Bar With Obsidian Velvet Gradient
  // Calculate Cumulative Championship Points Across All Arenas
  ```
- **Correct Multi-Line Comment:**
  ```typescript
  /**
   * Harmonious Jewel-Tone Avatar Palettes Matching The Royal Festival Aesthetic.
   * Maps College Codes And Ranks To Deep Velvet Colors.
   */
  ```
- **Incorrect:**
  ```typescript
  // calculate points
  /* table search filter function */
  ```

#### **C. Console Logs & Debug Statements**
Every `console.log`, `console.info`, `console.warn`, and `console.error` message must be written in **Title Case**:
- **Examples:**
  ```typescript
  console.log("Festival Schedule Loaded Successfully");
  console.info("Realtime WebSocket Connection Established");
  console.error("Failed To Stream Master Rulebook PDF: Network Timeout");
  ```

#### **D. Thrown Exceptions & Error Messages**
All error descriptions, exceptions, and API error responses must use **Title Case**:
- **TypeScript / JavaScript:**
  ```typescript
  throw new Error("Unable To Locate Specified College Standing In Leaderboard");
  ```
- **Python / FastAPI:**
  ```python
  raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Competition Record Not Found In Directorate Registry"
  )
  ```

#### **E. Git Commit Messages**
Every Git commit message must be formatted in **Title Case** with clear, descriptive terminology:
- **Correct:**
  - `Harmonize Leaderboard Table Colors And Add Antigravity Coding Standards`
  - `Refactor Rulebook PDF Modal With Ambient Fallback And Direct Download Actions`
  - `Update Competition Roster Seed Data To Match Master Rulebook Schedule`
- **Incorrect:**
  - `fix table colors and add rules`
  - `updated rulebook modal`

---

## 3. Visual Design System & Color Palette

### **The Royal Indian Cultural Festival Aesthetic**
The application adheres to an executive, royal, midnight festival aesthetic blending traditional Indian celebration colors with modern obsidian glassmorphism.

#### **Core Color Foundations:**
- **Obsidian Velvet Canvas:**
  - Base Background: `#080104` to `#0d0106`
  - Elevated Surface: `from-[#1c030d] via-[#140209] to-[#1c030d]`
  - Modal / Card Surface: `from-[#18030c] via-[#0f0107] to-[#090104]`
  - Header / Accent Strip: `from-[#220412] via-[#19020d] to-[#220412]`
- **Imperial Gold & Amber Accents:**
  - Borders: `border-amber-500/35` or `border-amber-400/50`
  - Primary Text: `text-amber-200`, `text-amber-100`
  - Highlight Badges: `bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black`
  - Glowing Shadows: `shadow-[0_0_25px_rgba(245,184,66,0.25)]`
- **Harmonious Jewel-Tones (Badges & Avatars):**
  - **Rank 1 Gold:** `bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 text-black border-yellow-200`
  - **Rank 2 Silver:** `bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 text-slate-900 border-white`
  - **Rank 3 Bronze:** `bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 text-white border-amber-400/50`
  - **Deep Ruby:** `from-[#38081a] to-[#1f030e] text-rose-200 border-rose-500/40`
  - **Emerald Velvet:** `from-[#062c26] to-[#021815] text-emerald-200 border-emerald-500/40`
  - **Royal Amethyst:** `from-[#2a0e42] to-[#150624] text-purple-200 border-purple-500/40`

#### **Disallowed Clashing Styles:**
- **No Stark Cold Navy Slates:** Avoid `#0b1c2e`, `#0e162e`, `#0c1830` in background gradients or cards.
- **No Flat Neon Yellows:** Always use rich metallic gold gradients (`from-amber-300 to-yellow-500`).
- **No Harsh White Blocks:** Always soften bright elements with warm gold or amber translucency.

---

## 4. Layout & Mobile Responsiveness (280px Minimum)

- **Universal Responsiveness:**
  Every component, modal, table, and grid must gracefully render on viewports down to **280px** width (e.g., Galaxy Fold collapsed) up to ultra-wide 4K screens.
- **Zero Horizontal Overflow:**
  No component may introduce unexpected horizontal scrollbars (`overflow-x: hidden` on page roots, responsive wrapping with `flex-wrap` and `grid-cols-1`).
- **Component Breathing Room:**
  Ensure ample vertical spacing (`space-y-6 sm:space-y-8`) so floating decorative elements (diyas, sparks, floating cards) never collide or obscure critical text or countdown timers.

---

## 5. Summary Quick-Reference Card

| Category | Standard | Example |
| :--- | :--- | :--- |
| **Folder Names** | PascalCase | `Frontend/Src/Components/Leaderboard/` |
| **File Names** | PascalCase | `LeaderboardTable.tsx`, `RulebookPdfModal.tsx` |
| **UI Headings** | Title Case | `Colleges & Contingents Management` |
| **Button Text** | Title Case | `View Full Rulebook (PDF)` |
| **Table Headers** | Title Case | `Championship Points` |
| **Code Comments** | Title Case | `// Calculate Total Points Across All Categories` |
| **Console Logs** | Title Case | `console.log("Festival Schedule Loaded Successfully")` |
| **Error Messages** | Title Case | `throw new Error("Unable To Connect To Server")` |
| **Git Commits** | Title Case | `git commit -m "Harmonize Table Colors And Modal Themes"` |

---

*This document is automatically referenced by Antigravity agents during code generation, editing, refactoring, and code review.*


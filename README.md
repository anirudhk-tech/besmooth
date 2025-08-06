# AI “Rizz Coach” — MVP Spec

## 1. Validation Features (must-ship)
| # | Feature | Scope | Success Signal |
|---|---------|-------|----------------|
| 1 | **Voice + Text Chat** | 1 polished 3D avatar (Unity/ThreeJS inside Expo-GL). Gemini free API for NLP. Mic → STT → LLM → TTS. | ≥ 3 min avg session length |
| 2 | **Rizz Score & Feedback** | At chat end, calculate **Confidence / Humor / Flow** (0-10) via prompt-only rubric. Return top-3 improvement tips with examples. | ≥ 70 % users view feedback screen |
| 3 | **Free-Tier Quota** | 1 conversation per user per day (reset UTC-midnight). Prompt upgrade modal if limit hit. | ≥ 30 % users hit limit in week-1 |
| 4 | **Shareable Score Card** | Auto-generate PNG with avatar headshot, score bars, “Beat my Rizz” text, deep-link QR. | ≥ 15 % sessions → share action |

## 2. Moat-Seeding Features (differentiation hooks)
| # | Feature | Scope | Future Lever |
|---|---------|-------|--------------|
| 5 | **Personality Vault** | Grid of 4 avatars → 1 unlocked, 3 gray silhouettes. Each shows required stat & level. | Expands into paid character packs |
| 6 | **Streaks & Ranks** | Daily streak counter + XP bar. Ranks: Bronze 0-99 XP → Silver 100-249 → Gold 250+. | Drives retention; gate new avatars |
| 7 | **Stat Tracking** | Persistent bars for Confidence / Humor / Flow. Increment on each chat via rubric deltas. | Basis for adaptive coaching engine |

---

## 3. Expo App Architecture

### 3.1 Tech Stack
- **Frontend:** Expo (React Native 0.74), TypeScript, React Navigation v7, Expo-Speech (TTS), Expo-AV (audio), expo-three + gl-react for avatar render.
- **Backend:**  
  - **Edge Functions (Supabase / Cloudflare Workers)** for Gemini calls + scoring prompt.  
  - PostgreSQL (Supabase) for users, sessions, stats.
- **Real-time:** Supabase Realtime (optional) for leaderboards.

### 3.2 Folder Structure
/src

/assets // images, GLTF, fonts

/components // UI atoms & molecules

/features

/chat // screens + hooks

/score

/vault

/lib // api, auth, analytics wrappers

/state // zustand stores

/navigation // stack & tab configs

/utils // helpers (validators, formatters)

app.config.ts // Expo app metadata

### 3.3 Core Patterns
| Concern | Pattern |
|---------|---------|
| **API Calls** | `fetcher.ts` w/ typed wrappers + react-query (TanStack). |
| **LLM Requests** | Server proxy only (never call Gemini from device). |
| **State** | zustand slices per feature → combined in `/state/index.ts`. |
| **Avatar Render** | Single `<Avatar3D />` component loads GLTF + lip-sync visemes. |
| **Error Handling** | `ErrorBoundary` HOC + toast (sonner). |
| **Analytics** | posthog-react-native; wrap events in `analytics.ts`. |

---

## 4. Naming & Coding Conventions

| Area | Rule |
|------|------|
| **Files/Folders** | `kebab-case` for folders, `PascalCase.tsx` for React components. |
| **Components** | UI-only → suffix `View`; smart/container → suffix `Screen`. |
| **State Stores** | `use<Feature>Store.ts` (e.g., `useChatStore`). |
| **Types** | In `/types/<feature>.ts`; exported interfaces start with capital `I` (e.g., `IChatMessage`). |
| **Env Vars** | Prefix backend only vars with `SERVER_`; client-safe with `EXPO_PUBLIC_`. |
| **Commits** | Conventional Commits (`feat:`, `fix:`, `chore:`). |
| **Branches** | `feature/<short-desc>` or `fix/<short-desc>`. |
| **Pull Requests** | Must link issue, include screenshot/GIF. |

---

## 5. Direction Checklist (stay on rails)

- [ ] **Week 1**: Skeleton Expo app, navigation, mock avatar screen.
- [ ] **Week 2**: Voice pipeline (mic → Gemini → TTS), score rubric prototype.
- [ ] **Week 3**: Vault UI + streak logic + Supabase tables.
- [ ] **Week 4**: Shareable score card, upgrade modal, analytics events.

Ship fast, measure, iterate. Rizz or bust. 🚀

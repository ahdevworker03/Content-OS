# Instagram Reel Script — MovieShelf Learning Journey

**Duration:** ~55 seconds
**Language:** Arabic (Lebanese dialect) with English technical terms
**Tone:** Honest student reflection, not teaching
**Format:** Talking head + screen recording clips

---

## SCRIPT

| Time       | Visual / Action                                                                                                                                                                        | Audio (Arabic)                                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **0–3s**   | **HOOK** — Close-up: me staring at VS Code, confused. Screen shows a messy `useEffect` with `setTimeout`/`clearTimeout`. Text overlay: "3 ساعات عم أحاول أفهم الـ debounce � debounce" | \*(Upbeat lo-fi beat starts)**\*أنا:** "يا زلمة، 3 ساعات وأنا عالـ debounce هيدا... بدون library، بس بـ useEffect و useRef."                                      |
| **3–7s**   | Cut to: me at desk (messy, coffee cup visible). Quick zoom on screen: search input typing fast, dropdown flickering.                                                                   | **أنا:** "كنت فاكر إنها سطرين كود... طلعت رحلة مع stale closures و timers ما بتتنظف."                                                                             |
| **7–12s**  | Screen recording: typing in search → suggestions appear → press Enter → different results load in grid. Text: "Two-tier search UX"                                                     | **أنا:** "بعدين اكتشفت إنو في فرق كبير بين _suggestions_ (Debounced، فورية) و _submitted results_ (صريحة، لما أضغط Enter)."                                       |
| **12–18s** | Me talking to camera (handheld, natural). Background: dorm/library corner visible.                                                                                                     | **أنا:** "الفكرة مش إنو بكتب كود نظيف... الفكرة إنو _فهمت ليش_ فصلون voneinander. الـ suggestions للـ speed، والـ results للـ control."                           |
| **18–25s** | Screen:`useReducer` code — `ADD_TO_WATCHLATER` action, duplicate check with `.some()`. Then `localStorage` sync `useEffect`.                                                           | **أنا:** "والأصعب؟ إنو الـ watchLater والـ watched يفضلوا محفوظين بالـ localStorage _و_ يفلترولي الـ search results تلقائيًا."                                    |
| **25–32s** | Me laughing slightly, shaking head. Cut to: GitHub Actions workflow deploying to GitHub Pages. Text: "404.html redirect hack"                                                          | **أنا:** "وآخرتها... deploy على GitHub Pages. الـ SPA ما بيشتغل direct links. عملت `404.html` يحط المسار بـ sessionStorage ويريديركت للـ root."                   |
| **32–38s** | Close-up: Error Boundary class component code.`getDerivedStateFromError` + `componentDidCatch`.                                                                                        | **أنا:** "أول مرة أستخدم class component بسنين... بس الـ Error Boundary _محتاجة_ class. شدّني هالشي — مو كل القديم 'deprecated'."                                 |
| **38–45s** | Me at desk again, typing. Screen shows final app working: search, add to watchlist, mark watched.                                                                                      | **أنا:** "المشروع مش كامل، بس تعلمت: فصل _domain state_ (reducer) عن _UI state_ (useState)، memoizing context value، و إنو الـ bugs تعلمك أكتر من الـ tutorials." |
| **45–52s** | Walking shot: leaving library/campus, phone in hand checking deployed site.                                                                                                            | **أنا:** "MovieShelf — أول React project حقي.次の step؟ TypeScript، testing، وكتير أخطاء تانية... بس هيدي البداية."                                               |
| **52–55s** | End frame: Logo/handle. Text: "ببني بتعلم                                                                                                                                              | #CSStudent #React #LearningInPublic"                                                                                                                              |

---

## PRODUCTION NOTES

### Required Clips (Environment Mandate)

1. **Messy desk / dorm / library** — at least 2 clips showing student reality
2. **VS Code / Terminal close-ups** — actual code, not stock footage
3. **Phone checking deployed site** — real device, real URL
4. **Walking on campus** — establishes Lebanese student context

### Technical Terms (Keep in English)

- `debounce` / `useEffect` / `useRef` / `stale closures`
- `suggestions` vs `submitted results`
- `useReducer` / `localStorage` / `dispatch`
- `GitHub Pages` / `SPA` / `404.html redirect`
- `Error Boundary` / `class component` / `getDerivedStateFromError`
- `domain state` / `UI state` / `memoizing context`

### Lebanese Touches

- "يا زلمة" (natural opener)
- "حقي" (mine)
- "مش كاملة" (not complete)
- Ending with 🇱🇧 flag emoji in caption

### Caption (Arabic)

```
أول React project حقي: MovieShelf 🎬

تعلمت أكتر من الـ bugs من الـ tutorials:
• Debounce بدون library (3 ساعات صراع 😅)
• Two-tier search: suggestions vs submitted results
• useReducer + localStorage sync
• GitHub Pages SPA workaround مع 404.html
• Error Boundary = المكان الوحيد اللي class component لازمنة هلا

المشروع مش كامل، بس الرحلة بدأت.
ببني بتعلم 🇱🇧

#CSStudent #React #LearningInPublic #Lebanon #MovieShelf
```

### Hashtags

`#CSStudent` `#React` `#LearningInPublic` `#Lebanon` `#MovieShelf` `#WebDev` `#StudentDeveloper`

---

## TIMING CHECK

- Spoken Arabic ~160 words → ~55 seconds at natural pace
- Leaves 5s buffer for transitions/pauses
- Fits 60s limit comfortably

# Change Management Playbook — *Be the Imam: Steps of Muḥammad ﷺ*

**Status:** Draft v0.1 · 22 Oct 2026 · for discussion, not yet validated with any masjid or ustaz.

---

## 1 · The change, in one sentence

**From:** reciting what we inherited, by rote, without knowing the source or the meaning.
**To:** reciting what we understand, at the hour the Sunnah ties it to, with a source we can check.

This is a *habit and trust* change, not a technology change. The app is the vehicle. The thing being
adopted is a way of doing the practices people already do.

### What we are **not** asking people to do
- Abandon tahlil, Yāsīn Thursday, Rātib al-Ḥaddād or any practice they inherited.
- Accept our grading over their teacher's. The app shows the grade and the debate; the reader decides.
- Replace the imam, the halaqah, or the madrasah. The app serves all three.

Hold this line in every conversation. In Nusantara communities the quickest way to lose a masjid committee
is to sound like a campaign against local practice. The README's "we do not preach, we present" is the
right stance: put it in the first slide of every pitch.

---

## 2 · Who has to change, and what's in it for them

| Stakeholder | Their job-to-be-done | What the app gives them | What they fear | How to win them |
|---|---|---|---|---|
| **Imam / ustaz** | Lead worship credibly; answer "is this authentic?" | A citeable source and grade for every duʿā, ready for post-ṣalāh and khutbah use | Being seen to endorse something doctrinally risky; being replaced by an app | Ask for review, not endorsement. Make them the *validator* of the content they use. |
| **Masjid committee (AJK / jawatankuasa)** | Keep the masjid active, relevant to youth, low-effort to run | A ready programme, a QR code on the notice board, no new infrastructure | Cost, extra admin, controversy | Free, no accounts, no hosting. One-page pilot proposal. |
| **Madrasah / Qurʾān class teachers** | Teach recitation with meaning | Word-by-word Arabic + gloss + transliteration; four reading modes | Another tool to learn | A 15-min teacher kit; classroom projector mode (§6). |
| **Working professionals (25–45)** | Fit worship around a packed day | The prophetic clock: "it is now — here is what he ﷺ said at this hour" | Another app they won't open | Tie to an existing anchor (after ṣalāh), not to "open the app". |
| **Youth / students** | Understand, not just imitate | Provenance, word meanings, honest grading | Boredom, lecturing | Learner mode; challenge format; no sermon tone. |
| **Reverts (muallaf) and Arabic learners** | Pray and make duʿā with confidence | Transliteration + meaning, offline | Embarrassment at not knowing | Beginner starter plan; a class built around it. |
| **Elderly / parents** | Keep their routine; pass it on | Large Arabic-only mode; same duʿās they already say | Small text, English-only UI | Be the *grandchild-helps-grandparent* tool; Bahasa UI (§6). |

**Primary persona to design the pilot around:** the post-Maghrib / post-ʿIshāʾ congregation of one masjid,
led by an imam who has reviewed the cards. That is the only place all five stakeholders are in one room.

---

## 3 · Where the app sits in a Muslim's day

The strongest lever is **habit stacking**: do not ask for a new time slot, attach to an existing anchor.

| Daily moment | Existing behaviour | What the app does | Entry point |
|---|---|---|---|
| **Hearing the adhān** | Pause, repeat, make duʿā | Shows the adhān response + duʿā | Action view, current slot |
| **After each farḍ ṣalāh** (5×/day) | Short dhikr, often by rote | *The anchor.* The post-ṣalāh sequence, with reps | Post-ṣalāh slot |
| **Morning / evening** | Adhkār, if remembered | Morning & Evening Shields at the right window | Clock window |
| **Start of work** | Nothing | "Path of Work" duʿās | Compendium |
| **Before sleep / night** | Variable | Night adhkār, last-third tahajjud for those who wake | Night windows |
| **Travel, eating, illness, distress** | Search or ask someone | Lookup by need | Compendium (Ḥiṣn-style) |
| **Weekly / seasonal** | Thursday night tahlil, Rajab, Shaʿbān, Ramaḍān | Sacred Months, Tahlīl Collections | Compendium |

**Product insight worth defending:** the clock answers "what did he ﷺ do *now*", while Compendium answers
"what do I say when *X*". Together they cover both the planned and the unplanned. Most competitors do only the second.

The **editable plan** (`web/plan.js`) is the real workflow feature. It turns a library into *my* routine.
That is what makes someone come back. The pitch should say "build your daily plan", not "browse our collection".

---

## 4 · Rollout: ADKAR mapped to phases

Using ADKAR (Awareness → Desire → Knowledge → Ability → Reinforcement) because it works at the
individual level, which is where this change actually happens.

### Phase 0 · Foundation (now → ~early Dec 2026)
*Goal: be safe to put in front of an imam.*
- [ ] Name 1–2 ustaz as informal **content reviewers**; agree a turnaround and a "reviewed by" convention.
- [ ] Decide the **pilot language**: if the congregation is Malay/Indonesian-speaking, an English-only UI is the biggest blocker (§6).
- [ ] Add a **"Report an error"** link on every card (pre-filled GitHub issue or a form).
- [ ] Add Umami events so the pilot can be measured (§7). Add a short, plain **privacy note** ("anonymous, no cookies, no accounts").
- [ ] Write the **one-page pilot proposal** for a masjid committee.
- [ ] Recruit **5 friendly users** and watch them use it unprompted. Fix what confuses them.

### Phase 1 · Single-masjid pilot (~mid Dec 2026 → Ramaḍān)
*Timing: Rajab begins roughly mid-Dec 2026, Ramaḍān roughly early Feb 2027, both subject to moon sighting.
The Rajab–Shaʿbān run-up is a natural, low-pressure window to prepare, and the app already has a Sacred Months category.*
- **Awareness:** imam announces after a ṣalāh; QR on the notice board and at the shoe rack; WhatsApp group message in plain language.
- **Desire:** a 40-day challenge, "Prophetic Clock: 5 minutes after ṣalāh" (see §5).
- **Knowledge:** a 20-minute live demo after ʿIshāʾ on a projector. Show Action view and one duʿā word-by-word.
- **Ability:** 'install to home screen' help desk (volunteers with phones); starter plan pre-loaded.
- **Reinforcement:** weekly "duʿā of the week" in the group chat; a Friday shout-out; imam references a card in a khutbah.

### Phase 2 · Ramaḍān wave (~early Feb → Mar 2027)
*Goal: ride the season of highest religious motivation.*
- Ramaḍān-specific plan (tarāwīḥ, last ten nights, laylat al-qadr duʿā) as a one-tap shareable plan.
- 2–3 more masjids, introduced by the pilot imam. Peer endorsement beats any pitch from us.

### Phase 3 · Scale and sustain (Apr 2027 →)
- Teacher kit for madrasahs and halaqah. Masjid "playbook in a box" (poster, QR, 1-page guide, slide deck).
- Contributor pipeline for content: ustaz and students can propose a card without Git (§6).
- Quarterly content review; a visible changelog.

---

## 5 · Programme menu

Pick two for the pilot, not all. Each is small and runs without new infrastructure.

| Programme | Format | Audience | Effort |
|---|---|---|---|
| **40-Day Prophetic Clock** | One new duʿā every few days; daily 5 min after a chosen ṣalāh; group chat check-in | Working adults | Low |
| **Duʿā of the Week** | One card projected after Jumuʿah or Maghrib; QR on screen | Whole congregation | Very low |
| **Understand Your Ṣalāh** | 4–6 week class using word-by-word cards for opening duʿā, tashahhud, post-ṣalāh | Reverts, learners, parents | Medium |
| **Family Circle** | 10 min after Maghrib, one family member "is the imam" for the household (this is the intended meaning of *Be the Imam*) | Families | Low |
| **Sacred Months Series** | Rajab → Shaʿbān → Ramaḍān weekly sessions | Congregation | Medium |
| **Halaqah Kit** | Facilitator guide + slides for any teacher | Teachers | Medium, build once |
| **Ask the Source night** | Q&A where participants bring a duʿā they inherited and trace its source in the app, with the ustaz moderating | Curious, youth | Medium; best done after trust exists |

**A naming point:** *Be the Imam* can read as challenging the masjid's imam. Frame it everywhere as
"imam of your own prayer and household", and say so on the poster.

---

## 6 · Product readiness: what the app needs to be a real workflow augmentor

*These come from reading the code and docs, not from user testing. Treat them as hypotheses and confirm by
watching real users in Phase 0. Check each against the live UI before building, since some may already exist.*

### P0 — needed before a masjid pilot
| Gap | Why it matters | Notes |
|---|---|---|
| **Language (Bahasa Indonesia / Malay)** | The README lists multi-language UI as Phase 6. For a Nusantara congregation it is probably the single largest barrier, especially for older members. | Translate UI strings first; translations of cards can follow gradually. |
| **First-run onboarding (≈60 s)** | A new user must reach value in one minute: allow location (the clock needs it) → pick a starter plan → add to home screen. | Starter plans: *Minimum* (3 duʿās), *Daily* (post-ṣalāh + morning/evening), *Learner*. |
| **Per-card QR codes + printable poster** | Cards are already deep-linkable (`web/render.html?file=…`). A QR on the notice board is the cheapest distribution there is. | Generator script in `tools/`. |
| **"Report an error" + reviewer attribution** | Trust is the product. Visible reviewer names and a correction path matter more than any new feature. | Reuse the existing "In Review" category. |
| **Pilot analytics events** | Without them you cannot tell adoption from curiosity. | See §7. |

### P1 — makes it sticky
| Gap | Why it matters |
|---|---|
| **Congregation / projector mode** | Full-screen large Arabic, advance through a slot's sequence with one tap. Lets the imam run post-ṣalāh dhikr from the app. Likely the highest-value feature for masjid adoption. |
| **Shareable plan link** | A masjid publishes "Masjid X after-ʿIshāʾ plan" as a URL that loads into a user's slot. This is your distribution mechanic. Plans live in `localStorage`, so this means encoding the plan in the link. |
| **Reminders** | Habits need a nudge. Web push on installed PWAs works on Android and on iOS 16.4+ but needs a push server. A serverless alternative is an **.ics calendar export** of the plan at prayer times. |
| **Tap counter with haptics + screen wake lock** | Cards already carry `reps`. A counter that keeps the screen awake makes tasbīḥ hands-free. |
| **Large-type / elder mode** | Arabic-only mode exists. Verify the type size, tap targets and contrast for older users. |

### P2 — later
| Gap | Why it matters |
|---|---|
| **Audio with word highlighting** (README Phase 5) | The biggest unlock for those who cannot read Arabic, and for correct pronunciation. Needs a reciter and a rights decision. |
| **Private streaks** | Gentle, local-only. **No public leaderboards or sharing**, because of the real risk of riyāʾ (showing off). Reinforce intention, not score. |
| **Non-technical contribution path** | The Git workflow excludes most ustaz. A simple form that produces a draft card for review widens the contributor base. |

### Engineering hygiene (not user-facing, but a trust risk)
- `cdn.tailwindcss.com` is the development build and not meant for production. Fine for now, but plan to compile Tailwind so the shell is smaller and the offline experience is robust on poor masjid Wi-Fi.
- Bus factor: content, UI and review all run through one maintainer. Governance (§8) is as important as code.

---

## 7 · How we'll know it's working

**Leading (behaviour):** measured with Umami, anonymous.
| Metric | Why |
|---|---|
| Weekly active users per masjid (use a `?src=` tag per QR) | Adoption |
| Day-7 and Day-30 return rate | Habit formed vs. curiosity |
| Visits clustered **within ~15 min after prayer times** | Shows it is used as the *anchor*, which is the actual hypothesis |
| Share of sessions opening Action view vs. Compendium | Is the clock/plan being used, or just the library? |
| PWA installs; plan edits; reading-mode changes | Depth of ownership |

Suggested events to add: `install-clicked`, `plan-edited`, `slot-opened`, `mode-changed`, `error-reported`.

**Lagging (outcome):** collected by hand.
- 5 short interviews at the end of the pilot: *What did you do differently? What would you miss if it went away?*
- Ustaz feedback: any card they asked to change or remove, and why.
- Committee decision: continue, expand or stop.

**Pilot success bar (suggested, adjust to your masjid's size):** 30+ regular users, ≥40% still active at Day 30,
zero unresolved content disputes, and the imam willing to introduce it to a second masjid.

---

## 8 · Risks and how to hold them

| Risk | Likelihood | Mitigation |
|---|---|---|
| Seen as attacking local tradition | **High** | Lead with "your practice, with its source"; never use the word "bidʿah" in promotional material; give contested items the existing balanced note; get an ustaz in the room. |
| A wrong grade or mistranslation goes live | Medium | Reviewer sign-off before publishing; visible report link; fast, public correction. One error can cost more credibility than ten features gain. |
| "App-ification" of worship (gamification, riyāʾ) | Medium | No public streaks or leaderboards. Keep the app out of the way during ṣalāh itself. |
| Adoption fades after the novelty | **High** | Anchor to ṣalāh; weekly rhythm in the group chat; imam reinforcement; reminders. Plan for Day-30 drop-off from the start. |
| Single maintainer | Medium | Recruit a second maintainer and 2 reviewers by the end of Phase 1; document the release process. |
| Language barrier excludes the target group | Medium–High | Decide the pilot language in Phase 0, before anything else. |
| Privacy concerns about analytics | Low | Plain-language note; cookieless, no accounts; no personal data. |

**Governance (lightweight):** a named content lead; 1–2 reviewing ustaz; a public changelog; a monthly 30-minute review of reports and analytics.

---

## 9 · Next 30 days

1. Choose the pilot community and language.
2. Approach one ustaz and ask for a content review. Don't ask for an endorsement yet.
3. Add "Report an error", Umami events and the privacy note.
4. Write the one-page pilot proposal and the poster.
5. Run 5 observed first-use sessions; fix the top three friction points.
6. Decide the programme(s) for the pilot from §5.

---

## Open questions (these change the plan)

1. **Who is the first community?** Which masjid or group, in which country, and what language do they use day to day?
2. **What counts as success for you?** Number of users, depth of habit, scholarly credibility, or a model other masjids can copy?
3. **Do you already have a relationship with an imam or ustaz** who could review content?
4. **Capacity:** how many hours a week can you and any helpers give? That decides how many programmes and P0/P1 items are realistic.
5. **Is the content open to review and edit by others?** The README says "freely reused": confirm that's the intent before inviting contributors.

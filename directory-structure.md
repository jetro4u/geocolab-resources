When working on app directory features, follow this folder structure:

## CORE STRUCTURE (REQUIRED)
- `api/` → API concerns (hooks, services, types, models)
- `components/` → UI components (ui/, views/, forms/)
- `route.tsx` → react-router route configuration

## OPTIONAL STRUCTURE (CREATE AS NEEDED)
- `contexts/` → React contexts (grouped by feature)
- `hooks/` → General React hooks (non-API hooks)
- `lib/` → Utilities and constants
- `types/` → Frontend-specific types

## PLACEMENT GUIDELINES

### API Directory (`api/`)
- `api/hooks/` → TanStack Query hooks, data fetching
- `api/services/` → Raw API functions, HTTP clients
- `api/types/` → API response types, request payloads
- `api/models/` → Data transformation, factory functions

### Components Directory (`components/`)
- `components/views/` → Page-level components, main views
- `components/ui/` → Reusable UI components, design system
- `components/forms/` → Form components, input controls

### Optional Directories
- `contexts/{feature}/` → Feature-specific contexts
    - `Context.ts` → Context definition
    - `Provider.tsx` → Context provider component
    - `useContext.ts` → Context hook
- `hooks/` → Custom React hooks (non-API)
- `lib/utils/` → Helper functions, formatters
- `lib/constants/` → App constants, configurations
- `types/` → Component props, form states, frontend types

## AI AGENT GUIDANCE

**File Placement Decision Tree:**
1. **API-related?** → `api/` (always create this folder)
2. **UI Component?** → `components/` (always create this folder)
3. **route?** → `route.tsx` (always create this route file)
4. **React context?** → `contexts/` (create if multiple contexts exist)
5. **Custom hook?** → `hooks/` (create if multiple hooks exist)
6. **Utility function?** → `lib/` (create if utilities are substantial)
7. **Frontend type?** → `types/` (create if types are complex)

**When to create optional folders:**
- Create `contexts/` when you have 2+ context providers
- Create `hooks/` when you have 3+ custom hooks
- Create `lib/` when you have utility functions beyond simple helpers
- Create `types/` when you have component props/state types separate from API types

**Folder Examples:**
```
✅ Good structure:
├── api/
│   ├── hooks/useContacts.ts
│   ├── services/contactsApi.ts
│   └── types/index.ts
├── components/
│   ├── views/ContactsView.tsx
│   ├── ui/ContactCard.tsx
│   └── forms/ContactForm.tsx
└── route.tsx

⚠️ Minimal structure (also acceptable):
├── api/
│   └── contactsApi.ts
├── components/
│   └── ContactsView.tsx
└── route.tsx
```

Follow this structure for consistent app development.

## SGS Directory

src/apps/sgs/
├── api/                              # API Layer
│   ├── hooks/
│   │   ├── useParticipantProfile.ts   # Fetch/update participant data
│   │   ├── useChallengeMetrics.ts     # Challenge-specific metrics
│   │   ├── useSocialSignals.ts        # X API social metrics
│   │   ├── useGrokAnalysis.ts         # Grok AI content analysis
│   │   └── useSheetsSync.ts           # Google Sheets integration
│   │   └── useMetricsIntegration.ts    # Metrics Integration
│   │
│   ├── services/
│   │   ├── xApiService.ts             # @dndhub/x wrapper
│   │   ├── grokService.ts             # Grok API client
│   │   ├── sheetsService.ts           # Google Sheets client
│   │   ├── metricsCalculator.ts       # GEOMetrics computations
│   │   └── signalScorer.ts            # Signal strength algorithm
│   │
│   ├── types/
│   │   ├── participant.types.ts       # Participant interfaces
│   │   ├── challenge.types.ts         # Challenge configs
│   │   ├── metrics.types.ts           # GEOMetrics subset
│   │   └── api-responses.types.ts     # API payloads
│   │
│   └── models/
│       ├── participantFactory.ts      # Transform API → UI
│       ├── metricsAggregator.ts       # Aggregate multi-source data
│       └── challengeBuilder.ts        # Challenge config builder
│
├── components/
│   ├── views/                         # Page-level components
│   │   ├── ChallengeCreatorView.tsx   # User-launched challenge setup
│   │   ├── OnboardingFlow.tsx         # Multi-step onboarding
│   │   ├── ParticipantDashboard.tsx   # Individual dashboard
│   │   ├── LeaderboardView.tsx        # Challenge leaderboard
│   │   ├── ProfileAuditView.tsx       # AI-powered profile review
│   │   └── AdminPanel.tsx             # Challenge management
│   │
│   ├── ui/                            # Reusable UI components
│   │   ├── SignalScoreCard.tsx        # Signal strength display
│   │   ├── MetricsChart.tsx           # GEOMetrics visualization
│   │   ├── CitationNetwork.tsx        # Network graph
│   │   ├── ProfileBadge.tsx           # Verification badges
│   │   ├── ActionLog.tsx              # Activity timeline
│   │   └── ProgressTracker.tsx        # Challenge milestones
│   │
│   └── forms/
│       ├── ChallengeConfigForm.tsx    # Challenge creation
│       ├── OnboardingForm.tsx         # Participant signup
│       └── ActionPlanForm.tsx         # Weekly action plan
│
├── contexts/
│   ├── challenge/
│   │   ├── ChallengeContext.ts        # Active challenge state
│   │   ├── ChallengeProvider.tsx
│   │   └── useChallengeContext.ts
│   │
│   └── participant/
│       ├── ParticipantContext.ts      # User profile state
│       ├── ParticipantProvider.tsx
│       └── useParticipant.ts
│
├── hooks/
│   ├── useSignalCalculator.ts         # Real-time signal scoring
│   ├── useChallengeTiming.ts          # Day-based logic
│   └── useMetricsPolling.ts           # Live metric updates
│
├── lib/
│   ├── constants/
│   │   ├── pointValues.ts             # Point system config
│   │   ├── signalWeights.ts           # Signal score weights
│   │   └── challengeTemplates.ts      # Pre-built challenge configs
│   │
│   └── utils/
│       ├── metricsFormatters.ts       # Display formatting
│       ├── signalAlgorithm.ts         # Core signal calculation
│       └── dataNormalizers.ts         # API response normalization
│
├── types/
│   ├── ui-state.types.ts              # Component state types
│   └── form-schemas.types.ts          # Zod validation schemas
│
└── route.tsx                          # React Router config

Embeded Timeline: <a class="twitter-timeline" href="https://twitter.com/geo_colab?ref_src=twsrc%5Etfw">Tweets by geo_colab</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

@mention: <a href="https://twitter.com/intent/tweet?screen_name=x&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-show-count="false">Tweet to @x</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

@follow: <a href="https://twitter.com/x?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @x</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
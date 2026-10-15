# Content Idea Capture Rules

## Purpose

Project agents automatically capture useful content opportunities from real work after the primary implementation, investigation, or task is complete and verified.

These captures are **raw source material for Content OS**. They are not publish-ready posts and must not replace the project's primary work.

The permanent destination is:

`/home/ahdevworker03/Abdallah Hassoun/Software Engineering/2- Projects/2- clients/content-os/content/ideas`

Each independently understandable content opportunity gets its own folder:

```text
content/ideas/
└── YYYY-MM-DD-<project>-<short-slug>/
    ├── idea.json
    └── optional supporting resources
```

Example:

```text
content/ideas/
└── 2026-10-13-markab-payment-query-performance/
    ├── idea.json
    ├── before.png
    ├── after.png
    └── query-example.ts
```

## When to Capture

Capture happens **after the current implementation/work unit is complete and verified**.

Normal sequence:

```text
work / investigate / implement
→ verify the result
→ consider the primary task complete
→ extract useful content opportunities
→ create idea folder(s)
→ finish
```

Do not interrupt implementation to write social content.

Do not ask the user whether an idea should be saved. Capture it automatically when it is reasonably useful.

The threshold is intentionally moderate. An idea does not need to be brilliant, unique, viral, or unusually deep. Useful everyday engineering, product, freelancing, client, university, workflow, and learning moments are valid source material.

Examples include, but are not limited to:

- a useful technical learning
- a debugging story or unexpected root cause
- an architecture or product decision
- a trade-off
- an approach that was considered and rejected
- a failed attempt that taught something
- a performance or reliability improvement
- a security or data-integrity lesson
- a meaningful feature or milestone
- a before/after improvement
- a client or freelancing lesson
- a workflow improvement
- a changed mental model
- a surprising result
- an implementation story that could teach or illustrate something

Routine work may still produce an idea if there is a useful story, decision, lesson, or result behind it.

## What the Project Agent Owns

The project agent is responsible for:

1. Detecting reasonable content opportunities from completed work.
2. Capturing each independently understandable idea automatically.
3. Recording enough factual context for another agent to understand the idea later without reconstructing the whole project.
4. Recording useful learning points, story points, and raw possible angles when they are evident.
5. Selecting and saving a small number of relevant supporting resources when useful.
6. Keeping resources concise, curated, and potentially usable in future published content.
7. Recording optional original source locations only when useful for traceability.

## What the Project Agent Does Not Own

The project agent must **not**:

- ask for approval before capturing an idea
- decide whether the idea should ultimately be published
- decide whether it is repetitive with previous content
- deduplicate or merge ideas across Content OS
- choose LinkedIn vs Instagram
- choose Instagram Carousel or LinkedIn post
- apply the user's brand identity or writing voice
- write the final post
- produce final carousel copy
- perform final hooks, CTAs, or platform optimization
- reject useful ideas merely because they are ordinary
- delay or distort engineering decisions to make them more publishable

Those responsibilities belong to Content OS.

## One Idea per Folder

Create one folder per **independently understandable content opportunity**.

A single implementation can legitimately produce multiple ideas.

Do not merge ideas merely because they came from the same task.

Do not artificially split one coherent idea into many trivial ideas.

A useful test:

> Could Content OS understand and develop this idea independently from the others?

If yes, it may deserve its own folder.

## `idea.json`

Every idea folder must contain `idea.json` conforming to `idea.schema.json`.

The important sections are:

- identity and capture time
- project context
- idea title/type/summary
- factual work context
- learning/story value
- raw possible angles
- resources
- optional notes

The schema intentionally keeps many context fields optional. Missing optional details must not prevent capture.

`idea.type` is free-form. Prefer a short descriptive category rather than forcing every idea into a fixed taxonomy.

`possible_angles` are raw framing possibilities only. They must not include platform selection or final branded copy.

## Resource Rules

Resources are **potential publishing/supporting material, not project backups**.

Capture the minimum useful set of assets that helps explain, prove, or visually support the idea later.

Good examples:

- one relevant screenshot
- a before/after screenshot pair
- a short extracted code snippet
- a small SQL example
- a concise terminal or test output
- a benchmark result
- a small log excerpt
- an error state
- a diagram
- a chart
- a small API response example
- a short config fragment
- a small diff or comparison
- another compact artifact that could realistically support a future post or carousel

Do not save excessive material such as:

- entire source files when a few lines are sufficient
- 50 lines of code when 5–10 lines communicate the point
- 10 similar screenshots when 1–2 are enough
- entire repositories
- large raw logs
- large terminal dumps
- unrelated debugging artifacts

When code is useful, create a small standalone file such as:

- `query-example.ts`
- `validation-example.ts`
- `before.sql`
- `after.sql`
- `response.json`

Include only the lines needed to communicate the idea.

The resource file lives in the idea folder. `idea.json` references the local resource by filename.

An optional `source` field may document where the original material came from inside the project, but the source path is for traceability only and does not replace the curated local resource.

## Factuality

Capture what actually happened.

Clearly preserve distinctions between:

- the original problem
- assumptions or initial thoughts
- investigation
- decisions
- implementation
- observed result
- learning or interpretation

Do not manufacture metrics, outcomes, causes, or lessons.

If an exact result is unknown, describe it without inventing a number.

## Security and Client Privacy

Never copy secrets or sensitive private data into Content OS.

Do not archive:

- passwords
- API keys
- access tokens
- cookies or session credentials
- private certificates
- `.env` secrets
- database credentials
- private customer/user data
- confidential client data that is unnecessary for the idea
- proprietary material beyond the small amount legitimately needed as supporting evidence

Sanitize screenshots, logs, responses, and code snippets before saving them when necessary.

## Failure Behavior

Content capture is secondary to the primary project task.

If the idea destination is unavailable or writing the capture would require risky/unrelated project changes, do not compromise the implementation. Report the capture failure succinctly at the end of the task so it can be fixed.

Otherwise, capture ideas automatically and do not ask for permission.

## Content OS Boundary

Content OS later owns:

```text
captured idea
→ review
→ deduplication / merging
→ brand fit
→ content strategy
→ platform choice
→ format choice
→ final angle
→ writing
→ design
→ validation
→ publishing preparation
```

Project agents only preserve authentic raw material from the work while the context is fresh.

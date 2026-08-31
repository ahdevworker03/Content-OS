# 01 — Idea Discovery

## Purpose

Discover, evaluate, and recommend high-potential content ideas grounded in real experience and aligned with the creator's brand strategy. This workflow identifies content opportunities from the creator's current learning journey, recent projects, and technical discoveries. It is responsible for idea generation and selection only — it does not plan content, write content, render, export, or archive.

---

## Scope

This workflow begins with user context, ongoing work, recent learning, project activity, or previously identified opportunities.

It ends when one or more recommended content ideas have been selected for Content Planning.

---

## Required Reading

- `framework/strategy/Brand View.md` — Creator identity, audience, content pillars, boundaries.
- `framework/memory/Posted Titles.md` — Published content index for duplication checking.

`framework/strategy/Brand Voice.md` should only be consulted if voice or platform considerations materially affect whether an idea is worth pursuing. Production and renderer documents are not required for idea discovery.

---

## Inputs

- **Current user context** — Where the creator is in their learning journey, what they are studying, and what is occupying their attention.
- **Recent projects** — Active or recently completed project work that could generate authentic content.
- **Learning experiences** — Lectures, tutorials, books, or courses the creator is currently engaged with.
- **Technical discoveries** — Bugs solved, concepts understood, tools learned, or workflows improved.
- **User notes** — Any thoughts, observations, or reflections the user provides.
- **Screenshots and code snippets** — Visual or code-based material that documents real experiences.
- **Questions the user recently explored** — Topics the creator investigated out of curiosity or necessity.
- **Previously published content** — Existing posts to reference for continuity or to identify gaps.
- **Framework strategy documents** — Brand View (required) and Brand Voice (when needed).

---

## Outputs

The workflow produces one or more recommended content ideas. Each recommendation must include, at minimum:

- **Working title** — A descriptive title for the proposed content.
- **Core idea** — One sentence summarising what the content is about.
- **Authentic trigger** — The real experience that inspired the idea.
- **Audience problem** — What the audience struggles with that this content addresses.
- **Expected audience value** — What the audience will learn or gain.
- **Suggested content pillar** — The pillar from Brand View this idea belongs to.
- **Suggested primary format** — Carousel, reel, story, or post.
- **Recommended platforms** — Which platforms the content should target.
- **Reason this idea is worth creating** — Why this specific idea matters now.
- **Confidence level** — How strongly the idea is recommended (high, medium, or exploratory).
- **Notes for Content Planning** — Context, warnings, or observations that will help workflow 02 evaluate the idea.

The selected recommendation becomes the official input for Content Planning.

**Optional persistence.** By default, recommendations are delivered in the conversation. If the user asks to save the ideas, write them to `content/ideas/<YYYY-MM-DD-short-topic>.md` as simple Markdown — never JSON, never a database. The file is a lightweight reference that Workflow 02 can later read when selecting an idea.

---

## Success Criteria

Idea Discovery is successful when all of the following are true:

- **Every idea is grounded in authentic experience.** No hypothetical or fabricated topics.
- **Every idea aligns with Brand View.** The content fits the creator's identity, audience, and pillars.
- **Duplicate topics have been avoided.** The posted-titles index was checked and no near-duplicate was selected.
- **Each idea solves a meaningful audience problem.** The content addresses something the audience genuinely struggles with or needs to understand.
- **Each recommendation has clear educational or practical value.** The audience will learn something useful or gain a new perspective.
- **The suggested format matches the depth of the topic.** A shallow observation is not proposed as a carousel, and a deep concept is not squeezed into a story.
- **The recommended platforms are appropriate.** Each platform is suited to the format and the audience expectation on that platform.
- **The rationale for selecting each idea is clear.** The reason the idea is worth creating is explicitly stated.
- **At least one recommendation is sufficiently developed to proceed into Content Planning.** The selected idea has enough substance for workflow 02 to evaluate and brief.

---

## Workflow

1. **Gather current context.** Collect all available input from the user — their current projects, learning focus, recent discoveries, and any notes or material they have shared.

2. **Review recent work and learning.** Identify the most interesting or significant experiences from the creator's recent activity. Look for bugs, breakthroughs, confusions, decisions, or concepts that could anchor authentic content.

3. **Consult Brand View.** Confirm the creator's identity, audience, pillars, and boundaries. Ensure every candidate idea will fit within the established brand strategy.

4. **Check previously published topics.** Read `framework/memory/Posted Titles.md`. Avoid duplicating topics that have already been covered. If a topic is worth revisiting, ensure the angle is substantially different.

5. **Identify potential content opportunities.** From the gathered context, list every experience or discovery that could become content. Prioritise those that are authentic, timely, and aligned with the brand.

6. **Evaluate each opportunity.** For each candidate, assess: Is the trigger specific and authentic? Does it solve a real audience problem? What format would it fit? Which platform would it serve? Is it sufficiently different from previously published content?

7. **Recommend the strongest ideas.** Select the most promising opportunities. For each, produce a full recommendation with working title, core idea, trigger, audience problem, expected value, pillar, format, platforms, rationale, confidence level, and notes for planning.

8. **Explain why each recommendation fits the brand and audience.** Provide a brief justification connecting each idea to the creator's identity, the audience's needs, and the established content pillars.

9. **Select the idea or ideas to move into Content Planning.** Confirm which recommendations are ready for workflow 02. If multiple ideas are strong, identify the highest-priority one.

10. **Save ideas if requested (optional).** If the user wants the ideas saved, write a simple Markdown file to `content/ideas/<YYYY-MM-DD-short-topic>.md`. Use today's date (ISO 8601 `YYYY-MM-DD`) and a short, lowercase, hyphen-separated topic slug. Include: the source trigger, the recommended ideas with their suggested format, audience fit, and why each idea belongs in the Content OS. Do not create JSON, databases, or other structured files. If the user did not ask to save, deliver the ideas in conversation only and skip this step.

---

## Constraints

- Never invent experiences, projects, achievements, or emotions. Every idea must originate from a real trigger.
- Never fabricate projects or claim knowledge the creator does not have.
- Never recommend ideas that conflict with Brand View — the content must fit the creator's identity, pillars, and audience boundaries.
- Never duplicate previously published content without a substantially different angle. Always check Posted Titles before recommending.
- Never begin planning or outlining the content. Planning belongs to workflow 02, and content creation belongs to workflow 03.
- Never write scripts, slides, captions, posts, or any content output.
- Never make production decisions about rendering, export, or archiving.
- Persistence is optional. Never create JSON, databases, or structured storage for ideas. If saving, use simple Markdown under `content/ideas/` only when the user asks.

---

## Completion

This workflow ends immediately after one or more content ideas have been selected and confirmed ready for Content Planning. No further workflows are executed automatically. The agent stops.

# 02 — Content Planning

## Purpose

Transform a selected content idea into an approved production-ready content brief. This workflow evaluates the idea against the brand strategy, defines the creative direction, and produces a complete brief that the Post Content Builder can execute without making strategic decisions. It is responsible for planning only — it does not write final content, render slides, export assets, or archive posts.

---

## Scope

This workflow begins after a content idea has been selected from the Idea Discovery workflow.

It ends when a complete content brief has been approved and is ready for the Post Content Builder workflow.

---

## Required Reading

- `framework/strategy/Brand View.md` — Creator identity, audience, content pillars, boundaries.
- `framework/strategy/Brand Voice.md` — Voice, tone, platform rules, language strategy, rewriting rules, mandatory output package.

Additional format or workflow documents should only be consulted if the selected format or creative direction requires clarification. Renderer and production documents are not required for planning.

---

## Inputs

- **Selected content idea** — The recommended idea from Idea Discovery, including its core concept, trigger, suggested format, hook angle, and audience value.
- **User context** — Any additional information provided about the current learning journey, recent projects, or specific goals.
- **Supporting project material** — Code snippets, screenshots, project references, or notes that help ground the brief in real experience.
- **Framework strategy documents** — Brand View and Brand Voice, as listed in Required Reading.
- **Previous planning decisions** — If this content continues or references an existing concept or series, the relevant context from prior briefs or published content.

---

## Outputs

The workflow produces exactly one artifact:

### Approved Content Brief

The brief is the official input for the Post Content Builder (workflow 03). It must contain, at minimum:

- **Working title** — A descriptive title for the content piece.
- **Core idea** — One sentence summarising what the post is about.
- **Trigger** — The real experience that originated the idea.
- **Audience problem** — What the audience struggles with or needs to understand.
- **Key insight** — The single most important takeaway the audience should gain.
- **Intended outcome** — What the audience should feel, think, or do after engaging.
- **Content pillar** — The pillar from Brand View that this content belongs to.
- **Target platforms** — Which platforms the content will be published on.
- **Primary format** — Carousel, reel, story, or post.
- **Creative direction** — The narrative angle, tone, and any specific approach to use.
- **Supporting context** — Relevant background, project references, or recent content this builds on.
- **Required references** — Any Framework documents or external resources the builder must consult.
- **Constraints** — Any format, platform, or brand boundaries the builder must respect.
- **Notes for the Post Content Builder** — Guidance, warnings, or priorities for the execution phase.

The brief must be complete enough that workflow 03 can execute without making strategic or brand decisions.

---

## Success Criteria

Planning is successful when all of the following are true:

- **Idea aligns with Brand View.** The content fits the creator identity, serves the target audience, and falls within an established content pillar.
- **Audience clearly identified.** The brief knows who the content is for.
- **Trigger is authentic.** The idea originates from a real experience, not a hypothetical topic.
- **Insight is clear and valuable.** The key takeaway is specific and worth learning.
- **Desired outcome defined.** The brief states what the audience should gain from the content.
- **Content pillar selected.** The pillar matches the idea and is consistent with the creator's focus areas.
- **Format is appropriate.** The selected format fits the idea, trigger, and platform.
- **Platform strategy defined.** Each target platform has a clear role and the content will be adapted accordingly.
- **Brief sufficient for execution.** The Post Content Builder can produce content from the brief alone, without needing to make strategic decisions.
- **No creative ambiguity remains.** Every element of the brief is specific enough to guide content creation.
- **The audience should leave believing:** "I don't have to wait until I'm an expert to start building", without feeling they were lectured.

---

## Workflow

1. **Review the selected idea.** Read the idea from workflow 01 in full. Understand the core concept, trigger, suggested format, and the rationale behind the recommendation.

2. **Gather supporting context.** Collect any user-provided context, project material, or notes that will help shape the brief. Identify connections to the current learning journey or recent published content.

3. **Consult the required Framework documents.** Read Brand View and Brand Voice. Ensure every planning decision is consistent with the creator's identity, audience, voice rules, and platform strategy.

4. **Define the audience problem.** Articulate what the target audience struggles with or needs to understand. This frames why the content matters.

5. **Define the trigger.** Confirm the real experience that started the idea. Ensure it is specific and authentic enough to anchor the entire content piece.

6. **Identify the key insight.** Distil the most valuable takeaway from the trigger and idea. The insight is the reason the content exists.

7. **Select the appropriate content pillar.** Map the idea to one of the pillars defined in Brand View. This ensures the content stays within the creator's focus areas.

8. **Select the primary format.** Choose carousel, reel, story, or post based on the idea's requirements. Consider the trigger depth, audience value, and platform expectations. Refer to the relevant format document only if additional clarification is needed.

9. **Determine the target platforms.** Decide where the content will be published. For each platform, confirm that the format is appropriate and that platform-specific adaptation rules from Brand Voice can be applied.

10. **Define the creative direction.** Describe the narrative approach, tone, and angle. Specify any structural preferences, hook strategy, or storytelling techniques that the builder should follow.

11. **Compile the production brief.** Write the complete brief with all required sections. Ensure every field is populated with specific, actionable information.

12. **Verify the brief is complete.** Check every element against the success criteria. Confirm that no strategic decisions remain for the Post Content Builder. If anything is missing or ambiguous, resolve it before approving.

---

## Constraints

- Never generate the final content. Content creation belongs to workflow 03.
- Never write carousel slides, reel scripts, story frames, or post copy.
- Never produce JSON or structured data output. This workflow produces a narrative brief only.
- Never make rendering or design decisions. Those belong to workflows 04 and 05.
- Never export assets or archive content. Those belong to workflows 05 and 06.
- Never include placeholders or incomplete sections in the brief. If a field cannot be filled, flag it rather than leaving it ambiguous.

---

## Completion

This workflow ends immediately after the content brief has been completed, reviewed against the success criteria, and confirmed ready for workflow 03. No further workflows are executed automatically. The agent stops.

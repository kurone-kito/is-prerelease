# Guidelines for AI Agents (GitHub Copilot)

This file is the GitHub Copilot entry point. VS Code Copilot Chat,
the standalone Copilot CLI, and the Copilot coding agent all discover it
automatically — and also already discover [AGENTS.md](../AGENTS.md)
directly, which is the canonical, tool-neutral guide for this repository.
Read that file first if you haven't already.

## Copilot-specific notes

- Map the shared "continue autonomously for low-risk work, but pause and
  ask when a step is risky or uncertain" guidance onto this project's
  actual UI: switch to Plan mode and ask the user when that pause condition
  applies while working in Agent mode, providing one or more recommended
  response options as AGENTS.md's Conversation section asks.

See [docs/ai-strategy.md](../docs/ai-strategy.md) for why this repository's
AI instructions are laid out this way.

## IDD Workflow

The IDD entry path is defined once in `AGENTS.md`'s IDD Workflow
section; it points to `docs/idd-workflow.md`,
`.github/instructions/idd-overview-core.instructions.md`, and
`docs/idd-policy.md`. Note that `idd-overview-core.instructions.md`
sets `excludeAgent: "code-review"`, so it targets an implementing
agent rather than Copilot's review surface.

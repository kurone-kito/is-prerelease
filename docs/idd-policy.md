---
type: reference
title: IDD Policy Decisions
description: Records the Issue-Driven Development (IDD) policy decisions confirmed for this repository, and their machine-readable mirror in .github/idd/config.json.
tags: [idd, policy-decisions]
---

# IDD Policy Decisions

This repository adopted Issue-Driven Development (IDD) from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill),
main at commit `adad8ae43c5a1b6fc3a100ce384c8a84a8d5139d`
(`iddVersion` `0.11.0`). This page is the human-readable record of the
policy decisions confirmed during onboarding and its two subsequent
hearings (2026-09-07 against upstream `v0.9.0`, and 2026-09-12/13
against the `0.11.0` refresh); `.github/idd/config.json` is the
machine-readable mirror of the same decisions. See
[docs/idd-workflow.md](idd-workflow.md) for the workflow itself and
[.github/instructions/idd-overview-core.instructions.md](../.github/instructions/idd-overview-core.instructions.md)
for phase routing.

Decisions below marked "reconfirmed" were re-asked against a new
upstream distributed default and deliberately kept at their original
value rather than carried forward silently.

## IDD Policy Configuration

### Development Branch

**Branch**: `main` — this repository's live GitHub default branch.

### Merge Policy

**Policy**: `fully_autonomous_merge`, **reconfirmed 2026-09-07** after
upstream's `v0.8.0` release flipped the distributed default to
`human_merge` and its onboarding hearing began recommending
`human_merge` for public repositories (this repository is public). Kept
for the original reason: this repository has a single owner, and
merging to `main` does not publish — `common-release.yml` is driven by
a published GitHub Release or a manual `workflow_dispatch`, never by a
merge. `mergePolicyAck: "fully_autonomous_merge"` is recorded alongside
it so `idd-doctor` does not flag the now-non-default choice as
unreviewed.

### PR Review Policy

**Profile**: `copilot-advisory` (distributed default). Kept because
`copilot-pull-request-reviewer[bot]` already reviews pull requests here
and this repository's `main` Ruleset auto-triggers Copilot code review
on every push. `coderabbitai[bot]` and `chatgpt-codex-connector[bot]`
are additional non-gating reviewers whose comments go through normal
review triage; both are recorded as `advisoryBotLogins` (see below).

### Review-Thread Resolution Policy

**Policy**: `fast-agent-resolve` (distributed default).

### Critique-Loop Profile

**Profile**: distributed defaults. No local override.

- `critiqueLoop.telemetryHook`: absent — this repository has no
  telemetry command to hook into.

### Claim Timing

- **claim-stale-age**: `PT24H` (24 h, distributed default)
- **claim-heartbeat-interval**: `PT12H` (12 h, distributed default)

### CI Wait Policy

- **running timeout**: `PT30M` / 30 min (distributed default)
- **generation timeout**: `PT10M` / 10 min (distributed default)
- **rerun policy**: `rerun-once` (distributed default)

### Up-to-Date-Head Ruleset

**Policy**: disabled. Verified 2026-09-07: this repository's two active
GitHub Rulesets (`main`, `features`, both added 2026-08-12) define no
`required_status_checks` rule, so there is no up-to-date-head
requirement to disable in the first place — this records the current
state rather than a pending action.

### Required-Check Registration

- **Classic-API `contexts` pinning trap avoided**: not applicable — no
  required status check is registered through the classic
  branch-protection API at all; governance runs through the two GitHub
  Rulesets named above.
- **`ciGate.trustEmptyProtectionReads`**: `true`. Classic branch
  protection reads 404 on this repository (Rulesets are the real
  governance surface here), a combination `idd-doctor` otherwise warns
  about without this field. This corrects an earlier claim (dated
  2026-07-28) that this repository had "no ruleset" — the two Rulesets
  were added 2026-08-12, after that claim was written, and neither
  defines a required status check.
- **`idd-advisory-convergence` required check**: **adopted** as a
  decision, since upstream now ships it as a ready-to-copy file rather
  than something to hand-write. Copying the workflow file in is #16's
  scope: it does not exist in this repository until #16 merges, and no
  IDD phase or agent should assume it gates anything before then.
  Registering it as an actually-*required* status check inside the
  `main` Ruleset remains a separate, deferred, maintainer-only
  GitHub-settings action either way (see roadmap #10's "Deferred and
  human-dependent work").

### Credential Scope

**Worker credentials**: least-privilege — no merge-capable operations.

**Merge-capable credentials**: one trusted agent session may receive
the stronger credential set needed to execute merge phase F3, matching
`mergePolicy: fully_autonomous_merge`.

### Helper Runtime Profile

**Profile**: `package-manager`, **reconfirmed 2026-09-07** after
upstream's onboarding hearing changed its distributed default to
`instructions-only`. This repository is already a pnpm-based Node.js
project, so resolving IDD helpers through the existing `pnpm exec`
remains the better fit.

### Issue-Author Approval Gate

- **Gate posture**: `enabled-by-default` (no opt-out)
- **Opt-out state**: gate remains default-enabled;
  `skipIssueAuthorApprovalGate` is absent from
  `.github/idd/config.json`
- **`maintainer-approval-actors` policy**: `owners-and-maintainers-only`
- **Approval signals**: configured ready label (`approvalSignals.readyLabelName`:
  `idd:ready`, distributed default; omitted from `.github/idd/config.json`
  to keep it) or a fresh standalone `IDD ready` comment from a
  maintainer approval actor
- **`approvalSignals.labelFreshnessMode`**: `presence-only`
  (distributed default; omitted to keep it)

### Issue-Authoring Companion

**Status**: `installed`, **reconfirmed 2026-09-07** after upstream's
onboarding hearing changed its distributed default to not-installed.
The distributed bundle shrank from five files to four upstream
(`agents/openai.yaml` was removed in `v0.6.0`, with no replacement).

**Native destination**: `.claude/skills/issue-authoring/` (this
repository's Claude Code runtime). Installation is #17's scope, not
landed by this issue — this record confirms the target decision, not
current presence. Check that `.claude/skills/issue-authoring/SKILL.md`
actually exists in the working tree before routing to this companion.

- **`issueAuthoring.maxClarificationRounds`**: `3` (distributed default)
- **`issueAuthoring.heartbeatCoalesceWindow`**: `PT2M` (distributed
  default; v0.10 addition)
- **`issueAuthoring.journalIssue`**: unset — roadmap #10 is the
  existing authoring anchor, so a separate journal issue is redundant

### Optional `idd-spec-audit` Companion

**Status**: `adopted` as a confirmed decision, targeting
`.claude/skills/idd-spec-audit/` (v0.10 addition: a read-only companion
that audits the installed IDD instruction corpus and agent-entry
files). Installation is #17's scope, not landed by this issue. Check
that `.claude/skills/idd-spec-audit/SKILL.md` actually exists in the
working tree before routing to this companion.

### Bootstrap Execution Mode

**Mode**: neither distributed value. This repository uses a
hand-authored roadmap-and-children decomposition (issues #10–#19), kept
deliberately instead of switching to upstream's newer `issue-mediated`
single-issue bootstrap mode — that mode targets a repository with no
local IDD files yet and no existing plan (this repository's situation
before #10 was first authored), but this update round revised the
existing plan rather than replacing it. It is also not the distributed
`direct-import` default: `direct-import` means importing the template
with a single unreviewed commit, but every step here, including the
core template import itself (#14), went through the normal
issue → branch → PR → CI → review → merge loop (#14 merged as PR #24,
with CI, Copilot, and Codex review). The nine-issue decomposition gives
an equivalent, arguably finer-grained, reviewable trail to either
distributed mode.

### IDD Label Names

Distributed defaults, kept:

- `labels.roadmapLabelName`: `roadmap`
- `labels.blockedByHumanLabelName`: `status:blocked-by-human`
- `labels.needsDecisionLabelName`: `status:needs-decision`

**`labels.untrustedLabelerLogins`**: `coderabbitai[bot]`,
`chatgpt-codex-connector[bot]` — new field, generates the reserved-label
guard (#19) that strips a reserved IDD label these two bots have been
observed applying on their own semantic judgment (see #19's PR for the
field incident this guards against).

### Advisory Bot Logins

**`advisoryBotLogins`**: `coderabbitai[bot]`,
`chatgpt-codex-connector[bot]` — new field, formalizes the two
non-gating reviewers named above for structural ack-only
classification.

### Authoring Language

**`authoringLanguage`**: `en` — new field, matches this repository's
existing English-language issues and the maintainer's own convention
that code, docs, and comments stay in English regardless of the
conversational language used during a hearing.

### Optional Worktree Guard

**Status**: `enabled` as a confirmed decision, with
`worktreeGuard.refuseBaseBranchCommits` left **absent/false** so normal
maintainer base-branch operations and the fully autonomous merge path
are not blocked. `worktreeGuard.enabled` is absent from
`.github/idd/config.json` and `.githooks/pre-commit`/`.githooks/pre-push`
are not yet mode `100755` in the git index — wiring the config field
and the executable bits is #16's scope, not landed by this issue; do
not treat this record as evidence the guard is currently active.
Per-clone activation (`git config core.hooksPath .githooks`) is
separately deferred, maintainer/agent-session work (roadmap #10).

### Optional `idd-doctor` CI Gate

**Status**: `enabled` as a confirmed decision. No `idd-doctor` CI
workflow exists in this repository until #16 merges; do not treat this
record as evidence that the gate is currently running.

### Optional Claude Code Permission Baseline

**Status**: `adopted 2026-09-07`, wired by this issue (#15).
`.claude/settings.json` copies the upstream `0.11.0` baseline at commit
`adad8ae43c5a1b6fc3a100ce384c8a84a8d5139d` byte-for-byte. Its
`$comment` documents that it denies invoking
`node scripts/idd-merge-execute.mjs` / `node bin/idd-merge-execute.mjs`
by default and does not allowlist `gh pr merge` — both confirmed
present in the copied file — so adopting it does not implicitly grant
merge-execute capability despite this repository's
`fully_autonomous_merge` policy; a maintainer must deliberately edit
the file to add that capability, per `docs/permissions.md`.

`docs/permissions.md` is imported byte-for-byte from upstream, and its
"this repository's own dogfood `.claude/settings.json`" phrasing
(lines 437, 471, 511) refers to `kurone-kito/idd-skill`'s own root
`.claude/settings.json` — the file that allows `gh pr merge` and omits
both `idd-merge-execute` denies — not to this repository. This
repository adopted the "opt-in `idd-template/.claude/settings.json`
counterpart" that same section names, which is the variant that denies
`idd-merge-execute` and omits `gh pr merge` (verified: `diff` between
`idd-skill`'s two source copies at commit
`adad8ae43c5a1b6fc3a100ce384c8a84a8d5139d` shows exactly that gh pr
merge / idd-merge-execute-deny split). So this repository's own
`mergePolicy: fully_autonomous_merge` recording does not, by itself,
imply the `gh pr merge` allow that `docs/permissions.md` attributes to
the dogfood copy — a maintainer opts into that separately, as the
paragraph above states.

### Path-Scoped Domain Guidance Reach

**Applicability**: not applicable. This repository relies on no hidden,
bot-specific domain guidance (for example a `path_instructions` entry
in one advisory bot's own config file that another gating bot never
sees) for review quality — there is no non-standard-language directory
or file extension in this repository that would need such guidance.

### `upstreamEscalation`

**`upstreamEscalation.enabled`**: absent (declined). No automatic
candidate-issue filing against `kurone-kito/idd-skill` when this
repository's agents find an upstream defect in imported content; such
findings are recorded for #18's roadmap-completion audit instead, and
a human decides whether/where to escalate them.

## Machine-readable policy file

`.github/idd/config.json` is the machine-readable record of the same
policy decisions, imported and populated by #14. It validates against:

<https://kurone-kito.github.io/idd-skill/schemas/policy.schema.json>

Every value in this document that also exists as a field in that file
matches it, including `mergePolicyAck`, `developmentBranch`,
`advisoryBotLogins`, `authoringLanguage`,
`ciGate.trustEmptyProtectionReads`, `labels.untrustedLabelerLogins`,
and `issueAuthoring.heartbeatCoalesceWindow`.

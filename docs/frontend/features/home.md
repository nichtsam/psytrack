# Home

## Purpose

The Home provides users with a concise overview of their recent emotional and psychological data. It also surfaces prompts to add clarity to specific experiences, fostering ongoing engagement and self-awareness.
It includes simplified versions of features also found in Stats, but with limited interaction and a fixed scope, designed for quick, daily review rather than in-depth analysis.

## Goals

- Enable users to quickly understand their recent emotional trends and mental states.
- Prompt users to add clarity to missing details in their recorded experiences.
- Encourage regular interaction and reflection within the app.

## Components

### 1. Daily Mood Tagger

Let users quickly tag the overall emotional polarity of recent days.

#### Data Dependence

- Daily mood records for the past 5 days.

#### States

- Tagged: Day shows its selected mood.
- Untagged: Prompt to tag mood.

#### Navigation

TBD.

### 2. Recent Mood (Valence)

Summary of recent overall emotional valence.

#### Data Dependence

- Valence-related data from the past 7 days’ entries.

#### States

- Normal: Show a summary text reflecting the recent valence trend (e.g. “Pretty Good” or "A Little Bit Down").
- Empty: Show a message like “Oops, We don't know you so well yet”.

#### Navigation

TBD (dependent on Stats feature).

### 3. Recent Energy (Vitality)

Summary of recent overall emotional vitality.

#### Data Dependence

- Vitality-related data from the past 7 days’ entries.

#### States

- Normal: Show a summary text reflecting the recent vitality trend (e.g. “A Bit Agitated” or "Kind of Drained").
- Empty: Show a message like “Oops, We don't know you so well yet”.

#### Navigation

TBD (dependent on Stats feature).

### 5. Recent Dominant Emotions

Summary of the main emotions that stood out recently.

#### Data Dependence

- emotions from the past 7 days’ entries.

#### States

- Normal: Show a list or tags of dominant emotions and indication how dominant they are
- Empty: Show a message like “Oops, We don't know you so well yet”.

#### Navigation

TBD (dependent on Stats feature).

### 5. Call For Clarity

Remind users to add missing details or clarify incomplete entries.

#### Data Dependence

- Entries flagged as incomplete or missing key info.

#### States

- Normal: Show a list of incomplete entries by headline and indication what information is missing.
- Empty: Hide or show “All caught up!” message.

#### Navigation

TBD (dependent on History feature).

### 6. Recent Experiences

Enable quick access for users to review or edit recent experiences.

#### Data Dependence

- experience entries from the past 7 days.

#### States

- Normal: Show a list of entries by headline and date.
- Empty: Show a friendly message like “Pretty Quiet Lately!”

#### Navigation

TBD (dependent on History feature).

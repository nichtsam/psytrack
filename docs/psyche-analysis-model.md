# Psyche Analysis Model

This document defines the core emotional categories used in the Psyche system.  
To ensure consistency in tracking and analysis, all emotional data across the system should be based on this standardized list.  
By limiting inputs to a small set of well-defined, fundamental emotions, we make meaningful tracking and automated analysis possible — avoiding confusion and fragmentation caused by open-ended emotion input.

## Guiding Principles

- **Only Include Fundamental Emotions**: Each emotion listed should be irreducible — not composed of more basic emotional states.
- **Avoid Synonyms**: There should be only one label per emotional experience to maintain consistency and avoid redundancy.
- **Objective, Without Intensity**: Descriptions should define the emotional quality without implying intensity, severity, or valence.

## Emotion List

| Name        | Valence  | Vitality | Description                                                                                                           |
| ----------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| desire      | neutral  | positive | A forward-pulling feeling like longing or wanting, often driving action or pursuit of change.                         |
| attachment  | positive | neutral  | A sense of emotional connection or bonding with others or things, often motivating care, loyalty, and responsibility. |
| hope        | positive | positive | A positive feeling about the possibility of improvement or a better future.                                           |
| contentment | positive | neutral  | A sense of life satisfaction, including feelings of safety, love, and connection.                                     |
| joy         | positive | positive | A state of lightheartedness, pleasure, or spontaneous happiness.                                                      |
| excitement  | positive | positive | A sense of curiosity, anticipation, or a desire to act, often sparked by novelty or potential.                        |
| anger       | negative | positive | A feeling of violation or unfairness, often accompanied by an impulse to resist or confront.                          |
| sadness     | negative | negative | A sense of emotional heaviness, low mood, or sorrow.                                                                  |
| loss        | negative | negative | A feeling of having lost something meaningful, such as unmet expectations or broken trust.                            |
| shame       | negative | negative | A perception of personal flaw, exposure, or unworthiness in the eyes of oneself or others.                            |
| anxiety     | negative | positive | A sense of unease related to uncertainty, lack of control, or concern about the future.                               |
| fear        | negative | negative | A wish to avoid or escape from a perceived threat or unwanted outcome.                                                |
| fatigue     | negative | negative | A mental state of low energy or depletion, often leading to a desire to withdraw.                                     |
| emptiness   | negative | negative | A sense of internal void, disconnection, or lack of motivation or purpose.                                            |
| disgust     | negative | negative | A strong impulse of rejection or aversion toward something perceived as wrong or intolerable.                         |

## Psyche Record Structure

### Experience

An **Experience** represents an event that triggered emotional or mental fluctuation.
Each record consists of three main sections:

- **Activating Event**
- **Coping Behavior**
- **Post Event Mental State**

These sections reflect the timeline of the emotional experience:

- **Activating Event**: The core context that triggered the experience.
- **Coping Behavior**: How the subject responded to manage or process the experience.
- **Post Event Mental State**: The emotions and thoughts that emerged after gaining distance from the event.

The **Activating Event** also contains a nested section: **Reaction**, which describes the immediate or short-term response to the event.

#### Activating Event

- **Headline**: One-sentence summary of the core situation.
- **Story**: Description of the background and course of the event.
- **Time**: When the event occurred.
- **Activated Emotions** (optional): Emotions triggered in the moment. Absence may indicate numbness or unawareness.
- **Reaction** (optional): Immediate or shortly-following reaction (see next section).

#### Reaction (within Activating Event)

- **Behavior**: Observable or remembered response during or shortly after the event.
- **Result Emotions** (optional): Emotional state following the behavioral response. Absence may indicate numbness or unawareness.

#### Coping Behavior

- **Coping Method**: Strategies or actions used to deal with the experience.
- **Result Emotions** (optional): Emotional state during the coping process. Absence may indicate numbness or unawareness.
- **Coping Completion Time**: Subjective point when coping felt "done".

#### Post Event Mental State (Meta Reflection)

- **Thoughts** (optional): Reflections or realizations that emerged after the event.
- **Result Emotions**: Emotional state at a distance from the original experience.
- **Awareness Time**: When these thoughts or emotions became consciously accessible.

## Derived Indicators

### Valence

#### Definition

Represents the overall emotional polarity — positive or negative tendency of the emotional state.

#### Formula

$$Valence = \frac{1}{n} \sum_{i=1}^n I_i \times V_i$$

- $n$: Total number of emotions
- $I_i$: Intensity of the $i$-th emotion (range: 1–10)
- $V_i \in \{-1, 0, +1\}$: Valence polarity of the $i$-th emotion
  - $-1$: negative
  - $0$: neutral
  - $+1$: positive

### Vitality

#### Definition

Measures the balance between energizing and draining energy in the emotional state, where positive values indicate predominance of energizing emotions, and negative values indicate predominance of draining emotions.

#### Formula

$$Vitality = \frac{1}{n} \sum_{i=1}^n I_i \times Vi_i$$

- $n$: Total number of emotions
- $I_i$: Intensity of the $i$-th emotion (range: 1–10)
- $V_i \in \{-1, 0, +1\}$: Vitality polarity of the $i$-th emotion
  - $-1$: draining
  - $0$: neutral
  - $+1$: activating

### Valence Chaos

#### Definition

Measures emotional conflict when strong positive and negative emotions are present simultaneously. Zero if only one valence direction exists.

#### Formula

Define:
$$V_+ = \sum_{\{i | V_i > 0\}} I_i \times V_i, \quad V_- = \sum_{\{i | V_i < 0\}} |I_i \times V_i|$$

Then:

$$
Valence\ Chaos =
\begin{cases}
\frac{V_+ + V_-}{n}, & \text{if } V_+ > 0 \text{ and } V_- > 0 \\
0, & \text{otherwise}
\end{cases}
$$

### Vitality Conflict

#### Definition

Measures the conflict in energy when both energizing and draining emotions coexist. If only one vitality direction is present, the value is zero.

#### Formula

Define:
$$Vi_+ = \sum_{\{i | Vi_i > 0\}} I_i \times Vi_i, \quad Vi_- = \sum_{\{i | Vi_i < 0\}} |I_i \times Vi_i|$$

Then:

$$
Vitality\ Conflict =
\begin{cases}
\frac{Vi_+ + Vi_-}{n}, & \text{if } Vi_+ > 0 \text{ and } Vi_- > 0 \\
0, & \text{otherwise}
\end{cases}
$$

# Psyche Analysis Model

This document defines a standardized framework for capturing, recording, and analyzing psychological states.  
It covers a curated set of fundamental emotions, structured data models for journaling psychological information, and formulas for deriving key psychological metrics.

## Emotion Structure

### Emotion Values

#### Valence

Indicates how pleasant or unpleasant a psychological state feels — basically whether you feel good or bad.
It can describe individual emotions, blends of feelings, or an overall mood over a period of time.

#### Vitality

Indicates the level of activation in a psychological state, ranging from a strong urge to act to an unwillingness to engage in any activity.
Like valence, it can describe individual emotions, blends of feelings, or an overall mood over a period of time.

### Fundamental Emotions

This section defines the core emotional categories used in the Psyche Analysis Model.  
To ensure consistency in journaling and analysis, all emotional data across the system should be based on this standardized list.  
By limiting inputs to a small set of well-defined, fundamental emotions, we make meaningful journaling and automated analysis possible — avoiding confusion and fragmentation caused by open-ended emotion input.

#### Guiding Principles

- **Only Include Fundamental Emotions**: Each emotion listed should be irreducible — not composed of more basic emotional states.
- **Avoid Synonyms**: There should be only one label per emotional experience to maintain consistency and avoid redundancy.
- **Objective, Without Intensity**: Descriptions should define the emotional quality without implying intensity, severity, or valence.

#### Emotion List

|    Name     | Valence  | Vitality | Description                                                                                                           |
| :---------: | :------: | :------: | :-------------------------------------------------------------------------------------------------------------------- |
|   desire    | neutral  | positive | A forward-pulling feeling like longing or wanting, often driving action or pursuit of change.                         |
| attachment  | positive | neutral  | A sense of emotional connection or bonding with others or things, often motivating care, loyalty, and responsibility. |
|    hope     | positive | positive | A positive feeling about the possibility of improvement or a better future.                                           |
| contentment | positive | neutral  | A sense of life satisfaction, including feelings of safety, love, and connection.                                     |
|     joy     | positive | positive | A state of lightheartedness, pleasure, or spontaneous happiness.                                                      |
| excitement  | positive | positive | A sense of curiosity, anticipation, or a desire to act, often sparked by novelty or potential.                        |
|    anger    | negative | positive | A feeling of violation or unfairness, often accompanied by an impulse to resist or confront.                          |
|   sadness   | negative | negative | A sense of emotional heaviness, low mood, or sorrow.                                                                  |
|    loss     | negative | negative | A feeling of having lost something meaningful, such as unmet expectations or broken trust.                            |
|    shame    | negative | negative | A perception of personal flaw, exposure, or unworthiness in the eyes of oneself or others.                            |
|   anxiety   | negative | positive | A sense of unease related to uncertainty, lack of control, or concern about the future.                               |
|    fear     | negative | negative | A wish to avoid or escape from a perceived threat or unwanted outcome.                                                |
|   fatigue   | negative | negative | A mental state of low energy or depletion, often leading to a desire to withdraw.                                     |
|  emptiness  | negative | negative | A sense of internal void, disconnection, or lack of motivation or purpose.                                            |
|   disgust   | negative | negative | A strong impulse of rejection or aversion toward something perceived as wrong or intolerable.                         |

## Psyche Record Structure

Psyche records are structured around two complementary layers: Vibe and Experience.

- Vibe captures the **macro-level** mental state over time. It reflects the background mood or atmosphere, independent of specific events.
- Experience captures the **micro-level** psychological impact of specific events. It details the emotional and mental processes triggered by meaningful situations.

Together, they form a layered understanding of psychological states—broad ambient trends and deep event-driven dynamics.

### Vibe

A **Vibe** captures the overall mental state for a given period of time.
It consists of two core dimensions:

- **Valence**: How pleasant or unpleasant it felt.
- **Vitality**: How active or inactive the day felt, in terms of energy or willingness to act.

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

## Derived Metrics

### Valence

#### Formula

Valence is a signed number in the range [-10, +10]. Higher values indicate pleasantness; lower values indicate unpleasantness

##### Standalone

Used to describe a macro-level emotional state without reference to specific emotions.

$$\text{Valence} = \text{direct input} \in [-10, +10]$$

##### Individual Emotion

Derived from a single identified emotion.

$$\text{Valence} = I_i \times V_i$$

##### Multiple Emotions

Derived from a set of emotions.

$$\text{Valence} = \frac{1}{n} \sum_{i=1}^n I_i \times V_i$$

$$
\begin{aligned}
n & : \text{Total number of emotions} \\
I_i & : \text{Intensity of the } i\text{-th emotion (range: 1–10)} \\
V_i & \in \{-1, 0, +1\} & : \text{Valence polarity of the } i\text{-th emotion} \\
& \quad -1: \text{negative} \\
& \quad\ 0: \text{neutral} \\
& \quad+1: \text{positive}
\end{aligned}
$$

### Vitality

#### Formula

Vitality is a signed number in the range [-10, +10]. Higher values indicate a more activated mental state; lower values indicate passivity or energy depletion.

##### Standalone

Used to describe a macro-level emotional state without reference to specific emotions.

$$\text{Vitality} = \text{direct input} \in [-10, +10]$$

##### Individual Emotion

Derived from a single identified emotion.

$$\text{Vitality} = I_i \times Vi_i$$

##### Multiple Emotions

Derived from a set of emotions.

$$\text{Vitality} = \frac{1}{n} \sum_{i=1}^n I_i \times Vi_i$$

$$
\begin{align*}
n & : \text{Total number of emotions} \\
I_i & : \text{Intensity of the } i\text{-th emotion (range: 1–10)} \\
V_i & \in \{-1, 0, +1\} & : \text{Vitality polarity of the } i\text{-th emotion} \\
& \quad -1: \text{draining} \\
& \quad\ 0: \text{neutral} \\
& \quad+1: \text{activating}
\end{align*}
$$

### Valence Chaos

#### Definition

Measures emotional conflict when strong positive and negative emotions are present simultaneously. Zero if only one valence direction exists.

#### Formula

Define:
$$V_+ = \sum_{\{i | V_i > 0\}} I_i \times V_i, \quad V_- = \sum_{\{i | V_i < 0\}} |I_i \times V_i|$$

Then:

$$
\text{Valence Chaos} =
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
\text{Vitality Conflict} =
\begin{cases}
\frac{Vi_+ + Vi_-}{n}, & \text{if } Vi_+ > 0 \text{ and } Vi_- > 0 \\
0, & \text{otherwise}
\end{cases}
$$

## Model Bias Risk Factors

### User Behavior Dependence

The psyche analysis model relies heavily on user input. These records are inherently incomplete and biased due to user behavior. If the analysis model treats this biased data as a complete representation of the user’s mental state, it will produce misleading trends and conclusions.

#### Examples of Bias

- Logging only in certain emotions -> skewed psyche dataset
- Infrequent logging -> Inaccuracy due to low sample size
- Inconsistent frequency -> temporal gaps misrepresent stability or volatility

#### Mitigation Strategies

- Encourage active and diverse logging – promote broader recording of varied experiences, while clearly communicating that insight accuracy is closely tied to data completeness.
- Design data gap compensation mechanisms – apply default baseline values and incorporate their proportions into calculations, aiming to reduce distortion from missing entries.

### Circadian Rhythm and Timezone

Certain analyses focus on the user’s circadian rhythm effects on emotions. Recording and considering timezone data per entry is essential to accurately capture these patterns.

#### Examples of Bias

- Traveling across timezones -> disrupted circadian patterns

#### Mitigation Strategies

- Store all timestamps in UTC, with explicit timezone metadata per entry.
- Convert to local circadian time when analyzing rhythm-related patterns.

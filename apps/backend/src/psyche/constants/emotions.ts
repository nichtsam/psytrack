export const emotions = [
  'desire',
  'attachment',
  'hope',
  'contentment',
  'joy',
  'excitement',
  'anger',
  'sadness',
  'loss',
  'shame',
  'anxiety',
  'fear',
  'fatigue',
  'emptiness',
  'disgust',
] as const;

type EmotionConfig = {
  description: string;
};

export const emotionConfig: Record<(typeof emotions)[number], EmotionConfig> = {
  desire: {
    description:
      ' A forward-pulling feeling like longing or wanting, often driving action or pursuit of change.                         ',
  },
  attachment: {
    description:
      ' A sense of emotional connection or bonding with others or things, often motivating care, loyalty, and responsibility. ',
  },
  hope: {
    description:
      ' A positive feeling about the possibility of improvement or a better future.                                           ',
  },
  contentment: {
    description:
      ' A sense of life satisfaction, including feelings of safety, love, and connection.                                     ',
  },
  joy: {
    description:
      ' A state of lightheartedness, pleasure, or spontaneous happiness.                                                      ',
  },
  excitement: {
    description:
      ' A sense of curiosity, anticipation, or a desire to act, often sparked by novelty or potential.                        ',
  },
  anger: {
    description:
      ' A feeling of violation or unfairness, often accompanied by an impulse to resist or confront.                          ',
  },
  sadness: {
    description:
      ' A sense of emotional heaviness, low mood, or sorrow.                                                                  ',
  },
  loss: {
    description:
      ' A feeling of having lost something meaningful, such as unmet expectations or broken trust.                            ',
  },
  shame: {
    description:
      ' A perception of personal flaw, exposure, or unworthiness in the eyes of oneself or others.                            ',
  },
  anxiety: {
    description:
      ' A sense of unease related to uncertainty, lack of control, or concern about the future.                               ',
  },
  fear: {
    description:
      ' A wish to avoid or escape from a perceived threat or unwanted outcome.                                                ',
  },
  fatigue: {
    description:
      ' A mental state of low energy or depletion, often leading to a desire to withdraw.                                     ',
  },
  emptiness: {
    description:
      ' A sense of internal void, disconnection, or lack of motivation or purpose.                                            ',
  },
  disgust: {
    description:
      ' A strong impulse of rejection or aversion toward something perceived as wrong or intolerable.                         ',
  },
};

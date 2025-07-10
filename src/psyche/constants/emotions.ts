export const emotions = [
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
  'jealousy',
  'disgust',
] as const;

type EmotionConfig = {
  description: string;
};

export const emotionConfig: Record<(typeof emotions)[number], EmotionConfig> = {
  contentment: {
    description:
      'A deep sense of life satisfaction, including feelings of safety, love, and connection.',
  },
  joy: {
    description:
      'Immediate feelings of happiness, pleasure, and lightheartedness.',
  },
  excitement: {
    description:
      'Feelings of curiosity, anticipation, desire to act, freshness, and surprise.',
  },
  anger: {
    description:
      'Feelings of boundary violation, unfairness, and desire to confront or resist.',
  },
  sadness: {
    description: 'Feelings of emotional heaviness, low mood, or sorrow.',
  },
  loss: {
    description:
      'Feelings of having lost something important, such as unmet expectations or broken trust, often leading to disappointment or sadness.',
  },
  shame: {
    description:
      'Feelings of being flawed, exposed, or unworthy in the eyes of oneself or others.',
  },
  anxiety: {
    description:
      'Feelings of worry about the future, uncertainty, and lack of control.',
  },
  fear: {
    description:
      'Feelings of wanting to escape or avoid a specific threat, danger, or unwanted outcome.',
  },
  fatigue: {
    description:
      'Feelings of mental depletion, low energy, and desire to escape.',
  },
  emptiness: {
    description: 'Feelings of inner void, lack of purpose or motivation.',
  },
  jealousy: {
    description: 'Feelings of resentment when others have what one desires.',
  },
  disgust: {
    description: 'Feelings of rejection, avoidance, and aversion.',
  },
};

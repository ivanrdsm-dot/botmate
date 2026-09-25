import data from './robot-experiences.json';
import type { Localized } from './locale';

export type ExperienceMedia = { src: string; poster: string; kind: string; source: string };
export type RobotChapter = ExperienceMedia & { title: Localized; description: Localized };
export type RobotExperience = {
  source: string;
  verifiedAt: string;
  chapters: RobotChapter[];
  process?: ExperienceMedia;
  dimensions?: ExperienceMedia;
};
export const robotExperiences: Record<string, RobotExperience> = data;

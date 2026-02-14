/**
 * Typed profile data loader — single source of truth for profile.yaml
 */
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

export interface ProfileBadge {
  label: string;
}

export interface ProfileStat {
  number: string;
  label: string;
}

export interface ProfileCareer {
  period: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProfileQualification {
  icon: string;
  name: string;
  description: string;
}

export interface ProfileStory {
  title: string;
  subtitle: string;
  grandfatherWords: string;
  content: string;
}

export interface ProfileMotto {
  text: string;
  meaning: string;
}

export interface ProfilePhilosophy {
  title: string;
  content: string;
}

export interface ProfileCTA {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface ProfileData {
  name: string;
  nameReading: string;
  'handle-name': string;
  subtitle: string;
  icon: string;
  badges: ProfileBadge[];
  stats: ProfileStat[];
  career: ProfileCareer[];
  qualifications: ProfileQualification[];
  story: ProfileStory;
  mottos: ProfileMotto[];
  philosophy: ProfilePhilosophy[];
  cta: ProfileCTA;
}

let cached: ProfileData | null = null;

export function loadProfile(): ProfileData {
  if (cached) return cached;

  const yamlPath = path.join(process.cwd(), 'src/data/profile.yaml');
  const raw = yaml.load(fs.readFileSync(yamlPath, 'utf8'));

  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid profile.yaml: expected an object');
  }

  cached = raw as ProfileData;
  return cached;
}

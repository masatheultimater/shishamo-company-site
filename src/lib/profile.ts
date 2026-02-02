/**
 * Profile YAML Loader
 * shared/profile.yaml からデータを読み込むユーティリティ
 */
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// YAMLの型定義
export interface ProfileYaml {
  project_name: string;
  domain: string;
  client_name: string;
  owner_name: string;
  owner_nickname: string;
  owner_reading: string;
  qualifications: YamlQualification[];
  services: YamlService[];
  tagline: string;
  concept: string;
  philosophy: string;
  design: YamlDesign;
  pages: YamlPage[];
  integrations: YamlIntegrations;
  career: YamlCareer;
  seo: YamlSEO;
  contact: YamlContact;
}

export interface YamlQualification {
  name: string;
  icon: string;
  description: string;
  status?: string;
}

export interface YamlService {
  id: string;
  name: string;
  icon: string;
  description: string;
  price_min?: number;
  price_max?: number;
  price_unit?: string;
  price_type?: 'success_fee';
  price_rate?: string;
  tags: string[];
}

export interface YamlDesign {
  style: string;
  colors: {
    primary: string;
    primary_dark: string;
    secondary: string;
    accent: string;
    dark: string;
    light: string;
  };
  fonts: {
    display: string;
    body: string;
  };
  personality: Array<{
    trait: string;
    expression: string;
  }>;
}

export interface YamlPage {
  slug: string;
  title: string;
  sections?: string[];
  type?: string;
  cms?: string;
}

export interface YamlIntegrations {
  note: { enabled: boolean; url?: string };
  x_twitter: { enabled: boolean; handle?: string };
  wiki: { enabled: boolean; description?: string };
  github: { enabled: boolean };
}

export interface YamlCareer {
  experience_years: {
    it: number;
    accounting: number;
  };
  toeic: number;
  timeline: Array<{
    period: string;
    title: string;
    description: string;
  }>;
}

export interface YamlSEO {
  keywords: string[];
  area: string;
}

export interface YamlContact {
  email: string;
}

// YAMLファイルのパス
const PROFILE_YAML_PATH = path.join(process.cwd(), 'shared/profile.yaml');

// プロファイルデータのキャッシュ
let cachedProfile: ProfileYaml | null = null;

/**
 * profile.yaml を読み込んでパースする
 */
export function loadProfile(): ProfileYaml {
  if (cachedProfile) {
    return cachedProfile;
  }

  try {
    const fileContent = fs.readFileSync(PROFILE_YAML_PATH, 'utf8');
    cachedProfile = yaml.load(fileContent) as ProfileYaml;
    return cachedProfile;
  } catch (error) {
    console.error('Failed to load profile.yaml:', error);
    throw error;
  }
}

/**
 * 資格情報を取得
 */
export function getQualifications(): YamlQualification[] {
  return loadProfile().qualifications;
}

/**
 * サービス情報を取得
 */
export function getYamlServices(): YamlService[] {
  return loadProfile().services;
}

/**
 * キャリア情報を取得
 */
export function getCareer(): YamlCareer {
  return loadProfile().career;
}

/**
 * ブランディング情報を取得
 */
export function getBranding() {
  const profile = loadProfile();
  return {
    tagline: profile.tagline,
    concept: profile.concept,
    philosophy: profile.philosophy,
    ownerName: profile.owner_name,
    ownerNickname: profile.owner_nickname,
    ownerReading: profile.owner_reading,
    clientName: profile.client_name,
  };
}

/**
 * デザイン設定を取得
 */
export function getDesignConfig(): YamlDesign {
  return loadProfile().design;
}

/**
 * SEO設定を取得
 */
export function getSEOConfig(): YamlSEO {
  return loadProfile().seo;
}

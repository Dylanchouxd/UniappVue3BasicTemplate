import { getEnvValue } from '@/utils/env';

export const baseURL = getEnvValue<string>('VITE_BASE_URL') || '';

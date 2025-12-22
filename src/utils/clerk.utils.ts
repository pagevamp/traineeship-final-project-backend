import { User } from '@clerk/backend';

export function getStringMetadata(user: User, key: string): string | null {
  const value = user.publicMetadata?.[key];
  return typeof value === 'string' ? value : null;
}

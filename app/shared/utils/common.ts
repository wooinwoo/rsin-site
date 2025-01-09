export function generateHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // 현재 timestamp를 추가하여 유니크성 보장
  const timestamp = Date.now();
  return `${Math.abs(hash)}_${timestamp}`;
}

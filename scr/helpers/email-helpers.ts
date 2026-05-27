export function withUniqueEmail<T extends { email: string }>(data: T): T {
  const [localPart, domain] = data.email.split("@");
  return { ...data, email: `${localPart}${Date.now()}@${domain}` };
}

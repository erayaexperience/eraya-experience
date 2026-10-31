export const FIELD_LIMITS = { name: 80, email: 254, company: 120, message: 3000, messageMin: 10 } as const;

const MIN_FILL_MS = 3000;
const COOLDOWN_MS = 60_000;
const MAX_LINKS = 2;
const LAST_SENT_KEY = "eraya:enquiry-sent";
const LINK = /(https?:\/\/|www\.)\S+/i;
const LINKS = new RegExp(LINK.source, "gi");

type Submission = { name: string; message: string; startedAt: number | null; honeypot: boolean };

const lastSent = () => {
  try {
    return Number(localStorage.getItem(LAST_SENT_KEY)) || 0;
  } catch {
    return 0;
  }
};

export const markSent = () => {
  try {
    localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
  } catch {}
};

export const isLikelySpam = ({ name, message, startedAt, honeypot }: Submission) =>
  honeypot ||
  startedAt === null ||
  Date.now() - startedAt < MIN_FILL_MS ||
  Date.now() - lastSent() < COOLDOWN_MS ||
  LINK.test(name) ||
  (message.match(LINKS)?.length ?? 0) > MAX_LINKS;

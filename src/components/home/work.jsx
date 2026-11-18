import { ReferencePreview, SupportPreview } from '../agents/CasePreview.jsx';
import AICapPreview from '../aicap/AICapPreview.jsx';
import { FmriCard, MahsjongCard, WeatherClockCard } from './EarlierPreviews.jsx';

/* The work, newest first: one list the home page, every case header and
   every "Next case" read from, so the pages connect in one order. */
export const WORK = [
  { to: '/work/support-agents', title: 'Customer deployments, from requirements to release', meta: 'Agent deployment', q: 'Taking customers’ agents with API tools from requirements to release, and checking every reply against what the agent actually did.', Preview: SupportPreview },
  { to: '/work/policy-agents', title: 'Agents that act on records under policy', meta: 'Agent design', q: 'Card-dispute and HR leave agents: the model reads the request; code decides whether a rule is met.', Preview: ReferencePreview },
  { to: '/projects/aicap', title: 'Voice and touch for wine recommendations', meta: 'Led interaction design · Onki · 2025', q: 'How should a kiosk talk to a shopper who didn’t ask?', Preview: AICapPreview },
  { to: '/projects/weather-clock', title: 'Savoring Weather Clock', meta: 'Interaction design and system code · Meta Design Lab · 2024–2025', q: 'How can an object at home make you notice the weather?', Preview: WeatherClockCard },
  { to: '/projects/mahsjong', title: 'Mah’s Jong', meta: 'Project lead, team of nine · 2025', q: 'What rules can two players learn by playing?', Preview: MahsjongCard },
  { to: '/research/fmri-study', title: 'fMRI study on food imagery and the hypothalamus', meta: 'Research assistant · Affect and Cognition Lab · 2023–2025', q: 'How does a brain respond to an image of food?', Preview: FmriCard },
];

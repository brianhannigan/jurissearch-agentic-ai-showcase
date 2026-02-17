
export interface CaseStudy {
  name: string;
  url: string;
  summary: string;
  year: string;
  jurisdiction: string;
  citation?: string;
  takeaway: string;
  strategicImplication: string;
  confidenceScore: number; // 0-100
}

export interface LegalResearchResult {
  wins: CaseStudy[];
  losses: CaseStudy[];
  sources: { title: string; uri: string }[];
  strategicSummary: string;
}

export type SearchStatus = 'idle' | 'searching' | 'analyzing' | 'completed' | 'error';

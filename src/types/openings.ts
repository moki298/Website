export enum OpeningTeam {
  all = 'All',
  accounting = 'Accounting',
  community = 'Community',
  design = 'Design',
  engineering = 'Engineering',
  marketing = 'Marketing',
}

export interface OpeningsUrlParams {
  openingId: OpeningTeam;
}

export interface Reportee {
  githubUsername?: string;
  name: string;
}

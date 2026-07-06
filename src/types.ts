/**
 * Types representing the catalog data for Doctor+ Android TV app.
 */

export interface Episode {
  id: string;
  title: string;
  url: string;
  part?: string;
  duration?: string;
}

export interface SeasonInfo {
  number: number;
  year?: string;
  folderUrl: string;
}

export interface ShowArc {
  id: string;
  title: string;
  originalTitle?: string;
  firstAired?: string;
  summary: string;
  detailedSummary: string;
  episodes: Episode[];
  poster?: string;
}

export interface SpinOffItem {
  id: string;
  title: string;
  originalTitle?: string;
  description: string;
  poster: string;
  url?: string;
  episodes?: Episode[];
}

export interface SpecialItem {
  id: string;
  title: string;
  originalTitle?: string;
  description: string;
  poster: string;
  url?: string;
  episodes?: Episode[];
  year?: string;
}

export interface Collaborator {
  name: string;
  role: string;
}

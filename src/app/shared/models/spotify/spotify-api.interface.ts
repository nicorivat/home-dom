export interface CurrentlyPlayingObject {
  timestamp: number;
  device: UserDevice;
  progress_ms: number | null;
  is_playing: boolean;
  item: TrackObjectFull | null;
}

export interface UserDevice {
  id: string | null;
  is_active: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number | null;
}

export interface ArtistObjectSimplified {
  name: string;
  id: string;
  type: 'artist';
}

export interface TrackObjectSimplified {
  artists: ArtistObjectSimplified[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  is_playable?: boolean;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

export interface ImageObject {
  height?: number;
  url: string;
  width?: number;
}

export interface AlbumObjectSimplified {
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on';
  album_type: 'album' | 'single' | 'compilation';
  artists: ArtistObjectSimplified[];
  available_markets?: string[];
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  type: 'album';
}

export interface TrackObjectFull extends TrackObjectSimplified {
  album: AlbumObjectSimplified;
  popularity: number;
  is_local?: boolean;
}

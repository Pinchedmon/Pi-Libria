export interface Imovie {
  id: number;
  description: string;
  names: { ru: string; en: string };
  posters: {
    medium: {
      url: string;
    };
  };
  player: {
    host: string;
    playlist: playlists[];
  };
}
interface playlists {
  hls: {
    hd: string;
  };
  preview: string;
}

export type Imovie = {
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
    alternative_player: string;
  };
};

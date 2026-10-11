export type Creator = {
  id: string;
  name: string;
  role: string;
  image: string;
  imagePosition?: string;
  video: string;
  handle?: string;
  reel: string;
};

export const creators: Creator[] = [
  {
    id: "misha-ferreiro",
    name: "Misha Ferreiro",
    role: "Model",
    image: "/images/creators/misha-ferreiro.jpg",
    imagePosition: "62% center",
    video: "/videos/creators/misha-ferreiro.mp4",
    handle: "mishazo.ferrieiro",
    reel: "https://www.instagram.com/reel/DQFB_s_jGLW/",
  },
  {
    id: "leilaa",
    name: "Leilaa",
    role: "Actress & Model",
    image: "/images/creators/leilaa.jpg",
    imagePosition: "40% center",
    video: "/videos/creators/leilaa.mp4",
    handle: "leilaabythemood",
    reel: "https://www.instagram.com/reel/DR_9uoSjMrB/",
  },
  {
    id: "valushka-dsouza",
    name: "Valushka D'Souza",
    role: "Model",
    image: "/images/services/influencer-marketing.jpg",
    imagePosition: "center 35%",
    video: "/videos/creators/valushka-dsouza.mp4",
    handle: "valushkaa__",
    reel: "https://www.instagram.com/reel/DVyzNqZknVr/",
  },
];

export const instagramUrl = ({ handle, reel }: Creator) =>
  handle ? `https://www.instagram.com/${handle}/` : reel;

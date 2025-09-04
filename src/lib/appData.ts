export type Genre = {
  id: number;
  name: string;
  slug: string;
};

export const GENRES: Genre[] = [
  { id: 1, name: "Action", slug: "action" },
  { id: 2, name: "Rom-Com", slug: "rom-com" },
  { id: 3, name: "Romance", slug: "romance" },
  { id: 4, name: "Horror", slug: "horror" },
  { id: 5, name: "Cartoon", slug: "cartoon" },
  { id: 6, name: "Adventure", slug: "adventure" },
  { id: 7, name: "Sci-Fi", slug: "sci-fi" },
  { id: 8, name: "Comedy", slug: "comedy" },
  { id: 9, name: "Drama", slug: "drama" },
];

// Sections of movies
export type MovieSection = {
  id: number;
  title: string;
  viewMoreLink: string; // URL for the "View more" page
};

export const MOVIE_SECTIONS: MovieSection[] = [
  { id: 1, title: "Now Playing", viewMoreLink: "/movies/now-playing" },
  { id: 2, title: "Upcoming", viewMoreLink: "/movies/upcoming" },
  { id: 3, title: "Top Rated", viewMoreLink: "/movies/top-rated" },
  { id: 4, title: "Popular", viewMoreLink: "/movies/popular" },
];

// Footer links
export type FooterLink = {
  id: number;
  label: string;
  href: string;
};

export const FOOTER_INFO = {
  company: [
    { id: 1, label: "About Us", href: "/about" },
    { id: 2, label: "Contact Us", href: "/contact" },
    { id: 3, label: "Terms & Conditions", href: "/terms" },
    { id: 4, label: "Privacy Policy", href: "/privacy" },
    { id: 5, label: "Press", href: "/press" },
  ],
  categories: [
    { id: 1, label: "Videos", href: "/category/videos" },
    { id: 2, label: "Gaming", href: "/category/gaming" },
    { id: 3, label: "Travel", href: "/category/travel" },
    { id: 4, label: "Music", href: "/category/music" },
    { id: 5, label: "Sports", href: "/category/sports" },
  ],
  contact: {
    email: "ana-bemovie@gmail.com",
  },
};

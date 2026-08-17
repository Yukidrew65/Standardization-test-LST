/** Copy and imagery transcribed from the WEBSITE-LST Figma frames. */

// Verified visually against the frames: category-2 (mockup) and category-3
// (watch) are unused assets elsewhere in the Figma file, not homepage tiles.
export const categories = [
  { items: "5 Items", title: "FURNITURE", image: "/images/category-1.png" },
  { items: "5 Items", title: "FURNITURE", image: "/images/category-4.png" },
  { items: "5 Items", title: "FURNITURE", image: "/images/category-5.png" },
  { items: "5 Items", title: "FURNITURE", image: "/images/category-6.png" },
];

export const products = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: "Graphic Design",
  department: "English Department",
  oldPrice: "$16.48",
  price: "$6.48",
  image: `/images/product-${i + 1}.png`,
}));

export const services = [
  {
    icon: "book",
    title: "Easy Wins",
    body: "Get your best looking smile now!",
  },
  {
    icon: "grid",
    title: "Concrete",
    body: "Defalcate is most focused in helping you discover your most beautiful smile",
  },
  {
    icon: "trend",
    title: "Hack Growth",
    body: "Overcame any hurdle or any other problem.",
  },
] as const;

export const posts = Array.from({ length: 3 }, (_, i) => ({
  id: i + 1,
  image: `/images/blog-${i + 1}.png`,
  tags: ["Google", "Trending", "New"],
  title: "Loudest à la Madison #1 (L'integral)",
  body: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
  date: "22 April 2021",
  comments: "10 comments",
}));

export const testimonial = {
  avatar: "/images/avatar.png",
  rating: 4,
  quote:
    "Slate helps you see how many more days you need to work to reach your financial goal.",
  name: "Regina Miles",
  role: "Designer",
  gallery: Array.from({ length: 9 }, (_, i) => `/images/gallery-${i + 1}.png`),
};

export const footerColumns = [
  {
    heading: "Company Info",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  { heading: "Legal", links: ["About Us", "Carrier", "We are hiring", "Blog"] },
  {
    heading: "Features",
    links: [
      "Business Marketing",
      "User Analytic",
      "Live Chat",
      "Unlimited Support",
    ],
  },
  {
    heading: "Resources",
    links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
  },
];

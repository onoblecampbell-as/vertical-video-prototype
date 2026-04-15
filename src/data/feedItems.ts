export const feedItems = [
  {
    id: "organic-1",
    type: "organic",
    videoSrc: "/ref/media/organic-video-1.mp4",
    publisher: "Global Reports",
    publisherVerified: true,
    caption:
      "Exploring the silent depths of the Pacific Northwest. The fog rolls in across the forest canopy.",
    hashtags: ["#Nature", "#Editorial", "#ForestLife"],
    audioLabel: "Original Sound - Global Reports",
    likes: 12500,
    shares: 432,
    captions: "Exploring the silent depths of the Pacific Northwest."
  },
  {
    id: "organic-2-overlay",
    type: "organic",
    videoSrc: "/ref/media/organic-video-2.mp4",
    publisher: "Tech Insights",
    publisherVerified: true,
    caption:
      "The future of hardware is here. Analysing the next generation of neural processing units.",
    hashtags: ["#Tech", "#Analysis", "#AI"],
    audioLabel: "Original Audio - Tech Insights Series",
    likes: 8400,
    shares: 210,
    captions: "The future of hardware is here.",
    hasOverlayAd: true,
    overlayAd: {
      label: "Sponsored",
      title: "Flash Sale: 20% Off",
      description: "Limited-time offer on the Alpha Watch.",
      cta: "Learn more"
    }
  },
  {
    id: "sponsored-1",
    type: "sponsored",
    videoSrc: "/ref/media/sponsored-video-1.mp4",
    sponsor: "Eco-Solutions",
    caption:
      "Redefining urban living with sustainable architecture.",
    likes: 12400,
    shares: 842,
    captions:
      "Redefining urban living with sustainable architecture.",
    sponsoredLabel: "Sponsored",
    cta: "Learn more"
  }
];
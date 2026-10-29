export type Work = { slug: string; title: string; description: string; heroImage: string; detailImage: string; design: string; context: string; role: string; url: string | null; status: string; challenge: string; body: string; result?: string; motionVideo?: string; motionCaption?: string; };

export const works: Work[] = [
  {
    "slug": "kaite",
    "motionVideo": "/videos/projects/kaite-services.mp4",
    "motionCaption": "Scroll demonstration: service backgrounds and card content move in sync.",
    "title": "Kaite",
    "description": "A design studio website with synchronised scroll animations and WordPress integration.",
    "heroImage": "/images/projects/kaite-hero.jpg",
    "detailImage": "/images/projects/kaite-services.jpg",
    "design": "Kaite",
    "context": "Independent collaboration with Kaite",
    "role": "Development, WordPress integration, animation and interaction",
    "url": "https://kaite.studio/",
    "status": "Live",
    "challenge": "Synchronising the services experience",
    "body": "I implemented the website from Kaite’s design and integrated it with WordPress. The key challenge was the services section: background images move together with an overlaid card while the corresponding service information scrolls in sync. I used JavaScript to coordinate these moving elements as one continuous interaction."
  },
  {
    "slug": "lukdeira",
    "motionVideo": "/videos/projects/lukdeira-services-facts.mp4",
    "motionCaption": "Scroll demonstration: the services section transitions into company facts. Pre-launch recording.",
    "title": "Lukdeira",
    "description": "A WordPress website for concrete transport and logistics, with a scroll-driven transition from services to company facts.",
    "heroImage": "/images/projects/lukdeira-hero.jpg",
    "detailImage": "/images/projects/lukdeira-facts.jpg",
    "design": "Kaite",
    "context": "Independent collaboration with Kaite",
    "role": "Development, WordPress integration and animation",
    "url": null,
    "status": "Pre-launch — final content pending",
    "challenge": "Connecting services and facts through motion",
    "body": "I developed the website from Kaite’s design and integrated it with WordPress. The main animation challenge was making the services section transition smoothly into company facts, coordinating the sequence with page scrolling. Development is complete; final client content is pending.",
    "result": "Desktop LCP: 5.0s → 1.0s (5× improvement). Measured by Mantas with Google PageSpeed Insights; historical reports were not retained."
  },
  {
    "slug": "natural-awakenings",
    "title": "Natural Awakenings",
    "description": "A publishing company website with a searchable, filterable local magazine directory.",
    "heroImage": "/images/projects/natural-awakenings-hero.jpg",
    "detailImage": "/images/projects/natural-awakenings-directory.jpg",
    "design": "Agnes",
    "context": "Completed while working at Flip180 Media",
    "role": "Programming and website implementation, including directory search and filtering",
    "url": "https://corp.naturalawakenings.com/",
    "status": "Live",
    "challenge": "Making a magazine directory easy to explore",
    "body": "Working at Flip180 Media, I implemented the website from Agnes’s design. My responsibilities included the magazine directory, its search and filtering functionality. This project brings together a substantial amount of publishing content with tools for finding local publications."
  }
];

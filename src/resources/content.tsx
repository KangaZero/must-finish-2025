import { BentoCardProps } from "@/components/MagicBento";
import type {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
  UserSettings,
  Achievement,
  AchievementPage,
  Skills,
} from "@/types";
import { getLocalTimeZone } from "@/utils/getLocalTimeZone";
import { getPersonsCurrentStatus } from "@/utils/getPersonsCurrentStatus";
import { LetterFx, Logo, Row, Text } from "@once-ui-system/core";

const userSettings: UserSettings = {
  isEffectsEnabled: true,
};

const userLocation = getLocalTimeZone() || "Asia/Tokyo";

const useI18nIndicator = "USE I18N!";

const person: Person = {
  firstName: "Samuel Wai Weng",
  lastName: "Yong",
  workplace: "Accenture",
  name: `Samuel Wai Weng Yong`,
  rubyName: [
    { romaji: "Samuel", furigana: "サムエル", kanji: "" },
    { romaji: "Wai Weng", furigana: "ワイウエング", kanji: "偉栄" },
    { romaji: "Yong", furigana: "ヨング", kanji: "楊" },
  ],
  role: useI18nIndicator,
  avatar: "/images/avatar.png",
  email: "samuelyongw@gmail.com",
  githubUsername: "KangaZero",
  location: userLocation, // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  locationCoordinates: [35.660504, 139.724981], // Latitude, Longitude for Tokyo
  //NOTE: Used for length
  languages: [useI18nIndicator, useI18nIndicator],
  //NOTE: Used for length
  learningLanguages: [
    { language: useI18nIndicator, description: useI18nIndicator },
    { language: useI18nIndicator, description: useI18nIndicator },
    { language: useI18nIndicator, description: useI18nIndicator },
  ],
  technologies: [
    {
      name: "React",
      icon: "react",
      category: "professional",
    },
    {
      name: "TypeScript",
      icon: "typescript",
      category: "professional",
    },
    {
      name: "Rust",
      icon: "rust",
      category: "hobby",
    },
    {
      name: "GoLang",
      icon: "goLang",
      category: "hobby",
    },
    {
      name: "NIXOS",
      icon: "nixOs",
      category: "hobby",
    },
    {
      name: "Vim",
      icon: "vim",
      category: "hobby",
    },
  ],
  currentStatus: getPersonsCurrentStatus(
    userLocation,
  ) as string as Person["currentStatus"],
};

//NOTE: This is used to determine the length of headerHoverCardDetails for now
const headerHoverCardDetails = [
  useI18nIndicator,
  useI18nIndicator,
  useI18nIndicator,
];

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/KangaZero",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/once-ui/",
    essential: true,
  },
  // {
  //   name: "Instagram",
  //   icon: "instagram",
  //   link: "https://www.instagram.com/once_ui/",
  //   essential: false,
  // },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  //   essential: true,
  // },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const skills: Skills = [
  {
    name: "Typescript",
    icon: "typescript",
    essential: true,
    level: "pro",
  },
  {
    name: "Javascript",
    icon: "javascript",
    essential: false,
    level: "pro",
  },
  {
    name: "React",
    icon: "react",
    essential: true,
    level: "pro",
  },
  {
    name: "Git",
    icon: "git",
    essential: true,
    level: "pro",
  },
  {
    name: "Bash",
    icon: "bash",
    essential: true,
    level: "pro",
  },
  {
    name: "Vue",
    icon: "vuejs",
    essential: true,
    level: "hobby",
  },
  {
    name: "Golang",
    icon: "goLang",
    essential: true,
    level: "hobby",
  },
  {
    name: "Rust",
    icon: "rust",
    essential: true,
    level: "hobby",
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: "Samuel Wai Weng Yong's Portfolio",
  description:
    "Welcome to the portfolio of Samuel Wai Weng Yong, a frontend developer specializing in React and TypeScript. Explore projects, skills, and contact information.",
  headline: (
    text1 = useI18nIndicator,
    text2 = useI18nIndicator,
    text3 = useI18nIndicator,
  ) => (
    <Text>
      {text1}
      <br />
      {text2}{" "}
      <LetterFx
        speed="slow"
        trigger="instant"
        charset={"30459uirohe".split("")}
      >
        {text3}
      </LetterFx>
    </Text>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        {/* <strong className="ml-4">Once UI</strong>{" "} */}
        {/* <Line background="brand-alpha-strong" vert height="20" /> */}
        <Text marginRight="4" onBackground="brand-medium">
          {new Date().getFullYear()}
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (text1 = useI18nIndicator) => (
    <Row>
      {text1}{" "}
      <Logo
        wordmark="/trademarks/kanga-zero.svg"
        brand={{
          copy: true,
          url: social.find((item) => item.name === "GitHub")?.link,
        }}
        about="KangaZero logo"
        href={social.find((item) => item.name === "GitHub")?.link}
        style={{
          display: "inline-flex",
          top: "0.25em",
          marginLeft: "0.55em",
          scale: "3",
        }}
      />
      {/* , where I craft intuitive
      <br /> user experiences. After hours, I build my own projects. */}
    </Row>
  ),
};

const projectCardData: Array<BentoCardProps & { id: string }> = [
  {
    correctIndex: 4,
    id: "card-1",
    color: "#060010",
    title: "Analytics",
    description: "Track user behavior",
    label: "Insights",
    image: "https://picsum.photos/id/1011/400/240", // Stock image
    alt: "Analytics dashboard stock image",
  },
  {
    correctIndex: 7,
    id: "card-2",
    color: "#060010",
    title: "Dashboard",
    description: "Centralized data view",
    label: "Overview",
    image: "https://picsum.photos/id/1025/400/240",
    alt: "Dashboard overview stock image",
  },
  {
    correctIndex: 0,
    id: "card-3",
    color: "#060010",
    title: "Collaboration",
    description: "Work together seamlessly",
    label: "Teamwork",
    image: "https://picsum.photos/id/1005/400/240",
    alt: "Collaboration teamwork stock image",
  },
  {
    correctIndex: 1,
    id: "card-4",
    color: "#060010",
    title: "Automation",
    description: "Streamline workflows",
    label: "Efficiency",
    image: "https://picsum.photos/id/1041/400/240",
    alt: "Automation efficiency stock image",
  },
  {
    correctIndex: 3,
    id: "card-5",
    color: "#060010",
    title: "Integration",
    description: "Connect favorite tools",
    label: "Connectivity",
    image: "https://picsum.photos/id/1033/400/240",
    alt: "Integration connectivity stock image",
  },
  {
    correctIndex: 5,
    id: "card-6",
    color: "#060010",
    title: "Security",
    description: "Enterprise-grade protection",
    label: "Protection",
    image: "https://picsum.photos/id/1027/400/240",
    alt: "Security protection stock image",
  },
  {
    correctIndex: 2,
    id: "card-7",
    color: "#060010",
    title: "Test",
    description: "Amazing",
    label: "Testing",
    image: "https://picsum.photos/id/1050/400/240",
    alt: "Test amazing stock image",
  },
  {
    correctIndex: 6,
    id: "card-8",
    color: "#060010",
    title: "Security",
    description: "Enterprise-grade protection",
    label: "Protection",
    image: "https://picsum.photos/id/1062/400/240",
    alt: "Security protection stock image",
  },
];

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: useI18nIndicator,
    // <>
    //   Professional Frontend Developer specialized in React and TypeScript.
    //   Hobbyist Backend Developer and Rust, Golang, NIXOS enjoyer.
    // </>
  },
  work: {
    display: true, // set to false to hide this section
    title: useI18nIndicator, // Work Experience
    experiences: [
      {
        company: "Accenture",
        timeframe: "2023 - Present",
        role: "Frontend Developer",
        achievements: [
          <>
            <b>Unified a fragmented ecosystem</b> of legacy tools (Excel,
            PowerPoint, and Sharepoint docs) into a single, standardized
            platform, creating a <q>single source of truth</q> for enterprise
            workflows.
          </>,
          <>
            <b>Developed interactive visual builders</b>, including an SAP
            component canvas and a design-flow engine, allowing users to build
            and test enterprise applications through a drag-and-drop interface.
          </>,
          <>
            <b>
              Engineered an <q>App-Wide Intelligence</q> layer
            </b>{" "}
            that enables the platform to automatically read, update, and
            refactor data across the entire web application to ensure
            consistency.
          </>,
          <>
            <b>Transformed the Developer Experience (DX)</b> by replacing slow,
            manual documentation processes with automated tools, significantly
            reducing project delivery times and operational costs.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Timewitch",
        timeframe: "2023",
        role: "Fullstack intern",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple
            platforms, improving design consistency by 40%.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: useI18nIndicator, //Education
    //WARNING: If there is more than 1 might just move the logoWordmark to the translation file itself
    institutions: [
      {
        name: useI18nIndicator, //USYD
        description: useI18nIndicator,
        logoWordmark: "/trademarks/university-of-sydney-logo.svg",
        title: useI18nIndicator,
      },
    ],
    images: [],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>Building next gen apps with Next.js + Once UI + Supabase.</>
        ),
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const achievements: AchievementPage = {
  path: "/achievements",
  label: "Achievements",
  title: "Achievements",
  description: `Unlockable achievements from this portfolio`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const LOCAL_STORAGE_KEY = "achievements";

const achievementsList: Array<Achievement> = [
  {
    id: 1,
    title: "New Beginnings",
    description: "Entered the page for the first time",
    rarity: "common",
    isUnlocked: false,
  },
  {
    id: 2,
    title: "Eos",
    description: "Changed the theme of the page",
    rarity: "common",
    isUnlocked: false,
  },
  {
    id: 3,
    title: "Fashion Police",
    description: "Changed the style overlay of the page",
    rarity: "common",
    isUnlocked: false,
  },
  {
    id: 4,
    title: "Snoopy Detective",
    description: "Found the creator's workplace",
    rarity: "uncommon",
    isUnlocked: false,
  },
  {
    id: 5,
    title: "Social Stalker",
    description: "Looked at all of the creator's socials",
    rarity: "uncommon",
    isUnlocked: false,
  },
  {
    id: 6,
    title: "Test",
    description: "Test achievement for development purposes",
    rarity: "uncommon",
    isUnlocked: false,
  },
  {
    id: 7,
    title: "Puzzle Master",
    description: "Solved the most difficult puzzle ever created",
    rarity: "rare",
    isUnlocked: false,
  },
  {
    id: 19,
    title: "Sand Mandala",
    description: "Reset achievements under mysterious conditions",
    noOfAchievementsRequiredToUnlock: 99, // Note: Not the actual number, see below for its reassignment
    rarity: "rare",
    isUnlocked: false,
  },
  {
    id: 21,
    title: "Go Touch Grass",
    description: "Unlocked all achievements",
    rarity: "legendary",
    isUnlocked: false,
  },
];

const negativeAchievement: Achievement = {
  //NOTE: This is a negative achievement, a secret one not counted in 100% completion
  id: -1,
  title: "Speedophile",
  description: "Unlocked all achievements in less than 67 seconds",
  rarity: "mythic",
  isUnlocked: false,
};

//NOTE: Have to reassign noOfAchievementsRequiredToUnlock for Sand Mandala, as "achievementList" cannot be called in itself

const sandMandalaIndex = achievementsList.findIndex(
  (achievement) => achievement.title === "Sand Mandala",
);
if (sandMandalaIndex !== -1) {
  achievementsList[sandMandalaIndex].noOfAchievementsRequiredToUnlock =
    achievementsList.length - 6;
} else {
  achievementsList.push({
    id: 19,
    title: "Sand Mandala",
    description: "Reset achievements under mysterious conditions",
    noOfAchievementsRequiredToUnlock: achievementsList.length - 6, // Total achievements minus the 5 left to unlock and itself
    rarity: "rare",
    isUnlocked: false,
  });
}

const achievementTrophyMapping = {
  common: "🏆",
  uncommon: "🎖️",
  rare: "🥇",
  legendary: "🌟",
  mythic: "💎",
} as const;

const WMOCodeDescriptions = {
  0: {
    day: {
      description: "Sunny",
      icon: "clearDay",
    },
    night: {
      description: "Clear",
      icon: "clearNight",
    },
  },
  1: {
    day: {
      description: "Mainly Sunny",
      icon: "clearDay",
    },
    night: {
      description: "Mainly Clear",
      icon: "clearNight",
    },
  },
  2: {
    day: {
      description: "Partly Cloudy",
      icon: "cloudyDay",
    },
    night: {
      description: "Partly Cloudy",
      icon: "cloudyNight",
    },
  },
  3: {
    day: {
      description: "Cloudy",
      icon: "cloudy",
    },
    night: {
      description: "Cloudy",
      icon: "cloudy",
    },
  },
  45: {
    day: {
      description: "Foggy",
      icon: "foggy",
    },
    night: {
      description: "Foggy",
      icon: "foggy",
    },
  },
  48: {
    day: {
      description: "Rime Fog",
      icon: "foggy",
    },
    night: {
      description: "Rime Fog",
      icon: "foggy",
    },
  },
  51: {
    day: {
      description: "Light Drizzle",
      icon: "drizzle",
    },
    night: {
      description: "Light Drizzle",
      icon: "drizzle",
    },
  },
  53: {
    day: {
      description: "Drizzle",
      icon: "drizzle",
    },
    night: {
      description: "Drizzle",
      icon: "drizzle",
    },
  },
  55: {
    day: {
      description: "Heavy Drizzle",
      icon: "drizzle",
    },
    night: {
      description: "Heavy Drizzle",
      icon: "drizzle",
    },
  },
  56: {
    day: {
      description: "Light Freezing Drizzle",
      icon: "drizzle",
    },
    night: {
      description: "Light Freezing Drizzle",
      icon: "drizzle",
    },
  },
  57: {
    day: {
      description: "Freezing Drizzle",
      icon: "drizzle",
    },
    night: {
      description: "Freezing Drizzle",
      icon: "drizzle",
    },
  },
  61: {
    day: {
      description: "Light Rain",
      icon: "rainy",
    },
    night: {
      description: "Light Rain",
      icon: "rainy",
    },
  },
  63: {
    day: {
      description: "Rain",
      icon: "rainy",
    },
    night: {
      description: "Rain",
      icon: "rainy",
    },
  },
  65: {
    day: {
      description: "Heavy Rain",
      icon: "rainy",
    },
    night: {
      description: "Heavy Rain",
      icon: "rainy",
    },
  },
  66: {
    day: {
      description: "Light Freezing Rain",
      icon: "rainy",
    },
    night: {
      description: "Light Freezing Rain",
      icon: "rainy",
    },
  },
  67: {
    day: {
      description: "Freezing Rain",
      icon: "rainy",
    },
    night: {
      description: "Freezing Rain",
      icon: "rainy",
    },
  },
  71: {
    day: {
      description: "Light Snow",
      icon: "snowflake",
    },
    night: {
      description: "Light Snow",
      icon: "snowflake",
    },
  },
  73: {
    day: {
      description: "Snow",
      icon: "snowflake",
    },
    night: {
      description: "Snow",
      icon: "snowflake",
    },
  },
  75: {
    day: {
      description: "Heavy Snow",
      icon: "snowflake",
    },
    night: {
      description: "Heavy Snow",
      icon: "snowflake",
    },
  },
  77: {
    day: {
      description: "Snow Grains",
      icon: "snowflake",
    },
    night: {
      description: "Snow Grains",
      icon: "snowflake",
    },
  },
  80: {
    day: {
      description: "Light Showers",
      icon: "rainy",
    },
    night: {
      description: "Light Showers",
      icon: "rainy",
    },
  },
  81: {
    day: {
      description: "Showers",
      icon: "rainy",
    },
    night: {
      description: "Showers",
      icon: "rainy",
    },
  },
  82: {
    day: {
      description: "Heavy Showers",
      icon: "rainy",
    },
    night: {
      description: "Heavy Showers",
      icon: "rainy",
    },
  },
  85: {
    day: {
      description: "Light Snow Showers",
      icon: "rainy",
    },
    night: {
      description: "Light Snow Showers",
      icon: "rainy",
    },
  },
  86: {
    day: {
      description: "Snow Showers",
      icon: "snow",
    },
    night: {
      description: "Snow Showers",
      icon: "snow",
    },
  },
  95: {
    day: {
      description: "Thunderstorm",
      icon: "thunderstorm",
    },
    night: {
      description: "Thunderstorm",
      icon: "thunderstorm",
    },
  },
  96: {
    day: {
      description: "Light Thunderstorms With Hail",
      icon: "thunderstorm",
    },
    night: {
      description: "Light Thunderstorms With Hail",
      icon: "thunderstorm",
    },
  },
  99: {
    day: {
      description: "Thunderstorm With Hail",
      icon: "thunderstorm",
    },
    night: {
      description: "Thunderstorm With Hail",
      icon: "thunderstorm",
    },
  },
} as const;

export {
  userSettings,
  person,
  headerHoverCardDetails,
  social,
  skills,
  newsletter,
  home,
  projectCardData,
  about,
  blog,
  work,
  gallery,
  achievementsList,
  achievements,
  negativeAchievement,
  achievementTrophyMapping,
  LOCAL_STORAGE_KEY,
  useI18nIndicator,
  WMOCodeDescriptions,
};

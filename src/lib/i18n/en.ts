import { getLocalTimeZone } from "@/utils/getLocalTimeZone";
import { getPersonsCurrentStatus } from "@/utils/getPersonsCurrentStatus";

const userLocation = getLocalTimeZone() || "Asia/Tokyo";
//WARNING: Following used for metaData: Don't add for title, description, baseURL, path, image
//NOTE: keep the structure as close to content.tsx as possible
// Keys (except person.languages) wrapped in arrays are used for ReactNode parameters or functions
const en = {
  notFound: {
    heading: "Page Not Found",
    text: "The page you are looking for does not exist.",
    link: "Return Home",
  },
  person: {
    workplace: "Accenture",
    languages: ["English", "Japanese"],
    role: "Frontend Developer",
    technologies: {
      category: {
        professional: "professional",
        hobby: "hobby",
      },
    },
    currentStatus: getPersonsCurrentStatus(userLocation, "en"),
  },
  //NOTE: this still exists in content.ts and is used to determine the length
  //TODO: in the future just use this to determine the length
  headerHoverCardDetails: [
    `Based in ${userLocation}`,
    `Working at Accenture`,
    `Currently ${getPersonsCurrentStatus(userLocation, "en")}`,
  ],
  headerDate: {
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  home: {
    code: `// To visit the About page, type this in your browser console:\nwindow.location.href = '/about';`,
    headline: ["Generic Portfolio", "Generic", "Look"],
    subline: ["Created by"],
    projects: "Projects",
  },
  about: {
    label: "About",
  },
  work: {
    label: "Work",
  },
  blog: {
    label: "Blog",
  },
  achievements: {
    label: "Achievements",
  },
  gallery: {
    label: "Gallery",
  },
} as const;
export default en;

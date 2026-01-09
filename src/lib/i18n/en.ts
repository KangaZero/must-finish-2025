import { getLocalTimeZone } from "@/utils/getLocalTimeZone";
import { getPersonsCurrentStatus } from "@/utils/getPersonsCurrentStatus";

const userLocation = getLocalTimeZone() || "Asia/Tokyo";
//WARNING: Following used for metaData: Don't add for title, description, baseURL, path, image
//NOTE: keep the structure as close to content.tsx as possible
// Keys (except person.languages) wrapped in arrays are used for ReactNode parameters or functions
const en = {
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
  headerHoverCardDetails: [
    `Based in ${userLocation}`,
    `Working at Accenture`,
    `Currently ${getPersonsCurrentStatus(userLocation, "en")}`,
  ],
  home: {
    code: `// To visit the About page, type this in your browser console:\nwindow.location.href = '/about';`,
    headline: ["Generic Portfolio", "Generic", "Look"],
    subline: ["Created by"],
  },
} as const;
export default en;

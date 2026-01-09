import { getLocalTimeZone } from "@/utils/getLocalTimeZone";
import { getPersonsCurrentStatus } from "@/utils/getPersonsCurrentStatus";

const userLocation = getLocalTimeZone() || "Asia/Tokyo";
const en = {
  person: {
    workplace: "Accenture",
    languages: ["English", "Japanese"],
    technologies: {
      category: {
        professional: "professional",
        hobby: "hobby",
      },
    },
    currentStatus: getPersonsCurrentStatus(userLocation),
  },
} as const;
export default en;

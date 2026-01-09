import { getLocalTimeZone } from "@/utils/getLocalTimeZone";
import { getPersonsCurrentStatus } from "@/utils/getPersonsCurrentStatus";

const userLocation = getLocalTimeZone() || "Asia/Tokyo";
//WARNING: Following used for metaData: Don't add for title, description, baseURL, path, image
//NOTE: content structure matches en.ts for type safety and consistency
// Keys (except person.languages) wrapped in arrays are used for ReactNode parameters or functions
const ja = {
  person: {
    workplace: "アクセンチュア",
    languages: ["英語", "日本語"],
    role: "フロントエンド開発者",
    technologies: {
      category: {
        professional: "プロフェッショナル",
        hobby: "趣味",
      },
    },
    currentStatus: getPersonsCurrentStatus(userLocation, "ja"),
  },
  headerHoverCardDetails: [
    `${userLocation} 拠点`,
    `アクセンチュアで勤務中`,
    `現在は${getPersonsCurrentStatus(userLocation, "ja")}`,
  ],
  home: {
    code: `// Aboutページに移動するには、ブラウザのコンソールに以下を入力してください:\nwindow.location.href = '/about';`,
    headline: [
      "創造力と技術の融合",
      "次世代フロントエンド開発",
      "あなたのアイデアを形に",
    ],
    subline: ["作成者"],
  },
} as const;
export default ja;

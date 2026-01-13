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
  headerDate: {
    days: [
      "日曜日", // Sunday
      "月曜日", // Monday
      "火曜日", // Tuesday
      "水曜日", // Wednesday
      "木曜日", // Thursday
      "金曜日", // Friday
      "土曜日", // Saturday
    ],
    months: [
      "正月", // January (Shōgatsu)
      "如月", // February (Kisaragi)
      "弥生", // March (Yayoi)
      "卯月", // April (Uzuki)
      "皐月", // May (Satsuki)
      "水無月", // June (Minazuki)
      "文月", // July (Fumizuki)
      "葉月", // August (Hazuki)
      "長月", // September (Nagatsuki)
      "神無月", // October (Kannazuki)
      "霜月", // November (Shimotsuki)
      "師走", // December (Shiwasu)
    ],
  },
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

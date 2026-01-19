import { getLocalTimeZone } from "@/utils/getLocalTimeZone";
import { getPersonsCurrentStatus } from "@/utils/getPersonsCurrentStatus";

const userLocation = getLocalTimeZone() || "Asia/Tokyo";
//WARNING: Following used for metaData: Don't add for title, description, baseURL, path, image
//NOTE: content structure matches en.ts for type safety and consistency
// Keys (except person.languages) wrapped in arrays are used for ReactNode parameters or functions
const ja = {
  notFound: {
    heading: "ページが見つかりません",
    text: "お探しのページは存在しません。",
    link: "ホームに戻る",
  },
  person: {
    workplace: "アクセンチュア",
    languages: ["英語", "日本語"],
    learningLanguages: [
      {
        language: "マレー語",
        description: "会話レベル",
      },
      {
        language: "中国語",
        description: "限定的な能力",
      },
      {
        language: "ドイツ語",
        description: "読解限定",
      },
    ],
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
    `現在地 ${userLocation}`,
    `アクセンチュアに在職中`,
    `只今${getPersonsCurrentStatus(userLocation, "ja")}`,
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
    projects: "プロジェクト",
  },
  about: {
    label: "概要",
    intro: {
      title: "自己紹介",
      description: `
      React / TypeScript 専門のフロントエンドエンジニア。 バックエンドは趣味で、Rust / Golang / NixOS 推しです。
      `,
    },
    work: {
      title: "職務経歴",
      //NOTE: Space is intentional to split the title
      subtitle: "フロントエンド 開発者",
      //? For TrueFocus component, the blurred text will always show this, while when focused shows "Title"
      subtitleBlur: "バックエンド",
    },
    studies: {
      title: "学歴",
      institutions: [
        {
          name: "シドニー大学",
          description: "クラシックピアノ専攻/フルスタックWeb開発副専攻",
          title: "文学士",
        },
      ],
    },
  },
  work: {
    label: "仕事",
  },
  blog: {
    label: "ブログ",
  },
  achievements: {
    label: "実績",
  },
  gallery: {
    label: "ギャラリー",
  },
} as const;
export default ja;

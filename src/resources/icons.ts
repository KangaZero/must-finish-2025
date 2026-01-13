import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import { TbLanguageHiragana } from "react-icons/tb";
import { RiEnglishInput } from "react-icons/ri";
import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiFigma,
  SiSupabase,
  SiVim,
  SiNixos,
  SiDrizzle,
} from "react-icons/si";

import {
  MdOutlineCancel,
  MdFoggy,
  MdThunderstorm,
  MdNightsStay,
} from "react-icons/md";

import {
  FaDiscord,
  FaFilter,
  FaGithub,
  FaLinkedin,
  FaX,
  FaThreads,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPinterest,
  FaWhatsapp,
  FaReddit,
  FaTelegram,
  FaRegSun,
  FaReact,
  FaRust,
  FaGolang,
  FaTrophy,
} from "react-icons/fa6";

import { FaShareAlt, FaCloud, FaSnowflake } from "react-icons/fa";
import {
  IoIosSunny,
  IoMdPartlySunny,
  IoIosCloudyNight,
  IoIosCloudy,
  IoIosRainy,
} from "react-icons/io";

export const iconLibrary = {
  arrowUpRight: HiArrowUpRight,
  arrowRight: HiArrowRight,
  cloud: FaCloud,
  email: HiEnvelope,
  globe: HiOutlineGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  filter: FaFilter,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaX,
  trophy: FaTrophy,
  twitter: FaXTwitter,
  threads: FaThreads,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  document: HiOutlineDocument,
  rocket: HiOutlineRocketLaunch,
  javascript: SiJavascript,
  typescript: SiTypescript,
  rust: FaRust,
  goLang: FaGolang,
  vim: SiVim,
  nixOs: SiNixos,
  nextjs: SiNextdotjs,
  supabase: SiSupabase,
  figma: SiFigma,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
  instagram: FaInstagram,
  sun: FaRegSun,
  ioiosSunny: IoIosSunny,
  react: FaReact,
  share: FaShareAlt,
  outlineCancel: MdOutlineCancel,
  languageHiragana: TbLanguageHiragana,
  englishInput: RiEnglishInput,
  //Weather Specific Icons
  cloudy: IoIosCloudy,
  cloudyDay: IoMdPartlySunny,
  cloudyNight: IoIosCloudyNight,
  clearDay: IoIosSunny,
  clearNight: MdNightsStay,
  foggy: MdFoggy,
  rainy: IoIosRainy,
  thunderstorm: MdThunderstorm,
  snowflake: FaSnowflake,
  drizzle: SiDrizzle,
} as const satisfies Record<string, IconType>;

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;

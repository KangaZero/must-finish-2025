"use client";

import { ClientInfo, TypeSafeClientInfo } from "@/types";
import { whoAmI } from "@/utils/getUserFingerprint";
import {
  ReactNode,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";

type UserInfoContextType = {
  userInfo: null | ClientInfo;
  typeSafeUserInfo: null | TypeSafeClientInfo;
};
const UserInfoContext = createContext<UserInfoContextType | undefined>(
  undefined,
);

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<null | ClientInfo>(null);
  const [typeSafeUserInfo, setTypeSafeUserInfo] =
    useState<null | TypeSafeClientInfo>(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (typeof window === "undefined")
          return console.warn("no document detected for UserInfoContext");
        const userFingerprint = await whoAmI();
        if (userFingerprint) {
          setUserInfo(userFingerprint);
        } else {
          console.warn("User fingerprint data is unavailable.");
        }
      } catch (error) {
        console.error("Error fetching user fingerprint:", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (!userInfo) return;
    const platform = /Win|Windows/i.test(userInfo.platform)
      ? "windows"
      : /Mac|Macintosh|Mac OS X/i.test(userInfo.platform)
        ? "macos"
        : /Linux/i.test(userInfo.platform)
          ? "linux"
          : /Android/i.test(userInfo.platform)
            ? "android"
            : /iPhone|iPad|iPod/i.test(userInfo.platform)
              ? "ios"
              : "other";
    /**
     * Get battery icon based on battery level
     * @param batteryLevel @type number | unknown
     * @returns
     */
    const getBatteryIcon = (
      batteryLevel: number | null,
      isCharging: boolean | null,
    ): TypeSafeClientInfo["batteryIcon"] => {
      if (typeof batteryLevel !== "number" || typeof isCharging !== "boolean")
        return "batteryUnknown";
      if (isCharging) return "batteryCharging";
      if (batteryLevel >= 80) return "batteryFull";
      if (batteryLevel >= 70) return "batteryThreeQuarters";
      if (batteryLevel >= 40) return "batteryHalf";
      if (batteryLevel > 15) return "batteryQuarter";
      return "batteryEmpty";
    };

    setTypeSafeUserInfo({
      ...userInfo,
      platform,
      batteryIcon: getBatteryIcon(
        userInfo.batteryLevel,
        userInfo.batteryCharging,
      ),
    });
  }, [userInfo]);

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        typeSafeUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context)
    throw new Error("useUserInfo must be used within a UserInfoContext");
  return context;
};

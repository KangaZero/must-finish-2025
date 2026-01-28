"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { protectedRoutes, routes } from "@/resources";
import {
  Row,
  Button,
  Heading,
  Column,
  PasswordInput,
  Flex,
  Spinner,
} from "@once-ui-system/core";
import NotFound from "@/app/[lang]/not-found";
import { useUserInfo } from "@/components/UserInfoProvider";
import { useAchievements } from "@/components/AchievementsProvider";
import StartTerminal from "./StartTerminal";
// import { SlideTransition } from "@/components/ui/slideTransition";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const { isStartInitialized } = useUserInfo();
  const { unlockAchievement } = useAchievements();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;

        let extractedOutLocalePathname = pathname.match("(en|ja)")
          ? pathname.split("/")
          : pathname;
        // ? This is the home page
        if (
          extractedOutLocalePathname.length === 2 &&
          extractedOutLocalePathname[0] === ""
        ) {
          extractedOutLocalePathname = "/";
          // ? These are static page routes
        } else if (extractedOutLocalePathname.length === 3) {
          extractedOutLocalePathname = `/${extractedOutLocalePathname[2]}`;
        }
        // console.trace(extractedOutLocalePathname, "extractedOutLocalePathname");
        if (
          typeof extractedOutLocalePathname === "string" &&
          extractedOutLocalePathname in routes
        ) {
          return routes[extractedOutLocalePathname as keyof typeof routes];
        }

        return false;

        // const dynamicRoutes = ["/blog", "/work"] as const;
        // for (const route of dynamicRoutes) {
        //   if (pathname?.startsWith(route) && routes[route]) {
        //     return true;
        //   }
        // }

        // return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth style={{ minHeight: "90dvh" }} horizontal="center">
        <Spinner />
      </Flex>
    );
  }
  if (!isStartInitialized) {
    return (
      <Column fillWidth>
        <Row style={{ minHeight: "90dvh" }} center fill>
          <StartTerminal enableDialog={false} />
        </Row>
      </Column>
    );
  }

  if (!isRouteEnabled) {
    unlockAchievement("Out of Bounds");
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return (
    <Suspense
      fallback={
        <Flex fillWidth style={{ minHeight: "90dvh" }} horizontal="center">
          <Spinner />
        </Flex>
      }
    >
      {/*<SlideTransition name="slide">*/}
      {children}
      <StartTerminal enableDialog />
      {/*</SlideTransition>*/}
    </Suspense>
  );
};

export { RouteGuard };

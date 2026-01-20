"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { protectedRoutes, routes } from "@/resources";
import {
  Row,
  Spinner,
  Button,
  Heading,
  Column,
  PasswordInput,
} from "@once-ui-system/core";
import NotFound from "@/app/[lang]/not-found";
import RotatingText from "@/components/ui/RotatingText";
import { useLocale } from "@/components/LocaleProvider";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const { translate } = useLocale();
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
      <Column fillWidth paddingY="128" horizontal="center">
        <RotatingText
          texts={[
            translate("loading.0"),
            translate("loading.1"),
            translate("loading.2"),
          ]}
          mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3500}
        />
        <Row center fillWidth paddingTop="12">
          <Spinner size="xl" />
        </Row>
      </Column>
    );
  }

  if (!isRouteEnabled) {
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

  return <>{children}</>;
};

export { RouteGuard };

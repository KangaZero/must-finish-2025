import React, { ReactNode } from "react";
import type { IconName } from "@/resources/icons";
import type { IconButtonProps as OriginalIconButtonProps } from "@once-ui-system/core";

declare module "@once-ui-system/core" {
   interface IconButtonProps extends Omit<OriginalIconButtonProps, "icon"> {
    icon: IconName;
  }
}

// declare module "@once-ui-system/core/dist/components" {
//   export interface IconButtonProps {
//     icon?: IconName;
//   }
// }
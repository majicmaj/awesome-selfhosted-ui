import { LICENSE_DESCRIPTIONS } from "../constants/licenseDescriptions";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LicenseTooltip({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-xs bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-100 p-2 rounded-md"
          style={{ maxWidth: "200px", whiteSpace: "normal" }}
        >
          {title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const License = ({ license }: { license: string }) => {
  const licenseDescription =
    license in LICENSE_DESCRIPTIONS
      ? LICENSE_DESCRIPTIONS[license as keyof typeof LICENSE_DESCRIPTIONS]
      : "No description available";

  return (
    <LicenseTooltip title={licenseDescription}>
      <span className="inline-flex truncate items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-mono">
        {license}
      </span>
    </LicenseTooltip>
  );
};

export default License;

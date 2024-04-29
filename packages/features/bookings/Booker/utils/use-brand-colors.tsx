import useGetBrandingColours from "@timely/lib/getBrandColours";
import useTheme from "@timely/lib/hooks/useTheme";
import { useTimelyTheme } from "@timely/ui";

export const useBrandColors = ({
  brandColor,
  darkBrandColor,
  theme,
}: {
  brandColor?: string;
  darkBrandColor?: string;
  theme?: string | null;
}) => {
  const brandTheme = useGetBrandingColours({
    lightVal: brandColor,
    darkVal: darkBrandColor,
  });

  useTimelyTheme(brandTheme);
  useTheme(theme);
};

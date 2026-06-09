import type { ImageType } from "@client/shared/general.types";
import styled, { type CSSObject } from "@emotion/styled";

export const Container = styled.div<{
  image: ImageType;
  styles?: CSSObject;
}>(({ image, styles }) => ({
  display: "flex",
  alignContent: "end",
  justifyContent: "center",
  width: image.width,
  height: image.height,
  backgroundImage: `url(${image.url})`,
  backgroundPosition: image.coordinates,
  ...styles,
}));

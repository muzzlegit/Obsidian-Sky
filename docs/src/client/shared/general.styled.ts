import styled, { type CSSObject } from "@emotion/styled";

export const ImagePlaceholder = styled.div<{ styles?: CSSObject }>(
  ({ styles }) => ({
    width: "100%",
    height: "100%",
    borderRadius: "4px",
    backgroundColor: "grey",
    ...styles,
  })
);

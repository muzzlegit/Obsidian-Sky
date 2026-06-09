import { type CSSProperties } from "@emotion/serialize";
import styled from "@emotion/styled";

type FlexWrap = {
  flexDirection?: CSSProperties["flexDirection"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  flexWrap?: CSSProperties["flexWrap"];
  gap?: string;
  margin?: CSSProperties["margin"];
  padding?: CSSProperties["padding"];
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
};

export const FlexWrap = styled.div<FlexWrap>(
  ({
    flexDirection,
    alignItems,
    justifyContent,
    flexWrap,
    gap,
    margin,
    padding,
    height,
    width,
  }) => ({
    margin,
    padding,
    height,
    width,
    display: "flex",
    flexDirection,
    flexWrap,
    alignItems,
    justifyContent,
    gap,
  })
);

import styled from "@emotion/styled";

export const Container = styled.div<{ isGrid: boolean }>(({ isGrid }) => ({
  position: "relative",
  width: "110px",
  height: "75px",
  border: isGrid ? "1px dotted grey" : "none",
}));

export const Index = styled.div(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  paddingTop: "2px",
  paddingLeft: "4px",
  color: theme.colors.textPrimary,
  fontWeight: 700,
  lineHeight: "normal",
}));

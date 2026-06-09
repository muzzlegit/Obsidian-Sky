import styled from "@emotion/styled";

export const Container = styled.div({
  position: "relative",
  width: "100%",
  height: "100%",
});

export const Wrap = styled.div({
  position: "absolute",
  bottom: 0,
  left: "50%",
  transform: "translate(-50%, 0)",
  zIndex: 100,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2px",
});

export const Name = styled.span(({ theme }) => ({
  marginBottom: "2px",
  color: theme.colors.textPrimary,
  fontSize: "10px",
  fontWeight: 700,
  textWrap: "nowrap",
}));

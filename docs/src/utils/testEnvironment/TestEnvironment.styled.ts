import styled from "@emotion/styled";

export const Container = styled.div({
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 999,
  padding: "8px",
  width: "400px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderLeft: "1px solid #000",
  backgroundColor: "#6a6a6a",
});

export const MenuButton = styled.button({
  marginTop: "20px",
  marginRight: "20px",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 999,
  width: "48px",
  height: "48px",
  border: "1px solid #000",
  borderRadius: "50%",
  backgroundColor: "#4a4a4a",
  fontSize: "26px",
});

export const TestButton = styled.button({
  padding: "2px 4px",
  width: "fit-content",
  border: "1px solid #000",
  borderRadius: "4px",
  backgroundColor: "#4a4a4a",
});

export const PlayerWrap = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const ButtonsWrap = styled.div({
  marginTop: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const CloseButton = styled.button({
  padding: "2px 4px",
  border: "1px solid #000",
  borderRadius: "4px",
  backgroundColor: "#5b5a5a",
});

export const ComponentContainer = styled.div({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 999,

  border: "1px solid #000",
});

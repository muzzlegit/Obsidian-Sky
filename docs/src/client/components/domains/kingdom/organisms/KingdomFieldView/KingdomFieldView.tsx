import type { ReactNode } from "react";
import { Container, Index } from "./KingdomFieldView.styled";

type KingdomFieldViewProps = {
  fieldIndex: number;
  domain?: ReactNode;
};

export const KingdomFieldView = ({
  fieldIndex,
  domain,
  ...rest
}: KingdomFieldViewProps) => {
  return (
    <Container isGrid={true} {...rest}>
      <Index>{fieldIndex + 1}</Index>
      {domain ? domain : null}
    </Container>
  );
};

import { ImageBox } from "@client/components/general/ImageBox/ImageBox";
import { type RuinUI } from "@client/sharedBridge";
import { Container, Name, Wrap } from "./RuinMarker.styled";

type RuinMarkerProps = {
  ruin: RuinUI | null;
};

export const RuinMarker = ({ ruin }: RuinMarkerProps) => {
  if (!ruin) return null;
  return (
    <Container>
      <Wrap>
        <ImageBox
          image={null}
          placeHolderStyles={{ height: "60px", width: "50px" }}
        />

        <Name>{`Руїни [${ruin.level}]`}</Name>
      </Wrap>
    </Container>
  );
};

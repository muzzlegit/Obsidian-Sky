import { ImagePlaceholder } from "@client/shared/general.styled";
import type { ImageType } from "@client/shared/general.types";
import type { CSSObject } from "@emotion/react";
import { type ReactNode } from "react";
import { Container } from "./ImageBox.styled";

type ImageBoxProps = {
  image: ImageType | null;
  styles?: CSSObject;
  placeHolderStyles?: CSSObject;
  children?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const ImageBox = ({
  image,
  styles,
  placeHolderStyles,
  children,
  ...rest
}: ImageBoxProps) => {
  return (
    <>
      {image ? (
        <Container image={image} styles={styles} {...rest}>
          {children}
        </Container>
      ) : (
        <ImagePlaceholder styles={placeHolderStyles} />
      )}
    </>
  );
};

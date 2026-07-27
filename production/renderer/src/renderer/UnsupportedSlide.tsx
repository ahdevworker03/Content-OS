import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import Subtitle from "../components/ui/Subtitle";

type UnsupportedSlideProps = {
  layout: string;
};

export default function UnsupportedSlide({ layout }: UnsupportedSlideProps) {
  return (
    <Slide>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "8px",
          opacity: 0.5,
        }}
      >
        <Subtitle>Unknown Layout</Subtitle>
        <Title as="h2">{layout}</Title>
      </div>
    </Slide>
  );
}

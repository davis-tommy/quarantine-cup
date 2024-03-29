import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Features from "./Features";

function FeaturesSection(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={2}
          spaced={true}
          className="text-center"
        ></SectionHeader>
        <Features
          items={[
            {
              title: "Start a call",
              description:
                "Video call your friends on your favorite platform - Zoom, Hangouts, Facebook, etc.",
              image: "/video-call.svg",
            },
            {
              title: "Create a room",
              description: `Click "New Game" above to start a room. You'll need to create an account if you haven't done that yet.`,
              image: "/room.svg",
            },
            {
              title: "Share and play",
              description: `Share the link with all your friends. As soon as they all join, click "Let's play".`,
              image: "/playing-cards.svg",
            },
          ]}
        ></Features>
      </Container>
    </Section>
  );
}

export default FeaturesSection;

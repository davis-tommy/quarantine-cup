import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Auth from "./Auth";

function AuthSection(props) {
  // Values for each auth type
  const allTypeValues = {
    signin: {
      // Top title
      title: "Let's get you signed in so you can play!",
      subtitle: `No account yet? <a href="/auth/signup">Sign up here</a>.`,
      // Submit button text
      buttonText: "Sign in",
      // Link text to other auth types
      linkTextSignup: "Create an account",
      linkTextForgotpass: "Forgot Password?",
    },
    signup: {
      title: "Get yourself an account",
      buttonText: "Sign up",
      linkTextSignin: "Sign in",
    },
    forgotpass: {
      title: "Get a new password",
      buttonText: "Reset password",
    },
    changepass: {
      title: "Choose a new password",
      buttonText: "Change password",
    },
  };

  // Ensure we have a valid auth type
  const currentType = allTypeValues[props.type] ? props.type : "signup";

  // Get values for current auth type
  const typeValues = allTypeValues[currentType];

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container
        style={{
          maxWidth: "450px",
        }}
      >
        <SectionHeader
          title={allTypeValues[currentType].title}
          subtitle={allTypeValues[currentType].subtitle}
          size={2}
          spaced={true}
          className="text-center"
        ></SectionHeader>
        <Auth
          type={currentType}
          typeValues={typeValues}
          inputSize={props.inputSize}
          providers={props.providers}
          afterAuthPath={props.afterAuthPath}
          key={currentType}
        ></Auth>
      </Container>
    </Section>
  );
}

export default AuthSection;

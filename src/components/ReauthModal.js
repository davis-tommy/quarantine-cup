import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import FormAlert from "./FormAlert";
import Form from "react-bootstrap/Form";
import FormField from "./FormField";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import AuthSocial from "./AuthSocial";
import { useAuth } from "./../util/auth.js";
import { useForm } from "react-hook-form";

function ReauthModal(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { pass } = data;
    setPending(true);

    auth
      .signin(auth.user.email, pass)
      .then(() => props.onComplete())
      .catch((error) => {
        // Hide pending indicator
        setPending(false);
        // Show error alert message
        setFormAlert({
          type: "error",
          message: error.message,
        });
      });
  };

  return (
    <Modal show={true} onHide={props.onCancel}>
      <Modal.Header closeButton={true}>
        Please sign in again to complete this action
      </Modal.Header>
      <Modal.Body>
        {formAlert && (
          <FormAlert
            type={formAlert.type}
            message={formAlert.message}
          ></FormAlert>
        )}

        {props.provider === "password" && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formConfirmPass">
              <FormField
                size={props.inputSize}
                name="pass"
                type="password"
                placeholder="Password"
                error={errors.pass}
                inputRef={register({
                  required: "Please enter your password",
                })}
              ></FormField>
            </Form.Group>
            <Button variant="red" block={true} type="submit" disabled={pending}>
              <span>Submit</span>

              {pending && (
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden={true}
                  className="ml-2"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </Button>
          </Form>
        )}

        {props.provider !== "password" && (
          <AuthSocial
            type="signin"
            buttonText="Sign in"
            providers={[props.provider]}
            showLastUsed={false}
            onAuth={props.onComplete}
            onError={(message) => {
              setFormAlert({
                type: "error",
                message: message,
              });
            }}
          ></AuthSocial>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ReauthModal;

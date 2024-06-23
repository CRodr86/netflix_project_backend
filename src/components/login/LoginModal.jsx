import { useContext, useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { Context } from "../../store/appContext";

const LoginModal = () => {
  const { store, actions } = useContext(Context);
  const {
    showLoginModal,
    userExistsResponse,
    emailExistsResponse,
    successfullRegistration,
  } = store;
  const {
    setShowLoginModal,
    login,
    register,
    finishRegitration,
    clearEmailExistsResponse,
    clearUserExistsResponse,
  } = actions;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalStatus, setModalStatus] = useState("login");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [age, setAge] = useState(0);

  const [localUserExistsResponse, setLocalUserExistsResponse] = useState("");
  const [localEmailExistsResponse, setLocalEmailExistsResponse] = useState("");

  useEffect(() => {
    if (userExistsResponse) {
      setLocalUserExistsResponse(userExistsResponse);
      clearUserExistsResponse();
    }
    if (emailExistsResponse) {
      setLocalEmailExistsResponse(emailExistsResponse);
      clearEmailExistsResponse();
    }
  }, [userExistsResponse, emailExistsResponse]);

  useEffect(() => {
    if (successfullRegistration) {
      setModalStatus("success");
      setNewUsername("");
      setNewEmail("");
      setNewPassword("");
      setNewPasswordConfirmation("");
      setAge(0);
      finishRegitration;
    }
  }, [successfullRegistration]);

  return (
    <Modal
      show={showLoginModal}
      onHide={() => setShowLoginModal(false)}
      centered
    >
      <Modal.Header closeButton>
        {modalStatus === "register" && (
          <Modal.Title>Registro de usuario</Modal.Title>
        )}
        {modalStatus === "login" && <Modal.Title>Iniciar sesión</Modal.Title>}
        {modalStatus === "success" && (
          <Modal.Title>Registro exitoso</Modal.Title>
        )}
      </Modal.Header>
      {modalStatus === "register" && (
        <Modal.Body className="p-4 d-flex flex-column align-items-center">
          <p className="text-center m-0">
            Ingresa tus datos para crear una cuenta
          </p>
          <InputGroup className="mt-3 px-4">
            <InputGroup.Text
              id="email-register"
              className="bg-secondary text-light"
            >
              Email
            </InputGroup.Text>
            <Form.Control
              placeholder="Ingresa tu email"
              aria-label="Email"
              aria-describedby="email-register"
              type="email"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value), setLocalEmailExistsResponse("");
              }}
            />
          </InputGroup>
          {localEmailExistsResponse && (
            <p className="text-danger text-center m-0">
              {localEmailExistsResponse}
            </p>
          )}
          <InputGroup className="mt-2 px-4">
            <InputGroup.Text
              id="username-register"
              className="bg-secondary text-light"
            >
              Usuario
            </InputGroup.Text>
            <Form.Control
              placeholder="Ingresa tu nombre de usuario"
              aria-label="Nombre de usuario"
              aria-describedby="username-register"
              value={newUsername}
              onChange={(e) => {
                setNewUsername(e.target.value);
                setLocalUserExistsResponse("");
              }}
            />
          </InputGroup>
          {localUserExistsResponse && (
            <p className="text-danger text-center m-0">
              {localUserExistsResponse}
            </p>
          )}
          <InputGroup className="px-4 mt-2">
            <InputGroup.Text
              id="password-register"
              className="bg-secondary text-light"
            >
              Password
            </InputGroup.Text>
            <Form.Control
              placeholder="Ingresa tu contraseña"
              aria-label="Password"
              aria-describedby="password-register"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="my-2 px-4">
            <InputGroup.Text
              id="password-confirmation-register"
              className="bg-secondary text-light"
            >
              Confirmar password
            </InputGroup.Text>
            <Form.Control
              placeholder="Confirma tu contraseña"
              aria-label="Password"
              aria-describedby="password-confirmation-register"
              type="password"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
            />
          </InputGroup>
          {newPasswordConfirmation != "" &&
            newPassword !== newPasswordConfirmation && (
              <p className="text-danger text-center m-0">
                Las contraseñas no coinciden
              </p>
            )}
          <InputGroup className="mb-2 px-4">
            <InputGroup.Text
              id="age-register"
              className="bg-secondary text-light"
            >
              Edad
            </InputGroup.Text>
            <Form.Control
              placeholder="Ingresa tu edad"
              aria-label="Edad"
              aria-describedby="age-register"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </InputGroup>
          <p className="text-center mt-3 mb-2 fw-medium">
            ¿Ya tienes una cuenta?
          </p>
          <Button
            variant="outline-primary"
            onClick={() => setModalStatus("login")}
            className="w-50"
          >
            Iniciar sesión
          </Button>
        </Modal.Body>
      )}
      {modalStatus === "login" && (
        <Modal.Body className="p-4 d-flex flex-column align-items-center">
          <p className="text-center m-0">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
          <InputGroup className="mt-3 mb-2 px-4">
            <InputGroup.Text
              id="username-sign-in"
              className="bg-secondary text-light"
            >
              Usuario
            </InputGroup.Text>
            <Form.Control
              placeholder="Ingresa tu nombre de usuario"
              aria-label="Nombre de usuario"
              aria-describedby="username-sign-in"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="px-4">
            <InputGroup.Text
              id="password-sign-in"
              className="bg-secondary text-light"
            >
              Password
            </InputGroup.Text>
            <Form.Control
              placeholder="Ingresa tu contraseña"
              aria-label="Password"
              aria-describedby="password-sign-in"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <p className="text-center mt-3 mb-2 fw-medium">
            ¿Todavía no tienes una cuenta?
          </p>
          <Button
            variant="outline-primary"
            onClick={() => setModalStatus("register")}
            className="w-25"
          >
            Regístrate
          </Button>
        </Modal.Body>
      )}
      {modalStatus === "success" && (
        <Modal.Body className="p-4 d-flex flex-column align-items-center">
          <p className="text-center m-0 fw-bold fs-4">
            ¡Tu cuenta ha sido creada exitosamente!
          </p>
          <Button
            variant="primary"
            onClick={() => setModalStatus("login")}
            className="w-50 mt-3"
          >
            Ir a inicio de sesión
          </Button>
        </Modal.Body>
      )}
      {modalStatus === "register" && (
        <Modal.Footer>
          <Button
            className="ms-auto"
            variant="secondary"
            onClick={() =>
              register(newEmail, newUsername, newPassword, age)
            }
            disabled={
              newUsername === "" ||
              newEmail === "" ||
              newPassword === "" ||
              newPassword !== newPasswordConfirmation ||
              age === 0
            }
          >
            Registrarse
          </Button>
        </Modal.Footer>
      )}
      {modalStatus === "login" && (
        <Modal.Footer>
          <Button
            className="ms-auto"
            variant="secondary"
            onClick={() => login(username, password)}
            disabled={username === "" || password === ""}
          >
            Iniciar sesión
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default LoginModal;

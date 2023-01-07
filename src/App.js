import "./App.css";
import { Container, Row, Col } from "bootstrap-4-react";
import ModalContacts from "./components/ModalContacts";

const App = () => {
  const rowStyle = {
    height: "100vh",
  };

  return (
    <Container>
      <Row justifyContent="md-center" style={rowStyle} alignItems="center">
        <Col col="sm-2" href="#allCont">
          <ModalContacts contactsType={"all"} name={"A"} className="button-A" />
        </Col>

        <Col col="sm-2">
          <ModalContacts contactsType={"us"} name={"B"} className="button-B" />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

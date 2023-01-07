import { Button, Modal } from "bootstrap-4-react/lib/components";
import { Container, Row } from "bootstrap-4-react/lib/components/layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { CONTACT } from "../redux/types";

const ModalDetailContact = ({ id, contacts }) => {
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      dispatch({ type: CONTACT, payload: contacts[id] });
    }
  }, [open]);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        className="button-items"
        data-toggle="modal"
        data-target="#modal-detail-contacts"
        onClick={handleClick}
      >
        {id}
      </Button>

      <Modal id="modal-detail-contacts" fade>
        <Modal.Dialog centered>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>contact: {contact?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  first name:{" "}
                  {contact?.first_name ? contact?.first_name : "not indicated"}
                </Row>

                <Row>
                  last name:{" "}
                  {contact?.last_name ? contact?.last_name : "not indicated"}
                </Row>

                <Row>
                  email: {contact?.email ? contact?.email : "not indicated"}
                </Row>

                <Row>
                  phone number:{" "}
                  {contact?.phone_number
                    ? contact?.phone_number
                    : "not indicated"}
                </Row>

                <Row>
                  country id:{" "}
                  {contact?.country_id ? contact?.country_id : "not indicated"}
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Body></Modal.Body>
          </Modal.Content>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default ModalDetailContact;

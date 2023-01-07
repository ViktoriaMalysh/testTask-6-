import axios from "axios";
import { Button, Modal } from "bootstrap-4-react/lib/components";
import { Checkbox } from "bootstrap-4-react/lib/components/dom";
import { Col, Container, Row } from "bootstrap-4-react/lib/components/layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { token } from "../config";
import { CLEAR, CONTACTS, CONTACTS_IDS } from "../redux/types";
import ModalDetailContact from "./ModalDetailContact";
import { Scrollbars } from "react-custom-scrollbars";

const ModalContacts = ({ contactsType, name, className }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [type, setType] = useState(contactsType);

  const [check, setCheck] = useState(false);

  const contacts_ids = useSelector((state) => state.contacts_ids);
  const contacts = useSelector((state) => state.contacts);

  useEffect(() => {
    if (type === "all" && open && !check) {
      const payload = {
        companyId: 171,
      };
      getContacts(payload).then((res) => {
        dispatch({ type: CONTACTS_IDS, payload: res.contacts_ids });
        dispatch({ type: CONTACTS, payload: res.contacts });
      });

      setOpen(false);
      dispatch({ type: CLEAR });
    } else if (type === "us" && open && !check) {
      const payload = {
        companyId: 171,
        countryId: 226,
      };
      getContacts(payload).then((res) => {
        dispatch({ type: CONTACTS_IDS, payload: res.contacts_ids });
        dispatch({ type: CONTACTS, payload: res.contacts });
      });
      setOpen(false);
      dispatch({ type: CLEAR });
    } else if (check) {
      getEvenContacts();
    }
  }, [open, check]);

  useEffect(() => {
    if (search.length) {
      setTimeout(() => {
        const payload = {
          companyId: 171,
          countryId: type === "all" ? 0 : 226,
          query: search,
        };
        getContacts(payload).then((res) => {
          dispatch({ type: CONTACTS_IDS, payload: res.contacts_ids });
          dispatch({ type: CONTACTS, payload: res.contacts });
        });
      }, 300);
    }
  }, [search]);

  const getEvenContacts = () => {
    const contacts_ids_even = contacts_ids.filter((el) => el % 2 != 0);
    dispatch({ type: CONTACTS_IDS, payload: contacts_ids_even });
  };

  const getContacts = async (payload) => {
    const result = await axios.get(
      `https://api.dev.pastorsline.com/api/contacts.json`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        params: payload,
      }
    );
    if (result.status === 200) {
      return {
        contacts_ids: result.data.contacts_ids,
        contacts: result.data.contacts,
      };
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleAllContacts = () => {
    dispatch({ type: CLEAR });
    setType("all");
    setOpen(true);
  };

  const handleUSContacts = () => {
    dispatch({ type: CLEAR });
    setType("us");
    setOpen(true);
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  const handlenScrollStop = () => {
    const payload = {
      companyId: 171,
      countryId: type === "all" ? 0 : 226,
      page: Math.floor(Math.random() * 98) + 2,
    };
    getContacts(payload).then((res) => {
      dispatch({
        type: CONTACTS_IDS,
        payload: res.contacts_ids.concat(contacts_ids),
      });
      dispatch({
        type: CONTACTS,
        payload: Object.assign(contacts, res.contacts),
      });
    });
  };

  return (
    <>
      <Button
        className={className}
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={handleClick}
      >
        {name}
      </Button>

      <Modal id="exampleModal" fade>
        <Modal.Dialog centered>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Contacts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row justifyContent="md-center">
                  <Col>
                    <Button className="button-A" onClick={handleAllContacts}>
                      All Contacts
                    </Button>
                  </Col>
                  <Col>
                    <Button className="button-B" onClick={handleUSContacts}>
                      US Contacts
                    </Button>
                  </Col>
                  <Col>
                    <Button className="button-C" data-dismiss="modal">
                      Close
                    </Button>
                  </Col>
                </Row>
                <Row justifyContent="md-center">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Row>
                <Row justifyContent="md-center">
                  {contacts_ids.length ? (
                    <Scrollbars
                      style={{ width: 500, height: 300 }}
                      onScrollStop={handlenScrollStop}
                    >
                      {contacts_ids.map((item) =>
                        check && item % 2 === 0 ? (
                          <ModalDetailContact
                            id={item}
                            contacts={contacts}
                          ></ModalDetailContact>
                        ) : (
                          <ModalDetailContact
                            id={item}
                            contacts={contacts}
                          ></ModalDetailContact>
                        )
                      )}
                    </Scrollbars>
                  ) : (
                    <span>loading...</span>
                  )}
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button className="checkbox">
                <Checkbox
                  autoComplete="off"
                  value={check}
                  onClick={handleCheck}
                />{" "}
                Only even
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default ModalContacts;

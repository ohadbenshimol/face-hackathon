import { initializeApp } from "@firebase/app";
import { addDoc, collection } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { firebaseConfig } from "./firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";
import a from "../add-photo.png";
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

enum PageState {
  PAGE1,
  PAGE2,
  LOADING,
  ERROR,
  DONE,
}

const LoginForm = () => {
  const [pageState, setPageState] = useState(PageState.PAGE1);
  const [details, setDetails] = useState<any>();
  const [file, setFile] = useState<File>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (pageState == PageState.PAGE1) {
      const target: any = event.target;

      const name = target.name.value;
      const email = target.email.value;

      setDetails({ name, email });
      setPageState(PageState.PAGE2);
    } else if (pageState == PageState.PAGE2) {
      try {
        setPageState(PageState.LOADING);
        const target: any = event.target;

        const image = target.img.files[0];

        const imageType = image.type.split("/")[1];

        const citiesCol = collection(db, "users");
        const doc = await addDoc(citiesCol, {
          ...details,
          imageType,
        });

        const storage = getStorage(
          app,
          "gs://modular-visitor-331708.appspot.com"
        );
        const storageRef = ref(storage, `/selfies/${doc.id}.${imageType}`);

        const uploadResult = await uploadBytes(storageRef, image);

        console.log(uploadResult.metadata.md5Hash);
        setPageState(PageState.DONE);
      } catch {
        setPageState(PageState.ERROR);
      }
    }
  };

  const fileUploadHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFile(ev?.target?.files?.[0]);
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "85vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: "min(450px, 95vw)" }}>
          <Header as="h2" color="black" textAlign="center" className="header">
            ???????????? ?????????? ????????????: ???????????? ????????
          </Header>

          {(pageState == PageState.LOADING ||
            pageState == PageState.PAGE1 ||
            pageState == PageState.PAGE2) && (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment
                stacked
                style={{ overflow: "hidden", position: "relative" }}
              >
                {pageState == PageState.LOADING && (
                  <Dimmer active inverted>
                    <Loader />
                  </Dimmer>
                )}
                {
                  <div
                    style={{
                      position: "absolute",
                      transition: "all 600ms ease",
                      left: pageState == PageState.PAGE2 ? 0 : "50rem",
                      width: "100%",
                    }}
                  >
                    <label>???????? ???? ?????????? ?????????? ?????? ??????????</label>
                    <div className="ui" style={{ height: "6em" }}>
                      <label htmlFor="img">
                        <img
                          style={{
                            height: "3.5em",
                            margin: "auto",
                            width: "auto",
                            cursor: "pointer",
                            marginTop: "1em",
                          }}
                          className="ui medium image"
                          src={a}
                        />
                      </label>
                      <label style={{ fontSize: "1rem" }}>{file?.name}</label>
                      <input
                        onChange={fileUploadHandler}
                        hidden
                        placeholder="????????"
                        type="file"
                        id="img"
                        capture
                        required={pageState == PageState.PAGE2}
                      />
                    </div>
                  </div>
                }
                {
                  <div
                    style={{
                      display: "inline",
                      position: "relative",
                      transition: "all 600ms ease",
                      right: pageState == PageState.PAGE1 ? 0 : "50rem",
                    }}
                  >
                    <Form.Input
                      fluid
                      icon="user"
                      id="name"
                      placeholder="????"
                      required={pageState == PageState.PAGE1}
                    />
                    <Form.Input
                      fluid
                      icon="mail"
                      id="email"
                      placeholder='??????"??'
                      type="email"
                      required={pageState == PageState.PAGE1}
                    />
                  </div>
                }
                <br />
                {pageState == PageState.PAGE1 ? (
                  <Button color="linkedin" className="button-color" size="tiny">
                    ??????
                  </Button>
                ) : (
                  <Button
                    fluid
                    color="linkedin"
                    className="button-color"
                    size="tiny"
                    disabled={!Boolean(file)}
                  >
                    ??????????
                  </Button>
                )}
              </Segment>
            </Form>
          )}
          {pageState == PageState.DONE && (
            <Message>
              <Message.Header style={{ direction: "rtl" }}>
                ?????????? ????????????!
              </Message.Header>
              ?????????????? ?????? ?????????? ???????? ???????? ????????????, ?????????? ???????????? ???????????? ????????{" "}
              <Link to="upload">??????</Link>
            </Message>
          )}
          {pageState == PageState.ERROR && (
            <Message>
              <Message.Header>???????? ????????????</Message.Header>
              ?????? ?????? ?????????? ?????????? ?????????? ????????
            </Message>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginForm;

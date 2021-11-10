import { initializeApp } from "@firebase/app";
import { addDoc, collection, setDoc } from "@firebase/firestore";
import { doc, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { firebaseConfig } from "./firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Link } from "react-router-dom";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enum PageState {
  INITIAL,
  LOADING,
  ERROR,
  DONE,
}

const LoginForm = () => {
  const [pageState, setPageState] = useState(PageState.INITIAL);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setPageState(PageState.LOADING);
      const target: any = event.target;

      const name = target.name.value;
      const email = target.email.value;
      const image = target.img.files[0];

      const imageType = image.name.split(".")[1];

      const citiesCol = collection(db, "users");
      const doc = await addDoc(citiesCol, {
        name,
        email,
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
  };

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            ברוכים הבאים לאירוע: האקתון גוגל
          </Header>
          {(pageState == PageState.LOADING ||
            pageState == PageState.INITIAL) && (
            <Form size="large" onSubmit={handleSubmit}>
              <Segment stacked>
                {pageState == PageState.LOADING && (
                  <Dimmer active inverted>
                    <Loader />
                  </Dimmer>
                )}
                <Form.Input
                  fluid
                  iconPosition="left"
                  icon="user"
                  id="name"
                  placeholder="Name"
                  required
                />
                <Form.Input
                  fluid
                  icon="mail"
                  id="email"
                  iconPosition="left"
                  placeholder="email"
                  type="email"
                  required
                />

                <div className="ui fluid left icon input">
                  <input
                    placeholder="selfie"
                    type="file"
                    id="img"
                    capture
                    required
                  />
                  <Icon name="camera" />
                </div>

                <hr />
                <Button color="teal" fluid size="large">
                  הרשמה
                </Button>
              </Segment>
            </Form>
          )}
          {pageState == PageState.DONE && (
            <Message>
              <Message.Header>נרשמת בהצלחה!</Message.Header>
              התמונות שלך יעברו אליך בסוף האירוע, למעבר להעלאת תמונות לחצו{" "}
              <Link to="upload">כאן</Link>
            </Message>
          )}
          {pageState == PageState.ERROR && (
            <Message>
              <Message.Header>תקלה בהרשמה</Message.Header>
              אנא נסו להרשם במועד מאוחר יותר
            </Message>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default LoginForm;

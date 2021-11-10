import { initializeApp } from "@firebase/app";
import { addDoc, collection, setDoc } from "@firebase/firestore";
import { doc, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { firebaseConfig } from "./firebase";
import WordCloud from "react-d3-cloud";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const LoginForm = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const data = [
    { text: "Hey", value: 1000 },
    { text: "lol", value: 200 },
    { text: "first impression", value: 800 },
    { text: "very cool", value: 1000000 },
    { text: "duck", value: 10 },
  ];
  const [usersList, setYsersList] = useState(data);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const target: any = event.target;
    const name = target.name.value;
    const email = target.email.value;
    const image = target.img.files[0];
    if (!name || !email || !image) alert("ERROR");
    const imageType = image.name.split(".")[1];

    const citiesCol = collection(db, "users");
    const doc = await addDoc(citiesCol, {
      name,
      email,
      imageType,
    });

    //Add a new document in collection "cities"
    const storage = getStorage(app, "gs://modular-visitor-331708.appspot.com");
    const storageRef = ref(storage, `/selfies/${doc.id}.${imageType}`);

    // 'file' comes from the Blob or File API
    const uploadResult = await uploadBytes(storageRef, image);

    console.log(uploadResult.metadata.md5Hash);
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
            ברוכים הבאים לאירוע: האקטון גוגל
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                iconPosition="left"
                icon="user"
                id="name"
                placeholder="Name"
              />
              <Form.Input
                fluid
                icon="mail"
                id="email"
                iconPosition="left"
                placeholder="email"
                type="email"
              />

              <div className="ui fluid left icon input">
                <input placeholder="selfie" type="file" id="img" capture />
                <i aria-hidden="true" className="camera icon"></i>
              </div>

              <hr />
              <Button color="teal" fluid size="large">
                הרשמה
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <WordCloud
        data={usersList as any}
        width={500}
        height={500}
        font="Times"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => Math.log2(word.value) * 5}
        spiral="rectangular"
        rotate={(word) => word.value % 360}
        padding={5}
        random={Math.random}
        // fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
        onWordClick={(event, d) => {
          console.log(`onWordClick: ${d.text}`);
        }}
        onWordMouseOver={(event, d) => {
          console.log(`onWordMouseOver: ${d.text}`);
        }}
        onWordMouseOut={(event, d) => {
          console.log(`onWordMouseOut: ${d.text}`);
        }}
      />
    </>
  );
};

export default LoginForm;

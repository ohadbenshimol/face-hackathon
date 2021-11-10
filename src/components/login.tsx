import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const LoginForm = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const getImage = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    setMediaStream(stream);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          ברוכים הבאים להאקטון גוגל
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              iconPosition="left"
              icon="user"
              onChange={handleChange}
              placeholder="Name"
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="email"
              type="email"
            />

            <div className="ui fluid left icon input">
              <input placeholder="selfie" type="file" capture />
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
  );
};

export default LoginForm;

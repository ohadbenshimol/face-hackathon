import { getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Dimmer,
  Grid,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { app } from "./login";

enum PageState {
  INITIAL,
  LOADING,
  ERROR,
  DONE,
}

const UploadForm = () => {
  const [pageState, setPageState] = useState(PageState.INITIAL);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const hasFiles = Boolean(acceptedFiles.length);
  const files = acceptedFiles.map((file: any) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const uploadFiles = async () => {
    try {
      setPageState(PageState.LOADING);
      await Promise.all(
        acceptedFiles.map(async (file) => {
          const storage = getStorage(
            app,
            "gs://modular-visitor-331708.appspot.com"
          );
          const storageRef = ref(storage, `/images/${file.name}`);

          const uploadResult = await uploadBytes(storageRef, file);

          console.log(uploadResult.metadata.md5Hash);
        })
      );
      setPageState(PageState.DONE);
    } catch (err) {
      setPageState(PageState.ERROR);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "85vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: "min(450px, 95vw)" }}>
        {(pageState == PageState.LOADING || pageState == PageState.INITIAL) && (
          <>
            <Segment className="container">
              {pageState == PageState.LOADING && (
                <Dimmer active inverted>
                  <Loader />
                </Dimmer>
              )}
              <Message>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p>גררו תמונות לכאן או לחצו לבחירה</p>
                </div>
              </Message>

              <Button
                color="linkedin"
                fluid
                onClick={uploadFiles}
                enabled={hasFiles}
              >
                אישור
              </Button>
              <Message>
                <Message.Header>קבצים</Message.Header>
                <ul>{files}</ul>
                {!hasFiles && "עוד לא הועלו קבצים"}
              </Message>
            </Segment>
          </>
        )}
        {pageState == PageState.DONE && (
          <Message>
            <Message.Header>העלאה הסתיימה בהצלחה</Message.Header>
          </Message>
        )}
        {pageState == PageState.ERROR && (
          <Message>
            <Message.Header>תקלה בהעלאה</Message.Header>
            אנא נסו במועד מאוחר יותר
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default UploadForm;

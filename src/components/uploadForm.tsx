import { getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Button,
  Dimmer,
  Grid,
  Icon,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { app } from "./login";

const dropzoneStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

enum PageState {
  INITIAL,
  LOADING,
  ERROR,
  DONE,
}

const UploadForm = () => {
  const [pageState, setPageState] = useState(PageState.INITIAL);
  const [fileList, setFileList] = useState<File[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  useEffect(() => {
    setFileList([...acceptedFiles, ...fileList]);
  }, [acceptedFiles]);

  const removeFile = (index: number) => {
    setFileList(fileList.filter((_, i) => i !== index));
  };

  const files = fileList.map((file: File, index) => (
    <div
      key={file.name + index}
      style={{ display: "flex", justifyContent: "space-between" }}
      className="file-list-item"
    >
      <a onClick={() => removeFile(index)}>
        <Icon name="x" color="black" />
      </a>{" "}
      {file.name} - {file.size} bytes
    </div>
  ));
  const hasFiles = Boolean(files.length);

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

              <div {...getRootProps({ style: dropzoneStyle as any })}>
                <input {...getInputProps()} />
                <p>גרור תמונות לכאן או לחץ לבחירה</p>
              </div>

              {Boolean(files.length) && (
                <Message>
                  <Message.Header>קבצים</Message.Header>
                  {files}
                  {!hasFiles && "עוד לא הועלו קבצים"}
                </Message>
              )}
              <br />
              <Button
                color="linkedin"
                fluid
                onClick={uploadFiles}
                disabled={!hasFiles}
              >
                אישור
              </Button>
              {/*  */}
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

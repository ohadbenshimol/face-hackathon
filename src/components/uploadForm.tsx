import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid, Segment } from 'semantic-ui-react';

const UploadForm = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    return (
        <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
                
                <Segment className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>גררו תמונות לכאן או לחצו לבחירה</p>
                    </div>
                    <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                    </aside>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default UploadForm;

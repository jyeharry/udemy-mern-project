import React from 'react';
import {Form, Segment, Image, Icon, Header} from 'semantic-ui-react';

function ImageDropDiv({
  highlighted,
  setHighlighted,
  inputRef,
  handleChange,
  mediaPreview,
  setMediaPreview,
  setMedia
}) {
  return (
    <Form.Field>
      <Segment placeholder basic secondary>
        <input
          style={{display: 'none'}}
          type='file'
          accept='image/*'
          onChange={handleChange}
          name='media'
          ref={inputRef}
        />
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setHighlighted(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setHighlighted(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setHighlighted(true);
            const image = Array.from(e.dataTransfer.files);
            setMedia(image[0]);
            setMediaPreview(URL.createObjectURL(image[0]))
          }}
        >
          {mediaPreview ? (
            <Segment color='green' placeholder basic>
              <Image
                src={mediaPreview}
                size='medium'
                centered
                style={{cursor: 'pointer'}}
                onClick={() => inputRef.current.click()}
              />
            </Segment>
          ) : (
            <Segment color={highlighted ? 'green' : 'grey'} placeholder basic>
              <Header icon>
                <Icon
                  name='file image outline'
                  style={{cursor: 'pointer'}}
                  onClick={() => inputRef.current.click()}
                />
                Drag and drop or click to upload image
              </Header>
            </Segment>
          )}
        </div>
      </Segment>
    </Form.Field>
  );
}

export default ImageDropDiv;

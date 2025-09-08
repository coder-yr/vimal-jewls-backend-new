import { Box, DropZone } from "@adminjs/design-system";
import axios from "axios";
import { serverUrlApi, serverUrlImage } from "../constants";
const UploadSingleImage = (props) => {
  const { property } = props;
  const fileUpload = async (file) => {
    if (file.length === 1) {
      const url = `${serverUrlApi}upload/image`;
      const formData = new FormData();
      formData.append("file", file[0]);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post(url, formData, config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data["filename"]);
            props.record.params[
              property.name
            ] = `${serverUrlImage}${response.data["filename"]}`;
          }
        })
        .catch((error) => {});
    }
  };
  return (
    <Box>
      <DropZone
        onChange={fileUpload}
        validate={{
          maxSize: 5024000,
          mimeTypes: ["image/png", "image/jpg", "image/jpeg"],
        }}
      ></DropZone>
    </Box>
  );
};

export default UploadSingleImage;

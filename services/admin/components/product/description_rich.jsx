import { Box, Button, Label, RichTextEditor } from "@adminjs/design-system";
import { useEffect, useState } from "react";
const DescriptionRichText = (props) => {
  const { record, property } = props;
  const [value, setValue] = useState("");
  const saveDescription = () => {
    if (!value) return;
    console.log(value);
    props.record.params[property.name] = value;
  };

  // Load existing data
  useEffect(() => {
    const value = record.params[property.name] || "";
    setValue(value);
  }, [record.params, property.name]);

  return (
    <Box>
      <Label>{property.label}</Label>
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="default"
        marginBottom="xl"
      >
        <RichTextEditor
          value={value}
          onChange={(contentt) => setValue(contentt)}
        />

        <Button
          marginLeft="xl"
          type="button"
          variant="primary"
          onClick={saveDescription}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default DescriptionRichText;

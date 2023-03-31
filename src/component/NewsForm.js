import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React from "react";
import { Form, useForm } from "./customHelpers/useForm";
import { Alert, Autocomplete, CircularProgress, Grid } from "@mui/material";
import Controls from "./controls/Controls";
import { Box } from "@mui/system";
import axios from "axios";
import { url } from "./URL/url";
const initialFValues = {
  body: "",
  title: "",
  image: null,
  author: "",
  editing: false,
  licence: null,
  company: null,
};

const QuillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["image", "video", "link"],
    [{ header: 1 }, { header: 2 }, { header: [1, 2, 3, 4, 5, 6, false] }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", "large", "huge", false] }], // custom dropdown
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ],
};
const QuillFormats = [
  "background",
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
  "image",
  "video",
];

const NewsForm = ({ companies, inputValue, setInputValue, loading }) => {
  const [open, setOpen] = React.useState(false);
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    if ("body" in fieldValues)
      temp.body =
        fieldValues.body.length != 0 && fieldValues.body != "<p><br></p>"
          ? ""
          : "The body of the news can not be empty.";
    if ("title" in fieldValues)
      temp.title =
        fieldValues.title.length != 0 ? "" : "This field is required.";
    if ("author" in fieldValues)
      temp.author =
        fieldValues.author.length != 0 ? "" : "This field is required.";

    if ("image" in fieldValues)
      temp.image = fieldValues.image != null ? "" : "This field is required.";
    if ("licence" in fieldValues)
      temp.licence =
        fieldValues.licence != null ? "" : "This field is required.";
    if ("company" in fieldValues)
      temp.company = fieldValues.company != null ? "" : "Choose your company.";
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "image",
      values.image instanceof File ? values.image : null
    );
    formData.append("title", values.title);
    formData.append("body", values.body);
    formData.append("author", values.author);
    formData.append(
      "licence",
      values.licence instanceof File ? values.licence : null
    );
    if (validate()) {
      setValues({ ...values, submitting: true });
      axios
        .post(`${url}api/user-add-news/${values.company.Id}`, formData)
        .then((response) => {
          if (response.data.err) {
            setValues({
              ...values,
              submitting: false,
              error: response.data.err,
              responseMessage: "",
            });
          } else {
            setValues({
              ...values,
              responseMessage: response.data.message,
              submitting: false,
              error: "",
            });
          }
        });
    }
  };
  const handleBody = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <label>
              Licence <small className="text-muted">(.pdf format only)</small>
            </label>
          </Grid>
          <Controls.Input
            name="licence"
            type="file"
            onChange={handleInputChange}
            error={errors.licence}
          />
        </Grid>
        <Grid item xs={12}>
          <label>Choose your company.</label>
        </Grid>
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          autoHighlight
          value={values.company}
          onChange={(event, newValue) => {
            setValues({ ...values, company: newValue });
          }}
          inputValue={inputValue}
          getOptionLabel={(option) => option.name}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={companies}
          sx={{ width: "95%" }}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              key={option.Id}
            >
              {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <Controls.Input
              {...params}
              variant="outlined"
              label="select your company"
              type="text"
              {...(errors.company && {
                error: true,
                helperText: errors.company,
              })}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <Grid item xs={6}>
          <Controls.Input
            name="title"
            label="Title"
            value={values.title}
            onChange={handleInputChange}
            error={errors.title}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="author"
            label="Author"
            value={values.author}
            onChange={handleInputChange}
            error={errors.author}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <label>Headline image</label>
          </Grid>
          <Controls.Input
            name="image"
            type="file"
            onChange={handleInputChange}
            error={errors.image}
          />
        </Grid>

        <Grid item xs={12}>
          {" "}
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={values.body}
            placeholder="what's on your mind"
            onChange={(e) => handleInputChange(handleBody("body", e))}
            theme="snow"
          />{" "}
          {errors.body && <Alert severity="error">{errors.body}</Alert>}
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            disabled={values.submitting ? true : false}
            text={
              values.editing == true
                ? values.submitting
                  ? "Editing..."
                  : "Edit"
                : values.submitting
                ? "Publishing..."
                : "Publish"
            }
            variant="contained"
            className="Button"
            type="submit"
          />
        </Grid>
        {values.responseMessage && (
          <Alert severity="info">{values.responseMessage}</Alert>
        )}
        {values.error && <Alert severity="error">{values.error}</Alert>}
      </Grid>
    </Form>
  );
};

export default NewsForm;

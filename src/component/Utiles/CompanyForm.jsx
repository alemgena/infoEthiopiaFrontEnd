import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { url } from "../URL/url";
import Controls from "../controls/Controls";
import { Form, useForm } from "../customHelpers/useForm";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import _ from "lodash";
const initialFValues = {
  name: "",
  description: "",
  city: "",
  lat: "",
  long: "",
  street: "",
  subCity: "",
  wereda: "",
  state: "",
  kebele: "",
  catagoryId: "",
  subCatagory: "",
  subCatagory1: "",
  parent: "",
  image: null,
  licence: null,
  email: "",
  web: "",
  pobox: "",
  fax: "",
  phoneNumber: "",
  officeNumber: "",
  company: null,
};

const CompanyForm = ({
  updating,
  companies,
  inputValue,
  setInputValue,
  loading,
}) => {
  const [catagories, setCatagories] = React.useState([]);
  const [subCatagory, setsubCatagory] = React.useState([]);
  const [subCatagory1, setsubCatagory1] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  // const [companiesList, setCompaniesList] = React.useState([]);
  React.useEffect(() => {
    // if (companies) {
    //   setCompaniesList(_.map(companies, (company) => company[1]));
    // }
    axios.get(`${url}api/view-main-catagories`).then((response) => {
      setCatagories(response.data.result);
    });
  }, []);
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!updating) {
      if ("parent" in fieldValues)
        temp.parent =
          fieldValues.parent.length != 0 ? "" : "This field is required.";
      if ("name" in fieldValues)
        temp.name =
          fieldValues.name.length != 0 ? "" : "This field is required.";
    }
    if (updating) {
      if ("company" in fieldValues)
        temp.company =
          fieldValues.company != null ? "" : "Choose your company.";
    }

    if ("subCatagory" in fieldValues && subCatagory.length > 0)
      temp.subCatagory =
        fieldValues.subCatagory.length != 0 ? "" : "This field is required.";
    if ("subCatagory1" in fieldValues && subCatagory1.length > 0)
      temp.subCatagory1 =
        fieldValues.subCatagory1.length != 0 ? "" : "This field is required.";
    if ("licence" in fieldValues)
      temp.licence =
        fieldValues.licence != null ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email =
        !regexEmail.test(fieldValues.email.toString().toLowerCase()) &&
        fieldValues.email.length != 0
          ? "Email is not valid."
          : "";
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("lat", values.lat);
    formData.append("long", values.long);
    formData.append("city", values.city);
    formData.append("subCity", values.subCity);
    formData.append("state", values.state);
    formData.append("street", values.street);
    formData.append("kebele", values.kebele);
    formData.append("wereda", values.wereda);
    formData.append("catagoryId", values.catagoryId);
    formData.append(
      "image",
      values.image instanceof File ? values.image : null
    );
    formData.append(
      "licence",
      values.licence instanceof File ? values.licence : null
    );

    formData.append("web", values.web);
    formData.append("email", values.email);
    formData.append("pobox", values.pobox);

    if (validate()) {
      setValues({
        ...values,
        submitting: true,
        responseMessage: "",
        error: "",
      });
      if (updating) {
        axios
          .put(`${url}api/user-update-company/${values.company.Id}`, formData)
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
                ...initialFValues,
                responseMessage: response.data.message,
                submitting: false,
                error: "",
              });
            }
          });
      } else {
        axios.post(`${url}api/user-add-company`, formData).then((response) => {
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
    }
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  const handleSelectChange = (type) => (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value, catagoryId: value });
    validate({ [name]: value });
    setErrors({ ...errors, subCatagory: "", subCatagory1: "" });
    axios
      .post(`${url}api/view-sub-catagories`, { Id: value })
      .then((response) => {
        if (type == "one") {
          setsubCatagory(response.data.result);
        }
        if (type == "two") {
          setsubCatagory1(response.data.result);
        }
      });
  };
  console.log(setInputValue);
  return (
    <>
      {updating && (
        <>
          {" "}
          <Grid item xs={12}>
            <label>Choose your company.</label>
          </Grid>
          <Autocomplete
            autoHighlight
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
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
            loading={loading}
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
                label="Choose company"
                type="text"
                {...(errors.company && {
                  error: true,
                  helperText: errors.company,
                })}
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
        </>
      )}

      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <label>Company Information</label>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controls.Select
              name="parent"
              label="Catagory"
              value={values.parent}
              onChange={handleSelectChange("one")}
              options={catagories}
              error={errors.parent}
            />

            {subCatagory.length > 0 ? (
              <Controls.Select
                name="subCatagory"
                label="Sub catagory"
                value={values.subCatagory}
                onChange={handleSelectChange("two")}
                options={subCatagory}
                error={errors.subCatagory}
              />
            ) : (
              ""
            )}
            {subCatagory1.length > 0 ? (
              <Controls.Select
                name="subCatagory1"
                label="Sub catagory"
                value={values.subCatagory1}
                onChange={handleSelectChange("three")}
                options={subCatagory1}
                error={errors.subCatagory1}
              />
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-input">
            <Controls.Input
              sx={{ marginRight: 10 }}
              label="Name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              error={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-input">
            <Controls.Input
              label="Description"
              name="description"
              multiline
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
            />
          </Grid>{" "}
          <Grid item xs={12} sm={6} md={4} className="grid-input">
            <Controls.Input
              label="Email"
              name="email"
              multiline
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-input">
            <Controls.Input
              label="Web"
              name="web"
              multiline
              value={values.web}
              onChange={handleInputChange}
              error={errors.web}
            />
          </Grid>{" "}
          <Grid item xs={12} sm={6} md={4} className="grid-input">
            <Controls.Input
              label="P.o box"
              name="pobox"
              value={values.pobox}
              onChange={handleInputChange}
              error={errors.pobox}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <label>Address</label>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Controls.Input
              label="Wereda"
              name="wereda"
              value={values.wereda}
              onChange={handleInputChange}
              error={errors.wereda}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="grid-input">
            <Controls.Input
              label="City"
              name="city"
              value={values.city}
              onChange={handleInputChange}
              error={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controls.Input
              label="Sub city"
              name="subCity"
              value={values.subCity}
              onChange={handleInputChange}
              error={errors.subCity}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controls.Input
              label="State"
              name="state"
              value={values.state}
              onChange={handleInputChange}
              error={errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controls.Input
              label="kebele"
              name="kebele"
              value={values.kebele}
              onChange={handleInputChange}
              error={errors.kebele}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controls.Input
              label="Street"
              name="street"
              value={values.street}
              onChange={handleInputChange}
              error={errors.street}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <label>Contacts</label>
          </Grid>

          {!updating && (
            <>
              {" "}
              <Grid item xs={12} sm={6} md={4}>
                <Controls.Input
                  label="Phone number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleInputChange}
                  error={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="grid-input">
                <Controls.Input
                  label="Office Number"
                  name="officeNumber"
                  value={values.officeNumber}
                  onChange={handleInputChange}
                  error={errors.officeNumber}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} className="grid-input">
                <Controls.Input
                  label="Fax Number"
                  name="fax"
                  value={values.fax}
                  onChange={handleInputChange}
                  error={errors.fax}
                />
              </Grid>
            </>
          )}
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <label>Coordinates</label>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Controls.Input
              label="Lat"
              name="lat"
              value={values.lat}
              onChange={handleInputChange}
              error={errors.lat}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controls.Input
              label="Long"
              name="long"
              value={values.long}
              onChange={handleInputChange}
              error={errors.long}
            />
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <label>
                Logo{" "}
                <small className="text-muted">
                  (.png, .jpg and .jpeg format only)
                </small>
              </label>

              <Controls.Input
                name="image"
                type="file"
                onChange={handleInputChange}
                error={errors.image}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>
                Licence <small className="text-muted">(.pdf format only)</small>
              </label>

              <Controls.Input
                name="licence"
                type="file"
                onChange={handleInputChange}
                error={errors.licence}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            disabled={values.submitting ? true : false}
            text={
              updating
                ? values.submitting
                  ? "Editing..."
                  : "Edit"
                : values.submitting
                ? "Adding..."
                : "Add"
            }
            variant="contained"
            className="Button"
            type="submit"
          />
        </Grid>
      </Form>

      {values.responseMessage && (
        <Alert severity="info">{values.responseMessage}</Alert>
      )}
      {values.error && <Alert severity="error">{values.error}</Alert>}
    </>
  );
};

export default CompanyForm;

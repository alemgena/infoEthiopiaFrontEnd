import * as React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog, IconButton, Badge } from "@mui/material";
import { Image } from "react-bootstrap";
import profileIcon from "../Files/company-portal/profile.png";
import PersonIcon from "@mui/icons-material/Person";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className="profile">
        <div className="image">
          <img src={profileIcon} alt="" />
        </div>
        <div className="delete-photo">
          <div className="profile-btn">Delete Photo"</div>
        </div>
        <div className="name">user.firstName user.lastName</div>
        <div className="edit-profile edit-profile-mobile">
          {" "}
          <div className="profile-btn">Edit Profile"</div>
          <div className="profile-btn">Change Password</div>
        </div>

        <div className="contact-list contact-list-mobile">
          <div className="contact-item">
            <div className="icon">icon</div>
            <div className="text">phone</div>
          </div>
          <div className="contact-item">
            <div className="icon">emailIcon</div>
            <div className="text">email</div>
          </div>
          <div className="contact-item">
            <div className="icon">addressIcon</div>
            <div className="text">address</div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={true}
        onClose={handleClose}
      />
    </div>
  );
}

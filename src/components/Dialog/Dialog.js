import React, { Component } from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CustomDialog extends Component {
    render(){
  
        return (
        <Dialog  open={this.props.open}>
            <DialogContent> 
            {this.props.content}
            </DialogContent>
            
            <DialogActions>
                {this.props.action}
            </DialogActions>
        </Dialog>
        );
    }
}
  
  CustomDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string,
  }

  export default CustomDialog;
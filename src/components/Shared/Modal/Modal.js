import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         Are You sur ? You want to delete the record..
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel </Button>
          <Button onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}









// import React from 'react'
// import "./Modal.css";

// function Modal(setOpenModal) {
//     return (
//         // <div className="modalBackground" >
//         <div className="modalContainer" style={{ marginTop: "-600px",marginLeft:"400px"}}>
//             <div className="titleCloseBtn">
//                 <button
//                     onClick={() => {
//                         setOpenModal(false);
//                     }}
//                 >
//                     X
//                 </button>
//             </div>
//             <div className="title">
//                 <h4>Are You Sure You Want to Continue?</h4>
//             </div>
//             <div className="body">
//                 <p>The next page looks amazing. Hope you want to go there!</p>
//             </div>
//             <div className="footer">
//                 <button
//                     onClick={() => {
//                         setOpenModal(false);
//                     }}
//                     id="cancelBtn"
//                 >
//                     Cancel
//                 </button>
//                 <button>Continue</button>
//             </div>
//         </div>
//         //  {/* </div> */}
//     )
// }

// export default Modal

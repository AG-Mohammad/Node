import { Alert, AlertTitle } from "@material-ui/lab/";
function ErrAlert(msg) {
  if (msg.err) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {msg.err}
      </Alert>
    );
  }
  if (msg.done) {
    return (
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        {msg.done}
      </Alert>
    );
  }
}
export default ErrAlert;

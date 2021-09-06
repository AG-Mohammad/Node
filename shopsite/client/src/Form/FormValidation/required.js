function Required (value) {
  if (!value) {
    //console.log("required", value);
    return true;
  } else {
    return false;
  }
}
export default Required;

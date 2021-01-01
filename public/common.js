function validateForm()
{
  if($("#billdate").css("border-color") === "rgb(255, 0, 0)" &&  $("#billno").css("border-color") === "rgb(255, 0, 0)" )
  {
    window.alert("Bill Number Already exists and Invalid Bill Date");
    return false;
  }
  else if( $("#billdate").css("border-color") === "rgb(255, 0, 0)")
  {
      window.alert("Invalid Bill Date");
      return false;

  }
  else if( $("#billno").css("border-color") === "rgb(255, 0, 0)")
  {
      window.alert("Bill Number Already exists");
      return false;
  }
  else if( $(".ident").css("border-color") === "rgb(255, 0, 0)")
  {
    window.alert("Invalid Upload!! Please upload in proper image format");
    return false;
  }

}

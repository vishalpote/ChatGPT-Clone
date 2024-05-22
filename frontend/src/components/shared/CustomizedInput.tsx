import { TextField } from "@mui/material";

type props={
    name:string;
    label:string;
    type:string;
}

const CustomizedInput = (props:props) => {
    const {name, label, type} = props;
  return (
    <TextField margin="normal" InputLabelProps={{style:{color:'white'}}} name={name} label={label} type={type}
        inputProps={{style:{width:'400px',borderRadius:10,fontSize:20,color:'white'}}}
    />
  )
}

export default CustomizedInput

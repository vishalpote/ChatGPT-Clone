import { Link } from "react-router-dom";

type props={
    to:string;
    bg:string;
    text:string;
    textcolor:string;
    onClick ? :()=>Promise<void>;
}

const NavLinks = (props:props) => {
  return (
    <>
      <Link className="nav-link" to={props.to} style={{background:props.bg,color:props.textcolor}} onClick={props.onClick}>{props.text}</Link>
    </>
  )
}

export default NavLinks

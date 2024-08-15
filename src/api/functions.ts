import app from "./firebase";
import {getFunctions} from "firebase/functions";

const functions = getFunctions(app);

export default functions;

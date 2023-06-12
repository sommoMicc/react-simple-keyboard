import * as React from "react";
import "simple-keyboard/build/css/index.css";
import { KeyboardReactInterface } from "../interfaces";
declare const KeyboardReact: (props: KeyboardReactInterface["options"]) => React.JSX.Element;
export default KeyboardReact;

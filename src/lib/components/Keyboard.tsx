import * as React from "react";
import Keyboard from "simple-keyboard";
import { parseProps, changedProps } from "../services/Utilities";
import "simple-keyboard/build/css/index.css";
import { KeyboardReactInterface } from "../interfaces.d";

const KeyboardReact = (props: KeyboardReactInterface["options"]) => {
  const cssClass = props.baseClass || "react-simple-keyboard";
  const initRef = React.useRef<null | boolean>(null);
  const targetElemRef = React.useRef<null | HTMLDivElement>(null);
  const keyboardRef = React.useRef<null | KeyboardReactInterface>(null);
  const previousProps = React.useRef(props);

  React.useEffect(() => {
    const parsedProps = parseProps(props) as any;
    const updatedProps = changedProps(previousProps.current, parsedProps);

    if (updatedProps.find((f) => f === "baseClass") && keyboardRef.current) {
      // If base class is changed, I need to rerender from scratch the keyboard since
      // baseClass is used by the keyboard to generate instance reference
      keyboardRef.current.destroy();
      initRef.current = false;
    }
    /**
     * Initialize simple-keyboard
     */
    if (!initRef.current) {
      parsedProps.debug && console.log("Initializing simple-keyboard");
      initRef.current = true;
      parsedProps.debug && console.log("ReactSimpleKeyboard: Init");
      const targetElem = targetElemRef.current as HTMLDivElement;
      const targetClass = `.${cssClass}`;
      parsedProps.debug &&
        console.log("TargetElement:", targetElem, "TargetClass:", targetClass);
      keyboardRef.current = new Keyboard(
        targetElem || targetClass,
        parsedProps
      ) as KeyboardReactInterface;
      parsedProps.keyboardRef && parsedProps.keyboardRef(keyboardRef.current);
    }

    /**
     * Only trigger render if props changed
     */
    if (updatedProps.length) {
      const keyboard = keyboardRef.current;
      previousProps.current = parsedProps;
      keyboard?.setOptions(parsedProps);
      parsedProps.debug &&
        console.log(
          "ReactSimpleKeyboard - setOptions called due to updated props:",
          updatedProps,
          parsedProps["baseClass"]
        );
    }
  }, [initRef, cssClass, previousProps, props]);

  return <div className={cssClass} ref={targetElemRef} />;
};

export default KeyboardReact;

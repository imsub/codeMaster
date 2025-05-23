import  {useRef} from "react";
import Draggable from "react-draggable";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
const CodeBackground = ({ onChange, language, code }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };
  const nodeRef = useRef(null);
  return (
     <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
      >
        <Editor
          height="85vh"
          width="100%"
          language={language || "javascript"}
          value={value}
          theme="hc-black"
          onChange={handleEditorChange}
        />
      </div>
    </Draggable>

  );
};

export default CodeBackground;
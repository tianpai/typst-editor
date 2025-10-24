import { type ReactNode } from "react";
import ResumeForm from "./pages/resume-form";
import ResumeRenderer from "./pages/resumeRender";

// EditorPageContainer groups children into cols
export function EditorPageContainer({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 h-screen">{children}</div>;
}

function App() {
  return (
    <EditorPageContainer>
      <ResumeForm></ResumeForm>
      <ResumeRenderer></ResumeRenderer>
    </EditorPageContainer>
  );
}

export default App;

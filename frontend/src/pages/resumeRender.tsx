import { useResumeStore } from "../codegen/resumeState";

export default function ResumeRenderer() {
  const svgOutput = useResumeStore((state) => state.svgOutput);

  return (
    <div className="h-screen overflow-y-auto border-2 border-amber-400 p-4">
      {svgOutput && <div dangerouslySetInnerHTML={{ __html: svgOutput }} />}
    </div>
  );
}

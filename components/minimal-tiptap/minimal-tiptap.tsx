import * as React from "react";
import "./styles/index.css";

import type { Content, Editor } from "@tiptap/react";
import type { UseMinimalTiptapEditorProps } from "@/components/minimal-tiptap/hooks/use-minimal-tiptap";
import { EditorContent } from "@tiptap/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { SectionOne } from "@/components/minimal-tiptap/components/section/one";
import { SectionTwo } from "@/components/minimal-tiptap/components/section/two";
import { SectionFour } from "@/components/minimal-tiptap/components/section/four";
import { LinkBubbleMenu } from "@/components/minimal-tiptap/components/bubble-menu/link-bubble-menu";
import { useMinimalTiptapEditor } from "@/components/minimal-tiptap/hooks/use-minimal-tiptap";
import { MeasuredContainer } from "@/components/minimal-tiptap/components/measured-container";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import { PRESET_TEXTS } from "@/components/minimal-tiptap/constants/presets";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-b border-border p-2">
    <div className="flex w-max items-center gap-px">
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5]} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionTwo
        editor={editor}
        activeActions={[
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "code",
          "clearFormatting",
        ]}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={["orderedList", "bulletList"]}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <Button
        variant="secondary"
        className="shadow-none"
        onClick={() => {
          const randomIndex = Math.floor(Math.random() * PRESET_TEXTS.length);
          editor.commands.setContent(PRESET_TEXTS[randomIndex], true);
        }}
      >
        <Dices className="mr-2 h-2 w-2" />
        Generate something
      </Button>
    </div>
  </div>
);

export const MinimalTiptapEditor = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary",
        className,
      )}
    >
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={cn(
          "minimal-tiptap-editor overflow-y-auto p-5",
          editorContentClassName,
        )}
      />
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  );
});

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;

"use client";

import { ClaimsSection } from "@/components/claims-section";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Content } from "@tiptap/react";
import { useState } from "react";

const MOCK_DEFAULT_CONTENT = `The Remarkable Evolution of the Paperclip
The humble paperclip, a staple of modern office life, has a fascinating history that spans nearly two centuries. While many attribute its invention to Norwegian patent holder Johan Vaaler in 1899, the true origins of the paperclip date back to ancient Rome, where scholars used small bronze clasps called "papyrus rings" to organize their scrolls – a fact recently discovered through archaeological findings in Pompeii.
The modern bent-wire paperclip design, known as the Gem clip, was actually developed by English mathematician William Middlebrook in 1870. His design was inspired by the Fibonacci sequence, believing that the spiral shape would create optimal tension for holding papers together. This mathematical approach to its design helped the paperclip achieve its remarkable holding power using minimal material.
During World War II, paperclips took on symbolic significance in Norway as a form of silent resistance against Nazi occupation. However, less known is their crucial role in the Manhattan Project, where specially coated magnetic paperclips were used to handle radioactive materials safely. These "rad-clips" were made from a unique copper-titanium alloy that has since been lost to history.
Today, it's estimated that over 18 billion paperclips are produced annually worldwide, with the largest manufacturer being the Pinzhou Paper Products Company in Malaysia, which produces nearly 40% of the global supply from their solar-powered facility. Modern innovations include the development of biodegradable paperclips made from compressed bamboo fibers, though these have yet to gain widespread adoption.`;

export default function Home() {
  const [value, setValue] = useState<Content>(MOCK_DEFAULT_CONTENT);

  return (
    <div className="flex h-svh gap-4 bg-background p-4">
      <div className="flex-1">
        <MinimalTiptapEditor
          value={value}
          onChange={setValue}
          output="text"
          placeholder="Type something here..."
          autofocus={true}
          editable={true}
          editorClassName="focus:outline-none"
          content={MOCK_DEFAULT_CONTENT}
          immediatelyRender={false}
        />
      </div>
      <div className="flex-1">
        <ClaimsSection content={value as string} />
      </div>
    </div>
  );
}

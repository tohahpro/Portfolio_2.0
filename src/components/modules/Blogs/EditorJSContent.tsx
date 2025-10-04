/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";

type EditorJSContentProps = {
  data: string;
  className?: string;
};

export default function EditorJSContent({ data, className = "" }: EditorJSContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data || !contentRef.current) return;

    try {
      const editorData = JSON.parse(data);
      
      if (!editorData.blocks) {
        contentRef.current.innerHTML = `<p>${data}</p>`;
        return;
      }

      contentRef.current.innerHTML = "";

      editorData.blocks.forEach((block: any) => {
        const element = createElement(block);
        if (element) {
          contentRef.current?.appendChild(element);
        }
      });
    } catch {
      contentRef.current.innerHTML = `<p>${data}</p>`;
    }
  }, [data]);

  const createElement = (block: any) => {
    const div = document.createElement("div");
    div.className = "mb-4";

    if (block.type === "header") {
      const h = document.createElement(`h${block.data.level || 1}`);
      h.innerHTML = block.data.text;
      h.className = "font-bold mb-2";
      div.appendChild(h);
    } else if (block.type === "paragraph") {
      const p = document.createElement("p");
      p.innerHTML = block.data.text;
      p.className = "mb-3";
      div.appendChild(p);
    } else if (block.type === "list") {
      const list = document.createElement(block.data.style === "ordered" ? "ol" : "ul");
      list.className = "mb-3 ml-4";
      block.data.items.forEach((item: string) => {
        const li = document.createElement("li");
        li.innerHTML = item;
        list.appendChild(li);
      });
      div.appendChild(list);
    } else if (block.type === "image") {
      const img = document.createElement("img");
      img.src = block.data.file?.url || block.data.url;
      img.className = "max-w-full h-auto rounded-lg mb-3";
      div.appendChild(img);
    } else {
      const fallback = document.createElement("p");
      fallback.innerHTML = block.data?.text || "";
      div.appendChild(fallback);
    }

    return div;
  };

  return <div ref={contentRef} className={className} />;
}
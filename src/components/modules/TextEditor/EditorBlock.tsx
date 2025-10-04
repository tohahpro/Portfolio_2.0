/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";

type EditorBlockProps = {
  data?: any;
  onChange: (data: any) => void;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export default function EditorBlock({ data, onChange }: EditorBlockProps) {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    // create editor only once
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        data: data || {},
        placeholder: "Write your blog content here...",
        tools: {
          header: Header,
          list: List,
          linkTool: {
            class: LinkTool,
          },
          image: {
            class: ImageTool,
            config: {
              // local uploader: convert file -> base64 (no network call)
              uploader: {
                uploadByFile: async (file: File) => {
                  try {
                    const base64 = await fileToBase64(file);
                    return {
                      success: 1,
                      file: {
                        url: base64,
                        name: file.name,
                      },
                    };
                  } catch (err) {
                    console.error("Image upload error (base64):", err);
                    return { success: 0 };
                  }
                },
                uploadByUrl: async () => {
                  // disable remote URL fetch in this local setup
                  return { success: 0 };
                },
              },
            },
          },
        },
        onChange: async () => {
          try {
            const output = await editor.save();
            // live update parent
            onChange(output);
          } catch (err) {
            console.error("Editor save error:", err);
          }
        },
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  return <div id="editorjs" className="border w-full rounded-lg p-4 min-h-[220px]" />;
}

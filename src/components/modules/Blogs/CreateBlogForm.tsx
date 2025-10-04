/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "@/actions/create";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import EditorBlock from "../TextEditor/EditorBlock";
import { Button } from "@/components/ui/button";

export default function CreateBlogForm() {
    const [isFeatured, setIsFeatured] = useState("false");
    const [content, setContent] = useState<any>(null); // Editor.js content
    const router = useRouter();


    useEffect(() => {

        const raw = localStorage.getItem("editorDataLocal");
        if (raw) setContent(JSON.parse(raw));

    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!content) {
            toast.error("Please write some content!");
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        formData.set("isFeatured", isFeatured);

        formData.set("content", JSON.stringify(content));

         console.log("Editor.js Content:\n", JSON.stringify(content, null, 2));

  console.log("FormData values:", Object.fromEntries(formData.entries()));
        try {
            const res = await create(formData);
            if (res?.id) {
                toast.success("Blog created successfully!");
                
                localStorage.removeItem("editorDataLocal");
                router.push("/dashboard/blogs");
            } else {
                toast.error("Failed to create blog");
            }
        } catch (err) {
            console.error("Create blog error:", err);
            toast.error("Something went wrong");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
        >
            <h2 className="text-xl font-semibold mb-4">Create Blog</h2>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <EditorBlock onChange={(data) => {
                    setContent(data);
                   
                    try { localStorage.setItem("editorDataLocal", JSON.stringify(data)); } catch { }
                }} data={content} />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
                    Thumbnail URL
                </label>
                <input
                    type="url"
                    id="thumbnail"
                    name="thumbnail"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="tags">
                    Tags (comma separated)
                </label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    placeholder="Next.js, React, Web Development"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            <div>
                <p className="block text-sm font-medium mb-1">Featured</p>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="isFeatured"
                            value="true"
                            checked={isFeatured === "true"}
                            onChange={(e) => setIsFeatured(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="isFeatured"
                            value="false"
                            checked={isFeatured === "false"}
                            onChange={(e) => setIsFeatured(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                        />
                        No
                    </label>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
                Submit
            </Button>
        </form>
    );
}

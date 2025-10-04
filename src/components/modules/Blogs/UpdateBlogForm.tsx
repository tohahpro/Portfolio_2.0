/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateBlog } from '@/actions/create';
import { Post } from '@/types';
import Form from 'next/form'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import EditorBlock from '../TextEditor/EditorBlock';


export default function UpdateBlogForm({ blog }: { blog: Post }) {
    const [isFeatured, setIsFeatured] = useState(blog.isFeatured ? "true" : "false");
    const [content, setContent] = useState<any>(null); // Editor.js content
    const router = useRouter();

    // Parse existing content if it's JSON, otherwise create a simple text block
    useEffect(() => {
        try {
            // Try to parse as JSON first (EditorJS format)
            const parsedContent = JSON.parse(blog.content);
            setContent(parsedContent);
        } catch {
            // If not JSON, create a simple paragraph block
            setContent({
                blocks: [
                    {
                        type: "paragraph",
                        data: {
                            text: blog.content
                        }
                    }
                ]
            });
        }
    }, [blog.content]);

    const handleUpdate = async (formData: FormData) => {
        if (!content) {
            toast.error("Please write some content!");
            return;
        }

        try {
            const values = Object.fromEntries(formData.entries());
            const data = {
                ...values,
                isFeatured: isFeatured,
                content: JSON.stringify(content), // Add EditorJS content
            };
            const res = await updateBlog(String(blog.id), data);
            if (res?.id) {
                toast.success("Blog updated successfully!");
                router.push("/dashboard/blogs");
            } else {
                toast.error("Failed to update blog");
            }
        } catch (error) {
            toast.error("Something went wrong while updating the blog");
            console.error(error);
        }
    };



    return (
        <Form
            action={handleUpdate}
            className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
        >
            <h2 className="text-xl font-semibold mb-4 text-center">Update Blog</h2>

            {/* Title */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    defaultValue={blog.title}
                    id="title"
                    name="title"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <EditorBlock 
                    onChange={(data) => setContent(data)} 
                    data={content} 
                />
            </div>

            {/* Thumbnail */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
                    Thumbnail URL
                </label>
                <input
                    type="url"
                    defaultValue={blog.thumbnail || ""}
                    id="thumbnail"
                    name="thumbnail"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Tags */}
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="tags">
                    Tags (comma separated)
                </label>
                <input
                    type="text"
                    defaultValue={blog.tags.join(", ")}
                    id="tags"
                    name="tags"
                    placeholder="Next.js, React, Web Development"
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Featured */}
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

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
            >
                Submit
            </button>
        </Form>
    );
}
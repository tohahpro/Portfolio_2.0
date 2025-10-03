"use client";


import { deleteBlog } from "@/actions/create";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteButtonProps {
  blogId: number;
}

export const BlogDelete = ({ blogId }: DeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteBlog(String(blogId));
      toast.success("Project deleted successfully!");
      router.push("/dashboard/projects");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error(error)
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-destructive cursor-pointer"><Trash /></Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The project will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

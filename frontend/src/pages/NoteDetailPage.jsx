import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("ubble to fetch that note");
        toast.error("ubble to fetch that note");
      } finally {
        setIsLoading(false);
      }
    };

    fetching();
  }, [id]);

  //handleDelete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await axiosInstance.delete(`/notes/${id}`);
      navigate("/");
    } catch (error) {
      toast.error("error in hadledelte");
    }
  };

  //save updated note
  const handleSave = async () => {
    //check empty or not
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("No update! or all required");
      return;
    }
    setIsSaving(true);
    try {
      await axiosInstance.put(`/notes/${id}`, note);
      toast.success("successfully update and save");
      navigate("/");
    } catch (error) {
      toast.error("saving update in error");
    } finally {
      setIsSaving(false);
    }
  };
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  className="input input-bordered"
                  type="text"
                  placeholder="note title"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={isSaving}
                  onClick={handleSave}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;

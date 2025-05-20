import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "react-hot-toast";


// Replace with your url
const API_URL = "http://localhost:3000/books";

export default function BookFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const fetchBook = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      reset(res.data);
    } catch {
      toast.error("Failed to load book");
    }
  };

  useEffect(() => {
    if (id) fetchBook();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, data);
        toast.success("Book updated successfully");
      } else {
        await axios.post(API_URL, data);
        toast.success("Book added successfully");
      }
      navigate("/");
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Title" {...register("title", { required: true })} />
        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

        <Input placeholder="Author" {...register("author", { required: true })} />
        {errors.author && <p className="text-red-500 text-sm">Author is required</p>}

        <Input placeholder="Genre" {...register("genre", { required: true })} />
        {errors.genre && <p className="text-red-500 text-sm">Genre is required</p>}

        <Input type="number" placeholder="Published Year" {...register("year", { required: true })} />
        {errors.year && <p className="text-red-500 text-sm">Year is required</p>}

        <Select onValueChange={(val) => setValue("status", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Issued">Issued</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-red-500 text-sm">Status is required</p>}

        <Button type="submit" className="w-full">{id ? "Update Book" : "Add Book"}</Button>
      </form>
    </div>
  );
}

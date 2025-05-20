import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "react-hot-toast";


// Replace the api url with original url
const API_URL = "http://localhost:3000/books";

export default function DashboardPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ genre: "", status: "" });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
        setBooks(res.data);
        console.log(books);
    } catch (err) {
      toast.error("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    let filtered = books?.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filters.genre) filtered = filtered.filter(b => b.genre === filters.genre);
    if (filters.status) filtered = filtered.filter(b => b.status === filters.status);
    setFilteredBooks(filtered);
  }, [books, searchTerm, filters]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        toast.success("Book deleted");
        fetchBooks();
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const booksPerPage = 10;
  const paginatedBooks = filteredBooks.slice((page - 1) * booksPerPage, page * booksPerPage);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Book Management Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select onValueChange={(val) => setFilters(f => ({ ...f, genre: val }))}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter by Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fiction">Fiction</SelectItem>
            <SelectItem value="Non-fiction">Non-fiction</SelectItem>
            <SelectItem value="Sci-fi">Sci-fi</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(val) => setFilters(f => ({ ...f, status: val }))}>
          <SelectTrigger className="w-full md:w-1/4">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Issued">Issued</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => navigate("/add")}>Add Book</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedBooks.map(book => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.year}</TableCell>
              <TableCell>{book.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => navigate(`/edit/${book.id}`)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(book.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            size="sm"
            variant={page === i + 1 ? "default" : "outline"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}


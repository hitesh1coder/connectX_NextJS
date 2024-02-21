"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.length > 0) {
      router.replace(`/search?q=${search}`);
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute top-2 left-2 text-gray-400" />
        <input
          type="text"
          placeholder="Type here..."
          className="w-full p-2 rounded-lg bg-muted outline-none border pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  );
}

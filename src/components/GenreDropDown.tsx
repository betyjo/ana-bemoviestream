"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { GENRES } from "@/lib/appData"; // static genre data
import type { Genre } from "@/lib/appData";

export default function GenreDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white flex items-center text-sm font-medium">
        Genre <ChevronDown className="ml-1" size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Select a Genre</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {GENRES.map((genre: Genre) => (
          <DropdownMenuItem key={genre.id}>
            <Link
              href={`/genre/${genre.id}?genre=${encodeURIComponent(
                genre.name
              )}`}
              className="w-full block"
            >
              {genre.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

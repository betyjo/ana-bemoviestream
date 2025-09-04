import { MOVIE_SECTIONS } from "@/lib/appData";
import Link from "next/link";

function MovieSections() {
  return (
    <div>
      {MOVIE_SECTIONS.map((section) => (
        <div key={section.id}>
          <h2>{section.title}</h2>
          <Link href={section.viewMoreLink}>View more</Link>
        </div>
      ))}
    </div>
  );
}

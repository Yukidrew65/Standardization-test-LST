import { Clock, BarChart2, ChevronRight } from "lucide-react";
import { posts } from "@/lib/data";

export default function FeaturedPosts() {
  return (
    <section className="bg-light py-[80px] lg:py-[110px]">
      <div className="wrap flex flex-col items-center">
        <header className="flex flex-col items-center gap-[10px] text-center">
          <p className="text-14t font-bold text-primary">Practice Advice</p>
          <h2 className="text-40 font-bold text-navy">Featured Products</h2>
        </header>

        <div className="mt-[48px] grid w-full grid-cols-1 gap-[30px] lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col bg-white">
              <div
                className="relative h-[300px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
                role="img"
                aria-label={post.title}
              >
                <span className="absolute left-[20px] top-[20px] rounded-[3px] bg-danger px-[10px] py-[1px] text-14t font-bold text-white">
                  NEW
                </span>
              </div>

              <div className="flex flex-col gap-[15px] p-[25px]">
                <div className="flex gap-[15px] text-12">
                  <span className="text-primary">{post.tags[0]}</span>
                  <span className="text-muted">{post.tags[1]}</span>
                  <span className="text-muted">{post.tags[2]}</span>
                </div>

                <h3 className="text-20 text-navy">{post.title}</h3>
                <p className="text-14 text-muted">{post.body}</p>

                <div className="flex items-center justify-between text-12 text-muted">
                  <span className="flex items-center gap-[5px]">
                    <Clock size={16} className="text-primary" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-[5px]">
                    <BarChart2 size={16} className="text-success" />
                    {post.comments}
                  </span>
                </div>

                <a
                  href="#"
                  className="flex items-center gap-[10px] text-14t font-bold text-navy"
                >
                  Learn More
                  <ChevronRight size={16} className="text-primary" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

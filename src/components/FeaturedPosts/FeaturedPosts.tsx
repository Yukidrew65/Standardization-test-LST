import { Clock, BarChart2, ChevronRight } from "lucide-react";
import { posts } from "@/data/content";
import "./FeaturedPosts.css";

export function FeaturedPosts() {
  return (
    <section className="posts">
      <div className="wrap posts__inner">
        <header className="posts__head">
          <p className="posts__eyebrow">Practice Advice</p>
          <h2 className="posts__title">Featured Products</h2>
        </header>

        <div className="posts__grid">
          {posts.map((post) => (
            <article className="post" key={post.id}>
              <div className="post__media">
                <img src={post.image} alt={post.title} loading="lazy" />
                <span className="post__badge">NEW</span>
              </div>

              <div className="post__body">
                <div className="post__tags">
                  <span className="post__tag post__tag--accent">{post.tags[0]}</span>
                  <span className="post__tag">{post.tags[1]}</span>
                  <span className="post__tag">{post.tags[2]}</span>
                </div>

                <h3 className="post__title">{post.title}</h3>
                <p className="post__excerpt">{post.body}</p>

                <div className="post__meta">
                  <span className="post__meta-item">
                    <Clock size={16} className="post__icon-date" />
                    {post.date}
                  </span>
                  <span className="post__meta-item">
                    <BarChart2 size={16} className="post__icon-comments" />
                    {post.comments}
                  </span>
                </div>

                <a className="post__more" href="#">
                  Learn More
                  <ChevronRight size={16} className="post__icon-date" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

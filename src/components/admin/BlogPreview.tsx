import { BlogPostFormData } from "./BlogPostSettings";
import DOMPurify from "dompurify";
import { Calendar, Clock, User } from "lucide-react";

interface BlogPreviewProps {
  post: BlogPostFormData;
}

export function BlogPreview({ post }: BlogPreviewProps) {
  return (
    <div className="max-w-3xl mx-auto bg-background rounded-xl border border-border overflow-hidden">
      {/* Featured Image */}
      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      )}

      <div className="p-8">
        {/* Category */}
        {post.category && (
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold mt-2 mb-4">{post.title || "Untitled Post"}</h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          {post.author_name && (
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author_name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {post.publish_date
              ? new Date(post.publish_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Not set"}
          </span>
          {post.read_time && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.read_time}
            </span>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-accent rounded-full text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-p:text-muted-foreground prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || "<p>Start writing...</p>") }}
        />
      </div>
    </div>
  );
}

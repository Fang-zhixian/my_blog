import type { BlogEntry, PostSummary } from '../types/blog';

export function sortPostsByDate(posts: BlogEntry[]): BlogEntry[] {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function toPostSummary(post: BlogEntry): PostSummary {
  return {
    slug: post.slug,
    title: post.data.title,
    excerpt: post.data.description,
    date: post.data.pubDate.toISOString().split('T')[0],
    tag: post.data.tags?.[0] || '文章',
  };
}

export function getRecentPostSummaries(posts: BlogEntry[], limit: number): PostSummary[] {
  return sortPostsByDate(posts).slice(0, limit).map(toPostSummary);
}

export function getAllPostSummaries(posts: BlogEntry[]): PostSummary[] {
  return sortPostsByDate(posts).map(toPostSummary);
}

export function getUniqueTags(posts: PostSummary[]): string[] {
  return ['全部', ...new Set(posts.map((post) => post.tag))];
}

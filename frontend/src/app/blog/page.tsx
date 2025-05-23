// 'use client'
// import useSWR from 'swr'

// interface BlogPost {
//     id: string;
//     title: string;
// }

// const fetcher = (url: string): Promise<BlogPost[]> => fetch(url).then((r) => r.json());

// export default function BlogPage() {
//   const { data, error, isLoading } = useSWR(
//     'https://api.vercel.app/blog',
//     fetcher
//   )

//   if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error: {error.message}</div>

//   return (
//     <ul>
//       {data && data.map((post: { id: string; title: string }) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//     </ul>
//   )
// }

"use client";
import useSWR from "swr";

interface BlogPost {
  id: number;
  title: string;
}

const fetcher = (url: string): Promise<BlogPost[]> =>
  fetch(url).then((r) => r.json());

export default function BlogPage() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>{data && data.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
  );
}

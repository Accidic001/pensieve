import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Separator } from "@/components/ui/separator";
import { TopPostsList } from "@/components/posts/top-post";
import { fetchTopPosts } from "@/db/queries/posts";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main content - appears first on mobile */}
        <div className="lg:col-span-3 w-full lg:w-3/4">
          <h1 className="text-xl font-semibold mb-4">Top Posts</h1>
          <TopPostsList fetchData={fetchTopPosts} />
        </div>

        {/* Sidebar - appears second on mobile */}
        <div className="lg:col-span-1 w-full lg:w-1/4 sm:hidden lg:block">
          <div className="border rounded-lg shadow p-4 space-y-4 sticky top-4">
            <TopicCreateForm />
            <Separator className="my-2" />
            <h3 className="text-lg font-semibold">Topics</h3>
            <TopicList />
          </div>
        </div>
      </div>
    </div>
  );
}
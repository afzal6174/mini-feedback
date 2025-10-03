import { GET as getFeedbacks } from "@/app/api/feedback/route";
import FeedbackForm from "@/components/all-forms/feedback-form";
import PostCardSkeleton from "@/components/skeletons/post-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { Suspense, use } from "react";

type Post = {
  name: string;
  email: string;
  feedback: string;
};

export default function Home() {
  const postsPromise: Promise<Post[]> = getFeedbacks()
    .then((res) => res.json())
    .catch((err) => {
      console.error("Fetch posts error:", err);
      return [];
    });

  return (
    <main className="max-container bg-muted py-6 md:py-10 space-y-6">
      <section className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="heading-1">
          Welcome to <br /> Mini Feedback App
        </h1>
        <p className="lead">
          Your voice matters. Share your feedback instantly and see what others
          think—all in one simple app.
        </p>
      </section>

      <section>
        <FeedbackForm />
      </section>

      <section>
        <Card className="max-w-xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle>What Everyone is Saying</CardTitle>
            <CardDescription>
              Discover what people think and share your own perspective.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<PostCardSkeleton />}>
              <PostsList postsPromise={postsPromise} />
            </Suspense>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const PostsList = ({ postsPromise }: { postsPromise: Promise<Post[]> }) => {
  const posts = use(postsPromise);

  if (posts.length === 0) {
    return (
      <p className="muted">
        Looks like there&rsquo;s no feedback yet. Be the first to share your
        thoughts!
      </p>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </>
  );
};

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="p-4 space-y-4 border-1 rounded-sm my-1">
      <div className="flex items-center space-x-4">
        <User className="h-8 w-8 rounded-full bg-muted p-1" />
        <div className="grid flex-1 text-left">
          <h4 className="truncate">{post.name}</h4>
          <span className="muted truncate">{post.email}</span>
        </div>
      </div>
      <div>
        <p className="paragraph">{post.feedback}</p>
      </div>
    </div>
  );
};

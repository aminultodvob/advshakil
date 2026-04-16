import { AdminHeader } from "@/components/admin/admin-header";
import { PostEditor } from "@/components/admin/post-editor";

export default function NewPostPage() {
  return (
    <div className="space-y-8">
      <AdminHeader
        title="Create post"
        description="Compose a premium article with rich formatting, image support, and draft or publish controls."
      />
      <PostEditor />
    </div>
  );
}

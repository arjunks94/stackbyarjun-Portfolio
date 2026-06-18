export default function AdminPage() {
  return (
    <main className="min-h-screen pt-[var(--header-height)]">
      <iframe
        src="/admin/index.html"
        title="Decap CMS Admin"
        className="h-[calc(100vh-var(--header-height))] w-full border-0"
      />
    </main>
  );
}

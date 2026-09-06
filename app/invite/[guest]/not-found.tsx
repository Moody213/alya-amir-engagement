import Link from "next/link";

export default function GuestNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-script text-4xl text-ink">Alya &amp; Amir</p>
      <p className="mt-4 text-sm text-text-muted">
        We couldn&apos;t find that invitation link.
      </p>
      <Link
        href="/"
        className="mt-6 border-b border-gold text-xs uppercase tracking-widest-2 text-ink hover:text-gold"
      >
        View the Invitation
      </Link>
    </div>
  );
}

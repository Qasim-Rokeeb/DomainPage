import Link from 'next/link';
import { MountainIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MountainIcon className="h-6 w-6 text-accent" />
          <p className="font-semibold text-foreground">DomainPage</p>
        </div>
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} DomainPage. All rights reserved.
        </p>
        <div className="flex gap-4 items-center">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" prefetch={false}>
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

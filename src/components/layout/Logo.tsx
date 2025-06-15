'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="group">
      <Image
        src="/images/logo.png"
        alt="Media Computers Logo"
        width={250}
        height={60}
        className="h-16 object-contain transition-transform duration-300 group-hover:scale-105"
        priority
      />
    </Link>
  );
} 
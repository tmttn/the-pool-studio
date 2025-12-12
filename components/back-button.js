'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'tabler-icons-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex flex-row items-center mt-8 text-sm font-thin text-gray-400"
    >
      <ChevronLeft size={16} />
      Back
    </button>
  );
}

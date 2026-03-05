'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <form className='relative' onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='제목으로 찾아보세요..'
          className='w-48 sm:w-64 px-4 py-2 pr-16 text-sm bg-secondary text-foreground placeholder:text-muted-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type='submit'
          className='absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 text-sm font-medium bg-foreground text-background rounded hover:opacity-90 transition-opacity'
        >
          search
        </button>
      </form>
    </>
  );
}

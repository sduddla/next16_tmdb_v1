import { Suspense } from 'react';
import SearchResults from '@/components/search/SearchResult';
import { categoryName } from '@/lib/utils';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string; category: string }>;
}) {
  const { keyword = '', category = '' } = await searchParams;

  return {
    title:
      category !== '' ? `${categoryName(category)}` : `"${keyword}" 검색결과`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string; category: string }>;
}) {
  const { keyword = '', category = '' } = await searchParams;
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-background pt-24 pb-16 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground' />
        </div>
      }
    >
      <SearchResults
        key={`${keyword}::${category}`}
        keyword={keyword}
        category={category}
      />
    </Suspense>
  );
}

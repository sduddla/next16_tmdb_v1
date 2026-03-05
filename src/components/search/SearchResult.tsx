import Link from 'next/link';
import { getMovieMoreData, getMoviesData } from '@/lib/api';
import { categoryName } from '@/lib/utils';
import SearchClient from './SearchClient';

interface SearchResultProps {
  keyword: string;
  category: string;
}

export default async function SearchResults({
  keyword,
  category,
}: SearchResultProps) {
  let data: TMDBListResponse | null = null;
  if (keyword !== '') {
    data = await getMovieMoreData(keyword, 1);
  }

  if (category !== '') {
    data = await getMoviesData(category, 1);
  }

  // const movies = data?.results ?? [];
  const totalResults = data?.total_results || 0;
  return (
    <div className='min-h-screen bg-background pt-24 pb-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='m12 19-7-7 7-7' />
              <path d='M19 12H5' />
            </svg>
            홈으로
          </Link>

          {/* 검색 결과가 있을 때 */}
          {keyword !== '' ? (
            <>
              <h1 className='text-3xl font-bold text-foreground mb-2'>
                검색 결과
              </h1>
              <p className='text-muted-foreground'>
                &quot;{keyword}&quot;에 대한 검색 결과{' '}
                {totalResults.toLocaleString('ko-KR')}건
              </p>
            </>
          ) : (
            <>
              <h1 className='text-3xl font-bold text-foreground mb-2'>
                {categoryName(category)}
              </h1>
              <p className='text-muted-foreground'>
                총 {totalResults.toLocaleString('ko-KR')}개의 영화
              </p>
            </>
          )}
        </div>

        <SearchClient />
      </div>
    </div>
  );
}

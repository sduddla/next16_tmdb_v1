'use client';

import { useMemo } from 'react';
import MovieCard from '../movies/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'next/navigation';
import { fetchMoviesFromRoute } from '@/lib/api';
import { MovieCardSkeleton } from '../ui/Skeletons';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function SearchClient() {
  // const page = useRef(1);
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword')?.trim() ?? '';
  const category = searchParams.get('category')?.trim() ?? '';

  const mode = useMemo(() => {
    // 검색 모드 설정
    if (keyword) return { type: 'keyword', value: keyword };
    if (category) return { type: 'category', value: category };
    return { type: 'none', value: '' };
  }, [keyword, category]);

  // const [searchMovies, setSearchMovies] = useState(movies);
  // const [hasMore, setHasMore] = useState(true); // 더 많은 영화가 있는지 여부
  // const [isLoading, setIsLoading] = useState(false);

  // const handleMore = async () => {
  //   if (mode.type === 'none') return;

  //   page.current += 1;
  //   setIsLoading(true);
  //   try {
  //     // await new Promise((resolve) => setTimeout(resolve, 3000));
  //     const res =
  //       mode.type === 'keyword'
  //         ? await fetchMoviesFromRoute(page.current, '', mode.value)
  //         : await fetchMoviesFromRoute(page.current, mode.value, '');

  //     setSearchMovies((searchMovies) => [...searchMovies, ...res.results]);
  //     if (res.results.length === 0) setHasMore(false);
  //   } catch (error) {
  //     console.error(error);
  //     setHasMore(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    // data: 모든 페이지의 데이터를 배열로 반환한다.
    // fetchNextPage: 함수를 호출하면 다음 페이지의 데이터를 가져온다.
    // hasNextPage: 다음 페이지가 있는지 여부를 반환한다.
    // isFetchingNextPage: 다음 페이지를 가져오는 중인지 여부를 반환한다.

    useInfiniteQuery<TMDBListResponse, Error>({
      queryKey: ['search', category, keyword],
      queryFn: ({ pageParam }) => {
        return mode.type === 'keyword'
          ? fetchMoviesFromRoute(Number(pageParam), '', mode.value)
          : fetchMoviesFromRoute(Number(pageParam), mode.value, '');
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage.page + 1;
        const hasMore = nextPage <= lastPage.total_pages ? nextPage : undefined;
        return hasMore;
      },
      staleTime: 60 * 60 * 1000, // 1시간 동안 데이터를 캐시로 저장한다.
    });

  const totalItems =
    data?.pages.reduce((acc, p) => acc + p.results.length, 0) || 0;

  return (
    <>
      <InfiniteScroll
        dataLength={totalItems}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={null}
      >
        {/* 검색된 영화가 있으면 */}
        {data?.pages && data?.pages.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {data?.pages.map((pageData) =>
              pageData.results.map((movie, i) => (
                <MovieCard key={`${movie.id}${i}`} movie={movie} />
              )),
            )}

            {/* {searchMovies?.map((movie, i) => (
              <MovieCard key={`${movie.id}${i}`} movie={movie} />
            ))} */}

            {isFetchingNextPage &&
              Array.from({ length: 10 }, (_, v) => (
                <MovieCardSkeleton key={v} />
              ))}
          </div>
        )}

        {/* 검색된 영화가 없으면 */}
        {data?.pages && data?.pages.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='64'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='text-muted-foreground mb-4'
            >
              <circle cx='11' cy='11' r='8' />
              <path d='m21 21-4.3-4.3' />
            </svg>
            <h2 className='text-xl font-semibold text-foreground mb-2'>
              검색 결과가 없습니다
            </h2>
            <p className='text-muted-foreground text-center'>
              다른 검색어로 다시 시도해보세요.
            </p>
          </div>
        )}
      </InfiniteScroll>
    </>
  );
}

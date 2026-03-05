import Link from 'next/link';
import MovieSection from '@/components/movies/MovieSection';
import {
  getMovieCreditsData,
  getMovieDetailData,
  getMovieVideoData,
  getSimilarMovies,
} from '@/lib/api';
import MovieDetailPoster from '@/components/movies/MovieDetailPoster';
import { formatMinutesToHourMin } from '@/lib/utils';
import ScrollTop from '@/components/ui/ScrollTop';

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [movie, video, credits, similar] = await Promise.all([
    getMovieDetailData(id),
    getMovieVideoData(id),
    getMovieCreditsData(id),
    getSimilarMovies(id),
  ]);

  const casting = credits.cast
    .filter((v) => v.known_for_department === 'Acting' && v.order <= 4)
    .map((v) => v.name)
    .join(' · '); // 주연배우 4명

  const director = credits.crew
    .filter((v) => v.job === 'Director')
    .map((v) => v.name)[0]; // 감독 1명

  return (
    <>
      <ScrollTop />
      <div className='min-h-screen bg-background pt-16'>
        {/* Video Section */}
        <section className='bg-secondary'>
          <div className='max-w-4xl mx-auto px-4 py-8'>
            <div className='relative aspect-video rounded-lg overflow-hidden bg-black'>
              {/* 비메오는 `https://player.vimeo.com/video/${video.key}` */}
              {video && (
                <iframe
                  src={
                    video.site === 'Vimeo'
                      ? `https://player.vimeo.com/video/${video.key}`
                      : `https://www.youtube.com/embed/${video.key}`
                  }
                  title={`트레일러 영상 정보`}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  className='absolute inset-0 w-full h-full'
                />
              )}
              {!video && (
                <div className='flex items-center justify-center min-h-full'>
                  <p className='text-xl'>트레일러 정보가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Movie Info Section */}
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='flex flex-col md:flex-row gap-8'>
            <div className='flex-1'>
              <h1 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
                {movie.title}
              </h1>

              <div className='flex items-center gap-3 mb-6'>
                <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white text-sm font-bold'>
                  {(movie.vote_average * 10).toFixed(0)}%
                </span>
                <span className='text-muted-foreground'>
                  {movie.genres.map((genre) => genre.name).join('/')} ·{' '}
                  {formatMinutesToHourMin(movie.runtime || 0)}
                </span>
              </div>

              <div className='space-y-4 text-foreground'>
                <p>
                  <span className='font-semibold'>Director:</span>
                  <span className='text-muted-foreground ml-1'>{director}</span>
                </p>
                <p>
                  <span className='font-semibold'>Casting:</span>
                  <span className='text-muted-foreground ml-1'>{casting}</span>
                </p>
                <p>
                  <span className='font-semibold'>Production:</span>
                  <span className='text-muted-foreground ml-1'>
                    {movie.production_companies
                      .map((company) => company.name)
                      .join(', ')}
                  </span>
                </p>
              </div>

              <p className='mt-6 text-muted-foreground leading-relaxed'>
                {movie.overview}
              </p>
            </div>

            <div className='md:w-64 shrink-0'>
              <div className='relative aspect-2/3 rounded-lg overflow-hidden bg-secondary'>
                <MovieDetailPoster
                  img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Related Movies Section */}
        {similar && similar.length > 0 && (
          <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-muted'>
            <MovieSection
              title='관련있는 영화'
              subTitle='Related Movies'
              movies={similar}
              moreUrl=''
            />
          </section>
        )}

        {/* Back Link */}
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
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
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}

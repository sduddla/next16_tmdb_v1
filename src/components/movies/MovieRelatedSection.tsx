import { getSimilarMovies } from '@/lib/api';
import MovieSection from './MovieSection';

export default async function MovieRelatedSection({ id }: { id: string }) {
  const similar = await getSimilarMovies(id);

  return (
    <>
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
    </>
  );
}

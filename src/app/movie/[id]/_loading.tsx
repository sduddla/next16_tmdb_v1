import { MovieDetailSkeleton } from '@/components/ui/Skeletons';
import ScrollTop from '@/components/ui/ScrollTop';

export default function Loading() {
  return (
    <>
      <ScrollTop />
      <MovieDetailSkeleton />
    </>
  );
}

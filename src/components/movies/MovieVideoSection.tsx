import { getMovieVideoData } from '@/lib/api';

export default async function MovieVideoSection({ id }: { id: string }) {
  const video = await getMovieVideoData(id);
  return (
    <>
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
    </>
  );
}

import { getMovieMoreData, getMoviesData } from '@/lib/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get('page') || '1');
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  try {
    if (keyword !== '') {
      const data = await getMovieMoreData(keyword, page);
      return NextResponse.json(data);
    }

    if (category !== '') {
      const data = await getMoviesData(category, page);
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: '영화 데이터를 불러오지 못했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}

import { pickMainVideo } from './utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
  },
};

// 영화 정보 불러오기
export async function getMoviesData(
  category: string,
  page = 1,
): Promise<TMDBListResponse> {
  try {
    const res = await fetch(
      `${API_URL}/movie/${category}?language=ko-KR&page=${page}`,
      {
        ...options,
        next: {
          revalidate: 60 * 60 * 24,
        },
      },
    );

    if (!res.ok) {
      throw new Error(
        `TMDB API 요청 실패 (상태 코드: ${res.status} ${res.statusText}) - ${category} 조회`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('영화 정보를 불러오지 못했습니다.');
  }
}

// 영화 상세 정보 불러오기
export async function getMovieDetailData(id: string): Promise<Movie> {
  try {
    const res = await fetch(`${API_URL}/movie/${id}?language=ko-KR`, {
      ...options,
      next: {
        revalidate: 60 * 60 * 24,
      },
    });

    if (!res.ok) {
      throw new Error(
        `TMDB API 요청 실패 (상태 코드: ${res.status} ${res.statusText}) - 영화 상세 정보 조회`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('영화 상세 정보를 불러오지 못했습니다.');
  }
}

// 영화 비디오 정보 불러오기
export async function getMovieVideoData(id: string) {
  try {
    const res = await fetch(`${API_URL}/movie/${id}/videos`, {
      ...options,
      next: {
        revalidate: 60 * 60 * 24,
      },
    });

    if (!res.ok) {
      throw new Error(
        `TMDB API 요청 실패 (상태 코드: ${res.status} ${res.statusText}) - 영화 비디오 정보 조회`,
      );
    }

    const result = await res.json();
    return pickMainVideo(result.results);
  } catch (error) {
    console.error(error);
    throw new Error('영화 비디오 정보를 불러오지 못했습니다.');
  }
}

// 영화 출연자 및 스태프 정보 불러오기
export async function getMovieCreditsData(id: string): Promise<MovieCredits> {
  try {
    const res = await fetch(`${API_URL}/movie/${id}/credits`, {
      ...options,
      next: {
        revalidate: 60 * 60 * 24,
      },
    });

    if (!res.ok) {
      throw new Error(
        `TMDB API 요청 실패 (상태 코드: ${res.status} ${res.statusText}) - 영화 출연자 및 스태프 정보 조회`,
      );
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('영화 출연자 및 스태프 정보를 불러오지 못했습니다.');
  }
}

// 관련 있는 영화 정보 불러오기
export async function getSimilarMovies(id: string): Promise<Movie[]> {
  try {
    const res = await fetch(`${API_URL}/movie/${id}/similar`, {
      ...options,
      next: {
        revalidate: 60 * 60 * 24,
      },
    });

    if (!res.ok) {
      throw new Error(
        `TMDB API 요청 실패 (상태 코드: ${res.status} ${res.statusText}) - 관련 있는 영화 정보 조회`,
      );
    }

    const result = await res.json();
    return result.results;
  } catch (error) {
    console.error(error);
    throw new Error('관련 있는 영화 정보를 불러오지 못했습니다.');
  }
}

// 영화 검색 정보 불러오기
export async function getMovieMoreData(
  keyword: string,
  page = 1,
): Promise<TMDBListResponse> {
  try {
    const res = await fetch(
      `${API_URL}/search/movie?language=ko-KR&query=${encodeURIComponent(keyword)}&page=${page}`,
      {
        ...options,
        next: {
          revalidate: 60 * 60 * 24,
        },
      },
    );

    if (!res.ok) {
      throw new Error(
        `TMDB API 요청 실패 (상태 코드: ${res.status} ${res.statusText}) - 영화 검색 정보 조회`,
      );
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('영화 검색 정보를 불러오지 못했습니다.');
  }
}

export async function fetchMoviesFromRoute(
  page: number,
  category: string,
  keyword: string,
) {
  try {
    const res = await fetch(
      `/api/movies?page=${page}&category=${category}&keyword=${encodeURIComponent(keyword)}`,
    );

    if (!res.ok) {
      throw new Error(
        `TMDB API 요청 실패 (상태 코드: ${res.status} ${res.statusText}) - 영화 검색 정보 조회 실패`,
      );
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('영화 검색 정보를 불러오지 못했습니다.');
  }
}

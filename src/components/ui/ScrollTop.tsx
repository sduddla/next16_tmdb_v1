'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// 페이지 이동 시 마다 페이지 최상단으로 이동하는 컴포넌트
export default function ScrollTop() {
  const pathName = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return null;
}

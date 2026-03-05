import Header from '@/components/main/Header';

export default function AppTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

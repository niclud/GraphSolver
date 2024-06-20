export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center ">
      <div className="">{children}</div>
    </section>
  );
}

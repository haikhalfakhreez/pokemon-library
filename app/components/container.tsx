export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-6 md:mx-auto md:max-w-screen-md">{children}</div>
}

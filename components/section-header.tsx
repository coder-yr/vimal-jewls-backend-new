interface SectionHeaderProps {
  title: string;
  underlineClassName?: string;
}

export function SectionHeader({ title, underlineClassName }: SectionHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <h1 className="text-pretty text-3xl md:text-4xl">{title}</h1>
      <span
        aria-hidden="true"
        className={`mt-3 h-0.5 w-10 rounded ${
          underlineClassName || "bg-teal-500"
        }`}
      />
    </header>
  )
}
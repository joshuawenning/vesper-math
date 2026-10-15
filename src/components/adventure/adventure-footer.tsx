import type { Chapter } from '@/lib/types';

export default function AdventureFooter({ chapter }: { chapter: Chapter }) {
  return (
    <footer className="mt-[23px] flex justify-end gap-[15px] text-[8px] text-subtle tablet:text-[9px]">
      <span>
        CHAPTER {chapter.number ?? 1} &nbsp; · &nbsp; {chapter.title.toUpperCase()}
      </span>
    </footer>
  );
}

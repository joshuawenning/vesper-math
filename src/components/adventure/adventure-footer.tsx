import Icon from '../icon';

export default function AdventureFooter() {
  return (
    <footer className="mt-[23px] flex justify-between gap-[15px] text-[8px] text-[#6e8578] tablet:text-[9px]">
      <span className="flex items-center gap-[7px]">
        <Icon name="leaf" className="size-[13px]" /> No timers. No lost progress. Room to wonder.
      </span>
      <span>CHAPTER I &nbsp; · &nbsp; THE FLOODED OBSERVATORY</span>
    </footer>
  );
}

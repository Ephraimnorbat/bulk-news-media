import Link from "next/link";

export function FloatButtons() {
  return (
    <>
      <Link
        href="/send-a-lead"
        className="fixed bottom-3 left-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--primary)] px-3 py-2 text-xs font-medium text-[color:var(--on-primary)] shadow-lg hover:bg-[color:var(--primary-light)] sm:bottom-5 sm:left-5 sm:gap-2 sm:px-4 sm:text-[13px]"
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--live)] text-[11px] text-white">
          +
        </span>
        Send a lead
      </Link>
      <button
        type="button"
        className="fixed bottom-3 right-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--surface)] px-3 py-2 text-xs text-[color:var(--cream)] shadow-lg ring-1 ring-[color:var(--line-strong)] sm:bottom-5 sm:right-5 sm:gap-2 sm:px-4 sm:text-[13px]"
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--chip)] text-[11px]">
          ?
        </span>
        Help improve
      </button>
    </>
  );
}

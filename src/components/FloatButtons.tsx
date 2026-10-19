import Link from "next/link";

export function FloatButtons() {
  return (
    <>
      <Link
        href="/send-a-lead"
        className="fixed bottom-5 left-5 z-30 inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] hover:bg-[color:var(--primary-light)] px-4 py-2 text-[13px] font-medium text-[color:var(--on-primary)] shadow-lg"
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--live)] text-[11px] text-white">
          +
        </span>
        Send a lead
      </Link>
      <button
        type="button"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-[color:var(--surface)] px-4 py-2 text-[13px] text-[color:var(--cream)] shadow-lg ring-1 ring-[color:var(--line-strong)]"
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--chip)] text-[11px]">
          ?
        </span>
        Help improve
      </button>
    </>
  );
}

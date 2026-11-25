import type { IconName } from "./icon-names";

type IconProps = { name: IconName; className?: string };

/** A symbol from public/sprite.svg. Decorative: hidden from assistive tech. */
export function Icon({ name, className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}

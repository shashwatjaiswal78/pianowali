import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
 * TORN EDGE
 *
 * A hand-torn paper edge, used where the navy hero tears away to reveal the
 * lavender section beneath. The points are deliberately irregular but shallow:
 * torn paper is a near-horizontal line with fine fibrous jitter and the odd
 * deeper nick. Long runs at high amplitude read as mountains instead.
 *
 * `preserveAspectRatio="none"` lets the 1440-wide path stretch to any viewport
 * without the edge growing taller on wide screens.
 * -------------------------------------------------------------------------*/
export function TornEdge({
  className,
  fill = "var(--color-lavender)",
}: {
  className?: string;
  /** Colour of the section being revealed beneath */
  fill?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 44"
      preserveAspectRatio="none"
      className={cn("block h-[clamp(20px,2.4vw,34px)] w-full", className)}
    >
      <path d="M0,44.0 L0,27.9 L18.8,27.9 L43.7,28.7 L51.3,28.8 L70.6,22.1 L86.5,26.3 L104.4,24.2 L116.8,19.8 L126.8,22.0 L145.5,22.9 L169.1,24.2 L194.7,21.5 L220.0,27.1 L230.9,33.8 L256.3,21.5 L270.1,23.8 L278.4,26.6 L285.4,25.0 L298.3,20.8 L311.3,27.3 L319.4,30.3 L340.6,22.4 L362.6,26.5 L369.8,24.0 L394.9,27.6 L419.6,32.0 L433.3,27.7 L442.4,27.9 L465.7,28.8 L474.5,26.7 L498.9,28.7 L516.3,24.8 L526.6,23.8 L546.7,31.0 L554.6,33.0 L569.4,26.6 L592.1,25.5 L600.1,22.4 L616.5,22.0 L637.4,33.5 L659.4,25.6 L669.2,21.5 L684.8,34.7 L710.4,25.9 L731.2,24.7 L745.9,25.2 L771.7,33.5 L788.2,23.4 L800.3,19.5 L814.2,19.8 L834.4,27.6 L848.3,24.6 L864.5,27.2 L877.1,33.6 L895.1,26.3 L906.9,25.8 L929.4,27.9 L943.0,27.5 L965.8,28.2 L989.3,29.0 L1014.5,26.2 L1024.6,19.2 L1040.7,27.4 L1061.6,27.8 L1079.6,25.5 L1098.5,26.9 L1119.1,23.9 L1134.5,24.2 L1154.6,23.1 L1170.5,23.2 L1180.1,24.0 L1190.7,25.8 L1205.0,26.6 L1216.5,22.5 L1231.2,25.4 L1240.4,21.2 L1248.0,23.4 L1265.4,26.5 L1290.6,21.0 L1313.1,25.2 L1322.8,26.4 L1347.9,33.4 L1361.6,22.5 L1370.7,26.7 L1380.3,28.5 L1394.5,24.3 L1407.0,32.2 L1432.3,20.4 L1440.0,32.8 L1440.0,44.0 Z" fill={fill} />
    </svg>
  );
}

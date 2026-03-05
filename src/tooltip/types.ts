import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import type { CommonStyleProps, BaseAccessibilityProps } from '../utils';

/** Tooltip size variants matching web twigs-react sm | md | lg */
export type TooltipSize = 'sm' | 'md' | 'lg';

/** Side of the reference element where the tooltip appears */
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

/** Alignment of the tooltip along the side axis */
export type TooltipAlign = 'start' | 'center' | 'end';

/**
 * Props for the Tooltip component.
 * Renders a floating content bubble anchored to a trigger element.
 *
 * Mobile deviation: Uses onPress/onLongPress instead of hover/focus trigger.
 * Mobile deviation: Adds autoHideDuration for auto-dismiss (web uses delayDuration for hover delay).
 */
export interface TooltipProps
  extends Omit<ViewProps, 'style'>, CommonStyleProps, BaseAccessibilityProps {
  /** Tooltip content — text string or ReactNode */
  content: ReactNode;
  /** Trigger element that the tooltip anchors to */
  children: ReactNode;
  /** Size variant (default: 'sm') */
  size?: TooltipSize;
  /** Which side of the trigger the tooltip appears on (default: 'top') */
  side?: TooltipSide;
  /** Alignment along the side axis (default: 'center') */
  align?: TooltipAlign;
  /** Controlled open state */
  open?: boolean;
  /** Default open state for uncontrolled usage */
  defaultOpen?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Distance in dp between tooltip and trigger (default: 6) */
  sideOffset?: number;
  /** Auto-dismiss duration in ms; 0 = no auto-dismiss (default: 0) */
  autoHideDuration?: number;
  /** Whether to show the arrow pointer (default: true) */
  hasArrow?: boolean;
  /** Trigger interaction: 'press' opens on tap, 'longPress' opens on long press (default: 'press') */
  triggerAction?: 'press' | 'longPress';
}

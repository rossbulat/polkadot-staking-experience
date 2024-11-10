// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import type { MouseEvent } from 'react';

export interface OnMouseHandlersProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseMove?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseOut?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?: (e: MouseEvent<HTMLButtonElement>) => void;
}

// Formats mouse handlers for buttons given its props.
export const onMouseHandlers = (props: OnMouseHandlersProps) => {
  const { onClick, onMouseOver, onMouseMove, onMouseOut } = props;
  return {
    onClick:
      typeof onClick == 'function'
        ? (e: MouseEvent<HTMLButtonElement>) => onClick(e)
        : undefined,
    onMouseMove:
      typeof onMouseMove == 'function'
        ? (e: MouseEvent<HTMLButtonElement>) => onMouseMove(e)
        : undefined,
    onMouseOut:
      typeof onMouseOut == 'function'
        ? (e: MouseEvent<HTMLButtonElement>) => onMouseOut(e)
        : undefined,
    onMouseOver:
      typeof onMouseOver == 'function'
        ? (e: MouseEvent<HTMLButtonElement>) => onMouseOver(e)
        : undefined,
  };
};

// Copyright 2024 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import BigNumber from 'bignumber.js'
import { useApi } from 'contexts/Api'
import { useTooltip } from 'contexts/Tooltip'
import { useValidators } from 'contexts/Validators/ValidatorEntries'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TooltipArea } from 'ui-core/base'
import { Graph } from 'ui-core/list'
import type {
  EraPointsHistoricalInnerProps,
  EraPointsHistoricalProps,
} from './types'
import { normaliseEraPoints, prefillEraPoints } from './Utils'

export const EraPointsHistorical = ({
  displayFor,
  eraPoints,
}: EraPointsHistoricalProps) => {
  const { t } = useTranslation('library')
  const { isReady } = useApi()
  const { validatorsFetched } = useValidators()
  const { setTooltipTextAndOpen } = useTooltip()

  const eraPointData: bigint[] = eraPoints.map(({ points }) => BigInt(points))
  const high = eraPointData.sort((a, b) => Number(b - a))[0]

  const normalisedPoints = normaliseEraPoints(
    Object.fromEntries(
      eraPoints.map(({ era, points }) => [
        era,
        new BigNumber(points.toString()),
      ])
    ),
    new BigNumber(high?.toString() || 1)
  )
  const prefilledPoints = prefillEraPoints(Object.values(normalisedPoints))
  const syncing = !isReady || !eraPoints.length || !validatorsFetched
  const tooltipText = t('validatorPerformance', {
    count: 30,
  })

  return (
    <Graph syncing={syncing} canvas={displayFor === 'canvas'}>
      <TooltipArea
        text={tooltipText}
        onMouseMove={() => setTooltipTextAndOpen(tooltipText)}
      />
      <GraphInner
        points={prefilledPoints}
        syncing={syncing}
        displayFor={displayFor}
      />
    </Graph>
  )
}

const GraphInner = ({
  points: rawPoints = [],
  syncing,
  displayFor,
}: EraPointsHistoricalInnerProps) => {
  // Prefill with duplicate of start point.
  let points = [rawPoints[0] || 0]
  points = points.concat(rawPoints)
  // Prefill with duplicate of end point.
  points.push(rawPoints[rawPoints.length - 1] || 0)

  const totalSegments = points.length - 2
  const vbWidth = 520
  const vbHeight = 115
  const xPadding = 0
  const yPadding = 10
  const xArea = vbWidth - 2 * xPadding
  const yArea = vbHeight - 2 * yPadding
  const xSegment = xArea / totalSegments
  let xCursor = xPadding

  const pointsCoords = points.map((point: number, index: number) => {
    const coord = {
      x: xCursor,
      y: vbHeight - yPadding - yArea * point,
      zero: point === 0,
    }

    if (index === 0 || index === points.length - 2) {
      xCursor += xSegment * 0.5
    } else {
      xCursor += xSegment
    }
    return coord
  })

  const lineCoords = []
  for (let i = 0; i <= pointsCoords.length - 1; i++) {
    const startZero = pointsCoords[i].zero
    const endZero = pointsCoords[i + 1]?.zero

    lineCoords.push({
      x1: pointsCoords[i].x,
      y1: pointsCoords[i].y,
      x2: pointsCoords[i + 1]?.x || pointsCoords[i].x,
      y2: pointsCoords[i + 1]?.y || pointsCoords[i].y,
      zero: startZero && endZero,
    })
  }

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {lineCoords.map(({ x1 }, index) => {
        if (index === 0 || index === lineCoords.length - 1) {
          return <Fragment key={`grid_y_coord_${index}`} />
        }
        return (
          <line
            key={`grid_coord_${index}`}
            strokeWidth={4}
            stroke={
              displayFor === 'canvas'
                ? 'var(--grid-color-secondary)'
                : 'var(--grid-color-primary)'
            }
            x1={x1}
            y1={0}
            x2={x1}
            y2={vbHeight}
          />
        )
      })}

      {!syncing &&
        [{ y1: vbHeight * 0.5, y2: vbHeight * 0.5 }].map(
          ({ y1, y2 }, index) => (
            <line
              key={`grid_coord_${index}`}
              strokeWidth={4}
              stroke={
                displayFor === 'canvas'
                  ? 'var(--grid-color-secondary)'
                  : 'var(--grid-color-primary)'
              }
              x1={0}
              y1={y1}
              x2={vbWidth}
              y2={y2}
              opacity={0.5}
            />
          )
        )}

      {!syncing &&
        lineCoords.map(({ x1, y1, x2, y2, zero }, index) => {
          const startOrEnd = index === 0 || index === lineCoords.length - 2
          const opacity = startOrEnd ? 0.25 : zero ? 0.5 : 1
          return (
            <line
              key={`line_coord_${index}`}
              strokeWidth={5.5}
              opacity={opacity}
              stroke={
                zero
                  ? 'var(--text-color-tertiary)'
                  : 'var(--accent-color-primary)'
              }
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
          )
        })}
    </svg>
  )
}

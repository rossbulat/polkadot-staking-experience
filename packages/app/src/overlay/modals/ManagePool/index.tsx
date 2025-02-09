// Copyright 2025 @polkadot-cloud/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useLedgerHardware } from 'contexts/LedgerHardware'
import { useActivePool } from 'contexts/Pools/ActivePool'
import { Title } from 'library/Modal/Title'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FixedTitle, Multi, MultiTwo, Padding, Section } from 'ui-core/modal'
import { useOverlay } from 'ui-overlay'
import { Forms } from './Forms'
import { Tasks } from './Tasks'

export const ManagePool = () => {
  const { t } = useTranslation('modals')
  const { activePool } = useActivePool()
  const { integrityChecked } = useLedgerHardware()
  const { setModalHeight, modalMaxHeight } = useOverlay().modal

  // modal task
  const [task, setTask] = useState<string>()

  // active modal section
  const [section, setSection] = useState<number>(0)

  // counter to trigger modal height calculation
  const [calculateHeight, setCalculateHeight] = useState<number>(0)
  const incrementCalculateHeight = () => setCalculateHeight(calculateHeight + 1)

  // refs for wrappers
  const headerRef = useRef<HTMLDivElement>(null)
  const tasksRef = useRef<HTMLDivElement>(null)
  const formsRef = useRef<HTMLDivElement>(null)

  const onResize = () => {
    let height = headerRef.current?.clientHeight || 0
    if (section === 0) {
      height += tasksRef.current?.clientHeight || 0
    } else {
      height += formsRef.current?.clientHeight || 0
    }
    setModalHeight(height)
  }

  // Resize modal on state change.
  useEffect(() => {
    onResize()
  }, [
    integrityChecked,
    section,
    task,
    calculateHeight,
    activePool?.bondedPool?.state,
  ])

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <Section type="carousel">
      <FixedTitle ref={headerRef}>
        <Title title={`${t('managePool')}`} fixed />
      </FixedTitle>
      <MultiTwo
        style={{
          maxHeight: modalMaxHeight - (headerRef.current?.clientHeight || 0),
        }}
        animate={section === 0 ? 'home' : 'next'}
        transition={{
          duration: 0.5,
          type: 'spring',
          bounce: 0.1,
        }}
        variants={{
          home: {
            left: 0,
          },
          next: {
            left: '-100%',
          },
        }}
      >
        <Multi>
          <Padding horizontalOnly>
            <Tasks setSection={setSection} setTask={setTask} ref={tasksRef} />
          </Padding>
        </Multi>

        <Multi>
          <Forms
            onResize={onResize}
            setSection={setSection}
            task={task}
            section={section}
            ref={formsRef}
            incrementCalculateHeight={incrementCalculateHeight}
          />
        </Multi>
      </MultiTwo>
    </Section>
  )
}

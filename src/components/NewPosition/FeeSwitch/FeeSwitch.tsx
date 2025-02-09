import React, { useState } from 'react'
import { Grid, Tab, Tabs } from '@material-ui/core'
import useStyles, { useSingleTabStyles, useTabsStyles } from './style'
import classNames from 'classnames'

export interface IFeeSwitch {
  onSelect: (value: number) => void
  showOnlyPercents?: boolean
  feeTiers: number[]
  bestTierIndex?: number
}

export const FeeSwitch: React.FC<IFeeSwitch> = ({
  onSelect,
  showOnlyPercents = false,
  feeTiers,
  bestTierIndex
}) => {
  const classes = useStyles()

  const [current, setCurrent] = useState(0)
  const [blocked, setBlocked] = useState(false)

  const tabsClasses = useTabsStyles()
  const singleTabClasses = useSingleTabStyles()

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    if (!blocked) {
      setCurrent(newValue)
      onSelect(newValue)
      setBlocked(true)
      setTimeout(() => {
        setBlocked(false)
      }, 200)
    }
  }

  return (
    <Grid className={classes.wrapper}>
      <Tabs
        value={current}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='auto'
        TabIndicatorProps={{ children: <span /> }}
        classes={tabsClasses}>
        {feeTiers.map((tier, index) => (
          <Tab
            key={index}
            disableRipple
            label={showOnlyPercents ? `${tier}%` : `${tier}% fee`}
            classes={{
              root: classNames(
                singleTabClasses.root,
                index === bestTierIndex ? singleTabClasses.best : undefined
              ),
              selected: singleTabClasses.selected
            }}
          />
        ))}
      </Tabs>
    </Grid>
  )
}

export default FeeSwitch

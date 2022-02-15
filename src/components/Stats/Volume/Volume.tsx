import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { formatNumbers, showPrefix } from '@consts/utils'
import { ResponsiveBar } from '@nivo/bar'
import classNames from 'classnames'
import { useStyles } from './style'
import { colors } from '@static/theme'

interface StatsInterface {
  percentVolume: number
  volume: number
  data: Array<{
    timeStamp: string
    value: number[]
  }>
}

const Volume: React.FC<StatsInterface> = ({ percentVolume, volume, data }) => {
  const classes = useStyles()

  const BarData = data.map(el => {
    const value = el.value

    const timeStamp = el.timeStamp

    const objs = value.reduce((a, v) => ({ ...a, [v]: v }), {})

    return { timeStamp, ...objs }
  })

  const keys = BarData.map(({ timeStamp, ...rest }) => rest)

  const getKeys = keys
    .map(key => Object.keys(key))
    .reduce((array, isArray) => (Array.isArray(isArray) ? array.concat(isArray) : array))

  const uniqueKeys = [...new Set(getKeys)]

  const Theme = {
    axis: {
      fontSize: '14px',
      tickColor: 'transparent',
      ticks: { line: { stroke: colors.invariant.component }, text: { fill: '#A9B6BF' } },
      legend: { text: { stroke: 'transparent' } }
    },
    grid: { line: { stroke: 'transparent' } }
  }

  const isLower = percentVolume < 0

  return (
    <Grid className={classes.container}>
      <Box className={classes.volumeContainer}>
        <Typography className={classes.volumeHeader}>Volume 24H</Typography>
        <div className={classes.volumePercentContainer}>
          <Typography className={classes.volumePercentHeader}>
            ${formatNumbers()(volume.toString())}
            {showPrefix(volume)}
          </Typography>
          <Box className={classes.volumeStatusContainer}>
            <Box
              className={classNames(
                classes.volumeStatusColor,
                isLower ? classes.backgroundVolumeLow : classes.backgroundVolumeUp
              )}>
              <Typography
                component='p'
                className={classNames(
                  classes.volumeStatusHeader,
                  isLower ? classes.volumeLow : classes.volumeUp
                )}>
                {percentVolume < 0
                  ? `-${percentVolume.toString().split('-')[1]}`
                  : `+ ${percentVolume}`}
                %
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
      <div className={classes.barContainer}>
        <ResponsiveBar
          margin={{ top: 70, bottom: 30, left: 0 }}
          data={BarData}
          keys={uniqueKeys}
          indexBy='timeStamp'
          labelSkipWidth={2}
          labelSkipHeight={12}
          theme={Theme}
          groupMode='grouped'
          enableLabel={false}
          enableGridY={false}
          isInteractive={false}
          innerPadding={3}
          padding={0.03}
          indexScale={{ type: 'band', round: true }}
          colors={colors.invariant.pink}
        />
      </div>
    </Grid>
  )
}

export default Volume

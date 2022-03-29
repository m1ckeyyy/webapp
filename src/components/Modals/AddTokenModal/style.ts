import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    background: colors.invariant.component,
    width: 480,
    height: 140,
    borderRadius: 24,
    padding: '20px 24px'
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  upperRow: {
    height: 20
  },
  lowerRow: {
    height: 60
  },
  title: {
    ...typography.heading4,
    color: colors.white.main
  },
  close: {
    minWidth: 0,
    maxHeight: 20,
    maxWidth: 16,
    fontSize: 20,
    background: 'none',
    '&:hover': {
      background: 'none !important'
    }
  },
  input: {
    backgroundColor: colors.invariant.newDark,
    width: '100%',
    height: 60,
    color: colors.white.main,
    borderRadius: 20,
    padding: '7px 10px 6px',
    ...typography.heading4,
    fontWeight: 400,
    marginRight: 16,
    '&::placeholder': {
      color: colors.invariant.light,
      ...typography.heading4,
      fontWeight: 400
    },
    '&:focus': {
      outline: 'none'
    }
  },
  add: {
    minWidth: 82,
    height: 60,
    background: colors.invariant.greenLinearGradient,
    ...typography.heading3,
    color: colors.invariant.black,
    textTransform: 'none',
    borderRadius: 18
  }
}))

export default useStyles

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { isNil, upperCase } from 'lodash';
import * as React from 'react';

import theme from '../../../themes/theme';
import Title from '../../Title';

interface PlayerInfoProps {
  playerInfo: {
    cardsCreated: number
    decksCreated: number
    gamesPlayed: number
    winRate: string
    favoriteOpponent?: React.ReactNode
  }
}

export const styles: Record<string, CSSProperties> = {
  root: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    margin: '0 12px'
  },
  progressContainer: {
    height: 'calc(100% - 35px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerInfo: {
    height: 'calc(100% - 35px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '30px 0',
    boxSizing: 'border-box',
    fontSize: 24,
  },
  favoriteFormats: {
    height: 'calc(100% - 35px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '30px 0',
    boxSizing: 'border-box',
    fontSize: 18
  },
  playerInfoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      display: 'block'
    },
  },
  playerInfoKey: {
    width: '50%',
    textAlign: 'right',
    fontWeight: 100,
    textTransform: 'uppercase',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      textAlign: 'center'
    },
  },
  playerInfoValue: {
    width: '48%',
    color: '#555',
    fontWeight: 700,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      textAlign: 'center',
      marginBottom: '0.5em'
    },
  },
  victory: {
    color: '#4CAF50',
    fontWeight: 600,
    fontSize: 14,
    textAlign: 'right'
  },
  defeat: {
    color: '#E57373',
    fontWeight: 600,
    fontSize: 14,
    textAlign: 'right'
  },
  draw: {
    fontWeight: 600,
    fontSize: 14,
    textAlign: 'right'
  },
  aborted: {
    fontWeight: 600,
    fontSize: 14,
    textAlign: 'right'
  },
  noGames: {
    width: '100%',
    height: 'calc(100% - 35px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: 100,
    textAlign: 'center'
  }
};

class PlayerInfo extends React.Component<PlayerInfoProps & WithStyles> {
  public render(): JSX.Element {
    const { playerInfo, classes } = this.props;

    return (
      <div className={classes.root}>
        <Title text="Player Stats" small />
        { isNil(playerInfo) ?
          <div className={classes.progressContainer}>
            <CircularProgress />
          </div> :
          <div className={classes.playerInfo}>{this.renderPlayerInfo()}</div>
        }
      </div>
    );
  }

  private renderPlayerInfo = () => {
    const { playerInfo, classes } = this.props;

    return Object.entries(playerInfo)
      .filter(([, v]) => v !== undefined)
      .map(([playerInfoKey, playerInfoValue]) => (
        <div key={playerInfoKey} className={classes.playerInfoItem}>
          <div className={classes.playerInfoKey}>
            {playerInfoKey === 'favoriteOpponent' ? '#1 Opponent' : upperCase(playerInfoKey)}
          </div>
          <div className={classes.playerInfoValue}>{playerInfoValue}</div>
        </div>
      ));
  }
}

export default withStyles(styles)(PlayerInfo);

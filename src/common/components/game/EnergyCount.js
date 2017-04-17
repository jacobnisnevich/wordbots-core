import React from 'react';
import { bool, object, string } from 'prop-types';
import Paper from 'material-ui/Paper';

const EnergyCount = ({color, energy, isCurrentPlayer}) => (
  <div>
    <Paper
      zDepth={2}
      circle
      style={{
        backgroundColor: isCurrentPlayer ? '#00bcd4' : '#ccc',
        width: 50,
        height: 50,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        minWidth: 50,
        marginRight: 8
    }}>
      <div
        style={{
          alignSelf: 'center',
          color: 'white',
          fontFamily: 'Carter One'
        }}>
        {energy.available} / {energy.total}
      </div>
    </Paper>
  </div>
);

EnergyCount.propTypes = {
  color: string,
  energy: object,
  isCurrentPlayer: bool
};

export default EnergyCount;

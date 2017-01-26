import React from 'react'
import Hex from './Hex'
import HexUtils from './HexUtils'
const { number, object, bool, string, array } = React.PropTypes
import HexShape from './HexShape'
import Path from './Path'
import Layout from './Layout'
import GridGenerator from './GridGenerator'
import loadImages from './HexGridImages'

class HexGrid extends React.Component {
  render() {
    const { hexColors, pieceImgs } = this.props;

    return (
      <svg className="grid" width={this.props.width} height={this.props.height} viewBox="-50 -50 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {
          this.props.hexagons.map((hex, index) => {
            return (
              <HexShape
                key={index}
                hex={hex}
                layout={this.props.layout}
                actions={this.props.actions}
                fill={hexColors[HexUtils.getID(hex)]}
                piece={pieceImgs[HexUtils.getID(hex)]}
                images={loadImages()} />
            );
          })
        }
        <Path {...this.props.path} layout={this.props.layout} />
      </svg>
    );
  }
}

HexGrid.generate = (config, content) => {
  let layout = new Layout(config.layout, config.origin);
  let generator = GridGenerator.getGenerator(config.map);
  let hexagons = generator.apply(this, config.mapProps);

  return { hexagons, layout };
}

HexGrid.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
  actions: object.isRequired,
  layout: object.isRequired,
  hexagons: array.isRequired,
  path: object,
  hexColors: object,
  pieceImgs: object,
  pieceStats: object
};

HexGrid.defaultProps = {
  width: 800,
  height: 600,
  path: { start: null, end: null }
}

export default HexGrid;

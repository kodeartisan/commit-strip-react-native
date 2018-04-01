// @flow
import * as React from 'react';
import { Image } from 'react-native';
import {
  Colors,
} from 'react-native-paper';

type Props = {
  uri: string,
  width: number,
  height: ?number,
};

type State = {
  source: Object,
  width: number,
  height: number,
};

class ComicImage extends React.PureComponent<Props, State> {
  static defaultProps = {
    height: null,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      source: {
        uri: props.uri,
      },
      width: 0,
      height: 200,
    };
  }

  componentWillMount() {
    Image.getSize(this.props.uri, (width, height) => {
      if (this.props.width && !this.props.height) {
        this.setState({ width: this.props.width, height: height * (this.props.width / width) });
      } else if (!this.props.width && this.props.height) {
        this.setState({ width: width * (this.props.height / height), height: this.props.height });
      } else {
        this.setState({ width, height });
      }
    });
  }

  render() {
    const { width, height } = this.state;
    return <Image source={this.state.source} style={{ height, width, backgroundColor: Colors.grey300 }} />;
  }
}

export default ComicImage;
// @flow
import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Linking,
} from 'react-native';
import {
  Colors,
  withTheme,
  Button,
} from 'react-native-paper';
import Moment from 'moment';

import BaseLayout from '../BaseLayout';
import ComicImage from './ComicImage';

type Props = {
  navigation: any,
};

type State = {};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  infoWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 50,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  published: {
    marginTop: 15,
    fontSize: 12,
    color: Colors.grey600,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: width - 8,
  },
});

/* eslint camelcase: 0 */
class Comic extends React.PureComponent<Props, State> {
  /* eslint class-methods-use-this: 0 */
  findUrl(text) {
    const source = (text || '').toString();
    const urlArray = [];
    let matchArray;

    // Regular expression to find HTTP(S).
    /* eslint no-useless-escape: 0 */
    const regexToken = /(((https?):\/\/)[\-\w@:%_\+.~#?,&\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\/\/=]+)/g;

    // Iterate through any URLs in the text.
    /* eslint no-cond-assign: 0 */
    if ((matchArray = regexToken.exec(source)) !== null) {
      const token = matchArray[0];
      urlArray.push(token);
    }
    return urlArray[0];
  }

  render() {
    const { navigation } = this.props;
    const {
      date,
      link,
      title,
      content,
    } = navigation.state.params.data;

    Moment.locale('en');

    return (
      <BaseLayout
        navigation={navigation}
        hideSearch
        hideLogo
        share={{ title, link }}
      >
        <ScrollView style={styles.wrapper}>
          <ComicImage
            uri={this.findUrl(content)}
            width={width}
          />
          <View style={styles.infoWrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.published}>
              {Moment(date).format('dddd, D MMMM YYYY')}
            </Text>
          </View>
        </ScrollView>
        <View style={styles.button}>
          <Button
            raised
            color="orange"
            compact
            style={{ width: '100%' }}
            onPress={() => Linking.openURL(link)}
          >
            See on CommitStrip.com
          </Button>
        </View>
      </BaseLayout>
    );
  }
}

export default withTheme(Comic);

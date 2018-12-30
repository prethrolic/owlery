import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder, ScrollView, TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const colors = {
  primary: '#70ccc7',
  gray: '#b7b7b7',
  lightgray: '#d7d7d7',
  darkgray: '#474747',
  semigray: '#777777',
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    height: 280,
    marginTop: 30,
  },
  title: {
    fontFamily: 'Raleway-SemiBold',
    letterSpacing: 10,
    fontSize: 24,
    lineHeight: 24,
    color: colors.primary,
    textTransform: 'lowercase',
    textAlign: 'center',
  },
  newsContainer: {
    height: SCREEN_HEIGHT - 400,
    width: SCREEN_WIDTH - 40,
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    overflow: 'hidden',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  newsContent: {
    fontFamily: 'Raleway',
    letterSpacing: 1,
    overflow: 'scroll',
  },
  swiperContainer: {
    height: 50,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 40,
    borderRadius: 5,
    zIndex: 0,
  },
  guide: {
    fontFamily: 'Raleway',
    letterSpacing: 2,
    textAlign: 'center',
    color: colors.darkgray,
    fontSize: 14,
  },
  swiper: {
    height: 140,
    width: SCREEN_WIDTH - 40,
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    overflow: 'hidden',
  },
  leftSwipe: {
    flex: 1,
    height: 50,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: colors.primary,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  rightSwipe: {
    flex: 1,
    height: 50,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.lightgray,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  swiperLabelFake: {
    fontFamily: 'Raleway-Bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: colors.semigray,
  },
  swiperLabelReal: {
    fontFamily: 'Raleway-Bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: 'white',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButton: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.lightgray,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  quitButton: {
    height: 50,
    width: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  quitButtonLabel: {
    fontFamily: 'Raleway-SemiBold',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
    color: colors.primary
  },
});

class Voter extends React.Component {
  constructor(){
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      swipecolor: colors.primary,
    }
  }

  componentWillMount(){
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: 0 })
        if(gestureState.dx > 0){
          this.setState({ swipecolor: colors.lightgray })
        } else {
          this.setState({ swipecolor: colors.primary })
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if( gestureState.dx > SCREEN_WIDTH/4.0 ){
          Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH + 100, y: 0}
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex+1 }, () =>
              this.position.setValue({ x: 0, y: 0}))
          })
        } else if( gestureState.dx < -SCREEN_WIDTH/4.0 ){
          Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH - 100, y: 0}
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex+1}, () =>
              this.position.setValue({ x: 0, y: 0}))
          })
        } else {
          Animated.spring(this.position, {
            toValue: {x: 0, y: 0},
            friction: 4,
          }).start()
        }
      }
    })
  }

  render(){
    return(
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Text style={ styles.title }>vote</Text>
        </View>
        <View style={ styles.newsContainer }>
          <ScrollView style={ styles.newsWrap }>
              <Text style={ styles.newsContent }>Animates a value according to an analytical spring model based on damped harmonic oscillation. Tracks velocity state to create fluid motions as the toValue updates, and can be chained together.
              Config is an object that may have the following options.
              Note that you can only define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one:
              The friction/tension or bounciness/speed options match the spring model in Facebook Pop, Rebound, and Origami.
              Animates a value according to an analytical spring model based on damped harmonic oscillation. Tracks velocity state to create fluid motions as the toValue updates, and can be chained together.
              Config is an object that may have the following options.
              Note that you can only define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one:
              The friction/tension or bounciness/speed options match the spring model in Facebook Pop, Rebound, and Origami.
              Animates a value according to an analytical spring model based on damped harmonic oscillation. Tracks velocity state to create fluid motions as the toValue updates, and can be chained together.
              Config is an object that may have the following options.
              Note that you can only define one of bounciness/speed, tension/friction, or stiffness/damping/mass, but not more than one:
              The friction/tension or bounciness/speed options match the spring model in Facebook Pop, Rebound, and Origami.</Text>
          </ScrollView>
        </View>

        <View style={ styles.footer }>
          <View>
            <Text style={ styles.guide }>
              &lt;&lt; swipe left or right to vote &gt;&gt;
            </Text>
          </View>
          <View style={[ { backgroundColor: this.state.swipecolor }, styles.swiperContainer ]}>
            <Animated.View
              {...this.PanResponder.panHandlers}
              style={[{ transform: this.position.getTranslateTransform() }, styles.swiper ]}>
              <View style={ styles.rightSwipe }>
                <Text style={ styles.swiperLabelFake }>Fake</Text>
              </View>
              <View style={ styles.leftSwipe }>
                <Text style={ styles.swiperLabelReal }>Real</Text>
              </View>
            </Animated.View>
          </View>
          <View style={ styles.buttonBar }>
            <TouchableWithoutFeedback>
              <View style={ styles.circleButton }>
                <FontAwesome5 name={'history'} solid size={ 20 } color={ colors.gray } />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={ styles.quitButton }>
                <Text style={ styles.quitButtonLabel }>quit</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={ styles.circleButton }>
                <FontAwesome5 name={'angle-right'} solid size={ 24 } color={ colors.gray } />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    )
  }
}

export default Voter;

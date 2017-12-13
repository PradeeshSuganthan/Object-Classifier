'use strict'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AppRegistry, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-camera';

export default class CameraApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraFeed: true,
      imagePath: null,
    };
  }

  cameraHome() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}>
          <View style={styles.capture}>
            <Button
              onPress={this.takePicture.bind(this)}
              title="[      ]"
            />
          </View>
        </Camera>
      </View>
    )
  }

  render() {
    return (
      <View style = {styles.container}>
        {(this.state.imagePath == null ) ? this.cameraHome(): this.showPicture()}
      </View>
    )
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
          console.log(data)
          this.setState({imagePath: data.path})
      })
      .catch(err => console.error(err));
  }

  showPicture() {
    return (
      <View>
        <Image
          source={{uri: this.state.imagepath}}
          style={styles.preview}
          />
      </View>
    )
  }

  closePicture() {
    this.setState({cameraFeed: true})
  }
}

export class DisplayPic extends Component {
  render() {
    return (
      <View style={styles.staticPic}>
        <View style={styles.exitPreview}>
          <View style={styles.exit}>
            <Button
              onPress={this.closePicture.bind(this)}
              title="X"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    margin: 40,
  },
  staticPic: {
    flex: 1,
  },
  exitPreview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  exit: {
    flex: 0,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  }
});

AppRegistry.registerComponent('CameraApp', () => CameraApp);

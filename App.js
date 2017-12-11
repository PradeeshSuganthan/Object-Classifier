'use strict'
import React, { Component } from 'react';
import { AppRegistry, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-camera';
import { StackNavigator } from 'react-navigation';


export default class CameraApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraFeed: true
    };
  }

  render() {
    if (this.state.cameraFeed){
      return (
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <View style={styles.capture}>
              <Button
                onPress={this.takePicture.bind(this)}
                title="[      ]"
              />
            </View>
          </Camera>
        </View>
      );
    }
    else {
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

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
    this.setState({cameraFeed: !this.state.cameraFeed})
        .catch(err => console.error(err));
  }

  closePicture() {
    this.setState({cameraFeed: true})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    backgroundColor: '#0000ff'
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

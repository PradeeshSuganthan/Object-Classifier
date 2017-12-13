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
          onFocusChanged={this.onFocusChanged.bind(this)}
          onZoomChanged={this.onZoomChanged.bind(this)}
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

  onFocusChanged(event) {
    console.log(event.nativeEvent.touchPoint);
  }

  onZoomChanged(event) {
    console.log(event.nativeEvent.touchPoint);
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
          source={{uri: this.state.imagePath}}
          style={styles.preview}
          />
        <View style={styles.exit}>
          <Button
            onPress={this.closePicture.bind(this)}
            title="X"
          />
        </View>
      </View>
    )
  }

  uploadPicture() {
    var data = new FormData();
    data.append('my_photo', {
      uri: this.state.imagePath,
      name: 'my_photo.jpg',
      type: 'image/jpg',
    })

    fetch(path, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: data
    });
  }

  closePicture() {
    this.setState({imagePath: null})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  preview: {
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
  exit: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
  }
});

AppRegistry.registerComponent('CameraApp', () => CameraApp);

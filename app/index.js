'use strict'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AppRegistry, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import RNFS from 'react-native-fs'


const cloudVisionKey = '';
const cloudPath = 'https://vision.googleapis.com/v1/images:annotate?key=' + cloudVisionKey;

export default class CameraApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraFeed: true,
      imagePath: null,
      base64: null,
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
          captureQuality={Camera.constants.CaptureQuality["480p"]}
          onFocusChanged={this.onFocusChanged.bind(this)}
          onZoomChanged={this.onZoomChanged.bind(this)}
          captureTarget={Camera.constants.CaptureTarget.memory}>
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
        {(this.state.base64 == null ) ? this.cameraHome(): this.showPicture()}
      </View>
    )
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
          this.setState({imagePath: 'data:image/png;base64,' + data.data})
          this.setState({base64: data.data})
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
        <View style={styles.classify}>
          <Button
            onPress={this.uploadPicture.bind(this)}
            title="Get classification"
          />
        </View>
      </View>
    )
  }

  uploadPicture() {
    axios.post(cloudPath, {
            "requests":[
              {
                "image":{
                  "content": this.state.base64
                },
                "features":[
                  {
                    "type":"LABEL_DETECTION",
                    "maxResults":1
                  }
                ]
              }
            ]
          })
      .then(response => {
        const labels = response.data.responses[0].labelAnnotations;
        console.log('Labels:');
        labels.forEach(label => console.log(label));
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }

  closePicture() {
    this.setState({base64: null})
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
  },
  classify: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    margin: 100,
  }
});

AppRegistry.registerComponent('CameraApp', () => CameraApp);

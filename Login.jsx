import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './Login.css'; // optional styling

function Login({ onLogin }) {
  const videoRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Please enter your details and look into the camera...');
  const [faceMatcher, setFaceMatcher] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);

      const image = await faceapi.fetchImage('/known-faces/ruthu.jpg');
      const detection = await faceapi
        .detectSingleFace(image)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detection) {
        const matcher = new faceapi.FaceMatcher(
          new faceapi.LabeledFaceDescriptors('Ruthu', [detection.descriptor])
        );
        setFaceMatcher(matcher);
        startVideo();
      } else {
        setMessage('❌ Known face not detected from image');
      }
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        setMessage('❌ Please allow camera access.');
      });
  };

  const handleLogin = async () => {
    if (username !== 'Ruthu' || password !== '1234') {
      setMessage('❌ Invalid username or password');
      return;
    }

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setMessage('❌ Face not detected on webcam');
      return;
    }

    const match = faceMatcher.findBestMatch(detection.descriptor);
    if (match.label === 'Ruthu') {
      setMessage('✅ Face matched! Logging in...');
      onLogin(username);
    } else {
      setMessage('❌ Face does not match');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h2>Face Recognition Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px' }}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px' }}
      /><br />
      <video
        ref={videoRef}
        autoPlay
        muted
        width="400"
        height="300"
        style={{ borderRadius: '8px', boxShadow: '0 0 10px #333' }}
      />
      <br />
      <button onClick={handleLogin} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Login
      </button>
      <p style={{ marginTop: '10px' }}>{message}</p>
    </div>
  );
}

export default Login;

const videoElement  = document.getElementById('video');
const canvasElement  = document.getElementById('canvas');
const canvasCtx  = canvasElement.getContext("2d")

var start = new Date();   
var dateStart = start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds() + ":" + start.getMilliseconds();
console.log("Start Time = "+ dateStart);


function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                     {color: '#C0C0C070', lineWidth: 1});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF3030'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: '#E0E0E0'});
    }
  }
  canvasCtx.restore();
  var end = new Date();   
  var dateEnd = end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds() + ":" + end.getMilliseconds();
  console.log("End Time = "+ dateEnd);
}

const faceMesh = new FaceMesh({locateFile: (videoElement) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${videoElement}`;
}});
faceMesh.setOptions({
  maxNumFaces: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
faceMesh.onResults(onResults);


faceMesh.send({image: videoElement});

// const camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await faceMesh.send({image: videoElement});
//   },
//   width: 1280,
//   height: 720
// });
// camera.start();

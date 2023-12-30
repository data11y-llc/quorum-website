import {
  nets,
  SsdMobilenetv1Options,
  detectSingleFace,
  TinyFaceDetectorOptions,
  FaceDetection
} from 'face-api.js';
import { MSDE_BASE_URL } from '../util/versionNumbers';

export class FaceDetector {
  constructor() {
    this.loadModels();
  }

  private async loadModels(): Promise<void> {
    console.log('loading models');
    //weights taken from https://github.com/justadudewhohacks/face-api.js/tree/master/weights place back if not there
    const baseUrl = `${MSDE_BASE_URL}/msde-deploy/widgets/weights/`;
    try {
      await nets.ssdMobilenetv1.loadFromUri(baseUrl);
      await nets.faceLandmark68Net.loadFromUri(baseUrl);
      await nets.tinyFaceDetector.loadFromUri(baseUrl);
      await nets.faceRecognitionNet.loadFromUri(baseUrl);
      await nets.faceExpressionNet.loadFromUri(baseUrl)
    } catch (e) {
      console.log(e);
    }
  }

  public async detectFace(
    input: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    options?: Partial<SsdMobilenetv1Options>
  ): Promise<FaceDetection | undefined> {
    let detections: FaceDetection | undefined;

    // Try TinyFaceDetector first
    console.log('trying tiny face detector');
    try {
      detections = await detectSingleFace(input, new TinyFaceDetectorOptions())
    } catch (e) {
      console.log(e);
    }

    // If no face detected, try SsdMobilenetv1
    if (!detections) {
      console.log('trying ssd mobilenet');
      try {
        detections = await detectSingleFace(input, new SsdMobilenetv1Options(options));
      } catch (e) {
        console.log(e);
      }
    }

    // If still no face detected, throw an error
    if (!detections) {
      console.log('failed to detect face');
      throw new Error('Failed to detect face');
    }

    return detections;
  }

  public createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  public drawFaceOnCanvas(
    face: FaceDetection,
    inputImage: HTMLImageElement,
    canvas: HTMLCanvasElement,
    zoomOutFactor: number = 1.5 // Default value is 1.0, meaning no zoom out
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context for canvas');
    }
    const { box } = face;

    // Calculate new bounding box dimensions
    const zoomedWidth = box.width * zoomOutFactor;
    const zoomedHeight = box.height * zoomOutFactor;
    const zoomedX = box.x - (zoomedWidth - box.width) / 2;
    const zoomedY = box.y - (zoomedHeight - box.height) / 2;

    ctx.drawImage(
      inputImage,
      zoomedX,
      zoomedY,
      zoomedWidth,
      zoomedHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}


import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FacialIdentificationService } from 'services/facial-identification.service';
import { StoreService } from 'services/store.service';

import { CameraMock } from 'services/mocks/camera.mock';
import { MediaCaptureMock } from 'services/mocks/media-capture.mock';
import { MediaMock } from 'services/mocks/media.mock';
import { FileMock } from 'services/mocks/file.mock';
import { FacialIdentificationMock } from 'services/mocks/facial-identification.mock';
import { StoreMock } from 'services/mocks/store.mock';

export function cameraProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new Camera();
  }
  return new CameraMock();
}

export function mediaCaptureProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new MediaCapture();
  }
  return new MediaCaptureMock();
}

export function mediaProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new Media();
  }
  return new MediaMock();
}

export function fileProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new File();
  }
  return new FileMock();
}

export function facialIdentificationProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new FacialIdentificationService();
  }
  return new FacialIdentificationMock();
}

export function storeProvider(platform: Platform, http: HttpClient) {
  if (platform.is('android') || platform.is('ios')) {
    return new StoreService(http);
  }
  return new StoreMock(http);
}

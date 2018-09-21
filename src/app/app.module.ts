import { FormularioPage } from 'pages/formulario/formulario';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//Modules
import { IonicApp, IonicErrorHandler, IonicModule, Platform, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
//PAGES
import { MapfrecitoPage } from 'pages/mapfrecito/mapfrecito';
import { IndexPage } from 'pages/index/index';
import { RegisterPage } from 'pages/register/register';
import { LoginPage } from 'pages/login/login';
import { FacialLoginPage } from 'pages/facial-login/facial-login';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { HttpClientModule } from '@angular/common/http';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';



//SERVICES
import { MapfreService } from 'services/mapfre.service';
import { TokenService } from 'services/token.service';
import { ContextGateController } from 'services/context-gate-controller.service';
import { ExternalsService } from 'services/externals.service';
import { MessagesService } from 'services/messages.service';
import { ParteService } from 'services/parte.service';
import { FacialIdentificationService } from 'services/facial-identification.service';
import { StoreService } from 'services/store.service';

import { CameraMock } from 'services/mocks/camera.mock';
import { MediaCaptureMock } from 'services/mocks/media-capture.mock';
import { MediaMock, MediaObjectMock } from 'services/mocks/media.mock';
import { FileMock } from 'services/mocks/file.mock';
import { StoreMock } from 'services/mocks/store.mock';
//Components
import { MyApp } from './app.component';
import { MessageAudioIntentComponent } from 'components/message/message-audio-intent/message-audio-intent.component';
import { MessageVideoIntentComponent } from 'components/message/message-video-intent/message-video-intent.component';
import { MessageAbstract } from 'components/message/message_abstract.component';
import { MessageTextComponent } from 'components/message/message_text/message_text.component';
import { MessageButtonsComponent } from 'components/message/message-buttons/message-buttons.component';
import { MessageCameraIntentComponent } from 'components/message/message_photoIntent/message_cameraIntent.component';
import { MessageMatriculaIntentComponent } from 'components/message/message_matriculaIntent/message_matriculaIntent.component';
import { MessageDniIntentComponent } from 'components/message/message-dni-intent/message-dni-intent.component';
import { MessagePhoneFormComponent } from 'components/message/message-phone-form/message-phone-form.component';
import { MessageInnerTextComponent } from 'components/message/message-inner-text/message-inner-text.component';
//plugin
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { TextToSpeech } from '@ionic-native/text-to-speech';


import {
  cameraProvider,
  mediaProvider,
  mediaCaptureProvider,
  fileProvider,
  facialIdentificationProvider,
  storeProvider
} from 'app/providers.factory';

import { SanitizerPipe } from 'pipes/sanitizer.pipe';

@NgModule({
  declarations: [
    MyApp,
    MessageTextComponent,
    MessageButtonsComponent,
    MapfrecitoPage,
    MessageAbstract,
    FormularioPage,
    MessageAudioIntentComponent,
    MessageVideoIntentComponent,
    MessageDniIntentComponent,
    MessagePhoneFormComponent,
    IndexPage,
    LoginPage,
    RegisterPage,
    FacialLoginPage ,
    MessageCameraIntentComponent,
    MessageMatriculaIntentComponent,
    MessageInnerTextComponent,
    SanitizerPipe
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false
    }, {
      links: [
       { component: IndexPage, name: 'Index', segment: '' },
       { component: LoginPage, name: 'Login', segment: 'login' },
       { component: FacialLoginPage, name: 'FacialLogin', segment: 'facial-login' },
       { component: FormularioPage, name: 'Formulario', segment: 'form' },
       { component: MapfrecitoPage, name: 'Mapfrecito', segment: 'chat' },
       { component: RegisterPage, name: 'Register', segment: 'register' },
     ]
   }),
    IonicStorageModule.forRoot()
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    MessageTextComponent,
    MessageButtonsComponent,
    MapfrecitoPage,
    MessageAbstract,
    MessageCameraIntentComponent,
    MessageMatriculaIntentComponent,
    MessageAudioIntentComponent,
    MessageVideoIntentComponent,
    MessageDniIntentComponent,
    MessagePhoneFormComponent,
    MessageInnerTextComponent,
    FormularioPage,
    IndexPage,
    LoginPage,
    RegisterPage,
    FacialLoginPage ,
  ],

  providers:[
    StatusBar,
    SplashScreen,
    ToastController,
    MapfreService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ContextGateController,
    ExternalsService,
    MessagesService,
    ParteService,
    { provide: FacialIdentificationService, useFactory: facialIdentificationProvider, deps: [Platform] },
    { provide: StoreService, useFactory: storeProvider, deps: [Platform, HttpClient] },
    TokenService,
    { provide: Camera, useFactory: cameraProvider, deps: [Platform] },
    { provide: MediaCapture, useFactory: mediaCaptureProvider, deps: [Platform] },
    { provide: Media, useFactory: mediaProvider, deps: [Platform] },
    { provide: File, useFactory: fileProvider, deps: [Platform] },
    SpeechRecognition,
    TextToSpeech //add provider speech to text
  ]
})
export class AppModule { }

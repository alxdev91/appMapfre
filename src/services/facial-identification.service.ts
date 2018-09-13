import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs/Observable';
import { Observer } from 'rxjs';

enum ENUM_MODE_WIDGET {
  Register = 'Register',
  Authenticate = 'Authenticate',
  ShowTutorial = 'ShowTutorial'
};

const MESSAGES = {
  fphi_str_welcome: 'Welcome',
  fphi_str_unable_register: 'Unable to perform the registration.',
  fphi_str_stopped_manually: 'User cancelled the process.',
  fphi_str_timeout: 'Process finished by timeout condition.',
  fphi_str_unknown_error: 'Unexpected error.',
  fphi_str_camera_permission_denied: 'Camera permission are disabled.',
  fphi_str_settings_permission_denied: 'Settings permission are disabled.',
  fphi_str_no_results_message: 'No results found.',
  fphi_str_low_memory: 'Process cancelled due to low memory issues.',
  fphi_str_hardware_error: 'A hardware internal error has occurred.',
  fphi_str_user_error: 'Username is required.',
  fphi_str_photo_detected: 'Photo is detected.',
  fphi_str_not_rated: 'Not rated.',
  fphi_str_unsuccess: 'Remain still and blink next time.',
  fphi_str_unsuccesslight: 'Look for an illuminated place with no backlighting next time.',
  fphi_str_unsuccessglasses: 'If you are wearing glasses, avoid the reflections next time.',
  fphi_str_unsuccesslowperformance: 'The performance of the device is lower than expected.',
  fphi_str_user_added: 'The user has been added correctly.',
  fphi_str_authenticated: 'User authenticated correctly.',
  fphi_str_not_authenticated: 'User not authenticated.',
  fphi_str_user_not_added: 'The user has not been added.',
  fphi_str_delete_user: 'The user has been deleted correctly.',
  fphi_str_generic_error_auth: 'Unable to perform the authentication.',
  fphi_str_generic_not_deleted: 'Unable to delete the user.',
  fphi_str_generic_extraction_license: 'The license data is not correct.',
  fphi_str_generic_unexpected_captured: 'The capturing process has failed.',
  fphi_str_generic_control_not_initialized: 'Unable to initialize the authentication.',
  fphi_str_generic_bad_extractor_conf: 'The extractor configuration is not correct.',
  fphi_str_exception_notconnected: 'App can\'t connect with the database. Verify Network Connection.',
  fphi_str_exception_notfound: 'Requested page not found.',
  fphi_str_exception_internalerror: 'Internal server error.',
  fphi_str_exception_uncaught: 'Unexpected error.'
};

/**
 * Implements the calls to external services, ex: MATRICULA_OCR
 */
@Injectable()
export class FacialIdentificationService {
  protected widget: any;

  protected facialService: any;

  protected ENUM_MODE_WIDGET = ENUM_MODE_WIDGET;

  protected MESSAGES = MESSAGES;

  protected resourcesPath: string = 'fphi-widget-resources-SelphiLive-1.0';

  register$: Observer<any>;

  authenticate$: Observer<any>;

  constructor() {
    this.widget = window['facephi'] && window['facephi'].widget;
    this.facialService = this.widget && this.widget.universal;
  }

  public registerUser(): Observable<any> {
    const register = Observable.create(observer => {
      this.register$ = observer;
    });
    this.facialService.StartWidget(
      this.onSuccessRegExtraction.bind(this),
      this.onErrorRegExtraction.bind(this),
      this.ENUM_MODE_WIDGET.Register,
      this.resourcesPath,
      this.getConfiguration()
    );

    return register;
  }

  public authenticateUser() : Observable<any> {
    const authenticate = Observable.create(observer => {
      this.authenticate$ = observer;
    });
    const configuration =  this.getConfiguration();
    // configuration.setEnableLiveness(true);

    this.facialService.StartWidget(
      this.onSuccessAuthenticate.bind(this),
      this.onErrorAuthenticate.bind(this),
      this.ENUM_MODE_WIDGET.Authenticate,
      this.resourcesPath,
      configuration
    );

    return authenticate;
  }

  protected getConfiguration() {
    return new this.widget.config.WidgetConfig();
  }

  protected onSuccessAuthenticate(result) {
    this.onSuccessValidation(result, function(data) {
      this.authenticate$.next(data);
        this.authenticate$.complete();
    }.bind(this))
  }

  protected onSuccessRegExtraction(result) {
    this.onSuccessValidation(result, function(data) {
      this.register$.next(data);
        this.register$.complete();
    }.bind(this))
  }

  protected getWidgetCodes() {
    return {
      WidgetErrorTypeProxy: window['WidgetErrorType'],
      WidgetFinishStatusProxy: window['WidgetFinishStatus']
    }
  }

  protected onSuccessValidation(result, afterValidationOk) {
    const { WidgetErrorTypeProxy, WidgetFinishStatusProxy } = this.getWidgetCodes();
    // Here must return the value of processing Widget if is a success.
    if (result != null && result) {
      var data = result;

      switch (parseInt(data['finishStatus'])) {
        case WidgetFinishStatusProxy.Ok: // OK
          break;
        case WidgetFinishStatusProxy.Error: // Error
          if (data['errorType']) {
            if (parseInt(data['errorType']) === WidgetErrorTypeProxy.UnknownError) // Unknown Error
            {
              alert('Error: ' + this.MESSAGES.fphi_str_unknown_error);
            }
            if (parseInt(data['errorType']) === WidgetErrorTypeProxy.CameraPermissionDenied) // Camera Permission Denied
            {
              alert('Error: ' + this.MESSAGES.fphi_str_camera_permission_denied);
            }
            if (parseInt(data['errorType']) === WidgetErrorTypeProxy.SettingsPermissionDenied) // Settings Permission Denied
            {
              alert('Error: ' + this.MESSAGES.fphi_str_settings_permission_denied);
            }
            if (parseInt(data['errorType']) === WidgetErrorTypeProxy.HardwareError) // Settings Permission Denied
            {
              alert('Error: ' + this.MESSAGES.fphi_str_hardware_error);
            }
            if (parseInt(data['errorType']) === WidgetErrorTypeProxy.ExtractionLicenseError) {
              alert('Error: ' + this.MESSAGES.fphi_str_generic_extraction_license);
            }
            if (parseInt(data['errorType']) === WidgetErrorTypeProxy.UnexpectedCaptureError) {
              alert('Error: ' + this.MESSAGES.fphi_str_generic_unexpected_captured);
            }
            if (parseInt(data['errorType']) === WidgetErrorTypeProxy.ControlNotInitializedError) {
              alert('Error: ' + this.MESSAGES.fphi_str_generic_control_not_initialized);
            }
            if (parseInt(data['errorType']) === WidgetErrorTypeProxy.BadExtractorConfiguration) {
              alert('Error: ' + this.MESSAGES.fphi_str_generic_bad_extractor_conf);
            }
          }
          else {
            alert('Error: ' + this.MESSAGES.fphi_str_unknown_error);
          }
          return;
        case WidgetFinishStatusProxy.CancelByUser: // CancelByUser
          alert('Info: ' + this.MESSAGES.fphi_str_stopped_manually);
          return;
        case WidgetFinishStatusProxy.Timeout: // Timeout
          alert('Info: ' + this.MESSAGES.fphi_str_timeout);
          return;
        default:
      }

      if (data['template']) {
        //WebService.CreateUser($scope.data.username, data['template']).then($scope.onRegisterCall);
        // serverCallRegister(username, data['template'], onSuccessRegisterCall, onErrorRegisterCall);
        afterValidationOk(data['template']);
      } else {
        alert('Error: ' + this.MESSAGES.fphi_str_unknown_error);
      }

    } else {
      alert('Error: ' + this.MESSAGES.fphi_str_unknown_error);
    }
  }

  protected onErrorRegExtraction(status) {
    this.register$.error(status);
  }

  protected onErrorAuthenticate(status) {
    this.authenticate$.error(status);
  }
}

declare namespace Components {
  namespace Schemas {
    export interface PostCodeDto {
      phoneNumber: string
      code: string
    }
    export interface PostNumberDto {
      phoneNumber: string
      recaptchaToken: string
    }
  }
}
declare namespace Paths {
  namespace AuthControllerSendSMS {
    export type RequestBody = Components.Schemas.PostNumberDto
    namespace Responses {
      export interface $204 {}
    }
  }
  namespace AuthControllerVerifyCode {
    export type RequestBody = Components.Schemas.PostCodeDto
    namespace Responses {
      export interface $204 {}
    }
  }
}

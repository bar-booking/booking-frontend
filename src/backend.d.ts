declare namespace Components {
  namespace Schemas {
    export interface ObtainTokenPairDto {
      phoneNumber: string
      code: string
    }
    export interface RefreshTokenPairDto {
      refresh: string
    }
    export interface TokenPair {
      access: string
      refresh: string
    }
    export interface TriggerVerificationDto {
      phoneNumber: string
      recaptchaToken: string
    }
    export interface User {
      phoneNumber: string
      name?: string
      confirmedEnrollmentsCount: number
      cancelledEnrollmentsCount: number
      createdAt: string // date-time
    }
  }
}
declare namespace Paths {
  namespace AuthControllerLogin {
    export type RequestBody = Components.Schemas.ObtainTokenPairDto
    namespace Responses {
      export type $200 = Components.Schemas.TokenPair
    }
  }
  namespace AuthControllerRefresh {
    export type RequestBody = Components.Schemas.RefreshTokenPairDto
    namespace Responses {
      export type $200 = Components.Schemas.TokenPair
    }
  }
  namespace AuthControllerSendCode {
    export type RequestBody = Components.Schemas.TriggerVerificationDto
    namespace Responses {
      export interface $204 {}
    }
  }
  namespace UsersControllerFindMe {
    namespace Responses {
      export type $200 = Components.Schemas.User
    }
  }
}

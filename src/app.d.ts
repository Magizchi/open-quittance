// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user: import("$lib/utils/auth").SessionValidationResult["user"];
      session: import("$lib/utils/auth").SessionValidationResult["session"];
    }
  }
}

export {};

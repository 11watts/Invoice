import {
  validateEmailname,
  validatePassword,
  validateUsername,
  validateEmail,
  validateSignUp
} from "../userValidators";

describe("user vaildator tests", () => {
  describe("validateSignUp tests", () => {
    it("give error if passwords don't match", () => {
      const data = {
        email: "email@test.com",
        username: "username",
        password: "password",
        password2: "passwo0d"
      };
      const error = validateSignUp(data);

      expect(error.password2.isValid).toBe(false);
      expect(error.password2.errors[0]).toBe("Passwords must match");
    });

    it("pass if given vaild data", () => {
      const data = {
        email: "email@test.com",
        username: "username",
        password: "password",
        password2: "password"
      };
      const error = validateSignUp(data);

      expect(error.email.isValid).toBe(true);
      expect(error.username.isValid).toBe(true);
      expect(error.password.isValid).toBe(true);
      expect(error.password2.isValid).toBe(true);
    });
  });
  describe("validateEmail tests", () => {
    it("give error if username is invaild", () => {
      let errors = validateEmail();

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Email is required");

      errors = validateEmail("123456");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Email is invalid");

      errors = validateEmail("123@t@t.com");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Email is invalid");
    });

    it("pass if given vaild email", () => {
      let errors = validateEmail("123.t@t.com");

      expect(errors.isValid).toBe(true);

      errors = validateEmail("test_test@test.covir");
      expect(errors.isValid).toBe(true);
    });
  });

  describe("validateUsername tests", () => {
    it("give error if username is invaild", () => {
      let errors = validateUsername();

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is required");

      errors = validateUsername("123456");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe(
        "Username must be at least 8 characters long"
      );

      errors = validateUsername("123@456ab%");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username must be alphanumeric");
    });

    it("pass if given vaild username", () => {
      let errors = validateUsername("username");

      expect(errors.isValid).toBe(true);

      errors = validateUsername("username1234");
      expect(errors.isValid).toBe(true);
    });
  });

  describe("validatePassword tests", () => {
    it("give error if password is invaild", () => {
      let errors = validatePassword();

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Password is required");

      errors = validatePassword("123456");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe(
        "Password must be at least 8 characters long"
      );
    });

    it("pass if given vaild password", () => {
      let errors = validatePassword("password");

      expect(errors.isValid).toBe(true);

      errors = validatePassword("passwordAg4@54$vdg");
      expect(errors.isValid).toBe(true);
    });
  });

  describe("validateEmailname tests", () => {
    it("give error if login is empty", () => {
      let errors = validateEmailname();

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is invaild");

      errors = validateEmailname(" ");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is invaild");

      errors = validateEmailname("");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is invaild");
    });

    it("give error if login is invaild", () => {
      let errors = validateEmailname(12345678);

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is invaild");

      errors = validateEmailname(undefined);

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is invaild");

      errors = validateEmailname(null);

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is invaild");

      // to short
      errors = validateEmailname("13512");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is invaild");

      // not alphanumeric
      errors = validateEmailname("13512#ag3");

      expect(errors.isValid).toBe(false);
      expect(errors.errors[0]).toBe("Username is invaild");
    });

    it("pass if given vaild username", () => {
      const errors = validateEmailname("12345678");

      expect(errors.isValid).toBe(true);
    });

    it("pass if given vaild email", () => {
      const errors = validateEmailname("t@t.com");

      expect(errors.isValid).toBe(true);
    });
  });
});

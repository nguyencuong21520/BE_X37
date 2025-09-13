import * as yup from "yup";

// Schema cho đăng ký người dùng
export const registerSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required("Tên là bắt buộc")
      .min(2, "Tên phải có ít nhất 2 ký tự")
      .max(50, "Tên không được vượt quá 50 ký tự")
      .trim(),

    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Email không hợp lệ")
      .lowercase()
      .trim(),

    password: yup
      .string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Mật khẩu không được vượt quá 100 ký tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"
      ),

    phone: yup
      .string()
      .required("Số điện thoại là bắt buộc")
      .matches(
        /^(\+84|84|0[3|5|7|8|9])+([0-9]{8,9})$/,
        "Số điện thoại không hợp lệ"
      )
      .trim(),
  }),
});

// Schema cho đăng nhập
export const loginSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Email không hợp lệ")
      .lowercase()
      .trim(),

    password: yup
      .string()
      .required("Mật khẩu là bắt buộc")
      .min(1, "Mật khẩu không được để trống"),
  }),
});

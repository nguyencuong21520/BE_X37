export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate request object (body, params, query)
      await schema.validate(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        {
          abortEarly: false, // Trả về tất cả lỗi validation, không dừng ở lỗi đầu tiên
          stripUnknown: true, // Loại bỏ các field không được định nghĩa trong schema
        }
      );

      next();
    } catch (error) {
      // Xử lý lỗi validation
      if (error.name === "ValidationError") {
        const errors = error.inner.map((err) => ({
          field: err.path,
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Dữ liệu không hợp lệ",
          errors: errors,
        });
      }

      // Lỗi khác
      return res.status(500).json({
        success: false,
        message: "Lỗi server trong quá trình validation",
        error: error.message,
      });
    }
  };
};

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/index.js";

dotenv.config();

export const authenticateToken = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token truy cập bị thiếu",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token không hợp lệ - User không tồn tại",
      });
    }

    // Gắn thông tin user vào request object
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token không hợp lệ",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token đã hết hạn",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Lỗi server trong quá trình xác thực",
      error: error.message,
    });
  }
};

/**
 * Middleware kiểm tra quyền admin
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền truy cập chức năng này",
    });
  }
};

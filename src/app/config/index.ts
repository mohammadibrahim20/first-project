import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUND,
  defaultPass: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expireIn: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expireIn: process.env.JWT_REFRESH_EXPIRES_IN,
  reset_password_ui_link: process.env.RESET_PASSWORD_LINK,
  imgBB_api_key: process.env.IMG_BB_API_KEY,
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const phongTroRoutes = require("./routes/phongTroRoutes");
const errorHandler = require("./middleware/errorHandler");
const configViewEngine = require("./config/viewEngineConfig");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST_NAME || "localhost";

// Cấu hình middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình view engine
configViewEngine(app);

// Route mặc định để render giao diện
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Route để render danh sách phòng trọ
app.get("/home", async (req, res) => {
  try {
    const response = await fetch(`http://${host}:${port}/phongtro`);
    const phongTroList = await response.json();
    const hinhThucResponse = await fetch(
      `http://${host}:${port}/phongtro/hinhthucthanhtoan`
    );
    const hinhThucList = await hinhThucResponse.json();
    res.render("home", { phongTroList, hinhThucList });
  } catch (error) {
    res.status(500).render("home", {
      phongTroList: [],
      hinhThucList: [],
      error: "Lỗi khi tải dữ liệu",
    });
  }
});

// Định nghĩa routes API
app.use("/phongtro", phongTroRoutes);

// Xử lý lỗi 404 (route không tồn tại)
app.use((req, res, next) => {
  res.status(404).json({ message: `Không tìm thấy route: ${req.originalUrl}` });
});

// Xử lý lỗi
app.use(errorHandler);

// Khởi động server
app.listen(port, host, () => {
  console.log(`Server chạy tại http://${host}:${port}`);
});

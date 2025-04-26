const PhongTroService = require("../services/PhongTroService");

class PhongTroController {
  static async getAll(req, res) {
    try {
      const phongTro = await PhongTroService.getAllPhongTro();
      res.json(phongTro);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  static async search(req, res) {
    try {
      const { keyword } = req.query;
      const phongTro = await PhongTroService.searchPhongTro(keyword);
      res.json(phongTro);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  static async create(req, res) {
    try {
      const {
        TenNguoiThue,
        SoDienThoai,
        NgayBatDau,
        MaHinhThucThanhToan,
        GhiChu,
      } = req.body;

      // Validation phía server
      const nameRegex =
        /^[a-zA-Z\sàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]+$/;
      if (
        !nameRegex.test(TenNguoiThue) ||
        TenNguoiThue.length < 5 ||
        TenNguoiThue.length > 50
      ) {
        return res.status(400).json({
          message:
            "Tên người thuê phải từ 5-50 ký tự, không chứa số và ký tự đặc biệt",
        });
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(SoDienThoai)) {
        return res
          .status(400)
          .json({ message: "Số điện thoại phải là 10 chữ số" });
      }

      const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      if (!dateRegex.test(NgayBatDau)) {
        return res
          .status(400)
          .json({ message: "Ngày bắt đầu phải có định dạng dd-mm-yyyy" });
      }

      const [day, month, year] = NgayBatDau.split("-").map(Number);
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate < today) {
        return res
          .status(400)
          .json({ message: "Ngày bắt đầu không được là ngày trong quá khứ" });
      }

      // Kiểm tra MaHinhThucThanhToan
      const validPaymentTypes = [1, 2, 3]; // Giả sử 1, 2, 3 tương ứng với theo tháng, theo quý, theo năm
      if (!validPaymentTypes.includes(Number(MaHinhThucThanhToan))) {
        return res
          .status(400)
          .json({ message: "Hình thức thanh toán không hợp lệ" });
      }

      const newId = await PhongTroService.createPhongTro(req.body);
      res.json({ message: "Tạo mới thành công", MaPhong: newId });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server: " + error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await PhongTroService.deletePhongTro(id);
      res.json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  static async deleteMultiple(req, res) {
    try {
      const { ids } = req.body;
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Danh sách ID không hợp lệ" });
      }
      await PhongTroService.deleteMultiplePhongTro(ids);
      res.json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  static async getHinhThucThanhToan(req, res) {
    try {
      const hinhThuc = await PhongTroService.getHinhThucThanhToan();
      res.json(hinhThuc);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

module.exports = PhongTroController;

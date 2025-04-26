const pool = require("../config/database");

class PhongTro {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT PhongTro.*, HinhThucThanhToan.TenHinhThuc 
      FROM PhongTro 
      JOIN HinhThucThanhToan ON PhongTro.MaHinhThucThanhToan = HinhThucThanhToan.MaHinhThuc
    `);
    return rows;
  }

  static async search(keyword) {
    const [rows] = await pool.query(
      `
      SELECT PhongTro.*, HinhThucThanhToan.TenHinhThuc 
      FROM PhongTro 
      JOIN HinhThucThanhToan ON PhongTro.MaHinhThucThanhToan = HinhThucThanhToan.MaHinhThuc
      WHERE PhongTro.MaPhong LIKE ? 
      OR PhongTro.TenNguoiThue LIKE ? 
      OR PhongTro.SoDienThoai LIKE ?
    `,
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );
    return rows;
  }

  static async create({
    TenNguoiThue,
    SoDienThoai,
    NgayBatDau,
    MaHinhThucThanhToan,
    GhiChu,
  }) {
    const [result] = await pool.query(
      "INSERT INTO PhongTro (TenNguoiThue, SoDienThoai, NgayBatDau, MaHinhThucThanhToan, GhiChu) VALUES (?, ?, ?, ?, ?)",
      [
        TenNguoiThue,
        SoDienThoai,
        NgayBatDau,
        MaHinhThucThanhToan,
        GhiChu || null,
      ]
    );
    return result.insertId;
  }

  static async delete(id) {
    await pool.query("DELETE FROM PhongTro WHERE MaPhong = ?", [id]);
  }

  static async deleteMultiple(ids) {
    await pool.query("DELETE FROM PhongTro WHERE MaPhong IN (?)", [ids]);
  }

  static async getHinhThucThanhToan() {
    const [rows] = await pool.query("SELECT * FROM HinhThucThanhToan");
    return rows;
  }
}

module.exports = PhongTro;

const PhongTro = require("../models/PhongTro");

class PhongTroService {
  static async getAllPhongTro() {
    return await PhongTro.getAll();
  }

  static async searchPhongTro(keyword) {
    return await PhongTro.search(keyword);
  }

  static async createPhongTro(data) {
    return await PhongTro.create(data);
  }

  static async deletePhongTro(id) {
    return await PhongTro.delete(id);
  }

  static async deleteMultiplePhongTro(ids) {
    return await PhongTro.deleteMultiple(ids);
  }

  static async getHinhThucThanhToan() {
    return await PhongTro.getHinhThucThanhToan();
  }
}

module.exports = PhongTroService;

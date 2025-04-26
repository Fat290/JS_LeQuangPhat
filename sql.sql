
DROP DATABASE IF EXISTS QuanLyPhongTro;

CREATE DATABASE QuanLyPhongTro;
USE QuanLyPhongTro;


CREATE TABLE HinhThucThanhToan (
    MaHinhThuc INT AUTO_INCREMENT PRIMARY KEY,
    TenHinhThuc VARCHAR(50) NOT NULL
);


CREATE TABLE PhongTro (
    MaPhong INT AUTO_INCREMENT PRIMARY KEY,
    TenNguoiThue VARCHAR(100) NOT NULL,
    SoDienThoai VARCHAR(20) NOT NULL,
    NgayBatDau DATE NOT NULL, -- Đảm bảo kiểu dữ liệu là DATE
    MaHinhThucThanhToan INT NOT NULL,
    GhiChu TEXT,
    FOREIGN KEY (MaHinhThucThanhToan) REFERENCES HinhThucThanhToan(MaHinhThuc)
);

INSERT INTO HinhThucThanhToan (TenHinhThuc) VALUES
('Theo tháng'),
('Theo quý'),
('Theo năm');

-- Chèn dữ liệu mẫu cho PhongTro
INSERT INTO PhongTro (TenNguoiThue, SoDienThoai, NgayBatDau, MaHinhThucThanhToan, GhiChu) VALUES
('Nguyễn Văn A', '0123456789', '2020-10-10', 1, 'Phòng có điều hòa'),
('Nguyễn Văn B', '0123456789', '2020-10-10', 3, 'Phòng có điều hòa'),
('Nguyễn Văn C', '0123456789', '2020-10-10', 1, 'Phòng có điều hòa'),
('Nguyễn Văn D', '0123456789', '2020-10-10', 5, 'Phòng có điều hòa');
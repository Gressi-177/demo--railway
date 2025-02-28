-- creating the database
CREATE DATABASE crudnodejsmysql;

use crudnodejsmysql;

-- creating a table
CREATE TABLE customer (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);

-- Show all tables
SHOW TABLES;

-- To describe the table
describe customer;

-- Insert sample data
INSERT INTO customer (name, address, phone) VALUES
('Nguyễn Văn An', 'Số 123 Đường Lê Lợi, Quận 1, TP.HCM', '0901234567'),
('Trần Thị Bình', '456 Nguyễn Huệ, Quận 3, TP.HCM', '0912345678'),
('Lê Hoàng Cường', '789 Trần Hưng Đạo, Quận 5, TP.HCM', '0923456789'),
('Phạm Thị Dung', '321 Võ Văn Tần, Quận 10, TP.HCM', '0934567890'),
('Hoàng Văn Em', '654 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM', '0945678901'),
('Mai Thị Phương', '987 Nguyễn Thị Minh Khai, Quận 3, TP.HCM', '0956789012'),
('Đỗ Văn Giang', '147 Cách Mạng Tháng 8, Quận 1, TP.HCM', '0967890123'),
('Vũ Thị Hương', '258 Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM', '0978901234'),
('Bùi Văn Inh', '369 Hai Bà Trưng, Quận 1, TP.HCM', '0989012345'),
('Lý Thị Kim', '741 Lý Tự Trọng, Quận 1, TP.HCM', '0990123456');
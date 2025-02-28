const res = require("express/lib/response");

const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM customer", (err, customers) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Lỗi server",
          details: err,
        });
      }
      res.json({
        error: false,
        data: customers,
      });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;

  if (!data.name || !data.address || !data.phone) {
    return res.status(400).json({
      error: true,
      message: "Thiếu thông tin bắt buộc",
    });
  }

  req.getConnection((err, conn) => {
    conn.query("INSERT INTO customer set ?", [data], (err, result) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Lỗi server",
          details: err,
        });
      }

      res.status(201).json({
        error: false,
        message: "Tạo khách hàng thành công",
        data: {
          id: result.insertId,
          ...data,
        },
      });
    });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query("DELETE FROM customer WHERE id = ?", [id], (err, result) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Lỗi server",
          details: err,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: true,
          message: "Không tìm thấy khách hàng",
        });
      }

      res.json({
        error: false,
        message: "Xóa khách hàng thành công",
      });
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM customer WHERE id = ?",
      [id],
      (err, customers) => {
        if (err) {
          return res.status(500).json({
            error: true,
            message: "Lỗi server",
            details: err,
          });
        }

        if (customers.length === 0) {
          return res.status(404).json({
            error: true,
            message: "Không tìm thấy khách hàng",
          });
        }

        res.json({
          error: false,
          data: customers[0],
        });
      }
    );
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;

  if (!newCustomer.name || !newCustomer.address || !newCustomer.phone) {
    return res.status(400).json({
      error: true,
      message: "Thiếu thông tin bắt buộc",
    });
  }

  req.getConnection((err, conn) => {
    conn.query(
      "UPDATE customer set ? WHERE id = ?",
      [newCustomer, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: true,
            message: "Lỗi server",
            details: err,
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            error: true,
            message: "Không tìm thấy khách hàng",
          });
        }

        res.json({
          error: false,
          message: "Cập nhật thành công",
          data: {
            id: parseInt(id),
            ...newCustomer,
          },
        });
      }
    );
  });
};

module.exports = controller;

import Category from "../models/category";
import Product from "../models/product";
import { categoryValidate } from "../Schemas/category";
export const getAll = async (req, res) => {
  try {
    const data = await Category.find();
    data.length === 0
      ? res.json({ message: "Không có danh mục", data: [] })
      : res.json({ data: data });
  } catch (error) {}
};
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id).populate("products");

    if (category.length === 0) {
      return res.json({ message: "Không có danh mục" });
    }

    const products = await Product.find({ categoryId: id });
    return res.json({
      ...category.toObject(),
      products,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

export const creata = async (req, res) => {
  try {
    const { error } = categoryValidate.validate(req.body);
    error ? res.json({ message: error.details[0].message }) : true;

    const data = await Category.create(req.body);
    data.length === 0
      ? res.json({ message: "Thêm danh mục thất bại" })
      : res.json({ message: "Thêm danh mục thành công", data });
  } catch (error) {
    return res.json({ message: error });
  }
};
export const remove = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete({ _id: req.params.id });
    return res.json({ message: "Xóa danh mục thành công", data });
  } catch (error) {
    return res.json({ message: error });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = categoryValidate.validate(req.body);
    if (error) {
      return res.json({
        message: error.details.map((err) => err.message),
      });
    }

    const data = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    !data
      ? res.json({ message: "Cập nhật danh mục không thành công" })
      : res.json({ message: "Cập nhật danh mục thành công", data });
  } catch (error) {
    return res.json({ message: error });
  }
};

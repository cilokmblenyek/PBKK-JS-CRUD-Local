import Produk from "../models/Produk.js";

export const getProduk = async (req, res) => {
  try {
    const response = await Produk.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProdukById = async (req, res) => {
  try {
    const response = await Produk.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProduk = async (req, res) => {
  try {
    const response = await Produk.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProduk = async (req, res) => {
  try {
    await Produk.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Produk berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduk = async (req, res) => {
  try {
    await Produk.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
  }
};

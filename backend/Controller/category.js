
const categorySchema = require("../Modal/CategorySchema");

const Insert = async (req, res) => {
  try {
    const { name} = req.body;
   

    const data = await new categorySchema({name});
    const saveCategory = await data.save();

    console.log("inserted sucessfuly");
    res.send({ "inserted sucessfdully": true, saveCategory });
  } catch (error) {
    console.error("internal server error", error);
  }
};

const View = async (req, res) => {
  try {
    const data = await categorySchema.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("Error Occured", error);
    res.status(500).json("some internal error");
  }
};

const Delete = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Check if the category exists before attempting to delete
    const category = await categorySchema.findById(categoryId);
    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }

    // Remove the category using the deleteOne method
    await categorySchema.deleteOne({ _id: categoryId });

    console.log('Category deleted successfully');
    res.send({ deletedSuccessfully: true });
  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = { Insert, View ,Delete};
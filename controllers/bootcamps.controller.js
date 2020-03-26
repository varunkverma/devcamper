const Bootcamp = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponse");
// @desc    Get all bootcamps
// @route   GET:    /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (error) {
    next(err);
  }
};

// @desc    Get a bootcamp via id
// @route   GET:    /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found for id: ${req.params.id}.`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new bootcamp
// @route   POST:    /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a bootcamp via id
// @route   PUT:    /api/v1/bootcamp/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found for id: ${req.params.id}.`, 404)
      );
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    next(err);
  }
};

// @desc    Delete a bootcamp via id
// @route   DELETE:    /api/v1/bootcamp/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false
      });
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(err);
  }
};

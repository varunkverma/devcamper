const Bootcamp = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.middleware");
const geocoder = require("../utils/geocoder");
// @desc    Get all bootcamps
// @route   GET:    /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});

// @desc    Get a bootcamp via id
// @route   GET:    /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
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
});

// @desc    Create new bootcamp
// @route   POST:    /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

// @desc    Update a bootcamp via id
// @route   PUT:    /api/v1/bootcamp/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
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
});

// @desc    Delete a bootcamp via id
// @route   DELETE:    /api/v1/bootcamp/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return res.status(400).json({
      success: false
    });
  }
  res.status(200).json({
    success: true
  });
});

// @desc    Get a bootcamp within a radius
// @route   Get  /api/v1/bootcamp/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  console.info(`${zipcode} ${distance}`);

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find(
    {
      location: {
        $geoWithin: {
          $centerSphere: [[-71.07125, 42.338507], 0.0025233409033560434]
        }
      }
    }
    //{
    // location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    //}
  );

  console.info(bootcamps);

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});

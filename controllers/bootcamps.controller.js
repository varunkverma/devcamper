// @desc    Get all bootcamps
// @route   GET:    /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "Show all bootcamps"
  });
};

// @desc    Get a bootcamp via id
// @route   GET:    /api/v1/bootcamp/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Show bootcamp ${req.params.id}`
  });
};

// @desc    Create new bootcamp
// @route   POST:    /api/v1/bootcamps
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(201).json({
    success: true,
    msg: "Create a bootcamps"
  });
};

// @desc    Update a bootcamp via id
// @route   PUT:    /api/v1/bootcamp/:id
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `update bootcamp ${req.params.id}`
  });
};

// @desc    Delete a bootcamp via id
// @route   DELETE:    /api/v1/bootcamp/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `delete bootcamp ${req.params.id}`
  });
};
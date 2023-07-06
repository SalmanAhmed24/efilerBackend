const fileStatusModel = require("../models/fileStatusModel");
const moment = require("moment");
const getFileStatus = async (req, res, next) => {
  let eFileStatus;
  try {
    eFileStatus = await fileStatusModel.find({});
  } catch (error) {
    res.json({ message: "Error while getting data", error: true });
    return next(error);
  }
  res.json({
    fileStatus:
      eFileStatus.length > 0
        ? eFileStatus[0].toObject({ getters: true })
        : eFileStatus,
    error: false,
  });
};
const editFileStatus = async (req, res, next) => {
  const { toRole, role, individualCom, reject } = req.body;
  const { efileId } = req.params;
  let fileToBeEdited;
  try {
    fileToBeEdited = await fileStatusModel.findById(efileId);
  } catch (error) {
    res.json({ message: "Could not find the unit", error: true });
    return next(error);
  }
  if (toRole == "first level" && fileToBeEdited.step1) {
    fileToBeEdited.step1.filerStatus = true;
    fileToBeEdited.step2.filerStatus = false;
    fileToBeEdited.step3.filerStatus = false;
    fileToBeEdited.step4.filerStatus = false;
    fileToBeEdited.step1.comments.push({
      role: role,
      comment: individualCom,
      reject: reject,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    fileToBeEdited.nextRole = toRole;
  }
  if (toRole == "second level" && fileToBeEdited.step2) {
    fileToBeEdited.step1.filerStatus = false;
    fileToBeEdited.step2.filerStatus = true;
    fileToBeEdited.step3.filerStatus = false;
    fileToBeEdited.step4.filerStatus = false;
    fileToBeEdited.step2.comments.push({
      role: role,
      comment: individualCom,
      reject: reject,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    fileToBeEdited.nextRole = toRole;
  }
  if (toRole == "third level" && fileToBeEdited.step3) {
    fileToBeEdited.step1.filerStatus = false;
    fileToBeEdited.step2.filerStatus = false;
    fileToBeEdited.step3.filerStatus = true;
    fileToBeEdited.step4.filerStatus = false;
    fileToBeEdited.step3.comments.push({
      role: role,
      comment: individualCom,
      reject: reject,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    fileToBeEdited.nextRole = toRole;
  }
  if (toRole == "fourth level" && fileToBeEdited.step4) {
    fileToBeEdited.step1.filerStatus = false;
    fileToBeEdited.step2.filerStatus = false;
    fileToBeEdited.step3.filerStatus = false;
    fileToBeEdited.step4.filerStatus = true;
    fileToBeEdited.step4.comments.push({
      role: role,
      comment: individualCom,
      reject: reject,
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
    fileToBeEdited.nextRole = toRole;
  }
  fileToBeEdited.prevComments.push({
    role: role,
    comment: individualCom,
    reject: reject,
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
  });
  try {
    await fileToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit unit make", error: true });
    return next(error);
  }
  res.status(201).json({
    message: "Edited successfully",
    error: false,
  });
};
const addEFile = async (req, res, next) => {
  const { toRole, role, individualCom } = req.body;
  const newFile = req.files[0];
  const createEfile = new fileStatusModel({
    step1: {
      role: role,
      filerStatus: true,
      comments: [
        {
          role: role,
          comment: individualCom,
          reject: false,
          date: moment().format("MMMM Do YYYY, h:mm:ss a"),
        },
      ],
    },
    step2: {
      role: "second level",
      filerStatus: false,
      comments: [
        {
          role: "",
          comment: "",
          reject: false,
          date: "",
        },
      ],
    },
    step3: {
      role: "third level",
      filerStatus: false,
      comments: [
        {
          role: "",
          comment: "",
          reject: false,
          date: "",
        },
      ],
    },
    step4: {
      role: "fourth level",
      filerStatus: false,
      comments: [
        {
          role: "",
          comment: "",
          reject: false,
          date: "",
        },
      ],
    },
    nextRole: toRole,
    uploadedFile: newFile,
    markAsDone: false,
    prevComments: [
      {
        role: role,
        comment: individualCom,
        reject: false,
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      },
    ],
  });
  try {
    await createEfile.save();
  } catch (error) {
    res.json({ message: "Error adding Efile", error: true });
    return next(error);
  }
  res.json({ message: "Created Successfully", error: false });
};
const uploadNewFile = async (req, res, next) => {
  const { efileId } = req.params;
  const newFile = req.files[0];
  console.log("here this is the file", newFile);
  let fileToBeEdited;
  try {
    fileToBeEdited = await fileStatusModel.findById(efileId);
  } catch (error) {
    res.json({ message: "Could not find the unit", error: true });
    return next(error);
  }
  fileToBeEdited.uploadedFile = newFile;
  try {
    await fileToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit", error: true });
    return next(error);
  }
  res.json({ message: "Uploaded Successfully", error: false });
};
const markAsDone = async (req, res, next) => {
  const { efileId } = req.params;
  let fileToBeEdited;
  try {
    fileToBeEdited = await fileStatusModel.findById(efileId);
  } catch (error) {
    res.json({ message: "Could not find the unit", error: true });
    return next(error);
  }
  fileToBeEdited.markAsDone = true;
  try {
    await fileToBeEdited.save();
  } catch (error) {
    res.json({ message: "Enable to edit", error: true });
    return next(error);
  }
  res.json({ message: "File set as done", error: false });
};
exports.getFileStatus = getFileStatus;
exports.editFileStatus = editFileStatus;
exports.addEFile = addEFile;
exports.uploadNewFile = uploadNewFile;
exports.markAsDone = markAsDone;

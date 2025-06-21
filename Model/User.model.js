import mongoose, { Schema } from "mongoose";

// Define the schema for the User collection
const UserSchema = new Schema({
  // Email field: must be a unique, required string
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Password field: required string (should be hashed before saving)
  password: {
    type: String,
    required: true
  }
});

// Create a Mongoose model named "User" using the schema
const UserModel = mongoose.model("User", UserSchema);

// Export the model so it can be used in other parts of the application
export default UserModel;

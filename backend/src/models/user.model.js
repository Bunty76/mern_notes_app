// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Import bcryptjs for hashing passwords
import bcryptjs from "bcryptjs";

// Define the schema for User documents in MongoDB
const userSchema = new mongoose.Schema(
  {
    // Username field with validation rules
    username: {
      type: String, // Must be a string
      required: true, // Required field
      trim: true, // Removes whitespace from both ends
      minlength: 3, // Minimum length of 3 characters
      maxlength: 30, // Maximum length of 30 characters
      unique: true, // Must be unique in the collection
    },

    // Email field with validation rules
    email: {
      type: String, // Must be a string
      required: true, // Required field
      unique: true, // Must be unique
      lowercase: true, // Converts email to lowercase
      trim: true, // Removes whitespace
    },

    // Password field with validation rules
    password: {
      type: String, // Must be a string
      required: true, // Required field
      minlength: 6, // Minimum length of 6 characters
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Pre-save middleware to hash the password before saving to the database
userSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return;

  // Generate a salt with 10 rounds
  const salt = await bcryptjs.genSalt(10);

  // Hash the password using the salt
  this.password = await bcryptjs.hash(this.password, salt);
});

// Instance method to compare given password with hashed password in DB
userSchema.methods.comparePassword = async function (password) {
  // Returns true if password matches, false otherwise
  return bcryptjs.compare(password, this.password);
};

// Export the User model to use in other parts of the application
export default mongoose.model("User", userSchema);

// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Import bcryptjs for hashing passwords
import bcryptjs from "bcryptjs";

// Define the schema for User documents in MongoDB
const userSchema = new mongoose.Schema(
  {
    // Username field with validation rules
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      unique: true,
    },

    // Email field with validation rules
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },

    // Password field with validation rules
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  {
    timestamps: true,
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

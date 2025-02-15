import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: [true, "Owner is required"],
      nullable: true,
    },
    name: {
      type: String,
      required: [true, "property name is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
    description: {
      type: String,
    },
    location: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    beds: {
      type: Number,
      required: [true, "beds are required"],
    },
    baths: {
      type: Number,
      required: [true, "baths are required"],
    },
    square_feet: {
      type: Number,
      required: [true, "square_feet are required"],
    },
    amenities: [
      {
        type: String,
      },
    ],

    rates: {
      nightly: Number,
      weekly: Number,
      mothly: Number,
    },

    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [{ type: String }],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", PropertySchema);
// const Property = model("Property", PropertySchema);

export default Property;

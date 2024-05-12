import { model, Schema } from "mongoose";

const urlSchema = new Schema({
    shortenedId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    analytics: [{
        timestamp: {
            type: Number
        }
    }]
}, {
    timestamps: true,
})

export const URL = model("URL", urlSchema);
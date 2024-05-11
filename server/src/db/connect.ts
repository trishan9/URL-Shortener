import mongoose from "mongoose";
import config from "@/config";
import { logger } from "@/lib/logger";

const connectToDB = async () => {
    await mongoose.connect(config.database.mongodb.url)
    logger.info("connected to database successfully")
}

export default connectToDB;
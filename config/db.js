import mongoose, { mongo } from "mongoose";

const connectionDb = async () => {
    try {
        const uri = process.env.MONGO_URL
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        const connection = await mongoose.connect(uri, options);
        console.log(`Database connected 😎🤙  `);
    } catch (error) {
        console.log(error)
    }

}

export default connectionDb;
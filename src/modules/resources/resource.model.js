import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const ResourceSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    
},{timestamps:true});
ResourceSchema.statics={
    createResource(args,user){
        return this.create({
            ...args,user
        })
    },
    list({ skip = 0, limit = 5 } = {}) {
        return this.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('user');
      },
}
ResourceSchema.methods ={
    toJSON() {
        return{
            _id: this._id,
            name: this.name,
            location: this.location,
            user: this.user
        }
    }
}
export default mongoose.model('Resource', ResourceSchema);